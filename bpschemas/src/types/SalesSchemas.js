/* START OF BASE */
//Contains fields common to all types of chart within subject.
class Transaction {
    constructor() {
        this.date = 0;
        this.customer = "";
        this.status = "";
        this.actions = [];
        this.transactionID = "";
    }
}
/* END OF BASE */
/* START OF PROTO */
//Template for transactions that require a property that specifies the amount of transactables transacted. what? haha
class Quantifiable extends Transaction {
    constructor() {
        super();
        this.verifier = "";
        this.total = 0;
    }
}
//Template for transactions that involves the transport of goods from one party to the other.
class Deliverable extends Transaction {
    constructor() {
        super();
        this.deliveryPersonnel = "";
        this.deliveryStatus = "";
        this.type = "";
    }
}
/* END OF PROTO */
/* START OF Daughter Classes */
class Sale extends Deliverable {
    constructor() {
        super();
        this.verifier = "";
        this.paidAmount = 0;
        this.total = 0;
    }
}
class Order extends Deliverable {
    constructor() {
        super();
        this.verifier = "";
        this.paidAmount = 0;
        this.total = 0;
    }
}
class Reservation extends Quantifiable {
}
class Quotation extends Quantifiable {
}
class Delivery extends Deliverable {
    //idk, implements interface Contactable?
    constructor() {
        super();
        this.address = "";
        this.mobileNumber = "";
    }
}
/* END OF Daughter Classes */
export { Sale, Order, Reservation, Quotation, Delivery };
