import {test} from "ramda"
import {match} from "ramda"
import {has} from "ramda"

const instructionKeys = {
  intent: 1,
  protocol: 2,
  path: 3
}
const INSTRUCTION_TEST_PATTERN = /(GET|DELETE) .+?:.+/
const INSTRUCTION_MATCH_PATTERN = /(GET|DELETE) (.+?):(.+)/

export default function pubway (adapters: AdaptersType): Function {
  return function pubwayWithAdapters (raw: string): SideEffectType {
    if (!test(INSTRUCTION_TEST_PATTERN, raw)) {
      console.warn("Data didn't match instruction pattern:", {event})

      return null
    }

    const instruction: Array<string> = match(INSTRUCTION_MATCH_PATTERN, raw)
    const intent: IntentType = instruction[instructionKeys.intent]
    const protocol: ProtocolType = instruction[instructionKeys.protocol]
    const path: PathType = instruction[instructionKeys.path]

    if (!has(protocol, adapters)) {
      return null
    }

    return adapters[protocol](intent, path)
  }
}
