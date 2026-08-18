import { addDoc, collection, serverTimestamp, onSnapshot, orderBy, query } from "firebase/firestore"
import { db } from "./firebase.js"

async function sendMessage(text, user){
    const messageRef = await addDoc(
        collection(db, "messages"),
        {
            text,
            senderId: user.uid,
            senderName: user.displayName,
            timestamp: serverTimestamp()
        }
    )
    return messageRef;
}

function subscribeToMessages(callback){
    const messagesQuery = query(
        collection(db, "messages"),
        orderBy("timestamp", "asc")
    )

    return onSnapshot(messagesQuery, (snapshot) => {
        const messages = snapshot.docs.map((doc) => {
            const data = doc.data();

            return {
                id: doc.id,
                ...data,
                timestamp: data.timestamp
                    ? data.timestamp.toDate()
                    : null,
            };
        });

        callback(messages);
    })
}

export { sendMessage, subscribeToMessages }