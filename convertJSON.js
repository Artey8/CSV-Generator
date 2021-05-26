module.exports.toCSV = (input, cb) => {
  input = JSON.parse(input);
  debugger;
    //handle the parent seperate from the children
    //write a recurive function for parsing this correctly
    //delare a result string
    var result = ''
    //RECURSIVE FUNCTION
    var innerFunc = (jsonObj) => {
    //declare a line 1 and a line 2 var
    var line1 = '';
    var line2 = '';
    //iterate through the test data
    for (var k in jsonObj) {
    //if has children
    if (k === 'children') {
    //invoke the function on the children

    for (var i = 0; i < jsonObj[k].length; i++) {
        innerFunc(jsonObj[k][i]);
    }
    //otherwise return
    } else {
    //populate line 1 with the keys
    line1 += k + ','
    //populate line 2 with the values
    line2 += jsonObj[k] + ','
    //combine them with a line end
    }
    }
    if (result.length === 0) {
      result += line1 + '\r\n' + line2;
    } else {
      result += '\r\n' + line2
    }
    }
    innerFunc(input);
    console.log(result);
    cb(result);
};


