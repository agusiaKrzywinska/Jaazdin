# Subrace Documentation

## Overview

The `subrace` section defines variants or subtypes of existing races. Subraces provide additional or modified traits while maintaining the core characteristics of their parent race.

## Schema Structure

### Core Properties

| Property     | Type   | Required | Description                         |
| ------------ | ------ | -------- | ----------------------------------- |
| `name`       | string | Yes      | The name of the subrace             |
| `source`     | string | Yes      | Source abbreviation (e.g., "TftJC") |
| `raceName`   | string | Yes      | The parent race name                |
| `raceSource` | string | Yes      | Source of the parent race           |
| `page`       | number | No       | Page number in the source           |
| `entries`    | array  | Yes      | Descriptive text and traits         |

### Override Properties

These properties can override or modify the parent race's traits:
| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `size` | array | No | Override parent race size |
| `speed` | number/object | No | Override parent race speed |
| `ability` | array | No | Additional ability score improvements |

### Additional Properties

| Property                         | Type           | Required | Description                              |
| -------------------------------- | -------------- | -------- | ---------------------------------------- |
| `skillProficiencies`             | array          | No       | Additional skill proficiencies           |
| `languageProficiencies`          | array          | No       | Additional language proficiencies        |
| `toolProficiencies`              | array          | No       | Additional tool proficiencies            |
| `skillToolLanguageProficiencies` | array          | No       | Combined proficiency choices             |
| `weaponProficiencies`            | array          | No       | Additional weapon proficiencies          |
| `armorProficiencies`             | array          | No       | Additional armor proficiencies           |
| `expertise`                      | array          | No       | Expertise in specific skills             |
| `darkvision`                     | number         | No       | Override darkvision range                |
| `blindsight`                     | number         | No       | Override blindsight range                |
| `resist`                         | array          | No       | Additional damage resistances            |
| `immune`                         | array          | No       | Additional damage immunities             |
| `vulnerable`                     | array          | No       | Additional damage vulnerabilities        |
| `conditionImmune`                | array          | No       | Additional condition immunities          |
| `creatureTypes`                  | array          | No       | Override creature types                  |
| `creatureTypeTags`               | array          | No       | Additional creature type tags            |
| `traitTags`                      | array          | No       | Filter tags for traits                   |
| `heightAndWeight`                | object         | No       | Physical characteristics override        |
| `lineage`                        | boolean/string | No       | Lineage information                      |
| `additionalSpells`               | array          | No       | Additional spells granted                |
| `startingEquipment`              | object         | No       | Starting equipment override              |
| `feats`                          | array          | No       | Additional feats granted                 |
| `overwrite`                      | object         | No       | Properties to overwrite from parent race |

### Metadata Properties

| Property            | Type    | Required | Description                       |
| ------------------- | ------- | -------- | --------------------------------- |
| `alias`             | array   | No       | Alternative names for the subrace |
| `otherSources`      | array   | No       | Other source references           |
| `additionalSources` | array   | No       | Additional source references      |
| `reprintedAs`       | array   | No       | References to reprints            |
| `edition`           | string  | No       | Rules edition compatibility       |
| `legacy`            | boolean | No       | Whether this is legacy content    |
| `hasFluff`          | boolean | No       | Whether fluff content exists      |
| `hasFluffImages`    | boolean | No       | Whether fluff images exist        |
| `fluff`             | object  | No       | Embedded fluff content            |

## Parent Race References

Subraces must reference their parent race:

```json
{
  "raceName": "Modron",
  "raceSource": "TftJC"
}
```

## Ability Score Modifications

Subraces can provide additional ability score improvements:

```json
"ability": [
  {
    "int": 2,
    "con": 1
  }
]
```

## Size and Speed Overrides

Subraces can change physical characteristics:

```json
{
  "name": "Tridrone",
  "size": ["M"],
  "speed": 30
}
```

## Example: Modron Tridrone

```json
{
  "name": "Tridrone",
  "source": "TftJC",
  "page": 9,
  "size": ["M"],
  "speed": 30,
  "ability": [
    {
      "int": 2,
      "con": 1
    }
  ],
  "entries": [
    {
      "name": "Tridrone",
      "entries": [
        "You can no longer be surprised, nor can other creatures benefit from flanking you. Your size becomes Medium."
      ],
      "type": "entries"
    }
  ],
  "raceName": "Modron",
  "raceSource": "TftJC"
}
```

