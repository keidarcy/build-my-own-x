const chokidar = require('chokidar');
const { spawn } = require('child_process');

// exec('node test.js', (err, stdout) => {
//     console.log(stdout);
// });
let childProcess;
const debounceStart = debounce(start, 1000);

chokidar.watch(['main.js']).on('all', (event, path) => {
  console.log({
    event,
    path,
  });
  debounceStart();
});

function start() {
  if (childProcess) childProcess.kill();
  childProcess = spawn('node', ['main.js'], {
    stdio: [process.stdin, process.stdout, process.stderr],
  });
}

function debounce(fn, delay) {
  let id;
  return () => {
    if (id) clearTimeout(id);
    id = setTimeout(() => {
      fn();
    }, delay);
  };
}
