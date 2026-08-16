import MessageEmptyState from "./MessageEmptyState.jsx"

function MessageList(){
    return(
        <div className="message-list-container">
            <MessageEmptyState />
        </div>
    )
}
export default MessageList