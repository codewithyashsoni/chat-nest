import { getDatabase } from "firebase/database"
import  app  from "./firebase.js"

const database = getDatabase(app);

export { database };