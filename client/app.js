

var submit = document.getElementById('submit');
var text = document.getElementById('json').value;
submit.onclick = (event) => {
 $.ajax({
   type: 'POST',
   url: 'csv',
   contentType: 'application/json',
   data: text
 })
}