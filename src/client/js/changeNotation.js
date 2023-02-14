/*
 * CONSTANTS
 */

// A dictionary to translate from latin notation to american notation
const latToAmDict = {
    'Do': 'C',
    'Re': 'D',
    'Mi': 'E',
    'Fa': 'F',
    'Sol': 'G',
    'La': 'A',
    'Si': 'B',
};

const amToLatDict = () => {
    const map = {}
    for (const key in latToAmDict) {
        const value = latToAmDict[key];
        map[value] = key;
    }
    return map;
};

/**
 * @description: checks if chord notation matches selected option in radio
 * button
 * @param {String} not: the selected notation
 * @param {String} chords: the chords input by the user
 */
const notationMatchesInput = (not, chords) => {
    chords = chords.split(' ');
    let keys;
    if (not == 'lat-not') {
        keys = Object.keys(latToAmDict);
        console.log(keys);
    } else if (not == 'am-not') {
        const dict = amToLatDict();
        keys = Object.keys(dict);
        console.log(keys);
    }
    chords.forEach(chord => {
        const noteName = chord.replace(/([m,d,0-9])/, '');
        if (!keys.includes(noteName)) {
            window.alert('Els acords no estan en la notació que has seleccionat!');
            throw new Error(`Given chords didn't match notation. Notation: ${not}; Chords ${chords}`)
        }
    });
};

/**
 * @description: this function translates chords from latin to american
 * notation 
 * @param {Array} chords: an array of strings, each one is a chord
 */
const latToAm = (chords) => {
    const newNames = chords.map(chord => {
        if (chord.length == 2) {
            return latToAmDict[chord];
        } else if (chord.length > 2 && chord.slice(0, 2) != 'So') {
            return latToAmDict[chord.slice(0, 2)] + chord.slice(2);
        } else {
            return latToAmDict[chord.slice(0, 3)] + chord.slice(3);
        }
    });
    return newNames.join(' ');
};

/**
 * @description: translate chords from american to latin notation
 * @param {Array} chords: an array of strings, each one is a chord
 */
const amToLat = chords => {
    const newNames = chords.map(chord => {
        const dict = amToLatDict();
        return dict[chord.slice(0, 1)] + chord.slice(1);
    });

    return newNames;
};

/**
 * @description: translate chords between latin and american notation
 * @param {String} chords: a string with chords separated by a space
 * @param {Number} opt: latin to american (0; default) or american to latin (1)
 */
const translateChords = (chords, opt) => {
    opt = opt || 0;
    const chordList = chords.split(' ');

    const translated = opt ? amToLat(chordList) : latToAm(chordList);
    return translated;
};

export {
    translateChords,
    notationMatchesInput
}
