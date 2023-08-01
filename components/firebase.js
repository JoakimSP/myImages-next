// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAq6ApNDdCioozhVtZqFyizRs18-5E2d5I",
  authDomain: "spprod-myimages.firebaseapp.com",
  projectId: "spprod-myimages",
  storageBucket: "spprod-myimages.appspot.com",
  messagingSenderId: "416740044535",
  appId: "1:416740044535:web:df97eb91449c3ca9a22df2",
  measurementId: "G-CPJ9893M0M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
/* const analytics = getAnalytics(app); */
export const storage = getStorage(app)