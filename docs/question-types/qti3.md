# QTI interchange

Examplary supports importing and exporting questions in [QTI 3.0](https://www.1edtech.org/standards/qti) format.

By default, it will run your custom assessment component in a QTI-compatible way, but you can also
define custom mappings for your question types. This is great if your question type implements a default
interaction type supported in the QTI spec, or if you want to customize how your question data is represented in QTI.

This is done through the `interchange` field in your `question-type.json` file, using [JSONata](https://jsonata.org/)
expressions to define the mapping between your question settings and QTI elements.

## Basic structure

The interchange configuration lives under the `interchange.qti3` key:

```json title="question-type.json"
{
  "interchange": {
    "qti3": {
      "interactionType": "choiceInteraction",
      "export": { ... },
      "import": { ... }
    }
  }
}
```

| Field             | Required | Description                                                                     |
| ----------------- | -------- | ------------------------------------------------------------------------------- |
| `interactionType` | Yes      | The QTI interaction type (e.g., `choiceInteraction`, `extendedTextInteraction`) |
| `export`          | No       | Configuration for exporting questions to QTI                                    |
| `import`          | No       | Configuration for importing QTI interactions as questions                       |

:::tip
You can define just `export`, just `import`, or both. At least one must be present.
:::

## JSONata expressions

All dynamic values in the interchange configuration are [JSONata](https://jsonata.org/) expressions. JSONata is a lightweight query and transformation language for JSON data.

### Export context

During **export**, the question object is available as `$question`:

```json
{
  "id": "q_abc123",
  "title": "What is the capital of France?",
  "description": "Select the correct answer.",
  "settings": {
    "options": [
      { "text": "London", "correct": false },
      { "text": "Paris", "correct": true },
      { "text": "Berlin", "correct": false }
    ],
    "shuffleOptions": true,
    "maxSelections": 1
  }
}
```

Access properties using `$question.settings.shuffleOptions`, `$question.description`, etc.

### Import context

During **import**, the parsed QTI interaction is available as `$interaction`:

```json
{
  "type": "choiceInteraction",
  "attributes": {
    "shuffle": true,
    "max-choices": 1
  },
  "prompt": "Select the correct answer.",
  "choices": [
    { "identifier": "A", "content": "London" },
    { "identifier": "B", "content": "Paris" },
    { "identifier": "C", "content": "Berlin" }
  ],
  "correctResponse": ["B"]
}
```

Access properties using `$interaction.prompt`, `$interaction.choices`, etc.

### Common JSONata patterns

Here are some JSONata patterns you'll use frequently:

```javascript
// Simple property access
$question.settings.shuffleOptions           // → true

// Conditional (ternary)
$question.settings.maxSelections = 1 ? 'single' : 'multiple'  // → "single"

// String concatenation
'choice_' & $string($index)       // → "choice_0", "choice_1", etc.

// Filter array by property
$question.settings.options[correct = true]  // → [{ "text": "Paris", "correct": true }]

// Map array to new structure
$question.settings.options.(text)           // → ["London", "Paris", "Berlin"]

// Check if value is in array (import)
identifier in $interaction.correctResponse  // → true or false

// Get array indices of matching items
$question.settings.options[correct].$index  // → [1] (indices where correct is true)
```

:::info Learn more
For comprehensive JSONata documentation, visit [jsonata.org](https://jsonata.org/). You can also use the [JSONata Exerciser](https://try.jsonata.org/) to test your expressions interactively.
:::

## Export configuration

The export configuration defines how to transform your question into QTI XML.

### Interaction attributes

Map your settings to QTI interaction attributes:

```json title="question-type.json (partial)"
{
  "interchange": {
    "qti3": {
      "interactionType": "choiceInteraction",
      "export": {
        "attributes": {
          "shuffle": "$question.settings.shuffleOptions",
          "max-choices": "$question.settings.maxSelections"
        },
        "prompt": "$question.description"
      }
    }
  }
}
```

This generates:

```xml
<qti-choice-interaction
  response-identifier="RESPONSE"
  shuffle="true"
  max-choices="1">
  <qti-prompt>Select the correct answer.</qti-prompt>
  ...
</qti-choice-interaction>
```

### Choices

For interactions with choice elements, use the `choices` configuration:

```json title="question-type.json (partial)"
{
  "export": {
    "choices": {
      "source": "$question.settings.options",
      "identifier": "'choice_' & $string($index)",
      "content": "text",
      "fixed": "fixed"
    }
  }
}
```

| Field        | Description                                                                 |
| ------------ | --------------------------------------------------------------------------- |
| `source`     | JSONata expression returning the array to map                               |
| `identifier` | JSONata expression for each choice's ID (has access to `$index`)            |
| `content`    | JSONata expression for the choice text (evaluated per item)                 |
| `fixed`      | Optional: JSONata expression for whether the choice is fixed (not shuffled) |

:::tip
Inside `identifier`, `content`, and `fixed` expressions, you're iterating over each item in the source array. Properties of the current item are directly accessible (e.g., `text`, `fixed`), and `$index` gives you the current position.
:::

This generates:

```xml
<qti-simple-choice identifier="choice_0">London</qti-simple-choice>
<qti-simple-choice identifier="choice_1">Paris</qti-simple-choice>
<qti-simple-choice identifier="choice_2">Berlin</qti-simple-choice>
```

### Response declaration

Configure the response declaration to define cardinality, base type, and correct responses:

```json title="question-type.json (partial)"
{
  "export": {
    "responseDeclaration": {
      "identifier": "RESPONSE",
      "cardinality": "$question.settings.maxSelections = 1 ? 'single' : 'multiple'",
      "baseType": "'identifier'",
      "correctResponse": "$map($question.settings.options, function($opt, $idx) { $opt.correct ? 'choice_' & $string($idx) : null })[$ != null]"
    }
  }
}
```

The `correctResponse` expression filters the options array to find correct answers, then maps them to choice identifiers.

### Response processing

Specify a standard response processing template:

```json title="question-type.json (partial)"
{
  "export": {
    "responseProcessingTemplate": "https://purl.imsglobal.org/spec/qti/v3p0/rptemplates/match_correct.xml"
  }
}
```

Common templates:

| Template                 | Use case                                        |
| ------------------------ | ----------------------------------------------- |
| `match_correct.xml`      | Exact match scoring (multiple choice, ordering) |
| `map_response.xml`       | Partial credit with score mapping               |
| `map_response_point.xml` | Partial credit for point-based responses        |

## Import configuration

The import configuration defines how to extract question settings from a QTI interaction.

### Basic settings extraction

Map QTI attributes and elements to your settings:

```json title="question-type.json (partial)"
{
  "interchange": {
    "qti3": {
      "interactionType": "choiceInteraction",
      "import": {
        "description": "$interaction.prompt",
        "settings": {
          "shuffleOptions": "$boolean($interaction.attributes.shuffle)",
          "maxSelections": "$number($interaction.attributes.`max-choices`)"
        }
      }
    }
  }
}
```

:::warning Attribute names with hyphens
QTI attribute names often contain hyphens (e.g., `max-choices`). In JSONata, wrap these in backticks:

```javascript
$interaction.attributes.`max-choices`
```

:::

### Array extraction

For extracting choice arrays, use the object syntax with `source` and `each`:

```json title="question-type.json (partial)"
{
  "import": {
    "settings": {
      "options": {
        "source": "$interaction.choices",
        "each": {
          "text": "content",
          "correct": "identifier in $interaction.correctResponse"
        }
      }
    }
  }
}
```

| Field    | Description                                                       |
| -------- | ----------------------------------------------------------------- |
| `source` | JSONata expression returning the source array                     |
| `each`   | Map of property names to JSONata expressions (evaluated per item) |

Inside `each` expressions:

- Properties of the current item are directly accessible (`content`, `identifier`)
- Use `$interaction` to access the full interaction context
- Use `$index` for the current index

## Complete examples

### Multiple choice

```json title="question-type.json"
{
  "id": "examplary.default.multiple-choice",
  "name": { "en": "Multiple choice" },

  "settings": [
    { "id": "options", "type": "array" },
    { "id": "shuffleOptions", "type": "boolean", "default": true },
    { "id": "maxSelections", "type": "number", "default": 1 }
  ],

  "interchange": {
    "qti3": {
      "interactionType": "choiceInteraction",

      "export": {
        "attributes": {
          "shuffle": "$question.settings.shuffleOptions",
          "max-choices": "$question.settings.maxSelections"
        },
        "prompt": "$question.description",
        "choices": {
          "source": "$question.settings.options",
          "identifier": "'choice_' & $string($index)",
          "content": "text"
        },
        "responseDeclaration": {
          "cardinality": "$question.settings.maxSelections = 1 ? 'single' : 'multiple'",
          "baseType": "'identifier'",
          "correctResponse": "$map($question.settings.options, function($o, $i) { $o.correct ? 'choice_' & $string($i) : null })[$ != null]"
        },
        "responseProcessingTemplate": "https://purl.imsglobal.org/spec/qti/v3p0/rptemplates/match_correct.xml"
      },

      "import": {
        "description": "$interaction.prompt",
        "settings": {
          "options": {
            "source": "$interaction.choices",
            "each": {
              "text": "content",
              "correct": "identifier in $interaction.correctResponse"
            }
          },
          "shuffleOptions": "$boolean($interaction.attributes.shuffle)",
          "maxSelections": "$number($interaction.attributes.`max-choices`)"
        }
      }
    }
  }
}
```

### Essay / Extended text

```json title="question-type.json"
{
  "id": "examplary.default.essay",
  "name": { "en": "Essay" },

  "settings": [
    { "id": "maxWords", "type": "number", "default": 500 },
    {
      "id": "format",
      "type": "enum",
      "options": [
        { "value": "plain", "label": "Plain text" },
        { "value": "rich", "label": "Rich text" }
      ],
      "default": "plain"
    }
  ],

  "interchange": {
    "qti3": {
      "interactionType": "extendedTextInteraction",

      "export": {
        "attributes": {
          "expected-length": "$question.settings.maxWords * 6",
          "format": "$question.settings.format = 'rich' ? 'xhtml' : 'plain'"
        },
        "prompt": "$question.description",
        "responseDeclaration": {
          "cardinality": "'single'",
          "baseType": "'string'"
        }
      },

      "import": {
        "description": "$interaction.prompt",
        "settings": {
          "maxWords": "$round($number($interaction.attributes.`expected-length`) / 6)",
          "format": "$interaction.attributes.format = 'xhtml' ? 'rich' : 'plain'"
        }
      }
    }
  }
}
```

### Ordering

```json title="question-type.json"
{
  "id": "examplary.default.ordering",
  "name": { "en": "Ordering" },

  "settings": [
    { "id": "items", "type": "array" },
    { "id": "shuffleItems", "type": "boolean", "default": true }
  ],

  "interchange": {
    "qti3": {
      "interactionType": "orderInteraction",

      "export": {
        "attributes": {
          "shuffle": "$question.settings.shuffleItems"
        },
        "prompt": "$question.description",
        "choices": {
          "source": "$question.settings.items",
          "identifier": "'item_' & $string($index)",
          "content": "text"
        },
        "responseDeclaration": {
          "cardinality": "'ordered'",
          "baseType": "'identifier'",
          "correctResponse": "$sort($question.settings.items, function($a, $b) { $a.correctPosition - $b.correctPosition }).$map($question.settings.items, function($item, $idx) { $item = $ ? 'item_' & $string($idx) : null })[$ != null]"
        },
        "responseProcessingTemplate": "https://purl.imsglobal.org/spec/qti/v3p0/rptemplates/match_correct.xml"
      },

      "import": {
        "description": "$interaction.prompt",
        "settings": {
          "items": {
            "source": "$interaction.choices",
            "each": {
              "text": "content",
              "correctPosition": "$indexof($interaction.correctResponse, identifier)"
            }
          },
          "shuffleItems": "$boolean($interaction.attributes.shuffle)"
        }
      }
    }
  }
}
```

## Supported interaction types

The following QTI 3.0 interaction types are supported:

| Interaction type          | Description               | Typical use                     |
| ------------------------- | ------------------------- | ------------------------------- |
| `choiceInteraction`       | Single or multiple choice | Multiple choice questions       |
| `extendedTextInteraction` | Long text response        | Essays, open questions          |
| `textEntryInteraction`    | Short text response       | Fill-in-the-blank, short answer |
| `orderInteraction`        | Arrange items in order    | Sequencing, ranking             |
| `matchInteraction`        | Match pairs of items      | Matching exercises              |
| `inlineChoiceInteraction` | Dropdown within text      | Cloze tests                     |
| `hotspotInteraction`      | Click on image regions    | Image-based questions           |
| `gapMatchInteraction`     | Drag items into gaps      | Drag-and-drop fill-in           |
| `sliderInteraction`       | Numeric slider            | Numeric estimation              |
| `uploadInteraction`       | File upload               | Document submissions            |
| `drawingInteraction`      | Freeform drawing          | Diagrams, sketches              |
| `mediaInteraction`        | Audio/video response      | Recording responses             |

## Testing your configuration

To test your interchange configuration:

1. Create a test exam with your custom question type
2. Export the exam to QTI format from the Examplary UI
3. Verify the generated XML matches your expectations
4. Import the exported QTI file into a new exam
5. Verify the questions were reconstructed correctly

:::tip
Use the [JSONata Exerciser](https://try.jsonata.org/) to debug your expressions. Set up your context with `$question` or `$interaction` as a bound variable and test each expression individually.
:::

## Troubleshooting

### Expression returns undefined

Make sure the path exists in your data. Use the conditional operator to provide defaults:

```javascript
$question.settings.shuffleOptions ? $question.settings.shuffleOptions : true;
```

Or use the null coalescing pattern:

```javascript
$question.settings.shuffleOptions != null
  ? $question.settings.shuffleOptions
  : true;
```

### Attribute names with special characters

Wrap attribute names containing hyphens or other special characters in backticks:

```javascript
$interaction.attributes.`max-choices`
$interaction.attributes.`response-identifier`
```

### Array indexing issues

Remember that JSONata arrays are zero-indexed. Use `$index` within array mapping contexts:

```javascript
"choice_" & $string($index); // → "choice_0", "choice_1", ...
```

### Accessing the interaction context inside each expressions

Use `$interaction` to access the full interaction when inside an `each` block:

```javascript
// Inside each expression for options
identifier in $interaction.correctResponse;
```

### Literal strings in expressions

When you want a literal string value (not a property path), wrap it in quotes:

```javascript
"'identifier'"; // Returns the string "identifier"
"'single'"; // Returns the string "single"
```

## Learn more

- [QTI 3.0 Specification](https://www.1edtech.org/standards/qti)
- [JSONata Documentation](https://docs.jsonata.org/)
- [JSONata Exerciser](https://try.jsonata.org/)
- [Importing QTI files](/importing/qti)
