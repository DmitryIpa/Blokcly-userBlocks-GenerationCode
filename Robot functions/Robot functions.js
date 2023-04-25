//<category name="Variables" colour="#a55b80" custom="VARIABLE"></category>

/* С каждым подключаемым пакетом разработчиком Прописывается метод для конфигурации js-интерпретатора. Во время
конфигурации js-интерпретатора регистрируется код, который генерируется для пользовательски блоков */

//Код для отображения блоков в редакторе
Blockly.Blocks['forward'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("Number")
        .appendField("Forward");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['backward'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("Number")
        .appendField(new Blockly.FieldLabelSerializable("Backward"), "NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['connector'] = {
  init: function() {
    this.appendStatementInput("name")
        .setCheck(null)
        .appendField(new Blockly.FieldDropdown([["send","send"], ["give","give"]]), "function");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['jsonkey'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("default"), "NAME");
    this.appendValueInput("NAME")
        .setCheck(null)
        .appendField("next:");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['getdata'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("set timer to:")
        .appendField(new Blockly.FieldNumber(0), "timer");
    this.appendValueInput("NAME")
        .setCheck(null)
        .appendField("package:");
    this.appendStatementInput("NAME")
        .setCheck(null)
        .appendField("get data:");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['get_request'] = {
  init: function() {
    this.appendValueInput("varName")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("variable:");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("set timer:")
        .appendField(new Blockly.FieldNumber(0), "timer");
    this.appendStatementInput("data")
        .setCheck(null)
        .appendField("get data:");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['usersetblock'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("set")
        .appendField(new Blockly.FieldVariable("item"), "NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

// Код для генератора js-кода

Blockly.JavaScript['forward'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  var code = '{"value": "' + "Forward:" + value_name + '"' + '},';
  return code;
};

Blockly.JavaScript['backward'] = function(block) {
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);

  var code = '{"value": "' + "Backward:" + value_name + '"' + '},';
  return code;
};

Blockly.JavaScript['connector'] = function(block) {
    var dropdown_function = block.getFieldValue('function');
    var statements_name = Blockly.JavaScript.statementToCode(block, 'name');
    var code = 'var xmlhttp = new XMLHttpRequest();\n';
    switch(dropdown_function)
    {
    case "send":
        code += 'let jsonData = JSON.stringify({ "commandList": [' + statements_name + ']});\n';
        code += 'xmlhttp.open("POST", "/user_editor/post-endpoint", true);\n' + 'xmlhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");\n';
        code += 'xmlhttp.send(jsonData);\n';
        break;
    case "give":
        code += 'xmlhttp.open("GET", "/usr_editor/get-endpoint", true);\n' + 'xmlhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");\n';
        code += 'xmlhttp.send();\n';
        break;
    }
    code += "xmlhttp.onload = function() {\nwindow.alert('No Panic');\nwindow.alert(xmlhttp.responseText);\n};\n";
    code += "xmlhttp.onerror = function() {\nwindow.alert('Request failed.  Returned status of ' + xmlhttp.status + ', response text: ' + xmlhttp.responseText);\n};\n";
    return code;
};

Blockly.JavaScript['jsonkey'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  var code = '...';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['getdata'] = function(block) {
  var number_timer = block.getFieldValue('timer');
  var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['get_request'] = function(block) {
    var value_varname = Blockly.JavaScript.valueToCode(block, 'varName', Blockly.JavaScript.ORDER_ATOMIC);
    var number_timer = block.getFieldValue('timer');
    var statements_data = Blockly.JavaScript.statementToCode(block, 'data');
    var code = value_varname + ' = new XMLHttpRequest();\n';
    code += value_varname + '.open("GET", "/usr_editor/get-endpoint", true);\n';
    code += value_varname + '.setRequestHeader("Content-type", "application/json; charset=utf-8");\n';
    code += value_varname + '.send();\n';
    code += value_varname + '.onload = function() {\nlet obj = JSON.parse(' + value_varname + '.responseText);\nvar arr = []; var count = 0;\nfor (key in obj) {\n';
    code += 'if (obj.hasOwnProperty(key)) {\narr[count] = obj[key];\n\t}\ncount += 1;\n}\n';
    var splitStr = statements_data.split(';');
    try {
        for (let i = 0; i < splitStr.length - 1; i++) {
            code += splitStr[i] + '= arr[' + i +'];\n'
        }
    } catch (err) {code += 'window.alert("Количество получаемых данных не совпадает с количеством указанных!");'}
    for (let i = 0; i < splitStr.length - 1; i++) {
        code += 'window.alert(' + splitStr[i] + ');\n';
    }
    code += 'window.alert(\'No Panic\');\n}';
    return code;
};

Blockly.JavaScript['usersetblock'] = function(block) {
    //var variable_name = Blockly.JavaScript.nameDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
    var variable_name = Blockly.JavaScript.nameDB_.getName(block.getFieldValue('NAME'), Blockly.Names.NameType.VARIABLE);
    var code = variable_name + ';';
    return code;
};
