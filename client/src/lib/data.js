import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDoc, doc, setDoc } from "firebase/firestore";

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

export const sendAuth = () => {return auth;}

export const getUsername = async (uid) =>
{
  const docRef = doc(usersCollection, uid )
  const docSnap = await getDoc(docRef);

  if (docSnap.exists())
  {
    return docSnap.data().username;
  }
  else{
    return "Error"
  }

}

export const setUsername = async (uid, username) =>
{
  const docRef = doc(usersCollection, uid )
  await setDoc(docRef, {username: username});



}

export const login = async (email, password, setError) => {
  try {
    if (email === "")
    {
      setError("Email is empty")
      return false
    }
    if (password === "")
      {
        setError("Password is empty")
        return false
      }
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    setError("")
    console.log(auth)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const signup = async (email, password, name, setError) => {
  try {
    if (email === "")
    {
      setError("Email is empty")
      return false
    }
    if (password === "")
      {
        setError("Password is empty")
        return false
      }
    if (name === "")
      {
        setError("Username is empty")
        return false
      }
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    setUsername(userCred.user.uid, name);

    return true
  } catch (error) {
    if (error.code === "auth/email-already-in-use")
    {
      setError("Email already in use")
    }
    if (error.code === "auth/weak-password")
    {
      setError("Password is too weak (min 6 characters)")
    }
    if (error.code === "auth/invalid-email")
    {
      setError("Invalid email")
    }
    if (error.code === "auth/operation-not-allowed")
    {
      setError("Operation not allowed")
    }
    console.log(error)
    return false
  }

}

export const logout = async (setUser) => {
  try {
    await auth.signOut();
  } catch (error) {
    console.log(error)
  }
}