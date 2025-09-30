# 5eTools Item Documentation

Items in 5eTools represent equipment, magic items, weapons, armor, and other objects that characters can acquire and use.

## Overview

The item system in 5eTools covers everything from basic adventuring gear to legendary artifacts, with support for weapons, armor, wondrous items, consumables, and more.

## Schema Structure

```json
{
  "item": [
    {
      "name": "Item Name",
      "source": "SourceAbbreviation",
      "type": "G",
      "rarity": "common",
      "value": 50,
      "weight": 1,
      "entries": ["Description of the item's properties and effects."]
    }
  ]
}
```

## Core Properties

### Required Properties

| Property | Type   | Description       |
| -------- | ------ | ----------------- |
| `name`   | string | The item's name   |
| `source` | string | Source identifier |
| `type`   | string | Item type code    |

### Common Properties

| Property    | Type           | Description                                                          |
| ----------- | -------------- | -------------------------------------------------------------------- |
| `page`      | integer        | Page number in source                                                |
| `rarity`    | string         | Item rarity (common, uncommon, rare, very rare, legendary, artifact) |
| `value`     | integer        | Cost in copper pieces                                                |
| `weight`    | number         | Weight in pounds                                                     |
| `entries`   | array          | Description entries                                                  |
| `reqAttune` | boolean/string | Requires attunement                                                  |
| `wondrous`  | boolean        | Is a wondrous item                                                   |
| `tier`      | string         | Item tier (minor, major)                                             |
| `charges`   | integer        | Number of charges                                                    |
| `recharge`  | string         | Recharge condition                                                   |

## Item Types

### Armor Types

- **"LA"** - Light Armor
- **"MA"** - Medium Armor
- **"HA"** - Heavy Armor
- **"S"** - Shield

### Weapon Types

- **"M"** - Melee Weapon
- **"R"** - Ranged Weapon
- **"A"** - Ammunition

### Other Types

- **"G"** - Adventuring Gear
- **"AT"** - Artisan's Tools
- **"T"** - Tools
- **"FD"** - Food and Drink
- **"P"** - Potion
- **"SC"** - Scroll
- **"W"** - Wand
- **"RD"** - Rod
- **"ST"** - Staff
- **"RG"** - Ring
- **"WD"** - Wondrous Item
- **"TG"** - Trade Good
- **"$"** - Treasure

## Rarity Levels

- **"none"** - No rarity (mundane items)
- **"common"** - Common magic items
- **"uncommon"** - Uncommon magic items
- **"rare"** - Rare magic items
- **"very rare"** - Very rare magic items
- **"legendary"** - Legendary magic items
- **"artifact"** - Artifacts
- **"varies"** - Variable rarity
- **"unknown"** - Unknown rarity

## Weapons

### Basic Weapon

```json
{
  "name": "Longsword",
  "source": "PHB",
  "page": 149,
  "type": "M",
  "weaponCategory": "martial",
  "weight": 3,
  "value": 1500,
  "dmg1": "1d8",
  "dmgType": "S",
  "property": ["V"],
  "range": "5",
  "entries": [
    "A longsword is a versatile weapon that can be wielded with one or two hands."
  ]
}
```

### Magic Weapon

```json
{
  "name": "Flame Tongue",
  "source": "DMG",
  "page": 170,
  "type": "M",
  "weaponCategory": "martial",
  "baseItem": "longsword",
  "rarity": "rare",
  "reqAttune": true,
  "weight": 3,
  "dmg1": "1d8",
  "dmgType": "S",
  "property": ["V"],
  "bonusWeapon": "+1",
  "entries": [
    "You can use a bonus action to speak this magic sword's command word, causing flames to erupt from the blade. These flames shed bright light in a 40-foot radius and dim light for an additional 40 feet. While the sword is ablaze, it deals an extra {@damage 2d6} fire damage to any target it hits. The flames last until you use a bonus action to speak the command word again or until you drop or sheathe the sword."
  ]
}
```

## Armor

### Basic Armor

```json
{
  "name": "Chain Mail",
  "source": "PHB",
  "page": 145,
  "type": "HA",
  "ac": 16,
  "weight": 55,
  "value": 7500,
  "stealth": true,
  "entries": [
    "Made of interlocking metal rings, chain mail includes a layer of quilted fabric worn underneath the mail to prevent chafing and to cushion the impact of blows. The suit includes gauntlets."
  ]
}
```

