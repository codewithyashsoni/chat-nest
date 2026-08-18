import { useState } from "react"
import Button from "../common/Button.jsx"
import { Send } from "lucide-react"
import { useAuth } from "../../context/AuthContext.jsx"
import { sendMessage } from "../../firebase/chat.js"

function MessageInput(){
    const {user} = useAuth();

    const [message, setMessage] = useState("")

    async function handleSubmit(e){
        e.preventDefault();
        console.log("enterd")

        const trimmedMessage = message.trim();

        if(!trimmedMessage){
            return;
        }

        console.log("after trimmed");
        
        try{
            await sendMessage(trimmedMessage, user);
            console.log("message sent")
            setMessage("")
        }catch(error){
            console.error("Failed to send message:", error);
        }
    }

    return(
        <div className="message-input-container">
            <form 
                onSubmit={handleSubmit}
                className="message-input-form"
            >
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="message-input"
                />

                <Button 
                    variant="primary"                
                    type="submit"
                    className="message-send-btn"
                >
                    <Send className="send-btn-icon" strokeWidth={2.5} />
                </Button>
            </form>
        </div>
    )
}
export default MessageInput