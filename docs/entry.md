# Entry Documentation

## Overview

Entries are the fundamental building blocks for content in 5eTools homebrew. They provide a flexible, recursive system for creating rich, interactive content that can include text, lists, tables, images, links, and complex nested structures. Understanding entry types is crucial for creating well-formatted homebrew content.

## Basic Entry Types

### String Entries

The simplest entry type - just plain text content.

```json
"entries": [
  "This is a simple string entry.",
  "Each string becomes a paragraph of text."
]
```

### Integer Entries

Numeric content that gets rendered as text.

```json
"entries": [
  42,
  "Mixed with text entries"
]
```

## Container Entry Types

### Entries Container (`"type": "entries"`)

Groups content together with an optional name/header.

```json
{
  "type": "entries",
  "name": "Section Title",
  "entries": ["Content goes here.", "Can contain any other entry types."]
}
```

**Properties:**

- `name` (string, optional) - Section header
- `entries` (array, required) - Nested content
- `style` (string, optional) - CSS styling
- `id` (string, optional) - HTML ID for linking

### Section (`"type": "section"`)

Creates a major section with a header.

```json
{
  "type": "section",
  "name": "Chapter Title",
  "entries": ["Section content..."]
}
```

**Properties:**

- `name` (string, optional) - Section header
- `entries` (array, required) - Section content
- `alias` (array, optional) - Alternative names
- `style` (string, optional) - CSS styling

### Inline Container (`"type": "inline"`)

Renders content inline without line breaks.

```json
{
  "type": "inline",
  "entries": ["This content", "renders inline"]
}
```

### Inline Block (`"type": "inlineBlock"`)

Similar to inline but with block-level styling.

```json
{
  "type": "inlineBlock",
  "entries": ["Block-level inline content"]
}
```

## List Entry Types

### List (`"type": "list"`)

Creates bulleted, numbered, or styled lists.

```json
{
  "type": "list",
  "style": "list-decimal",
  "items": [
    "First item",
    "Second item",
    {
      "type": "item",
      "name": "Named Item",
      "entry": "Item with a name"
    }
  ]
}
```

**Properties:**

- `items` (array, required) - List items
- `style` (string, optional) - List formatting
- `columns` (integer, optional) - Number of columns
- `start` (integer, optional) - Starting number

**Style Options:**

- `"list-decimal"` - 1, 2, 3, etc.
- `"list-lower-roman"` - i, ii, iii, etc.
- `"list-upper-roman"` - I, II, III, etc.
- `"list-hang"` - Hanging indent, no bullets
- `"list-hang-notitle"` - Hanging indent, no bullets, no title
- `"list-name"` - Bold text list
- `"list-no-bullets"` - No bullets, reduced indent

### Options (`"type": "options"`)

For option lists where users choose a specific number.

```json
{
  "type": "options",
  "count": 2,
  "entries": ["Option 1", "Option 2", "Option 3"]
}
```

**Properties:**

- `entries` (array, required) - Available options
- `count` (integer, optional) - Number of options to choose

## Table Entry Types

### Table (`"type": "table"`)

Creates structured data tables.

```json
{
  "type": "table",
  "caption": "Table Title",
  "colLabels": ["Column 1", "Column 2"],
  "colStyles": ["col-3", "col-9"],
  "rows": [
    ["Cell 1", "Cell 2"],
    ["Cell 3", "Cell 4"]
  ]
}
```

**Properties:**

- `rows` (array, required) - Table data
- `caption` (string, optional) - Table title
- `colLabels` (array, optional) - Column headers
- `colStyles` (array, optional) - Column CSS classes
- `rowLabels` (array, optional) - Row headers
- `rowStyles` (array, optional) - Row CSS classes
- `isStriped` (boolean, optional) - Alternating row colors
- `isNameGenerator` (boolean, optional) - For name generation tables

### Table Row (`"type": "row"`)

Individual table row with custom styling.

```json
{
  "type": "row",
  "style": "row-indent",
  "row": ["Data 1", "Data 2"]
}
```

### Table Cell (`"type": "cell"`)

Individual table cell with special properties.

```json
{
  "type": "cell",
  "width": 2,
  "entry": "Cell content",
  "roll": {
    "min": 1,
    "max": 6
  }
}
```

**Properties:**

- `entry` (required) - Cell content
- `width` (integer, optional) - Column span
- `roll` (object, optional) - Dice roll data

### Table Header Cell (`"type": "cellHeader"`)

Header cell with special formatting.

```json
{
  "type": "cellHeader",
  "entry": "Header Text",
  "width": 2
}
```

## Special Content Types

### Quote (`"type": "quote"`)

Highlighted quote or callout box.

```json
{
  "type": "quote",
  "entries": ["The quoted text goes here."],
  "by": "Author Name",
  "from": "Source Book"
}
```

**Properties:**