### Magic Armor

```json
{
  "name": "Armor of Resistance",
  "source": "DMG",
  "page": 152,
  "type": "LA|MA|HA",
  "rarity": "rare",
  "reqAttune": true,
  "entries": [
    "You have resistance to one type of damage while you wear this armor. The GM chooses the type or determines it randomly from the options below.",
    {
      "type": "table",
      "colLabels": ["d10", "Damage Type"],
      "colStyles": ["col-2 text-center", "col-10"],
      "rows": [
        ["1", "Acid"],
        ["2", "Cold"],
        ["3", "Fire"],
        ["4", "Force"],
        ["5", "Lightning"],
        ["6", "Necrotic"],
        ["7", "Poison"],
        ["8", "Psychic"],
        ["9", "Radiant"],
        ["10", "Thunder"]
      ]
    }
  ]
}
```

## Weapon Properties

Common weapon property abbreviations:

- **"A"** - Ammunition
- **"F"** - Finesse
- **"H"** - Heavy
- **"L"** - Light
- **"LD"** - Loading
- **"R"** - Reach
- **"T"** - Thrown
- **"2H"** - Two-handed
- **"V"** - Versatile

## Potions and Consumables

```json
{
  "name": "Potion of Healing",
  "source": "DMG",
  "page": 187,
  "type": "P",
  "rarity": "common",
  "value": 5000,
  "weight": 0.5,
  "entries": [
    "You regain {@dice 2d4 + 2} hit points when you drink this potion. The potion's red liquid glimmers when agitated."
  ]
}
```

## Charged Items

### Items with Charges

```json
{
  "name": "Wand of Magic Missiles",
  "source": "DMG",
  "page": 211,
  "type": "W",
  "rarity": "uncommon",
  "weight": 1,
  "reqAttune": false,
  "charges": 7,
  "recharge": "dawn",
  "rechargeAmount": "1d6 + 1",
  "entries": [
    "This wand has 7 charges. While holding it, you can use an action to expend 1 or more of its charges to cast the {@spell magic missile} spell from it. For 1 charge, you cast the 1st-level version of the spell. You can increase the spell slot level by one for each additional charge you expend.",
    "The wand regains {@dice 1d6 + 1} expended charges daily at dawn. If you expend the wand's last charge, roll a {@dice d20}. On a 1, the wand crumbles into ashes and is destroyed."
  ]
}
```

## Attunement

### Simple Attunement

```json
"reqAttune": true
```

### Conditional Attunement

```json
"reqAttune": "by a spellcaster"
```

### Class-Specific Attunement

```json
"reqAttune": "by a cleric or paladin"
```

## Item Variants

### Base Item Reference

```json
{
  "name": "+1 Longsword",
  "source": "DMG",
  "baseItem": "longsword",
  "type": "M",
  "rarity": "uncommon",
  "bonusWeapon": "+1",
  "entries": [
    "You have a +1 bonus to attack and damage rolls made with this magic weapon."
  ]
}
```

### Multiple Types

```json
{
  "name": "Bag of Holding",
  "type": "W|G",
  "rarity": "uncommon"
}
```

## Cursed Items

```json
{
  "name": "Berserker Axe",
  "source": "DMG",
  "page": 155,
  "type": "M",
  "weaponCategory": "martial",
  "baseItem": "battleaxe",
  "rarity": "rare",
  "reqAttune": true,
  "curse": true,
  "bonusWeapon": "+1",
  "entries": [
    "You gain a +1 bonus to attack and damage rolls made with this magic weapon. In addition, while you are attuned to this weapon, your hit point maximum increases by 1 for each level you have attained.",
    {
      "type": "entries",
      "name": "Curse",
      "entries": [
        "This axe is cursed, and becoming attuned to it extends the curse to you. As long as you remain cursed, you are unwilling to part with the axe, keeping it within reach at all times. You also have disadvantage on attack rolls with weapons other than this one, unless no foe is within 60 feet of you that you can see or hear.",
        "Whenever a hostile creature damages you while the axe is in your possession, you must succeed on a DC 15 Wisdom saving throw or go berserk. While berserk, you must use your action each turn to attack the creature nearest to you with the axe. If you can make extra attacks as part of the Attack action, you use those extra attacks, moving to attack the next nearest creature after you fell your current target. If you have multiple possible targets, you attack one at random. You are berserk until you start your turn with no creatures within 60 feet of you that you can see or hear."
      ]
    }
  ]
}
```

