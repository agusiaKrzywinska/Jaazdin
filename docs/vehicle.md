# Vehicle Documentation

## Overview

The `vehicle` section defines various types of vehicles including ships, land vehicles, and magical constructs. Vehicles provide transportation and may have special abilities, crew requirements, and combat statistics.

## Schema Structure

### Core Properties

| Property      | Type   | Required | Description                                                   |
| ------------- | ------ | -------- | ------------------------------------------------------------- |
| `name`        | string | Yes      | The name of the vehicle                                       |
| `source`      | string | Yes      | Source abbreviation (e.g., "TftJC")                           |
| `page`        | number | No       | Page number in the source                                     |
| `vehicleType` | string | Yes      | Type of vehicle (SHIP, SPELLJAMMER, INFWAR, CREATURE, OBJECT) |
| `size`        | string | No       | Size category (S, M, L, H, G) - for some vehicle types        |
| `dimensions`  | array  | No       | Physical dimensions of the vehicle                            |

### Metadata Properties

| Property         | Type    | Required | Description                    |
| ---------------- | ------- | -------- | ------------------------------ |
| `otherSources`   | array   | No       | Other source references        |
| `reprintedAs`    | array   | No       | References to reprints         |
| `legacy`         | boolean | No       | Whether this is legacy content |
| `hasFluff`       | boolean | No       | Whether fluff content exists   |
| `hasFluffImages` | boolean | No       | Whether fluff images exist     |
| `fluff`          | object  | No       | Embedded fluff content         |

### Capacity Properties

| Property       | Type          | Required | Description                         |
| -------------- | ------------- | -------- | ----------------------------------- |
| `capCrew`      | number        | No       | Maximum crew capacity               |
| `capCrewNote`  | string        | No       | Additional crew capacity notes      |
| `capPassenger` | number        | No       | Maximum passenger capacity          |
| `capCargo`     | number/string | No       | Cargo capacity (in tons)            |
| `capCreature`  | number        | No       | Creature capacity (for INFWAR type) |

### Movement Properties

| Property  | Type          | Required | Description                                     |
| --------- | ------------- | -------- | ----------------------------------------------- |
| `terrain` | array         | No       | Terrain types the vehicle can traverse          |
| `pace`    | number/object | No       | Base pace/speed rating (object for SPELLJAMMER) |
| `speed`   | number/object | No       | Detailed speed information                      |
| `weight`  | number        | No       | Weight of the vehicle                           |

### Combat Properties

| Property           | Type          | Required | Description                                    |
| ------------------ | ------------- | -------- | ---------------------------------------------- |
| `hull`             | object        | No       | Hull statistics (AC, HP, DT)                   |
| `ac`               | number        | No       | Armor Class (if not using hull)                |
| `hp`               | number/object | No       | Hit Points (object for INFWAR type with dt/mt) |
| `str`              | number        | No       | Strength score                                 |
| `dex`              | number        | No       | Dexterity score                                |
| `con`              | number        | No       | Constitution score                             |
| `int`              | number        | No       | Intelligence score                             |
| `wis`              | number        | No       | Wisdom score                                   |
| `cha`              | number        | No       | Charisma score                                 |
| `immune`           | array         | No       | Damage immunities                              |
| `resist`           | array         | No       | Damage resistances                             |
| `vulnerable`       | array         | No       | Damage vulnerabilities                         |
| `conditionImmune`  | array         | No       | Condition immunities                           |
| `actionThresholds` | object        | No       | Map of actions to crew requirements            |
| `cost`             | number        | No       | Vehicle cost in copper pieces                  |

### Vehicle Components

| Property   | Type  | Required | Description                             |
| ---------- | ----- | -------- | --------------------------------------- |
| `control`  | array | No       | Control systems and stations            |
| `movement` | array | No       | Movement systems (sails, engines, etc.) |
| `weapon`   | array | No       | Mounted weapons and siege equipment     |
| `other`    | array | No       | Other vehicle components                |

### Descriptive Properties

| Property        | Type  | Required | Description                                   |
| --------------- | ----- | -------- | --------------------------------------------- |
| `action`        | array | No       | Actions and abilities the vehicle can perform |
| `entries`       | array | No       | Additional descriptive text                   |
| `trait`         | array | No       | Special traits and abilities                  |
| `actionStation` | array | No       | Action stations (for INFWAR type)             |
| `reaction`      | array | No       | Reaction abilities                            |

## Vehicle Types

The schema supports several vehicle types:

- `SHIP`: Waterborne vessels (most common)
- `SPELLJAMMER`: Space-faring vessels with special pace mechanics
- `INFWAR`: Infernal War Machines with ability scores and mishap thresholds
- `CREATURE`: Living vehicles (mounts, etc.)
- `OBJECT`: Object-based vehicles
- `SPELLJAMMER`: Space-faring vessels
- `INFWAR`: Infernal war machines
- `CREATURE`: Creature-based vehicles
- `OBJECT`: Object-based vehicles

Each type has different required and optional properties.

## Terrain Types

```json
"terrain": ["land", "water", "air", "space"]
```

## Hull Statistics

For vehicles with detailed combat stats:

```json
"hull": {
  "ac": 14,
  "hp": 50,
  "dt": 5
}
```

