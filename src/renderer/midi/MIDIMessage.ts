import AbstractBaseMIDIMessage from "./AbstractBaseMIDIMessage"
import MIDINoteMessage from "./MIDINoteMessage"

export type MIDIMessageActionData = {
  data: MIDIMessageEvent,
  device: MIDIPort
}

export type RawMIDIMessageData = [ number, number, number ]



export default function resolveMessageInstance ({ data, device }: MIDIMessageActionData) {
  const { id: deviceId } = device

  if ([
    AbstractBaseMIDIMessage.TYPES.NOTE_ON,
    AbstractBaseMIDIMessage.TYPES.NOTE_OFF,
  ].includes(data.at(0)))
    return new MIDINoteMessage(data, { deviceId })

  // eslint-disable-next-line no-use-before-defines
  return new MIDIMessage(data, { deviceId })
}


export class MIDIMessage extends AbstractBaseMIDIMessage {
  static from (props: MIDIMessageActionData) {
    return resolveMessageInstance(props)
  }
}
