import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { setDoc, doc, getDoc } from "firebase/firestore";

const Popup = ({ spopup, display, types, db, user, read }) => {
    const showSelect = () => {
        if (types.length >= 1) {
            if (types[0].length > 1) {
                return (
                    <>
                        {types.map((type) => (
                            <option value={type} key={type}>
                                {type}
                            </option>
                        ))}
                    </>
                );
            }
        }
    };

    const validate = async () => {
        var val = 0;
        const nameInput = document.getElementById("name");
        if (nameInput.value.length >= 1) {
            nameInput.style.border = "3px solid #000";
            val += 1;
        } else {
            nameInput.style.border = "3px solid #E74C3C";
        }

        const urlInput = document.getElementById("url");
        if (
            urlInput.value.length >= 1 &&
            urlInput.value.split(".").length > 1
        ) {
            urlInput.style.border = "3px solid #000";
            val += 1;
        } else {
            urlInput.style.border = "3px solid #E74C3C";
        }

        var valNew = [0];
        const newTypeInput = document.getElementById("new-type");
        const typesSelect = document.getElementById("types");

        if (newTypeInput.value.length >= 1 && typesSelect.value.length >= 1) {
            valNew = [1];
            newTypeInput.style.border = "3px solid #E74C3C";
            typesSelect.style.border = "3px solid #E74C3C";
        } else {
            if (newTypeInput.value.length >= 1) {
                valNew = [1];
                val += 1;
                valNew = [1, newTypeInput.value];
                newTypeInput.style.border = "3px solid #000";
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    var t = docSnap.data().total;
                    var tys = docSnap.data().types;
                }
                await setDoc(doc(db, "users", user.uid), {
                    total: t,
                    types: [...tys, newTypeInput.value],
                });
            } else {
                newTypeInput.style.border = "3px solid #000";
                valNew = [0, typesSelect.value];
            }
        }

        if (val === 2 + valNew[0]) {
            var shortName = nameInput.value.split(" ")[0].toLowerCase();
            const docRef = doc(db, "users", user.uid, "sites", shortName);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                if (!isNaN(shortName[shortName.length - 1])) {
                    var num = parseInt(shortName[shortName.length - 1]);
                    shortName = `${shortName}${num + 1}`;
                } else {
                    shortName = `${shortName}1`;
                }
            }
            await setDoc(doc(db, "users", user.uid, "sites", shortName), {
                Name: nameInput.value,
                click: 0,
                lien: urlInput.value,
                type: valNew[1],
            });
            spopup(false);
            read();
        }
    };

    if (display) {
        return (
            <div className="popup-window">
                <div className="popup">
                    <FontAwesomeIcon
                        icon={faXmark}
                        onClick={() => spopup(false)}
                    />
                    <h3>Ajouter un nouvel onglet</h3>
                    <div className="parameter">
                        <input type="text" placeholder="Nom" id="name" />
                        <input
                            type="url"
                            name="url"
                            id="url"
                            placeholder="Lien"
                        />
                        <h4>Catégorie</h4>
                        <select name="types" id="types" defaultValue={""}>
                            {showSelect()}
                            <option value=""></option>
                        </select>
                    </div>

                    <h3>Créer votre propre catégorie</h3>
                    <div className="parameter">
                        <input
                            type="text"
                            id="new-type"
                            placeholder="Nom"
                            className="create-type"
                        />
                    </div>

                    <button className="add" onClick={validate}>
                        Ajouter
                    </button>
                </div>
            </div>
        );
    }
};

export default Popup;
