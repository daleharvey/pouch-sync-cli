#!/usr/bin/env node

var PouchDB = require('pouchdb');
var program = require('commander');

program
  .version('0.0.1')
  .usage('source target [options] ')
  .option('--live', 'Live syncing')
  .option('--retry', 'Enable retry')
  .option('--sync', '2 way syncing')

program.on('--help', function(){
  console.log('  Examples:');
  console.log('');
  console.log('    $ pouch-replicate https://skimdb.npmjs.com/registry ./dir');
  console.log('    $ pouch-replicate https://skimdb.npmjs.com/registry https://name.cloudant.com/npm-clone');
  console.log('');
});

program.parse(process.argv);

if (program.args.length < 2) {
  console.error('A source and target are required');
  process.exit(0);
}

var src = program.args[0];
var target = program.args[1];

var opts = {};

if (program.live) {
  opts.live = true;
}

if (program.retry) {
  opts.retry = true;
}

var sync;

if (!program.sync) {
  console.log('=> Syncing from', src, '->', target);
  console.log('=> With options:', opts);
  sync = PouchDB.replicate(src, target, opts);
} else {
  console.log('=> Syncing between', src, '<->', target);
  console.log('=> With options:', opts);
  sync = PouchDB.sync(src, target, opts);
}

sync.on('change', function (change) {
  console.log('=> update to last_seq:', change.last_seq);
});

sync.on('active', function () {
  console.log('=> Got active event');
});

sync.on('paused', function (err) {
  if (err) {
    console.log('=> Paused due to error', err);
  } else {
    console.log('=> Got paused event, waiting for more changes');
  }
});

sync.on('error', function () {
  console.log('=> Got active event');
});

sync.on('complete', function () {
  console.log('=> Complete!');
});
