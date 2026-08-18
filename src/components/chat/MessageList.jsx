import { useState, useEffect } from "react";

import MessageEmptyState from "./MessageEmptyState.jsx"
import MessageBubble from "./MessageBubble.jsx"
import DateDivider from "./DateDivider.jsx"

import {subscribeToMessages} from "../../firebase/chat.js"

function MessageList(){
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = subscribeToMessages((messages) => {
            setMessages(messages);
            setLoading(false);
        });

        return unsubscribe;
    }, [])


    return(
        <div className="message-list-container">
            {loading ? (
                <p>Loading messages</p>
            ) : (
            messages.length <= 0 ? (
                <MessageEmptyState />
            ) : (
                messages.map((message) => (
                    <MessageBubble
                        key={message.id}
                        text={message.text}
                        senderName={message.senderName}
                        timestamp={message.timestamp}
                        isOwn={message.isOwn}
                    />
                ))
            ))}
        </div>
    )
}
export default MessageList