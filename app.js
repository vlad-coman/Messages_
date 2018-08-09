const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('index.html');
});

let data = [];

app.get("/messages", function(req, res) {
    if (req.query.lastindex < data.length) {
        data = data.slice(data.length - req.query.lastindex, data.length)
    }
    res.json(data);

})

app.post("/messages", function(req, res) {
    let newMessage = {
        index: data.length + 1,
        sender: req.body.sender,
        message: req.body.message
    }
    data.push(newMessage);
    res.json(newMessage);
})


app.listen(3000, function() {
    console.log("server started");
})