- `entries` (array, required) - Quote content
- `by` (string/array, optional) - Quote attribution
- `from` (string, optional) - Quote source
- `skipMarks` (boolean, optional) - Skip quotation marks
- `skipItalics` (boolean, optional) - Skip italic formatting

### Inset (`"type": "inset"`)

Highlighted information box.

```json
{
  "type": "inset",
  "name": "Sidebar Title",
  "entries": ["Important information that stands out from the main text."]
}
```

### Read Aloud (`"type": "insetReadaloud"`)

Special inset for read-aloud text in adventures.

```json
{
  "type": "insetReadaloud",
  "entries": ["Text meant to be read aloud to players."]
}
```

## Interactive Entry Types

### Link (`"type": "link"`)

Creates hyperlinks to internal or external content.

```json
{
  "type": "link",
  "text": "Click here",
  "href": {
    "type": "internal",
    "path": "bestiary.html",
    "hash": "aboleth_mm"
  }
}
```

**Internal Link:**

```json
{
  "type": "internal",
  "path": "page.html",
  "hash": "anchor",
  "subhashes": [
    {
      "key": "state",
      "value": "expanded"
    }
  ]
}
```

**External Link:**

```json
{
  "type": "external",
  "url": "https://example.com"
}
```

### Image (`"type": "image"`)

Embeds images with extensive customization options.

```json
{
  "type": "image",
  "href": {
    "type": "internal",
    "path": "img/monster.webp"
  },
  "title": "Image Title",
  "altText": "Accessibility description",
  "maxWidth": 400
}
```

**Properties:**

- `href` (object, required) - Image source
- `title` (string, optional) - Image caption
- `altText` (string, optional) - Accessibility text
- `credit` (string, optional) - Image credit
- `maxWidth`/`maxHeight` (integer, optional) - Display size limits
- `imageType` (string, optional) - "map" or "mapPlayer"

### Gallery (`"type": "gallery"`)

Collection of images.

```json
{
  "type": "gallery",
  "images": [
    {
      "type": "image",
      "href": { "type": "internal", "path": "img1.webp" }
    },
    {
      "type": "image",
      "href": { "type": "internal", "path": "img2.webp" }
    }
  ]
}
```

## Game Mechanics Entry Types

### Dice (`"type": "dice"`)

Rollable dice expressions.

```json
{
  "type": "dice",
  "toRoll": [
    {
      "number": 2,
      "faces": 6
    }
  ],
  "rollable": true
}
```

### Ability DC (`"type": "abilityDc"`)

Ability score save DC display.

```json
{
  "type": "abilityDc",
  "name": "Constitution",
  "attributes": ["con"]
}
```

### Ability Attack Modifier (`"type": "abilityAttackMod"`)

Attack bonus display.

```json
{
  "type": "abilityAttackMod",
  "name": "Strength",
  "attributes": ["str"]
}
```

### Generic Ability (`"type": "abilityGeneric"`)

Custom ability score references.

```json
{
  "type": "abilityGeneric",
  "text": "your spellcasting ability",
  "attributes": ["int", "wis", "cha"]
}
```

### Bonus (`"type": "bonus"`)

Numeric bonus display.

```json
{
  "type": "bonus",
  "value": 2
}
```

### Bonus Speed (`"type": "bonusSpeed"`)

Speed bonus display.

```json
{
  "type": "bonusSpeed",
  "value": 30
}
```

## Variant and Item Entry Types

### Variant (`"type": "variant"`)

Optional rule variants.

```json
{
  "type": "variant",
  "name": "Optional Rule",
  "entries": ["Description of the variant rule."]
}
```

### Variant Inner (`"type": "variantInner"`)

Nested variant content.

```json
{
  "type": "variantInner",
  "name": "Sub-variant",
  "entries": ["Nested variant content."]
}
```

### Variant Sub (`"type": "variantSub"`)

Sub-variant rules.

```json
{
  "type": "variantSub",
  "name": "Alternative",
  "entries": ["Alternative rule option."]
}
```

### Item (`"type": "item"`)

List item with optional naming.

```json
{
  "type": "item",
  "name": "Item Name",
  "entry": "Item description",
  "nameDot": false
}
```

### Item Sub (`"type": "itemSub"`)

Sub-item for nested lists.

```json
{
  "type": "itemSub",
  "name": "Sub-item",
  "entry": "Sub-item description"
}
```

### Item Spell (`"type": "itemSpell"`)

Spell item for magic items.

```json
{
  "type": "itemSpell",
  "name": "Spell Name",
  "entry": "Spell description for this item"
}
```

## Advanced Entry Types

### Statblock Reference (`"type": "statblock"`)

References to stat blocks in the compendium.

```json
{
  "type": "statblock",
  "tag": "creature",
  "name": "Aboleth",
  "source": "MM"
}
```

### Statblock Inline (`"type": "statblockInline"`)

Embeds complete stat blocks inline.

