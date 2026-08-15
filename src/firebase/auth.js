import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"

import app from "./firebase.js"

const auth = getAuth(app);

async function signUpUser(name, email, password){
    const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

    await updateProfile(userCredentials.user, {
        displayName: name
    });

    return userCredentials.user;
}
export { signUpUser }