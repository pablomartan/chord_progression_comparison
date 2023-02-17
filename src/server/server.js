const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { spawn } = require('node:child_process');

const port = 8081;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('/dist'));

app.post('/find', (req, res) => {
    const result = spawn('python3', ['src/server/progs.py', req.body.prog]);
   
    result.stderr.on('data', data => {
        console.log('Error: ' + data.toString());
    });
    
    result.stdout.on('data', data => {
        const parsedData = data.toString();
        res.send(JSON.stringify(parsedData));
    });
});

app.get('/gen_prog', (req, res) => {
    const progList = spawn('python3', ['src/server/prog_list.py']);

    progList.stderr.on('data', data => {
        console.log('Error: ' + data.toString());
    });

    progList.stdout.on('data', data => {
        const parsedData = data.toString();
        res.send(JSON.stringify(parsedData));
    });
});

app.listen(port, () => {
    console.log('Running on port ' + port);
});
