# pubway

[![Greenkeeper badge](https://badges.greenkeeper.io/krainboltgreene/pubway.js.svg)](https://greenkeeper.io/)

Lets say you have four nodes in a system:

  - Client A
  - Client B
  - Server C
  - Database D

These four nodes go through these two scenarios:

  1. Client A sends a change request to Server C which applies the change to Database D and responds with the new data.
  2. Client B sends a change request to Server C which applies the change to Database D and responds with the new data.

Both scenarios end with each client missing the changed data the other made. There are two ways to combat this obstacle:

  - The Client periodically asks for the subset or set of data. (Polling)
  - The Client is told of the subset that changed. (Publish/Subscribe)

Assuming you've decided the latter option is the correct choice you now have the task of figuring out how you're going to publish/subscribe and the application layer protocol for handling these messages. For example, one problem you'll encounter is that messages can have a content limitation. Pusher for example has 10kB message limit. Since data can be variable in size I don't think it's a good idea to assume we can send the entire resource "up the wire".

I will leave the former problem up to the market (Pusher, Firebase, etc). The latter problem is something I can solve! Now that we've got the situation laid out here is what pubway.js does:

pubway.js is a SDK for publish/subscribe sockets or an application layer protocol for the messages. pubway.js is told the data stores your client has and how to initiate state changes. An example would be a server telling clients of an account changing it's name:

```
GET redux:/resources/accounts/f26c1cb0-c7a1-44a7-8b72-2843568406bd/name
```

Seem similar? It matches the first line in an HTTP request! Here's the pattern broken down:

```
intent protocol:path
```

  - **intent**: One of `GET` or `DELETE`, where `GET` means "there is data you don't have" and `DELETE` means "This data no longer exists".
  - **protocol**: The adapter to use on the client side, can be anything. Unknown adapters are ignored.
  - **path**: This is intended to be the path of a tree. For example, Falcor takes an array of values `["projects", 241235, "title"]` and is passed `GET falcor:/projects/241235/title`.

Here's what a redux-based pubway usage would look like:

``` javascript
import pusher from "pusher-js"
import pubway from "pubway"

pusher.listen("updates-channel", pubway({
  redux (verb, path) {
    return store.dispatch(changeResources(verb, path))
  }
}))
```

Okay, so what if path contains confidential information? Well we can still operate much the same way:

```
GET redux:/jwt/e257e5f087ff1490b417412f7f3d49f74fbaad1b188f0e3588e70e0c9a49cc7a
```

And now here's what our adapter looks like:

``` javascript
import pusher from "pusher-js"
import pubway from "pubway"

import decode from "./decode"

pusher.listen("updates-channel", pubway({
  redux (verb, path) {
    return store.dispatch(changeEncryptedResources(verb, path))
  }
}))
```


[BADGE_TRAVIS]: https://img.shields.io/travis/krainboltgreene/pubway.js.svg?maxAge=2592000&style=flat-square
[BADGE_VERSION]: https://img.shields.io/npm/v/pubway.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/krainboltgreene/pubway.js.svg?maxAge=2592000&style=flat-square
