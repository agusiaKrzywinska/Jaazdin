# Subclass Documentation

## Overview

The `subclass` section defines subclasses (archetypes) for existing classes. Each subclass provides a specialized path for character development with unique features at specific levels.

## Schema Structure

### Core Properties

| Property      | Type   | Required | Description                                |
| ------------- | ------ | -------- | ------------------------------------------ |
| `name`        | string | Yes      | The name of the subclass                   |
| `source`      | string | Yes      | Source abbreviation (e.g., "TftJC")        |
| `className`   | string | Yes      | The parent class name                      |
| `classSource` | string | Yes      | Source of the parent class (usually "PHB") |
| `shortName`   | string | Yes      | Short name for the subclass                |
| `page`        | number | No       | Page number in the source                  |

### Spellcasting Properties

| Property                                     | Type    | Required | Description                                                          |
| -------------------------------------------- | ------- | -------- | -------------------------------------------------------------------- |
| `casterProgression`                          | string  | No       | Spellcasting progression ("full", "1/2", "1/3", "pact", "artificer") |
| `spellcastingAbility`                        | string  | No       | Spellcasting ability abbreviation                                    |
| `cantripProgression`                         | array   | No       | Cantrips known by level (20 integers)                                |
| `preparedSpells`                             | string  | No       | Formula for prepared spells                                          |
| `preparedSpellsProgression`                  | array   | No       | Prepared spells by level (20 integers)                               |
| `preparedSpellsChange`                       | string  | No       | When prepared spells can change                                      |
| `spellsKnownProgression`                     | array   | No       | Spells known by level (20 integers)                                  |
| `spellsKnownProgressionFixed`                | array   | No       | Fixed spells by level progression                                    |
| `spellsKnownProgressionFixedAllowLowerLevel` | boolean | No       | Allow lower level spell selection                                    |
| `spellsKnownProgressionFixedByLevel`         | object  | No       | Spells known by level and spell level                                |

### Feature Properties

| Property                     | Type  | Required | Description                         |
| ---------------------------- | ----- | -------- | ----------------------------------- |
| `subclassFeatures`           | array | Yes      | List of feature references by level |
| `optionalfeatureProgression` | array | No       | Optional feature progression        |
| `featProgression`            | array | No       | Feat progression by level           |
| `subclassTableGroups`        | array | No       | Table groups for the subclass       |

### Metadata Properties

| Property           | Type    | Required | Description                        |
| ------------------ | ------- | -------- | ---------------------------------- |
| `alias`            | array   | No       | Alternative names for the subclass |
| `edition`          | string  | No       | Rules edition compatibility        |
| `isReprinted`      | boolean | No       | Whether this is a reprint          |
| `reprintedAs`      | array   | No       | References to reprints             |
| `otherSources`     | array   | No       | Other source references            |
| `additionalSpells` | array   | No       | Additional spells for the subclass |
| `hasFluff`         | boolean | No       | Whether fluff content exists       |
| `hasFluffImages`   | boolean | No       | Whether fluff images exist         |
| `fluff`            | object  | No       | Embedded fluff content             |

## Subclass Features Format

The `subclassFeatures` array lists all features with their level requirements. It supports two formats:

### String Format (Simple)

```json
"subclassFeatures": [
  "Feature Name|Class|ClassSource|Subclass|SubclassSource|Level",
  "Another Feature|Class|ClassSource|Subclass|SubclassSource|Level"
]
```

### Object Format (Advanced)

```json
"subclassFeatures": [
  {
    "subclassFeature": "Feature Name|Class|ClassSource|Subclass|SubclassSource|Level",
    "gainSubclassFeature": true,
    "gainSubclassFeatureHasContent": false,
    "tableDisplayName": "Custom Display Name"
  }
]
```

### Object Properties

| Property                        | Type    | Required | Description                                   |
| ------------------------------- | ------- | -------- | --------------------------------------------- |
| `subclassFeature`               | string  | Yes      | Feature reference string                      |
| `gainSubclassFeature`           | boolean | No       | Whether this level gains a subclass feature   |
| `gainSubclassFeatureHasContent` | boolean | No       | If gainSubclassFeature has meaningful content |
| `tableDisplayName`              | string  | No       | Custom name for table display                 |

### Feature Reference Pattern

- **Feature Name**: Name of the specific feature
- **Class**: Parent class name (e.g., "Wizard")
- **ClassSource**: Source of parent class (e.g., "PHB")
- **Subclass**: Subclass name (e.g., "Spellthief")
- **SubclassSource**: Source of subclass (e.g., "TftJC")
- **Level**: Level when feature is gained

## Example: Wizard Spellthief

```json
{
  "name": "Spellthief",
  "source": "TftJC",
  "page": 49,
  "className": "Wizard",
  "classSource": "PHB",
  "shortName": "Spellthief",
  "subclassFeatures": [
    "Spellthief|Wizard|PHB|Spellthief|TftJC|2",
    "Quickened Copying|Wizard|PHB|Spellthief|TftJC|6",
    "Personalized Notes|Wizard|PHB|Spellthief|TftJC|10",
    "Hidden Talents|Wizard|PHB|Spellthief|TftJC|14"
  ]
}
```

## Common Subclass Levels

Different classes gain subclass features at different levels:

### Wizard Subclasses

- **2nd Level**: Primary subclass feature
- **6th Level**: Enhanced abilities
- **10th Level**: Advanced feature
- **14th Level**: Capstone feature

### Fighter Subclasses

- **3rd Level**: Archetype feature
- **7th Level**: Enhanced abilities
- **10th Level**: Advanced feature
- **15th Level**: Superior abilities
- **18th Level**: Capstone feature

### Cleric/Druid Subclasses

- **1st Level**: Domain/Circle feature
- **2nd Level**: Channel Divinity/Wild Shape enhancement
- **6th Level**: Enhanced abilities
- **8th Level**: Divine Strike/Potent Spellcasting
- **17th Level**: Capstone feature

## Best Practices

1. **Level Progression**: Follow the standard level progression for the parent class
2. **Feature Balance**: Ensure features are balanced compared to official subclasses
3. **Naming Convention**: Use descriptive names that reflect the subclass theme
4. **Source Consistency**: Maintain consistent source abbreviations
5. **Feature References**: Ensure all referenced features exist in the subclassFeature section

## Related Sections

- **class**: Parent classes that subclasses extend
- **subclassFeature**: Individual features referenced by subclasses
- **spell**: Subclasses may grant additional spells
- **optionalfeature**: Some subclass variants may use optional features

## File Organization

- Subclasses are organized by parent class in folders
- Each subclass gets its own JSON file
- File names should match the subclass name
- Folder names should match the parent class name

## Example Directory Structure

```
subclass/
  Wizard/
    Spellthief.json
    School of Aurumancy.json
    Dark Arts.json
  Fighter/
    Gunner.json
  Cleric/
    Domain Name.json
```
