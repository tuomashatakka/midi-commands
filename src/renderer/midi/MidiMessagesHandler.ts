import { EventEmitter } from 'events'

export default class MidiMessagesHandler {
  emitter = new EventEmitter();
  interface: WebMidi.MIDIAccess = null as unknown as WebMidi.MIDIAccess;

  deviceEventSubscriptions: Set<() => unknown> = new Set();
  deviceChangeSubscriptions: Set<() => unknown> = new Set();
  assignedHandlersSubscriptions: Set<() => unknown> = new Set();
  stateChangeSubscription: null | ( () => unknown ) = null;

  constructor () {
    this.initialize()
  }

  clearDeviceEventSubscriptions = () => {
    this.deviceEventSubscriptions.forEach( unsubscribe => unsubscribe() )
    this.deviceEventSubscriptions.clear()
  };

  clearAssignedHandlersSubscriptions = () => {
    this.assignedHandlersSubscriptions.forEach( unsubscribe => unsubscribe() )
    this.assignedHandlersSubscriptions.clear()
  };

  clearDeviceChangeSubscriptions = () => {
    this.deviceChangeSubscriptions.forEach( unsubscribe => unsubscribe() )
    this.deviceChangeSubscriptions.clear()
  };

  async initialize () {
    try {
      this.interface = await navigator.requestMIDIAccess()
      this.interface.addEventListener( 'statechange', this.handleDevicesUpdate )
      this.stateChangeSubscription = () => this.interface.removeEventListener( 'statechange', this.handleDevicesUpdate )
      this.emitter.emit( 'ready' )
      this.handleDevicesUpdate()
    }
    catch ( error ) {
      this.emitter.emit( 'error' )
    }
  }

  destroy () {
    if ( this.stateChangeSubscription )
      this.stateChangeSubscription()
    this.clearDeviceEventSubscriptions()
    this.clearAssignedHandlersSubscriptions()
    this.clearDeviceChangeSubscriptions()
  }

  handleDevicesUpdate = () => {
    this.clearDeviceEventSubscriptions()

    this.inputDevices.forEach( ( device ) => {
      const callback: EventListener = ( midiEvent ) => {
        const { data } = midiEvent as MIDIMessageEvent

        this.emitter.emit( 'message', {
          data,
          device,
        } )
      }

      const unsubscribe = () => {
        device.removeEventListener( 'midimessage', callback )
      }

      device.addEventListener( 'midimessage', callback )
      this.deviceEventSubscriptions.add( unsubscribe )
    } )

    this.emitter.emit( 'devices-updated', this.inputDevices )
  };

  get inputDevices () {
    return this.interface.inputs
  }

  onDevicesUpdated ( callback: never ) {
    const unsubscribe = () => {
      this.emitter.removeListener( 'devices-updated', callback )
    }

    this.emitter.addListener( 'devices-updated', callback )

    this.deviceChangeSubscriptions.add( unsubscribe )
  }

  onMessage ( callback: never ) {
    const unsubscribe = () => {
      this.emitter.removeListener( 'message', callback )
    }

    this.emitter.addListener( 'message', callback )

    this.assignedHandlersSubscriptions.add( unsubscribe )
  }
}
