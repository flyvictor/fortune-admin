/**
 * Created by aldo on 5/4/14.
 */
var fortune = require('./lib/fortune')
  , express = fortune.express
  , RSVP = fortune.RSVP
  , util = require('util')
  , path = require('path');

var container = express()
  , port = process.argv[2] || 1337;

var app = fortune({
  db: 'fortune-admin',
  namespace: '/api/v1'
})

.resource("user", {
  title : { type: String, "docs:example": 'Mr' },
  firstName : { type: String, "docs:example": 'Peter' },
  lastName : { type: String, "docs:example": 'Pan' },
  role : { type: String, "docs:example": 'admin' },
  email : { type: String, "docs:example" : 'peter.pan@neverland.com' },
  nationality: { type: String, "docs:example": 'British' },
  languageCode: { type: String, "docs:description": 'An IETF language tag, e.g en-GB', "docs:example": 'en-GB' },
  addresses: [{ref: "address", inverse: "user"}],
  flights: [{ref: "flight", inverse: "users", pkType: String}],
  additionalDetails : {
    testNumber: { type: Number, "docs:example": 1 },
    notificationData: { type: Object, "docs:example": {} },
    primaryRelationshipLegacyId: { type: Number, "docs:example": 1 },
    legacyID: { type: Number, "docs:example": 1 }
  }
}, {
  model: {pk: "email"},
  "docs:description": 'A user contains the information about different types of users from the system.'
})

.resource("address", {
  type: { type: String, "docs:example": "home" },
  addressLine1: { type: String, "docs:example": "61" },
  addressLine2: { type: String, "docs:example": "Wellfield Road" },
  addressLine3: { type: String, "docs:example": "appt." },
  addressLine4: { type: String, "docs:example": "17" },
  city: { type: String, "docs:example": "Newcastle upon Tyne" },
  region: { type: String, "docs:example": "North East" },
  postCode: { type: String, "docs:example": "NE1 AB" },
  country: { type: String, "docs:example": "UK" },
  dateDeleted: { type: Date, "docs:example": "" },
  user: {ref: "user", inverse: "addresses", pkType: String}
})

.resource("flight", {
  flightNumber: { type: String, "docs:example": 554 },
  users: [{ref: "user", inverse: "flights", pkType : String}]
}, { model: { pk: "flightNumber" }});

container
  //.use(express.static(path.join(__dirname , '../src')))
  .use(express.static(path.join(__dirname , '../src')))
  .use(express.static(path.join(__dirname,  '../src/modules/docs')))
  .use(express.static(path.join(__dirname, '../src/modules/fortune-admin')))
  .use(express.static(path.join(__dirname, '../src/modules/shared')))
  .use(express.static(path.join(__dirname , '/bower_components')))
  .use(app.router)
  .listen(port);

app.router.get('*', function(req, res, next){
  var resource = /^\/resources.*/;
  var api = /^\/api.+/;
  if (resource.test(req.url) || api.test(req.url)) return next();
  res.redirect('/');
});

console.log('Listening on port ' + port + '...');

/**
 * Find User.
 */
function findUser(id) {
  return new RSVP.Promise(function(resolve, reject) {
    app.adapter.find('user', id).then(function(resource) {
      if(!!resource) {
        resolve(resource);
      } else {
        reject(this);
      }
    });
  });
}
