/**
 * @description: sends user input to server and returns the parsed response
 * @param {Event} e: the submit event of the input
 * @returns: a JSON object
 */
const compareChordProg = async (e) => {
    e.preventDefault();
    const baseUrl = window.location.origin;
    const url = baseUrl.match(/martan/) ? `${baseUrl}/acords` : '';

    const notation = Client.getNotation();
    const userProg = document.getElementById('chord-input').value.trim();
    if (Client.notationMatchesInput(notation, userProg) == 0) {
        window.alert('Els acords no estan en la notació que has seleccionat!');
        throw new Error(`Given chords didn't match notation. Notation: ${notation}; Chords ${userProg}`)
    }
    
    let body;
    notation == 'lat-not' ? body = { prog: Client.translateChords(userProg) } : body = { prog: userProg }
    
    const chordProgressions = await fetch(url + '/find', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(result => result.json())
    const foundProgs = JSON.parse(chordProgressions);
    
    if (foundProgs.length < 1) {
        window.alert(`No s'ha trobat cap progressió amb eixos acords...`);
        throw new Error(`No matching progression`);
    } else {
        Client.updateUI(foundProgs);
    }
};

export {
    compareChordProg
}
