import pubway from "pubway"
import {refreshStore} from "../signals"

// Define all the adapters you'll be supporting, where the method name is the protocol section of the payload.
export default pubway({
  // Handles: GET redux:/resouces/activities/230592394/name
  // Handles: GET redux:/resouces/profiles
  // Handles: DELETE redux:/sessions/54983
  redux (verb, path, query) {
    return store.dispatch(refreshStore(verb, path, query))
  },
  // Handles: DELETE falcor:/projects
  // Handles: GET falcor:/projects/1234123/title
  falcor (verb, path, query) {
    // ...
  },
  // Handles: GET custom:/whatever/you/want?ok
  custom (intent, value, query) {
    // ...
  },
})
