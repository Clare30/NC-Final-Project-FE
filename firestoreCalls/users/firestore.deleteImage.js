import db from "../../config/firestore";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";

const deleteImage = async (user, imageUrl, animalName) => {
  const removing = {};

  removing[animalName] = arrayRemove(imageUrl);
  const docRef = doc(db, "users", user.uid, "animals", "photos");
  return await updateDoc(docRef, removing);
};

export default deleteImage;
