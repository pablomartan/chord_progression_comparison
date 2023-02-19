/**
 * @description: get selected progression and key, and send it to the server
 * for processing
 */
const transposeProgression = () => {
    const selector = document.getElementById('prog-selector');
    const keyInput = document.getElementById('key');
    const prog = selector.value;
    const key = keyInput.value;
    const body = {
        'prog': prog,
        'key': key
    };

    const transposedProgression = fetch('http://localhost:8081/gen_prog', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            .then(async data => await data.json())

    console.log(transposedProgression);
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
