import { useCallback, useInsertionEffect, useMemo, useReducer } from 'react'
import { RawMIDIMessageData } from './MIDIMessage'
import { initialState, midiInterfaceReducer } from './store'
import MidiMessagesHandler from './MidiMessagesHandler'

export const useMidi = () => {
  const midi = useMemo(() => new MidiMessagesHandler(), [ MidiMessagesHandler ])

  window._midi = midi

  return midi
}

export const useMidiInterface = () => {
  const [ state, dispatch ] = useReducer(midiInterfaceReducer, initialState)
  const midi = useMidi()

  const addMessage = useCallback((params: RawMIDIMessageData) =>
    dispatch({
      type: 'addMessage',
      params,
    }), [ dispatch ])

  const updateDevices = useCallback((params: MIDIPort[]) =>
    dispatch({
      type: 'updateDevices',
      params,
    }), [ dispatch ])

  useInsertionEffect(() => {
    midi.onMessage(addMessage)
    midi.onDevicesUpdated(updateDevices)
  }, [ midi ])

  return {
    state,
    addMessage,
    updateDevices,
  }
}


// export default function getMidiInterface () {
//   const midi = useRef(null)

//   if (_midi.current)
//     return _midi.current

//   _midi.current = new MidiMessagesHandler()
//   _midi.current.initialize()

//   return _midi.current
// }


// async function getMidiInterface (navigator) {
//   const midi = await navigator.requestMIDIAccess()
//   return midi
// }

// async function onDevicesStateChanged (callback) {
//   const midi = await getMidiInterface(navigator)
//   midi.addEventListener('statechange', callback)

//   return () => midi.removeEventListener('statechange', callback)
// }

// async function onMessage (callback) {

// }
