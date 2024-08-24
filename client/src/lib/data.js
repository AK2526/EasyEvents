import dayjs from "dayjs";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDoc, doc, setDoc, addDoc, query, where, getDocs, getCountFromServer, orderBy, startAt, limit, startAfter, and, updateDoc } from "firebase/firestore";

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getNearby } from "./address";

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
    setError("green Attempting...")
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    setError("")
    return userCred
  } catch (error) {
    console.log(error)
    setError("Failed to login")
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
    if (q.data().count > 0) {
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
    window.location.reload(false);
  } catch (error) {
    console.log(error)
  }
}

export const addEvent = async (info, event_id) => {
  const docRef = await setDoc(doc(eventsCollection, event_id),
    info)
  return "Success"
}

export const updateEvent = async (info, event_id) => {
  const docRef = doc(eventsCollection, event_id)
  await updateDoc(docRef, info);
  return "Success"
}

export const eventExists = async (name) => {
  const q = await getCountFromServer(query(eventsCollection, where("name", "==", name)));
  return q.data().count > 0;
}

export const uploadImage = async (file, event_id) => {
  const storage = getStorage(app);
  const storageRef = ref(storage, 'thumbnails/' + event_id);
  const snapshot = await uploadBytes(storageRef, file);
  return true



}

export const getEventId = async () => {
  let ref = doc(eventsCollection);
  return ref.id;
}

export const getEventInfo = async (event_id) => {
  const docRef = doc(eventsCollection, event_id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  else {
    return null
  }
}


export const getImageUrl = async (name) => {
  try {
    const storage = getStorage(app);
    const storageRef = ref(storage, 'thumbnails/' + name);
    const url = await getDownloadURL(storageRef);
    return url;
  }
  catch (error) {
    console.log(error)
    return null
  }

}

export const getUpcomingEvents = async (setData) => {
  const q = query(eventsCollection,
    orderBy("date"),
    startAt(dayjs().format("YYYY/MM/DD")),
    limit(10)
  )

  const querySnapshot = await getDocs(q);
  setData([])
  querySnapshot.forEach((doc) => {
    setData(prev => {
      return [...prev, doc]
    });
  });
  return q;
}


export const getPastEvents = async (setData) => {
  const q = query(eventsCollection,
    orderBy("date", "desc"),
    startAfter(dayjs().format("YYYY/MM/DD")),
    limit(10)
  )

  const querySnapshot = await getDocs(q);
  setData([])
  querySnapshot.forEach((doc) => {
    setData(prev => {
      return [...prev, doc]
    });
  });
  return q;
}

export const getNearbyEvents = async (setData) => {
  let cells = getNearby(2);
  if (cells.length == 0) {
    return null
  }
  const q = query(eventsCollection,
    and(where("hexhash", "in", cells),
      where("date", ">=", dayjs().format("YYYY/MM/DD"))),
    limit(10)

  )

  const querySnapshot = await getDocs(q);
  setData([])
  querySnapshot.forEach((doc) => {
    setData(prev => {
      return [...prev, doc]
    });
  });
  return q;
}


export const getNextEvents = async (qu, data, setData, setMoreToLoad) => {
  const q = query(qu, startAfter(data[data.length - 1]));
  const querySnapshot = await getDocs(q);
  setMoreToLoad(false)

  querySnapshot.forEach((doc) => {
    setMoreToLoad(true)
    setData(prev => {
      return [...prev, doc]
    });
  });
  return q;
}

export const getFutureUserPosts = async (uid, setData) => {
  const q = query(eventsCollection,
    orderBy("date"),
    startAt(dayjs().format("YYYY/MM/DD")),
    where("user_id", "==", uid)
  )

  const querySnapshot = await getDocs(q);
  setData([])
  querySnapshot.forEach((doc) => {
    setData(prev => {
      return [...prev, doc]
    });
  });
}

export const getPastUserPosts = async (uid, setData) => {
  const q = query(eventsCollection,
    orderBy("date", "desc"),
    startAt(dayjs().format("YYYY/MM/DD")),
    where("user_id", "==", uid)
  )

  const querySnapshot = await getDocs(q);
  setData([])
  querySnapshot.forEach((doc) => {
    setData(prev => {
      return [...prev, doc]
    });
  });
}