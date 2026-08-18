export function formatMessageTime(date){
    if(!date){
        return ""
    }

    return date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit"
    })
}