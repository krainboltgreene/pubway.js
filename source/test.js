import {test} from "babel-tap"
import {spy} from "sinon"

import pushSet from "./index"

test(({end, ok}) => {
  const unction = spy()

  const set = pushSet({
    custom (verb, path) {
      return unction(verb, path)
    }
  })

  set("GET custom:/a/b/c")

  ok(unction.calledWith("GET", "/a/b/c"))

  end()
})


test(({end, notOk}) => {
  const unction = spy()

  const set = pushSet({
    custom (verb, path) {
      return unction(verb, path)
    }
  })

  set("GET rex:/a/b/c")

  notOk(unction.calledWith("GET", "/a/b/c"))

  end()
})
