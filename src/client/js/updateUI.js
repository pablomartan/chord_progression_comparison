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
 * @description: creates a title for the matching progressions section
 * @param {HTMLElement} sect: the section to create the title for
 */
const createSectTitle = sect => {
    if (sect.getElementsByTagName('h2').length <= 0) {
        const sectTitle = document.createElement('h2');
        sectTitle.innerText = 'Progressions trobades';
        sectTitle.classList.add('section-title');
        progSect.appendChild(sectTitle);
    }
};

/**
 * @description: takes a list of chord progressions and displays them on the UI
 * @param {Array} progs: the list of chord progressions
 */
const updateUI = progs => {
    const progSect = document.getElementById('matching-chord-progs') || createSection();
    const footer = document.getElementsByTagName('footer')[0];
    
    createSectTitle(progSect);
    
    progs.forEach(prog => {
        const foundProg = prog['prog'];
        const key = prog['key'];
        const songList = prog['songs'];

        handleProg(prog);
        handleKey(key, foundProg);
        handleSongs(songList, foundProg);
        
    }); 
    
    document.body.insertBefore(progSect, footer);        
};

export {
    updateUI
}
