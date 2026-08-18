export function formatMessageTime(date){
    if(!date){
        return ""
    }

    return date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit"
    })
}

export function getMessageDateLabel(date){
    if(!date){
        return "";
    }
    const today = new Date();

    const messageDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    )

    const todayDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );

    const difference = todayDate.getTime() - messageDate.getTime();

    const oneDay = 24 * 60 * 60 * 1000;

    if(difference === 0){
        return "Today"
    }
    if(difference === oneDay){
        return "Yesterday"
    }

    return date.toLocaleDateString([], {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}