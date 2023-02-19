/**
 * @description: create a section to hold the matching chord progressions
 * @param {String} tag: tagname for new element
 * @param {String} id: id for newElement
 * @param {String} classes: list of classes to ad the new element to
 * @returns: HTMLElement with tag <section> and id = 'matching-chord-progs'
 */
const createEl = (tag, id, classes) => {
    const el = document.createElement(tag);
    
    if (id != null) {
        el.id = id;
    }
    
    if (classes != '' && classes.split(' ').length > 0) {
        classes.split(' ').forEach(cl => {
            el.classList.add(cl);
        });
    }
    
    return el;
};

/**
 * @description: puts a given element at the start of it's given parent
 * container
 * @param {HTMLElement} el:
 */
const firstEl = el => {
    const cont = el.parentElement;
    cont.insertBefore(el, cont.firstChild.nextSibling);
};

/**
 * @description: if the progression is found for the first time, it creates a
 * div for it
 * @param {String} prog: the chord progression
 * @param {HTMLElement} progSect: the container for the chord progressions
 */
const handleProg = (prog, progSect) => {
    if (document.getElementById(prog) == null) {
        const progDiv = document.createElement('div');
        progDiv.id = `${prog}`;
        const header = document.createElement('h2');
        header.innerText = `${prog}`;
        progDiv.append(header);
        progSect.insertBefore(progDiv, progSect.firstChild.nextSibling);
        return progDiv;
    }
};

/**
 * @description: in case the progression wasn't already found in that key, it
 * adds it to the list of keys. In either case, it takes that progression to
 * the first place in the section
 * @param {String} key: the key of the progression
 * @param {String} prog: the progression
 */
const handleKey = (key, prog, progSect) => {
    const progs = Array.from(progSect.getElementsByTagName('div'));
    const progDiv = progs.find(el => el.id == prog);
    const keyListHTML = progDiv.getElementsByClassName('key-list');
    let keyList;
  
    if (keyListHTML.length > 0) {
        keyList = keyListHTML[0].innerText.split(', ');
        if (!keyList.includes(key)) {
            keyList.push(key);
            keyList = keyList.join(', ');
            keyListHTML[0].innerText = keyList;
        }
    } else {
        keyList = createEl('div', null, 'key-list');
        keyList.classList.add('key-list');
        keyList.innerText = key;
        progDiv.append(keyList);
    }

    firstEl(progDiv);
};

/**
 * @description: takes a list of dicts {'artist', 'song'} and adds it to a given section
 * @param {Array} songList: the songs to add
 * @param {String} foundProg: the matching progression
 * @param {HTMLElement} section: the section to add the songs to
 */
const handleSongs = (songList, foundProg, section) => {
    const progDiv = document.getElementById(foundProg);
    if (progDiv == null || progDiv.getElementsByClassName('song-list').length == 0) {
        const ul = createEl('ul', null, 'song-list');
        
        songList.forEach(tuple => {
            const li = createEl('li', null, 'song');
            li.innerHTML = `<span class="artist">${tuple['artist']}</span>, <span class="song">${tuple['song']}</span>`;
            ul.appendChild(li);
        });

        section.appendChild(ul);
    }
};

/**
 * @description: takes a list of chord progressions and displays them on the UI
 * @param {Array} progs: the list of chord progressions
 */
const updateUI = progs => {
    const progSect = document.getElementById('matching-chord-progs') || createEl('section', 'matching-chord-progs', '');
    const footer = document.getElementsByTagName('footer')[0];
    
    if (progSect.getElementsByTagName('h2').length == 0) {
        const sectTitle = createEl('h2', null, 'section-title');
        sectTitle.innerText = 'Progressions trobades';
        progSect.appendChild(sectTitle);
    }
    
    progs.forEach(prog => {
        const foundProg = prog['prog'];
        const key = prog['key'];
        const songList = prog['songs'];

        const progDiv = handleProg(foundProg, progSect);
        handleKey(key, foundProg, progSect);
        handleSongs(songList, foundProg, progDiv);
        
    }); 
    
    document.body.insertBefore(progSect, footer);        
};

/**
 * @description: display transported chord progression on the page
 * @param {String} prog: the chord progression
 */
const displayTranspChords = prog => {
    const sect = document.getElementById('gen-chords') || createEl('section', 'gen-chords', 'prog-container');
    const sectDivs = Array.from(sect.getElementsByTagName('div'));

    if (sect.getElementsByTagName('h2').length <= 0) {
        const newTitle = createEl('h2', null, 'section-title');
        newTitle.innerText = 'La teua progressió';
        sect.appendChild(newTitle);
    }
  
    if (sectDivs.length > 0) {
        sectDivs.forEach(div => {
            div.remove();
        });
    }

    const chordProg = createEl('div', null, 'chord-prog');
    chordProg.innerText = prog;
    sect.appendChild(chordProg);

    document.getElementsByTagName('main')[0].appendChild(sect);
};

export {
    updateUI,
    displayTranspChords
}
