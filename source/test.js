/* eslint-disable flowtype/require-parameter-type, flowtype/require-return-type */
import {test} from "tap"
import {spy} from "sinon"

import pubway from "./index"

test("bad message", ({end, equal}) => {
  const afunction = spy()

  const router = pubway(afunction)

  equal(router("GET /a/b/c"), null)

  end()
})

test("PATCH, single adapter", ({end, ok}) => {
  const afunction = spy()

  const router = pubway(afunction)

  router("PATCH /a/b/c")

  ok(afunction.calledWith({
    intent: "PATCH",
    path: "/a/b/c",
  }))

  end()
})

test("DELETE, single adapter", ({end, ok}) => {
  const afunction = spy()

  const router = pubway(afunction)

  router("DELETE /a/b/c")

  ok(afunction.calledWith({
    intent: "DELETE",
    path: "/a/b/c",
  }))

  end()
})

test("PATCH, multi-adapter", ({end, ok}) => {
  const afunction = spy()
  const bfunction = spy()

  const router = pubway([
    ({intent, path}) => afunction(intent, path),
    bfunction,
  ])

  router("PATCH /a/b/c")

  ok(afunction.calledWith("PATCH", "/a/b/c"))
  ok(bfunction.calledWith({
    intent: "PATCH",
    path: "/a/b/c",
  }))

  end()
})

test("DELETE, multi-adapter", ({end, ok}) => {
  const afunction = spy()
  const bfunction = spy()

  const router = pubway([
    ({intent, path}) => afunction(intent, path),
    bfunction,
  ])

  router("DELETE /a/b/c")

  ok(afunction.calledWith("DELETE", "/a/b/c"))
  ok(bfunction.calledWith({
    intent: "DELETE",
    path: "/a/b/c",
  }))

  end()
})
