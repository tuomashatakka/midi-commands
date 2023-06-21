import Module from "../store/Module"
import moduleManager from "../store"
import { useModules } from "../store/moduleContext"

const ModuleSlot = ({ module }: { module: Module }) => {
  const id    = module.getIdentifier()
  const name  = module.getName()
  const renderedContent = moduleManager.renderModule(module)

  if (renderedContent === null)
    return null
  console.log("MODULE", module)
  return <div className='module-slot' id={id}>
    <h2>{name}</h2>
    { renderedContent }
  </div>
}

const ModulesGrid = () => {
  const { modules } = useModules()

  return <section className='modules-grid'>
    { modules.map(module => <ModuleSlot module={module} />) }
  </section>
}

export default ModulesGrid
