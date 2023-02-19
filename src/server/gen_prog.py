import mingus.core.progressions as progs
import mingus.core.chords as chords
import json
import sys

user_args = json.loads(sys.argv[1])


def funct_to_names(prog, key):
    """
    Converts a given chord progression written in functional notation, and
    passed as a space separated string into a list of lists, each inside list
    being the chord corresponding to the given function in the given key
    """
    chord_list = prog.split(' ')
    chord_names = []

    for chord in progs.to_chords(chord_list, key):
        chord_names.append(chords.determine(chord, key, True))

    return chord_names


if __name__ == "__main__":
    print(json.dumps(funct_to_names(user_args['prog'], user_args['key'])))
