# QTI assessment items

Examplary supports importing QTI 2 and 3 XML and ZIP files.

[QTI (Question and Test Interoperability)](https://www.1edtech.org/standards/qti) is a standard format for representing assessment content and results, developed by IMS Global Learning Consortium. Examplary can read QTI files and convert them into its own question types.

## Example XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<qti-assessment-item xmlns="http://www.imsglobal.org/xsd/imsqtiasi_v3p0"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsglobal.org/xsd/imsqtiasi_v3p0
  https://purl.imsglobal.org/spec/qti/v3p0/schema/xsd/imsqti_asiv3p0p1_v1p0.xsd"
  identifier="choice_multiple_001"
  title="Water Composition"
  adaptive="false"
  time-dependent="false"
  xml:lang="en">
  
  <qti-response-declaration identifier="RESPONSE" cardinality="multiple" base-type="identifier">
    <qti-correct-response>
      <qti-value>H</qti-value>
      <qti-value>O</qti-value>
    </qti-correct-response>
  </qti-response-declaration>
  
  <qti-outcome-declaration identifier="SCORE" cardinality="single" base-type="float" normal-maximum="2.0"/>
  
  <qti-item-body>
    <p>Water is formed from which chemical elements?</p>
    <qti-choice-interaction response-identifier="RESPONSE" max-choices="2" shuffle="false">
      <qti-prompt>Select all that apply:</qti-prompt>
      <qti-simple-choice identifier="H">Hydrogen</qti-simple-choice>
      <qti-simple-choice identifier="O">Oxygen</qti-simple-choice>
      <qti-simple-choice identifier="N">Nitrogen</qti-simple-choice>
      <qti-simple-choice identifier="C">Carbon</qti-simple-choice>
    </qti-choice-interaction>
  </qti-item-body>
  
  <qti-response-processing template="https://purl.imsglobal.org/spec/qti/v3p0/rptemplates/match_correct"/>
</qti-assessment-item>
```
