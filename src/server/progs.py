import mingus.core.scales as scales
import mingus.core.chords as chords
import mingus.core.progressions as progs
import json
import sys
import prog_dict

chord_progs = prog_dict.chord_progs


def chromatic_scale():
    """
    This function returns the chromatic scale starting with C and including
    its enharmonics
    """
    ascending_chrom = scales.Chromatic("C").ascending()
    descending_chrom = scales.Chromatic("C").descending()
    chrom = []

    for note in ascending_chrom:
        if note not in chrom:
            chrom.append(note)

    for note in descending_chrom:
        if note not in chrom:
            chrom.append(note)

    return chrom


def prog_to_funct(prog):
    """
    Consumes a chord progression written in an unknown key and turns it into
    functional notation (I, V...) in all twelve keys, plus four enharmonics
    """

    triads, prog_chromatic = [], {}
    chromatic = chromatic_scale()

    for chord in prog:
        triads.append(chords.from_shorthand(chord))

    for note in chromatic:
        prog_chromatic[note] = []
        for chord in triads:
            prog_chromatic[note].append(progs.determine(chord, note, True))

    return prog_chromatic


def prog_to_string(prog):
    """
    Consumes a list of lists of strings (chord progression) and returns a
    single list of strings
    """
    p = []
    for chord in prog:
        p.append(chord[0])

    return p


def check_user_progs(user_prog):
    """
    Consumes a dictionary with this structure {MUSIC_KEY: [CHORD_PROGRESSION]},
    with the user chord progression in functional notation for every key in the
    C chromatic scale. It then checks for every chord progression and tries to
    find it on the 'popular' chord progressions dictionary declared above
    """
    found_progs = {}

    progs = [prog.split() for prog in chord_progs.keys()]

    for prog in progs:
        for key in user_prog:
            to_string = prog_to_string(user_prog[key])
            if prog == to_string:
                if to_string not in found_progs.values():
                    found_progs[key] = to_string

    return found_progs


def songs_to_dict(list_of_songs):
    """
    Consumes a list of songs, represented as a tuple of (ARTIST, SONG) and
    returns a list of dicts with a structure of {'artist': ARTIST,
    'song': SONG}
    """
    new_list = []

    for song in list_of_songs:
        new_list.append({'artist': song[0], 'song': song[1]})

    return new_list


def prepare_output(prog_dict):
    """
    Consumes a dictionary with a chord progression for each key in which it
    found one: { MUSIC_KEY: [CHORD PROGRESSION] }
    """
    output = []
    for key in prog_dict:
        prog = ' '.join(prog_dict[key])
        item = {}
        item['key'] = key
        item['prog'] = prog
        item['songs'] = songs_to_dict(chord_progs[prog])
        output.append(item)

    return output


user_args = sys.argv[1]
output = prepare_output(check_user_progs(prog_to_funct(user_args.split())))
print(json.dumps(output))
