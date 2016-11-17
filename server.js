var express = require('express');
var app     = express();
var bodyParser = require('body-parser');
var _ = require('underscore');

app.use(bodyParser.json());
// pretty print
app.set("json spaces", 4);

// app listen port
var port = 3500;

// ------------ helper functions ------------

// this function will send <data> as JSON and increase calls <limit> by 1
function sendBody(req, res, data, limit) {
    res.set({"X-Kong-Limit": limit });
    console.log("Sending data: " + JSON.stringify(data));
    res.json(data);
}

// ------------ public API --------------
// 3 GET requests

app.get("/", function(req,res) {
  console.log('** / requested');
  console.log(JSON.stringify(req.headers));
  console.log(JSON.stringify(req.params));
  console.log(JSON.stringify(req.query));
     res.json('{"ok": true}\n');
});

app.get("/testing/accounts/profile", function(req, res) {
    var data = {

        "UserId": "22c2a3c9-e976-49dd-9278-0e8b3a9193e2",
    "PhoneNumber": "0967478085",
    "FullName": "NGUYỄN TRƯỜNG SƠN",
    "CUID": "4935925",
    "IdNumber": "381455002",
    "ContractNumber": "3689673526",
    "Address": "X. Đất Mới, H. Năm Căn, Cà Mau",
    "Gender": "M",
    "GenderText": "Male",
    "TicketCount": 0,
    "NotificationCount": 0,
    "Settings": [
{
    "DeviceId": "Default",
    "Active": true,
    "PushNotificationConsent": true
}
]
};
sendBody(req, res, data, "testing=1");
});


app.listen(port);
console.log("Listening on port: " + port);
