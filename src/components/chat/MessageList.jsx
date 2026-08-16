import MessageEmptyState from "./MessageEmptyState.jsx"
import MessageBubble from "./MessageBubble.jsx"

function MessageList(){
    const messages = [
        {
            id: 1,
            text: "Hey everyone!",
            senderName: "Rahul",
            timestamp: "10:00 AM",
            isOwn: false,
        },
        {
            id: 2,
            text: "Hello Rahul! How are you?",
            senderName: "Yash",
            timestamp: "10:01 AM",
            isOwn: true,
        },
        {
            id: 3,
            text: "I'm doing good. What about you?",
            senderName: "Rahul",
            timestamp: "10:02 AM",
            isOwn: false,
        },
        {
            id: 4,
            text: "I'm good too!",
            senderName: "Yash",
            timestamp: "10:03 AM",
            isOwn: true,
        },
    ];

    return(
        <div className="message-list-container">
            {messages.length <= 0 ? (
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
            )}
        </div>
    )
}
export default MessageList