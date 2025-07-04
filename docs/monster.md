# 5eTools Monster Documentation

Monsters in 5eTools represent creatures that players might encounter, fight, or interact with during their adventures. This includes traditional monsters, NPCs, animals, and other creatures.

## Overview

The monster schema is one of the most complex in 5eTools, encompassing everything from basic statistics to special abilities, legendary actions, and environmental interactions.

## Schema Structure

```json
{
  "monster": [
    {
      "name": "Monster Name",
      "source": "SourceAbbreviation",
      "size": ["M"],
      "type": "humanoid",
      "alignment": ["L", "N"],
      "ac": [15],
      "hp": { "formula": "8d8 + 16", "average": 52 },
      "speed": { "walk": 30 },
      "str": 16,
      "dex": 12,
      "con": 14,
      "int": 10,
      "wis": 13,
      "cha": 11,
      "cr": "2"
    }
  ]
}
```

## Core Properties

### Required Properties

| Property                                 | Type          | Description                           |
| ---------------------------------------- | ------------- | ------------------------------------- |
| `name`                                   | string        | The creature's name                   |
| `source`                                 | string        | Source identifier                     |
| `size`                                   | array         | Size categories (T, S, M, L, H, G)    |
| `type`                                   | string/object | Creature type (humanoid, beast, etc.) |
| `alignment`                              | array         | Alignment abbreviations               |
| `ac`                                     | array         | Armor Class values                    |
| `hp`                                     | object        | Hit points (formula and average)      |
| `speed`                                  | object        | Movement speeds                       |
| `str`, `dex`, `con`, `int`, `wis`, `cha` | integer       | Ability scores                        |
| `cr`                                     | string/object | Challenge Rating                      |

### Common Optional Properties

| Property          | Type    | Description            |
| ----------------- | ------- | ---------------------- |
| `page`            | integer | Page number in source  |
| `skill`           | object  | Skill bonuses          |
| `save`            | object  | Saving throw bonuses   |
| `senses`          | array   | Special senses         |
| `passive`         | integer | Passive Perception     |
| `languages`       | array   | Known languages        |
| `resist`          | array   | Damage resistances     |
| `immune`          | array   | Damage immunities      |
| `vulnerable`      | array   | Damage vulnerabilities |
| `conditionImmune` | array   | Condition immunities   |
| `trait`           | array   | Special traits         |
| `action`          | array   | Actions                |
| `legendary`       | array   | Legendary actions      |
| `reaction`        | array   | Reactions              |
| `spellcasting`    | array   | Spellcasting abilities |

## Size Categories

- **"T"** - Tiny
- **"S"** - Small
- **"M"** - Medium
- **"L"** - Large
- **"H"** - Huge
- **"G"** - Gargantuan

## Creature Types

### Basic Types

```json
"type": "humanoid"
```

### Detailed Types with Subtypes

```json
"type": {
  "type": "humanoid",
  "tags": ["human", "fighter"]
}
```

### Swarm Types

```json
"type": {
  "type": "beast",
  "swarmSize": "T"
}
```

## Alignment

Alignment is an array of abbreviations:

- **"L"** - Lawful, **"N"** - Neutral, **"C"** - Chaotic
- **"G"** - Good, **"E"** - Evil
- **"U"** - Unaligned, **"A"** - Any alignment

```json
"alignment": ["L", "G"]  // Lawful Good
"alignment": ["N"]       // True Neutral
"alignment": ["C", "E"]  // Chaotic Evil
"alignment": ["A"]       // Any alignment
```

## Armor Class

### Simple AC

```json
"ac": [15]
```

### AC with Source

```json
"ac": [
  {
    "ac": 18,
    "from": ["plate armor"]
  }
]
```

### Multiple AC Values

```json
"ac": [
  {
    "ac": 15,
    "condition": "without armor"
  },
  {
    "ac": 18,
    "from": ["plate armor"],
    "condition": "with armor"
  }
]
```

## Hit Points

```json
"hp": {
  "formula": "8d8 + 16",
  "average": 52
}
```

### Special HP

```json
"hp": {
  "special": "equal to its summoner's level × 5"
}
```

## Speed

```json
"speed": {
  "walk": 30,
  "fly": 60,
  "swim": 30,
  "climb": 30,
  "burrow": 20
}
```

### Conditional Speed

```json
"speed": {
  "walk": 30,
  "fly": {
    "number": 60,
    "condition": "hover"
  }
}
```

## Skills and Saves

```json
"skill": {
  "perception": "+5",
  "stealth": "+7"
},
"save": {
  "dex": "+6",
  "wis": "+3"
}
```

## Senses

```json
"senses": [
  "darkvision 120 ft.",
  "tremorsense 60 ft."
],
"passive": 15
```

## Damage Interactions

```json
"resist": [
  "cold",
  "fire",
  {
    "resist": ["bludgeoning", "piercing", "slashing"],
    "note": "from nonmagical attacks"
  }
],
"immune": ["poison", "psychic"],
"vulnerable": ["fire"],
"conditionImmune": ["charmed", "frightened"]
```

## Traits, Actions, and Abilities

### Traits (Passive Abilities)

