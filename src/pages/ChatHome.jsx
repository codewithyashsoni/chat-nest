import { useEffect } from "react"
import { useAuth } from "../context/AuthContext.jsx"

import ChatNavbar from "../components/chat/ChatNavbar.jsx"
import MessageList from "../components/chat/MessageList.jsx"
import MessageInput from "../components/chat/MessageInput.jsx"

import { setUserOnline } from "../firebase/presence.js"

function ChatHome(){
    const {user} = useAuth();

    useEffect(() => {
        if(!user){
            return;
        }

        const unsubscribe = setUserOnline(user.uid);
        
        return unsubscribe
    }, [user])

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