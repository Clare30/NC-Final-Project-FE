import { arrayUnion, doc, increment, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as Location from "expo-location";
import db from "../../config/firestore";
import animals from "../../graphics/animals";
export default async function postPhoto(uid, uri, base64, animalCounts, setAnimalCounts, setIsMatch) {
  const uploadAndGetURL = async (uid, uri) => {
    const storage = getStorage();
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, `photos/${uid}/${Date.now()}.jpg`);

    // 'file' comes from the Blob or File API
    const uploadedImage = await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);
  };

  const getImageTags = async (base64) => {
    let body = JSON.stringify({
      requests: [
        {
          features: [{ type: "LABEL_DETECTION", maxResults: 10 }],
          image: {
            content: base64,
          },
        },
      ],
    });
    let response = await fetch("https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDNpGP52g4D0eVBHXmohzglMLMk1qUvhVc", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: body,
    });
    return await response.json();
  };

  const checkMatch = (imageTags) => {
    const animalNames = Object.keys(animals);
    let animalName = null;
    for (let i = 0; i < imageTags.responses[0].labelAnnotations.length; i++) {
      if (animalNames.includes(imageTags.responses[0].labelAnnotations[i].description.toLowerCase())) {
        animalName = imageTags.responses[0].labelAnnotations[i].description.toLowerCase();
        break;
      }
    }
    return animalName;
  };

  const postAnimal = async (animalName, imageURL) => {
    const animalNameLower = animalName.toLowerCase();
    const updatingObjCounts = { total_count: increment(1) };
    updatingObjCounts[animalNameLower] = increment(1);
    const userDocCounts = doc(db, "users", uid, "animals", "counts");
    //Optimistic rendering
    setAnimalCounts((currentCount) => {
      const copyObj = { ...currentCount };
      copyObj[animalNameLower]++ || (copyObj[animalNameLower] = 1);
      copyObj.total_count++;
      return copyObj;
    });
    const { coords } = await Location.getCurrentPositionAsync();
    const location = [coords.latitude, coords.longitude];
    updateDoc(userDocCounts, updatingObjCounts);
    const userDocPhotos = doc(db, "users", uid, "animals", "photos");
    const updatingObjPhotos = {};
    updatingObjPhotos[animalNameLower] = arrayUnion({ imageURL, location });
    updateDoc(userDocPhotos, updatingObjPhotos);
  };

  const giveUserTheInfo = (animalName) => {
    setIsMatch(animalName);
  };

  const animalName = await getImageTags(base64).then((imageTags) => {
    const animalName = checkMatch(imageTags);
    giveUserTheInfo(animalName);
    return animalName;
  });
  if (animalName) {
    const imageURL = await uploadAndGetURL(uid, uri);
    postAnimal(animalName, imageURL, animalCounts);
  } else {
    setIsMatch(null);
  }
}
