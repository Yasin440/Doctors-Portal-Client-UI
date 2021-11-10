import { useEffect, useState } from "react";
import initializeFirebase from "../Components/Pages/Login/Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, getIdToken } from "firebase/auth";

//initialize firebase app
initializeFirebase();

const useFirebase = () => {
    const auth = getAuth();
    const [user, setUser] = useState({});
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState(false);
    const [jwtToken, setJwtToken] = useState('');


    //registerWithEmailPassword
    const registerWithEmailPassword = (email, password, name, handleSucModalOpen, history) => {
        setError('');
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                // Signed in 
                setUser(result.user);
                //saveUser to DB
                saveUserDB(email, name, 'POST');
                //update name in firebase after creation
                updateProfile(auth.currentUser, {
                    displayName: name
                })
                    .then(() => {
                        setError('');
                    })
                    .catch((error) => {
                        setError(error.message);
                    });
                handleSucModalOpen();
                history.replace('/');
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    //logInWithEmailPassword
    const logInWithEmailPassword = (email, password) => {
        setError('');
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .then(result => setUser(result.user))
            .catch(error => setError(error.message))
            .finally(() => setLoading(false));
        ;


    }

    //logIn with google
    const googleProvider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                saveUserDB(user.email, user.displayName, 'PUT');
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
                getIdToken(user)
                    .then(idToken => {
                        setJwtToken(idToken);
                    })
            }
            else {
                setUser({});
            }
            setLoading(false)
        });
        return () => unSubscribe;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //get admin validation in true of false
    useEffect(() => {
        fetch(`http://localhost:4000/users/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setAdmin(data.admin);
            })
    }, [user.email])

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

    //save user info to database
    const saveUserDB = (email, displayName, method) => {
        const user = { email, displayName };
        fetch('http://localhost:4000/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
    }

    return {
        user,
        admin,
        error,
        loading,
        jwtToken,
        registerWithEmailPassword,
        logInWithEmailPassword,
        signInWithGoogle,
        logOut
    }
}

export default useFirebase;