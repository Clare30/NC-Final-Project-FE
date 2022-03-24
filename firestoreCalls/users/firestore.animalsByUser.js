import db from "../../config/firestore";
import { doc, getDoc } from "firebase/firestore";

const getAnimalsByUserId = (user) => {
  console.log(user);
  const docRef = doc(db, "users-animals", `${user.uid}`, "animals", "photos");
  getDoc(docRef).then((res) => {
    console.log(res.data());
    return res.data();
  });
};

export default getAnimalsByUserId;
