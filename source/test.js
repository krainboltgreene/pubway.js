import {test} from "babel-tap"
import {spy} from "sinon"

import pubway from "./index"

test(({end, ok}) => {
  const unction = spy()

  const route = pubway({
    custom (verb, path) {
      return unction(verb, path)
    }
  })

  route("GET custom:/a/b/c")

  ok(unction.calledWith("GET", "/a/b/c"))

  end()
})


test(({end, notOk}) => {
  const unction = spy()

  const router = pubway({
    custom (verb, path) {
      return unction(verb, path)
    }
  })

  route("GET rex:/a/b/c")

  notOk(unction.calledWith("GET", "/a/b/c"))

  end()
})
