import { getStorage, ref, uploadBytes } from "firebase/storage";

export default async function postPhoto(uid, photo) {
  const storage = getStorage();
  const storageRef = ref(storage, "photos/test.jpg");

  // 'file' comes from the Blob or File API
  await uploadBytes(storageRef, photo);
}
