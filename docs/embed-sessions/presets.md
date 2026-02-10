---
sidebar_label: Presets
sidebar_position: 3
---

# Presets

Presets allow you to pre-configure certain options for the embed session, so that when your users open the embed, they see a tailored experience.

None of these fields are required. If you do not provide any presets, the user will see the default options when they open the embed session.

## Flow `generate-exam` presets

| Key                              | Type     | Description                                                                            |
| -------------------------------- | -------- | -------------------------------------------------------------------------------------- |
| `name`                           | string   | The name of the exam. Plain text.                                                      |
| `subject`                        | string   | The subject of the exam. Plain text.                                                   |
| `studentLevel`                   | string   | The difficulty level of the exam. Expects a student level ID from `/student-levels`.   |
| `intendedDuration`               | integer  | The intended duration of the exam in minutes (in 15 minute increments).                |
| `taxonomyId`                     | string   | The ID of the taxonomy to use for the exam, from `/taxonomies`.                        |
| `language`                       | string   | The language code for the exam (e.g. "en" for English). Defaults to the user's locale. |
| `sourceMaterialIds`              | string[] | An array of source material IDs to pre-select for the exam.                            |
| `allowedGenerationQuestionTypes` | string[] | An array of question type IDs to limit the question generation options to.             |
| `context`                        | string   | Additional context or instructions for the exam generation. Plain text.                |

Example of all presets specified:

```json title="POST /embed-sessions"
{
  "presets": {
    "name": "Midterm Exam - Algebra",
    "subject": "Mathematics",
    "studentLevel": "us_high_school_lower",
    "intendedDuration": 60,
    "taxonomyId": "taxonomy_bloom_revised",
    "language": "en",
    "sourceMaterialIds": ["material_123567890", "material_4564543435443"],
    "context": "Focus on algebraic expressions and equations.",
    "allowedGenerationQuestionTypes": [
      "multiple-choice-single-answer",
      "single-line-text"
    ]
  }
}
```

## Flow `edit-rubric` presets

| Key              | Type    | Description                                                                                                                                                                                                                         |
| ---------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `showDoneButton` | boolean | Whether to show a "Done" button in the UI that allows users to indicate they are done editing the rubric. Defaults to `true`.                                                                                                       |
| `rubric`         | object  | An object representing a rubric to pre-load in the editor. Should follow the same structure as the `rubric` field in the API response of the rubric editor flow. [JSON schema](https://schemas.examplary.ai/question-scoring.json). |
