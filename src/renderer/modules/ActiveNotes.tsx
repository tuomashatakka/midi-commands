import { getNoteNameByMidiMessageValue, getNoteOctaveByMidiMessageValue } from "renderer/midi/MIDINoteMessage"
import { useMidiInterface } from "renderer/midi/useMidi"

type PlayingNoteType = {
  key: number,
  octave: number,
  note: string,
}

const renderPlayingNote = (message: PlayingNoteType, key: number) => <li key={String(key)} className='message'>
  <span className='icon'>{message.octave}</span>
  <span className='key'>{message.note}</span>
  <span className='value'>{message.key}</span>
</li>

const ActiveNotes = () => {
  const { state } = useMidiInterface()
  const messages = [ ...state.activeNotes ].sort()

  const playingNotesData = messages.map(key => {
    const note = getNoteNameByMidiMessageValue(key)
    const octave = getNoteOctaveByMidiMessageValue(key)

    return { key, octave, note }
  })

  return <div className='messages'>
    <ol>{playingNotesData.map(renderPlayingNote)}</ol>
  </div>
}

export default ActiveNotes
