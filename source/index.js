import {test} from "ramda"
import {match} from "ramda"
import mapValues from "@unction/mapvalues"
import thrush from "@unction/thrush"

type PayloadType = {intent: string, path: string}
type MapperFunctionType = PayloadType => mixed

const INSTRUCTION_MATCH_PATTERN = /(PATCH|DELETE) (.+)/i

export default function pubway (adapters: MapperFunctionType | Array<MapperFunctionType>): Function {
  return function pubwayWithAdapters (raw: string): mixed {
    if (!test(INSTRUCTION_MATCH_PATTERN, raw)) {
      return null
    }

    const [, intent, path]: [string, string] = match(INSTRUCTION_MATCH_PATTERN, raw)

    if (adapters instanceof Array) {
      return mapValues(thrush({
        intent,
        path,
      }))(
        adapters
      )
    }

    return adapters({
      intent,
      path,
    })
  }
}
