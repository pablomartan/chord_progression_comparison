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
    const progSect = document.getElementById('matching-chord-progs') || createSection();
    const footerCollect = document.getElementsByTagName('footer');
    const footer = footerCollect[0];
    
    if (document.getElementsByClassName('section-title').length <= 0 ) {
        const sectTitle = document.createElement('h3');
        sectTitle.innerText = 'Matching chord progressions:'
        sectTitle.classList.add('section-title');
        progSect.appendChild(sectTitle);
    }
        
    progs.forEach(prog => {
        const p = document.createElement('p');
        p.classList.add('matching-chord-progression');
        p.innerText = prog.toString();
        progSect.appendChild(p);
    });

    document.body.insertBefore(progSect, footer);        
};

export {
    updateUI
}
