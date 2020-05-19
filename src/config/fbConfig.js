import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBqyuDPnKvDsJkRD8G1bT96N4XYy-2Y8_I",
  authDomain: "timecatcher-46ce0.firebaseapp.com",
  databaseURL: "https://timecatcher-46ce0.firebaseio.com",
  projectId: "timecatcher-46ce0",
  storageBucket: "timecatcher-46ce0.appspot.com",
  messagingSenderId: "794337642758",
  appId: "1:794337642758:web:1669ae22384f9bd8eeb687",
  measurementId: "G-FPC2JJ4YZ9"
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export default firebase;