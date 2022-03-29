import db from "../../config/firestore";
import { doc, getDoc } from "firebase/firestore";

async function getAllAnimals() {
  const docRef = doc(db, "animals", "all-animals");
  const docSnap = await getDoc(docRef);
  console.log(docSnap.data());
  return docSnap.data();
}

export default getAllAnimals;
