const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const indexRoutes = require('./routes/indexRoutes');

const app = express();
app.use(express.static(path.resolve('public')));
app.use(bodyParser.json());

app.get("/", function(req, res){
    res.sendFile("/index.html",  {root: __dirname + '/public/'});
});
app.use("/", indexRoutes);

const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
