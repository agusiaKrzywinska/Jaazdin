# Reward Documentation

## Overview

The `reward` section defines special rewards that can be granted to characters, including boons, supernatural gifts, elemental blessings, and other unique benefits. These are typically story-driven rewards rather than purchased items.

## Schema Structure

### Core Properties

| Property  | Type   | Required | Description                                 |
| --------- | ------ | -------- | ------------------------------------------- |
| `name`    | string | Yes      | The name of the reward                      |
| `source`  | string | Yes      | Source abbreviation (e.g., "TftJC")         |
| `type`    | string | Yes      | Type of reward (Boon, Elemental Gift, etc.) |
| `entries` | array  | Yes      | Descriptive text and mechanical benefits    |

### Optional Properties

| Property           | Type    | Required | Description                    |
| ------------------ | ------- | -------- | ------------------------------ |
| `page`             | number  | No       | Page number in the source      |
| `otherSources`     | array   | No       | Other source references        |
| `legacy`           | boolean | No       | Whether this is legacy content |
| `reprintedAs`      | array   | No       | References to reprints         |
| `rarity`           | string  | No       | Reward rarity (if applicable)  |
| `ability`          | object  | No       | Ability score entry format     |
| `additionalSpells` | array   | No       | Additional spells granted      |
| `hasFluff`         | boolean | No       | Whether fluff content exists   |
| `hasFluffImages`   | boolean | No       | Whether fluff images exist     |

## Reward Types

The `type` property uses specific examples from the schema:

- `"Blessing"` - Divine or supernatural blessings
- `"Boon"` - Permanent supernatural benefits
- `"Charm"` - Temporary magical effects
- `"Curse"` - Negative supernatural effects
- `"Draconic Gift"` - Dragon-related enhancements
- `"Inhabitation"` - Possession or spiritual effects
- `"Fragment of Suffering"` - Dark or painful rewards
- `"Other"` - Custom or miscellaneous rewards
- `"Piety Trait"` - Religious devotion rewards

Your homebrew can also use custom types like:

- `"Elemental Gift"` - Elemental plane attunement
- `"Dragon Jelly"` - Draconic mutation effects

## Example: Boon

```json
{
  "name": "Boon of Minor Combat Might",
  "source": "TftJC",
  "type": "Boon",
  "entries": [
    "You have overcome mighty foes in the arena, and have been granted power beyond this.",
    "The first time you would drop to 0 hit points, you instead drop to 1. You can only use this feature once per week.",
    "Additionally, rolling a 19 on a Death Saving Throw now makes you stand with one hit point."
  ]
}
```

## Example: Elemental Gift

```json
{
  "name": "Speaker of the Wind",
  "source": "TftJC",
  "type": "Elemental Gift",
  "entries": [
    "This creature has been attuned to the energies of Sky Titan and the Plane of Air. They gain the following features.",
    "They learn to read and write Druidic.",
    "Once per long rest the creature can cast Feather Fall without expending a spell slot.",
    "At 5th level, they gain the ability to cast Warding Wind without expending a spell slot.",
    "At 9th level they gain the ability to cast Wind Wall without expending a spell slot.",
    "Once they have cast any of the three spells with this feature they cannot do so again until they finish a long rest.",
    "Your casting ability for these spells is Wisdom."
  ]
}
```

## Common Reward Categories

### Combat Enhancements

Rewards that improve combat capabilities:

- Extra hit points or damage reduction
- New combat actions or reactions
- Weapon or armor proficiencies
- Special attack forms

### Magical Abilities

Rewards that grant spell-like abilities:

- Innate spellcasting
- Spell resistance or immunity
- Magical detection abilities
- Planar travel capabilities

### Social Benefits

Rewards that affect interactions:

- Enhanced reputation
- Divine favor
- Political connections
- Special titles or ranks

### Utility Powers

Rewards that provide convenience or exploration benefits:

- Enhanced movement
- Environmental adaptation
- Sensory improvements
- Tool-like abilities

## Level-Scaled Rewards

Some rewards improve with character level:

```json
"entries": [
  "At 1st level, you gain minor benefits...",
  "At 5th level, you gain enhanced abilities...",
  "At 10th level, you gain major powers...",
  "At 15th level, you gain legendary capabilities..."
]
```

## Formatting Guidelines

### Progressive Abilities

For rewards that unlock features over time:

```json
"entries": [
  "Initial description of the reward's origin...",
  "Base ability available immediately...",
  "At 5th level, they gain the ability to cast [spell] without expending a spell slot.",
  "At 9th level they gain the ability to cast [spell] without expending a spell slot.",
  "Recharge information and limitations..."
]
```

### Immediate Benefits

For rewards with instant, permanent effects:

```json
"entries": [
  "Background or context for the reward...",
  "First permanent benefit...",
  "Second permanent benefit...",
  "Usage limitations or restrictions..."
]
```

## File Organization

### Directory Structure

```
reward/
  RewardType/
    Individual Reward.json
    Another Reward.json
  AnotherType/
    Different Reward.json
```

### Example Structure

```
reward/
  Boon/
    Boon of Minor Combat Might.json
    Primordial Champion.json
  Elemental Gift/
    Speaker of the Wind.json
  Dragon Jelly/
    Dragon's Heart.json
    Dragon's Breath.json
    Tough Scales.json
```

## Prerequisites

Some rewards may have requirements:

```json
{
  "name": "Advanced Reward",
  "prerequisite": "Must have completed the Trial of Elements",
  "entries": [...]
}
```

## Mechanical Integration

### Spell References

Use proper spell references in entries:

```json
"entries": [
  "You can cast {@spell misty step} once per long rest without expending a spell slot."
]
```

### Condition References

Reference conditions properly:

```json
"entries": [
  "You have advantage on saving throws against being {@condition frightened}."
]
```

### Ability References

Reference abilities and skills:

```json
"entries": [
  "You gain proficiency in {@skill Insight} and {@skill Perception}."
]
```

## Best Practices

1. **Story Integration**: Rewards should feel connected to narrative events
2. **Balanced Power**: Ensure rewards are appropriate for when they're received
3. **Clear Limitations**: Specify usage restrictions and recharge times
4. **Thematic Consistency**: Match the reward to its source or type
5. **Permanent Nature**: Most rewards should be permanent character enhancements

## Related Sections

- **spell**: Rewards may grant spellcasting abilities
- **feat**: Some rewards might function like feats
- **optionalfeature**: Complex rewards might reference optional features
- **item**: Some rewards might be tied to specific items

## Usage in Campaigns

- **Quest Rewards**: Major story milestone rewards
- **Divine Boons**: Granted by deities or celestials
- **Planar Exposure**: Results of planar travel or contact
- **Magical Experiments**: Consequences of magical research
- **Ancient Blessings**: Rewards from ancient sites or artifacts
