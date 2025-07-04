# Action Documentation

## Overview

The `action` section defines special actions that characters can take in combat or other situations. These are typically unique actions beyond the standard Attack, Dash, Dodge, etc., and can include variant rules, special maneuvers, or homebrew combat options.

## Schema Structure

### Core Properties

| Property  | Type   | Required | Description                             |
| --------- | ------ | -------- | --------------------------------------- |
| `name`    | string | Yes      | The name of the action                  |
| `source`  | string | Yes      | Source abbreviation (e.g., "TftJC")     |
| `page`    | number | Yes      | Page number in the source               |
| `entries` | array  | Yes      | Descriptive text and mechanical details |

### Timing Properties

| Property | Type  | Required | Description                    |
| -------- | ----- | -------- | ------------------------------ |
| `time`   | array | No       | Action economy cost and timing |

### Reference Properties

| Property        | Type   | Required | Description                            |
| --------------- | ------ | -------- | -------------------------------------- |
| `fromVariant`   | string | No       | UID of variant rule linked as footnote |
| `seeAlsoAction` | array  | No       | UIDs of related actions for "See Also" |
| `reprintedAs`   | array  | No       | References to reprints                 |

### Foundry VTT Properties

| Property            | Type   | Required | Description                     |
| ------------------- | ------ | -------- | ------------------------------- |
| `foundrySystem`     | object | No       | Foundry system-specific data    |
| `foundryActivities` | array  | No       | Foundry activity configurations |
| `foundryFlags`      | object | No       | Foundry flags and metadata      |
| `foundryEffects`    | array  | No       | Foundry active effects          |
| `foundryImg`        | string | No       | Foundry image path              |

## Time Format

The `time` property specifies when and how the action can be used:

### String Format (Simple)

```json
"time": ["1 bonus action"]
```

### Object Format (Structured)

```json
"time": [
  {
    "number": 1,
    "unit": "bonus"
  }
]
```

### Time Units

- `"action"` - Standard action
- `"bonus"` - Bonus action
- `"reaction"` - Reaction

## Reference Linking

### Variant Rule References

Link to variant rules that modify or enable this action:

```json
"fromVariant": "variantRuleName|source"
```

### Related Actions

Link to related actions in a "See Also" section:

```json
"seeAlsoAction": [
  "disarm|dmg",
  "shove|phb"
]
```

## Entry Types

Actions can contain various entry types for complex descriptions:

### Valid Entry Types

The `entries` array can contain:

1. **String entries** - Simple text content (just a string)
2. **Integer entries** - Numeric content
3. **Entries containers** - For grouped content with optional names (`"type": "entries"`)
4. **List entries** - For bulleted or numbered lists (`"type": "list"`)
5. **Table entries** - For structured data (`"type": "table"`)
6. **Section entries** - For subsections with headers (`"type": "section"`)
7. **Quote entries** - For highlighted quotes (`"type": "quote"`)
8. **Inset entries** - For highlighted boxes (`"type": "inset"`)
9. **Options entries** - For option lists (`"type": "options"`)
10. **Link entries** - For hyperlinks (`"type": "link"`)
11. **Image entries** - For images (`"type": "image"`)

### String Entries (Simple Text)

```json
"entries": [
  "A simple description of the action.",
  "Another paragraph of text."
]
```

### Entries Container (Grouped Content)

```json
{
  "type": "entries",
  "name": "Action Title",
  "entries": ["Description of the action and its effects..."]
}
```

### List Entries

```json
{
  "type": "list",
  "items": [
    "First step or effect",
    "Second step or effect",
    "Third step or effect"
  ]
}
```

## Examples

### Simple Action

```json
{
  "name": "Disarm",
  "source": "DMG",
  "page": 271,
  "time": [
    {
      "number": 1,
      "unit": "action"
    }
  ],
  "entries": [
    "A creature can use a weapon attack to knock a weapon or another item from a target's grasp. The attacker makes an attack roll contested by the target's Strength (Athletics) check or Dexterity (Acrobatics) check. If the attacker wins the contest, the attack causes no damage or other ill effect, but the defender drops the item."
  ]
}
```

### Complex Action with Multiple Sections

```json
{
  "name": "Reload",
  "source": "TftJC",
  "page": 1,
  "time": [
    {
      "number": 1,
      "unit": "bonus"
    }
  ],
  "entries": [
    {
      "type": "entries",
      "name": "Loading a Firearm",
      "entries": [
        "A Firearm can only house so many shots before it must be reloaded. Firearms that use the same loading system are unique to each other, meaning they cannot be used for a different model of Firearm."
      ]
    },
    {
      "type": "entries",
      "name": "Clip",
      "entries": [
        "To reload a Clip, you can use a Bonus Action to replace your current clip with another loaded clip. A clip can be loaded with its maximum number of rounds by spending 1 minute."
      ]
    },
    {
      "type": "entries",
      "name": "Barrel",
      "entries": [
        "You can spend a Bonus Action to reload a single bullet in your barrel."
      ]
    }
  ]
}
```

### Action with Variant Rule Reference

```json
{
  "name": "Climb onto a Bigger Creature",
  "source": "DMG",
  "page": 271,
  "fromVariant": "climbingOntoABiggerCreature|dmg",
  "time": [
    {
      "number": 1,
      "unit": "action"
    }
  ],
  "entries": [
    "If one creature wants to jump onto another creature, it can do so by grappling. A Small or Medium creature has little chance of successfully grappling a Huge or Gargantuan creature, however, unless magic has granted the grappler supernatural might."
  ]
}
```

### Action with Cross-References

```json
{
  "name": "Shove",
  "source": "PHB",
  "page": 195,
  "seeAlsoAction": ["disarm|dmg", "tumble|dmg"],
  "time": [
    {
      "number": 1,
      "unit": "action"
    }
  ],
  "entries": [
    "Using the Attack action, you can make a special melee attack to shove a creature, either to knock it prone or push it away from you. You can use this option only if you have at least one free hand."
  ]
}
```

## Best Practices

### Naming Conventions

- Use clear, descriptive names that match official D&D terminology when possible
- Capitalize important words (e.g., "Disarm", "Shove", "Climb onto a Bigger Creature")

### Time Specification

- Always specify the action economy cost using the `time` property
- Use the structured object format for clarity and VTT compatibility

### Cross-Referencing

- Use `fromVariant` to link actions that are part of optional rules
- Use `seeAlsoAction` to help users find related actions
- Follow the format "actionName|source" for references

### Content Organization

- Break complex actions into multiple named sections using entries containers
- Use consistent formatting for similar types of actions
- Include all necessary mechanical details in the entries

## File Organization

- Place action files in the `/action/` directory
- Use descriptive filenames that match the action name
- One action per file for better organization
- Include multiple related actions in the main homebrew JSON if they're part of a cohesive system

## Integration Notes

- Actions integrate with the 5eTools action compendium
- VTT integrations can use the structured time format for automation
- The `fromVariant` property creates automatic footnote links in 5eTools
- Cross-references through `seeAlsoAction` enhance discoverability
