# 5eTools foundryAction Object Documentation

The `foundryAction` object in 5eTools homebrew files provides Foundry VTT-specific data for actions, allowing seamless integration and enhanced functionality within the Foundry Virtual Tabletop system.

## Overview

The `foundryAction` object extends standard 5eTools action entries with Foundry-specific properties such as activities, effects, system data, and automation features. This allows homebrew actions to work natively with Foundry VTT's D&D 5e system.

## Schema Structure

The `foundryAction` property in a homebrew file should contain an array of action objects that follow the `foundrySideDataGenericArray` schema.

```json
{
  "foundryAction": [
    {
      "name": "Action Name",
      "source": "MySource"
      // ... additional properties
    }
  ]
}
```

## Core Properties

### Required Properties

| Property | Type   | Description                          |
| -------- | ------ | ------------------------------------ |
| `name`   | string | The name of the action               |
| `source` | string | The source identifier for the action |

### Optional Properties

| Property           | Type    | Description                                  |
| ------------------ | ------- | -------------------------------------------- |
| `system`           | object  | Foundry system-specific data                 |
| `activities`       | array   | Array of foundry activity objects            |
| `effects`          | array   | Array of foundry effect objects              |
| `flags`            | object  | Foundry flags object for additional metadata |
| `img`              | string  | Path or URL to an image for the action       |
| `migrationVersion` | integer | Version number for migration tracking        |
| `_merge`           | object  | Controls how properties merge with base data |

## Activities

Activities define what happens when an action is used in Foundry VTT. Each activity has a specific type that determines its behavior.

### Activity Types

1. **attack** - For attack rolls
2. **damage** - For damage calculations
3. **save** - For saving throws
4. **check** - For ability checks
5. **heal** - For healing effects
6. **cast** - For spellcasting
7. **summon** - For summoning creatures
8. **enchant** - For enchantment effects
9. **utility** - For general utility actions

### Common Activity Properties

| Property             | Type   | Description                                    |
| -------------------- | ------ | ---------------------------------------------- |
| `type`               | string | The activity type (required)                   |
| `foundryId`          | string | Unique identifier (16 chars max, alphanumeric) |
| `img`                | string | Image for the activity                         |
| `description`        | object | Foundry description object                     |
| `descriptionEntries` | array  | 5eTools entries for chat flavor                |
| `consumption`        | object | Resource consumption configuration             |
| `effects`            | array  | References to effect objects                   |

### Activity Examples

#### Attack Activity

```json
{
  "type": "attack",
  "foundryId": "myAttackId",
  "description": {
    "chatFlavor": "Makes a weapon attack"
  }
}
```

#### Damage Activity

```json
{
  "type": "damage",
  "foundryId": "myDamageId",
  "description": {
    "chatFlavor": "Deals damage to the target"
  }
}
```

#### Save Activity

```json
{
  "type": "save",
  "foundryId": "mySaveId",
  "description": {
    "chatFlavor": "Target must make a saving throw"
  }
}
```

#### Check Activity

```json
{
  "type": "check",
  "foundryId": "myCheckId",
  "check": {
    "associated": ["athletics", "acrobatics"],
    "ability": "str"
  }
}
```

#### Heal Activity

```json
{
  "type": "heal",
  "foundryId": "myHealId",
  "description": {
    "chatFlavor": "Restores hit points"
  }
}
```

#### Cast Activity

```json
{
  "type": "cast",
  "foundryId": "myCastId",
  "spell": {
    "uuid": "@spell[fireball]"
  }
}
```

#### Summon Activity

```json
{
  "type": "summon",
  "foundryId": "mySummonId",
  "profiles": [
    {
      "name": "Wolf",
      "uuid": "@creature[wolf]",
      "count": 1
    }
  ]
}
```

## Effects

Effects define persistent changes or conditions that result from using an action.

### Effect Properties

| Property             | Type    | Description                        |
| -------------------- | ------- | ---------------------------------- |
| `foundryId`          | string  | Unique identifier (optional)       |
| `name`               | string  | Name of the effect                 |
| `img`                | string  | Image for the effect               |
| `description`        | string  | Text description                   |
| `descriptionEntries` | array   | 5eTools entries for description    |
| `changes`            | array   | Array of attribute changes         |
| `statuses`           | array   | Status conditions to apply         |
| `flags`              | object  | Additional flags                   |
| `duration`           | object  | Duration configuration             |
| `disabled`           | boolean | Whether effect starts disabled     |
| `transfer`           | boolean | Whether effect transfers to tokens |

### Effect Changes

Changes modify actor attributes when the effect is active.

```json
{
  "changes": [
    {
      "key": "system.attributes.ac.bonus",
      "mode": 2,
      "value": "2",
      "priority": 20
    }
  ]
}
```

