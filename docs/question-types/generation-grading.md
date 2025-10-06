---
sidebar_label: Generation & grading
sidebar_position: 4
---

# AI generation and grading

The Examplary platform supports AI-assisted question generation and grading for custom question types. You can enable these features by configuring the `generation` and `grading` options in your question type's metadata.

## AI question generation

The `generation` field is an object that defines the settings for AI-assisted question generation. You can enable or disable this feature, and provide any additional instructions for the AI.

The instructions can help guide the AI how to generate appropriate question settings for your question type.

```json title="question-type.json (partial)"
{
  "generation": {
    "enabled": true,
    "instructions": "Requires an `options` setting with an array of strings that will be used as multiple choice options. The `correctAnswer` setting should be one of these options, and exactly match one of the strings."
  }
}
```

## Correct answer based grading

For simple question types that have a clearly defined correct answer, you can set the `correctAnswer` setting in the question settings. When a user submits an answer, it will be automatically graded as correct or incorrect based on this value.

The platform will convert the user's answer to a string (for example, by joining arrays with commas) and compare it to the `correctAnswer`, which is also converted to a string. If they match exactly, the answer will be marked as correct. Whitespace at the start or end of the answer is ignored, but otherwise the comparison is exact.

## AI assisted grading suggestions

The `grading` field is an object that defines the settings for AI-assisted grading. You can enable or disable this feature, and provide any additional instructions for the AI.

If enabled, the platform can use AI to suggest points and feedback for the user's answer based on the provided instructions. This can be particularly useful for open-ended questions where there isn't a single correct answer. The teacher can review and adjust the AI's suggestions before finalizing the grade.

```json title="question-type.json (partial)"
{
  "grading": {
    "enabled": true,
    "instructions": "Grade the answer based on the provided rubric."
  }
}
```
