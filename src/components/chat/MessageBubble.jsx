function MessageBubble({text, senderName, timestamp, isOwn}){
    return(
        <div className={`message-row ${isOwn ? "message-row-own" : ""}`}>
            <div className={`message-bubble ${isOwn ? "message-bubble-own" : ""}`}>
                {!isOwn && (
                    <p className="message-sender-name">{senderName}</p>
                )}

                <p className="message-text">
                    {text}
                </p>

                <span className={`message-time ${isOwn ? "message-time-own" : ""}`}>
                    {timestamp}
                </span>
            </div>
        </div>
    )
}
export default MessageBubble