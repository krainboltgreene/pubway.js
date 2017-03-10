# pushSet

Lets say you have four nodes in a system:

  - Client A
  - Client B
  - Server C
  - Server D

And you have two scenarios:

  1. Client A, with a local partial mirror of the data on Server C and D, makes a change to Server C and D's data.
  2. Client B make a change to Server C and D's data.

Scenario 2 ends with Client A out of sync. There are two ways to combat this obstacle one of two ways:

  - The Client periodically asks for the subset or set of data. (Pull Polling)
  - The Client is told of new data. (Push Polling)

Assuming you've decided the latter option is the correct choice you now have the task of figuring out how you're going to publish/subscribe and the way it's going to work.

I will leave the former problem up to the market (Pusher, Firebase, etc). The latter problem is something I can solve! Further you'll encounter that publishes have a content limitation. Pusher for example has 10kB message limit. Since data can be variable in size I don't think it's a good idea to send the entire resource "up the wire". We're now required to design the minimum viable payload to get the maximum amount of signaling to the clients.

Now that we've got the situation laid out here is what pushSet does:

pushSet is a SDK for publish/subscribe connects and a application layer protocol for the messages. pushSet is told the data stores your client has and how to initiate state changes. The way pushSet knows what to do is based on the application layer protocol:

When the server state changes it sends a payload that matches this pattern:

```
intent protocol:path
```

An example would be an account changing it's name:

```
GET redux:/resources/accounts/f26c1cb0-c7a1-44a7-8b72-2843568406bd/name
```

Seem similar? Yes, it matches the first line in an HTTP request!

Here's a breakdown of the application layer protocol:

  - **intent**: One of `GET` or `DELETE` where `GET` means "there is data you don't have" and `DELETE` means "This data shouldn't exist".
  - **protocol**: The adapter to use on the client side, can be anything. Unknown adapters are ignored.
  - **path**: This is intended to be the path of a tree. For example, Falcor takes an array of values `["projects", 241235, "title"]` and is passed `GET falcor:/projects/241235/title`.

Here's what a redux based pushSet usage would look like:

``` javascript
import pusher from "pusher-js"
import pushSet from "pushSet"

pusher.listen("updates-channel", pushSet({
  redux ([verb, path]) {
    return store.dispatch(pushSetResources(verb, path))
  }
}))
```

[BADGE_TRAVIS]: https://img.shields.io/travis/krainboltgreene/pushSet.js.svg?maxAge=2592000&style=flat-square
[BADGE_VERSION]: https://img.shields.io/npm/v/pushSet.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/krainboltgreene/pushSet.js.svg?maxAge=2592000&style=flat-square
