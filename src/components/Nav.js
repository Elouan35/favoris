import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Nav = ({
    stheme,
    theme,
    user,
    sresearch,
    createListesSites,
    types,
    sites,
}) => {
    const switchTheme = () => {
        const checkboxTheme = document.getElementById("theme");
        if (checkboxTheme.checked) {
            stheme("dark");
        } else {
            stheme("light");
        }
    };

    const displayResearch = () => {
        if (user) {
            return (
                <div className="research-box">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input
                        type="text"
                        className="research"
                        placeholder="Rechercher"
                        onChange={(e) => {
                            sresearch(e.target.value);
                            createListesSites(sites, types, e.target.value);
                        }}
                    />
                </div>
            );
        }
    };

    if (theme === "dark") {
        return (
            <nav>
                <h1>Favoris</h1>
                {displayResearch()}
                <label
                    htmlFor="theme"
                    className="theme"
                    onClick={() => switchTheme()}
                >
                    <span className="theme__toggle-wrap">
                        <input
                            type="checkbox"
                            className="theme__toggle"
                            defaultChecked={true}
                            id="theme"
                            name="theme"
                        />
                        <span className="theme__icon">
                            <span className="theme__icon-part"></span>
                            <span className="theme__icon-part"></span>
                            <span className="theme__icon-part"></span>
                            <span className="theme__icon-part"></span>
                            <span className="theme__icon-part"></span>
                            <span className="theme__icon-part"></span>
                            <span className="theme__icon-part"></span>
                            <span className="theme__icon-part"></span>
                            <span className="theme__icon-part"></span>
                        </span>
                    </span>
                </label>
            </nav>
        );
    } else {
        return (
            <nav>
                <h1>Favoris</h1>
                {displayResearch()}
                <label
                    htmlFor="theme"
                    className="theme"
                    onClick={() => switchTheme()}
                >
                    <span className="theme__toggle-wrap">
                        <input
                            type="checkbox"
                            className="theme__toggle"
                            defaultChecked={false}
                            id="theme"
                            name="theme"
                        />
                        <span className="theme__icon">
                            <span className="theme__icon-part"></span>
                            <span className="theme__icon-part"></span>
                            <span className="theme__icon-part"></span>
                            <span className="theme__icon-part"></span>
                            <span className="theme__icon-part"></span>
                            <span className="theme__icon-part"></span>
                            <span className="theme__icon-part"></span>
                            <span className="theme__icon-part"></span>
                            <span className="theme__icon-part"></span>
                        </span>
                    </span>
                </label>
            </nav>
        );
    }
};

export default Nav;
