import { ref, onDisconnect, set, onValue, serverTimestamp } from "firebase/database"

import { database } from "./database.js"

function setUserOnline(userId){
    const userStatusRef = ref(database, `presence/${userId}`);

    const connectedRef = ref(database, ".info/connected");

    const unsubscribe = onValue(connectedRef, (snapshot) => {
        if(snapshot.val() !== true){
            return;
        }

        onDisconnect(userStatusRef)
            .set({
                online :false,
                lastSeen: serverTimestamp()
            })
            .then(() => {
                return set(userStatusRef, {
                    online: true,
                    lastSeen: serverTimestamp()
                });
            })
            .catch((error) => {
                console.error("Failed to set presence:", error)
            });
    });

    return unsubscribe;
}

function subscribeToOnlineCount(callback){
    const presenceRef = ref(database, "presence");

    const unsubscribe = onValue(presenceRef, (snapshot) => {

        const presenceData = snapshot.val();

        if(!presenceData){
            callback(0);
            return;
        }

        const onlineCount = Object.values(presenceData)
            .filter((user) => user.online === true)
            .length;

        callback(onlineCount);
    },
    (error) => {
        console.error("Failed to read presence", error);
    }
    );

    return unsubscribe
}

function setUserOffline(userId){
    const userStatusRef = ref(database, `presence/${userId}`);

    return set(userStatusRef, {
        online: false,
        lastSeen: serverTimestamp()
    })
}

export { setUserOnline, subscribeToOnlineCount, setUserOffline }