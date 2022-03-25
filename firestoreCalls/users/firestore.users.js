import db from "../../config/firestore";
import { doc, setDoc } from "firebase/firestore";

function addNewUser(uid) {
  async function addUserDoc(db) {
    const countsData = {
      total_count: 0,
    };
    const photosData = {};
    // Add a new document in collection "users" with title uid
    await setDoc(doc(db, "users", `${uid}`, "animals", "counts"), countsData);
    await setDoc(doc(db, "users", `${uid}`, "animals", "photos"), photosData);
  }
  addUserDoc(db);
}

export default addNewUser;
