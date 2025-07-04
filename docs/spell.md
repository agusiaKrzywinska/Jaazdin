# 5eTools Spell Documentation

Spells in 5eTools represent magical effects that characters can cast, from simple cantrips to reality-altering 9th-level spells.

## Overview

The spell system supports all aspects of D&D 5e spellcasting, including spell levels, schools, components, casting times, ranges, durations, and complex spell effects.

## Schema Structure

```json
{
  "spell": [
    {
      "name": "Spell Name",
      "source": "SourceAbbreviation",
      "level": 1,
      "school": "V",
      "time": [{ "number": 1, "unit": "action" }],
      "range": {
        "type": "point",
        "distance": { "type": "feet", "amount": 60 }
      },
      "components": { "v": true, "s": true, "m": "a bit of fleece" },
      "duration": [
        { "type": "timed", "duration": { "type": "minute", "amount": 1 } }
      ],
      "entries": ["Description of the spell's effects."]
    }
  ]
}
```

## Core Properties

### Required Properties

| Property     | Type    | Description                           |
| ------------ | ------- | ------------------------------------- |
| `name`       | string  | The spell's name                      |
| `source`     | string  | Source identifier                     |
| `level`      | integer | Spell level (0-9, where 0 is cantrip) |
| `school`     | string  | School of magic abbreviation          |
| `time`       | array   | Casting time                          |
| `range`      | object  | Range and targeting                   |
| `components` | object  | Verbal, somatic, material components  |
| `duration`   | array   | Duration of effect                    |
| `entries`    | array   | Spell description                     |

### Common Optional Properties

| Property           | Type    | Description                        |
| ------------------ | ------- | ---------------------------------- |
| `page`             | integer | Page number in source              |
| `classes`          | object  | Which classes can learn this spell |
| `ritual`           | boolean | Can be cast as a ritual            |
| `concentration`    | boolean | Requires concentration             |
| `meta`             | object  | Additional metadata                |
| `damageInflict`    | array   | Types of damage dealt              |
| `conditionInflict` | array   | Conditions imposed                 |
| `savingThrow`      | array   | Required saving throws             |
| `miscTags`         | array   | Miscellaneous tags                 |

## Spell Schools

- **"A"** - Abjuration
- **"C"** - Conjuration
- **"D"** - Divination
- **"E"** - Enchantment
- **"V"** - Evocation
- **"I"** - Illusion
- **"N"** - Necromancy
- **"T"** - Transmutation

## Casting Time

### Standard Times

```json
"time": [
  {"number": 1, "unit": "action"}
]
```

### Multiple Options

```json
"time": [
  {"number": 1, "unit": "action"},
  {"number": 8, "unit": "hour", "condition": "when cast as a ritual"}
]
```

### Complex Times

```json
"time": [
  {"number": 1, "unit": "minute"},
  {"number": 10, "unit": "minute", "condition": "when cast with higher-level spell slots"}
]
```

## Range and Targeting

### Point Range

```json
"range": {
  "type": "point",
  "distance": {
    "type": "feet",
    "amount": 60
  }
}
```

### Self Range

```json
"range": {
  "type": "point",
  "distance": {
    "type": "self"
  }
}
```

### Touch Range

```json
"range": {
  "type": "point",
  "distance": {
    "type": "touch"
  }
}
```

### Area Effects

```json
"range": {
  "type": "cube",
  "distance": {
    "type": "feet",
    "amount": 20
  }
}
```

### Line Effects

```json
"range": {
  "type": "line",
  "distance": {
    "type": "feet",
    "amount": 100
  }
}
```

## Components

### Verbal and Somatic

```json
"components": {
  "v": true,
  "s": true
}
```

### Material Components

```json
"components": {
  "v": true,
  "s": true,
  "m": "a bit of fleece"
}
```

### Costly Material Components

```json
"components": {
  "v": true,
  "s": true,
  "m": {
    "text": "a diamond worth at least 300 gp, which the spell consumes",
    "cost": 30000,
    "consume": true
  }
}
```

## Duration

### Instantaneous

```json
"duration": [
  {"type": "instant"}
]
```

### Timed Duration