## Common Subrace Patterns

### Size Progression

Some subraces modify size based on advancement or type:

```json
{
  "name": "Large Variant",
  "size": ["L"],
  "entries": [
    {
      "name": "Large Variant",
      "entries": ["Your size becomes Large..."],
      "type": "entries"
    }
  ]
}
```

### Elemental Variants

Subraces based on elemental affinities:

```json
{
  "name": "Fire Variant",
  "resist": ["fire"],
  "entries": [
    {
      "name": "Fire Resistance",
      "entries": ["You have resistance to fire damage..."],
      "type": "entries"
    }
  ]
}
```

### Cultural Variants

Subraces representing different cultures or regions:

```json
{
  "name": "Desert Variant",
  "skillProficiencies": [
    {
      "survival": true
    }
  ],
  "entries": [
    {
      "name": "Desert Adaptation",
      "entries": ["You are adapted to desert environments..."],
      "type": "entries"
    }
  ]
}
```

## File Organization

### Directory Structure

```
subrace/
  ParentRaceName/
    Subrace1.json
    Subrace2.json
    Subrace3.json
```

### Example Structure

```
subrace/
  Modron/
    Tridrone.json
    Quadrone.json
    Pentadrone.json
    Monodrone.json
    Duodrone.json
  Imp/
    Tricksy.json
    Hellfire.json
  Gnome/
    Desert.json
  Elf/
    Ice.json
```

## Inheritance Rules

Subraces inherit all traits from their parent race unless explicitly overridden:

### Inherited Properties

- Base ability scores (unless ability array is provided)
- Size (unless size is specified)
- Speed (unless speed is specified)
- Languages (unless languageProficiencies is provided)
- All other traits not explicitly modified

### Additive Properties

Some properties are additive rather than replacement:

- Skill proficiencies (additional to parent)
- Resistances/immunities (additional to parent)
- Tool proficiencies (additional to parent)

### Override Properties

These properties completely replace the parent's version:

- Size (if specified)
- Speed (if specified)
- Ability scores (if specified)
- Darkvision (if specified)

## Example: Complete Subrace Set

### Parent Race: Modron

```json
{
  "name": "Modron",
  "source": "TftJC",
  "size": ["S"],
  "speed": 25,
  "ability": [{ "con": 1, "int": 1 }]
}
```

### Subrace: Tridrone (Medium Advancement)

```json
{
  "name": "Tridrone",
  "source": "TftJC",
  "page": 9,
  "size": ["M"],
  "speed": 30,
  "ability": [
    {
      "int": 2,
      "con": 1
    }
  ],
  "entries": [
    {
      "name": "Tridrone",
      "entries": [
        "You can no longer be surprised, nor can other creatures benefit from flanking you. Your size becomes Medium."
      ],
      "type": "entries"
    }
  ],
  "raceName": "Modron",
  "raceSource": "TftJC"
}
```

## Best Practices

1. **Clear Differentiation**: Each subrace should feel meaningfully different
2. **Balanced Modifications**: Changes should be balanced against the base race
3. **Thematic Consistency**: Subraces should fit the parent race's theme
4. **Reference Integrity**: Ensure parent race exists and is properly referenced
5. **Descriptive Names**: Use names that clearly indicate the subrace's nature

## Overwrite Properties

The `overwrite` property allows subraces to completely replace parent race properties:

```json
{
  "overwrite": {
    "size": true,
    "speed": true
  }
}
```

This explicitly marks which properties should be replaced rather than inherited.

## Related Sections

- **race**: Parent races that subraces extend
- **feat**: Some racial feats may be subrace-specific
- **optionalfeature**: Subrace variants may be optional features
- **spell**: Subraces may modify innate spellcasting abilities

## Common Use Cases

- **Progression**: Advancement stages (Small → Medium → Large)
- **Environment**: Adaptations to different environments
- **Culture**: Different societies or traditions
- **Elements**: Elemental affinities or powers
- **Alignment**: Good/evil or law/chaos variants
