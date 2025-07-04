# 5eTools Class Documentation

Classes in 5eTools represent the core character archetypes that define a character's abilities, progression, and role in the party.

## Overview

The class system encompasses the full progression from 1st to 20th level, including hit dice, proficiencies, features, spellcasting, and subclass integration.

## Schema Structure

```json
{
  "class": [
    {
      "name": "Class Name",
      "source": "SourceAbbreviation",
      "hd": { "number": 1, "faces": 8 },
      "proficiency": ["str", "con"],
      "startingProficiencies": {
        "armor": ["light", "medium", "shields"],
        "weapons": ["simple", "martial"],
        "skills": [{ "choose": { "from": ["athletics", "insight"] } }]
      },
      "startingEquipment": {
        "default": ["Starting equipment list"],
        "goldAlternative": "5d4 × 10"
      },
      "classTableGroups": [
        {
          "colLabels": ["Level", "Proficiency Bonus", "Features"],
          "rows": [[1, "+2", "Feature Name"]]
        }
      ],
      "classFeatures": ["Class Feature|ClassName|Source|1"]
    }
  ]
}
```

## Core Properties

### Required Properties

| Property           | Type   | Description                  |
| ------------------ | ------ | ---------------------------- |
| `name`             | string | The class name               |
| `source`           | string | Source identifier            |
| `hd`               | object | Hit die information          |
| `proficiency`      | array  | Saving throw proficiencies   |
| `classTableGroups` | array  | Level progression tables     |
| `classFeatures`    | array  | References to class features |

### Common Properties

| Property                | Type    | Description                             |
| ----------------------- | ------- | --------------------------------------- |
| `page`                  | integer | Page number in source                   |
| `startingProficiencies` | object  | Starting proficiencies                  |
| `startingEquipment`     | object  | Starting equipment options              |
| `multiclassing`         | object  | Multiclassing requirements and benefits |
| `spellcastingAbility`   | string  | Primary spellcasting ability            |
| `casterProgression`     | string  | Spellcasting progression type           |

## Hit Dice

```json
"hd": {
  "number": 1,
  "faces": 10
}
```

## Proficiencies

### Saving Throws

```json
"proficiency": ["str", "con"]
```

### Starting Proficiencies

```json
"startingProficiencies": {
  "armor": [
    "light",
    "medium",
    "shields"
  ],
  "weapons": [
    "simple",
    "martial"
  ],
  "tools": [
    "thieves' tools"
  ],
  "skills": [
    {
      "choose": {
        "from": [
          "athletics",
          "insight",
          "intimidation",
          "persuasion"
        ],
        "count": 2
      }
    }
  ]
}
```

## Starting Equipment

```json
"startingEquipment": {
  "default": [
    "You start with the following equipment, in addition to the equipment granted by your background:",
    {
      "type": "list",
      "items": [
        "{@item chain mail|phb} or {@item leather armor|phb}, {@item longbow|phb}, and 20 {@item arrows|phb}",
        "a {@item shield|phb}",
        "a {@item handaxe|phb} or any {@filter simple melee weapon|items|source=phb|category=basic|type=simple weapon;melee weapon}",
        "{@item explorer's pack|phb} and {@item javelin|phb}s (4)"
      ]
    }
  ],
  "goldAlternative": "5d4 × 10",
  "defaultData": [
    {
      "a": ["chain mail|phb", "leather armor|phb"],
      "b": ["longbow|phb"],
      "c": ["arrows|phb|20"]
    }
  ]
}
```

## Class Tables

### Basic Table

```json
"classTableGroups": [
  {
    "colLabels": [
      "Level",
      "Proficiency Bonus",
      "Features"
    ],
    "rows": [
      [1, "+2", "Rage, Unarmored Defense"],
      [2, "+2", "Reckless Attack, Danger Sense"],
      [3, "+2", "Primal Path, Primal Knowledge"]
    ]
  }
]
```

### Spellcasting Table

```json
"classTableGroups": [
  {
    "title": "The Wizard",
    "colLabels": [
      "Level",
      "Proficiency Bonus",
      "Features",
      "Cantrips Known",
      "1st",
      "2nd",
      "3rd"
    ],
    "rows": [
      [1, "+2", "Spellcasting, Arcane Recovery", 3, 2, 0, 0],
      [2, "+2", "Arcane Tradition", 3, 3, 0, 0],
      [3, "+2", "", 3, 4, 2, 0]
    ]
  }
]
```

## Spellcasting

### Full Caster

```json
"spellcastingAbility": "int",
"casterProgression": "full",
"spellsKnownProgression": [
  {
    "1": 6,
    "2": 8,
    "3": 10
  }
],
"spellsKnownProgressionFixed": [
  {
    "1": 2,
    "2": 3,
    "3": 4
  }
]
```

### Half Caster

```json
"spellcastingAbility": "wis",
"casterProgression": "1/2",
"preparedSpells": "cha",
"spellsKnownProgression": [
  {
    "2": 2,
    "3": 3,
    "5": 4
  }
]
```

