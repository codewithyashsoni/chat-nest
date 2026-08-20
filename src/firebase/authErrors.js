function getAuthErrorMessage(error){
    switch (error.code) {
        case "auth/email-already-in-use":
            return "An account with this email already exists.";

        case "auth/invalid-email":
            return "Please enter a valid email address.";

        case "auth/weak-password":
            return "Your password is too weak.";

        case "auth/network-request-failed":
            return "Unable to connect. Please check your internet connection.";

        case "auth/too-many-requests":
            return "Too many attempts. Please try again later.";

        case "auth/invalid-credential":
            return "Incorrect email or password.";

        case "auth/user-disabled":
            return "This account has been disabled.";

        default:
            return "Something went wrong. Please try again.";
    }
}
export default getAuthErrorMessage