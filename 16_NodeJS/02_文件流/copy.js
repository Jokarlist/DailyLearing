const path = require("path");
const fs = require("fs");

async function method1() {
  const from = path.resolve(__dirname, "./test.txt");
  const to = path.resolve(__dirname, "./test-copied.txt");
  console.time("method1");
  const content = await fs.promises.readFile(from);
  await fs.promises.writeFile(to, content);
  console.timeEnd("method1");
  console.log("copy complete");
}

async function method2() {
  const from = path.resolve(__dirname, "./test.txt");
  const to = path.resolve(__dirname, "./test-copied.txt");
  console.time("method2");
  const rs = fs.createReadStream(from);
  const ws = fs.createWriteStream(to);
  rs.on("data", (chunk) => {
    const flag = ws.write(chunk);
    if (!flag) {
      rs.pause();
    }
  });

  ws.on("drain", () => {
    rs.resume();
  });

  rs.on("close", () => {
    ws.end();
    console.timeEnd("method2");
    console.log("copy complete");
  });
}

method2();