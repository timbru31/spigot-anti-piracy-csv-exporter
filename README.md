# spigot-anti-piracy-csv-exporter
[![Code Climate](https://codeclimate.com/github/timbru31/spigot-anti-piracy-csv-exporter/badges/gpa.svg)](https://codeclimate.com/github/timbru31/spigot-anti-piracy-csv-exporter)
[![Dependency Status](https://david-dm.org/timbru31/spigot-anti-piracy-csv-exporter.svg)](https://david-dm.org/timbru31/spigot-anti-piracy-csv-exporter)
[![devDependency Status](https://david-dm.org/timbru31/spigot-anti-piracy-csv-exporter/dev-status.svg)](https://david-dm.org/timbru31/spigot-anti-piracy-csv-exporter#info=devDependencies)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![npm](https://img.shields.io/npm/v/spigot-anti-piracy-csv-exporter.svg)](https://www.npmjs.com/package/spigot-anti-piracy-csv-exporter)

#### A helper utility to generate a csv export for the spigot-anti-piracy-backend

### Description

The helper application reduces the logfile of spigot-anti-piracy-backend to a CSV with unqiue user IDs and a count of different ips in order to determine which user could have leaked the resources.

### Installation

This has been tested with Node v6.2 up to 7.5.0

#### Normal Installation

```shell
$ npm install -g spigot-anti-piracy-csv-exporter
```

(Optionally without the global flag)

#### Development Installation

```shell
$ git clone https://github.com/timbru31/spigot-anti-piracy-csv-exporter.git
$ cd spigot-anti-piracy-csv-exporter
$ npm install
```

### Usage

You need to specify thr path for the logfile. It defaults to `request.log` in the current directory if ommited.

Just use
```shell
$ npm run start
```

Configuration via enviorment variables

| Enviroment Variable | Default       | Description          |
|:------------------- |:------------- |:-------------------- |
| CSV_FILE            | ./users.csv   | Output CSV file      |
| LOG_FILE            | ./request.log | Log file of requests |

### Development

To run the linter use
```shell
$ npm run lint
```

The code is linted using `ESLint`.
Keep the warnings to zero. :smile:

**Please follow the commitizen style when making new commits!**

The project is written using bleeding edge software. I'm trying my best to keep it updated.
[Greenkeeper](https://greenkeeper.io) is helping me to do so, by making pull request for dependency updates. Thanks for this great service! :rocket:

---
Built by (c) Tim Brust and contributors. Released under the MIT license.
