import createDuck from "../../lib/duck/remoteduck"
import Messages from "../../lib/api/messages.js"



export default createDuck({
    namespace: 'content',
    store: 'chatGroups',
    fetchCallback: (options) => Messages.get(options)
})