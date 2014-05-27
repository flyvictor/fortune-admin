
module.exports = function(app){

  app.resource("address", {
    type: String,
    addressLine1: String,
    addressLine2: String,
    addressLine3: String,
    addressLine4: String,
    city: String,
    region: String,
    postCode: String,
    country: String,
    additionalDetails: Object
  });

  app.resource("user", {
    creatorEmail: String,
    title : String,
    firstName : String,
    lastName : String,
    role : String,
    email : String,
    nationality: String,
    languageCode: String,
    companyName: String,
    internalUser: Boolean,
    ambassador: Boolean,
    vipRichList: Boolean,
    corporateTravel: Boolean,
    personalTravel: Boolean,
    caseStudy: Boolean,
    shareHolder: Boolean,
    interestFlights: Boolean,
    interestSeats: Boolean,
    contactSince: Date,
    birthDate: Date,
    dateApproved: Date,
    dateEmailVerification: Date,
    siteRegisteredOnLanguageId: Number,
    lastAdminContact: Date,
    phone: String,
    mobilePhone: String,
    mobileDeviceType: String,
    addresses: [{ref: "address"}],
    passengers: [{ref: "passenger"}],
    charterRequests: [{ref: "charter-request"}],
    emptyLegQuotes : [{ref: "quote"}],
    transactions: [{ref: "transaction"}],
    seatAllocations: [{ref: "seat-allocation"}],
    delegates: [{ref: "delegate"}],
    bookings: [{ref: "quote"}],
    competitorsUsed: [String],
    messageThreads: [{ref: "message-thread"}],
    cards: [{ref: "card"}],
    travelWithPet: Boolean,
    petDetails: String,
    userType: String,
    additionalDetails : Object,
    passwordHash: String,
    token: {
      value: String,
      created: Number,
      lastAccessed: Number
    }
  }, {
    model: {
      pk: 'email'
    }
  });


  app.resource("aircraft", {
    registration : String,
    model : String,
    seats : Number,
    year : Number,
    additionalDetails : Object
  });

  app.resource("operator", {
    name : String,
    additionalDetails : Object
  });

  app.resource("seat-allocation", {
    allocationStatus: String,
    seatPosition: Number,
    isCheckedIn: Boolean,
    additionalDetails: Object
  });

  app.resource("transaction", {
    orderState: String,
    type: String,
    completed: Boolean,
    requestDate: Date,
    responseDate: Date,
    amountPaid: Number,
    additionalDetails: Object
  });


  app.resource("handler", {
    airportCode: String,
    name: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    zip: String,
    state: String,
    countryCode: String,
    phone: String,
    tollFreePhone: String,
    fax: String,
    officeHours: String,
    website: String,
    email: String,
    additionalDetails: Object
  });

  app.resource("flight", {
    deptDate: Date,
    deptCode: String,
    arrCode: String,
    status: String,
    isPrivate: Boolean,
    isOperatorEmptyLeg: Boolean,
    seatAllocations: [{ref: "seat-allocation"}],
    arrHandler: {ref: "handler"},
    deptHandler: {ref: "handler"},
    additionalDetails: Object
  });

  app.resource("quote-leg", {
    leg: Number,
    deptDate: Date,
    deptCode: String,
    arrCode: String,
    duration: Number,
    isInitiatorLeg: Boolean,
    flight: {ref: "flight"},
    additionalDetails: Object
  });

  app.resource("quote", {
    isBooked: Boolean,
    currencyCode: String,
    amount : Number,
    nettAmount : Number,
    createdAt: Date,
    modifiedAt: Date,
    expiresAt: Date,
    acceptedAt: Date,
    rejectedAt: Date,
    adminConfirmedAt: Date,
    isVisibleToUser: Boolean,
    seatsOnJet: Number,
    seatsToConfirm: Number,
    aircraft : {ref: "aircraft"},
    operator: {ref: "operator"},
    quoteLegs: [{ref: "quote-leg"}],
    additionalDetails : Object
  });

  app.resource("request-leg", {
    deptDate: Date,
    deptCode: String,
    arrCode: String,
    passengers: Number,
    additionalDetails: Object
  });



  app.resource("charter-request", {
    createdOn: Date,
    aircraftTypes: Array,
    message: String,
    returnDate: Date,
    requestLegs: [{ref: "request-leg"}],
    quotes: [{ref: "quote"}],
    additionalDetails: Object
  });

  app.resource("delegate", {
    makeMainContact: Boolean,
    relationshipWithMember: String,
    title: String,
    firstName: String,
    lastName: String,
    additionalDetails: Object
  });

  app.resource("message", {
    sender: {ref: "user"},
    recipient: {ref: "user"},
    text: String,
    subject: String,
    sentDate: Date,
    read: Boolean
  });

  app.resource("message-thread", {
    messages: [{ref: "message"}]
  });
 /*jshint camelcase: false*/

  app.resource("card", {
    stripe_id: String,
    object: String,
    last4: String,
    type: String,
    exp_month: Number,
    exp_year: Number,
    fingerprint: String,
    customer: String,
    country: String,
    name: String,
    address_line1: String,
    address_line2: String,
    address_city: String,
    address_state: String,
    address_zip: String,
    address_country: String,
    cvc_check: String,
    address_line1_check: String,
    address_zip_check: String
  });

  app.resource("passenger", {
    nickname: String,
    title: String,
    firstName: String,
    lastName: String,
    phone: String,
    companyName: String,
    passportNumber: String,
    passportExpires: Date,
    issueDate: Date,
    issuingAuthority: String,
    birthDate: Date,
    nationality: String,
    specialRequirements: String,
    mobilePhone: String,
    languageCode: String
  });


};