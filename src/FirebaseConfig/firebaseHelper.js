import { db, auth } from "./firebaseConfig";
import { get, ref,set,update } from "firebase/database";

export const getUserData = async () => {
  if (auth.currentUser) {
    try {
      var dbRef = ref(db, "admins/" + auth.currentUser.uid);
      const snapshot = await get(dbRef);
      const userData = snapshot.val();
      return userData;
    } catch (error) {
      if (error.message === "Permission denied") {
        try {
          dbRef = ref(db, "stationControler/" + auth.currentUser.uid);
          const snapshot = await get(dbRef);
          const userData = snapshot.val();
          return userData;
        } catch (err) {
          // Handle the error here if needed
          console.error(err);
        }
      } else {
        // Handle other errors if needed
        console.error(error);
      }
    }
  }
};

export const setData= async (path,data)=>{
  try{
  const dbRef = ref(db, path);
  const result = await set(dbRef,data)
  return result
}
catch (err){
  console.log(err)
  return err
}
}


export const updateData= async (path,data)=>{
  try{
  const dbRef = ref(db, path);
  const result = await update(dbRef,data)
  return result
}
catch (err){
  console.log(err)
  return err
}
}



export const getDataOnce= async (path)=>{
  try{
  const dbRef = ref(db, path);
  const result = await get(dbRef)
  return result.val()
}
catch (err){
  console.log(err)
  return err
}
}
