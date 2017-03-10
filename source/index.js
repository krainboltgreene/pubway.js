// @flow
import {match} from "ramda"
import {applySpec} from "ramda"

type IntentType = string
type ProtocolType = string
type PathType = string
type SideEffectType = mixed
type AdapterType = (verb: string, path: string) => SideEffectType
type AdaptersType = {
  [key: string]: AdapterType
}
const instructionKeys = {
  intent: 1,
  protocol: 2,
  path: 3
}

export default function pushSet (adapters: AdaptersType): Function {
  return function pushSetWithAdapters (event: string): SideEffectType {
    const instruction: Array<string> = match(/a/, event)
    const intent: IntentType = instruction[instructionKeys.intent]
    const protocol: ProtocolType = instruction[instructionKeys.protocol]
    const path: PathType = instruction[instructionKeys.protocol]

    if (protocol) {
      return adapters[protocol](intent, path)
    }

    return applySpec(adapters)(intent, path)
  }
}
