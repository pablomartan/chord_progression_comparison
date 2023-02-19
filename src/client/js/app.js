/**
 * @description: sends user input to server and returns the parsed response
 * @param {Event} e: the submit event of the input
 * @returns: a JSON object
 */
const compareChordProg = async (e) => {
    e.preventDefault();

    const notation = Client.getNotation();
    const userProg = document.getElementById('chord-input').value.trim();
    Client.notationMatchesInput(notation, userProg);
    
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
