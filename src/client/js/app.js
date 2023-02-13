/**
 * @description: sends user input to server and returns the parsed response
 * @param {Event} e: the submit event of the input
 * @returns: a JSON object
 */
const compareChordProg = async (e) => {
    e.preventDefault();
    const notation = document.getElementById('notation-selector').value;
    const userProg = document.getElementById('chord-input').value.trim();
    let body;

    notation != 'am-not' ? body = { prog: Client.translateChords(userProg) } : body = userProg;

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
