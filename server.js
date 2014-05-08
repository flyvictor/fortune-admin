/**
 * Created by aldo on 5/4/14.
 */
var fortune = require('fortune')
  , express = fortune.express
  , RSVP = fortune.RSVP
  , util = require('util');

var container = express()
  , port = process.argv[2] || 1337;

var app = fortune({
  db: 'fortune-admin',
  adapter: 'mongodb',
  namespace: '/api/v1'
})

.resource('user', {
  title : String,
  firstName : String,
  lastName : String,
  role : String,
  email : String,
  nationality: String,
  languageCode: String,
  addresses: [{ref: "address", inverse: "user"}]
})

.resource('address', {
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
  user: { ref: "user", inverse: "addresses" }
}).transform(
//  before
  function () {
    return this;
  },
//  after
  function (request) {
    console.log('Request : ' + util.inspect(request.body));
    if (request.body.addresses) {
      findUser(request.body.addresses[0].user).then(function (user) {
        console.log(user);
        user.addresses.push(this._id);
      });
    }
    return this;
  }
)

container
  .use(express.static(__dirname + '/public/app'))
  .use(express.static(__dirname + '/public/app/scripts'))
  .use(app.router)
  .listen(port);

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