const data = require("./Tales_from_the_Jaazdin_Collective.json");
const fs = require("fs");

//https://wiki.tercept.net/en/Homebrew/TableOfReference

const TOP_FOLDERS = Object.keys(data).filter((key) => key !== "_meta");

TOP_FOLDERS.forEach((key) => {
    fs.existsSync(`./${key}`) || fs.mkdirSync(`./${key}`);
});

const NO_SUBFOLDERS = ["feat", "race", "optionalfeature", "monster"];

const SPELL_SCHOOLS = {
    A: "Abjuration",
    C: "Conjuration",
    D: "Divination",
    E: "Enchantment",
    I: "Illusion",
    N: "Necromancy",
    T: "Transmutation",
    V: "Evocation",
};

const ITEM_TYPES = {
    A: "Ammunition",
    AF: "Ammunition (futuristic)",
    AT: "Artisan Tool",
    EM: "Eldritch Machine",
    EXP: "Explosive",
    G: "Adventuring Gear",
    GS: "Gaming Set",
    LA: "Light Armor",
    INS: "Instrument",
    M: "Melee Weapon",
    MA: "Medium Armor",
    MNT: "Mount",
    GV: "Generic Variant",
    P: "Potion",
    R: "Ranged Weapon",
    RD: "Rod",
    RG: "Ring",
    S: "Shield",
    SC: "Scroll",
    SCF: "Spellcasting Focus",
    OTH: "Other",
    T: "Tool",
    TAH: "Tack and Harness",
    TG: "Trade Good",
    $: "Treasure",
    VEH: "Vehicle (land)",
    SHP: "Vehicle (water)",
    AIR: "Vehicle (air)",
    WD: "Wand",
};

const sanitizeFileName = (fileName) => {
    return fileName.replace(/[<>:"\/\\|?*]/g, "");
};

const writeToFile = (fileName, obj) => {
    const path = fileName.split("/");
    const sanitizedFileName = sanitizeFileName(path.pop());
    const sanitizedPath = path.join("/");
    const fileContent = JSON.stringify(obj, null, 4);

    fs.writeFile(`${sanitizedPath}/${sanitizedFileName}`, fileContent, (err) => {
        if (err) {
            console.log(`Error writing file ${sanitizedFileName}: ${err}`);
        }
    });
};

TOP_FOLDERS.forEach((key) => {
    data[key].forEach((obj) => {
        let filepath;
        switch (key) {
            case "reward":
                fs.existsSync(`./reward/${obj.type}`) || fs.mkdirSync(`./reward/${obj.type}`);
                filepath = `./reward/${obj.type}/${obj.name}.json`;
                break;

            case "item":
                const type = ITEM_TYPES[obj.type] || "Undefined";
                fs.existsSync(`./item/${type}`) || fs.mkdirSync(`./item/${type}`);
                filepath = `./item/${type}/${obj.name}.json`;
                break;

            case "spell":
                fs.existsSync(`./spell/${obj.level}`) || fs.mkdirSync(`./spell/${obj.level}`);
                const school = SPELL_SCHOOLS[obj.school] || "Other";
                fs.existsSync(`./spell/${obj.level}/${school}`) || fs.mkdirSync(`./spell/${obj.level}/${school}`);
                filepath = `./spell/${obj.level}/${school}/${obj.name}.json`;
                break;

            case "subrace":
                fs.existsSync(`./subrace/${obj.raceName}`) || fs.mkdirSync(`./subrace/${obj.raceName}`);
                filepath = `./subrace/${obj.raceName}/${obj.name}.json`;
                break;

            case "subclass":
                fs.existsSync(`./subclass/${obj.className}`) || fs.mkdirSync(`./subclass/${obj.className}`);
                filepath = `./subclass/${obj.className}/${obj.name}.json`;
                break;

            case "sublcassFeature":
                fs.existsSync(`./subclassfeature/${obj.subclassShortName}`) || fs.mkdirSync(`./subclassfeature/${obj.subclassShortName}`);
                filepath = `./subclassfeature/${obj.subclassShortName}/${obj.name}.json`;
                break;

            default:
                filepath = `./${key}/${obj.name}.json`;
                break;
        }
        writeToFile(filepath, obj);
    });
});

/*

NO_SUBFOLDERS.forEach((key) => {
    data[key].forEach((obj) => {
        writeToFile(`./${key}/${obj.name}.json`, obj);
    });
});

data.reward.forEach((obj) => {
    fs.existsSync(`./reward/${obj.type}`) || fs.mkdirSync(`./reward/${obj.type}`);
    writeToFile(`./reward/${obj.type}/${obj.name}.json`, obj);
});

data.item.forEach((obj) => {
    const type = ITEM_TYPES[obj.type] || "Undefined";
    fs.existsSync(`./item/${type}`) || fs.mkdirSync(`./item/${type}`);
    writeToFile(`./item/${type}/${obj.name}.json`, obj);
});

data.spell.forEach((obj) => {
    fs.existsSync(`./spell/${obj.level}`) || fs.mkdirSync(`./spell/${obj.level}`);
    const school = SPELL_SCHOOLS[obj.school] || "Other";
    fs.existsSync(`./spell/${obj.level}/${school}`) || fs.mkdirSync(`./spell/${obj.level}/${school}`);
    writeToFile(`./spell/${obj.level}/${school}/${obj.name}.json`, obj);
});

data.subrace.forEach((obj) => {
    fs.existsSync(`./subrace/${obj.raceName}`) || fs.mkdirSync(`./subrace/${obj.raceName}`);
    writeToFile(`./subrace/${obj.raceName}/${obj.name}.json`, obj);
});

data.subclass.forEach((obj) => {
    fs.existsSync(`./subclass/${obj.className}`) || fs.mkdirSync(`./subclass/${obj.className}`);
    writeToFile(`./subclass/${obj.className}/${obj.name}.json`, obj);
});

data.subclassFeature.forEach((obj) => {
    fs.existsSync(`./subclassfeature/${obj.subclassShortName}`) || fs.mkdirSync(`./subclassfeature/${obj.subclassShortName}`);
    writeToFile(`./subclassfeature/${obj.subclassShortName}/${obj.name}.json`, obj);
});

*/
