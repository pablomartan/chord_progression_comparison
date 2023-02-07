import mingus.core.scales as scales
import mingus.core.chords as chords
import mingus.core.progressions as progs
import sys

chord_progs = [
        ['I', 'V', 'vi', 'IV'],
        ['I', 'vi', 'IV', 'V'],
        ['I', 'vi', 'ii', 'V'],
        ['I', 'V', 'vi', 'iii', 'IV', 'I', 'IV', 'V'],
        ['ii', 'IV', 'V'],
        ['I', 'IV', 'V', 'IV'],
        ['V', 'IV', 'I'],
        ['vi', 'IV', 'I', 'V'],
        ['vi', 'V', 'IV', 'III'],
        ['IV',  'V',  'I'],
        ['ii',  'V',  'I']
        ]


def chromatic_scale():
    """
    This function returns the chromatic scale starting with C and including
    its enharmonics
    """
    ascending_chrom = scales.Chromatic('C').ascending()
    descending_chrom = scales.Chromatic('C').descending()
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
    Consumes a list of lists of string s(chord progression) and returns a
    single list of strings
    """
    p = []
    for chord in prog:
        p.append(chord[0])

    return p


def check_user_progs(user_prog):
    """
    Consumes a dictionary with chord progression in most common keys and
    returns a list of matching chord progressions from the list above
    """
    found_progs = []

    for prog in chord_progs:
        for ch_prog in user_prog.values():
            if prog == prog_to_string(ch_prog):
                if prog not in found_progs:
                    found_progs.append(prog)

    return found_progs


user_args = sys.argv[1]
print(check_user_progs(prog_to_funct(user_args.split())))
