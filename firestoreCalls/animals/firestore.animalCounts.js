import db from "../../config/firestore";
import { doc, getDoc } from "firebase/firestore";

const getAnimalCounts = (user) => {
  const docRef = doc(db, "users-animals", `${user.uid}`, "animals", "counts");
  return getDoc(docRef).then((res) => {
    return res.data();
  });
};

export default getAnimalCounts;
