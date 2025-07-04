# Background Documentation

## Overview

The `background` section defines character backgrounds that provide proficiencies, equipment, features, and roleplay elements for player characters. Each background represents a character's life before becoming an adventurer.

## Schema Structure

### Core Properties

| Property  | Type   | Required | Description                             |
| --------- | ------ | -------- | --------------------------------------- |
| `name`    | string | Yes      | The name of the background              |
| `source`  | string | Yes      | Source abbreviation (e.g., "TftJC")     |
| `page`    | number | No       | Page number in the source               |
| `entries` | array  | Yes      | Descriptive text and mechanical details |

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

### Equipment and Features

| Property            | Type   | Required | Description                             |
| ------------------- | ------ | -------- | --------------------------------------- |
| `startingEquipment` | object | No       | Starting equipment for the background   |
| `feats`             | array  | No       | Optional feats that can be taken        |
| `fromFeature`       | object | No       | Map of properties tied to Feature entry |
| `prerequisite`      | object | No       | Prerequisites for the background        |

### Additional Properties

| Property            | Type    | Required | Description                  |
| ------------------- | ------- | -------- | ---------------------------- |
| `additionalSources` | array   | No       | Additional source references |
| `otherSources`      | array   | No       | Other source references      |
| `reprintedAs`       | array   | No       | References to reprints       |
| `edition`           | string  | No       | Rules edition compatibility  |
| `ability`           | array   | No       | Ability score improvements   |
| `resist`            | array   | No       | Damage resistances           |
| `immune`            | array   | No       | Damage immunities            |
| `vulnerable`        | array   | No       | Damage vulnerabilities       |
| `conditionImmune`   | array   | No       | Condition immunities         |
| `additionalSpells`  | array   | No       | Additional spells granted    |
| `hasFluff`          | boolean | No       | Whether fluff content exists |
| `hasFluffImages`    | boolean | No       | Whether fluff images exist   |
| `fluff`             | object  | No       | Embedded fluff content       |

## Skill Proficiencies Format

```json
"skillProficiencies": [
  {
    "athletics": true,
    "intimidation": true
  }
]
```

## Language Proficiencies Format

```json
"languageProficiencies": [
  {
    "anyStandard": 1,
    "exotic": ["giant", "primordial"]
  }
]
```

## Starting Equipment Format

```json
"startingEquipment": [
  {
    "_": [
      "traveler's clothes|phb",
      "bedroll|phb",
      {
        "item": "pouch|phb",
        "containsValue": 100
      },
      {
        "special": "memento from home"
      }
    ]
  }
]
```

## Entries Structure

Backgrounds use the standard entries format with descriptive lists:

```json
"entries": [
  {
    "type": "list",
    "style": "list-hang-notitle",
    "items": [
      {
        "type": "item",
        "name": "Skill Proficiencies:",
        "entry": "{@skill Athletics}, {@skill Intimidation}"
      },
      {
        "type": "item",
        "name": "Feature: Feature Name",
        "entry": "Description of the background feature..."
      }
    ]
  }
]
```

## Example: Red Banner Recruit

```json
{
  "name": "Red Banner Recruit",
  "source": "TftJC",
  "feats": [
    {
      "Eldritch Adept|TCE": true
    }
  ],
  "skillProficiencies": [
    {
      "athletics": true,
      "intimidation": true
    }
  ],
  "languageProficiencies": [
    {
      "anyStandard": 1
    }
  ],
  "startingEquipment": [
    {
      "_": [
        "traveler's clothes|phb",
        "bedroll|phb",
        "mess kit|phb",
        {
          "item": "pouch|phb",
          "containsValue": 100
        },
        {
          "special": "memento from home"
        }
      ]
    }
  ],
  "fromFeature": {
    "feats": true
  },
  "entries": [
    {
      "type": "list",
      "style": "list-hang-notitle",
      "items": [
        {
          "type": "item",
          "name": "Skill Proficiencies:",
          "entry": "{@skill Athletics}, {@skill Intimidation}"
        },
        {
          "type": "item",
          "name": "Languages:",
          "entry": "One of your choice"
        },
        {
          "type": "item",
          "name": "Equipment:",
          "entry": "Traveler's clothes, bedroll, mess kit, pouch containing 10 gp, memento from home"
        },
        {
          "type": "item",
          "name": "Feature: Military Rank",
          "entry": "You have a military rank from your career as a soldier..."
        }
      ]
    }
  ]
}
```

## Best Practices

1. **Skill Selection**: Backgrounds typically grant 2 skill proficiencies
2. **Equipment**: Include both mundane starting equipment and a small amount of money
3. **Features**: Each background should have a unique feature that provides roleplay opportunities
4. **Consistency**: Follow standard D&D 5e background patterns for balance
5. **Source References**: Use proper item references with source tags (e.g., "item|source")

## Related Sections

- **feat**: Backgrounds may reference optional feats
- **item**: Starting equipment references items from the item section
- **optionalfeature**: Background variants may be defined as optional features
