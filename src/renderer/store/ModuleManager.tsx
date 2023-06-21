import type Module from "./Module"

type Nullable<T> = T | null

export default class ModuleManager {
  registeredRenderers = new WeakMap()

  modules: Set<Module> = new Set()

  registerModule (module: Module, renderer: () => JSX.Element) {
    this.registeredRenderers.set(module, renderer)
  }

  getModuleByName (moduleName: string): Nullable<Module> {
    const iter = Array.from(this.modules.values())
    const result = iter.find(entry => entry.getName() === moduleName)

    return result || null
  }

  getModuleRenderer (moduleOrModuleName: Module | string): Nullable<React.FC> {
    if (typeof moduleOrModuleName !== 'string')
      return this.registeredRenderers.get(moduleOrModuleName)

    const mod = this.getModuleByName(moduleOrModuleName)

    if (mod)
      return this.registeredRenderers.get(mod)

    return null
  }

  renderModule (module: Module | string): JSX.Element {
    const Renderer = this.getModuleRenderer(module)

    if (Renderer)
      return <Renderer />

    return (() => null) as unknown as JSX.Element
  }
}
