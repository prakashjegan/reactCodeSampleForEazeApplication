import createDuck from "../../../lib/duck/remoteduck";
import Messages from "../../../lib/api/messages";

export default createDuck({
    namespace: 'content',
    store: 'messageDetail',
    fetchCallback: (option) => Messages.getMessageDetail(option)
})