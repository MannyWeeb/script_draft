//Assumption: Each API call takes up about 2.5 seconds to return a response...
function getRequests() {
    return ["Scripts", "Images", "Documents"].map((resource) => {
        return () => new Promise((resolve) => {
            setTimeout(() => {
                resolve(`${resource} received.`);
            }, 2500);
        });
    });
}

async function awaitCall() {
    let timestamps = new Date().getTime();

    for (const f of getRequests()) {
        await f();
    }

    console.log(`Await call took ${(new Date().getTime() - timestamps) / 1000} seconds`);
}

function promisifiedCall() {
    let timestamps = new Date().getTime();
    Promise.all(getRequests().map((f) => f()))
        .then(() => console.log(`Promisified call took ${(new Date().getTime() - timestamps) / 1000} seconds`));
}

awaitCall();
promisifiedCall();