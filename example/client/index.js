import pusher from "pusher-js"
import pushSet from "../pushSet"

pusher.listen("changes", pushSet)
