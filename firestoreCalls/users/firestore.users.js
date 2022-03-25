import db from "../../config/firestore";
import { doc, setDoc } from "firebase/firestore";

function addNewUser(uid) {
  async function addUserDoc(db) {
    const countsData = {
      total_count: 0,
      puffin: 0,
      owl: 0,
      robin: 0,
      deer: 0,
      squirrel: 0,
      hedgehog: 0,
      pheasant: 0,
      butterfly: 0,
      fox: 0,
      frog: 0,
    };
    const photosData = {
      puffin: [],
      owl: [],
      robin: [],
      deer: [],
      squirrel: [],
      hedgehog: [],
      pheasant: [],
      butterfly: [],
      fox: [],
      frog: [],
    };
    // Add a new document in collection "users" with title uid
    await setDoc(
      doc(db, "users", `${uid}`, "animals", "counts"),
      countsData
    );
    await setDoc(
      doc(db, "users", `${uid}`, "animals", "photos"),
      photosData
    );
  }
  addUserDoc(db);
}


export default addNewUser;
