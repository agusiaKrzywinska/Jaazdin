# 5eTools Optional Feature Documentation

Optional features in 5eTools represent class features that can be chosen from a list, such as Fighting Styles, Metamagic Options, Eldritch Invocations, Maneuvers, and other similar mechanics.

## Overview

Optional features provide players with choices within their class progression. They are referenced by classes and subclasses to offer customization options at specific levels.

## Schema Structure

```json
{
  "optionalfeature": [
    {
      "name": "Feature Name",
      "source": "SourceAbbreviation"
      // ... additional properties
    }
  ]
}
```

## Core Properties

### Required Properties

| Property  | Type   | Description                                      |
| --------- | ------ | ------------------------------------------------ |
| `name`    | string | The name of the optional feature                 |
| `source`  | string | The source identifier where this feature appears |
| `entries` | array  | Array of entry objects describing the feature    |

### Common Properties

| Property                | Type    | Description                                           |
| ----------------------- | ------- | ----------------------------------------------------- |
| `page`                  | integer | Page number in the source material                    |
| `featureType`           | array   | Types of feature (e.g., "EI" for Eldritch Invocation) |
| `prerequisite`          | object  | Prerequisites for taking this feature                 |
| `isClassFeatureVariant` | boolean | Whether this is a class feature variant               |
| `consumes`              | object  | Resources consumed when using this feature            |

## Feature Types

Common feature type abbreviations:

- **"EI"** - Eldritch Invocation
- **"FS:F"** - Fighting Style: Fighter
- **"FS:P"** - Fighting Style: Paladin
- **"FS:R"** - Fighting Style: Ranger
- **"MM"** - Metamagic
- **"MV"** - Maneuver
- **"MV:B"** - Maneuver: Battle Master
- **"AI"** - Artificer Infusion
- **"ED"** - Elemental Discipline
- **"OTH"** - Other

## Prerequisites

Prerequisites can include level requirements, other features, spells known, or ability scores:

```json
{
  "prerequisite": [
    {
      "level": {
        "level": 5,
        "class": {
          "name": "Warlock",
          "source": "PHB"
        }
      }
    },
    {
      "otherSummary": {
        "entry": "Pact of the Blade feature",
        "entrySummary": "Pact of the Blade"
      }
    }
  ]
}
```

## Entry Types

Optional features use the standard 5eTools entry system:

### Basic Text Entry

```json
{
  "entries": ["This is a simple text description of the feature."]
}
```

### List Entry

```json
{
  "entries": [
    {
      "type": "list",
      "items": ["First benefit of the feature", "Second benefit of the feature"]
    }
  ]
}
```

### Enhanced Description

```json
{
  "entries": [
    "You learn additional spells based on your patron:",
    {
      "type": "table",
      "caption": "Expanded Spell List",
      "colLabels": ["Spell Level", "Spells"],
      "colStyles": ["col-2 text-center", "col-10"],
      "rows": [
        ["1st", "{@spell command|PHB}, {@spell heroism|PHB}"],
        ["2nd", "{@spell aid|PHB}, {@spell enhance ability|PHB}"]
      ]
    }
  ]
}
```

## Examples

### Fighting Style

```json
{
  "name": "Archery",
  "source": "PHB",
  "page": 72,
  "featureType": ["FS:F", "FS:R"],
  "entries": [
    "You gain a +2 bonus to attack rolls you make with ranged weapons."
  ]
}
```

### Eldritch Invocation

```json
{
  "name": "Agonizing Blast",
  "source": "PHB",
  "page": 110,
  "featureType": ["EI"],
  "prerequisite": [
    {
      "otherSummary": {
        "entry": "{@spell eldritch blast|PHB} cantrip",
        "entrySummary": "eldritch blast cantrip"
      }
    }
  ],
  "entries": [
    "When you cast {@spell eldritch blast|PHB}, add your Charisma modifier to the damage it deals on a hit."
  ]
}
```

### Metamagic Option

```json
{
  "name": "Careful Spell",
  "source": "PHB",
  "page": 102,
  "featureType": ["MM"],
  "entries": [
    "When you cast a spell that forces other creatures to make a saving throw, you can protect some of those creatures from the spell's full force. To do so, you spend 1 sorcery point and choose a number of those creatures up to your Charisma modifier (minimum of one creature). A chosen creature automatically succeeds on its saving throw against the spell."
  ]
}
```

### Custom Feature with Resource Consumption

```json
{
  "name": "Tactical Strike",
  "source": "MyHomebrew",
  "page": 1,
  "featureType": ["TECH"],
  "consumes": {
    "name": "Superiority Dice"
  },
  "entries": [
    "When you make a weapon attack, you can expend one superiority die to add it to the attack roll. You can use this maneuver before or after making the attack roll, but before any effects of the attack are applied."
  ]
}
```

## Class Feature Variants

For optional rules that replace existing class features:

```json
{
  "name": "Spell Versatility",
  "source": "UAClassFeatures",
  "page": 1,
  "isClassFeatureVariant": true,
  "entries": [
    "Whenever you finish a long rest, you can replace one spell you know with another spell from the sorcerer spell list. The new spell must be of a level for which you have spell slots."
  ]
}
```

## Referencing Optional Features

Optional features are referenced in class features using:

```json
{
  "optionalfeatureProgression": [
    {
      "name": "Fighting Style",
      "featureType": ["FS:F"],
      "progression": {
        "1": 1
      }
    }
  ]
}
```

## Best Practices

1. **Clear Names**: Use descriptive names that clearly indicate the feature's purpose
2. **Proper Types**: Always include appropriate `featureType` for filtering and organization
3. **Prerequisites**: Clearly define any prerequisites using the standard format
4. **Cross-References**: Use `{@spell}`, `{@class}`, and other tags for proper linking
5. **Resource Tracking**: Use `consumes` for features that use limited resources
6. **Consistent Formatting**: Follow 5eTools entry formatting standards

## Integration Notes

- Optional features appear in class progression tables when referenced
- They can be filtered by type in the 5eTools interface
- Prerequisites are automatically checked and displayed
- Resource consumption integrates with character sheet tracking
- Cross-references create clickable links in the interface

This documentation provides a comprehensive guide to creating optional features that integrate seamlessly with the 5eTools ecosystem.
