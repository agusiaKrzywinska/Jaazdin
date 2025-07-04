# 5eTools Feat Documentation

Feats in 5eTools represent special abilities and training that characters can acquire, typically as alternatives to ability score improvements.

## Overview

Feats provide characters with unique abilities, skill bonuses, or mechanical advantages that reflect specialized training or natural talent.

## Schema Structure

```json
{
  "feat": [
    {
      "name": "Feat Name",
      "source": "SourceAbbreviation",
      "entries": ["Description of the feat's benefits and effects."]
    }
  ]
}
```

## Core Properties

### Required Properties

| Property  | Type   | Description             |
| --------- | ------ | ----------------------- |
| `name`    | string | The feat's name         |
| `source`  | string | Source identifier       |
| `entries` | array  | Description and effects |

### Common Properties

| Property                | Type    | Description                       |
| ----------------------- | ------- | --------------------------------- |
| `page`                  | integer | Page number in source             |
| `prerequisite`          | array   | Prerequisites for taking the feat |
| `ability`               | array   | Ability score improvements        |
| `skillProficiencies`    | array   | Skill proficiencies granted       |
| `languageProficiencies` | array   | Language proficiencies            |
| `toolProficiencies`     | array   | Tool proficiencies                |
| `weaponProficiencies`   | array   | Weapon proficiencies              |
| `armorProficiencies`    | array   | Armor proficiencies               |
| `resist`                | array   | Damage resistances                |
| `immune`                | array   | Damage immunities                 |
| `conditionImmune`       | array   | Condition immunities              |
| `senses`                | array   | Special senses                    |
| `additionalSpells`      | array   | Spells granted                    |
| `category`              | string  | Feat category                     |

## Prerequisites

### Ability Score Requirements

```json
"prerequisite": [
  {
    "ability": [
      {
        "str": 13
      }
    ]
  }
]
```

### Multiple Ability Requirements

```json
"prerequisite": [
  {
    "ability": [
      {
        "str": 13,
        "con": 13
      }
    ]
  }
]
```

### Race Requirements

```json
"prerequisite": [
  {
    "race": [
      {
        "name": "dwarf"
      }
    ]
  }
]
```

### Feature Requirements

```json
"prerequisite": [
  {
    "otherSummary": {
      "entry": "Spellcasting or Pact Magic feature",
      "entrySummary": "Spellcasting or Pact Magic"
    }
  }
]
```

### Level Requirements

```json
"prerequisite": [
  {
    "level": {
      "level": 4
    }
  }
]
```

## Ability Score Improvements

### Simple Ability Increase

```json
"ability": [
  {
    "str": 1
  }
]
```

### Choice of Abilities

```json
"ability": [
  {
    "choose": {
      "from": ["str", "dex", "con"],
      "count": 1,
      "amount": 1
    }
  }
]
```

### Multiple Increases

```json
"ability": [
  {
    "str": 1,
    "con": 1
  }
]
```

## Proficiencies

### Skill Proficiencies

```json
"skillProficiencies": [
  {
    "athletics": true,
    "intimidation": true
  }
]
```

### Skill Choices

```json
"skillProficiencies": [
  {
    "choose": {
      "from": ["athletics", "acrobatics", "stealth"],
      "count": 2
    }
  }
]
```

### Tool Proficiencies

```json
"toolProficiencies": [
  {
    "thieves' tools": true
  }
]
```

### Weapon Proficiencies

```json
"weaponProficiencies": [
  {
    "longsword|phb": true,
    "shortsword|phb": true
  }
]
```

## Damage Resistances and Immunities

```json
"resist": [
  "fire"
],
"immune": [
  "poison"
],
"conditionImmune": [
  "charmed"
]
```

## Special Senses

```json
"senses": [
  {
    "darkvision": 60
  }
]
```

## Additional Spells

### Spells Known

```json
"additionalSpells": [
  {
    "known": {
      "1": ["detect magic", "identify"]
    }
  }
]
```

### Innate Spellcasting

```json
"additionalSpells": [
  {
    "innate": {
      "1": {
        "daily": {
          "1": ["misty step"]
        }
      }
    },
    "ability": "cha"
  }
]
```

## Feat Categories

Common categories for organization:

- **"General"** - General feats available to all
- **"Fighting"** - Combat-focused feats
- **"Magic"** - Spellcasting-related feats
- **"Racial"** - Race-specific feats
- **"Background"** - Background-related feats

## Examples

### Combat Feat

```json
{
  "name": "Great Weapon Master",
  "source": "PHB",
  "page": 167,
  "entries": [
    "You've learned to put the weight of a weapon to your advantage, letting its momentum empower your strikes. You gain the following benefits:",
    {
      "type": "list",
      "items": [
        "On your turn, when you score a critical hit with a melee weapon or reduce a creature to 0 hit points with one, you can make one melee weapon attack as a bonus action.",
        "Before you make a melee attack with a heavy weapon that you are proficient with, you can choose to take a -5 penalty to the attack roll. If the attack hits, you add +10 to the attack's damage roll."
      ]
    }
  ]
}
```

### Half-Feat (Ability + Feature)

```json
{
  "name": "Keen Mind",
  "source": "PHB",
  "page": 167,
  "ability": [
    {
      "int": 1
    }
  ],
  "entries": [
    "You have a mind that can track time, direction, and detail with uncanny precision. You gain the following benefits:",
    {
      "type": "list",
      "items": [
        "Increase your Intelligence score by 1, to a maximum of 20.",
        "You always know which way is north.",
        "You always know the number of hours left before the next sunrise or sunset.",
        "You can accurately recall anything you have seen or heard within the past month."
      ]
    }
  ]
}
```

