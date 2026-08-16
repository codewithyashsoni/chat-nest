function MessageBubble({text, senderName, timeStamp, isOwn}){
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
                    {timeStamp}
                </span>
            </div>
        </div>
    )
}
export default MessageBubble