### Third Caster

```json
"spellcastingAbility": "int",
"casterProgression": "1/3"
```

## Multiclassing

```json
"multiclassing": {
  "requirements": {
    "str": 13,
    "wis": 13
  },
  "proficienciesGained": {
    "armor": ["light", "medium", "shields"],
    "weapons": ["simple", "martial"]
  }
}
```

## Class Features

Class features are referenced by their identifier:

```json
"classFeatures": [
  "Spellcasting|Wizard|PHB|1",
  "Arcane Recovery|Wizard|PHB|1",
  "Arcane Tradition|Wizard|PHB|2",
  "Ability Score Improvement|Wizard|PHB|4"
]
```

## Subclasses

Subclasses are separate entries that reference the parent class:

```json
"subclass": [
  {
    "name": "School of Evocation",
    "shortName": "Evocation",
    "source": "PHB",
    "page": 117,
    "className": "Wizard",
    "classSource": "PHB",
    "subclassFeatures": [
      "School of Evocation|Wizard|PHB|Evocation|PHB|2",
      "Evocation Savant|Wizard|PHB|Evocation|PHB|2"
    ]
  }
]
```

## Optional Features

Classes can grant optional feature choices:

```json
"optionalfeatureProgression": [
  {
    "name": "Fighting Style",
    "featureType": ["FS:F"],
    "progression": {
      "1": 1
    }
  },
  {
    "name": "Maneuvers",
    "featureType": ["MV:B"],
    "progression": {
      "3": 3,
      "7": 2,
      "15": 2
    }
  }
]
```

## Complete Example

```json
{
  "name": "Gunner",
  "source": "TftJC",
  "page": 1,
  "hd": {
    "number": 1,
    "faces": 8
  },
  "proficiency": ["dex", "wis"],
  "startingProficiencies": {
    "armor": ["light"],
    "weapons": ["simple", "firearms"],
    "tools": ["tinker's tools"],
    "skills": [
      {
        "choose": {
          "from": [
            "acrobatics",
            "athletics",
            "insight",
            "investigation",
            "perception",
            "sleight of hand",
            "stealth",
            "survival"
          ],
          "count": 3
        }
      }
    ]
  },
  "startingEquipment": {
    "default": [
      "You start with the following equipment, in addition to the equipment granted by your background:",
      {
        "type": "list",
        "items": [
          "{@item leather armor|phb}",
          "a simple firearm of your choice and 20 pieces of appropriate ammunition",
          "{@item thieves' tools|phb}",
          "{@item dungeoneer's pack|phb}"
        ]
      }
    ],
    "goldAlternative": "4d4 × 10"
  },
  "multiclassing": {
    "requirements": {
      "dex": 13
    },
    "proficienciesGained": {
      "armor": ["light"],
      "weapons": ["simple", "firearms"],
      "tools": ["tinker's tools"]
    }
  },
  "classTableGroups": [
    {
      "colLabels": [
        "Level",
        "Proficiency Bonus",
        "Features",
        "Techniques Known"
      ],
      "rows": [
        [1, "+2", "Gunner's Eye, Tinker", 0],
        [2, "+2", "Gunner Archetype, Combat Techniques", 2],
        [3, "+2", "Expertise", 2],
        [4, "+2", "Ability Score Improvement", 2],
        [5, "+3", "Extra Attack", 3]
      ]
    }
  ],
  "classFeatures": [
    "Gunner's Eye|Gunner|TftJC|1",
    "Tinker|Gunner|TftJC|1",
    "Gunner Archetype|Gunner|TftJC|2",
    "Combat Techniques|Gunner|TftJC|2",
    "Expertise|Gunner|TftJC|3"
  ],
  "optionalfeatureProgression": [
    {
      "name": "Combat Techniques",
      "featureType": ["TECH"],
      "progression": {
        "2": 2,
        "5": 1,
        "9": 1,
        "13": 1,
        "17": 1
      }
    }
  ]
}
```

## Sidekick Classes

For simplified classes (sidekicks):

```json
{
  "name": "Warrior",
  "source": "TCE",
  "page": 142,
  "isSidekick": true,
  "hd": {
    "number": 1,
    "faces": 10
  }
}
```

## Class Variants

For variant class features:

```json
{
  "name": "Ranger (Variant)",
  "source": "UAClassFeatures",
  "isReprinted": true,
  "className": "Ranger",
  "classSource": "PHB"
}
```

## Best Practices

1. **Balanced Progression**: Ensure features are appropriately powerful for their level
2. **Clear Tables**: Make progression tables easy to read and understand
3. **Proper References**: Use correct feature references and formatting
4. **Multiclassing**: Include appropriate multiclassing rules
5. **Starting Equipment**: Provide both equipment packages and gold alternatives
6. **Subclass Integration**: Design classes to work well with subclass system
7. **Optional Features**: Use optional feature progression for customizable choices

This documentation provides comprehensive guidance for creating classes that integrate seamlessly with 5eTools and provide engaging gameplay experiences.
