import {test} from "ramda"
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
const INSTRUCTION_TEST_PATTERN = /(GET|DELETE) .+?:.+/
const INSTRUCTION_MATCH_PATTERN = /(GET|DELETE) (.+?):(.+)/

export default function pushSet (adapters: AdaptersType): Function {
  return function pushSetWithAdapters (raw: string): SideEffectType {
    if (test(INSTRUCTION_TEST_PATTERN, raw)) {
      const instruction: Array<string> = match(INSTRUCTION_MATCH_PATTERN, raw)
      const intent: IntentType = instruction[instructionKeys.intent]
      const protocol: ProtocolType = instruction[instructionKeys.protocol]
      const path: PathType = instruction[instructionKeys.path]

      if (protocol) {
        return adapters[protocol](intent, path)
      }

      return applySpec(adapters)(intent, path)
    }

    return console.warn("Event didn't match instruction pattern", {event})
  }
}
