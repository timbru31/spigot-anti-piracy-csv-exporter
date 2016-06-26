const fs = require('fs');
const readline = require('readline');
const json2csv = require('json2csv');

const instream = fs.createReadStream(process.env.LOG_FILE || 'request.log');
const rl = readline.createInterface({
  input: instream,
  terminal: false
});

let rawLogEntires = [];
rl.on('line', line => rawLogEntires.push(JSON.parse(line)))
  .on('close', () => filterLogEntries());

function filterLogEntries() {
  const users = rawLogEntires.reduce((prev, curr) => {
    const userId = curr.userId;
    const ip = curr.ip;
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
        let newUser = {
          userId,
          count: 1,
          ips: [ip]
        };
        prev.push(newUser);
      }
    }
    return prev;
  }, []);

  writeToCSV(users);
}

function writeToCSV(users) {
  const fields = ['userId', 'count', 'ips'];
  json2csv({data: users, fields, del: ','}, (err, csv) => {
    if (err) {
      console.log(err);
    }
    fs.writeFile(process.env.CSV_FILE || 'users.csv', csv, err => {
      if (err) {
        throw err;
      }
      console.log(`Wrote ${users.length} user ids to the csv.`);
    });
  });
}
