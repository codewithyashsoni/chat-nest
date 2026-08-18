import { addDoc, collection, serverTimestamp } from "firebase/firestore"
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

export { sendMessage }