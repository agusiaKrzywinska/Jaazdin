# Subclass Feature Documentation

## Overview

The `subclassFeature` section defines individual features that belong to specific subclasses. These features are gained at specific levels and provide the mechanical benefits and abilities that define each subclass.

## Schema Structure

### Core Properties

| Property            | Type   | Required | Description                         |
| ------------------- | ------ | -------- | ----------------------------------- |
| `name`              | string | Yes      | The name of the feature             |
| `source`            | string | Yes      | Source abbreviation (e.g., "TftJC") |
| `className`         | string | Yes      | The parent class name               |
| `classSource`       | string | Yes      | Source of the parent class          |
| `subclassShortName` | string | Yes      | Short name of the subclass          |
| `subclassSource`    | string | Yes      | Source of the subclass              |
| `level`             | number | Yes      | Level when the feature is gained    |
| `entries`           | array  | Yes      | Descriptive text and mechanics      |

### Optional Properties

| Property                   | Type    | Required | Description                           |
| -------------------------- | ------- | -------- | ------------------------------------- |
| `page`                     | number  | No       | Page number in the source             |
| `header`                   | number  | No       | Header level for nested features      |
| `type`                     | string  | No       | Feature type ("inset", "item")        |
| `isClassFeatureVariant`    | boolean | No       | Whether this is a variant feature     |
| `isGainAtNextFeatureLevel` | boolean | No       | Feature gained at next subclass level |
| `otherSources`             | array   | No       | Other source references               |
| `consumes`                 | object  | No       | Resources consumed by the feature     |

### Proficiency Properties

| Property                   | Type  | Required | Description                    |
| -------------------------- | ----- | -------- | ------------------------------ |
| `languageProficiencies`    | array | No       | Language proficiencies granted |
| `skillProficiencies`       | array | No       | Skill proficiencies granted    |
| `weaponProficiencies`      | array | No       | Weapon proficiencies granted   |
| `armorProficiencies`       | array | No       | Armor proficiencies granted    |
| `toolProficiencies`        | array | No       | Tool proficiencies granted     |
| `savingThrowProficiencies` | array | No       | Saving throw proficiencies     |
| `expertise`                | array | No       | Expertise in specific skills   |

### Special Properties

| Property          | Type  | Required | Description                   |
| ----------------- | ----- | -------- | ----------------------------- |
| `resist`          | array | No       | Damage resistances granted    |
| `immune`          | array | No       | Damage immunities granted     |
| `vulnerable`      | array | No       | Damage vulnerabilities        |
| `conditionImmune` | array | No       | Condition immunities granted  |
| `resources`       | array | No       | Additional resources provided |

## Feature Types

### Primary Subclass Features

These are the main features that define a subclass, usually gained at the earliest subclass level:

```json
{
  "name": "Spellthief",
  "source": "TftJC",
  "className": "Wizard",
  "classSource": "PHB",
  "subclassShortName": "Spellthief",
  "subclassSource": "TftJC",
  "level": 2,
  "entries": [
    "Description of the subclass theme and background...",
    {
      "type": "refSubclassFeature",
      "subclassFeature": "Feature Name|Class|ClassSource|Subclass|SubclassSource|Level"
    }
  ]
}
```

### Individual Features

Specific mechanical features with concrete benefits:

```json
{
  "name": "Shorthand Spells",
  "source": "TftJC",
  "className": "Wizard",
  "classSource": "PHB",
  "subclassShortName": "Spellthief",
  "subclassSource": "TftJC",
  "level": 2,
  "entries": [
    "At 2nd level, you become a savant in cramming spells into your spellbook...",
    "Additionally, when copying spells into your spellbook, you can do so 10x faster."
  ]
}
```

## Reference Format

When a primary feature references other features, use the `refSubclassFeature` type:

```json
{
  "type": "refSubclassFeature",
  "subclassFeature": "Feature Name|Class|ClassSource|Subclass|SubclassSource|Level"
}
```

### Reference Pattern Components

- **Feature Name**: Exact name of the referenced feature
- **Class**: Parent class (e.g., "Wizard", "Fighter")
- **ClassSource**: Source of parent class (usually "PHB")
- **Subclass**: Subclass short name (e.g., "Spellthief")
- **SubclassSource**: Source of the subclass (e.g., "TftJC")
- **Level**: Level when feature is gained

## Common Feature Patterns

### Resource Management Features

Features that consume or provide resources:

```json
{
  "name": "Channel Divinity Feature",
  "consumes": {
    "name": "Channel Divinity",
    "amount": 1
  },
  "entries": ["You can use your Channel Divinity to..."]
}
```

### Spell-like Features

Features that mimic spells or provide magical abilities:

```json
{
  "name": "Magical Feature",
  "entries": [
    "You can cast {@spell misty step} once using this feature. You regain the ability to do so when you finish a long rest."
  ]
}
```

### Enhancement Features

Features that improve existing abilities:

```json
{
  "name": "Enhanced Ability",
  "entries": [
    "Starting at 6th level, your existing feature gains the following benefits:",
    {
      "type": "list",
      "items": ["First enhancement...", "Second enhancement..."]
    }
  ]
}
```

## File Organization

### Directory Structure

```
subclassFeature/
  SubclassName/
    Primary Feature.json
    Feature 1.json
    Feature 2.json
    Feature 3.json
```

### Naming Conventions

- Folder names match the subclass short name
- File names match the exact feature name
- Use descriptive feature names that reflect their function

## Example: Complete Spellthief Feature Set

```json
// Spellthief.json (Primary Feature)
{
  "name": "Spellthief",
  "source": "TftJC",
  "className": "Wizard",
  "classSource": "PHB",
  "subclassShortName": "Spellthief",
  "subclassSource": "TftJC",
  "level": 2,
  "entries": [
    "A spellthief on the surface may seem to other Wizards like a scoundrel...",
    {
      "type": "refSubclassFeature",
      "subclassFeature": "Shorthand Spells|Wizard|PHB|Spellthief|TftJC|2"
    },
    {
      "type": "refSubclassFeature",
      "subclassFeature": "Spellthief's Skills|Wizard|PHB|Spellthief|TftJC|2"
    }
  ]
}

// Shorthand Spells.json (Individual Feature)
{
  "name": "Shorthand Spells",
  "source": "TftJC",
  "className": "Wizard",
  "classSource": "PHB",
  "subclassShortName": "Spellthief",
  "subclassSource": "TftJC",
  "level": 2,
  "entries": [
    "At 2nd level, you become a savant in cramming in spells into your spellbook...",
    "Additionally, when copying spells into your spellbook, you can do so 10x faster."
  ]
}
```

## Best Practices

1. **Consistent Naming**: Use exact names in references and file names
2. **Level Appropriate**: Ensure features are balanced for their level
3. **Clear Descriptions**: Write entries that clearly explain the mechanical benefits
4. **Reference Integrity**: Ensure all references point to existing features
5. **Organize Logically**: Group related features and use primary features to introduce the subclass

## Related Sections

- **subclass**: Parent subclasses that reference these features
- **spell**: Features may reference or grant spells
- **optionalfeature**: Some advanced features may be optional
- **class**: Parent classes that subclasses extend