```json
"duration": [
  {
    "type": "timed",
    "duration": {
      "type": "minute",
      "amount": 10
    }
  }
]
```

### Concentration

```json
"duration": [
  {
    "type": "timed",
    "duration": {
      "type": "minute",
      "amount": 10
    },
    "concentration": true
  }
]
```

### Until Dispelled

```json
"duration": [
  {"type": "permanent", "ends": ["dispel"]}
]
```

### Permanent

```json
"duration": [
  {"type": "permanent"}
]
```

## Classes

### Simple Class List

```json
"classes": {
  "fromClassList": [
    {"name": "Wizard", "source": "PHB"},
    {"name": "Sorcerer", "source": "PHB"}
  ]
}
```

### Subclass Spells

```json
"classes": {
  "fromSubclass": [
    {
      "class": {"name": "Cleric", "source": "PHB"},
      "subclass": {"name": "Light", "source": "PHB"}
    }
  ]
}
```

### Class List and Subclass

```json
"classes": {
  "fromClassList": [
    {"name": "Wizard", "source": "PHB"}
  ],
  "fromSubclass": [
    {
      "class": {"name": "Fighter", "source": "PHB"},
      "subclass": {"name": "Eldritch Knight", "source": "PHB"}
    }
  ]
}
```

## Higher Level Effects

### Damage Scaling

```json
"entriesHigherLevel": [
  {
    "type": "entries",
    "name": "At Higher Levels",
    "entries": [
      "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by {@scaledamage 1d6|1-9|1d6} for each slot level above 1st."
    ]
  }
]
```

### Target Scaling

```json
"entriesHigherLevel": [
  {
    "type": "entries",
    "name": "At Higher Levels",
    "entries": [
      "When you cast this spell using a spell slot of 3rd level or higher, you can target one additional creature for each slot level above 2nd."
    ]
  }
]
```

## Special Tags

### Damage Types

```json
"damageInflict": [
  "fire",
  "radiant"
]
```

### Conditions

```json
"conditionInflict": [
  "charmed",
  "frightened"
]
```

### Saving Throws

```json
"savingThrow": [
  "wisdom",
  "charisma"
]
```

### Miscellaneous Tags

```json
"miscTags": [
  "UBA",    // Uses bonus action
  "SGT",    // Single target
  "AAD",    // Area of effect damage
  "HL",     // Healing
  "THP"     // Temporary hit points
]
```

## Spell Examples

### Cantrip

```json
{
  "name": "Fire Bolt",
  "source": "PHB",
  "page": 242,
  "level": 0,
  "school": "V",
  "time": [{ "number": 1, "unit": "action" }],
  "range": {
    "type": "point",
    "distance": {
      "type": "feet",
      "amount": 120
    }
  },
  "components": {
    "v": true,
    "s": true
  },
  "duration": [{ "type": "instant" }],
  "entries": [
    "You hurl a mote of fire at a creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes {@damage 1d10} fire damage. A flammable object hit by this spell ignites if it isn't being worn or carried."
  ],
  "entriesHigherLevel": [
    {
      "type": "entries",
      "name": "At Higher Levels",
      "entries": [
        "This spell's damage increases by {@scaledamage 1d10|0,5,11,17|1d10} when you reach 5th level ({@scaledamage 1d10|5|2d10}), 11th level ({@scaledamage 1d10|11|3d10}), and 17th level ({@scaledamage 1d10|17|4d10})."
      ]
    }
  ],
  "classes": {
    "fromClassList": [
      { "name": "Sorcerer", "source": "PHB" },
      { "name": "Wizard", "source": "PHB" }
    ]
  },
  "damageInflict": ["fire"],
  "spellAttack": ["ranged"],
  "miscTags": ["SGT"]
}
```

### Ritual Spell

