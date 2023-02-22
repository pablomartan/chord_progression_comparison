import prog_dict
import json
import sys

song_dict = prog_dict.chord_progs
args = sys.argv[1]

print(json.dumps(song_dict[args]))