```json
{
  "type": "statblockInline",
  "dataType": "monster",
  "data": {
    "name": "Custom Monster",
    "size": ["M"],
    "type": "humanoid"
  }
}
```

### Actions (`"type": "actions"`)

Container for creature actions.

```json
{
  "type": "actions",
  "name": "Actions",
  "entries": ["Action descriptions..."]
}
```

### Attack (`"type": "attack"`)

Structured attack descriptions.

```json
{
  "type": "attack",
  "attackType": "MW",
  "attackEntries": ["Melee Weapon Attack: +5 to hit"],
  "hitEntries": ["Hit: 1d8 + 3 slashing damage"]
}
```

### Spellcasting (`"type": "spellcasting"`)

Complex spellcasting blocks.

```json
{
  "type": "spellcasting",
  "name": "Spellcasting",
  "headerEntries": ["The creature is a 5th-level spellcaster..."],
  "spells": {
    "0": {
      "spells": ["mage hand", "prestidigitation"]
    },
    "1": {
      "slots": 4,
      "spells": ["magic missile", "shield"]
    }
  }
}
```

## Reference Entry Types

### Class Feature Reference (`"type": "refClassFeature"`)

References class features (classes page only).

```json
{
  "type": "refClassFeature",
  "classFeature": "Action Surge|Fighter|PHB|1"
}
```

### Subclass Feature Reference (`"type": "refSubclassFeature"`)

References subclass features (classes page only).

```json
{
  "type": "refSubclassFeature",
  "subclassFeature": "Improved Critical|Fighter|Champion|PHB|15"
}
```

### Optional Feature Reference (`"type": "refOptionalfeature"`)

References optional features (classes page only).

```json
{
  "type": "refOptionalfeature",
  "optionalfeature": "Agonizing Blast|PHB"
}
```

### Feat Reference (`"type": "refFeat"`)

References feats (classes page only).

```json
{
  "type": "refFeat",
  "feat": "Great Weapon Master|PHB"
}
```

## Utility Entry Types

### Horizontal Rule (`"type": "hr"`)

Creates a horizontal line separator.

```json
{
  "type": "hr"
}
```

### Wrapped Content (`"type": "wrapper"`)

Wraps arbitrary content.

```json
{
  "type": "wrapper",
  "wrapped": {
    "customContent": "Any JSON structure"
  }
}
```

### Homebrew (`"type": "homebrew"`)

Marks homebrew-specific content.

```json
{
  "type": "homebrew",
  "entries": ["This is homebrew content."],
  "movedTo": "Updated location reference"
}
```

### Flowchart (`"type": "flowchart"`)

Creates flowchart diagrams.

```json
{
  "type": "flowchart",
  "blocks": [
    {
      "type": "flowBlock",
      "entries": ["Decision point"]
    }
  ]
}
```

### Flow Block (`"type": "flowBlock"`)

Individual flowchart block.

```json
{
  "type": "flowBlock",
  "entries": ["Block content"]
}
```

### Ingredient (`"type": "ingredient"`)

Recipe ingredients with amounts.

```json
{
  "type": "ingredient",
  "entry": "Salt",
  "amount1": 1
}
```

## Best Practices

### Nesting Entries

Entries can be nested recursively:

```json
{
  "type": "entries",
  "name": "Main Section",
  "entries": [
    "Introduction text",
    {
      "type": "list",
      "items": [
        "List item 1",
        {
          "type": "entries",
          "name": "Subsection",
          "entries": ["Nested content"]
        }
      ]
    }
  ]
}
```

### Performance Considerations

- Use string entries for simple text
- Avoid excessive nesting levels
- Use appropriate entry types for content structure
- Consider using `"style"` properties for custom formatting

### Accessibility

- Always include `altText` for images
- Use semantic entry types (headings, lists, etc.)
- Provide meaningful names for sections and items

### 5eTools Integration

- Entry types render consistently across all 5eTools pages
- Many entry types have special behaviors in the online tool
- VTT integrations can interpret structured entries for automation

## Common Patterns

### Structured Feature Description

```json
{
  "type": "entries",
  "name": "Feature Name",
  "entries": [
    "Basic description.",
    {
      "type": "list",
      "items": ["Benefit 1", "Benefit 2"]
    },
    "Additional rules text."
  ]
}
```

### Table with Explanation

```json
[
  "This table shows the progression:",
  {
    "type": "table",
    "caption": "Progression Table",
    "colLabels": ["Level", "Benefit"],
    "rows": [
      ["1st", "First benefit"],
      ["5th", "Improved benefit"]
    ]
  },
  "Choose benefits according to your level."
]
```

### Quote with Attribution

```json
{
  "type": "quote",
  "entries": ["The magic is in the details, not the grand gestures."],
  "by": "Mordenkainen",
  "from": "Mordenkainen's Tome of Foes"
}
```

This comprehensive entry system allows for rich, interactive content that maintains consistency across the 5eTools ecosystem while providing extensive customization options for homebrew creators.
