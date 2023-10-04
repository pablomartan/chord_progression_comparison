/**
 * @description: show example songs for chord progressions
 * @param {String} prog: the progression
 */
const getExamples = async prog => {
    const body = {'prog': prog};
    const baseUrl = window.location.origin;
    const url = baseUrl.match(/martan/) ? `${baseUrl}/acords` : '';
    
    const songs = await fetch(url + '/songs', {
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
    
    if (document.getElementById('songlist-container') == undefined) {
        const newDiv = document.createElement('div');
        newDiv.id = 'songlist-container';
        const newTitle = document.createElement('h2');
        newTitle.innerText = 'Algunes cançons amb esta progressió';
        const songList = document.createElement('ul');
        songList.id = 'songlist';

        newDiv.appendChild(newTitle);
        newDiv.appendChild(songList);
        document.getElementById('main-container').appendChild(newDiv);
    }

    const songList = document.getElementById('songlist');
    while(songList.children.length > 0) {
        songList.lastChild.remove();
    }
    
    songs.forEach(pair => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="artist">${pair[0]}</span>, <span class="song">${pair[1]}</span>`;
        songList.appendChild(li);
    });
};

export {
    showExamples
}
