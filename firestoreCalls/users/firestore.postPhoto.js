import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default async function postPhoto(uid, uri) {
  const storage = getStorage();
  const response = await fetch(uri);
  const blob = await response.blob();
  const storageRef = ref(storage, `photos/${uid}/${Date.now()}.jpg`);

  // 'file' comes from the Blob or File API
  const res = await uploadBytes(storageRef, blob);
  const downloadURL = await getDownloadURL(storageRef)
  console.log(downloadURL);
  return res;
}
