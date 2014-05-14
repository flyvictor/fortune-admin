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

.resource("user", {
  title : String,
  firstName : String,
  lastName : String,
  role : String,
  email : String,
  nationality: String,
  languageCode: String,
  addresses: [{ref: "address", inverse: "user"}],
  flights: [{ref: "flight", inverse: "flights", pkType: String}]
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
  users: [{ref: "user", inverse: "users", pkType : String}]
}, { model: { pk: "flightNumber" }})

.transform(
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

function checkRelations(node){
    var ret = [];
    for(var n in node){
        if(node[n].hasOwnProperty('ref'))
            ret.push(node[n]['ref']);
        if(n == 'ref')
            ret.push(node[n]);
    }
    return ret;
}

function packageSchema(){
    var ret = {};
    for(var resource in app.metadata){
        var pk = app.metadata[resource].modelOptions ?
            app.metadata[resource].modelOptions['pk'] : 'id';
        ret[resource] = { 'schema': [], 
                          'pk': pk,
                          'fks': [],
                          'relations': [] };
        for(var key in app.metadata[resource]['schema']){
            ret[resource]['schema'].push(key);
            var rels = checkRelations(app.metadata[resource]['schema'][key])
            for(var rel in rels){
                ret[resource]['relations'].push(rels[rel]);
            }
        }
    }
        
    return ret;
}
            
container
  .use(express.static(__dirname + '/public/app'))
  .use(express.static(__dirname + '/public/app/scripts'))
  .use(app.router)
  .get('/schema', function(req, res){ res.json( packageSchema() );})
  .listen(port);

console.log('Listening on port ' + port + '...');

/**
 * Find User.
 */
function findUser(id) {
  return new RSVP.Promise(function(resolve, reject) {
    app.adapter.find('user', id).then(function(resource){
      if(!!resource) {
        resolve(resource);
      } else {
        reject(this);
      }
    });
  });
}