## Item Sets

Items that are part of a set:

```json
{
  "name": "Insignia of Claws",
  "source": "HotDQ",
  "page": 94,
  "type": "W",
  "rarity": "uncommon",
  "reqAttune": true,
  "set": "Regalia of the Horned King",
  "entries": [
    "The jewels in the insignia of the Cult of the Dragon flare with purple light when you enter combat, empowering your natural weapons or unarmed strikes with magical force. While wearing the insignia, you gain a +1 bonus to the attack and damage rolls of unarmed strikes and natural weapons. Such attacks are considered to be magical."
  ]
}
```

## Sentient Items

```json
{
  "name": "Blackrazor",
  "source": "DMG",
  "page": 216,
  "type": "M",
  "weaponCategory": "martial",
  "baseItem": "greatsword",
  "rarity": "legendary",
  "reqAttune": true,
  "sentient": true,
  "bonusWeapon": "+3",
  "entries": [
    "Hidden in the dungeon of White Plume Mountain, this blade is known for its hunger for souls and its ability to devour the life force of those it strikes.",
    {
      "type": "entries",
      "name": "Sentience",
      "entries": [
        "Blackrazor is a sentient chaotic neutral weapon with an Intelligence of 17, a Wisdom of 10, and a Charisma of 19. It has hearing and darkvision out to a range of 120 feet.",
        "The weapon communicates telepathically with its wielder and can speak, read, and understand Common."
      ]
    }
  ]
}
```

## Complete Example

```json
{
  "name": "Clockwork Amulet",
  "source": "XGE",
  "page": 137,
  "type": "W",
  "rarity": "common",
  "weight": 1,
  "entries": [
    "This copper amulet contains tiny interlocking gears and is powered by magic from Mechanus, a plane of clockwork predictability. A creature that puts an ear to the amulet can hear faint ticking and whirring noises coming from within.",
    "When you make an attack roll while wearing this amulet and the roll is a 9 or lower, you can react to let the amulet make the attack roll instead. The amulet makes attack rolls with a +5 bonus. Once the amulet has made 3 attack rolls, it can't be used again until the next dawn."
  ],
  "charges": 3,
  "recharge": "dawn"
}
```

## Special Properties

### Ammunition

```json
{
  "name": "Arrow",
  "source": "PHB",
  "page": 150,
  "type": "A",
  "weight": 0.05,
  "value": 5,
  "entries": [
    "Arrows are used with a weapon that has the ammunition property to make a ranged attack. Each time you attack with the weapon, you expend one piece of ammunition. Drawing the ammunition from a quiver, case, or other container is part of the attack (you need a free hand to load a one-handed weapon). At the end of the battle, you can recover half your expended ammunition by taking a minute to search the battlefield."
  ]
}
```

### Vehicles

```json
{
  "name": "Rowboat",
  "source": "PHB",
  "page": 157,
  "type": "VEH",
  "vehicleType": "ship",
  "value": 5000,
  "weight": 100,
  "entries": [
    "A rowboat serves to ferry passengers back and forth from a larger ship or to navigate lakes and rivers."
  ],
  "crew": 1,
  "vehAc": 11,
  "vehHp": 25,
  "vehSpeed": "1½ mph"
}
```

## Custom Equipment and Foundry Integration

### Custom Properties

The `customProperties` field allows homebrew items to store custom data:

```json
"customProperties": {
  "containerType": "Ammunition Container",
  "reloadable": true,
  "clipCapacity": 6
}
```

This is an object with string, number, integer, or boolean values for custom attributes.

### Foundry VTT Integration

5eTools provides built-in support for Foundry VTT through specific properties:

#### foundryType

Manually specify the exact Foundry item type:

```json
"foundryType": "consumable"
```

