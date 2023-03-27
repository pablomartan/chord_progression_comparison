const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { spawn } = require('node:child_process');

const port = 8081;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'));

let wavPath;

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

app.get('/get_prog', (req, res) => {
    const progList = spawn('python3', ['src/server/prog_list.py']);

    progList.stderr.on('data', data => {
        console.log('Error: ' + data.toString());
    });

    progList.stdout.on('data', data => {
        const parsedData = data.toString();
        res.send(JSON.stringify(parsedData));
    });
});

app.post('/gen_prog', (req, res) => {
    const generateProgression = spawn('python3', ['src/server/gen_prog.py', JSON.stringify(req.body)])

    generateProgression.stderr.on('data', data => {
        console.log('Error: ' + data.toString());
    });
    
    generateProgression.stdout.on('data', data => {
      const prog = data.toString();
      const generateSounds = spawn('python3', ['src/server/chords_to_sound.py', prog, req.body.bpm])

        generateSounds.stderr.on('data', data => {
          console.log('Error: ' + data.toString());
        });

      generateSounds.stdout.on('data', data => {
        wavPath = data.toString().replace(/\n/, '').trim();
        res.send(JSON.stringify(prog));
      });
    });
    
});

app.get('/get_sample', (req, res) => {
  res.sendFile(wavPath, null, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Sent ' + wavPath);
    }
  });
});

app.post('/songs', (req, res) => {
    const songs = spawn('python3', ['src/server/get_songs.py', req.body.prog]);

    songs.stderr.on('data', data => {
        console.log('Error: ' + data.toString());
    });

    songs.stdout.on('data', data => {
        const parsed = data.toString();
        res.send(JSON.stringify(parsed));
    });
});

app.get('/', (req, res) => {
    res.sendFile('dist/index.html');
});

app.get('/prog_analyzer', (req, res) => {
    res.sendFile('dist/prog_analyzer.html');
});

app.get('/prog_generator', (req, res) => {
    res.sendFile('dist/prog_generator.html');
});

app.listen(port, () => {
    console.log('Running on port ' + port);
});
