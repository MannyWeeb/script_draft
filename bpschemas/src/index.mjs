import NavTree from "./Navtree.mjs";

const proppedLeafBuilder = (items, prop) => {
    return Object.fromEntries(items.map((e) => [e, prop]));
}

const actionInvalidator = (...actions) => Object.fromEntries(actions.map((e) => [e, false]));


let temp = new NavTree("Reports")
    .addProppedLeafs([
        proppedLeafBuilder(["Accounts Payable", "Accounts Receivable"], { accessible: false, actions: actionInvalidator("edit", "make_payment", "cancel") })
    ]);

console.log("Result:")
console.log(temp);