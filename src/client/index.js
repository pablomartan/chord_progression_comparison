import { updateUI } from './js/updateUI'
import { compareChordProg } from './js/app'
import { translateChords, notationMatchesInput } from './js/changeNotation'
import { populateSelector } from './js/chordGen'

import vari from './styles/_variables.scss'
import base from './styles/base.scss'
import header from './styles/header.scss'
import main from './styles/main.scss'
import footer from './styles/footer.scss'
import form from './styles/form.scss'
import homePage from './styles/home-page.scss'

export {
    updateUI,
    compareChordProg,
    translateChords,
    notationMatchesInput,
    populateSelector
}

const titleFirstWord = document.title.split(' ')[0];
console.log(titleFirstWord);

if (titleFirstWord == 'Comparació') {
    const input = document.getElementById('submit');
    input.addEventListener('click', compareChordProg);
} else if (titleFirstWord == 'Generador') {
    window.addEventListener('DOMContentLoaded', populateSelector);
}
