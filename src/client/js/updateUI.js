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
    const footer = document.getElementsByTagName('footer')[0];
    
    document.body.insertBefore(progSect, footer);        
};

export {
    updateUI
}