- `ac`: Armor Class
- `hp`: Hit Points
- `dt`: Damage Threshold

## Speed Formats

### Simple Pace

```json
"pace": 4
```

### Detailed Speed

```json
"speed": {
  "walk": 90,
  "climb": 45
}
```

## Example: Arcycle (Magical Vehicle)

```json
{
  "name": "Arcycle",
  "source": "TftJC",
  "page": 0,
  "vehicleType": "SHIP",
  "terrain": ["land"],
  "size": "M",
  "capCrew": 1,
  "capPassenger": 1,
  "capCargo": 0.1,
  "pace": 4,
  "action": [
    "This magical machine can be fueled with Arcane Magic to become a quick and reliable vehicle. While riding this vehicle you have 90 feet of speed. This speed is reduced to 45 on any terrain that isn't flat. The vehicle requires magic to function. A creature can touch the Arcycle's battery and use an action to expend a spell slot. The Arcycle then gains charges equal to the spell level x3.",
    "Charges can be expended to do any of the following actions, which require a bonus action by the crew:",
    {
      "type": "list",
      "style": "list-hang-notitle",
      "items": [
        {
          "type": "item",
          "name": "Engage (1 charge)",
          "entry": "The Arcycle turns on, allowing all other features to be used. Once engaged, it remains engaged until an hour has passed, at which point the Arcycle must be rengaged."
        },
        {
          "type": "item",
          "name": "Nitro (2 charge)",
          "entry": "The Arcycle's speed is tripled, but any checks to steer have a -5 penalty."
        },
        {
          "type": "item",
          "name": "Wheelie (1 charge)",
          "entry": "Ignore the penalty to uneven terrain until the end of your next turn."
        },
        {
          "type": "item",
          "name": "Shield (3 charges)",
          "entry": "The Arcycle and all crew or passengers have resistance to all damage until the start of your next turn."
        },
        {
          "type": "item",
          "name": "Lightbreak (2 charges)",
          "entry": "The Arcycle gains a climb speed equal to its land speed and can climb up flat surfaces, including ceilings."
        }
      ]
    },
    "Due to the Arcycle's size and shape, checks to steer while there is at least one passenger on it have disadvantage.",
    "The number of charges that an Arcycle can hold is determined by the Spell Gem used in crafting it. 10 charges for an Uncommon Spell Gem, 30 Charges for a Rare Spell Gem, 50 Charges for a Very Rare Spell Gem, 100 Charges for a Legendary Spell Gem. An installed spell gem can be replaced with a DT 50 Tinkering Tools check.",
    "An Arcycle has room for two modifications. Modifications can be added with a DT 50 Tinkering Tools check. Removing a modification takes 1 hour, with no check."
  ],
  "hull": {
    "ac": 14,
    "hp": 50,
    "dt": 5
  },
  "immune": ["poison", "psychic", "lightning"],
  "conditionImmune": [
    "blinded",
    "charmed",
    "deafened",
    "exhaustion",
    "frightened",
    "incapacitated",
    "paralyzed",
    "petrified",
    "poisoned",
    "prone",
    "stunned",
    "unconscious"
  ]
}
```

## Vehicle Actions

The `action` array describes what the vehicle can do:

### Basic Abilities

```json
"action": [
  "Basic description of vehicle operation...",
  "Speed and movement information..."
]
```

### Special Abilities

Use list formatting for multiple special abilities:

```json
"action": [
  "The vehicle has the following special actions:",
  {
    "type": "list",
    "style": "list-hang-notitle",
    "items": [
      {
        "type": "item",
        "name": "Action Name (Cost)",
        "entry": "Description of what the action does..."
      }
    ]
  }
]
```

## Vehicle Categories

### Mundane Vehicles

Standard transportation without magical properties:

- Carts and wagons
- Ships and boats
- Riding animals

### Magical Vehicles

Vehicles with supernatural abilities:

- Flying carpets
- Magical constructs
- Elemental-powered vehicles

### War Machines

Combat-focused vehicles:

- Siege engines
- Armored vehicles
- Weapon platforms

## Condition Immunities

Most vehicles are immune to conditions that don't apply to objects:

```json
"conditionImmune": [
  "blinded", "charmed", "deafened", "exhaustion", "frightened",
  "incapacitated", "paralyzed", "petrified", "poisoned", "prone",
  "stunned", "unconscious"
]
```

## Best Practices

1. **Appropriate Stats**: Match statistics to the vehicle's size and construction
2. **Clear Operations**: Describe how the vehicle is operated and by whom
3. **Balanced Abilities**: Ensure special abilities are balanced for their cost/rarity
4. **Terrain Logic**: Match terrain capabilities to the vehicle's design
5. **Combat Integration**: Provide clear rules for using vehicles in combat

## Related Sections

- **item**: Vehicle equipment and modifications
- **spell**: Magical vehicles may interact with spells
- **monster**: Some vehicles may be creature-vehicles
- **object**: Stationary constructs or installations

## Common Vehicle Modifications

- **Weapon Systems**: Adding combat capabilities
- **Defensive Upgrades**: Improved armor or shields
- **Speed Enhancements**: Increased movement capabilities
- **Utility Systems**: Specialized equipment or tools
- **Magical Enhancements**: Spell-like abilities or effects
