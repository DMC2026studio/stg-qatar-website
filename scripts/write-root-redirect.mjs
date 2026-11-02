import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const outDir = join(process.cwd(), "out");
if (!existsSync(outDir)) {
  console.error("out/ missing — run next build first");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0; url=./en/" />
    <link rel="canonical" href="./en/" />
    <title>STG Industrial</title>
    <script>location.replace("./en/");</script>
  </head>
  <body>
    <p><a href="./en/">Continue to STG Industrial</a></p>
  </body>
</html>
`;

writeFileSync(join(outDir, "index.html"), html);
console.log("Wrote out/index.html → ./en/");
