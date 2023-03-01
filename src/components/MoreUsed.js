import React from "react";

import { setDoc, doc, getDoc } from "firebase/firestore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const MoreUsed = ({
    db,
    user,
    sites,
    read,
    totalClick,
    setTotalClick,
    iresearch,
}) => {
    const postClick = async (site) => {
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

        read();
    };

    if (sites.length >= 3 && totalClick > 0 && iresearch.length < 1) {
        return (
            <div className="MoreUsed">
                <div className="box">
                    <div className="right">
                        <h3 className="total-click">
                            {totalClick} clic au total
                        </h3>
                    </div>
                    <div className="columns">
                        <div className="column">
                            <div className="percent-box">
                                <div
                                    className="percent"
                                    style={{
                                        height: `${(sites[0][1].click /
                                            totalClick) *
                                            30}vh`,
                                    }}
                                >
                                    <h3
                                        style={{
                                            fontSize: `${1 +
                                                (sites[0][1].click /
                                                    totalClick) *
                                                    3}vw`,
                                        }}
                                    >
                                        {Math.round(
                                            (sites[0][1].click / totalClick) *
                                                100
                                        )}
                                        %
                                    </h3>
                                </div>
                                <p className="click">
                                    {sites[0][1].click} clic
                                </p>
                            </div>
                            <a
                                href={sites[0][1].lien}
                                target={"_blank"}
                                onClick={() => postClick(sites[0][0])}
                                className="lien"
                            >
                                <FontAwesomeIcon icon={faChevronRight} />
                                {sites[0][1].Name}
                            </a>
                        </div>
                        <div className="column">
                            <div className="percent-box">
                                <div
                                    className="percent"
                                    style={{
                                        height: `${(sites[1][1].click /
                                            totalClick) *
                                            30}vh`,
                                    }}
                                >
                                    <h3
                                        style={{
                                            fontSize: `${1 +
                                                (sites[1][1].click /
                                                    totalClick) *
                                                    3}vw`,
                                        }}
                                    >
                                        {Math.round(
                                            (sites[1][1].click / totalClick) *
                                                100
                                        )}
                                        %
                                    </h3>
                                </div>
                                <p className="click">
                                    {sites[1][1].click} clic
                                </p>
                            </div>
                            <a
                                href={sites[1][1].lien}
                                target={"_blank"}
                                onClick={() => postClick(sites[1][0])}
                                className="lien"
                            >
                                <FontAwesomeIcon icon={faChevronRight} />
                                {sites[1][1].Name}
                            </a>
                        </div>
                        <div className="column">
                            <div className="percent-box">
                                <div
                                    className="percent"
                                    style={{
                                        height: `${(sites[2][1].click /
                                            totalClick) *
                                            30}vh`,
                                    }}
                                >
                                    <h3
                                        style={{
                                            fontSize: `${1 +
                                                (sites[2][1].click /
                                                    totalClick) *
                                                    3}vw`,
                                        }}
                                    >
                                        {Math.round(
                                            (sites[2][1].click / totalClick) *
                                                100
                                        )}
                                        %
                                    </h3>
                                </div>
                                <p className="click">
                                    {sites[2][1].click} clic
                                </p>
                            </div>
                            <a
                                href={sites[2][1].lien}
                                target={"_blank"}
                                onClick={() => postClick(sites[2][0])}
                                className="lien"
                            >
                                <FontAwesomeIcon icon={faChevronRight} />
                                {sites[2][1].Name}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default MoreUsed;
