import { MessagesSquare } from "lucide-react"

function MessageEmptyState(){
    return(
        <div className="message-empty-state">
            <MessagesSquare className="message-empty-icon" strokeWidth={3} />
            <h2>No messages yet</h2>
            <p>Say hi and start the conversation!</p>
        </div>
    )
}
export default MessageEmptyState