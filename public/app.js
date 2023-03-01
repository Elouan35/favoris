if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js").then(
            (registration) => {
                // Registration was successful
                console.log("ServiceWorker registration was successful");
            },
            (err) => {
                // registration failed :(
                console.log("ServiceWorker registration failed: ", err);
            }
        );
    });
}
