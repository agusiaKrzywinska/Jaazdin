const { readdir, readFile, writeFile } = require("node:fs/promises");

async function processFiles() {
  const files = await readdir("./macros/js");
  for (const file of files) {
    console.log(`Processing file: ${file}`);
    const filePath = "./macros/js/" + file;
    try {
      const fileText = await readFile(filePath, "utf-8");
      const txtFileName = file.replace(".js", ".txt");
      const outputPath = "./macros/txt/" + txtFileName;
      await writeFile(outputPath, JSON.stringify(fileText));
    } catch (error) {
      console.error(`Error processing file ${file}:`, error);
    }
  }
}

processFiles();
