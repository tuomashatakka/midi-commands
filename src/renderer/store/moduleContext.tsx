import React, { createContext, useReducer, useContext, PropsWithChildren, Dispatch, Reducer } from 'react';
import DeviceInformation from 'renderer/modules/DeviceInformation'
import MessageHistory from 'renderer/modules/MessageHistory'
import ActiveNotes from 'renderer/modules/ActiveNotes'
import OscillatorOutput from 'renderer/modules/OscillatorOutput'
import Module from './Module' // eslint-disable-line import/no-cycle

interface BaseAction<Type> {
  type: Type
}

interface UpdateModulesAction extends BaseAction<'update modules'> {
  modules: Module[]
}


type Action = UpdateModulesAction

type ModuleStateType = {
  modules: Module[]
}

export type ActionType = Reducer<ModuleStateType, Action>

export type ModuleDescriptor = {
  id:        string,
  name:      string,
  component: React.FC
}

const moduleReducer = (state: ModuleStateType, action: Action): ModuleStateType => {
  switch (action.type) {
    case 'update modules':
      return {
        ...state,
        modules: action.modules.map(Module.from),
      }

    default:
      return state;
  }
}

const INITIAL_MODULES_FIXME: ModuleDescriptor[] = [
  {
    id:        'devices',
    name:      'Device info',
    component: DeviceInformation,
  },
  {
    id:        'messages',
    name:      'Midi messages',
    component: MessageHistory,
  },
  {
    id:        'oscillator',
    name:      'Oscillator',
    component: OscillatorOutput,
  },
  {
    id:        'chord',
    name:      'Playing Chord',
    component: ActiveNotes,
  },
]

const initialState = {
  modules: INITIAL_MODULES_FIXME.map(Module.from),
}

const noop = () => {} // eslint-disable-line @typescript-eslint/no-empty-function
const ModulesContext = createContext<ModuleStateType>(initialState);
const ModuleDispatchContext = createContext<Dispatch<Action>>(noop);

export const ModuleContextProvider = ({ children }: PropsWithChildren<never>) => {
  const [ state, dispatch ] = useReducer<ActionType>(moduleReducer, initialState);

  return <ModulesContext.Provider value={state}>
    <ModuleDispatchContext.Provider value={dispatch}>
      {children}
    </ModuleDispatchContext.Provider>
  </ModulesContext.Provider>
}

export const useModules = () => {
  const state = useContext(ModulesContext);

  return state
}

export const useUpdateModuleData = () => {
  const dispatch = useContext(ModuleDispatchContext);

  return dispatch
}
