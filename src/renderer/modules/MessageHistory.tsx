import { MIDIMessage } from "renderer/midi/MIDIMessage"
import { useMidiInterface } from "renderer/midi/useMidi"


const ValueBar = ({ value }: { value: number }) => <progress value={value} max={127} />

const renderMidiMessage = (message: MIDIMessage, key: number) => <li key={String(key)} className='message'>
  <span className='icon'>{message.symbol}</span>
  <span className='key'>{message.displayKey}</span>
  {message.value && <>
    <span className='value'>{message.displayValue}</span>
    <ValueBar value={message.value} />
  </>}
  </li>

const MessageHistory = () => {
  const { state } = useMidiInterface()
  const messages = state.messages.slice(-150)

  return <div className='messages'>
    <ol>{messages.map(renderMidiMessage)}</ol>
  </div>
}

export default MessageHistory
