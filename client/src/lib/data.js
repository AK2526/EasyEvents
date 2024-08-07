import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDoc, doc, setDoc, addDoc, query, where, getDocs, getCountFromServer } from "firebase/firestore";

import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD6PPDvvZyJTghD4qxw81ECji7U9BsOtN0",
  authDomain: "easy-events-alank.firebaseapp.com",
  projectId: "easy-events-alank",
  storageBucket: "easy-events-alank.appspot.com",
  messagingSenderId: "576369314308",
  appId: "1:576369314308:web:b2f118b406ce7306a44351",
  measurementId: "G-SDJW9FCGW4"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const usersCollection = collection(db, "users");
const eventsCollection = collection(db, "events");

export const sendAuth = () => { return auth; }

export const getUsername = async (uid) => {

  console.log("Getting username")
  const docRef = doc(usersCollection, uid)
  const docSnap = await getDoc(docRef);


  if (docSnap.exists()) {
    return docSnap.data().username;
  }
  else {
    return "Error"
  }

}

export const setUsername = async (uid, username) => {
  const docRef = doc(usersCollection, uid)
  await setDoc(docRef, { username: username });



}

export const login = async (email, password, setError) => {
  try {
    if (email === "") {
      setError("Email is empty")
      return null
    }
    if (password === "") {
      setError("Password is empty")
      return null
    }
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    setError("")
    console.log(auth)
    return userCred
  } catch (error) {
    console.log(error)
    return null
  }
}

export const signup = async (email, password, name, setError) => {
  try {
    if (email === "") {
      setError("Email is empty")
      return null
    }
    if (password === "") {
      setError("Password is empty")
      return null
    }
    if (name === "") {
      setError("Username is empty")
      return null
    }
    
    const q = await getCountFromServer(query(usersCollection, where("username", "==", name)));
    console.log(q.data().count)
    if (q.data().count > 0)
    {
      setError("Username already in use")
      return null
    }
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    setUsername(userCred.user.uid, name);
    setError("")

    return userCred
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      setError("Email already in use")
    }
    if (error.code === "auth/weak-password") {
      setError("Password is too weak (min 6 characters)")
    }
    if (error.code === "auth/invalid-email") {
      setError("Invalid email")
    }
    if (error.code === "auth/operation-not-allowed") {
      setError("Operation not allowed")
    }
    console.log(error)
    return null
  }

}

export const logout = async (setUser) => {
  try {
    await auth.signOut();
    setUser({ name: "", email: "", userId: "", auth: sendAuth(), loggedIn: false })
  } catch (error) {
    console.log(error)
  }
}

export const addEvent = async (info) => {
  console.log(auth.currentUser)
  const docRef = await addDoc(eventsCollection,
  {name: {a: "yes", b: "no"}})

}

export const eventExists = async (name) => {
  const q = await getCountFromServer(query(eventsCollection, where("name", "==", name)));
  return q.data().count > 0;
}

export const uploadImage = async (file, event_id ) => {
    console.log("UploadImage")
    const storage = getStorage(app);
    const storageRef = ref(storage, 'thumbnails/' + event_id);
    const snapshot = await uploadBytes(storageRef, file);
    return true


  
}

export const getEventId = async () => {
  let ref = doc(eventsCollection);
  return ref.id;
}