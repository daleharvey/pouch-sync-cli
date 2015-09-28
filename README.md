pouch-sync-cli
---

Command-line tools for syncing or replicating PouchDB/CouchDB databases.

```bash
$ npm install -g pouch-sync-cli
```

Then you'll have a global `pouch-replicate` command:

```bash
$ pouch-replicate --help
```

  Usage: pouch-replicate source target [options]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
    --live         Live syncing
    --retry        Enable retry
    --sync         2 way syncing

  Examples:

    $ pouch-replicate https://skimdb.npmjs.com/registry ./dir
    $ pouch-replicate https://skimdb.npmjs.com/registry https://name.cloudant.com/npm-clone
