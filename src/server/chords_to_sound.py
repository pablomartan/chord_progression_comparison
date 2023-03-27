from mingus.core import chords
from mingus.containers import NoteContainer, Bar, Track, MidiInstrument
from mingus.midi import fluidsynth
import sys
import json
import pathlib

FILENAME = "recording.wav"
PATH = str(pathlib.Path(__file__).parent.absolute())
FILE_PATH = PATH + "/" + FILENAME
SOUNDFONT = PATH + "/sounds.sf2"
CHORD_LIST = json.loads(sys.argv[1])
BPM = json.loads(sys.argv[2])


def record(chord_list):
    """
    Records each of the chords in chord_list into a file named recording.wav,
    and returns the file's path
    """
    track = Track(MidiInstrument())

    for chord in chord_list:
        b = Bar()
        b.place_notes(NoteContainer(chords.from_shorthand(chord)), 1)
        track + b

    if (not fluidsynth.initialized):
        fluidsynth.init(SOUNDFONT, driver=None, file=FILE_PATH)

    fluidsynth.play_Track(track, 0, BPM)
    fluidsynth.stop_everything()

    return FILE_PATH


if __name__ == "__main__":
    print(record(CHORD_LIST))
