import { Parser } from '@json2csv/plainjs';
import { createReadStream, writeFile } from 'node:fs';
import { createInterface } from 'readline';

const instream = createReadStream(process.env.LOG_FILE ?? 'request.log');
const rl = createInterface({
  input: instream,
  terminal: false,
});

interface IRawLogEntry {
  userId: string;
  ip: string;
  port: string;
  blacklisted: boolean;
}

interface IUser {
  count: number;
  ips: string[];
  userId: string;
}

const rawLogEntires: IRawLogEntry[] = [];
rl.on('line', line => rawLogEntires.push(JSON.parse(line) as IRawLogEntry)).on(
  'close',
  () => {
    filterLogEntries();
  },
);

function filterLogEntries() {
  const users: IUser[] = rawLogEntires.reduce<IUser[]>((_users, logEntry) => {
    const userId = logEntry.userId;
    let ip = logEntry.ip;
    const port = logEntry.port;
    if (port) {
      ip += `:${port}`;
    }
    const blacklisted = logEntry.blacklisted;
    if (userId && ip && !blacklisted) {
      _users = processUserEntry(_users, userId, ip);
    }
    return _users;
  }, []);

  writeToCSV(users);
}

function processUserEntry(users: IUser[], userId: string, ip: string) {
  const included = users.some(elem => elem.userId === userId);
  if (included) {
    users = updateUser(users, userId, ip);
  } else {
    createNewUser(ip, userId, users);
  }
  return users;
}

function updateUser(users: IUser[], userId: string, ip: string) {
  users = users.map(user => {
    if (user.userId === userId) {
      const ips = new Set(user.ips);
      ips.add(ip);
      user.ips = Array.from(ips);
      user.count = ips.size;
    }
    return user;
  });
  return users;
}

function createNewUser(ip: string, userId: string, users: IUser[]) {
  const newUser: IUser = {
    count: 1,
    ips: [ip],
    userId,
  };
  users.push(newUser);
}

function writeToCSV(users: IUser[]) {
  const fields = ['userId', 'count', 'ips'];
  try {
    const parser = new Parser({ fields, delimiter: ',' });
    const csv = parser.parse(users);
    writeFile(process.env.CSV_FILE ?? 'users.csv', csv, _err => {
      if (_err) {
        throw _err;
      }
      console.log(`Wrote ${users.length} user ids to the csv.`);
    });
  } catch (err) {
    console.error(err);
  }
}
