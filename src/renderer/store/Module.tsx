import moduleManager from '.'
import { ModuleDescriptor } from './moduleContext' // eslint-disable-line import/no-cycle

enum AttributeNames {
  'id',
  'name',
  'description',
}

type ModuleAttributeKeys = keyof typeof AttributeNames

type ModuleAttributes = Map<ModuleAttributeKeys, string>

export default class Module {
  attributes: ModuleAttributes = new Map<ModuleAttributeKeys, string>()

  static from (mod: Module | ModuleDescriptor) {
    if (mod instanceof Module)
      return mod
    const ComponentClass = mod.component
    const renderer = () => <ComponentClass />
    const modClassInstance = new Module()

    modClassInstance.setProperty('id', mod.id)
    modClassInstance.setProperty('name', mod.name)
    moduleManager.registerModule(modClassInstance, renderer)
    return modClassInstance
  }

  setProperty ( key: ModuleAttributeKeys, val: string ) {
    this.attributes.set( key, val )
  }

  getProperty = (key: ModuleAttributeKeys) => this.attributes.get(key)

  getName = () => this.getProperty('name')
  getIdentifier = () => this.getProperty('id')

  getComponentClass () {
    const name = this.getProperty('name')

    if (!name)
      throw new TypeError('Module does not have a name defined')
    return moduleManager.getModuleRenderer(name)
  }
}
