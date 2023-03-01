import React, { useEffect } from "react";
import { useState } from "react";
import Page from "./components/Page";
import SignIn from "./components/SignIn";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import "firebase/compat/auth";
import "firebase/compat/analytics";
import "firebase/compat/firestore";

import { useAuthState } from "react-firebase-hooks/auth";

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "react-favoris-firebase.firebaseapp.com",
    projectId: "react-favoris-firebase",
    storageBucket: "react-favoris-firebase.appspot.com",
    messagingSenderId: "290137156215",
    appId: "1:290137156215:web:24e96282c2b4586733f472",
    measurementId: "G-YZSDN84V7Q",
});

const auth = firebase.auth();
const db = getFirestore(app);

const App = () => {
    const [user] = useAuthState(auth);

    const [theme, setTheme] = useState();
    const [popup, setPopup] = useState(false);

    useEffect(() => {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }, []);

    if (theme) {
        return (
            <div className={`App ${theme}`}>
                {user ? (
                    <Page
                        stheme={setTheme}
                        theme={theme}
                        db={db}
                        user={user}
                        spopup={setPopup}
                        popup={popup}
                    ></Page>
                ) : (
                    <SignIn
                        auth={auth}
                        stheme={setTheme}
                        theme={theme}
                        user={user}
                    ></SignIn>
                )}
                <SignOut></SignOut>
            </div>
        );
    }
};

function SignOut() {
    return (
        auth.currentUser && (
            <button
                id="sign-out"
                aria-label="Bouton de déconnection"
                className="sign-out"
                onClick={() => auth.signOut()}
            >
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </button>
        )
    );
}

export default App;
