function execShellCommand(cmd) {
  const exec = require("child_process").exec;
  return new Promise((resolve, _reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
      }
      resolve(stdout ? stdout : stderr);
    });
  });
}

const run = async () => {
  const out = await execShellCommand("git rev-parse --abbrev-ref HEAD");
  const branchName = out.trim();
  console.log(
    "git rev-parse --abbrev-ref HEAD :",
    branchName,
    branchName === "main"
  );
  const info = await execShellCommand("git status");
  console.log("git status: ", info.trim());
};

run();
