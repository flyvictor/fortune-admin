var graph = new joint.dia.Graph;

var paper = new joint.dia.Paper({
    el: $('#paper'),
    width: 1200,
    height: 1200,
    gridSize: 1,
    model: graph
});

function populateClasses(data){
    var classes = {},
      relations = [],
      R = 250,
      fi = 0,
      dfi = 2*Math.PI / 8,
      uml = joint.shapes.uml;
    for(var resource in data){
        var attributes = []
            pk = data[resource]['pk'],
            schema = data[resource]['schema'],
            fks = data[resource]['fks'];
        attributes.push("[PK] " + pk);
        for(var a in fks)
            attributes.push("[FK] " + fks[a]);
        for(var a in schema){
            if(schema[a] != pk && -1 == fks.indexOf(schema[a]))
                attributes.push(schema[a]);
        }
        classes[resource] = new uml.Class({
            position: {x: 400 + R * Math.sin(fi), y: 300 - R * Math.cos(fi)},
            size: {width: 100, height: 50+15*attributes.length},
            name: resource,
            attributes: attributes,
            methods: []
        });
        fi += dfi;
        if(fi > 2*Math.PI){
            fi = Math.PI / 8;
            R = 150;
        }
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
