import { useState, useRef } from "react"
import Button from "../common/Button.jsx"
import { Send } from "lucide-react"
import { useAuth } from "../../context/AuthContext.jsx"
import { sendMessage } from "../../firebase/chat.js"
import { setUserTyping } from "../../firebase/typing.js"

function MessageInput(){
    const {user} = useAuth();

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const typingTimeoutRef = useRef(null);

    function handleMessageChange(e){
        const value = e.target.value;

        setMessage(value);

        if(!user){
            return;
        }

        if(value.trim()){
            setUserTyping(user.uid, true);

            clearTimeout(typingTimeoutRef.current);

            typingTimeoutRef.current = setTimeout(() => {
                setUserTyping(user.uid, false);
            }, 1000);
        }else{
            clearTimeout(typingTimeoutRef.current);
            setUserTyping(user.uid, false);
        }
    }

    async function handleSubmit(e){
        e.preventDefault();

        const trimmedMessage = message.trim();

        if(!trimmedMessage || loading){
            return;
        }
        
        try{
            setLoading(true);

            await sendMessage(trimmedMessage, user);
            
            console.log("message sent")
            setMessage("")
        }catch(error){
            console.error("Failed to send message:", error);
        }finally{
            setLoading(false)
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
                    onChange={handleMessageChange}
                    placeholder="Type a message..."
                    className="message-input"
                />

                <Button 
                    variant="primary"                
                    type="submit"
                    className="message-send-btn"
                    disabled={loading}
                >
                    <Send className="send-btn-icon" strokeWidth={2.5} />
                </Button>
            </form>
        </div>
    )
}
export default MessageInput