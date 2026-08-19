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
    console.log("Entered subscribeToOnlineCount");
    const presenceRef = ref(database, "presence");

    const unsubscribe = onValue(presenceRef, (snapshot) => {
        console.log("Presence snapshot exists:", snapshot.exists());
        console.log("Presence data:", snapshot.val());

        const presenceData = snapshot.val();

        if(!presenceData){
            callback(0);
            return;
        }

        const onlineCount = Object.values(presenceData)
            .filter((user) => user.online === true)
            .length;


        console.log("Online count:", onlineCount);

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