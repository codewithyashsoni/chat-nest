import { useState, useEffect, useRef } from "react"
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
        clearTimeout(typingTimeoutRef.current);

        if(!value.trim()){
            setUserTyping(user.uid, user.displayName, false);

            return;
        }

        setUserTyping(user.uid, user.displayName, true);

        typingTimeoutRef.current = setTimeout(() => {
            setUserTyping(user.uid, user.displayName, false);
        }, 1500);
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

            clearTimeout(typingTimeoutRef.current);

            await setUserTyping(user.uid, user.displayName, false);

            setMessage("")
        }catch(error){
            console.error("Failed to send message:", error);
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        return () => {
            clearTimeout(typingTimeoutRef.current);

            if(user){
                setUserTyping(
                    user.uid,
                    user.displayName,
                    false
                );
            }
        };
    }, [user]);

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