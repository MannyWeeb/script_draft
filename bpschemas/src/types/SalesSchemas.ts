/* START OF BASE */
//Contains fields common to all types of chart within subject.
class Transaction {
    date: Number;
    customer: String;
    status: String;
    actions: Array<any>;
    transactionID: String;

    constructor() {
        this.date = 0;
        this.customer = "";
        this.status = "";
        this.actions = []
        this.transactionID = "";
    }
}
/* END OF BASE */


/* START OF PROTO */
//Template for transactions that require a property that specifies the amount of transactables transacted. what? haha
class Quantifiable extends Transaction {
    verifier: String; //In our case this would be a cashier or someone with a similar role.
    total: Number;

    constructor() {
        super();
        this.verifier = "";
        this.total = 0;
    }
}

//Template for transactions that involves the transport of goods from one party to the other.
class Deliverable extends Transaction {
    deliveryPersonnel: String;
    deliveryStatus: String;
    type: String;
    constructor() {
        super();
        this.deliveryPersonnel = "";
        this.deliveryStatus = "";
        this.type = "";
    }
}

//Template for transactions that involves transfer of goods or service in exchange for any monetary amount.
interface Payable extends Quantifiable {
    paidAmount: Number;
}
/* END OF PROTO */

/* START OF Daughter Classes */
class Sale extends Deliverable implements Payable {
    verifier: String;
    paidAmount: Number;
    total: Number;

    constructor() {
        super();
        this.verifier = "";
        this.paidAmount = 0;
        this.total = 0;
    }
}

class Order extends Deliverable implements Payable {
    verifier: String;
    paidAmount: Number;
    total: Number;

    constructor() {
        super();
        this.verifier = "";
        this.paidAmount = 0;
        this.total = 0;
    }
}

class Reservation extends Quantifiable { }

class Quotation extends Quantifiable { }

class Delivery extends Deliverable {
    address: String;
    mobileNumber: String; //idk, implements interface Contactable?
    constructor() {
        super();
        this.address = "";
        this.mobileNumber = "";
    }
}
/* END OF Daughter Classes */

export { Sale, Order, Reservation, Quotation, Delivery };