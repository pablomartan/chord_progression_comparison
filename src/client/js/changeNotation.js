/*
 * CONSTANTS
 */

// A dictionary to translate from latin notation to american notation
const latToAm = {
    'Do': 'C',
    'Re': 'D',
    'Mi': 'E',
    'Fa': 'F',
    'Sol': 'G',
    'La': 'A',
    'Si': 'B',
};

/**
 * @description: this function translates chords from latin to american
 * notation //TODO: add translation from american to latin
 * @param {String} chords: a string with chords separated by a space
 */
const translateChords = (chords) => {
    const chordList = chords.split(' ');
    const newNames = chordList.map(chord => {
        if (chord.length == 2) {
            return latToAm[chord];
        } else if (chord.length > 2 && chord.slice(0, 2) != 'So') {
            return latToAm[chord.slice(0, 2)] + chord.slice(2);
        } else {
            return latToAm[chord.slice(0, 3)] + chord.slice(3);
        }
    });
    console.log(newNames.join(' '));
    return newNames.join(' ');
};

export {
    translateChords
}
