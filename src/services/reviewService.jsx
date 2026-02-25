import { db } from "./firebase";
import {collection, addDoc, getDocs, query, where, orderBy, serverTimestamp} from "firebase/firestore";

export const addReview = async(productId , userId, userName, rating, comment) => {
    return await addDoc(collection(db, "reviews"), {
        productId : Number(productId),
        userId,
        userName,
        rating : Number(rating),
        comment,
        createdAt : serverTimestamp()
    })
}

export const getReviewsByProduct = async(productId) => {
    const q = query(collection(db, "reviews"),
              where("productId", "==" , Number(productId)),
              orderBy("createdAt", "desc") 
)
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
}
