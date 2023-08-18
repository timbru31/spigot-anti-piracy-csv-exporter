# spigot-anti-piracy-csv-exporter

[![Run a security audit](https://github.com/timbru31/spigot-anti-piracy-csv-exporter/workflows/Run%20a%20security%20audit/badge.svg)](https://github.com/timbru31/spigot-anti-piracy-csv-exporter/actions?query=workflow%3A%22Run+a+security+audit%22)
[![Linting](https://github.com/timbru31/spigot-anti-piracy-csv-exporter/workflows/Linting/badge.svg)](https://github.com/timbru31/spigot-anti-piracy-csv-exporter/actions?query=workflow%3ALinting)

[![dependency Status](https://img.shields.io/librariesio/release/npm/spigot-anti-piracy-csv-exporter)](https://github.com/timbru31/spigot-anti-piracy-csv-exporter/network/dependencies)
[![Code Climate](https://codeclimate.com/github/timbru31/spigot-anti-piracy-csv-exporter/badges/gpa.svg)](https://codeclimate.com/github/timbru31/spigot-anti-piracy-csv-exporter)
[![Known Vulnerabilities](https://snyk.io/test/github/timbru31/spigot-anti-piracy-csv-exporter/badge.svg)](https://snyk.io/test/github/timbru31/spigot-anti-piracy-csv-exporter)

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](https://commitizen.github.io/cz-cli/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![npm](https://img.shields.io/npm/v/spigot-anti-piracy-csv-exporter.svg)](https://www.npmjs.com/package/spigot-anti-piracy-csv-exporter)

#### A helper utility to generate a csv export for the spigot-anti-piracy-backend

### Description

The helper application reduces the logfile of spigot-anti-piracy-backend to a CSV with unique user IDs and a count of different ips in order to determine which user could have leaked the resources.

### Installation

This has been tested with Node.js v18 LTS.

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

You need to specify thr path for the logfile. It defaults to `request.log` in the current directory if omitted.

Just use

```shell
$ npm run start
```

Configuration via environment variables

| Environment Variable | Default       | Description          |
| :------------------- | :------------ | :------------------- |
| CSV_FILE             | ./users.csv   | Output CSV file      |
| LOG_FILE             | ./request.log | Log file of requests |

### Development

To run the linter use

```shell
$ npm run lint
```

The code is linted using `ESLint`.
Keep the warnings to zero. :smile:

**Please follow the commitizen style when making new commits!**

---

Built by (c) Tim Brust and contributors. Released under the MIT license.
