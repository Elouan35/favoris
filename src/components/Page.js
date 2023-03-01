import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import MoreUsed from "./MoreUsed";
import Popup from "./Popup";
import ViewSites from "./ViewSites";

import {
    setDoc,
    doc,
    getDoc,
    query,
    collection,
    getDocs,
} from "firebase/firestore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Page = ({ stheme, theme, db, user, spopup, popup }) => {
    const [sites, setSites] = useState();
    const [viewSites, setViewSites] = useState();
    const [sitesMoreUsed, setSitesMoreUsed] = useState();
    const [types, setTypes] = useState([]);
    const [totalClick, setTotalClick] = useState(0);
    const [inputResearch, setInputResearch] = useState("");

    const readTotalClick = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            var t = docSnap.data().total;
        }
        setTotalClick(t);
    };

    const createListesSites = (sListes, tys, search) => {
        let s = {};
        tys.sort();
        for (var i = 0; i < tys.length; i++) {
            s[tys[i]] = [];
            if (search) {
                if (tys[i].toLowerCase().indexOf(search.toLowerCase()) !== -1) {
                    for (var j = 0; j < sListes.length; j++) {
                        if (tys[i] === sListes[j][1].type) {
                            s[tys[i]].push(sListes[j]);
                        }
                    }
                } else {
                    for (var j = 0; j < sListes.length; j++) {
                        if (tys[i] === sListes[j][1].type) {
                            if (
                                sListes[j][0]
                                    .toLowerCase()
                                    .indexOf(search.toLowerCase()) !== -1
                            ) {
                                s[tys[i]].push(sListes[j]);
                            }
                        }
                    }
                }
            } else {
                for (var j = 0; j < sListes.length; j++) {
                    if (tys[i] === sListes[j][1].type) {
                        s[tys[i]].push(sListes[j]);
                    }
                }
            }
        }
        s[""] = [];
        for (var k = 0; k < sListes.length; k++) {
            if (sListes[k][1].type === "") {
                if (search) {
                    if (sListes[k][0].indexOf(search.toLowerCase()) !== -1) {
                        s[""].push(sListes[k]);
                    }
                } else {
                    s[""].push(sListes[k]);
                }
            }
        }
        setViewSites(s);
    };

    const read = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            await setDoc(doc(db, "users", user.uid), {
                total: 0,
                types: [],
            });
        } else {
            setTypes(docSnap.data().types);
        }

        const q = query(collection(db, `users/${user.uid}/sites`));
        const querySnapshot = await getDocs(q);
        let s = [];
        let sMoreUsed = [];
        querySnapshot.forEach((doc) => {
            s.push([doc.id, doc.data()]);
            sMoreUsed.push([doc.id, doc.data()]);
        });
        setSites(s.sort());
        setSitesMoreUsed(sMoreUsed.sort((a, b) => b[1].click - a[1].click));
        createListesSites(sMoreUsed, docSnap.data().types, false);
    };

    useEffect(() => {
        readTotalClick();
        read();
    }, []);

    const renderShowPopup = () => {
        if (sites.length > 0) {
            return (
                <button className="btn-show-popup" onClick={() => spopup(true)}>
                    <FontAwesomeIcon icon={faPlus} />
                    <p>Ajouter un nouvel onglet</p>
                </button>
            );
        } else {
            return (
                <button className="create-first" onClick={() => spopup(true)}>
                    <p>Ajouter un nouvel onglet</p>
                </button>
            );
        }
    };

    if (sites && sitesMoreUsed && viewSites) {
        return (
            <div className="user-connected">
                <Nav
                    stheme={stheme}
                    theme={theme}
                    user={user}
                    sresearch={setInputResearch}
                    createListesSites={createListesSites}
                    types={types}
                    sites={sitesMoreUsed}
                ></Nav>
                <MoreUsed
                    db={db}
                    user={user}
                    sites={sitesMoreUsed}
                    read={read}
                    totalClick={totalClick}
                    setTotalClick={setTotalClick}
                    iresearch={inputResearch}
                ></MoreUsed>
                <ViewSites
                    db={db}
                    user={user}
                    read={read}
                    setTotalClick={setTotalClick}
                    types={types}
                    sites={viewSites}
                ></ViewSites>
                <Popup
                    spopup={spopup}
                    display={popup}
                    types={types}
                    db={db}
                    user={user}
                    read={read}
                ></Popup>
                {renderShowPopup()}
            </div>
        );
    }
};

export default Page;
