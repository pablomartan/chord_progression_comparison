import mingus.core.progressions as progs
import mingus.core.chords as chords
import json
import sys


user_args = json.loads(sys.argv[1])


def funct_to_names(prog, key):
    """
    Converts a given chord progression written in functional notation, and
    passed as a space separated string into a list of strings, each string
    being the chord corresponding to the given function in the given key
    """
    ls = prog.split()
    chord_names = []

    for funct in progs.to_chords(ls, key):
        chord_names.append(chords.determine(funct, key, True)[0])

    return chord_names


if __name__ == "__main__":
    print(json.dumps(funct_to_names(user_args['prog'], user_args['key'])))
