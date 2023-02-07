import mingus.core.scales as scales
import mingus.core.chords as chords
import mingus.core.progressions as progs

chord_progs = [
        ['I', 'V', 'vi', 'IV'],
        ['I', 'vi', 'IV', 'V'],
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
    notes = chromatic_scale()

    for chord in prog:
        triads.append(chords.from_shorthand(chord))

    for note in notes:
        prog_chromatic[note] = []
        for chord in triads:
            prog_chromatic[note].append(progs.determine(chord, note, True))

    return prog_chromatic


def find_prog(user_prog):
    """
    Search the given chord progression into the ones stored in chord_progs
    """
    user_prog_funct = prog_to_funct(user_prog)

    return user_prog_funct
