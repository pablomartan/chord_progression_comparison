/**
 * @description: show example songs for chord progressions
 * @param {String} prog: the progression
 */
const getExamples = async prog => {
    const body = {'prog': prog};
    
    const songs = await fetch('http://localhost:8081/songs', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(data => data.json())

    return JSON.parse(songs);
};

/**
 * @description: shows the examples on the UI
 * @param {Event} e: the click event
 */
const showExamples = async e => {
    e.preventDefault();
    const prog = e.srcElement.value;
    const songs = await getExamples(prog);
    
    const newDiv = document.createElement('div');
    newDiv.id = 'songlist-container';
    const newTitle = document.createElement('h2');
    newTitle.innerText = 'Algunes cançons amb esta progressió';
    const songList = document.createElement('ul');
    songList.id = 'songlist';
    songs.forEach(pair => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="artist">${pair[0]}</span>, <span class="song">${pair[1]}</span>`;
        songList.appendChild(li);
    });

    newDiv.appendChild(newTitle);
    newDiv.appendChild(songList);
    document.getElementById('main-container').appendChild(newDiv);
};

export {
    showExamples
}
