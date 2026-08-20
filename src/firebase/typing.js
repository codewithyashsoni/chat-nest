import { ref, set, onValue } from "firebase/database"

import { database } from "./database.js"

function setUserTyping(userId, isTyping){
    const typingRef = ref(database, `typing/${userId}`);

    return set(typingRef, {
        typing: isTyping
    });
}

function subscribeToTyping(callback){
    const typingRef = ref(database, "typing");

    const unsubscribe = onValue(typingRef, (snapshot) => {
        const typingData = snapshot.val();

        if(!typingData){
            callback([]);
            return;
        }

        const typingUsers = Object.entries(typingData)
            .filter(([userId, data]) => data.typing === true)
            .map(([userId]) => userId);

        callback(typingUsers);
    });

    return unsubscribe;
}

export { setUserTyping, subscribeToTyping }