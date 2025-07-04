const prompt = require("prompt");
const fs = require("fs");
const josnData = require("./Tales_from_the_Jaazdin_Collective.json");

const EXCLUDED_FOLDERS = ["node_modules", ".git", ".vscode", "macros", "docs"];

const FOLDERS = fs
  .readdirSync("./")
  .filter(
    (file) =>
      fs.lstatSync(file).isDirectory() && !EXCLUDED_FOLDERS.includes(file),
  );

const getSort = (folder) => {
  switch (folder) {
    case "subclass":
      return (a, b) => {
        return (
          a.className.localeCompare(b.className) || a.name.localeCompare(b.name)
        );
      };
    case "subclassFeature":
      return (a, b) => {
        return (
          a.className.localeCompare(b.className) ||
          a.subclassShortName.localeCompare(b.subclassShortName) ||
          a.level - b.level
        );
      };
    case "classFeature":
      return (a, b) => {
        return a.className.localeCompare(b.className) || a.level - b.level;
      };
    default:
      return (a, b) => {
        return a.name.localeCompare(b.name);
      };
  }
};

prompt.start();

prompt.get(
  {
    properties: {
      version: {
        description: `Enter new version number (Current: ${josnData._meta.sources[0].version})`,
        type: "string",
        pattern: /^\d+\.\d+\.\d+$/,
        message:
          "Version must be in the format x.y.z where x, y, and z are numbers",
        required: true,
      },
    },
  },
  (err, result) => {
    if (err) {
      console.error(err);
      return;
    }

    const version = result.version;
    const newJson = {
      $schema:
        "https://raw.githubusercontent.com/TheGiddyLimit/5etools-utils/master/schema/brew-fast/homebrew.json",
    };
    const _meta = {
      sources: [
        {
          json: "TftJC",
          abbreviation: "TftJC",
          full: "Tales from the Jaazdin Collective",
          authors: ["Nicholas McCarthy", "Adam Henderson"],
          convertedBy: ["Agusia Krzywinska", "Adam Henderson", "Malcolm Keefe"],
          version: version,
        },
      ],
      edition: "classic",
      dateAdded: 0,
      dateLastModified: Math.round(Date.now() / 1000),
      optionalFeatureTypes: {
        "FS:W": "Fighting Style: Warden",
        TECH: "Technique",
        ARC: "Arcana",
        MOD: "Firearm Modification",
      },
    };
    newJson["_meta"] = _meta;
    FOLDERS.forEach((folder) => {
      newJson[folder] = newJson[folder] || [];
      const jsonFiles = fs
        .readdirSync(`./${folder}`, { recursive: true })
        .filter((file) => file.endsWith(".json"));
      jsonFiles.forEach((file) => {
        const fileContent = fs.readFileSync(`./${folder}/${file}`);
        const obj = JSON.parse(fileContent);
        newJson[folder].push(obj);
      });
      newJson[folder].sort(getSort(folder));
    });
    const newJsonContent = JSON.stringify(newJson, null, 4);
    fs.writeFile(
      "./Tales_from_the_Jaazdin_Collective.json",
      newJsonContent,
      (err) => {
        if (err) {
          console.error(`Error writing file tftjc.json: ${err}`);
        } else {
          console.log(`File tftjc.json created successfully.`);
        }
      },
    );
  },
);
