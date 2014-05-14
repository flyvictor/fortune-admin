var graph = new joint.dia.Graph;

var paper = new joint.dia.Paper({
    el: $('#paper'),
    width: 800,
    height: 600,
    gridSize: 1,
    model: graph
});


var uml = joint.shapes.uml;


function populateClasses(data){
    var classes = {},
      relations = [],
      curX = 100,
      curY = 100;
    for(var resource in data){
        var attributes = []
            pk = data[resource]['pk'],
            schema = data[resource]['schema'];
        attributes.push("[PK] " + pk);
        for(var a in schema){
            if(schema[a] != pk)
                attributes.push(schema[a]);
        }
        var c = new uml.Class({
            position: {x: curX, y: curY},
            size: {width: 100, height: 50+15*attributes.length},
            name: resource,
            attributes: attributes,
            methods: []
        });
        classes[resource] = c;
       
        curX += 180;
        //curY += 30*attributes.length + 30;
    }
    for(var resource in data){
        for(var rel in data[resource]['relations'])
            relations.push(new uml.Composition(
                { source: { id: classes[resource].id },
                  target: { id: classes[data[resource]['relations'][rel]].id }}));
    }
    _.each(classes, function(c) { graph.addCell(c); });
    _.each(relations, function(r) { graph.addCell(r); });
}


$.ajax('/schema').done(function(data){ populateClasses(data); })
 .fail(function(err){ console.log( "Error retrieving schema: " + err ); });

/*
var classes = {


    mammal: new uml.Interface({
        position: { x:300  , y: 50 },
        size: { width: 240, height: 100 },
        name: 'Mammal',
        attributes: ['dob: Date'],
        methods: ['+ setDateOfBirth(dob: Date): Void','+ getAgeAsDays(): Numeric']
    }),

    person: new uml.Abstract({
        position: { x:300  , y: 300 },
        size: { width: 240, height: 100 },
        name: 'Person',
        attributes: ['firstName: String','lastName: String'],
        methods: ['+ setName(first: String, last: String): Void','+ getName(): String']
    }),

    bloodgroup: new uml.Class({
        position: { x:20  , y: 190 },
        size: { width: 220, height: 100 },
        name: 'BloodGroup',
        attributes: ['bloodGroup: String'],
        methods: ['+ isCompatible(bG: String): Boolean']
    }),

    address: new uml.Class({
        position: { x:630  , y: 190 },
        size: { width: 160, height: 100 },
        name: 'Address',
        attributes: ['houseNumber: Integer','streetName: String','town: String','postcode: String'],
        methods: []
    }),

    man: new uml.Class({
        position: { x:200  , y: 500 },
        size: { width: 180, height: 50 },
        name: 'Man'
    }),

    woman: new uml.Class({
        position: { x:450  , y: 500 },
        size: { width: 180, height: 50 },
        name: 'Woman',
        methods: ['+ giveABrith(): Person []']
    })
}
*/


/*
var relations = [
    new uml.Generalization({ source: { id: classes.man.id }, target: { id: classes.person.id }}),
    new uml.Generalization({ source: { id: classes.woman.id }, target: { id: classes.person.id }}),
    new uml.Implementation({ source: { id: classes.person.id }, target: { id: classes.mammal.id }}),
    new uml.Aggregation({ source: { id: classes.person.id }, target: { id: classes.address.id }}),
    new uml.Composition({ source: { id: classes.person.id }, target: { id: classes.bloodgroup.id }})
];
*/



