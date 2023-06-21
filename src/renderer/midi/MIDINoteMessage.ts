import AbstractBaseMIDIMessage, { PossiblyNumber } from "./AbstractBaseMIDIMessage"

export const NOTE_NAMES = [ 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ]

export const getNoteNameByMidiMessageValue = (numericValue: number) => {
  const index = numericValue % 12

  return NOTE_NAMES[index]
}

export const getNoteOctaveByMidiMessageValue = (numericValue: number): number =>
  Math.floor(numericValue/12)

const MIDI_NOTES: Record<number, number> = {
  63:  440,
  127: 18000,
}

// eslint-disable-next-line import/prefer-default-export
export default class MIDINoteMessage extends AbstractBaseMIDIMessage {

  get frequency (): PossiblyNumber {
    return MIDI_NOTES[this.key]
  }

  get value (): PossiblyNumber {
    if (this.type === AbstractBaseMIDIMessage.TYPES.NOTE_OFF)
      return undefined
    return this.data.at(2)
  }

  get displayKey () {
    return getNoteNameByMidiMessageValue(this.key)
  }

  get noteOn (): boolean {
    return this.type === AbstractBaseMIDIMessage.TYPES.NOTE_ON
  }

  get noteOff (): boolean {
    return this.type === AbstractBaseMIDIMessage.TYPES.NOTE_OFF
  }
}
