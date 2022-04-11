# "Animon" Mobile App

## Project summary
This is the final project I completed to graduate from the Northcoders bootcamp - it is a group project that I and 5 other bootcamp students planned and developed together. The mobile app is a gamified education app for children; loosely inspired by Pokemon Go, the app includes a list of target animals for children to find while out and about in nature. They then take photos of the animals using their device's camera in-app, and image recognition software confirms if they have successfully found a target animal. A map feature enables users to explore locations where they have previously found animals. Users can earn badges based on the number of animals they have found. 

The app is built with React Native using the Expo framework, and styled with a combination of NativeBase styled components and custom CSS. The project makes use of a NoSQL cloud backend hosted on Firestore, and utilises secure Firebase authentication. Photos are compressed and then stored on Firestore Cloud Storage. We utilised the Google Cloud Vision API for image recognition, and Expo Location and React Native Maps for the maps feature.

## App demo
A demo video of the app in action will be available here very soon!

## Technologies and tools used
### Front-end
* React Native
* Expo framework
* A combination of NativeBase styled components and custom CSS
* Expo Camera and Expo Image Manipulator to access the device's camera and compress photos prior to upload
* Expo Location and React Native maps for the maps feature
### Back-end and authentication
* Firestore and Firestore Cloud Storage
* Firebase
### Third-party APIs
* Google Cloud Vision API for image recognition

## Local setup
Please note that the app will not function locally because the image recognition API is integral to the functionality of the app, and the API key has been shut-down to avoid incurring costs. The Firestore and Firebase integration has also been removed as the project is not in production. 

I would encourage you to view the video linked above for a demonstration of the app in action!
