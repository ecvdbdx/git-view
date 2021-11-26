import { exec } from 'child_process';

export default function getGitLogs(path) {
  exec(`git log HEAD --max-count=10`, { cwd: path }, function (err, stdout) {
    console.log(stdout.trim().split('\n'));
    console.log(typeof stdout);
  });
}
