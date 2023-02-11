/**
 * @description: create a section to hold the matching chord progressions
 * @returns: HTMLElement with tag <section> and id = 'matching-chord-progs'
 */
const createSection = () => {
    const newSect = document.createElement('section');
    newSect.id = 'matching-chord-progs';
    
    return newSect;
};

/**
 * @description: takes a list of chord progressions and displays them on the UI
 * @param {Array} progs: the list of chord progressions
 */
const updateUI = progs => {
    console.log(progs);
    const progSect = document.getElementById('matching-chord-progs') || createSection();
    const footerCollect = document.getElementsByTagName('footer');
    const footer = footerCollect[0];
    
    if (document.getElementsByClassName('section-title').length <= 0 ) {
        const sectTitle = document.createElement('h2');
        sectTitle.innerText = 'Progressions trobades';
        sectTitle.classList.add('section-title');
        progSect.appendChild(sectTitle);
    }
        
    progs.forEach(prog => {
        /*
         * prog is a dictionary with 'prog' key (the chord
         * progression) and a 'songs' key, a list of
         * dictionaries with keys 'artist' and 'song', each of which is a
         * string
         */
        const chordProgDiv = document.createElement('div');
        chordProgDiv.classList.add('matching-chord-progression');
        const newTitle = document.createElement('h3')
        newTitle.innerText = prog['prog'];
        const songListTitle = document.createElement('h4');
        songListTitle.innerText = 'Algunes cançons que usen esta progressió:';
        chordProgDiv.appendChild(newTitle);
        chordProgDiv.appendChild(songListTitle);
        
        const songList = prog['songs'];
        const listToAppend = document.createElement('ul');
        
        songList.forEach(songTuple => {
            // each song is a dictionary with keys 'artist' and 'song', the
            // values of which are strings
            const li = document.createElement('li');
            const artist = songTuple['artist'];
            const song = songTuple['song'];
            li.innerHTML = `<span class="artist">${artist}</span>, <span class="song">${song}</span>`;
            listToAppend.appendChild(li);
        });
        chordProgDiv.appendChild(listToAppend);
        progSect.appendChild(chordProgDiv);
    });
    
    document.body.insertBefore(progSect, footer);        
};

export {
    updateUI
}
