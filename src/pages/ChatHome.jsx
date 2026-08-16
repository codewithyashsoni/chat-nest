import ChatNavbar from "../components/chat/ChatNavbar.jsx"
import MessageList from "../components/chat/MessageList.jsx"

function ChatHome(){
    return(
        <div className="chat-page">
            <ChatNavbar />
            <div className="chat-container">
                
                <MessageList />

            </div>
        </div>
    )
}
export default ChatHome