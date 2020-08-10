# mwa-final
MWA course CS-573-2020-Group3

## Tasks:

1. **Two separated apps**
    1. **Frontend**: using ng
       * Addition dependencies: multer (upload images)
    2. **Backend**: using express-generator
       * Addition npm dependencies: mongoose, cors, jsonwebtoken
2. **Features**:
    1. **_Commons_**:
       * sign up + sign in with Authentication+Authorization role base (simple const: USER, FARMER, ADMIN)
    1. **_For farmers_**:
       * products manage
       * orders manage
       * order history
    1. **_For customers_**
        * cart
        * purchase
        * orders history (reuse)
        * rate and feedback the completed order
    1. **_Others_**:
      * Mongo DB design
      * Email
      * Log API request
      * Swagger genera API documentation
      * Cloud integration
      * Send project result email (afterward)
    1. **_For super users (optional)_**
      * List account, activate/deactivate, reset pass
3. **Discussion:**
* UI using material or bootstrap -> using bootstrap
* Git branch, push rule and other convention agreements
4. Others:

## DB Design

```javascript
Farmer = {
    _id: Object,
    _userId: Object,
    firstName: String, 
    lastName: String,
    email: String,
    password: String,
    tel: String,
    address: String,
    reputation: Integer
}

Product = {
    _id: Object,
    farmer: Ref,
    name: String,
    description: String,
    price: Double,
    photo: String, 
    ...,
    inStock: Interger
}

Order = {
    _id: Object,
    customer: Ref,
    farmer: Ref,
    orderCode: String,
    createdate: Date,
    productList: [Product],
    status: (PENDING || READY || COMPLETE),
    totalAmount: Double,
    pickUpTime: DateTime,
    rate: (null||EXCELLENT||GOOD||BAD)
}

Customer = {
    _id: Object,
    _userId: Object,
    firstName: String, 
    lastName: String,
    email: String,
    password: String,
    tel: String,
    address: String
}

User = {
    _id: Object
    email: String,
    password: String,
    role: (ADMIN|FARMER|CUSTOMER),
    status: (ACTIVE||DEACTIVE)
}
```