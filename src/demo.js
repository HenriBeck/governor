const child_process = require('child_process');

const run = (...args) => {
  const r = child_process.spawnSync(...args)
  return r.stderr.toString() ? r.stderr.toString() : r.stdout.toString()
}

console.log(run('/Users/jp/projects/sp/ueb01/ueb01', ['-1', '=']))
