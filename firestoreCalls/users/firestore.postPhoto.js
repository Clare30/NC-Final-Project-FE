import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import animals from "../../graphics/animals";
const testData = {
  image_url:
    "https://firebasestorage.googleapis.com/v0/b/animon-c914f.appspot.com/o/photos%2FGrWhwew1tPP6cEtUUqSGPqBjn4H2%2F1648224143330.jpg?alt=media&token=a0126739-c134-4c22-bd2f-262acfd71529",
  responses: [
    {
      labelAnnotations: [
        {
          description: "Frog",
          mid: "/m/09ld4",
          score: 0.920323,
          topicality: 0.920323,
        },
        {
          description: "Tablet computer",
          mid: "/m/0bh9flk",
          score: 0.9165943,
          topicality: 0.9165943,
        },
        {
          description: "Green",
          mid: "/m/038hg",
          score: 0.9137645,
          topicality: 0.9137645,
        },
        {
          description: "True frog",
          mid: "/m/021csx",
          score: 0.9020818,
          topicality: 0.9020818,
        },
        {
          description: "Toad",
          mid: "/m/09ldn",
          score: 0.86955184,
          topicality: 0.86955184,
        },
        {
          description: "Gadget",
          mid: "/m/02mf1n",
          score: 0.8665109,
          topicality: 0.8665109,
        },
        {
          description: "Communication Device",
          mid: "/m/0glmwd6",
          score: 0.8558656,
          topicality: 0.8558656,
        },
        {
          description: "Toy",
          mid: "/m/0138tl",
          score: 0.83946854,
          topicality: 0.83946854,
        },
        {
          description: "Output device",
          mid: "/m/044_87",
          score: 0.8339447,
          topicality: 0.8339447,
        },
        {
          description: "Amphibian",
          mid: "/m/0hjf",
          score: 0.7782696,
          topicality: 0.7782696,
        },
      ],
    },
  ],
};
export default async function postPhoto(uid, uri, base64) {
  const testing = true;
  //If testing is false will run actual code
  if (!testing) {
    //Give an uploading screen here

    const animalName = await getImageTags(base64).then((imageTags) => {
      const animalName = checkMatch(imageTags);
      //Display which animal it is to the user (Function to be written)
      giveUserTheInfo();
      return animalName;
    });
    if (animalName) {
      const imageURL = await uploadAndGetURL(uid, uri);
      postAnimal(animalName, imageURL);
    } else {
      console.log("Must be rock");
    }

    //this is run when testing it true
    /*
    Skips all database and image recognition to 
    speed things up and not use calls which are limited
    */
  } else {
    const imageTags = testData;
    const image_url = testData.image_url;
    const animalName = checkMatch(imageTags);
    if (animalName === null) {
      //Handle animal not found
      console.log("not found");
    } else {
      postAnimal(animalName, image_url);
      //Handle the animal being found
    }
  }
}

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

const postAnimal = (animalName, imageURL) => {
  console.log(imageURL);
  console.log(animalName);
};

const giveUserTheInfo = (animalName) => {
  console.log(animalName);
};
