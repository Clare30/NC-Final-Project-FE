import db from "../../config/firestore";
import { doc, getDoc } from "firebase/firestore";

const getAnimalsByUserId = (user) => {
  const docRef = doc(db, "users-animals", `${user.uid}`, "animals", "photos");
  getDoc(docRef).then((res) => {
    return res.data();
  });
};

export default getAnimalsByUserId;
