import React from "react";
import Nav from "./Nav";
import firebase from "firebase/compat/app";
import { useState } from "react";

const SignIn = ({ auth, theme, stheme, user }) => {
    const [clicked, setClicked] = useState(false);

    const signInWithGoogle = async () => {
        if (!clicked) {
            setClicked(false);
            const provider = new firebase.auth.GoogleAuthProvider();
            await auth.signInWithPopup(provider);
            if (!user) {
                setClicked(true);
            }
        }
    };

    const signInWithGithub = async () => {
        if (!clicked) {
            setClicked(false);
            const provider = new firebase.auth.GithubAuthProvider();
            await auth.signInWithPopup(provider);
            if (!user) {
                setClicked(true);
            }
        }
    };

    return (
        <div>
            <Nav stheme={stheme} theme={theme} user={user}></Nav>
            <div className="sign-in">
                <div className="box">
                    <h3>Connecte-toi</h3>
                    <button onClick={signInWithGoogle}>
                        <img
                            src="images/login-logo/Google_logo.svg"
                            alt="Logo de Google"
                        />
                        Se connecter avec Google
                    </button>
                    <button onClick={signInWithGithub}>
                        <img
                            src="images/login-logo/Github_logo.svg"
                            alt="Logo de Github"
                        />
                        Se connecter avec Github
                    </button>
                </div>
                <h5>
                    Connecte-toi gratuitement et gère tes onglets comme tu le
                    souhaites
                </h5>
            </div>
        </div>
    );
};

export default SignIn;
