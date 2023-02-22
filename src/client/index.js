import { updateUI, displayTranspChords } from './js/updateUI'
import { compareChordProg } from './js/app'
import { getNotation, translateChords, notationMatchesInput } from './js/changeNotation'
import { populateSelector, transposeProgression } from './js/chordGen'
import { showExamples } from './js/showExamples'

import vari from './styles/_variables.scss'
import base from './styles/base.scss'
import header from './styles/header.scss'
import main from './styles/main.scss'
import footer from './styles/footer.scss'
import form from './styles/form.scss'
import homePage from './styles/home-page.scss'

export {
    updateUI,
    displayTranspChords,
    compareChordProg,
    getNotation,
    translateChords,
    notationMatchesInput,
    populateSelector,
    transposeProgression,
    showExamples
}

const titleFirstWord = document.title.split(' ')[0];

if (titleFirstWord == 'Comparació') {
    const input = document.getElementById('submit');
    input.addEventListener('click', compareChordProg);
} else if (titleFirstWord == 'Generador') {
    const submit = document.getElementById('submit');
    const select = document.getElementById('prog-selector');
    submit.addEventListener('click', transposeProgression);
    select.addEventListener('click', showExamples);
    window.addEventListener('DOMContentLoaded', populateSelector);
}
