import { useState } from "react"
import Button from "../common/Button.jsx"
import { Send } from "lucide-react"

function MessageInput(){
    const [message, setMessage] = useState("")

    return(
        <div className="message-input-container">
            <form className="message-input-form">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="message-input"
                />

                <Button 
                    variant="primary"                
                    type="button"
                    className="message-send-btn"
                >
                    <Send className="send-btn-icon" strokeWidth={2.5} />
                </Button>
            </form>
        </div>
    )
}
export default MessageInput