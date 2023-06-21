
type NoneOr<T> = T | undefined

export type PossiblyNumber = NoneOr<number>

let midiMessageIndex = 0

export enum MESSAGE_TYPE {
  NOTE_OFF = 128,
  NOTE_ON = 144,
  CONTROL_CHANGE = 176,
  PROGRAM_CHANGE = 192,
}

export default class AbstractBaseMIDIMessage {
  static TYPES = MESSAGE_TYPE
  static VALUE_KEY = '⨶'
  static VALUEA_KEY = '▽'
  static DELIMITER = '\u2003' // '⨶'
  static TYPE_KEYS = {
    PROGRAM: '⌽',
    CC:      '⨶', // ⧉∫⎘', //⨶⦽⎋
    NOTE:    '♪', // ♫♫◯◌',
  }

  id: number = midiMessageIndex++
  time: number | null = null
  data: Uint8Array
  meta: Map<string, number | string>

  constructor (note: Uint8Array, meta: Record<string, number | string> = {}) {
    this.data = note
    this.meta = new Map(Object.entries(meta))
    this.time = Date.now()
  }

  get type (): number {
    return this.data.at(0) as number
  }

  get key (): number {
    return this.data.at(1) as number
  }

  get value (): PossiblyNumber {
    return this.data.at(2)
  }

  get symbol () {
    if (this.type === MESSAGE_TYPE.CONTROL_CHANGE)
      return AbstractBaseMIDIMessage.TYPE_KEYS.CC
    if (this.type === MESSAGE_TYPE.PROGRAM_CHANGE)
      return AbstractBaseMIDIMessage.TYPE_KEYS.PROGRAM
    return AbstractBaseMIDIMessage.TYPE_KEYS.NOTE
  }

  get verboseType () {
    return MESSAGE_TYPE[this.type]
  }

  toString () {
    return this.displayValue
  }

  get displayKey (): string {
    return String(this.key)
  }

  get displayValue (): string {
    return String(this.value)
  }

  // eslint-disable-next-line class-methods-use-this
  get noteOn (): boolean {
    return false
  }

  // eslint-disable-next-line class-methods-use-this
  get noteOff (): boolean {
    return false
  }
}
