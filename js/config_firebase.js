import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCG-wk1XuYnss2PNy81G2VQUL373MnX3E0",
  authDomain: "ban-of-storm.firebaseapp.com",
  projectId: "ban-of-storm",
  storageBucket: "ban-of-storm.appspot.com",
  messagingSenderId: "999067934263",
  appId: "1:999067934263:web:b6c32c28a7fa3a85c6a9b2",
};

var arrImgHeroes;
var arrUrlHeroes = {};
var jsonUrlBlackList;

const app = initializeApp(firebaseConfig);

// Get type FirebaseStorage
const storage = getStorage(app, app.storageBucket);

// Get type StorageReference
const storageRef = ref(storage, "img");
const jsonRef = ref(storage, "json");
// const storageRef = ref(storage, "img/Abathur.png");

export function fetchUrlsImg() {
  return new Promise((resolve, reject) => {
    listAll(storageRef).then((r) => {
      arrImgHeroes = r.items.map((item) => {
        const key = item.name.substring(0, item.name.lastIndexOf("."));
        const value = item._location.path_;
        return { [key]: value };
      });

      // Download Promises
      let promises = arrImgHeroes.map((obj) => {
        const [key] = Object.keys(obj);
        const path = obj[key];

        return getDownloadURL(ref(storage, path)).then((url) => {
          arrUrlHeroes[key] = url;
        });
      });

      promises.push(
        getDownloadURL(ref(jsonRef, "blacklist.json")).then((url) => {
          jsonUrlBlackList = url;
        })
      );

      // Wait for all Promises DownloadURL
      Promise.all(promises)
        .then(() => {
          resolve([arrUrlHeroes, jsonUrlBlackList]);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}
