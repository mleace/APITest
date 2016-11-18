var express = require('express');
var app     = express();
var bodyParser = require('body-parser');
var _ = require('underscore');

app.use(bodyParser.json());
// pretty print
app.set("json spaces", 4);

// app listen port
var port = 3500;

// stored data - just an example!
var accounts = [
{
      "name": {
        "honourBeforeName": "Ing.",
        "honourAfterName": "PhD.",
        "firstName": "John",
        "middleNames": [
          "Peter",
          "Frank"
        ],
        "lastName": "Doe"
      },
      "salutation": "Mr.",
      "vocative": "John",
      "isAdult": true,
"age": 25
    },
    {
      "name": {
        "honourBeforeName": "MSc.",
        "firstName": "Peter",
        "middleNames": [
          "Frank"
        ],
        "lastName": "Xaverius"
      },
      "salutation": "Mr.",
      "vocative": "Peter",
      "isAdult": true,
"age": 20
    },
    {
      "name": {
        "firstName": "Jain",
        "middleNames": [
          "Xi"
        ],
        "lastName": "Li"
      },
      "salutation": "Mrs.",
      "vocative": "Jain Xi",
      "isAdult": true,
"age": 23
    },
    {
      "name": {
        "honourAfterName": "Sc.",
        "firstName": "Mirek",
        "middleNames": [
        ],
        "lastName": "Liliput"
      },
      "salutation": "Mr.",
      "vocative": "Mirek",
      "isAdult": true,
"age": 30
    }
];

// ------------ helper functions ------------

// this function will send <data> as JSON and increase calls <limit> by 1
function sendBody(req, res, data, limit) {
    res.set({"X-Rate-Limit": limit });
    console.log("Sending data: " + JSON.stringify(data));
    res.json(data);
}

// ------------ public API --------------
//
app.post("/testing/accounts/:id", function (req, res) {
    var accId = req.params.id;
    console.log(JSON.stringify(req.body));
    if (accId && accounts[accId]) {
        sendBody(req, res, req.body, "testing=1");
    } else {
        res.status(404).json(
            { "errors": [
                    {
                        "code": "OBJECT_NOT_FOUND",
                        "message": "Cannot find specified account",
                        "severity":"ERROR"
                    }
                ]
            }
            );
    }
});

app.get("/testing/accounts/:id", function(req, res) {
    var accId = req.params.id;
    if (accId && accounts[accId]) {
        sendBody(req, res, accounts[accId], "testing=1");
    } else {
        res.status(404).json(
            { "errors": [
                    {
                        "code": "OBJECT_NOT_FOUND",
                        "message": "Cannot find specified account",
                        "severity":"ERROR"
                    }
                ]
            }
            );
    }
});

app.get("/testing/accounts", function(req, res) {
    sendBody(req, res, {"data": accounts}, "testing=1");
});

app.listen(port);
console.log("Listening on port: " + port);
