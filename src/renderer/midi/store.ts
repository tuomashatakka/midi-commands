import { Reducer } from 'react'
import resolveMessageInstance, { MIDIMessage, MIDIMessageActionData } from './MIDIMessage'

export type StateType = {
  activeNotes: Set<number>,
  devices:  Array<MIDIPort>,
  messages: Array<MIDIMessage>,
}

export type ActionProps<Name, Params> = {
  type:   Name,
  params: Params
}

type AddMessageAction     = ActionProps<'addMessage', MIDIMessageActionData>
type UpdateDeviceAction   = ActionProps<'updateDevice', MIDIPort>
type UpdateDevicesAction  = ActionProps<'updateDevices', MIDIPort[]>
export type ActionType    = AddMessageAction | UpdateDeviceAction | UpdateDevicesAction

export const initialState = {
  activeNotes: new Set(),
  messages:    [],
  devices:     [],
}

export const midiInterfaceReducer: Reducer<StateType, ActionType> = (state, { type, params }) => {
  if (type === 'addMessage') {
    const newMessage      = resolveMessageInstance(params)
    const messages        = [ ...state.messages, newMessage ]
    const activeNotes     = new Set(state.activeNotes)

    if (newMessage.noteOn)
      activeNotes.add(newMessage.key)
    else if (newMessage.noteOff)
      activeNotes.delete(newMessage.key)
    return { ...state, messages, activeNotes }
  }

  if (type === 'updateDevice') {
    const index = state.devices.findIndex(entry => entry.id === params.id)

    if (index === -1)
      return { ...state, devices: [ ...state.devices, params ] }
    return { ...state, devices: state.devices.splice(index, 1, params) }
  }

  if (type === 'updateDevices')
    return { ...state, devices: [ ...params.values() ] }

  return state
}
