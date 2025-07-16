
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";// agregado

const firebaseConfig = {
  apiKey: "AIzaSyAvmaTvSwPtInYaF-c4v7QR6Odq56ALcys",
  authDomain: "e-comercett.firebaseapp.com",
  projectId: "e-comercett",
  storageBucket: "e-comercett.firebasestorage.app",
  messagingSenderId: "980449186788",
  appId: "1:980449186788:web:199525d3a70c568d16edf1",
  measurementId: "G-0LW0VM2M4D"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);//agregado


const auth = getAuth();

export function crearUsuario(email, password) {
    return(
        new Promise((res, rej) => {

            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                console.log("Credenciales ", userCredential);
                const user = userCredential.user;
                console.log(user);
                res (user)
                // ...
            })
            .catch((error) => {
                console.log(error.code, error.message);
                
                const errorCode = error.code;
                const errorMessage = error.message;
                rej(error)
                // ..
            });
        })
    )


}

export function loginEmailPass(email, password) {
    return(
        new Promise((resolve, reject) => {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                console.log("Credenciales", userCredential);
                const user = userCredential.user;
                console.log(user);
                resolve(user);
                // ...
            })
            .catch((error) => {
                console.log(error.code);
                const errorCode = error.code;
                const errorMessage = error.message;
                reject(error);
            });
        })
    )

}
//nueva funcion no se usa aun, TODO muestra usuarios registrados
export async function obtenerUsuarios() {
  try {
    const usersCollection = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollection);
    return usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
}