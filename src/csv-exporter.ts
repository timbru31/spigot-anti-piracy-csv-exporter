import { createReadStream, writeFile } from 'fs';
import * as json2csv from 'json2csv';
import { createInterface } from 'readline';

const instream = createReadStream(process.env.LOG_FILE || 'request.log');
const rl = createInterface({
  input: instream,
  terminal: false
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
rl.on('line', line => rawLogEntires.push(JSON.parse(line)))
  .on('close', () => filterLogEntries());

function filterLogEntries() {
  const users: IUser[] = rawLogEntires.reduce((prev, curr) => {
    const userId = curr.userId;
    let ip = curr.ip;
    const port = curr.port;
    if (port) {
      ip += `:${port}`;
    }
    const blacklisted = curr.blacklisted;
    if (!prev) {
      prev = [];
    }
    if (userId && ip && !blacklisted) {
      const included = prev.some(elem => elem.userId === userId);
      if (included) {
        prev = prev.map(elem => {
          if (elem.userId === userId) {
            const ips = new Set(elem.ips);
            ips.add(ip);
            elem.ips = Array.from(ips);
            elem.count = ips.size;
          }
          return elem;
        });
      } else {
        const newUser: IUser = {
          count: 1,
          ips: [ip],
          userId
        };
        prev.push(newUser);
      }
    }
    return prev;
  }, [] as IUser[]);

  writeToCSV(users);
}

function writeToCSV(users: IUser[]) {
  const fields = ['userId', 'count', 'ips'];
  json2csv({data: users, fields, del: ','}, (err, csv) => {
    if (err) {
      console.log(err);
    }
    writeFile(process.env.CSV_FILE || 'users.csv', csv, _err => {
      if (_err) {
        throw _err;
      }
      console.log(`Wrote ${users.length} user ids to the csv.`);
    });
  });
}
