var express = require('express');
var moment = require('moment');
var app = express();

//app.set('views', __dirname + '/views');

app.use('/', express.static(__dirname + '/public'));

app.get('/:date', function (req, res) {
  var numbers = /^[0-9]+$/;
  var date1 = req.params.date;
  var valid;
  if(date1.match(numbers)) {
    valid = moment(date1).isValid();
  } else {
    valid = (new Date(date1)).getTime() > 0;
  }
  
  var unixDate = null;
  var naturalDate = null;
  if(valid == true) {
    if(date1.match(numbers)) {
      unixDate = date1;
    } else {
      unixDate = moment(date1).format('X');
    }
    if(date1.match(numbers)) {
      var m = moment(new Date("Jan-01-1970"));
      m.add(date1,'s');
      naturalDate = m.format("MMMM D, YYYY");
    } else {
      naturalDate = moment(new Date(date1)).format("MMMM D, YYYY");
    }
    var retObj = {
      unix:unixDate,
      natural:naturalDate
    };
    res.send(retObj);
  } else {
    var retObj = {
      unix:null,
      natural:null
    };
    res.send(retObj);
  }
});

app.listen(process.env.PORT || 8080, function () {
  console.log('Example app listening on port 8080!');
});
