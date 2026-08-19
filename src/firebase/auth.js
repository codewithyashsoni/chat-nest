import { getAuth, createUserWithEmailAndPassword, 
    updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth"

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

async function loginUser(email, password){
    const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
    );

    return userCredentials.user;
}

async function logoutUser(){
    await signOut(auth);
}

export { auth, signUpUser, loginUser, logoutUser }