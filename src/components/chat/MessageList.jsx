import { useState, useEffect, useRef } from "react"
import { useAuth } from "../../context/AuthContext.jsx"

import MessageEmptyState from "./MessageEmptyState.jsx"
import MessageBubble from "./MessageBubble.jsx"
import DateDivider from "./DateDivider.jsx"

import {subscribeToMessages} from "../../firebase/chat.js"
import { getMessageDateLabel } from "../../utils/dateUtils.js"
import { subscribeToTyping } from "../../firebase/typing.js"

function MessageList(){
    const {user} = useAuth();

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [typingUsers, setTypingUsers] = useState([]);

    const bottomRef = useRef(null);
    const isNearBottomRef = useRef(true);

    useEffect(() => {
        const unsubscribe = subscribeToMessages((messages) => {
            setMessages(messages);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        const unsubscribe = subscribeToTyping((userIds) => {
            setTypingUsers(userIds)
        });

        return unsubscribe;
    }, []);

    const otherTypingUsers = typingUsers.filter(
        (userId) => userId !== user.uid
    );

    const typingUserNames = otherTypingUsers
        .map((userId) => {
            const message = messages.find(
                (message) => message.senderId === userId
            );
            return message?.senderName;
        })
        .filter(Boolean);

    function handleScroll(e){
        const element = e.currentTarget;

        const distanceFromBottom = 
            element.scrollHeight -
            element.scrollTop -
            element.clientHeight;

        isNearBottomRef.current = distanceFromBottom < 100;
    }

    useEffect(()=>{
        if(bottomRef.current && isNearBottomRef.current){
            bottomRef.current.scrollIntoView({
                behavior: "smooth"
            })
        }
    }, [messages, typingUsers])


    return(
        <div className="message-list-container" onScroll={handleScroll}>
            {loading ? (
                <p>Loading messages</p>
            ) : (
            messages.length <= 0 ? (
                <MessageEmptyState />
            ) : (
                messages.map((message, index) => {
                    const currentDateLabel = getMessageDateLabel(message.timestamp);

                    const previousDateLabel = 
                        index > 0
                        ? getMessageDateLabel(messages[index -1].timestamp)
                        : null;
                        
                    const showDateDivider = currentDateLabel !== previousDateLabel;

                    return(
                        <div key={message.id}>
                            {showDateDivider && (
                                <DateDivider label={currentDateLabel} />
                            )}

                            <MessageBubble
                                text={message.text}
                                senderName={message.senderName}
                                timestamp={message.timestamp}
                                isOwn={message.senderId === user.uid}
                            />
                            
                        </div> 
                    )
                })
            ))}

            {typingUserNames.length > 0 && (
                <div className="typing-indicator">
                    {typingUserNames.length === 1
                        ? `${typingUserNames[0]} is typing...`
                        : typingUserNames.length === 2
                            ? `${typingUserNames[0]} and ${typingUserNames[1]} are typing...`
                            : `${typingUserNames[0]}, ${typingUserNames[1]} and ${typingUserNames.length - 2} others are typing...`
                    }
                </div>
            )}

            <div ref={bottomRef}></div>
        </div>
    )
}
export default MessageList