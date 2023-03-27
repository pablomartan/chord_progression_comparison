/**
 * @description: get chord sound file from server
 * @returns: wave sound file
 */
const getChordSample = async () => {
  await fetch('http://localhost:8081/get_sample')
  .then(async res => {
    const oldAudio = document.getElementById('sample');
    
    if (oldAudio != null) {
      document.getElementById('audio-button').remove();
      oldAudio.remove();
    }

    const blob = await res.blob();
    const newFile = new File([blob], 'chords.wav');
    const button = document.createElement('button');
    const cont = document.getElementById('gen-chords');

    button.id = 'audio-button';
    button.innerText = 'Escolta!';
    button.onclick = () => {
      const aud = document.getElementById('sample');
      aud.play();
    };
    cont.appendChild(button);

    const reader = new FileReader();
    reader.onload = function() {
      const str = this.result;
      console.log(str);
      const aud = new Audio(str);
      aud.id = 'sample';
      cont.appendChild(aud);
    };

    reader.readAsDataURL(newFile);
  });
};

/**
 * @description: get selected progression and key, and send it to the server
 * for processing
 */
const transposeProgression = async e => {
    e.preventDefault();

    const selector = document.getElementById('prog-selector');
    const keyInput = document.getElementById('key');
    const bpm = 180;
    const prog = selector.value;
    let key = [keyInput.value];
    const notation = Client.getNotation();

    if (Client.notationMatchesInput(notation, key) == 0) {
    } else if (notation == 'lat-not') {
        key = Client.translateChords(key);
    }

    const body = {
        'prog': prog,
        'key': key,
        'bpm': bpm
    };

    const transposed = await fetch('http://localhost:8081/gen_prog', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(data => data.json())
    
    const chordList = JSON.parse(transposed);

    let chordsInUserNotation;
    if (notation == 'lat-not') {
        chordsInUserNotation = Client.translateChords(chordList, 1).join(' ');
    } else {
        chordsInUserNotation = chordList;
    }

    Client.displayTranspChords(chordsInUserNotation.replace(/\B[M\s]/g, ' '));
    getChordSample();
};

/**
 * @description: populate the selector for chord progressions
 */
const populateSelector = async () => {
    const progDict = await fetch('http://localhost:8081/get_prog')
                    .then(data => data.json());

    const progList = JSON.parse(progDict);

    const selector = document.getElementById('prog-selector');
    progList.forEach(prog => {
        const option = document.createElement('option');
        option.value = prog;
        option.innerText = prog;
        selector.appendChild(option);
    });
  
    Client.showExamples();
};

export {
    populateSelector,
    transposeProgression,
}
