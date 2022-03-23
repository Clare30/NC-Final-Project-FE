import db from "../../config/firestore";
import { doc, setDoc } from "firebase/firestore";

function addNewUser(uid, email) {
  async function addUserDoc(db) {
    const data = {
      email: `${email}`,
      animals_caught: {},
    };
    // Add a new document in collection "users" with title uid
    const res = await setDoc(doc(db, "users", `${uid}`), data);
  }
  addUserDoc(db);
}

export default addNewUser;
