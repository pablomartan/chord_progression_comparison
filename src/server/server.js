const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const spawn = require('node:child_process');

const port = 8081;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('/dist'));

app.listen(port, () => {
    console.log('Running on port ' + port);
});
