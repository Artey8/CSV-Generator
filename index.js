var express = require('express');
var toCSV = require('./convertJSON.js').toCSV;
var app = express();
var port = 8000;
var bodyParser = require('body-parser');

app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: false }))

//when using express, use bodyparser to attach a body to the request
app.post('/csv', (req, res) => {
  debugger;
  console.log(req.body.json)
  res.statusCode = 200;
  //console.log(req.query.json)
  toCSV(req.body.json, (csv) => {
    render(csv, (html) => {
      res.send(html);
    })
  });
  //console.log(csv);
  //console.log(req.body);
  //res.send();
});
var allRows = [];
var render = (csv, cb) => {
  var splitCSV = csv.split('\r\n');
  var result = '';
  for (var i = 0; i < splitCSV.length; i++) {
    var row = `<div>${splitCSV[i]}</div>`;
    allRows.push(row);
  }
  allRows.push(`<div>==========================================================================================</div>`)
  for (var j = 0; j < allRows.length; j++) {
    result += allRows[j];
  }
  var body = ' <h1>CSV Report Generator</h1><h1>{"test": "test"}</h1><form method="POST" action="/csv"><label>JSON</label><input type="text" id="json" name="json"><br><input type="submit" value="submit"></form>';
  result += body;
  cb(result);
}

app.listen(port, 'localhost');

/* The server must flatten the JSON hierarchy, mapping each item/object in the JSON to a single line of CSV report (see included sample output), where the keys of the JSON objects will be the columns of the CSV report.
You may assume the JSON data has a regular structure and hierarchy (see included sample file). In other words, all sibling records at a particular level of the hierarchy will have the same set of properties, but child objects might not contain the same properties. In all cases, every property you encounter must be present in the final CSV output.
You may also assume that child records in the JSON will always be in a property called `childrenfdsadsdsa`.*/
