import pusher from "pusher-js"
import router from "../pubway"

pusher.listen("changes", router)
