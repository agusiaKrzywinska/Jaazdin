const prompt = require("prompt");
const fs = require("fs");

const FOLDERS = ["feat", "item", "monster", "optionalfeature", "race", "reward", "spell", "subclass", "subclassFeature", "subrace"];

const newJson = {};

prompt.start();

prompt.get(
    {
        properties: {
            version: {
                description: "Enter new version number",
                type: "string",
                pattern: /^\d+\.\d+\.\d+$/,
                message: "Version must be in the format x.y.z where x, y, and z are numbers",
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
        const newJson = {};
        const _meta = {
            sources: [
                {
                    json: "TftJC",
                    abbreviation: "TftJC",
                    full: "Tales from the Jaazdin Collective",
                    authors: ["Nicholas McCarthy", "Adam Henderson"],
                    convertedBy: ["Agusia Krzywinska", "Adam Henderson"],
                    version: version,
                },
            ],
            dateAdded: 0,
            dateLastModified: Math.round(Date.now() / 1000),
        };
        newJson["_meta"] = _meta;
        FOLDERS.forEach((folder) => {
            newJson[folder] = newJson[folder] || [];
            const jsonFiles = fs.readdirSync(`./${folder}`, { recursive: true }).filter((file) => file.endsWith(".json"));
            jsonFiles.forEach((file) => {
                const fileContent = fs.readFileSync(`./${folder}/${file}`);
                const obj = JSON.parse(fileContent);
                newJson[folder].push(obj);
            });
        });
        const newJsonContent = JSON.stringify(newJson, null, 4);
        fs.writeFile("./test.json", newJsonContent, (err) => {
            if (err) {
                console.error(`Error writing file tftjc.json: ${err}`);
            } else {
                console.log(`File tftjc.json created successfully.`);
            }
        });
    }
);
