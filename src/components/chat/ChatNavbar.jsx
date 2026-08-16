import { MessagesSquare, LogOut } from "lucide-react"
import Button from "../common/Button.jsx"

function ChatNavbar(){
    return(
        <div className="chat-navbar-container">
            <div className="chat-navbar">
                
                <div className="chat-navbar-logo">
                    <MessagesSquare className="chat-navbar-logo-icon" strokeWidth={2.5} />
                    <span className="chat-navbar-logo-text">ChatNest</span>
                </div>

                <div className="chat-navbar-actions">
                    <div className="chat-online-status">
                        <span className="online-dot"></span>
                        <span>4 online</span>
                    </div>

                    <Button variant="danger">
                        <LogOut strokeWidth={2} />
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default ChatNavbar