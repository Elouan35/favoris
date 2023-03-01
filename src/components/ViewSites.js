import React from "react";

import { setDoc, doc, getDoc, deleteDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ViewSites = ({
    db,
    user,
    sListes,
    read,
    setTotalClick,
    types,
    sites,
}) => {
    const postClick = async (site) => {
        const siteRef = doc(db, `users/${user.uid}/sites/${site}`);
        const siteSnap = await getDoc(siteRef);
        if (siteSnap.exists()) {
            var c = siteSnap.data().click;
            var n = siteSnap.data().Name;
            var l = siteSnap.data().lien;
            var typeData = siteSnap.data().type;
        }
        await setDoc(doc(db, `users/${user.uid}/sites/${site}`), {
            click: c + 1,
            Name: n,
            lien: l,
            type: typeData,
        });
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            var t = docSnap.data().total;
            var tys = docSnap.data().types;
        }
        await setDoc(doc(db, "users", user.uid), {
            total: t + 1,
            types: tys,
        });
        setTotalClick(t + 1);
        read();
    };

    const renderImage = (site) => {
        try {
            return (
                <img
                    src={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${site[1].lien}&size=32`}
                    width={"32px"}
                    height={"32px"}
                    alt={site[1].Name}
                />
            );
        } catch (error) {
            return <></>;
        }
    };

    const deleteSite = async (site) => {
        const siteRef = doc(db, `users/${user.uid}/sites/${site}`);
        const siteSnap = await getDoc(siteRef);
        if (siteSnap.exists()) {
            var c = siteSnap.data().click;
        }
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            var t = docSnap.data().total;
            var tys = docSnap.data().types;
        }
        await setDoc(doc(db, "users", user.uid), {
            total: t - c,
            types: tys,
        });
        setTotalClick(t - c);
        await deleteDoc(doc(db, `users/${user.uid}/sites/${site}`));
        read();
    };

    if (sites) {
        return (
            <div className="view-sites">
                {Object.entries(sites).map(([key, values]) => {
                    if (key !== "") {
                        return (
                            <div className="box" key={key}>
                                <h2>{key}</h2>
                                <ul>
                                    {values.map((site) => (
                                        <li key={site[0]}>
                                            <a
                                                href={site[1].lien}
                                                target={"_blank"}
                                                onClick={() =>
                                                    postClick(site[0])
                                                }
                                            >
                                                {renderImage(site)}
                                                {site[1].Name}
                                            </a>
                                            <FontAwesomeIcon
                                                icon={faXmark}
                                                onClick={() =>
                                                    deleteSite(site[0])
                                                }
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    } else {
                        if (values.length > 0) {
                            return (
                                <div className="box" key={key}>
                                    <ul className="others">
                                        {values.map((site) => (
                                            <li>
                                                <a
                                                    href={site[1].lien}
                                                    target={"_blank"}
                                                    onClick={() =>
                                                        postClick(site[0])
                                                    }
                                                    key={site[0]}
                                                >
                                                    {renderImage(site)}
                                                    {site[1].Name}
                                                </a>
                                                <FontAwesomeIcon
                                                    icon={faXmark}
                                                    onClick={() =>
                                                        deleteSite(site[0])
                                                    }
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        }
                    }
                })}
            </div>
        );
    }
};

export default ViewSites;
