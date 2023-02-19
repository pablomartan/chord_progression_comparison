/**
 * @description: sends user input to server and returns the parsed response
 * @param {Event} e: the submit event of the input
 * @returns: a JSON object
 */
const compareChordProg = async (e) => {
    e.preventDefault();

    const notation = Client.getNotation();
    const userProg = document.getElementById('chord-input').value.trim();
    if (!Client.notationMatchesInput(notation, userProg)) {
        window.alert('Els acords no estan en la notació que has seleccionat!');
        throw new Error(`Given chords didn't match notation. Notation: ${not}; Chords ${chords}`)
    }
    
    let body;
    notation == 'lat-not' ? body = { prog: Client.translateChords(userProg) } : body = { prog: userProg }
    
    const chordProgressions = await fetch('http://localhost:8081/find', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(result => result.json())
    
    Client.updateUI(JSON.parse(chordProgressions));
};

export {
    compareChordProg
}