### Spellcasting Feat

```json
{
  "name": "Magic Initiate",
  "source": "PHB",
  "page": 168,
  "entries": [
    "Choose a class: bard, cleric, druid, sorcerer, warlock, or wizard. You learn two cantrips of your choice from that class's spell list.",
    "In addition, choose one 1st-level spell to learn from that same list. Using this feat, you can cast the spell once at its lowest level, and you must finish a long rest before you can cast it in this way again.",
    "Your spellcasting ability for these spells depends on the class you chose: Charisma for bard, sorcerer, or warlock; Wisdom for cleric or druid; or Intelligence for wizard."
  ],
  "additionalSpells": [
    {
      "known": {
        "1": {
          "_": {
            "choose": "level=0|class=bard;cleric;druid;sorcerer;warlock;wizard",
            "count": 2
          }
        }
      }
    },
    {
      "known": {
        "1": {
          "_": {
            "choose": "level=1|class=bard;cleric;druid;sorcerer;warlock;wizard",
            "count": 1
          }
        }
      }
    }
  ]
}
```

### Racial Feat

```json
{
  "name": "Elven Accuracy",
  "source": "XGE",
  "page": 74,
  "prerequisite": [
    {
      "race": [
        {
          "name": "elf"
        },
        {
          "name": "half-elf"
        }
      ]
    }
  ],
  "ability": [
    {
      "choose": {
        "from": ["dex", "int", "wis", "cha"],
        "count": 1,
        "amount": 1
      }
    }
  ],
  "entries": [
    "The accuracy of elves is legendary, especially that of elf archers and spellcasters. You have uncanny aim with attacks that rely on precision rather than brute force. You gain the following benefits:",
    {
      "type": "list",
      "items": [
        "Increase your Dexterity, Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.",
        "Whenever you have advantage on an attack roll using Dexterity, Intelligence, Wisdom, or Charisma, you can reroll one of the dice once."
      ]
    }
  ]
}
```

### Complex Feat with Resources

```json
{
  "name": "Lucky",
  "source": "PHB",
  "page": 167,
  "entries": [
    "You have inexplicable luck that seems to kick in at just the right moment.",
    "You have 3 luck points. Whenever you make an attack roll, an ability check, or a saving throw, you can spend one luck point to roll an additional {@dice d20}. You can choose to spend one of your luck points after you roll the die, but before the outcome is determined. You choose which of the {@dice d20}s is used for the attack roll, ability check, or saving throw.",
    "You can also spend one luck point when an attack roll is made against you. Roll a {@dice d20} and then choose whether the attack uses the attacker's roll or yours.",
    "If more than one creature spends a luck point to influence the outcome of a roll, the points cancel each other out; no additional dice are rolled.",
    "You regain your expended luck points when you finish a long rest."
  ],
  "additionalSources": [
    {
      "source": "SRD",
      "page": 60
    }
  ]
}
```

### Tool Proficiency Feat

```json
{
  "name": "Skilled",
  "source": "PHB",
  "page": 170,
  "entries": [
    "You gain proficiency in any combination of three skills or tools of your choice."
  ],
  "skillProficiencies": [
    {
      "choose": {
        "from": ["any"],
        "count": 3
      }
    }
  ]
}
```

## Entry Formatting

### Lists and Benefits

```json
"entries": [
  "You gain the following benefits:",
  {
    "type": "list",
    "items": [
      "First benefit description",
      "Second benefit description",
      "Third benefit description"
    ]
  }
]
```

### Tables in Feats

```json
"entries": [
  "Choose your fighting style from the following options:",
  {
    "type": "options",
    "entries": [
      {
        "type": "entries",
        "name": "Archery",
        "entries": [
          "You gain a +2 bonus to attack rolls you make with ranged weapons."
        ]
      },
      {
        "type": "entries",
        "name": "Defense",
        "entries": [
          "While you are wearing armor, you gain a +1 bonus to AC."
        ]
      }
    ]
  }
]
```

## Variant and Optional Feats

### Feat Variants

```json
{
  "name": "Fighting Initiate",
  "source": "TCE",
  "page": 80,
  "prerequisite": [
    {
      "otherSummary": {
        "entry": "Proficiency with a martial weapon",
        "entrySummary": "Proficiency with a martial weapon"
      }
    }
  ],
  "entries": [
    "Your martial training has helped you develop a particular style of fighting. As a result, you learn one Fighting Style option of your choice from the fighter class. If you already have a style, the one you choose must be different.",
    "Whenever you reach a level that grants the Ability Score Improvement feature, you can replace this feat's fighting style with another one from the fighter class that you don't have."
  ]
}
```

## Best Practices

1. **Clear Benefits**: Clearly state what the feat provides mechanically
2. **Balanced Power**: Ensure feats are worth taking over ability score improvements
3. **Prerequisites**: Set appropriate prerequisites to prevent abuse
4. **Flavorful Description**: Include flavor text that explains the feat thematically
5. **Cross-References**: Use `{@dice}`, `{@spell}`, and other tags appropriately
6. **Half-Feats**: Consider providing +1 ability score for less powerful feats
7. **Limited Use**: Consider daily or rest-based limitations for powerful abilities

This documentation provides comprehensive guidance for creating feats that enhance character customization while maintaining game balance.
