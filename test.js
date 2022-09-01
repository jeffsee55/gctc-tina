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
  const info = await execShellCommand("ls -la .git");
  console.log("ls -la .git: ", info.trim());

  const info2 = await execShellCommand("cat .git/HEAD");
  console.log("cat .git/HEAD: ", info2.trim());
};

run();