```json
"trait": [
  {
    "name": "Keen Sight",
    "entries": [
      "The creature has advantage on Wisdom ({@skill Perception}) checks that rely on sight."
    ]
  }
]
```

### Actions

```json
"action": [
  {
    "name": "Multiattack",
    "entries": [
      "The creature makes two weapon attacks."
    ]
  },
  {
    "name": "Longsword",
    "entries": [
      "{@atk mw} {@hit 5} to hit, reach 5 ft., one target. {@h}8 ({@damage 1d8 + 4}) slashing damage."
    ]
  }
]
```

### Legendary Actions

```json
"legendary": [
  {
    "name": "Move",
    "entries": [
      "The creature moves up to its speed without provoking opportunity attacks."
    ]
  },
  {
    "name": "Attack",
    "entries": [
      "The creature makes one weapon attack."
    ]
  }
],
"legendaryActions": 3
```

## Spellcasting

### Basic Spellcaster

```json
"spellcasting": [
  {
    "name": "Spellcasting",
    "headerEntries": [
      "The creature is an 8th-level spellcaster. Its spellcasting ability is Wisdom (spell save DC 13, {@hit 5} to hit with spell attacks). It has the following cleric spells prepared:"
    ],
    "spells": {
      "0": {
        "spells": [
          "{@spell light}",
          "{@spell mending}",
          "{@spell thaumaturgy}"
        ]
      },
      "1": {
        "slots": 4,
        "spells": [
          "{@spell cure wounds}",
          "{@spell guiding bolt}"
        ]
      }
    },
    "ability": "wis"
  }
]
```

### Innate Spellcasting

```json
"spellcasting": [
  {
    "name": "Innate Spellcasting",
    "headerEntries": [
      "The creature's spellcasting ability is Charisma (spell save DC 15). It can innately cast the following spells, requiring no material components:"
    ],
    "will": [
      "{@spell detect magic}",
      "{@spell disguise self}"
    ],
    "daily": {
      "3e": [
        "{@spell charm person}",
        "{@spell mirror image}"
      ],
      "1e": [
        "{@spell suggestion}"
      ]
    },
    "ability": "cha"
  }
]
```

## Challenge Rating

### Simple CR

```json
"cr": "5"
```

### CR with Custom XP

```json
"cr": {
  "cr": "5",
  "xp": 1800
}
```

### Variable CR (Coven)

```json
"cr": {
  "cr": "5",
  "coven": "7"
}
```

## Environment

```json
"environment": [
  "forest",
  "grassland",
  "hill"
]
```

## Complete Example

```json
{
  "name": "Elite Guard",
  "source": "MyHomebrew",
  "page": 1,
  "size": ["M"],
  "type": {
    "type": "humanoid",
    "tags": ["human"]
  },
  "alignment": ["L", "N"],
  "ac": [
    {
      "ac": 18,
      "from": ["plate armor"]
    }
  ],
  "hp": {
    "formula": "11d8 + 33",
    "average": 82
  },
  "speed": {
    "walk": 25
  },
  "str": 18,
  "dex": 12,
  "con": 16,
  "int": 11,
  "wis": 14,
  "cha": 13,
  "save": {
    "str": "+7",
    "con": "+6"
  },
  "skill": {
    "athletics": "+7",
    "intimidation": "+4",
    "perception": "+5"
  },
  "senses": ["darkvision 60 ft."],
  "passive": 15,
  "languages": ["Common"],
  "cr": "5",
  "trait": [
    {
      "name": "Action Surge",
      "entries": [
        "On its turn, the guard can take one additional action (recharges after a short or long rest)."
      ]
    }
  ],
  "action": [
    {
      "name": "Multiattack",
      "entries": ["The guard makes two weapon attacks."]
    },
    {
      "name": "Halberd",
      "entries": [
        "{@atk mw} {@hit 7} to hit, reach 10 ft., one target. {@h}9 ({@damage 1d10 + 4}) slashing damage."
      ]
    },
    {
      "name": "Heavy Crossbow",
      "entries": [
        "{@atk rw} {@hit 4} to hit, range 100/400 ft., one target. {@h}6 ({@damage 1d10 + 1}) piercing damage."
      ]
    }
  ],
  "environment": ["urban"]
}
```

## Special Formatting Tags

- `{@atk mw}` - Melee weapon attack
- `{@atk rw}` - Ranged weapon attack
- `{@hit 5}` - Attack bonus
- `{@h}` - Hit text separator
- `{@damage 1d8 + 2}` - Damage dice
- `{@dc 15}` - Difficulty Class
- `{@spell spell name}` - Spell reference
- `{@condition condition}` - Condition reference
- `{@skill skill name}` - Skill reference

## Best Practices

1. **Balanced Stats**: Ensure ability scores and CR align with intended challenge
2. **Clear Descriptions**: Write action descriptions that are easy to understand and run
3. **Proper Tags**: Use formatting tags for consistent display and functionality
4. **Environment**: Include appropriate environments for random encounters
5. **Source Attribution**: Always include proper source information
6. **Playtesting**: Test monsters in actual play to ensure they're fun and balanced

This documentation provides everything needed to create engaging and mechanically sound monsters for 5eTools.