### Status Conditions

Available status conditions include:

- `blinded`, `charmed`, `deafened`, `frightened`
- `grappled`, `incapacitated`, `invisible`, `paralyzed`
- `petrified`, `poisoned`, `prone`, `restrained`
- `stunned`, `unconscious`, `exhaustion`
- And many more...

## Consumption

The consumption object defines what resources are used when an activity is triggered.

### Consumption Structure

```json
{
  "consumption": {
    "targets": [
      {
        "target": "spell.slots.1",
        "value": "1",
        "type": "spellSlots"
      }
    ]
  }
}
```

### Target Types

Consumption targets can reference:

- Spell slots: `"spell.slots.1"`
- Custom resources: `"resources.primary"`
- Items: Reference by UUID or name
- 5eTools-style resources via `consumes` object

## Merge Configuration

The `_merge` object controls how foundry data merges with base 5eTools data.

```json
{
  "_merge": {
    "system": true,
    "activities": true,
    "effects": true,
    "flags": true
  }
}
```

When set to `true`, the specified properties will be merged rather than completely replaced.

## Complete Example

```json
{
  "foundryAction": [
    {
      "name": "Magical Strike",
      "source": "MyHomebrew",
      "img": "path/to/magical-strike.jpg",
      "system": {
        "actionType": "weapon",
        "chatFlavor": "A strike imbued with magical energy"
      },
      "activities": [
        {
          "type": "attack",
          "foundryId": "magicalStrikeAttack",
          "description": {
            "chatFlavor": "Make a weapon attack with magical enhancement"
          }
        },
        {
          "type": "damage",
          "foundryId": "magicalStrikeDamage",
          "description": {
            "chatFlavor": "The weapon deals additional magical damage"
          }
        }
      ],
      "effects": [
        {
          "name": "Magical Enhancement",
          "img": "path/to/magic-effect.jpg",
          "description": "Weapon is enhanced with magical energy",
          "duration": {
            "seconds": 60
          },
          "changes": [
            {
              "key": "system.bonuses.mwak.damage",
              "mode": 2,
              "value": "1d4",
              "priority": 20
            }
          ]
        }
      ],
      "_merge": {
        "system": true,
        "activities": true,
        "effects": true
      }
    }
  ]
}
```

## Best Practices

1. **Use Descriptive Names**: Make action and effect names clear and descriptive
2. **Provide Images**: Include appropriate images for better visual presentation
3. **Use Merge Wisely**: Only merge properties when you want to extend rather than replace
4. **Unique IDs**: Ensure foundryId values are unique within your homebrew
5. **Test Thoroughly**: Test all activities and effects in Foundry VTT before publishing
6. **Document Resources**: Clearly document any custom resources your actions consume

## Integration Notes

- foundryAction objects are imported as Foundry VTT Item documents
- Activities become part of the item's activity system
- Effects are automatically linked and can be applied to tokens
- System data integrates with D&D 5e system calculations
- Images should be accessible to all players in your Foundry instance

This documentation provides a comprehensive guide to creating foundryAction objects that enhance your 5eTools homebrew with rich Foundry VTT integration.

## foundryItem for Items

**Important Note**: The `foundryAction` object is specifically for action entries. For items, you should use the `foundryItem` object instead.

### foundryItem Structure

To add Foundry VTT-specific data (including flags) to items, use the `foundryItem` property in your homebrew file:

```json
{
  "foundryItem": [
    {
      "name": "Item Name",
      "source": "MySource",
      "flags": {
        "myModule": {
          "customData": "value"
        }
      }
      // ... other foundry properties
    }
  ]
}
```

### foundryItem Properties

| Property           | Type    | Description                                                      |
| ------------------ | ------- | ---------------------------------------------------------------- |
| `name`             | string  | The name of the item (required)                                  |
| `source`           | string  | The source identifier (required)                                 |
| `system`           | object  | Foundry system-specific data                                     |
| `activities`       | array   | Array of foundry activity objects                                |
| `effects`          | array   | Array of foundry effect objects                                  |
| `flags`            | object  | **Foundry flags object for custom data**                         |
| `img`              | string  | Path or URL to an image                                          |
| `migrationVersion` | integer | Version number for migration                                     |
| `_merge`           | object  | Controls property merging                                        |
| `type`             | string  | Item type (weapon, tool, consumable, equipment, container, loot) |
| `subEntities`      | object  | Additional entities to import                                    |

### Adding Flags to Items

Flags are used to store custom data that modules or systems can use. Here's how to structure flags:

