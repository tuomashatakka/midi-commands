import AbstractBaseMIDIMessage from "./AbstractBaseMIDIMessage"
import NOTE_FREQUENCIES from './notes.json'

export const BASE_TUNING = 440
export const NOTE_NAMES = [ 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ]

export const getNoteNameByMidiMessageValue = (numericValue: number): string =>
  NOTE_NAMES[numericValue % 12]

export const getNoteOctaveByMidiMessageValue = (numericValue: number): number =>
  Math.floor(numericValue/12)

export const getNoteFrequency = (noteNumber: number): number =>
  NOTE_FREQUENCIES[noteNumber]
  // 2**((noteNumber - 69)/12) * BASE_TUNING


export default class MIDINoteMessage extends AbstractBaseMIDIMessage {

  get frequency () {
    return getNoteFrequency(this.key)
  }

  get value () {
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
