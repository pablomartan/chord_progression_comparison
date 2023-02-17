import json
import prog_dict
chord_progs = prog_dict.chord_progs

progs = [d for d in chord_progs.keys()]
print(json.dumps(progs))