Valid types: `"weapon"`, `"equipment"`, `"consumable"`, `"tool"`, `"loot"`, `"class"`, `"spell"`, `"feat"`, `"backpack"`

#### foundrySystem

Configure Foundry-specific system data:

```json
"foundrySystem": {
  "consumableType": "ammo",
  "uses": {
    "max": 6,
    "per": "charges"
  }
}
```

#### foundryFlags

Set Foundry module flags:

```json
"foundryFlags": {
  "midi-qol": {
    "onUseMacroName": "ItemMacro"
  }
}
```

### Creating Custom Equipment Types

For custom equipment not covered by standard types:

1. Use `"type": "OTH"` for "Other" items
2. Add `customProperties` to define custom behavior
3. Use `foundryType` to specify how it imports into Foundry
4. Include clear descriptions in `entries`

Example custom ammunition container:

```json
{
  "name": "Clip",
  "source": "TftJC",
  "type": "OTH",
  "rarity": "none",
  "weight": 0.5,
  "value": 50,
  "customProperties": {
    "containerType": "Ammunition Container",
    "reloadable": true,
    "clipCapacity": 6
  },
  "foundryType": "consumable",
  "packContents": ["6 rounds"],
  "entries": ["A metal container designed to hold ammunition for firearms."]
}
```

## Miscellaneous Tags (`miscTags`)

The `miscTags` property is an array of short codes used to categorize items for filtering, sorting, or special handling in 5eTools.  
Each tag represents a specific property, rule, or behavior.

### Supported Tags

| Tag    | Meaning / Usage                      |
| ------ | ------------------------------------ |
| ABP    | Attunement by Proficiency            |
| AMM    | Ammunition                           |
| ART    | Artisan Tool                         |
| BAG    | Bag of Holding                       |
| BLK    | Black Powder                         |
| BLD    | Blade                                |
| BOW    | Bow                                  |
| CNS    | Consumable (item is consumed on use) |
| CURS   | Cursed item                          |
| DRK    | Drink                                |
| DRU    | Druidic                              |
| FAM    | Familiar item                        |
| FOD    | Food                                 |
| HOLY   | Holy item                            |
| INSTR  | Musical instrument                   |
| KIT    | Tool kit                             |
| LGT    | Light source                         |
| LOCK   | Lock item                            |
| MAG    | Magical item                         |
| MISC   | Miscellaneous                        |
| MWK    | Masterwork item                      |
| PET    | Pet item                             |
| POIS   | Poison                               |
| POTN   | Potion                               |
| RCH    | Requires attunement                  |
| RLD    | Reload (item must be reloaded)       |
| SCROLL | Scroll                               |
| SENT   | Sentient item                        |
| SHLD   | Shield                               |
| SIL    | Silvered item                        |
| THR    | Throwable item                       |
| VEH    | Vehicle                              |
| WEAP   | Weapon                               |
| WOND   | Wondrous item                        |

> **Note:**  
> The full list of supported tags is defined in the [5eTools homebrew schema](https://raw.githubusercontent.com/TheGiddyLimit/5etools-utils/master/schema/brew-fast/homebrew.json).  
> Use tags that match your item's properties for best compatibility.

### Example Usage

```json
{
  "name": "Potion of Healing",
  "miscTags": ["CNS", "POTN"]
}
```

## Best Practices

1. **Clear Descriptions**: Write item descriptions that clearly explain mechanics and flavor
2. **Balanced Mechanics**: Ensure magic items don't break game balance for their rarity
3. **Proper Categorization**: Use correct type codes and rarity levels
4. **Value Guidelines**: Follow standard pricing for similar items
5. **Cross-References**: Use `{@spell}`, `{@condition}`, etc. for proper linking
6. **Attunement Logic**: Consider whether powerful items should require attunement
7. **Charge Systems**: Use charges for limited-use items to prevent abuse
8. **Schema Compliance**: Always validate against the official 5eTools schema
9. **Custom Properties**: Use `customProperties` object for homebrew-specific data
10. **Foundry Integration**: Leverage `foundryType`, `foundrySystem`, and `foundryFlags` for VTT compatibility

This documentation provides comprehensive guidance for creating items that integrate seamlessly with 5eTools and enhance gameplay.
