import { useMidiInterface } from "renderer/midi/useMidi"


const renderDeviceDetails = (device) => <li key={device.id}>
  <dl className='device'>
    <dt>dev</dt>
    <dd>{device.name}</dd>
    <dt>state</dt>
    <dd>{device.state}</dd>
    <dt>id</dt>
    <dd>{device.id}</dd>
    <dt>manufact</dt>
    <dd>{device.manufacturer} ⌨</dd>
  </dl>
</li>

const DeviceInformation = () => {
  const { state: { devices } } = useMidiInterface()

  return <div className='devices'>
    <ol>
      {devices.map(renderDeviceDetails)}
    </ol>
  </div>
}

export default DeviceInformation
