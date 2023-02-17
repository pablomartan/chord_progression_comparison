import { updateUI } from './js/updateUI'
import { compareChordProg } from './js/app'
import { translateChords, notationMatchesInput } from './js/changeNotation'

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
    notationMatchesInput
}

if (typeof(document.getElementsByName('notation-selector')).length > 0) {
    const input = document.getElementById('submit');
    input.addEventListener('click', compareChordProg);
}
