/**
 * Created by aldo on 5/4/14.
 */
var fortune = require('fortune')
  , express = fortune.express
  , RSVP = fortune.RSVP
  , util = require('util')
  , path = require('path');

var container = express()
  , port = process.argv[2] || 1337;

var app = fortune({
  db: 'fortune-admin',
  adapter: 'mongodb',
  namespace: '/api/v1'
})

.resource("user", {
  title : String,
  firstName : String,
  lastName : String,
  role : String,
  email : String,
  nationality: String,
  languageCode: String,
  addresses: [{ref: "address", inverse: "user"}],
  flights: [{ref: "flight", inverse: "users", pkType: String}]
}, {
  model: {pk: "email"}
})

.resource("address", {
  type: String,
  addressLine1: String,
  addressLine2: String,
  addressLine3: String,
  addressLine4: String,
  city: String,
  region: String,
  postCode: String,
  country: String,
  dateDeleted: Date,
  user: {ref: "user", inverse: "addresses", pkType: String}
})

.resource("flight", {
  flightNumber: String,
  users: [{ref: "user", inverse: "flights", pkType : String}]
}, { model: { pk: "flightNumber" }})

.transform(
//  before
  function () {
    return this;
  },
//  after
  function (request) {
    if (request.body.addresses) {
      findUser(request.body.addresses[0].user).then(function (user) {
        user.addresses.push(this._id);
      });
    }
    return this;
  }
)

container
  .use(express.static(path.join(__dirname , '/')))
  .use(express.static(path.join(__dirname , '../')))
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