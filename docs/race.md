# Race Documentation

## Overview

The `race` section defines playable character races with their abilities, traits, and characteristics. Each race provides ability score improvements, special traits, and cultural background for player characters.

## Schema Structure

### Core Properties

| Property  | Type          | Required | Description                         |
| --------- | ------------- | -------- | ----------------------------------- |
| `name`    | string        | Yes      | The name of the race                |
| `source`  | string        | Yes      | Source abbreviation (e.g., "TftJC") |
| `page`    | number        | No       | Page number in the source           |
| `size`    | array         | Yes      | Size category (e.g., ["S"], ["M"])  |
| `speed`   | number/object | Yes      | Movement speed(s)                   |
| `ability` | array         | Yes      | Ability score improvements          |
| `entries` | array         | Yes      | Descriptive text and traits         |

### Physical Properties

| Property     | Type   | Required | Description              |
| ------------ | ------ | -------- | ------------------------ |
| `age`        | object | No       | Maturity and maximum age |
| `darkvision` | number | No       | Darkvision range in feet |
| `blindsight` | number | No       | Blindsight range in feet |

### Proficiency Properties

| Property                         | Type  | Required | Description                    |
| -------------------------------- | ----- | -------- | ------------------------------ |
| `skillProficiencies`             | array | No       | Skill proficiencies granted    |
| `languageProficiencies`          | array | No       | Language proficiencies granted |
| `toolProficiencies`              | array | No       | Tool proficiencies granted     |
| `weaponProficiencies`            | array | No       | Weapon proficiencies granted   |
| `armorProficiencies`             | array | No       | Armor proficiencies granted    |
| `skillToolLanguageProficiencies` | array | No       | Combined proficiency choices   |
| `expertise`                      | array | No       | Expertise in specific skills   |

### Special Properties

| Property            | Type           | Required | Description                                      |
| ------------------- | -------------- | -------- | ------------------------------------------------ |
| `resist`            | array          | No       | Damage resistances                               |
| `immune`            | array          | No       | Damage immunities                                |
| `vulnerable`        | array          | No       | Damage vulnerabilities                           |
| `conditionImmune`   | array          | No       | Condition immunities                             |
| `creatureTypes`     | array          | No       | Creature type(s) - use instead of `creatureType` |
| `creatureTypeTags`  | array          | No       | Additional creature type tags                    |
| `traitTags`         | array          | No       | Filter tags for traits                           |
| `heightAndWeight`   | object         | No       | Physical characteristics                         |
| `lineage`           | boolean/string | No       | Lineage information (true, "UA1", "VRGR")        |
| `additionalSpells`  | array          | No       | Additional spells granted                        |
| `startingEquipment` | object         | No       | Starting equipment for the race                  |
| `feats`             | array          | No       | Additional feats granted                         |

### Metadata Properties

| Property            | Type    | Required | Description                    |
| ------------------- | ------- | -------- | ------------------------------ |
| `alias`             | array   | No       | Alternative names for the race |
| `otherSources`      | array   | No       | Other source references        |
| `additionalSources` | array   | No       | Additional source references   |
| `reprintedAs`       | array   | No       | References to reprints         |
| `edition`           | string  | No       | Rules edition compatibility    |
| `legacy`            | boolean | No       | Whether this is legacy content |
| `hasFluff`          | boolean | No       | Whether fluff content exists   |
| `hasFluffImages`    | boolean | No       | Whether fluff images exist     |
| `fluff`             | object  | No       | Embedded fluff content         |

## Ability Score Improvements

```json
"ability": [
  {
    "dex": 2,
    "cha": 1
  }
]
```

## Speed Formats

### Simple Speed (Walking Only)

```json
"speed": 30
```

### Complex Speed (Multiple Types)

```json
"speed": {
  "walk": 20,
  "fly": 40,
  "swim": 30,
  "climb": 25
}
```

## Age Format

```json
"age": {
  "mature": 0.33,
  "max": 50
}
```

