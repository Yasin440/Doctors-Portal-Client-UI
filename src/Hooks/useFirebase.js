import { useEffect, useState } from "react";
import initializeFirebase from "../Components/Pages/Login/Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

//initialize firebase app
initializeFirebase();

const useFirebase = () => {
    const auth = getAuth();
    const [user, setUser] = useState({});
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    //registerWithEmailPassword
    const registerWithEmailPassword = (email, password) => {
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                setUser(userCredential.user);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setLoading(false));
    }

    //logInWithEmailPassword
    const logInWithEmailPassword = (email, password) => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then(result => setUser(result.user))
            .catch(error => setError(error.message))
            .finally(() => setLoading(false));
        ;


    }

    //logIn with google
    const googleProvider = new GoogleAuthProvider();
    const logInWithGoogle = () => {
        setLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                // The signed-in user info.
                setUser(result.user);
            })
            .catch((error) => {
                // Handle Errors here.
                setError(error.message);
            })
            .finally(() => setLoading(false));
    }

    //observed User state change
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {

            if (user) {
                setUser(user);
            }
            else {
                setUser({});
            }
            setLoading(false)
        });
        return () => unSubscribe;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //logOut user
    const logOut = () => {
        setLoading(true);
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        })
            .finally(() => setLoading(false));
        ;
    }
    return {
        user,
        error,
        loading,
        registerWithEmailPassword,
        logInWithEmailPassword,
        logInWithGoogle,
        logOut
    }
}

export default useFirebase;