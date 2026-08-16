import ChatNavbar from "../components/chat/ChatNavbar.jsx"
import MessageList from "../components/chat/MessageList.jsx"
import MessageInput from "../components/chat/MessageInput.jsx"

function ChatHome(){
    return(
        <div className="chat-page">
            <ChatNavbar />
            <div className="chat-container">
                
                <MessageList />

            </div>
            <MessageInput />
        </div>
    )
}
export default ChatHome