```json
{
  "foundryItem": [
    {
      "name": "Magical Sword",
      "source": "MyHomebrew",
      "flags": {
        "mymodule": {
          "enchantmentLevel": 5,
          "specialProperty": true,
          "customData": {
            "glowColor": "#ff0000",
            "soundEffect": "magical-hum.wav"
          }
        },
        "dnd5e": {
          "itemProperty": "magical"
        }
      }
    }
  ]
}
```

### Item Example with Activities and Effects

```json
{
  "foundryItem": [
    {
      "name": "Wand of Magic Missiles",
      "source": "MyHomebrew",
      "type": "consumable",
      "img": "path/to/wand.jpg",
      "system": {
        "uses": {
          "value": 7,
          "max": 7,
          "per": "day"
        }
      },
      "activities": [
        {
          "type": "cast",
          "foundryId": "wandMagicMissile",
          "spell": {
            "uuid": "@spell[magic missile]"
          },
          "consumption": {
            "targets": [
              {
                "target": "uses",
                "value": "1"
              }
            ]
          }
        }
      ],
      "flags": {
        "mymodule": {
          "wandType": "arcane",
          "craftedBy": "Elminster"
        }
      },
      "_merge": {
        "system": true,
        "activities": true,
        "flags": true
      }
    }
  ]
}
```

### Flag Namespacing

Always namespace your flags with your module/system name to avoid conflicts:

- ✅ Good: `"mymodule": { "data": "value" }`
- ❌ Bad: `"data": "value"` (could conflict with other modules)

### Practical Example: Adding Foundry Data to Your Existing Items

Here's how you could add Foundry VTT data to one of your existing items. For example, your "Blackpowder Bottoms" tool:

**Your existing item file (`item/Tool/Blackpowder Bottoms.json`):**

```json
{
  "name": "Blackpowder Bottoms",
  "source": "TftJC",
  "type": "T",
  "rarity": "none",
  "weight": 0,
  "value": 17500,
  "entries": [
    "Simple Invention.",
    "Requires Light + Clip",
    "Effect. This shoe can have a firearm attached directly to it..."
  ]
}
```

**Adding foundryItem data in your main homebrew file:**

```json
{
  "_meta": {
    "sources": [
      {
        "json": "TftJC",
        "abbreviation": "TftJC",
        "full": "Tales from the Jaazdin Collective",
        "version": "1.0.0"
      }
    ]
  },
  "foundryItem": [
    {
      "name": "Blackpowder Bottoms",
      "source": "TftJC",
      "type": "tool",
      "system": {
        "toolType": "custom",
        "proficient": 0,
        "uses": {
          "value": null,
          "max": null,
          "per": null
        }
      },
      "activities": [
        {
          "type": "utility",
          "foundryId": "firearmAttach",
          "description": {
            "chatFlavor": "Attach or detach a firearm from the shoe"
          }
        }
      ],
      "flags": {
        "tftjc": {
          "inventionTier": 1,
          "requiresComponents": ["light", "clip"],
          "firearmModification": true,
          "clipCapacityModifier": 0.5,
          "canFireWithoutHands": true
        },
        "world": {
          "customCategory": "firearm-modification"
        }
      },
      "img": "path/to/blackpowder-bottoms.jpg",
      "_merge": {
        "system": true,
        "activities": true,
        "flags": true
      }
    }
  ]
}
```

This approach allows you to:

1. Keep your original item files unchanged
2. Add Foundry-specific functionality in the main homebrew file
3. Store custom data in flags for use by modules
4. Add activities for interactive features
5. Enhance the item with Foundry VTT capabilities

## Complete Example

```json
{
  "foundryAction": [
    {
      "name": "Magical Strike",
      "source": "MyHomebrew",
      "img": "path/to/magical-strike.jpg",
      "system": {
        "actionType": "weapon",
        "chatFlavor": "A strike imbued with magical energy"
      },
      "activities": [
        {
          "type": "attack",
          "foundryId": "magicalStrikeAttack",
          "description": {
            "chatFlavor": "Make a weapon attack with magical enhancement"
          }
        },
        {
          "type": "damage",
          "foundryId": "magicalStrikeDamage",
          "description": {
            "chatFlavor": "The weapon deals additional magical damage"
          }
        }
      ],
      "effects": [
        {
          "name": "Magical Enhancement",
          "img": "path/to/magic-effect.jpg",
          "description": "Weapon is enhanced with magical energy",
          "duration": {
            "seconds": 60
          },
          "changes": [
            {
              "key": "system.bonuses.mwak.damage",
              "mode": 2,
              "value": "1d4",
              "priority": 20
            }
          ]
        }
      ],
      "_merge": {
        "system": true,
        "activities": true,
        "effects": true
      }
    }
  ]
}
```
