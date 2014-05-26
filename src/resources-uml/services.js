(function(angular){
  angular.module('fortuneAdmin.Uml.Services', [])
    .service('UmlElementsRegistry', [ElementsRegistry])
    .service('UmlElementModel', ['UmlElementsRegistry', UmlElementModel]);

  function ElementsRegistry(){
    var elements = {
      resources: [],
      fields: []
    };
    var baseOffset = 0;

    this.positions = [];
    this.bottomLine = [];

    this.setBase = function(offset){
      baseOffset = offset;
    };

    this.getBaseOffset = function(){
      return baseOffset;
    };

    this.add = function(type, elt, id){
      //somehow id gets \n
      id = id.replace(/\n/ig, '');

      elements[type].push({
        id: id,
        top: elt.offsetTop - baseOffset,
        left: elt.offsetLeft,
        right: elt.offsetLeft + elt.clientWidth
      });
    };

    /**
     * @param type - type of elements to lookup
     * @param name - resource name + field name
     */
    this.find = function(type, name){
      var element = null;
      angular.forEach(elements[type], function(elt){
        if (elt.id === name){
          element = elt;
        }
      });
      return element;
    };

    this.remove = function(type, name){
      //Finds element in array and destroys it
    };

    this.clear = function(){
      elements = {
        resources: [],
        fields: []
      };
      this.positions = [];
      this.bottomLine = [];
    }
  }

  function UmlElementModel(UmlElementRegistry){
    function Element(name, data, links){
      //Make sure the element is unique
      if (UmlElementRegistry.find(parent + name)){
        throw new Error('Element ' + parent + name + ' exists');
      }

      this.name = name;
      this.parent = parent;
      this.data = data;
      this.links = links;
    }

    /**
     * Ensure data format.
     * Calculate missing attributes
     * Store in registry
     * @param type
     * @param data
     */
    this.createElement = function(type, data){

    };

    this.addChild = function(parent, child){

    };

    this.clear = function(name){
      UmlElementRegistry.remove(name);
    };
  }

})(angular);