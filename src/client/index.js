import { updateUI } from './js/updateUI'
import { compareChordProg } from './js/app'
import { translateChords } from './js/changeNotation'

import vari from './styles/_variables.scss'
import base from './styles/base.scss'
import header from './styles/header.scss'
import main from './styles/main.scss'
import footer from './styles/footer.scss'
import form from './styles/form.scss'

export {
    updateUI,
    compareChordProg,
    translateChords
}

const input = document.getElementById('submit');
input.addEventListener('click', compareChordProg);