```json
{
  "name": "Detect Magic",
  "source": "PHB",
  "page": 231,
  "level": 1,
  "school": "D",
  "time": [{ "number": 1, "unit": "action" }],
  "range": {
    "type": "point",
    "distance": {
      "type": "self"
    }
  },
  "components": {
    "v": true,
    "s": true
  },
  "duration": [
    {
      "type": "timed",
      "duration": {
        "type": "minute",
        "amount": 10
      },
      "concentration": true
    }
  ],
  "ritual": true,
  "entries": [
    "For the duration, you sense the presence of magic within 30 feet of you. If you sense magic in this way, you can use your action to see a faint aura around any visible creature or object in the area that bears magic, and you learn its school of magic, if any.",
    "The spell can penetrate most barriers, but it is blocked by 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt."
  ],
  "classes": {
    "fromClassList": [
      { "name": "Bard", "source": "PHB" },
      { "name": "Cleric", "source": "PHB" },
      { "name": "Druid", "source": "PHB" },
      { "name": "Paladin", "source": "PHB" },
      { "name": "Ranger", "source": "PHB" },
      { "name": "Sorcerer", "source": "PHB" },
      { "name": "Wizard", "source": "PHB" }
    ]
  },
  "miscTags": ["SGT"]
}
```

### Complex Spell

```json
{
  "name": "Fireball",
  "source": "PHB",
  "page": 241,
  "level": 3,
  "school": "V",
  "time": [{ "number": 1, "unit": "action" }],
  "range": {
    "type": "point",
    "distance": {
      "type": "feet",
      "amount": 150
    }
  },
  "components": {
    "v": true,
    "s": true,
    "m": "a tiny ball of bat guano and sulfur"
  },
  "duration": [{ "type": "instant" }],
  "entries": [
    "A bright streak flashes from your pointing finger to a point you choose within range and then blossoms with a low roar into an explosion of flame. Each creature in a 20-foot-radius sphere centered on that point must make a Dexterity saving throw. A target takes {@damage 8d6} fire damage on a failed save, or half as much damage on a successful one.",
    "The fire spreads around corners. It ignites flammable objects in the area that aren't being worn or carried."
  ],
  "entriesHigherLevel": [
    {
      "type": "entries",
      "name": "At Higher Levels",
      "entries": [
        "When you cast this spell using a spell slot of 4th level or higher, the damage increases by {@scaledamage 8d6|3-9|1d6} for each slot level above 3rd."
      ]
    }
  ],
  "classes": {
    "fromClassList": [
      { "name": "Sorcerer", "source": "PHB" },
      { "name": "Wizard", "source": "PHB" }
    ]
  },
  "damageInflict": ["fire"],
  "savingThrow": ["dexterity"],
  "areaTags": ["S"],
  "miscTags": ["AAD"]
}
```

## Special Mechanics

### Summoning Spells

```json
{
  "name": "Conjure Animals",
  "summons": ["fey spirit"],
  "entries": [
    "You summon fey spirits that take the form of beasts and appear in unoccupied spaces that you can see within range. Choose one of the following options for what appears:",
    {
      "type": "list",
      "items": [
        "One beast of challenge rating 2 or lower",
        "Two beasts of challenge rating 1 or lower",
        "Four beasts of challenge rating 1/2 or lower",
        "Eight beasts of challenge rating 1/4 or lower"
      ]
    }
  ]
}
```

### Spell Lists

```json
{
  "name": "Expanded Spell List Feature",
  "spellsKnownProgression": [
    {
      "1": ["command", "heroism"],
      "3": ["aid", "enhance ability"],
      "5": ["mass healing word", "slow"],
      "7": ["compulsion", "locate creature"],
      "9": ["commune", "flame strike"]
    }
  ]
}
```

## Meta Information

### Spell Tags for Organization

```json
"meta": {
  "ritual": true,
  "technomagic": true
}
```

## Best Practices

1. **Clear Descriptions**: Write spell effects that are unambiguous and easy to understand
2. **Proper Scaling**: Use `entriesHigherLevel` for spells that scale with slot level
3. **Accurate Tags**: Include all relevant damage types, conditions, and miscellaneous tags
4. **Class Lists**: Ensure spells are available to appropriate classes and subclasses
5. **Component Costs**: Specify material component costs and consumption accurately
6. **Cross-References**: Use `{@spell}`, `{@condition}`, `{@damage}` tags for consistency
7. **Balance Consideration**: Ensure custom spells are balanced for their level

This documentation provides everything needed to create spells that integrate perfectly with 5eTools and maintain game balance.
