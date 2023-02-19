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
    populateSelector
}
