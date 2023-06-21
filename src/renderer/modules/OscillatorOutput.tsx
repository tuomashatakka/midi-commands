/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useRef, useState } from "react"
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

const audioContextReference: {
  current: AudioContext | null,
  destination: MediaStreamAudioDestinationNode | null,
  media: MediaStream | null,
  devices: MediaDeviceInfo[] | null,
} = {
  current:     null,
  destination: null,
  media:       null,
  devices:     null,
}

const getMedia = (): Promise<MediaStream> => new Promise((resolve, reject) =>
  // eslint-disable-next-line no-promise-executor-return
  window.navigator.getUserMedia({ audio: true, video: false }, resolve, reject))

const setupAudio = async () => {
  audioContextReference.media = await getMedia()
  audioContextReference.devices = await navigator.mediaDevices.enumerateDevices()
  const ctx = new AudioContext()
  const dst = ctx.createMediaStreamDestination()

  audioContextReference.current = ctx
  audioContextReference.destination = dst

  const osc = ctx.createOscillator()
  const osc2 = ctx.createOscillator()
  const osc3 = ctx.createOscillator()
  const osc4 = ctx.createOscillator()

  osc.start()
  osc2.start()
  osc3.start()
  osc4.start()
  osc.connect(dst)
  osc2.connect(dst)
  osc3.connect(dst)
  osc4.connect(dst)
  osc.frequency.exponentialRampToValueAtTime(110, 10)
  osc2.frequency.exponentialRampToValueAtTime(840, 10)
  osc3.frequency.exponentialRampToValueAtTime(949, 10)
  osc4.frequency.exponentialRampToValueAtTime(333, 10)

  osc.frequency.value = 55
  osc2.frequency.value = 55
  osc3.frequency.value = 22.5
  osc4.frequency.value = 3000

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.oscillators = new Set([ osc, osc2, osc3, osc4 ])

  return dst
}

// const createOscillators = (ctx: AudioContext, params = {}, n = 1) => {
//   const oscs = new Set()

//   for (let i = 0; i < n; i++) {
//     const osc = ctx.createOscillator()

//     oscs.add(osc)
//     osc.connect(ctx.destination)
//     osc.start()
//   }
//   return oscs
// }

const OscillatorOutput = () => {
  const { state } = useMidiInterface()
  const messages = state.messages.slice(-1)
  const [ audioDestination, setAudioDestination ] = useState<MediaStreamAudioDestinationNode | null>(null)
  const audioNode = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (!audioDestination) {
      setupAudio()
      .then(dst => {
        setAudioDestination(dst)
      })

    }
    return () => {
      if (audioDestination) {
        audioDestination.context?.close()
        setAudioDestination(null)
      }
    }
  }, [ audioNode ])

  useEffect(() => {
    if (audioDestination && audioNode.current) {
      if (audioNode.current)
        audioNode.current.srcObject = audioDestination.stream
    }
    return () => {
      if (audioNode.current) {
        audioNode.current.srcObject?.getTracks().forEach(track => track.stop())
        audioNode.current.srcObject = null
      }
    }
  }, [ audioDestination ])

  return <div className='messages'>
    <ol>{messages.map(renderMidiMessage)}</ol>
    <audio
      controls={true}
      ref={audioNode}
    autoPlay={true}
    />
  </div>
}

export default OscillatorOutput
