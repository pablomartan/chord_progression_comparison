/**
 * @description: create audio element and button to play the chord progression
 * sample
 */
const addSample = (prog, key) => {
  if (document.getElementById('sample') != null) {
    document.getElementById('sample').remove();
    document.getElementById('sample-button').remove();
  }
  const aud = new Audio(`http://localhost:8081/samples/${key}/${prog.replace(/ /g, '-')}.mp3`)
  aud.id = 'sample';
  const button = document.createElement('button');
  button.id = 'sample-button';
  button.innerText = 'Escolta!';
  button.onclick = aud.play;
  const progCont = document.getElementById('gen-chords');
  progCont.appendChild(aud);
  progCont.appendChild(button);
};

/**
 * @description: get selected progression and key, and send it to the server
 * for processing
 */
const transposeProgression = async e => {
    e.preventDefault();

    const selector = document.getElementById('prog-selector');
    const keyInput = document.getElementById('key');
    const prog = selector.value;
    let key = keyInput.value;
    const notation = Client.getNotation();

    if (Client.notationMatchesInput(notation, key) == 0) {
    } else if (notation == 'lat-not') {
        key = Client.translateChords(key);
    }

    const body = {
        'prog': prog,
        'key': key
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
    .then(chordList => chordList.join(' '))
    
    let chordsInUserNotation;
    if (notation == 'lat-not') {
        chordsInUserNotation = Client.translateChords(transposed, 1).join(' ');
    } else {
        chordsInUserNotation = transposed;
    }
    
    Client.displayTranspChords(chordsInUserNotation.replace(/\B[M\s]/g, ' '));
    addSample(prog, key);
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
};

export {
    populateSelector,
    transposeProgression
}