- `mature`: Age at which the race reaches maturity (in years)
- `max`: Maximum lifespan (in years)

## Language Proficiencies Format

```json
"languageProficiencies": [
  {
    "common": true,
    "infernal": true,
    "anyStandard": 1
  }
]
```

## Traits in Entries

Race traits are typically described in the entries array:

```json
"entries": [
  {
    "name": "Age",
    "type": "entries",
    "entries": ["Imps mature after 3 months and can live for up to 50 years."]
  },
  {
    "type": "entries",
    "name": "Size",
    "entries": ["Imps grow up to 1ft in height. Your Size is small."]
  },
  {
    "type": "entries",
    "name": "Speed",
    "entries": ["Your walking speed is 20ft, and you have a flying speed of 40ft."]
  },
  {
    "name": "Creature Type",
    "entries": ["Imps are Fiends."],
    "type": "entries"
  },
  {
    "name": "Darkvision",
    "entries": ["Imps have 60ft of Darkvision, and see in shades of crimson."],
    "type": "entries"
  }
]
```

## Example: Imp Race

```json
{
  "name": "Imp",
  "source": "TftJC",
  "page": 10,
  "size": ["S"],
  "speed": {
    "walk": 20,
    "fly": 40
  },
  "ability": [
    {
      "dex": 2,
      "cha": 1
    }
  ],
  "age": {
    "mature": 0.33,
    "max": 50
  },
  "darkvision": 60,
  "languageProficiencies": [
    {
      "common": true,
      "infernal": true
    }
  ],
  "entries": [
    {
      "name": "Age",
      "type": "entries",
      "entries": ["Imps mature after 3 months and can live for up to 50 years."]
    },
    {
      "type": "entries",
      "name": "Size",
      "entries": ["Imps grow up to 1ft in height. Your Size is small."]
    },
    {
      "type": "entries",
      "name": "Speed",
      "entries": [
        "Your walking speed is 20ft, and you have a flying speed of 40ft."
      ]
    },
    {
      "name": "Creature Type",
      "entries": ["Imps are Fiends."],
      "type": "entries"
    },
    {
      "name": "Language",
      "entries": ["Imps speak, read and write Common and Infernal."],
      "type": "entries"
    },
    {
      "name": "Darkvision",
      "entries": [
        "Imps have 60ft of Darkvision, and see in shades of crimson."
      ],
      "type": "entries"
    }
  ]
}
```

## Standard Traits to Include

Most races should describe these standard traits in their entries:

1. **Age**: Maturity and lifespan information
2. **Size**: Physical size and size category
3. **Speed**: Movement speeds and types
4. **Creature Type**: If different from humanoid
5. **Languages**: Known languages
6. **Special Senses**: Darkvision, blindsight, etc.
7. **Racial Traits**: Unique abilities and features

## Creature Types

Races can specify creature types using the `creatureTypes` array:

```json
"creatureTypes": ["fiend"]
```

Or with choices:

```json
"creatureTypes": [
  {
    "choose": ["humanoid", "fey"]
  }
]
```

Common creature types include:

- `humanoid` (default for most races)
- `fey`
- `fiend`
- `celestial`
- `construct`
- `undead`
- `elemental`

## Best Practices

1. **Balanced ASIs**: Total ability score improvements should equal +2 (typically +2/+1 or +1/+1/+1)
2. **Appropriate Speed**: Consider the race's physical characteristics
3. **Consistent Traits**: Include standard trait descriptions in entries
4. **Cultural Context**: Provide background and cultural information
5. **Mechanical Clarity**: Clearly describe any special abilities or traits

## Related Sections

- **subrace**: Variants of the base race
- **feat**: Some racial feats may be available
- **optionalfeature**: Racial variants may be optional features
- **spell**: Races may have innate spellcasting abilities

## File Organization

- Each race gets its own JSON file in the race/ directory
- File names should match the race name exactly
- Related races can be grouped by theme or origin if desired
