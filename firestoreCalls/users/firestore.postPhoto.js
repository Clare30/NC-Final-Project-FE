import { getStorage, ref, uploadBytes } from "firebase/storage";

export default async function postPhoto(uid, photo) {
  const storage = getStorage();
  const storageRef = ref(storage, "photos/test2.jpg");

  // 'file' comes from the Blob or File API
  await uploadBytes(storageRef, photo);
}


// const uploadImage = async () => {
//   setIsItemUploading(true);
//   const blob = await new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.onload = function () {
//       resolve(xhr.response);
//     };
//     xhr.onerror = function (err) {
//       console.log(err);
//       reject(new TypeError(“Network request failed”));
//     };
//     xhr.responseType = “blob”;
//     xhr.open(“GET”, phoneImageUri, true);
//     xhr.send(null);
//   });
//   const reference = ref(storage, `images/${uuid.v4()}.jpeg`);
//   try {
//     const snapshot = await uploadBytes(reference, blob);
//     blob.close();
//     const uri = `gs://${snapshot.metadata.bucket}/${snapshot.metadata.fullPath}`;
//     return uri;
//   } catch (err) {
//     setIsItemUploading(false);
//     alert(“Image failed to upload!“);
//     console.log(err);
//   }
// };