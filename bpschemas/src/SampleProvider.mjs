import { Order, Quotation, Reservation, Sale, Delivery } from "./types/SalesSchemas.js";
import rn from "random-name";

class Placeholder {
    constructor(num) {
        this.items = [];
        for (let i = 0; i < num; i++) this.items.push(rn());
    }

    renew(num) {
        this.items = [];
        for (let i = 0; i < num; i++) {
            this.items.push(rn());
        }
    }

    getRandom() {
        return this.items[~~(Math.random() * this.items.length)];
    }
}

let customers = new Placeholder(10);
let cashier = new Placeholder(3);
let deliveryPersonnel = new Placeholder(5);
let randomDate = (from, to) => {
    return new Date(Math.round(Math.random() * (to ? new Date(to) : new Date() - new Date(from || 0)) - 1));
}
let randomStatus = () => {
    return ["processing", "pending", "complete"][Math.round(Math.random() * 2)];
}
let randomDeliveryStatus = () => {
    return ["processing", "shipping", "complete"][Math.round(Math.random() * 2)];
}
let randomTotal = (num) => {
    return num ? (~~Math.random() * num) : 1
}

export default class {
    constructor(num) {
        this.num = num;
    }
    sale() {
        let result = [];
        for (let i = 0; i < this.num; i++) {
            let temp = new Sale();
            temp.customer = customers.getRandom();
            temp.total = randomTotal(100);
            temp.verifier = cashier.getRandom();
            temp.deliveryPersonnel = deliveryPersonnel.getRandom();

            temp.date = randomDate();
            temp.paidAmount = (Math.round(Math.random() * 999));
            temp.transactionID = new Date().getTime();
            temp.status = randomStatus();
            temp.deliveryStatus = randomDeliveryStatus();

            result.push(temp);
        }

        return result;
    }
    order() {
        let result = [];
        for (let i = 0; i < this.num; i++) {
            let temp = new Order();
            temp.customer = customers.getRandom();
            temp.verifier = cashier.getRandom();
            temp.deliveryPersonnel = deliveryPersonnel.getRandom();
            temp.total = randomTotal(100);
            temp.date = randomDate();
            temp.paidAmount = (Math.round(Math.random() * 999));
            temp.transactionID = new Date().getTime();
            temp.status = randomStatus();
            temp.deliveryStatus = randomDeliveryStatus();

            result.push(temp);
        }

        return result;
    }
    reservation() {
        let result = [];
        for (let i = 0; i < this.num; i++) {
            let temp = new Reservation();
            temp.status = randomStatus();
            temp.total = randomTotal(100);
            temp.transactionID = new Date().getTime();
            temp.verifier = cashier.getRandom();
            temp.date = randomDate();
            temp.customer = customers.getRandom();

            result.push(temp);
        }

        return result;
    }
    quotation() {
        let result = [];
        for (let i = 0; i < this.num; i++) {
            let temp = new Quotation();
            temp.customer = customers.getRandom();
            temp.transactionID = new Date().getTime()
            temp.verifier = cashier.getRandom();
            temp.date = randomDate();
            temp.status = randomStatus();
            temp.total = randomTotal(100);

            result.push(temp);
        }

        return result;
    }
    delivery() {
        let result = [];
        for (let i = 0; i < this.num; i++) {
            let temp = new Delivery();
            temp.customer = customers.getRandom();
            temp.date = randomDate();
            temp.deliveryPersonnel = deliveryPersonnel.getRandom();
            temp.deliveryStatus = randomDeliveryStatus();
            temp.status = randomStatus();
            temp.transactionID = new Date().getTime();
            result.push(temp);
        }

        return result;
    }
}
