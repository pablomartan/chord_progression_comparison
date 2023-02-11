import mingus.core.scales as scales
import mingus.core.chords as chords
import mingus.core.progressions as progs
import json
import sys

chord_progs = {
        "I V vi IV": [("Enrique Iglesias", "Bailando"),
                      ("Bob Marley", "No woman no cry"),
                      ("The Beatles", "Let it be")],
        "I ii vi IV": [("Beyonce", "Halo"),
                       ("Rihanna", "Stay"),
                       ("Katy Perry", "Firework")],
        "I iii vi IV": [("Jessie J", "Pricetag"),
                        ("Blow me", "Pink"),
                        ("Count on me", "Bruno Mars")],
        "I vi ii V": [("Bruce Springsteen", "Hungry Heart")],
        "I vi IV V": [("Ben E. King", "Stand By Me"),
                      ("Sean Kingston", "Beautiful girls"),
                      ("Justin Bieber", "Baby")],
        "I IV V IV": [("Ritchie Valens", "La bamba")],
        "I V ii IV": [("Hot n cold", "Katy Perry"),
                      ("Lady Gaga", "Eh Eh"),
                      ("On my way", "Charlie Brown"),
                      ("Foster the people", "Pumped up kicks")],
        "ii IV I V": [("Paradise", "Coldplay")],
        "IV I V vi": [("Rihanna", "Umbrella"),
                      ("Grenday", "Boulevard of broken dreams"),
                      ("Passenger", "Let her go")],
        "I V vi iii IV I IV V": [("Oasis", "Don't look back in anger"),
                                 ("Maroon 5", "Memories"),
                                 ("David Bowie", "Changes")],
        "V IV I": [("Guns 'n' roses", "Sweet child o mine"),
                   ("The eagles", "Sweet home, Alabama")],
        "vi IV I V": [("Red Hot Chilly Peppers", "Snow")]
        }


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
    Consumes a list of lists of string s(chord progression) and returns a
    single list of strings
    """
    p = []
    for chord in prog:
        p.append(chord[0])

    return p


def check_user_progs(user_prog):
    """
    Consumes a list with chords from the user and returns
    a list of matching chord progressions from the dictionary above
    """
    found_progs = []

    progs = [prog.split() for prog in chord_progs.keys()]

    for prog in progs:
        for ch_prog in user_prog.values():
            if prog == prog_to_string(ch_prog):
                if prog not in found_progs:
                    found_progs.append(prog)

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


def prepare_output(key_list):
    """
    Consumes a list with keys for the dictionary above and returns a formated
    list with the chord progression and a list of songs that use it
    """
    output = []
    for key in key_list:
        item = {}
        tmp_key = ' '.join(key)
        item['prog'] = tmp_key
        item['songs'] = songs_to_dict(chord_progs[tmp_key])
        output.append(item)

    return output


user_args = sys.argv[1]
output = prepare_output(check_user_progs(prog_to_funct(user_args.split())))
print(json.dumps(output))
