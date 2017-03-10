import pushSet from "pushSet"

// type PushSet$VerbType = "GET" | "DELETE"
// type PushSet$DispatchType = (verb: VerbType, path: string) => any
//
// type PushSet$AdapterType = {
//   [key: string]: PushSet$DispatchType
// }

// Define all the adapters you'll be supporting, where the method name is the protocol section of the payload.
export default pushSet({
  // Handles: GET redux:/data/activities/230592394
  // Handles: GET redux:/data/profiles
  // Handles: DELETE redux:/sessions/54983
  redux ([verb, path]) {
    return store.dispatch(refreshStore(verb, path))
  },
  // Handles: DELETE falcor:/
  // Handles: GET falcor:/projects/1234123/title
  falcor ([verb, path]) {
    // ...
  },
  // Handles: GET custom:/whatever/you/want?ok
  custom ([intent, value]) {
    // ...
  },
  // You can trigger all by doing: DELETE /, GET /, or PUT /
})
