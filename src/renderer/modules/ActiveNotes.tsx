import { getNoteFrequency, getNoteNameByMidiMessageValue, getNoteOctaveByMidiMessageValue } from "renderer/midi/MIDINoteMessage"
import { useMidiInterface } from "renderer/midi/useMidi"

type PlayingNoteType = {
  key: number,
  octave: number,
  note: string,
  f: number,
}

const renderPlayingNote = (message: PlayingNoteType, key: number) => <li key={String(key)} className='message'>
  <span className='icon'>{message.octave}</span>
  <span className='key'>
    {message.note}
    <strong> {message.f}</strong>
  </span>
  <span className='value'>{message.key}</span>
</li>

const ActiveNotes = () => {
  const { state } = useMidiInterface()
  const messages = [ ...state.activeNotes ].sort()

  const playingNotesData = messages.map(key => {
    const note    = getNoteNameByMidiMessageValue(key)
    const octave  = getNoteOctaveByMidiMessageValue(key)
    const f       = getNoteFrequency(key)

    return { key, octave, note, f }
  })

  return <div className='messages'>
    <ol>{playingNotesData.map(renderPlayingNote)}</ol>
  </div>
}

export default ActiveNotes
