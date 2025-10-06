# Moodle importing

Examplary supports importing quizzes from Moodle, using their XML export format.

[Moodle XML format](https://docs.moodle.org/500/en/Moodle_XML_format) is a widely used format for exporting quizzes from Moodle. Examplary can read this format and convert it into its own question types.

This means you can use various other tools to create quizzes, like the [R/Exams](https://www.r-exams.org), and then import them into Examplary.

## Example XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<quiz>
  <question type="shortanswer">
    <name>
      <text>Actinium</text>
    </name>
    <questiontext format="html">
      <text>The symbol for actinium is</text>
    </questiontext>
    <generalfeedback format="html">
      <text></text>
    </generalfeedback>
    <defaultgrade>1.0000000</defaultgrade>
    <penalty>0.1000000</penalty>
    <hidden>0</hidden>
    <usecase>0</usecase>
    <answer fraction="100" format="plain_text">
      <text>Ac</text>
      <feedback format="html">
        <text></text>
      </feedback>
    </answer>
  </question>

<question type="shortanswer">
    <name>
      <text>Calcium</text>
    </name>
    <questiontext format="html">
      <text>The symbol for calcium is</text>
    </questiontext>
    <generalfeedback format="html">
      <text></text>
    </generalfeedback>
    <defaultgrade>1.0000000</defaultgrade>
    <penalty>0.1000000</penalty>
    <hidden>0</hidden>
    <usecase>0</usecase>
    <answer fraction="100" format="plain_text">
      <text>Ca</text>
      <feedback format="html">
        <text></text>
      </feedback>
    </answer>
  </question>
</quiz>
```
