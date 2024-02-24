import firebase from "firebase/app";
import 'firebase/firestore'

if(!firebase.apps.length){//se nao existir um app inicializado indica para entrar e inicializar a aplicacao    
    firebase.initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    })     
}

export default firebase