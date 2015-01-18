angular.module('templates-main', ['/views/directives/attribute.html', '/views/directives/description.html', '/views/directives/example.html', '/views/directives/gui.html', '/views/directives/requestResponse.html', '/views/directives/response.html', '/views/docs.html', '/views/directives/faActions.html', '/views/directives/faAlert.html', '/views/directives/faDeleteConfirm.html', '/views/directives/faDetails.html', '/views/directives/faEditable.html', '/views/directives/faGrid.html', '/views/directives/uml/canvas.html', '/views/resources.html', '/views/uml.html', '/views/docsCells.html', '/views/mynavbar.html', '/views/resourcesCells.html', '/views/umlCells.html']);

angular.module("/views/directives/attribute.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/views/directives/attribute.html",
    "<div>\n" +
    "    <!-- string -->\n" +
    "    <div ng-if=\"value.type == 'String'\">\n" +
    "        <input type=\"text\" ng-model=\"data[name]\" class=\"form-control\" />\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- date -->\n" +
    "    <div ng-if=\"value.type == 'Date' || value == 'Date'\">\n" +
    "        <input type=\"date\" class=\"form-control\" ng-model=\"data[name]\" />\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- link to another resource -->\n" +
    "    <div ng-if=\"value.ref\">\n" +
    "        link to {{value.ref}}\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- array of links to another resources -->\n" +
    "    <div ng-if=\"value[0].ref\">\n" +
    "        array of links to {{value[0].ref}}\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("/views/directives/description.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/views/directives/description.html",
    "<div class=\"resource-description\">\n" +
    "    <h4><strong>The {{resource.name}} object</strong></h4>\n" +
    "    <h5><strong>Attributes</strong></h5>\n" +
    "    <table>\n" +
    "        <tr ng-repeat=\"attrName in resource.schema | notSorted\" ng-init=\"attrValue = resource.schema[attrName]\">\n" +
    "            <td><strong>{{attrName}}:</strong></td>\n" +
    "            <td>\n" +
    "                {{attrValue.type || attrValue}}\n" +
    "                <p ng-if=\"attrValue['docs:description']\">\n" +
    "                    {{attrValue['docs:description']}}\n" +
    "                </p>\n" +
    "            </td>\n" +
    "        </tr>\n" +
    "    </table>\n" +
    "</div>");
}]);

angular.module("/views/directives/example.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/views/directives/example.html",
    "<div class=\"resource-example\">\n" +
    "    <h4>{{ resource.name+' object example' | uppercase }}</h4>\n" +
    "    <span>\n" +
    "       &#123;<br/>\n" +
    "       <span ng-repeat=\"attrName in resource.schema | notSorted\" ng-init=\"attrValue = resource.schema[attrName]\">\n" +
    "           &ensp;&ensp;\n" +
    "           <span>&#34;{{attrName}}&#34;:</span>\n" +
    "           <span>&#34;{{attrValue['docs:example']}}&#34;</span>\n" +
    "           <span ng-if=\"!$last\">,<br/></span>\n" +
    "       </span>\n" +
    "       <br/>&#125;\n" +
    "    </span>\n" +
    "</div>");
}]);

angular.module("/views/directives/gui.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/views/directives/gui.html",
    "<div class=\"resource-giu\">\n" +
    "    <h4><strong>/{{resource.name}}:</strong> Operations about {{resource.name}} </h4>\n" +
    "\n" +
    "    <!-- Methods menu -->\n" +
    "    <div class=\"btn-group\">\n" +
    "        <button type=\"button\" class=\"btn btn-default\" ng-repeat=\"httpMethod in httpMethods\"\n" +
    "                ng-class=\"{'active':selectedMethod == httpMethod}\"\n" +
    "                ng-click=\"selectMethod(httpMethod)\">\n" +
    "            {{httpMethod | uppercase }}\n" +
    "        </button>\n" +
    "    </div>\n" +
    "\n" +
    "    <request-response-container resource=\"resource\" method=\"selectedMethod\"></request-response-container>\n" +
    "</div>");
}]);

angular.module("/views/directives/requestResponse.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/views/directives/requestResponse.html",
    "<div class=\"request col-md-12\">\n" +
    "    <h3>Request</h3>\n" +
    "    <div ng-if=\"method == 'get'\">\n" +
    "        <table class=\"table\" ng-if=\"ids.length !== 0\">\n" +
    "            <tr>\n" +
    "                <td>Parameter</td>\n" +
    "                <td>Value</td>\n" +
    "                <td>Actions</td>\n" +
    "            </tr>\n" +
    "            <tr ng-repeat=\"id in ids\">\n" +
    "                <td>{{PK}}</td>\n" +
    "                <td>{{id}}</td>\n" +
    "                <td>\n" +
    "                    <a href ng-click=\"removeRequestParameter(id)\"><span class=\"glyphicon glyphicon-remove\"></span></a>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "        </table>\n" +
    "        <table class=\"table\">\n" +
    "            <tr>\n" +
    "                <td>{{PK}}</td>\n" +
    "                <td><input type=\"text\" class=\"form-control\" ng-model=\"id\"/></td>\n" +
    "                <td><button type=\"button\" ng-click=\"addRequestParameter(id)\" class=\"btn btn-default btn-sm\">Add {{resource.name}}</button></td>\n" +
    "            </tr>\n" +
    "            <tr ng-if=\"ids.length == 1\">\n" +
    "                <td>Related resource name (one level deep):</td>\n" +
    "                <td><input type=\"text\" class=\"form-control\" ng-model=\"relatedResource.name\"/><td>\n" +
    "                <td></td>\n" +
    "            </tr>\n" +
    "        </table>\n" +
    "        <button type=\"button\" ng-click=\"sendGETRequest(resource, ids, relatedResource.name)\" class=\"btn btn-default btn-primary\">Send request</button>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"method == 'post'\" ng-init=\"data={}\">\n" +
    "        <table class=\"table\">\n" +
    "            <tr ng-repeat=\"attrName in resource.schema | notSorted\">\n" +
    "                <td>{{attrName}} <span ng-if=\"PK == attrName\">(primary key)</span></td>\n" +
    "                <td>\n" +
    "                    <resource-attribute name=\"attrName\" value=\"resource.schema[attrName]\"></resource-attribute>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "        </table>\n" +
    "        <button type=\"button\" ng-click=\"sendPOSTRequest(resource, data)\" class=\"btn btn-default btn-primary\">Send request</button>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"method == 'delete'\">\n" +
    "        <table class=\"table\">\n" +
    "            <tr>\n" +
    "                <td>{{PK}}</td>\n" +
    "                <td><input type=\"text\" class=\"form-control\" ng-model=\"id\"/></td>\n" +
    "            </tr>\n" +
    "        </table>\n" +
    "        <button type=\"button\" ng-click=\"sendDELETERequest(resource, id)\" class=\"btn btn-default btn-primary\">Send request</button>\n" +
    "    </div>\n" +
    "\n" +
    "    <response ng-if=\"response[resource.name][method]\" response=\"response[resource.name][method]\"></response>\n" +
    "</div>");
}]);

angular.module("/views/directives/response.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/views/directives/response.html",
    "<div class=\"response\">\n" +
    "    <h3>Response</h3>\n" +
    "    <table class=\"table\">\n" +
    "        <tr>\n" +
    "            <td>Status</td>\n" +
    "            <td>{{response.status}}</td>\n" +
    "        </tr>\n" +
    "        <tr>\n" +
    "            <td>Body</td>\n" +
    "            <td><pre>{{response.body | json}}</pre></td>\n" +
    "        </tr>\n" +
    "    </table>\n" +
    "</div>");
}]);

angular.module("/views/docs.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/views/docs.html",
    "<section id=\"fortune-admin\" ng-class=\"{wmargin: navbarEnabled}\">\n" +
    "    <div ng-if=\"navbarEnabled\">\n" +
    "        <fortune-admin-navbar></fortune-admin-navbar>\n" +
    "    </div>\n" +
    "    <div id=\"guide\" ng-if=\"resources.length !== 0\" ng-class=\"{ 'stick': selected !== undefined }\">\n" +
    "        <div>\n" +
    "            <div class=\"list-group\">\n" +
    "                <a href class=\"list-group-item\" ng-class=\"itemClass(resource.name)\" ng-repeat=\"resource in resources\"\n" +
    "                   ng-click=\"select(resource.name)\">\n" +
    "                    {{ resource.name }}\n" +
    "                </a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div id=\"api-docs\" ng-init=\"selectedMode = 'example'\">\n" +
    "        <ul class=\"nav nav-tabs\" role=\"tablist\">\n" +
    "            <li ng-class=\"{ 'active': selectedMode == 'example' }\" ng-click=\"selectedMode='example'\">\n" +
    "                <a href=\"#\">Example</a>\n" +
    "            </li>\n" +
    "            <li ng-class=\"{ 'active': selectedMode == 'interaction' }\" ng-click=\"selectedMode='interaction'\">\n" +
    "                <a href=\"#\">Interaction</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "        <div class=\"tab-content\" ng-if=\"selectedMode == 'example'\">\n" +
    "            <div class=\"single-resource\" id=\"{{resource.name}}\" ng-repeat=\"resource in resources\">\n" +
    "                <resource-description resource=\"resource\"></resource-description>\n" +
    "                <resource-example resource=\"resource\"></resource-example>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"tab-content\" ng-if=\"selectedMode == 'interaction'\">\n" +
    "            <div class=\"single-resource\" id=\"{{resource.name}}\" ng-repeat=\"resource in resources\">\n" +
    "                <resource-gui resource=\"resource\"></resource-gui>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</section>");
}]);

angular.module("/views/directives/faActions.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/views/directives/faActions.html",
    "<div class=\"btn-group\" style=\"width: 100px;\">\n" +
    "  <button type=\"button\" class=\"btn btn-danger\" ng-click=\"actions.delete.method(model)\">{{actions.delete.title || 'Delete'}}</button>\n" +
    "  <button type=\"button\" class=\"btn btn-danger dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\">\n" +
    "    <span class=\"caret\"></span>\n" +
    "    <span class=\"sr-only\">Toggle Dropdown</span>\n" +
    "  </button>\n" +
    "  <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "    <li ng-repeat=\"action in actions\">\n" +
    "      <a href=\"#\" ng-click=\"actions[action.name].method(model)\" ng-hide=\"action.name == 'delete'\">{{action.title || action.name}}</a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("/views/directives/faAlert.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/views/directives/faAlert.html",
    "<div class=\"modal-body\" style=\"text-align:center;\">\n" +
    "  <button class=\"close pull-right\" type=\"button\" aria-label=\"Close\" ng-click=\"close()\">\n" +
    "    <span aria-hidden=\"true\">&times;</span>\n" +
    "  </button>\n" +
    "  <h1>\n" +
    "    {{message.text}}\n" +
    "  </h1>\n" +
    "  <br />\n" +
    "  <br />\n" +
    "  <div>\n" +
    "    <button class=\"btn btn-primary btn-lg\" ng-click=\"close()\">Ok</button>\n" +
    "  <div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("/views/directives/faDeleteConfirm.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/views/directives/faDeleteConfirm.html",
    "<div class=\"modal-body\" style=\"text-align:center;\">\n" +
    "  <button class=\"close pull-right\" type=\"button\" aria-label=\"Close\" ng-click=\"close()\">\n" +
    "    <span aria-hidden=\"true\">&times;</span>\n" +
    "  </button>\n" +
    "  <h1>\n" +
    "    Are you sure you want to delete the ...?\n" +
    "  </h1>\n" +
    "  The operation cannot be undone.\n" +
    "  <br/>\n" +
    "  <br/>\n" +
    "  <div>\n" +
    "    <button class=\"btn btn-danger btn-lg\" ng-click=\"confirm()\">Delete</button>\n" +
    "    <button class=\"btn btn-default btn-lg\" ng-click=\"close()\">Cancel</button>\n" +
    "  <div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("/views/directives/faDetails.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/views/directives/faDetails.html",
    "<div class=\"modal-body\">\n" +
    "  <button class=\"close pull-right\" type=\"button\" aria-label=\"Close\" ng-click=\"close()\">\n" +
    "    <span aria-hidden=\"true\">&times;</span>\n" +
    "  </button>\n" +
    "  <h1>\n" +
    "    Details\n" +
    "  </h1>\n" +
    "\n" +
    "  <div ng-repeat=\"(key, value) in model\" class=\"form-group\">\n" +
    "    <label>{{key}}</label>\n" +
    "    <p class=\"form-control-static\">{{value}}</p>\n" +
    "  </div>\n" +
    "\n" +
    "  <div>\n" +
    "    <button class=\"btn btn-primary btn-lg\" ng-click=\"close()\">Ok</button>\n" +
    "  <div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("/views/directives/faEditable.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/views/directives/faEditable.html",
    "<section>\n" +
    "  <div ng-switch=\"schemaType\">\n" +
    "    <div ng-switch-when=\"String\">\n" +
    "      <a href=\"#\" onaftersave=\"apply(value)\" editable-text=\"value\">{{value || 'Not set.'}}</a>\n" +
    "    </div>\n" +
    "    <div ng-switch-when=\"Number\">\n" +
    "      <a href=\"#\" onaftersave=\"apply(value)\" editable-number=\"value\">{{value || 'Not set.'}}</a>\n" +
    "    </div>\n" +
    "    <div ng-switch-when=\"Date\">\n" +
    "      <a href=\"#\" onaftersave=\"apply(value)\" editable-date=\"value\">{{value || 'Not set.'}}</a>\n" +
    "    </div>\n" +
    "    <div ng-switch-when=\"Boolean\">\n" +
    "      <a href=\"#\" onaftersave=\"apply(value)\" editable-checkbox=\"value\">{{value ? 'Yep' : 'Nope'}}</a>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</section>");
}]);

angular.module("/views/directives/faGrid.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/views/directives/faGrid.html",
    "<table class=\"table table-bordered\">\n" +
    "    <tr>\n" +
    "        <th>\n" +
    "            <div ng-class=\"{'column-filter': _showFilter}\">\n" +
    "                <span>ID</span>\n" +
    "                <div ng-show=\"_showFilter\">\n" +
    "                    <input type=\"text\" class=\"form-control\" ng-model=\"idQuery\" typeahead=\"item.id for item in getTypeaheadList({str: $viewValue, name: 'id', type: type})\" typeahead-on-select=\"applyFilter({item: $item, model: $model, label: $label}, name, type)\">\n" +
    "                </div>\n" +
    "                <span class=\"glyphicon glyphicon-filter\" ng-show=\"!_showFilter\" ng-click=\"_showFilter = !_showFilter\"></span>\n" +
    "                <span class=\"glyphicon glyphicon-remove\" ng-show=\"_showFilter\" ng-click=\"_showFilter = false; idQuery=''; dropFilter(name, idQuery)\"></span>\n" +
    "            </div>\n" +
    "        </th>\n" +
    "        <th ng-repeat=\"(name, type) in currentResource.schema | filterLinks\" ng-class=\"{'column-filter': showFilter}\" ng-init=\"type = type.type || type\">\n" +
    "            <div>\n" +
    "                <span>{{name}}</span>\n" +
    "                <span class=\"glyphicon glyphicon-filter\" ng-show=\"!showFilter\" ng-click=\"showFilter = !showFilter\"></span>\n" +
    "                <span class=\"glyphicon glyphicon-remove\" ng-show=\"showFilter\" ng-click=\"showFilter = false; taQuery=''; dropFilter(name, taQuery)\"></span>\n" +
    "            </div>\n" +
    "            <div ng-switch=\"type\">\n" +
    "                <div ng-switch-when=\"String\" ng-show=\"showFilter\">\n" +
    "                    <input type=\"text\" class=\"form-control\" ng-model=\"taQuery\" typeahead=\"item.{{name}} for item in getTypeaheadList({str: $viewValue, name: name, type: type})\" typeahead-on-select=\"applyFilter({item: $item, model: $model, label: $label}, name, type)\">\n" +
    "                </div>\n" +
    "                <div ng-switch-when=\"Number\" ng-show=\"showFilter\">\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <span class=\"input-group-addon\">From:</span>\n" +
    "                        <input type=\"number\" ng-model=\"Query.start\" class=\"form-control\" ng-change=\"applyFilter(Query, name, type)\"/>\n" +
    "                    </div>\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <span class=\"input-group-addon\">To:</span>\n" +
    "                        <input class=\"form-control\" type=\"number\" ng-model=\"Query.end\"  ng-change=\"applyFilter(Query, name, type)\"/>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div ng-switch-when=\"Date\" ng-show=\"showFilter\">\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <span class=\"input-group-addon\">From:</span>\n" +
    "                        <input type=\"date\" class=\"form-control\" ng-model=\"Query.start\" ng-change=\"applyFilter(Query, name, type)\"/>\n" +
    "                    </div>\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <span class=\"input-group-addon\">To:</span>\n" +
    "                        <input type=\"date\" class=\"form-control\" ng-model=\"Query.end\"  ng-change=\"applyFilter(Query, name, type)\"/>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div ng-switch-when=\"Boolean\" ng-show=\"showFilter\">\n" +
    "                    <div class=\"btn-group btn-group-sm\">\n" +
    "                        <button class=\"btn btn-sm\" ng-class=\"{'btn-default': !Query.yep, 'btn-info': Query.yep}\" type=\"button\" ng-click=\"Query.yep = true; Query.nope=false; applyFilter(true, name, type);\">Yep</button>\n" +
    "                        <button class=\"btn btn-sm\" ng-class=\"{'btn-default': !Query.nope, 'btn-info': Query.nope}\" type=\"button\" ng-click=\"Query.yep = false; Query.nope=true; applyFilter(false, name, type);\">Nope</button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </th>\n" +
    "        <th ng-repeat=\"(linkName, link) in links\">{{resolveFieldName(linkName)}}</th>\n" +
    "        <th>Actions</th>\n" +
    "    </tr>\n" +
    "    <tr ng-repeat=\"entity in data\" ng-hide=\"entity.deleted\">\n" +
    "        <td>{{entity.id}}</td>\n" +
    "        <td ng-repeat=\"(path, type) in currentResource.schema | filterLinks\" ng-init=\"type = type.type || type\">\n" +
    "            <fa-editable ng-model=\"entity[path]\" path=\"path\" resource-name=\"{{currentResource.route}}\" resource-id=\"{{entity.id}}\" schema-type=\"type\"></fa-editable>\n" +
    "        </td>\n" +
    "        <td ng-repeat=\"(linkName, link) in links\">\n" +
    "            <div ng-if=\"linkToMany(linkName)\">\n" +
    "                <a ng-href=\"{{ fortuneAdminRoute('subresource', {parent: currentResource.route, id: entity.id, name: link.type, inverse: resolveInverse(linkName)}) }}\">Navigate to {{link.type}}</a>\n" +
    "            </div>\n" +
    "            <div ng-if=\"!linkToMany(linkName)\">\n" +
    "                <div ng-init=\"fname = resolveFieldName(linkName)\"></div>\n" +
    "                <!--Initialize links if they do not come from server-->\n" +
    "                <div ng-init=\"entity.links = entity.links || {}\"></div>\n" +
    "                <fa-ref ng-model=\"entity.links[fname]\" ref=\"currentResource.schema[fname]\" resource-name=\"{{currentResource.route}}\" resource-id=\"{{ entity.id }}\"></fa-ref>\n" +
    "            </div>\n" +
    "        </td>\n" +
    "        <td>\n" +
    "             <fa-actions ng-model=\"entity\" ng-model-collection-name=\"currentResource.route\"></fa-actions>\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "</table>\n" +
    "");
}]);

angular.module("/views/directives/uml/canvas.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/views/directives/uml/canvas.html",
    "<div id=\"umlcanvas\">\n" +
    "</div>");
}]);

angular.module("/views/resources.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/views/resources.html",
    "<section id=\"fortune-admin\" ng-class=\"{wmargin: navbarEnabled}\">\n" +
    "  <div ng-if=\"navbarEnabled\">\n" +
    "    <fortune-admin-navbar></fortune-admin-navbar>\n" +
    "  </div>\n" +
    "  <h4 class=\"text-center\">{{ parentResourceName | uppercase }} {{ parentId ? parentId + ' /' : null}} {{plurResourceName | uppercase}}</h4>\n" +
    "  <fa-grid data=\"data\" links=\"links\" resources=\"resources\" current-resource=\"currentResource\" filter=\"filter\" filter-changed-cb=\"ResourcesCtrl.filterChangedCb()\" get-typeahead-list=\"getTypeaheadList(str, name, type)\"></fa-grid>\n" +
    "  <div class=\"col-md-3\">\n" +
    "    <div ng-hide=\"PK === 'id'\">\n" +
    "      <label>Enter {{ PK }} for new {{ currentResource.name }}</label>\n" +
    "      <input type=\"text\" ng-model=\"PrimaryKey\" ng-required=\"true\" class=\"form-control\"/>\n" +
    "    </div>\n" +
    "    <button type=\"button\" ng-click=\"ResourcesCtrl.addRow(PrimaryKey)\" class=\"btn btn-default btn-sm\" ng-disabled=\"PK !== 'id' && !PrimaryKey\">Create new row</button>\n" +
    "  </div>\n" +
    "</section>\n" +
    "");
}]);

angular.module("/views/uml.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/views/uml.html",
    "<section id=\"fortune-admin\" ng-class=\"{wmargin: navbarEnabled}\">\n" +
    " <div ng-if=\"navbarEnabled\">\n" +
    "    <fortune-admin-navbar></fortune-admin-navbar>\n" +
    "  </div>\n" +
    "  <section ng-if=\"resources.length !== 0\">\n" +
    "    <div ng-if=\"render\">\n" +
    "      <div resources-canvas resources=\"resources\"></div>\n" +
    "    </div>\n" +
    "  </section>\n" +
    "</section>");
}]);

angular.module("/views/docsCells.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/views/docsCells.html",
    "<li><a data-ng-href=\"{{ r('docs_page') }}\">Docs</a></li>");
}]);

angular.module("/views/mynavbar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/views/mynavbar.html",
    "<nav class=\"navbar navbar-inverse navbar-fixed-top\" role=\"navigation\" bs-navbar>\n" +
    "    <div class=\"container-fluid\">\n" +
    "        <div class=\"navbar-header\">\n" +
    "            <a class=\"navbar-brand\" href=\"#\"><b>Fortune Admin</b></a>\n" +
    "        </div>\n" +
    "        <div class=\"collapse navbar-collapse\">\n" +
    "          <ul class=\"nav navbar-nav\">\n" +
    "            <fortune-admin-resources-cells></fortune-admin-resources-cells>\n" +
    "            <fortune-admin-uml-cells></fortune-admin-uml-cells>\n" +
    "            <fortune-admin-docs-cells></fortune-admin-docs-cells>\n" +
    "          </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</nav>\n" +
    "\n" +
    "");
}]);

angular.module("/views/resourcesCells.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/views/resourcesCells.html",
    "<li class=\"dropdown\">\n" +
    "  <a href=\"#\" class=\"dropdown-toggle\">Resources <b class=\"caret\"></b></a>\n" +
    "  <ul class=\"dropdown-menu\">\n" +
    "    <li ng-repeat=\"service in services\">\n" +
    "      <a ng-click=\"service.collapse = !service.collapse; $event.stopPropagation();\">{{service.name}}</a>\n" +
    "      <div collapse=\"service.collapse\">\n" +
    "        <div ng-repeat=\"resource in service.resources | orderBy:'name'\">\n" +
    "          <a data-ng-href=\"{{ r('resource', {name: resource.route }) }}\">{{ resource.route }}</a>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</li>");
}]);

angular.module("/views/umlCells.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/views/umlCells.html",
    "<li><a data-ng-href=\"{{ r('uml_diagram') }}\">UML</a></li>");
}]);

/*(function(){
  if (!window.CONFIG) window.CONFIG = {};

   window.CONFIG.docs =  {
    templateDirectory: '/views/',
    baseEndpoint: '',
    apiNamespace: '/api/v1',
    getApiNamespace: function(){
      return this.baseEndpoint + this.apiNamespace;
    },
    mountPoint: '',
    appVersion: 1,
    viewUrlPrefix: '/views/',
    templateFileSuffix: '.html',
    prepareViewTemplateUrl: function(url){
      return this.viewUrlPrefix + url + this.templateFileSuffix;
    },
    routing: {
      html5Mode : true,
      prefix: ''
    },
    authToken: ''
  };
})();*/

angular.module('docs.Config', [])
    .constant('docsConfigConstant', {
        templateDirectory: '/views/',
        baseEndpoint: '',
        apiNamespace: '/api/v1',
        getApiNamespace: function(){
            return this.baseEndpoint + this.apiNamespace;
        },
        mountPoint: '',
        appVersion: 1,
        viewUrlPrefix: '/views/',
        templateFileSuffix: '.html',
        prepareViewTemplateUrl: function(url){
            return this.viewUrlPrefix + url + this.templateFileSuffix;
        },
        routing: {
            html5Mode : true,
            prefix: ''
        },
        authToken: ''
    });

(function(angular){
    angular.module('docs.Controllers', ['docs.Config'])
        .controller('DocsCtrl', ['$scope', '$location', '$anchorScroll', 'resources', 'docsConfigConstant', DocsController]);

    function DocsController($scope, $location, $anchorScroll, resources, config){
        $scope.resources = resources;
        $scope.selected = $scope.resources.length ? $scope.resources[0].name : undefined;

        // select api item
        $scope.select = function (item) {
            $scope.selected = item;
            var oldLocation = $location.hash();
            $location.hash(item);
            $anchorScroll();
            $location.hash(oldLocation);
        };

        // add class to selected api item
        $scope.itemClass = function (item) {
            return $scope.selected === item ? 'active' : undefined;
        };
    }
})(angular);


(function(angular){
  angular.module('docs.Directives', ['docs.Config'])
      .directive('resourceDescription', ['docsConfigConstant', function(config){
          return {
              restrict: 'E',
              replace: true,
              templateUrl: config.prepareViewTemplateUrl('directives/description'),
              scope: {
                  resource: '='
              }
          }
      }])
      .directive('resourceExample', ['docsConfigConstant', function(config){
          return {
              restrict: 'E',
              replace: true,
              templateUrl: config.prepareViewTemplateUrl('directives/example'),
              scope: {
                  resource: '='
              }
          }
      }])
      .directive('resourceGui', ['docsConfigConstant', '$http', function(config){
          return {
              restrict: 'E',
              replace: true,
              templateUrl: config.prepareViewTemplateUrl('directives/gui'),
              scope: {
                  resource: '='
              },
              link: function ($scope) {
                  $scope.httpMethods = ['get', 'post', 'put', 'patch', 'delete'];
                  $scope.selectedMethod = $scope.httpMethods[0];

                  $scope.selectMethod = function (method) {
                      $scope.selectedMethod = method;
                  };
              }
          }
      }])
      .directive('requestResponseContainer', ['docsConfigConstant', '$http', function(config, $http){
          return {
              restrict: 'E',
              replace: true,
              templateUrl: config.prepareViewTemplateUrl('directives/requestResponse'),
              scope: {
                  resource: '=',
                  method: '='
              },
              link: function ($scope) {
                  $scope.PK = $scope.resource.modelOptions ? $scope.resource.modelOptions.pk || 'id' : 'id';
                  $scope.ids = [];
                  $scope.relatedResource = {};
                  $scope.response = {};

                  $scope.addRequestParameter = function (id) {
                      if (id && $scope.ids.indexOf(id) == -1) $scope.ids.push(id);
                  };

                  $scope.removeRequestParameter = function (id) {
                      var index = $scope.ids.indexOf(id);
                      $scope.ids.splice(index, 1);
                  };

                  $scope.sendGETRequest = function (resource, ids, relatedResourceName) {
                      var requestConfig = {
                          method: $scope.method,
                          url: config.getApiNamespace() + '/' + resource.route
                      };

                      if (ids.length) {
                          if (ids.length == 1) requestConfig.url += '/' + ids[0];
                          if (ids.length > 1) requestConfig.params = { ids: ids.join(',') };
                          if (relatedResourceName) requestConfig.url += '/' + relatedResourceName;
                      }

                      $http(requestConfig)
                          .success(function (data, status, headers, config) {
                              $scope.response[resource.name] = $scope.response[resource.name] || {};
                              $scope.response[resource.name][$scope.method] = { body: data, status: status };
                          })
                          .error(function (data, status, headers, config) {
                              $scope.response[resource.name] = $scope.response[resource.name] || {};
                              $scope.response[resource.name][$scope.method] = { body: data || 'Request failed', status: status };
                          });
                  };

                  $scope.sendPOSTRequest = function (resource, data) {
                      var requestConfig = {
                          method: $scope.method,
                          url: config.getApiNamespace() + '/' + resource.route,
                          headers: {
                              "Content-Type": "application/json"
                          },
                          data: data
                      };

                      $http(requestConfig)
                          .success(function (data, status, headers, config) {
                              $scope.response[resource.name] = $scope.response[resource.name] || {};
                              $scope.response[resource.name][$scope.method] = { body: data, status: status };
                          })
                          .error(function (data, status, headers, config) {
                              $scope.response[resource.name] = $scope.response[resource.name] || {};
                              $scope.response[resource.name][$scope.method] = { body: data || 'Request failed', status: status };
                          });
                  };

                  $scope.sendDELETERequest = function (resource, id) {
                      var requestConfig = {
                          method: $scope.method,
                          url: config.getApiNamespace() + '/' + resource.route + '/' + id
                      };

                      $http(requestConfig)
                          .success(function (data, status, headers, config) {
                              $scope.response[resource.name] = $scope.response[resource.name] || {};
                              $scope.response[resource.name][$scope.method] = { body: data, status: status };
                          })
                          .error(function (data, status, headers, config) {
                              $scope.response[resource.name] = $scope.response[resource.name] || {};
                              $scope.response[resource.name][$scope.method] = { body: data || 'Request failed', status: status };
                          });
                  };
              }
          }
      }])
      .directive('response', ['docsConfigConstant', function(config){
          return {
              restrict: 'E',
              replace: true,
              templateUrl: config.prepareViewTemplateUrl('directives/response'),
              scope: {
                  response: '='
              }
          }
      }])
      .directive('resourceAttribute', ['docsConfigConstant', function(config){
          return {
              restrict: 'E',
              replace: true,
              templateUrl: config.prepareViewTemplateUrl('directives/attribute'),
              scope: {
                  name: '=',
                  value: '='
              },
              link: function ($scope) {
                  $scope.data = $scope.$parent.data;
              }
          }
      }])
})(angular);


angular.module('docs', [
    'sharedElements',
    'docs.Config',
    'docs.Controllers',
    'docs.Directives'
])
.provider('docs', [ 'docsConfigConstant', function(config){
    var lookup = {};
    var otherwiseLookup = null;

    var ROUTER = {
        when: function(key, url, params) {
            lookup[key] = {
                url : url,
                params : params
            };
        },

        install: function($routeProvider) {
            for(var key in lookup) {
                var route = lookup[key];
                var url = route['url'];
                var params = route['params'];
                $routeProvider.when(url, params);
            }
            if(otherwiseLookup) {
                $routeProvider.otherwise(otherwiseLookup);
            }
        }
    };

    //var config = CONFIG.docs;
    return {
        setApiHost: function(host){
            config.baseEndpoint = host;
        },
        setApiNamespace: function(namespace){
            config.apiNamespace = namespace;
        },
        html5Mode: function(use, prefix){
            config.routing.html5Mode = !!use;
            config.routing.urlPrefix = prefix || '';
        },
        enableNavbar: function(){
            config.enableNavbar = true;
        },
        mountTo: function($routeProvider, mountPoint){

            ROUTER.when('docs_page', mountPoint + '/docs', {
                templateUrl : config.prepareViewTemplateUrl('docs', 'docs'),
                controller:'DocsCtrl as DocsCtrl',
                resolve: {
                    resources: ['$q', '$http', function($q, $http){
                        /*angular.forEach(data.resources, function(item){ if (!item.service) item.service = “default”});*/
                        var d = $q.defer();
                        $http.get(config.baseEndpoint + '/resources').success(function(data){
                            d.resolve(data.resources);
                        });
                        return d.promise;
                    }]
                }
            });

            ROUTER.install($routeProvider);
        },

        $get: ['docsConfigConstant', function(config){
            return {

                getRoute: function(key) {
                    return lookup[key];
                },

                replaceUrlParams: function(url, params) {
                    for(var k in params) {
                        var v = params[k];
                        url = url.replace(':'+k,v);
                    }
                    return url;
                },

                routeDefined: function(key) {
                    return !! this.getRoute(key);
                },

                routePath: function(key, args) {
                    var url = this.getRoute(key);
                    url = url ? url.url : null;
                    if(url && args) {
                        url = this.replaceUrlParams(url, args);
                    }
                    return config.routing.html5Mode ? url : '/#' + config.routing.urlPrefix + url;
                },

                setApiHost: function(host){
                    config.baseEndpoint = host;
                },
                setApiNamespace: function(namespace){
                    config.apiNamespace = namespace;
                },
                setAuthToken: function(token){
                    config.authToken = token;
                }
            }
        }]
    }
}])

.run(['$rootScope', '$location', 'docs', 'editableOptions', 'docsConfigConstant',
    function($rootScope, $location, docs, editableOptions, config) {
        var prefix = '';

        $rootScope.docsRoute = function(url, args) {
            return prefix + docs.routePath(url, args);
        };
        //$rootScope.navbarEnabled = !!CONFIG.docs.enableNavbar;
        $rootScope.navbarEnabled = config.enableNavbar;

        // bootstrap3 theme. Can be also 'bs2', 'default'
        editableOptions.theme = 'bs3';
    }]);

(function(){
  if (!window.CONFIG) window.CONFIG = {};

   window.CONFIG.fortuneAdmin =  {
    templateDirectory: '/views/',
    baseEndpoint: '',
    apiNamespace: '/api/v1',
    getApiNamespace: function(){
      return this.baseEndpoint + this.apiNamespace;
    },
    mountPoint: '',
    appVersion: 1,
    viewUrlPrefix: '/views/',
    templateFileSuffix: '.html',
    prepareViewTemplateUrl: function(url){
       return this.viewUrlPrefix + url + this.templateFileSuffix;
    },
    routing: {
      html5Mode : true,
      prefix: ''
    },
    authToken: ''
  };
})();

'use strict';
angular.module('fortuneAdmin.Controllers', [
    'fortuneAdmin.Services',
    'ui.bootstrap'
  ])
  .controller('faActionsCtrl', [
    '$scope', 
    '$modal',
    '$http',
    'faActionsService',
    function ($scope, $modal, $http, faActionsService) {
      //$scope.collectionName; injected from directive

      $scope.actions = {
        'delete': {
          name: 'delete',
          title: 'Delete',
          method: function(model) {
            var dialog = $modal.open({
               templateUrl: CONFIG.shared.prepareViewTemplateUrl('directives/faDeleteConfirm'),
               controller: 'DeleteConfirmCtrl'
            }).result.then(function(confirmed) {
              if(confirmed) {
                // Delete confirmed
                $http.delete([CONFIG.fortuneAdmin.getApiNamespace(), $scope.collectionName, model.id].join('/'))
                  .then(function(resp) {
                    model.deleted = true;

                    // Show successfull dialog
                    var green = $modal.open({
                      templateUrl: CONFIG.shared.prepareViewTemplateUrl('directives/faAlert'),
                      controller: 'AlertCtrl',
                      resolve: {
                        message: function() {
                          return {
                            type: 'success',
                            text: 'The record removed successfully!'
                          }
                        }
                      }
                    })
                  }).catch(function(err) {
                    // Dispaly error here
                    var red = $modal.open({
                      templateUrl: CONFIG.shared.prepareViewTemplateUrl('directives/faAlert'),
                      controller: 'AlertCtrl',
                      resolve: {
                        message: function() {
                          return {
                            type: 'error',
                            text: 'Something wrong happened. Please try again later'
                          }
                        }
                      }
                    })
                  });
              }
            });
          }
        },
        "details": {
          name: "details",
          title: "Show Details",
          method: function(model) {
            var dialog = $modal.open({
              templateUrl: CONFIG.shared.prepareViewTemplateUrl('directives/faDetails'),
              controller: 'DetailsCtrl',
              resolve: {
                model: function() { return model; }
              }
            });
          }
        }
      };

      var additionalResourceActions = faActionsService.getActions($scope.collectionName);
      angular.forEach(additionalResourceActions, function(action){
        $scope.actions[action.name] = action;
      });
  }])
  .controller('DetailsCtrl', ['$scope', '$modalInstance', 'model', function($scope, $modalInstance, model) {
    $scope.model = model;
    $scope.close = function() {
      $modalInstance.close(true);
    };
  }])
  .controller('AlertCtrl', ['$scope', '$modalInstance', 'message', function($scope, $modalInstance, message) {
    $scope.message = message;
    $scope.close = function() {
      $modalInstance.close(true);
    };
  }])
  .controller('DeleteConfirmCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance) {
    $scope.close = function() {
      $modalInstance.close(false);
    };
    $scope.confirm = function() {
      $modalInstance.close(true);
    };
  }])
  .controller('ResourcesCtrl', [
    '$scope',
    '$http',
    '$routeParams',
    'resources',
    'data',
    function ($scope, $http, $routeParams, resources, data){
      var currentResource = {};
      angular.forEach(resources, function(res){
        if(res.name === $routeParams.name || res.route === $routeParams.name){
          currentResource = res;
        }
      });

      //Flatten nested objects to get rid of index configuration
      /*angular.forEach(currentResource.schema, function(res, key){
        if (angular.isObject(res) && !angular.isArray(res)){
          if (res.type){
            currentResource.schema[key] = res.type;
          }else{
            delete currentResource.schema[key];
          }
        }
      });*/
      var plurResourceName = currentResource.route;

      $scope.plurResourceName = plurResourceName;
      $scope.currentResource = currentResource;

      $scope.resources = resources;

      $scope.data = data[plurResourceName];
      $scope.links = data.links;
      $scope.PK = $scope.currentResource.modelOptions ? $scope.currentResource.modelOptions.pk || 'id' : 'id';

      $scope.parentResourceName = $routeParams.parent;
      $scope.parentId = $routeParams.id;

      this.addRow = function(Primary){
        var newRow = {};
        if ($scope.PK !== 'id'){
          newRow[$scope.PK] = Primary;
        }

        if ($routeParams.id) {
          // $scope.currentResource - what is going to be created
          // $routeParams.inverse - field that references parent resource
          var refFieldName = $routeParams.inverse;

          //Create reference to new doc
          if (angular.isArray($scope.currentResource.schema[refFieldName])){
            newRow[refFieldName] = [$routeParams.id];
          }else{
            newRow[refFieldName] = $routeParams.id;
          }
        }
        var cmd = {};
        cmd[plurResourceName] = [newRow];
        $http.post(CONFIG.fortuneAdmin.getApiNamespace() + '/' + plurResourceName, cmd)
          .success(function(data) {
          $scope.data.push(data[plurResourceName][0]);
        });
      };

      this.deleteRow = function(index, id){
        $http.delete(CONFIG.fortuneAdmin.getApiNamespace() + '/' + plurResourceName + '/' + id)
          .success(function (data, status) {
            $scope.data.splice(index, 1);
          })
          .error(function(data, status) {
            console.error(data, status);
          });

      };

      $scope.filter = {};
      $scope.getTypeaheadList = function(str, name, type){
        var query = {};
        query['filter[' + name + '][regex]'] = str;
        query['filter[' + name + '][options'] = 'i';
        return $http.get(CONFIG.fortuneAdmin.getApiNamespace() + '/' + plurResourceName, {
          params: query
        })
          .then(function(res){
            console.log(res.data[plurResourceName]);
            var cleanList = [];
            var stored = [];
            angular.forEach(res.data[plurResourceName], function(item){
              if (stored.indexOf(item[name]) === -1){
                stored.push(item[name]);
                cleanList.push(item);
              }
            });
            return cleanList;
          });
      };

      this.filterChangedCb = function() {
        $http.get(CONFIG.fortuneAdmin.getApiNamespace() + '/' + plurResourceName,{
          params: $scope.filter
        }).success(function(data){
          $scope.data = data[plurResourceName];
        });
      };
    }])
    .controller('faEditableCtrl', ['$scope', '$http',
        function($scope, $http){
            $scope.apply = function(value){
                //Send PATCH to the server
                var cmd = [];
                cmd.push({
                    op: 'replace',
                    path: '/' + $scope.resourceName + '/0/links/' + $scope.path,
                    value: value
                });

                $http({
                    method: 'PATCH',
                    url: CONFIG.fortuneAdmin.getApiNamespace() + '/' + $scope.resourceName + '/' + $scope.resourceId,
                    data: cmd
                }).catch(function(data, status){
                    console.error(data, status);
                });
            };
        }]);

'use strict';
angular.module('fortuneAdmin.Directives', [])
  .directive('faActions', [function(){
    return {
      restrict: 'E',
      templateUrl: CONFIG.fortuneAdmin.prepareViewTemplateUrl('directives/faActions'),
      controller: 'faActionsCtrl',
      scope: {
        model: "=ngModel",
        collectionName: "=ngModelCollectionName"
      }
    }
  }])
  .directive('faGrid', [function(){
    return {
      restrict: 'E',
      scope: {
        data: '=',
        links: '=',
        resources: '=',
        currentResource: '=',
        filter: '=',
        filterChangedCb: '&',
        getTypeaheadList: '&'
      },
      templateUrl: CONFIG.fortuneAdmin.prepareViewTemplateUrl('directives/faGrid'),
      link: function(scope){
        scope.typeaheadList = function(str, name, type){
          console.log('calling getTypeaheadList ', str, name, type);
          return scope.getTypeaheadList({str: str, name: name, type: type})
        };
        scope.dropFilter = function(fieldName, taQuery){
          delete scope.filter['filter[' + fieldName + '][regex]'];
          delete scope.filter['filter[' + fieldName + '][options]'];
          delete scope.filter['filter[' + fieldName + '][gte]'];
          delete scope.filter['filter[' + fieldName + '][lte]'];
          delete scope.filter['filter[' + fieldName + ']'];
          scope.filterChangedCb()
        };

        scope.applyFilter = function(selected, fieldName, type){
          switch (type){
            case 'String':
              //Derived from typeahead
              scope.filter['filter[' + fieldName + '][regex]'] = selected.model;
              scope.filter['filter[' + fieldName + '][options]'] = 'i';
              break;
            case 'Number':
            case 'Date':
              scope.filter['filter[' + fieldName + '][gte]'] = selected.start;
              scope.filter['filter[' + fieldName + '][lte]'] = selected.end;
              break;
            case 'Boolean':
              scope.filter['filter[' + fieldName + ']'] = selected;
              break;
          }
          scope.filterChangedCb();
        };

        scope.resolveFieldName = function(linkName){
          //No need to dig deeper as there's no nested schemas
          var parts = linkName.split('.');
          return parts[parts.length - 1];
        };

        scope.resolveInverse = function(linkName){
          var fieldName = this.resolveFieldName(linkName);
          var ref = scope.currentResource.schema[fieldName];

          var inverse = '';
          if (angular.isArray(ref)){
            inverse = ref[0].inverse;
          }else if(angular.isObject(ref)){
            inverse = ref.inverse;
          }else {
            throw new Error('Malformed reference');
          }
          return inverse;
        };

        scope.linkToMany = function(linkName){
          var fieldName = this.resolveFieldName(linkName);
          var ref = scope.currentResource.schema[fieldName];
          return angular.isArray(ref);
        };
      }
    }
  }])
  .directive('faEditable', [function(){
    return {
      restrict: 'E',
      replace: true,
      scope: {
        value: '=ngModel',
        path: '=',
        schemaType: '=',
        resourceName: '@',
        resourceId: '@'
      },
      templateUrl: CONFIG.fortuneAdmin.prepareViewTemplateUrl('directives/faEditable'),
      controller: 'faEditableCtrl'
    }
  }])

  .directive('faRef', ['$http', '$compile',
    function($http, $compile){
      return {
        restrict: 'E',
        replace: false,
        scope: {
          value: '=ngModel',
          ref: '=',
          resourceName: '@',
          resourceId: '@'
        },
        controller: 'faEditableCtrl',
        link: function(scope, elt){
          var refTo = scope.path = scope.ref.ref;
          var resources = scope.resources,
            currentResource,
            refRoute;


          $http.get(CONFIG.fortuneAdmin.baseEndpoint + '/resources').success(function(data){
            resources = data.resources;
            angular.forEach(resources, function(resource){
              if (resource.name === scope.ref.ref){
                refRoute = resource.route;
                currentResource = resource;
              }
            });
            $http.get(CONFIG.fortuneAdmin.getApiNamespace() + '/' + refRoute)
              .success(function(data){
                var PK = currentResource.modelOptions ? currentResource.modelOptions.pk || 'id' : 'id';
                scope.list = data[refRoute];
                var tpl = ['<a href="#" editable-select="value" ',
                  'e-ng-options="item.', PK || 'id',
                  ' as item.', PK || 'id',
                  ' for item in list" ',
                  'onaftersave="apply(value)">',
                  '{{ value || "Not set." }}',
                  '</a>'
                ];
                var select = $compile(tpl.join(''))(scope);
                elt.append(select);
              });
          });
        }
      }
    }]);


  //Fix grunt addtemplates task if you change this line
  angular.module('fortuneAdmin', [ 'templates-main', 
        'sharedElements',
        'fortuneAdmin.Controllers',
        'fortuneAdmin.Directives',
        'fortuneAdmin.Services',
        'fortuneAdmin.Uml'
    ])
    .provider('fortuneAdmin', function(){
      var lookup = {};
      var otherwiseLookup = null;

      var ROUTER = {
        when: function(key, url, params) {
          lookup[key] = {
            url : url,
            params : params
          };
        },

        install: function($routeProvider) {
          for(var key in lookup) {
            var route = lookup[key];
            var url = route['url'];
            var params = route['params'];
            $routeProvider.when(url, params);
          }
          if(otherwiseLookup) {
            $routeProvider.otherwise(otherwiseLookup);
          }
        }
      };

      var config = window.CONFIG.fortuneAdmin;
      return {
        setApiHost: function(host){
            config.baseEndpoint = host;
        },
        setApiNamespace: function(namespace){
            config.apiNamespace = namespace;
        },
        html5Mode: function(use, prefix){
            config.routing.html5Mode = !!use;
            config.routing.urlPrefix = prefix || '';
        },
        enableNavbar: function(){
            config.enableNavbar = true;
        },
        mountTo: function($routeProvider, mountPoint){

          ROUTER.when('uml_diagram', mountPoint + '/uml', {
            templateUrl : config.prepareViewTemplateUrl('uml'),
            controller: 'UmlCtrl as UmlCtrl'
          });

          //Resolve necessary data here to simplify controller
          ROUTER.when('resource', mountPoint + '/:name', {
            //templateUrl: config.prepareViewTemplateUrl('fortune-admin', 'resources'),
            templateUrl: config.prepareViewTemplateUrl('resources'),
            controller: 'ResourcesCtrl as ResourcesCtrl',
            resolve: {
              resources: ['$q', '$http', function($q, $http){
                var d = $q.defer();
                $http.get(config.baseEndpoint + '/resources').success(function(data){
                  d.resolve(data.resources);
                });
                return d.promise;
              }],
              data: ['$q', '$http', '$route', function($q, $http, $route){
                var resourceName = $route.current.params.name;
                var d = $q.defer();
                $http.get(config.getApiNamespace() + '/' + resourceName, {
                  params: {
                    limit: 20
                  }
                })
                  .success(function (data) {
                    d.resolve(data);
                  });
                return d.promise;
              }]
            }
          });

          ROUTER.when('subresource', mountPoint + '/:parent/:id/:name/refby/:inverse', {
            templateUrl: config.prepareViewTemplateUrl('resources'),
            controller: 'ResourcesCtrl as ResourcesCtrl',
            resolve: {
              resources: ['$q', '$http', function($q, $http){
                var d = $q.defer();
                $http.get(config.baseEndpoint + '/resources').success(function(data){
                  d.resolve(data.resources);
                });
                return d.promise;
              }],
              data: ['$q', '$http', '$route', function($q, $http, $route){
                var d = $q.defer();
                var inverse = $route.current.params.inverse;
                var parentId = $route.current.params.id;
                var childResource = $route.current.params.name;
                $http.get(config.getApiNamespace() + '/' + childResource +
                    '?filter[' + inverse + ']=' + parentId + '&limit=20')
                  .success(function (data) {
                    d.resolve(data);
                  });
                return d.promise;
              }]
            }
          });

          ROUTER.install($routeProvider);
        },

        $get: function(){
          return {
            getRoute: function(key) {
              return lookup[key];
            },

            replaceUrlParams: function(url, params) {
              for(var k in params) {
                var v = params[k];
                url = url.replace(':'+k,v);
              }
              return url;
            },

            routeDefined: function(key) {
              return !! this.getRoute(key);
            },

            routePath: function(key, args) {
              var url = this.getRoute(key);
              url = url ? url.url : null;
              if(url && args) {
                url = this.replaceUrlParams(url, args);
              }
              return config.routing.html5Mode ? url : '/#' + config.routing.urlPrefix + url;
            },

            setApiHost: function(host){
                config.baseEndpoint = host;
            },
            setApiNamespace: function(namespace){
                config.apiNamespace = namespace;
            },
            setAuthToken: function(token){
                config.authToken = token;
            }
          }
        }
      }
    })
    .run(['$rootScope', '$location', 'fortuneAdmin', 'editableOptions',
      function($rootScope, $location, fortuneAdmin, editableOptions) {
      var prefix = '';

      $rootScope.fortuneAdminRoute = function(url, args) {
        return prefix + fortuneAdmin.routePath(url, args);
      };
      $rootScope.navbarEnabled = !!CONFIG.fortuneAdmin.enableNavbar;

      // bootstrap3 theme. Can be also 'bs2', 'default'
      editableOptions.theme = 'bs3';
    }]);

angular.module('fortuneAdmin.Services.inflectPort', [])
  .service('Inflect', [
  function Inflect(){
    var inflect = {};

    // i/lib/util
    // Some utility functions in js
    var u;
    var util = u = {
      array: {
        // Returns a copy of the array with the value removed once
        //
        //     [1, 2, 3, 1].del 1 #=> [2, 3, 1]
        //     [1, 2, 3].del 4    #=> [1, 2, 3]
        del: function (arr, val) {
          var index = arr.indexOf(val);
          if (index != -1) {
            if (index == 0) {
              return arr.slice(1)
            } else {
              return arr.slice(0, index).concat(arr.slice(index+1));
            }
          } else {
            return arr;
          }
        },

        // Returns the first element of the array
        //
        //     [1, 2, 3].first() #=> 1
        first: function(arr) {
          return arr[0];
        },

        // Returns the last element of the array
        //
        //     [1, 2, 3].last()  #=> 3
        last: function(arr) {
          return arr[arr.length-1];
        }
      },
      string: {
        // Returns a copy of str with all occurrences of pattern replaced with either replacement or the return value of a function.
        // The pattern will typically be a Regexp; if it is a String then no regular expression metacharacters will be interpreted
        // (that is /\d/ will match a digit, but ‘\d’ will match a backslash followed by a ‘d’).
        //
        // In the function form, the current match object is passed in as a parameter to the function, and variables such as
        // $[1], $[2], $[3] (where $ is the match object) will be set appropriately. The value returned by the function will be
        // substituted for the match on each call.
        //
        // The result inherits any tainting in the original string or any supplied replacement string.
        //
        //     "hello".gsub /[aeiou]/, '*'      #=> "h*ll*"
        //     "hello".gsub /[aeiou]/, '<$1>'   #=> "h<e>ll<o>"
        //     "hello".gsub /[aeiou]/, ($) {
        //       "<#{$[1]}>"                    #=> "h<e>ll<o>"
        //
        gsub: function (str, pattern, replacement) {
          var i, match, matchCmpr, matchCmprPrev, replacementStr, result, self;
          if (!((pattern != null) && (replacement != null))) return u.string.value(str);
          result = '';
          self = str;
          while (self.length > 0) {
            if ((match = self.match(pattern))) {
              result += self.slice(0, match.index);
              if (typeof replacement === 'function') {
                match[1] = match[1] || match[0];
                result += replacement(match);
              } else if (replacement.match(/\$[1-9]/)) {
                matchCmprPrev = match;
                matchCmpr = u.array.del(match, void 0);
                while (matchCmpr !== matchCmprPrev) {
                  matchCmprPrev = matchCmpr;
                  matchCmpr = u.array.del(matchCmpr, void 0);
                }
                match[1] = match[1] || match[0];
                replacementStr = replacement;
                for (i = 1; i <= 9; i++) {
                  if (matchCmpr[i]) {
                    replacementStr = u.string.gsub(replacementStr, new RegExp("\\\$" + i), matchCmpr[i]);
                  }
                }
                result += replacementStr;
              } else {
                result += replacement;
              }
              self = self.slice(match.index + match[0].length);
            } else {
              result += self;
              self = '';
            }
          }
          return result;
        },

        // Returns a copy of the String with the first letter being upper case
        //
        //     "hello".upcase #=> "Hello"
        upcase: function(str) {
          var self = u.string.gsub(str, /_([a-z])/, function ($) {
            return "_" + $[1].toUpperCase();
          });
          self = u.string.gsub(self, /\/([a-z])/, function ($) {
            return "/" + $[1].toUpperCase();
          });
          return self[0].toUpperCase() + self.substr(1);
        },

        // Returns a copy of capitalized string
        //
        //     "employee salary" #=> "Employee Salary"
        capitalize: function (str, spaces) {
          var self = str.toLowerCase();
          if(!spaces) {
            self = u.string.gsub(self, /\s([a-z])/, function ($) {
              return " " + $[1].toUpperCase();
            });
          }
          return self[0].toUpperCase() + self.substr(1);
        },

        // Returns a copy of the String with the first letter being lower case
        //
        //     "HELLO".downcase #=> "hELLO"
        downcase: function(str) {
          var self = u.string.gsub(str, /_([A-Z])/, function ($) {
            return "_" + $[1].toLowerCase();
          });
          self = u.string.gsub(self, /\/([A-Z])/, function ($) {
            return "/" + $[1].toLowerCase();
          });
          return self[0].toLowerCase() + self.substr(1);
        },

        // Returns a string value for the String object
        //
        //     "hello".value() #=> "hello"
        value: function (str) {
          return str.substr(0);
        }
      }
    };

    // i/lib/defaults

    var defaults = function (inflect) {

      inflect.plural(/$/, 's');
      inflect.plural(/s$/i, 's');
      inflect.plural(/(ax|test)is$/i, '$1es');
      inflect.plural(/(octop|vir)us$/i, '$1i');
      inflect.plural(/(octop|vir)i$/i, '$1i');
      inflect.plural(/(alias|status)$/i, '$1es');
      inflect.plural(/(bu)s$/i, '$1ses');
      inflect.plural(/(buffal|tomat)o$/i, '$1oes');
      inflect.plural(/([ti])um$/i, '$1a');
      inflect.plural(/([ti])a$/i, '$1a');
      inflect.plural(/sis$/i, 'ses');
      inflect.plural(/(?:([^f])fe|([lr])f)$/i, '$1ves');
      inflect.plural(/(hive)$/i, '$1s');
      inflect.plural(/([^aeiouy]|qu)y$/i, '$1ies');
      inflect.plural(/(x|ch|ss|sh)$/i, '$1es');
      inflect.plural(/(matr|vert|ind)(?:ix|ex)$/i, '$1ices');
      inflect.plural(/([m|l])ouse$/i, '$1ice');
      inflect.plural(/([m|l])ice$/i, '$1ice');
      inflect.plural(/^(ox)$/i, '$1en');
      inflect.plural(/^(oxen)$/i, '$1');
      inflect.plural(/(quiz)$/i, '$1zes');


      inflect.singular(/s$/i, '');
      inflect.singular(/(n)ews$/i, '$1ews');
      inflect.singular(/([ti])a$/i, '$1um');
      inflect.singular(/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i, '$1sis');
      inflect.singular(/(^analy)ses$/i, '$1sis');
      inflect.singular(/([^f])ves$/i, '$1fe');
      inflect.singular(/(hive)s$/i, '$1');
      inflect.singular(/(tive)s$/i, '$1');
      inflect.singular(/([lr])ves$/i, '$1f');
      inflect.singular(/([^aeiouy]|qu)ies$/i, '$1y');
      inflect.singular(/(s)eries$/i, '$1eries');
      inflect.singular(/(m)ovies$/i, '$1ovie');
      inflect.singular(/(x|ch|ss|sh)es$/i, '$1');
      inflect.singular(/([m|l])ice$/i, '$1ouse');
      inflect.singular(/(bus)es$/i, '$1');
      inflect.singular(/(o)es$/i, '$1');
      inflect.singular(/(shoe)s$/i, '$1');
      inflect.singular(/(cris|ax|test)es$/i, '$1is');
      inflect.singular(/(octop|vir)i$/i, '$1us');
      inflect.singular(/(alias|status)es$/i, '$1');
      inflect.singular(/^(ox)en/i, '$1');
      inflect.singular(/(vert|ind)ices$/i, '$1ex');
      inflect.singular(/(matr)ices$/i, '$1ix');
      inflect.singular(/(quiz)zes$/i, '$1');
      inflect.singular(/(database)s$/i, '$1');

      inflect.irregular('child', 'children');
      inflect.irregular('person', 'people');
      inflect.irregular('man', 'men');
      inflect.irregular('child', 'children');
      inflect.irregular('sex', 'sexes');
      inflect.irregular('move', 'moves');
      inflect.irregular('cow', 'kine');
      inflect.irregular('zombie', 'zombies');

      inflect.uncountable(['equipment', 'information', 'rice', 'money', 'species', 'series', 'fish', 'sheep', 'jeans']);
    }



    // i/lib/inflections
    // A singleton instance of this class is yielded by Inflector.inflections, which can then be used to specify additional
    // inflection rules. Examples:
    //
    //     BulletSupport.Inflector.inflect ($) ->
    //       $.plural /^(ox)$/i, '$1en'
    //       $.singular /^(ox)en/i, '$1'
    //
    //       $.irregular 'octopus', 'octopi'
    //
    //       $.uncountable "equipment"
    //
    // New rules are added at the top. So in the example above, the irregular rule for octopus will now be the first of the
    // pluralization and singularization rules that is runs. This guarantees that your rules run before any of the rules that may
    // already have been loaded.

    var Inflections = function () {
      this.plurals = [];
      this.singulars = [];
      this.uncountables = [];
      this.humans = [];
      defaults(this);
      return this;
    };

    // Specifies a new pluralization rule and its replacement. The rule can either be a string or a regular expression.
    // The replacement should always be a string that may include references to the matched data from the rule.
    Inflections.prototype.plural = function (rule, replacement) {
      if (typeof rule == 'string') {
        this.uncountables = util.array.del(this.uncountables, rule);
      }
      this.uncountables = util.array.del(this.uncountables, replacement);
      this.plurals.unshift([rule, replacement]);
    };

    // Specifies a new singularization rule and its replacement. The rule can either be a string or a regular expression.
    // The replacement should always be a string that may include references to the matched data from the rule.
    Inflections.prototype.singular = function (rule, replacement) {
      if (typeof rule == 'string') {
        this.uncountables = util.array.del(this.uncountables, rule);
      }
      this.uncountables = util.array.del(this.uncountables, replacement);
      this.singulars.unshift([rule, replacement]);
    };

    // Specifies a new irregular that applies to both pluralization and singularization at the same time. This can only be used
    // for strings, not regular expressions. You simply pass the irregular in singular and plural form.
    //
    //     irregular 'octopus', 'octopi'
    //     irregular 'person', 'people'
    Inflections.prototype.irregular =  function (singular, plural) {
      this.uncountables = util.array.del(this.uncountables, singular);
      this.uncountables = util.array.del(this.uncountables, plural);
      if (singular[0].toUpperCase() == plural[0].toUpperCase()) {
        this.plural(new RegExp("(" + singular[0] + ")" + singular.slice(1) + "$", "i"), '$1' + plural.slice(1));
        this.plural(new RegExp("(" + plural[0] + ")" + plural.slice(1) + "$", "i"), '$1' + plural.slice(1));
        this.singular(new RegExp("(" + plural[0] + ")" + plural.slice(1) + "$", "i"), '$1' + singular.slice(1));
      } else {
        this.plural(new RegExp("" + (singular[0].toUpperCase()) + singular.slice(1) + "$"), plural[0].toUpperCase() + plural.slice(1));
        this.plural(new RegExp("" + (singular[0].toLowerCase()) + singular.slice(1) + "$"), plural[0].toLowerCase() + plural.slice(1));
        this.plural(new RegExp("" + (plural[0].toUpperCase()) + plural.slice(1) + "$"), plural[0].toUpperCase() + plural.slice(1));
        this.plural(new RegExp("" + (plural[0].toLowerCase()) + plural.slice(1) + "$"), plural[0].toLowerCase() + plural.slice(1));
        this.singular(new RegExp("" + (plural[0].toUpperCase()) + plural.slice(1) + "$"), singular[0].toUpperCase() + singular.slice(1));
        this.singular(new RegExp("" + (plural[0].toLowerCase()) + plural.slice(1) + "$"), singular[0].toLowerCase() + singular.slice(1));
      }
    };

    // Specifies a humanized form of a string by a regular expression rule or by a string mapping.
    // When using a regular expression based replacement, the normal humanize formatting is called after the replacement.
    // When a string is used, the human form should be specified as desired (example: 'The name', not 'the_name')
    //
    //     human /(.*)_cnt$/i, '$1_count'
    //     human "legacy_col_person_name", "Name"
    Inflections.prototype.human = function (rule, replacement) {
      this.humans.unshift([rule, replacement]);
    }

    // Add uncountable words that shouldn't be attempted inflected.
    //
    //     uncountable "money"
    //     uncountable ["money", "information"]
    Inflections.prototype.uncountable = function (words) {
      this.uncountables = this.uncountables.concat(words);
    }

    // Clears the loaded inflections within a given scope (default is _'all'_).
    // Give the scope as a symbol of the inflection type, the options are: _'plurals'_,
    // _'singulars'_, _'uncountables'_, _'humans'_.
    //
    //     clear 'all'
    //     clear 'plurals'
    Inflections.prototype.clear = function (scope) {
      if (scope == null) scope = 'all';
      switch (scope) {
        case 'all':
          this.plurals = [];
          this.singulars = [];
          this.uncountables = [];
          this.humans = [];
        default:
          this[scope] = [];
      }
    }

    // Clears the loaded inflections and initializes them to [default](../inflections.html)
    Inflections.prototype.default = function () {
      this.plurals = [];
      this.singulars = [];
      this.uncountables = [];
      this.humans = [];
      defaults(this);
      return this;
    };

    inflect.inflections = new Inflections();


    // i/lib/methods
    // Gives easy access to add inflections to this class
    inflect.inflect = function (inflections_function) {
      inflections_function(inflect.inflections);
    };

    // By default, _camelize_ converts strings to UpperCamelCase. If the argument to _camelize_
    // is set to _false_ then _camelize_ produces lowerCamelCase.
    //
    // _camelize_ will also convert '/' to '.' which is useful for converting paths to namespaces.
    //
    //     "bullet_record".camelize()             // => "BulletRecord"
    //     "bullet_record".camelize(false)        // => "bulletRecord"
    //     "bullet_record/errors".camelize()      // => "BulletRecord.Errors"
    //     "bullet_record/errors".camelize(false) // => "bulletRecord.Errors"
    //
    // As a rule of thumb you can think of _camelize_ as the inverse of _underscore_,
    // though there are cases where that does not hold:
    //
    //     "SSLError".underscore.camelize // => "SslError"
    inflect.camelize = function(lower_case_and_underscored_word, first_letter_in_uppercase) {
      var result;
      if (first_letter_in_uppercase == null) first_letter_in_uppercase = true;
      result = util.string.gsub(lower_case_and_underscored_word, /\/(.?)/, function($) {
        return "." + (util.string.upcase($[1]));
      });
      result = util.string.gsub(result, /(?:_)(.)/, function($) {
        return util.string.upcase($[1]);
      });
      if (first_letter_in_uppercase) {
        return util.string.upcase(result);
      } else {
        return util.string.downcase(result);
      }
    };

    // Makes an underscored, lowercase form from the expression in the string.
    //
    // Changes '.' to '/' to convert namespaces to paths.
    //
    //     "BulletRecord".underscore()         // => "bullet_record"
    //     "BulletRecord.Errors".underscore()  // => "bullet_record/errors"
    //
    // As a rule of thumb you can think of +underscore+ as the inverse of +camelize+,
    // though there are cases where that does not hold:
    //
    //     "SSLError".underscore().camelize() // => "SslError"
    inflect.underscore = function (camel_cased_word) {
      var self;
      self = util.string.gsub(camel_cased_word, /\./, '/');
      self = util.string.gsub(self, /([A-Z]+)([A-Z][a-z])/, "$1_$2");
      self = util.string.gsub(self, /([a-z\d])([A-Z])/, "$1_$2");
      self = util.string.gsub(self, /-/, '_');
      return self.toLowerCase();
    };

    // Replaces underscores with dashes in the string.
    //
    //     "puni_puni".dasherize()   // => "puni-puni"
    inflect.dasherize = function (underscored_word) {
      return util.string.gsub(underscored_word, /_/, '-');
    };

    // Removes the module part from the expression in the string.
    //
    //     "BulletRecord.String.Inflections".demodulize() // => "Inflections"
    //     "Inflections".demodulize()                     // => "Inflections"
    inflect.demodulize = function (class_name_in_module) {
      return util.string.gsub(class_name_in_module, /^.*\./, '');
    };

    // Creates a foreign key name from a class name.
    // _separate_class_name_and_id_with_underscore_ sets whether
    // the method should put '_' between the name and 'id'.
    //
    //     "Message".foreign_key()      // => "message_id"
    //     "Message".foreign_key(false) // => "messageid"
    //     "Admin::Post".foreign_key()  // => "post_id"
    inflect.foreign_key = function (class_name, separate_class_name_and_id_with_underscore) {
      if (separate_class_name_and_id_with_underscore == null) {
        separate_class_name_and_id_with_underscore = true;
      }
      return inflect.underscore(inflect.demodulize(class_name)) + (separate_class_name_and_id_with_underscore ? "_id" : "id");
    };

    // Turns a number into an ordinal string used to denote the position in an
    // ordered sequence such as 1st, 2nd, 3rd, 4th.
    //
    //     ordinalize(1)     // => "1st"
    //     ordinalize(2)     // => "2nd"
    //     ordinalize(1002)  // => "1002nd"
    //     ordinalize(1003)  // => "1003rd"
    //     ordinalize(-11)   // => "-11th"
    //     ordinalize(-1021) // => "-1021st"
    inflect.ordinalize = function (number) {
      var _ref;
      number = parseInt(number);
      if ((_ref = Math.abs(number) % 100) === 11 || _ref === 12 || _ref === 13) {
        return "" + number + "th";
      } else {
        switch (Math.abs(number) % 10) {
          case 1:
            return "" + number + "st";
          case 2:
            return "" + number + "nd";
          case 3:
            return "" + number + "rd";
          default:
            return "" + number + "th";
        }
      }
    };

    // Checks a given word for uncountability
    //
    //     "money".uncountability()     // => true
    //     "my money".uncountability()  // => true
    inflect.uncountability = function (word) {
      return inflect.inflections.uncountables.some(function(ele, ind, arr) {
        return word.match(new RegExp("(\\b|_)" + ele + "$", 'i')) != null;
      });
    };

    // Returns the plural form of the word in the string.
    //
    //     "post".pluralize()             // => "posts"
    //     "octopus".pluralize()          // => "octopi"
    //     "sheep".pluralize()            // => "sheep"
    //     "words".pluralize()            // => "words"
    //     "CamelOctopus".pluralize()     // => "CamelOctopi"
    inflect.pluralize = function (word) {
      var plural, result;
      result = word;
      if (word === '' || inflect.uncountability(word)) {
        return result;
      } else {
        for (var i = 0; i < inflect.inflections.plurals.length; i++) {
          plural = inflect.inflections.plurals[i];
          result = util.string.gsub(result, plural[0], plural[1]);
          if (word.match(plural[0]) != null) break;
        }
        return result;
      }
    };

    // The reverse of _pluralize_, returns the singular form of a word in a string.
    //
    //     "posts".singularize()            // => "post"
    //     "octopi".singularize()           // => "octopus"
    //     "sheep".singularize()            // => "sheep"
    //     "word".singularize()             // => "word"
    //     "CamelOctopi".singularize()      // => "CamelOctopus"
    inflect.singularize = function (word) {
      var result, singular;
      result = word;
      if (word === '' || inflect.uncountability(word)) {
        return result;
      } else {
        for (var i = 0; i < inflect.inflections.singulars.length; i++) {
          singular = inflect.inflections.singulars[i];
          result = util.string.gsub(result, singular[0], singular[1]);
          if (word.match(singular[0])) break;
        }
        return result;
      }
    };

    // Capitalizes the first word and turns underscores into spaces and strips a
    // trailing "_id", if any. Like _titleize_, this is meant for creating pretty output.
    //
    //     "employee_salary".humanize()   // => "Employee salary"
    //     "author_id".humanize()         // => "Author"
    inflect.humanize = function (lower_case_and_underscored_word) {
      var human, result;
      result = lower_case_and_underscored_word;
      for (var i = 0; i < inflect.inflections.humans.length; i++) {
        human = inflect.inflections.humans[i];
        result = util.string.gsub(result, human[0], human[1]);
      }
      result = util.string.gsub(result, /_id$/, "");
      result = util.string.gsub(result, /_/, " ");
      return util.string.capitalize(result, true);
    };

    // Capitalizes all the words and replaces some characters in the string to create
    // a nicer looking title. _titleize_ is meant for creating pretty output. It is not
    // used in the Bullet internals.
    //
    //
    //     "man from the boondocks".titleize()   // => "Man From The Boondocks"
    //     "x-men: the last stand".titleize()    // => "X Men: The Last Stand"
    inflect.titleize = function (word) {
      var self;
      self = inflect.humanize(inflect.underscore(word));
      self = util.string.gsub(self, /[^a-zA-Z:']/, ' ');
      return util.string.capitalize(self);
    };

    // Create the name of a table like Bullet does for models to table names. This method
    // uses the _pluralize_ method on the last word in the string.
    //
    //     "RawScaledScorer".tableize()   // => "raw_scaled_scorers"
    //     "egg_and_ham".tableize()       // => "egg_and_hams"
    //     "fancyCategory".tableize()     // => "fancy_categories"
    inflect.tableize = function (class_name) {
      return inflect.pluralize(inflect.underscore(class_name));
    };

    // Create a class name from a plural table name like Bullet does for table names to models.
    // Note that this returns a string and not a Class.
    //
    //     "egg_and_hams".classify()   // => "EggAndHam"
    //     "posts".classify()          // => "Post"
    //
    // Singular names are not handled correctly:
    //
    //     "business".classify()       // => "Busines"
    inflect.classify = function (table_name) {
      return inflect.camelize(inflect.singularize(util.string.gsub(table_name, /.*\./, '')));
    }



    return inflect
  }]);
(function(angular){
  angular.module('fortuneAdmin.Uml.Controllers', [])
    .controller('UmlCtrl', ['$scope', '$http', UmlController]);

  function UmlController($scope, $http){
    $scope.resources = [];
    $scope.render = false;
    $http.get(CONFIG.fortuneAdmin.baseEndpoint + '/resources').success(function(data){
      $scope.resources = data.resources;
      $scope.render = true;
    });
  }
})(angular);

(function(angular){
  //It's just a wrapper around d3 to make it easy to mock
  //Also this can be extended later to defer loading
  angular.module('fortuneAdmin.Uml.D3', [])
    .factory('d3', ['$q', '$timeout', '$rootScope', function($q, $timeout, $rootScope){
      var d3Loader = $q.defer();

      $timeout(function(){
        $rootScope.$apply(function(){
          d3Loader.resolve(window.d3);
        });
      });

      return{
        load: function(){
          return d3Loader.promise;
        }
      }
    }]);
})(angular);

(function(angular){
  var config = {
    headerHeight: 50,
    fieldHeight: 20,
    fieldWidth: 200,
    columnWidth: 300,
    vgap: 50
  };

  angular.module('fortuneAdmin.Uml.Directives', [
      'fortuneAdmin.Uml.D3',
      'fortuneAdmin.Uml.Services'
    ])
    .directive('resourcesCanvas', ['$compile', 'UmlElementsRegistry', resourcesCanvas])
    .directive('resourceClass', ['$compile', 'UmlElementsRegistry', resourceClass])
    .directive('resourceProperty', ['$compile', 'UmlElementsRegistry', resourceProperty])
    .directive('resourceLink', ['UmlElementsRegistry', resourceLink]);

  function resourcesCanvas($compile, UmlElementsRegistry){
    return {
      restrict: 'A',
      templateUrl: CONFIG.fortuneAdmin.prepareViewTemplateUrl('directives/uml/canvas'),
      scope: {
        resources: '='
      },
      link: function(scope, elt){
        UmlElementsRegistry.clear();
        scope.canvas = {};
        var schema = {};
        var resources = {};

        var height = 0;
        var elementsInARow = Math.floor(elt[0].clientWidth / config.columnWidth);

        var tempStorage = {};
        angular.forEach(scope.resources, function(resource){
          tempStorage[resource.service] = tempStorage[resource.service] || [];
          tempStorage[resource.service].push(resource);
        });
        scope.resources = angular.copy(tempStorage);
        tempStorage = {};

        //Convert to D3 data structure
        angular.forEach(scope.resources, function(serviceResources){
          //Define tallest elt here to keep schema and resources in sync
          //TODO: make an algo that will wisely place every element taking it's links into account
          tempStorage = angular.copy(serviceResources);
          var tallestElt = tempStorage[0]
            , tallestHeight = Object.keys(tempStorage[0].schema).length
            , tallestIndex = 0;
          angular.forEach(tempStorage, function(resource, index){
            if (Object.keys(resource.schema).length > tallestHeight){
              tallestElt = resource;
              tallestHeight = Object.keys(resource.schema).length;
              tallestIndex = index;
            }
          });
          var tmp = serviceResources.splice(tallestIndex, 1);
          serviceResources = tmp.concat(serviceResources);
          angular.forEach(serviceResources, function(resource, index){
            //Split resources by services here
            var service = resource.service || 'default';
            schema[service] = schema[service] || [];
            schema[service][index] = [];
            resources[service] = resources[service] || {};
            resources[service][index] = {
              name: resource.name,
              service: resource.service
            };
            if (resource.modelOptions && resource.modelOptions.pk){
              resources[service][index].pk = resource.modelOptions.pk || 'id';
            }
            angular.forEach(resource.schema, function(fieldParams, fieldName){
              schema[service][index].push({
                name: fieldName,
                params: fieldParams,
                pk: resources[service][index].pk === fieldName
              });
            });
            schema[service][index].sort(function(a,b){
              return a.name > b.name ? 1: -1;
            });
          });
        });
        scope.resources = schema;

        function getBottom(){
          var bottom = UmlElementsRegistry.bottomLine[0];
          var col = 0;
          for (var i = 0; i < UmlElementsRegistry.bottomLine.length; i++){
            if (UmlElementsRegistry.bottomLine[i] < bottom) {
              bottom = UmlElementsRegistry.bottomLine[i];
              col = i;
            }
          }
          return [col, bottom];
        }

        (function setupLayout(){
          for (var i = 0; i < elementsInARow; i++){
            //Initialize 30px top margin
            //This will create top margin for the first row of resources
            UmlElementsRegistry.bottomLine.push(30);
          }

          //Iterate resources of the same service here. Then move to the next service
          angular.forEach(schema, function(service, serviceName){
            angular.forEach(service, function(resource, index){
              definePosition(resource, index);
            });
            function definePosition(resource, index){
              var elementHeight = resource.length * config.fieldHeight + config.headerHeight;
              var coords = getBottom();

              var eltPosition = {
                x: coords[0] * config.columnWidth,
                y: coords[1],
                height: elementHeight,
                column: coords[0]
              };

              //Update bottom line
              UmlElementsRegistry.bottomLine[coords[0]] += elementHeight + config.vgap;

              //Store element position
              UmlElementsRegistry.positions[serviceName] = UmlElementsRegistry.positions[serviceName] || [];
              UmlElementsRegistry.positions[serviceName][index] = eltPosition;

            }
            //Flatten bottom line before proceeding to the next service
            var bott = UmlElementsRegistry.bottomLine[0];
            angular.forEach(UmlElementsRegistry.bottomLine, function(colHeight){
              if (colHeight > bott){
                bott = colHeight;
              }
            });
            for (var j = UmlElementsRegistry.bottomLine.length; j >= 0; j--){
              UmlElementsRegistry.bottomLine[j] = bott;
            }
          });
        })();

        function nextPosition(serviceName, index){
          return UmlElementsRegistry.positions[serviceName][index];
        }

        for (var i = 0; i < UmlElementsRegistry.bottomLine.length; i++){
          //Add bottom margin to the main canvas
          if (UmlElementsRegistry.bottomLine[i] > height) height = UmlElementsRegistry.bottomLine[i] + 100;
        }

        //create canvas for rendering resources containers
        var svg = d3.select(elt[0])
          .append('svg')
          .attr('id', 'mainCanvas')
          .attr('height', height)
          .style('width', '100%');

        var svgOffset = svg[0][0].offsetTop;
        var svgWidth = svg[0][0].clientWidth;
        UmlElementsRegistry.setBase(svgOffset);

        angular.forEach(schema, function(sch, serviceName){
          //find full service height
          var lowestElement = UmlElementsRegistry.positions[serviceName][0];
          lowestElement = lowestElement.y + lowestElement.height;
          angular.forEach(UmlElementsRegistry.positions[serviceName], function(pos){
            if (pos.y + pos.height > lowestElement){
              lowestElement = pos.y + pos.height;
            }
          });

          var serviceSvg = svg
            .append('svg')
            .attr('id', serviceName)
            .attr('height', lowestElement)
            .style('width', '100%');

        var foo = serviceSvg.selectAll('g')
          .data(sch)
          .enter().append('g')
          .attr('height', function(d){
            return d.length * config.fieldHeight;
          })
          .attr('width', config.fieldWidth)
          .attr('x', 0)
          .attr('y', 0)
          .attr('fill', '#ffffff')
          .append('foreignObject')
          .attr('x', function(d, i){
            return nextPosition(serviceName, i).x + config.vgap;
          })
          .attr('y', function(d,i){
            return nextPosition(serviceName, i).y;
          })
          .attr('height', function(d){
            return d.length * config.fieldHeight + config.headerHeight;
          })
          .attr('width', config.fieldWidth)
          .append('xhtml:div')
          .attr('class', 'resource');

        //Create resource name
        var headers = foo.append('xhtml:div')
          .attr('class', 'header');
          headers.append('xhtml:h4')
          .attr('class', 'text-center')
          .text(function(d, i){
            return resources[serviceName][i].name;
          });

        //create resource containers
        foo.append('xhtml:div')
          .attr('style', 'width: 100%')
          .append('xhtml:div')
          .attr('resource-class', '')
          .attr('resource', function(d, i){
            return 'resources["' + serviceName + '"][' + i + ']';
          });

        angular.forEach(foo[0], function(element){
          UmlElementsRegistry.add('resources', element, element.innerText);
        });

          //Create service boundary
          serviceSvg.append('rect')
            .attr('width', svgWidth - 10)
            .attr('x', 5)
            .attr('y', foo[0][0].offsetTop - 10 - 75)
            .attr('height', lowestElement - foo[0][0].offsetTop + 85)
            .attr('fill', 'none')
            .attr('stroke', 'red');

          //Create service label
          serviceSvg.append('rect')
            .attr('width', config.fieldWidth)
            .attr('height', config.fieldHeight)
            .attr('x', 0)
            .attr('y', foo[0][0].offsetTop - 20 - 85)
            .attr('fill', 'black');
          serviceSvg.append('text')
            .attr('width', config.fieldWidth)
            .attr('height', config.fieldHeight)
            .attr('x', 0)
            .attr('y', foo[0][0].offsetTop - 20 - 70)
            .attr('fill', 'white')
            .text(serviceName);
        });

        elt.removeAttr('resources-canvas');
        $compile(elt)(scope);

      }
    }
  }

  function resourceClass($compile, UmlElementsRegistry){
    return {
      restrict: 'A',
      scope: {
        resource: '='
      },
      link: function(scope, elt){
        var elementHeight = scope.resource.length * config.fieldHeight;

        //create canvas for rendering fields rectangles
        var svg = d3.select(elt[0])
          .append('svg')
          .attr('width', config.fieldWidth)
          .attr('height', elementHeight);

        var x = 0;
        var y = -20;

        //create fields containers
        var fields = svg.selectAll('g')
          .data(scope.resource)
          .enter().append('g')
          .attr('height', config.fieldHeight)
          .attr('width', config.fieldWidth)
          .attr('fill', '#cccccc')
          .append('foreignObject')
          .attr('x', x)
          .attr('y', function(){
            return y += config.fieldHeight;
          })
          .attr('height', config.fieldHeight)
          .attr('width', config.fieldWidth)
          .append('xhtml:div')
          .attr('resource-property', '')
          .attr('field', function(d, i){
            return 'resource[' + i + ']';
          })
          .attr('class', 'text-center field')
          .attr('style', 'width: 100%');

        elt.removeAttr('resource-class');
        $compile(elt)(scope);
      }
    }
  }

  function resourceProperty($compile, UmlElementsRegistry){
    return {
      restrict: 'A',
      scope: {
        field: '=',
        isPk: '='
      },
      link: function(scope, elt){
        //Decide what kind of field we have
        var linked = false;
        if (angular.isArray(scope.field.params)){
          if (scope.field.params[0]){
            if (scope.field.params[0].ref){
              linked = true;
            }
          }
        }else if (angular.isObject(scope.field.params)){
          if (scope.field.params.ref){
            linked = true;
          }
        }

        var portConfig = {
          width: 10,
          height: config.fieldHeight
        };

        if (linked){
          //Render connector port if there should be a link
          var svg = d3.select(elt[0])
            .append('svg')
            .attr('width', config.fieldWidth)
            .attr('height', portConfig.height);

          //Create field name
          svg.append('foreignObject')
            .attr('width', config.fieldWidth)
            .attr('height', config.fieldHeight)
            .append('xhtml:div')
            .attr('class', 'field ref')
            .text(scope.field.name + ' [ref]');

          //Create link itself
          svg.append('foreignObject')
            .attr('width', 1)
            .attr('height', config.fieldHeight)
            .append('xhtml:div')
            .attr('port-x', function(){
              return svg[0][0].offsetLeft;
            })
            .attr('port-y', function(){
              return svg[0][0].offsetTop;
            })
            .attr('resource-link', '')
            .attr('link-to-many', function(){
              return angular.isArray(scope.field.params);
            })
            .attr('link-to', function(){
              if (angular.isArray(scope.field.params)){
                return 'field.params[0]';
              }else{
                return 'field.params';
              }
            });
        }else{
          if (scope.field.pk){
            elt.addClass('pk');
            elt.text('PK: ' + scope.field.name);
          }else{
            if (angular.isArray(scope.field.params)){
              //TODO: fix this when you can set field: [String] in fortune
              elt.text(scope.field.name + ' [Arr]');
            }else if(angular.isObject(scope.field.params)){
              //TODO: fix this when fortune supports nested schemas
              elt.text(scope.field.name + ' [Nested]');
            }else{
              try{
                elt.text(scope.field.name + ' [' + scope.field.params.substr(0, 3) + ']');
              }catch(e){
                //This will prevent app from crashing in case of typos in resources configuration
                console.log('caugth error: ', e);
              }
            }
          }
        }

        elt.removeAttr('resource-property');
        $compile(elt)(scope);
      }
    }
  }

  function resourceLink(UmlElementsRegistry){
    return {
      restrict: 'A',
      scope: {
        linkToMany: '=',
        linkTo: '=',
        portX: '@',
        portY: '@'
      },
      link: function(scope, elt){
        var target = UmlElementsRegistry.find('resources', scope.linkTo.ref);
        if (!target) return;
        var baseOffset = UmlElementsRegistry.getBaseOffset();

        var portX = parseInt(scope.portX);
        var portY = parseInt(scope.portY) + 10;

        //Decide where target element is placed
        var onTheRight = false;
        var sameCol = (portX - target.right < 100);
        if (portX <= target.left){
          onTheRight = true;
        }

        var lineData = [];
          if (onTheRight){
            //Start from right edge
            lineData.push({x: portX + config.fieldWidth, y: portY - baseOffset});
            lineData.push({x: portX + config.fieldWidth + 50, y: portY - baseOffset});
          }else{
            if (sameCol){
              //Start form right edge
              lineData.push({x: portX + config.fieldWidth, y: portY - baseOffset});
              lineData.push({x: portX + config.fieldWidth + 50, y: portY - baseOffset});
            }else{
              //Start from left edge
              lineData.push({x: portX, y: portY - baseOffset});
              lineData.push({x: portX - 50, y: portY - baseOffset});
            }
          }


        //How many columns will be overflown?
        var overflow = Math.floor((target.right - portX) / config.columnWidth);
        var absOverflow = Math.abs(overflow);
        if (absOverflow > 1){
          var currentColumn = Math.floor(portX / config.columnWidth);
          //Select direction
          var targetCol = currentColumn + overflow;
          var nextCol = onTheRight ? currentColumn + 1 : currentColumn - 1;

          while(nextCol !== targetCol){
            //Select elements from current column
            var columnSelection = [];
            angular.forEach(UmlElementsRegistry.positions, function(service){
              angular.forEach(service, function(e){
                if (e.column == nextCol) {
                  columnSelection.push(e);
                }
              });
            });

            var nearestElement = columnSelection[0];

            //Starts from top
            var minDy = Math.abs(portY - nearestElement.y);
            angular.forEach(columnSelection, function(element){
              var dy = Math.abs(portY - element.y);
              if (dy < minDy){
                nearestElement = element;
                minDy = portY - element.y;
              }
            });
            var gapY = nearestElement.y + nearestElement.height + (Math.random() * 50);
            var gapX = nearestElement.x;
            var center = 50;

            if (onTheRight){
              lineData.push({x: gapX - center, y: gapY});
              lineData.push({x: gapX + config.columnWidth - center, y: gapY});
            }else{
              lineData.push({x: gapX + config.columnWidth + center, y: gapY});
              lineData.push({x: gapX - center, y: gapY});
            }

            onTheRight ? nextCol++ : nextCol--;
          }
        }

        if (onTheRight){
          //Target to left edge
          lineData.push({x: target.left - 50, y: target.top + 10});
          lineData.push({x: target.left, y: target.top + 10});
        }else{
          //Target to right edge
          lineData.push({x: target.right + 50, y: target.top + 10});
          lineData.push({x: target.right, y: target.top + 10});
        }

        var line = d3.svg.line()
          .x(function(d){
            return d.x;
          })
          .y(function(d){
            return d.y;
          })
          .tension(0.95)
          .interpolate('basis');

        var color = selectColor();
        //push link to canvas
        var path = d3.select('#mainCanvas')
          .append('path')
          .attr('d', line(lineData))
          .attr('stroke', color)
          .attr('stroke-width', 2)
          .attr('fill', 'none')
          .on('mouseover', function(d, i){
            d3.select(this)
              .attr('stroke', '#F00')
              .attr('stroke-width', 10);
          })
          .on('mouseleave', function(d, i){
            d3.select(this)
              .attr('stroke', color)
              .attr('stroke-width', 2);
          });

        var field = elt.parent().parent().parent();
        field.bind('mouseover', function(){
          path
            .attr('stroke', '#F00')
            .attr('stroke-width', 10);
        });
        field.bind('mouseleave', function(){
          path
            .attr('stroke', color)
            .attr('stroke-width', 2);
        });

        function selectColor(){
          var map = [
            '#FF0020',
            '#FF00CC',
            '#0000FF',
            '#00F9FF',
            '#00FF20',
            '#FFE000'
          ];
          var rnd = Math.floor(Math.random() * 6);
          return map[rnd];
        }
      }
    }
  }
})(angular);

(function(angular){
  angular.module('fortuneAdmin.Uml', [
    'fortuneAdmin.Uml.Controllers',
    'fortuneAdmin.Uml.Services',
    'fortuneAdmin.Uml.D3',
    'fortuneAdmin.Uml.Directives'
  ]);
})(angular);

(function(angular){
  angular.module('fortuneAdmin.Uml.Services', [])
    .service('UmlElementsRegistry', [ElementsRegistry]);

  function ElementsRegistry(){
    var elements = {
      resources: [],
      fields: []
    };
    var baseOffset = 0;

    this.positions = {};
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
      this.positions = {};
      this.bottomLine = [];
    }
  }

})(angular);
/**
 * Created by aldo on 5/5/14.
 */
'use strict';
angular.module('fortuneAdmin.Services', [
  'fortuneAdmin.Services.inflectPort'
])
.factory('faActionsService', [function() {
    var actionsMap  = {};
    return {
        registerActions: function(actions){
          angular.forEach(actions, function(action){
              if (angular.isDefined(actionsMap[action.name])) console.warn('Overwriting existing action ', action.name);
              actionsMap[action.name] = action;
          });
        },
        getActions : function(resName) {
            var res_actions = [];
            angular.forEach(actionsMap, function(action){
                if (angular.isUndefined(action.resources)) {
                    res_actions.push(action);
                }else if (action.resources.indexOf(resName) !== -1) {
                    res_actions.push(action);
                }
            });
            return res_actions;
        }
    };
}]);
(function(){
  if (!window.CONFIG) window.CONFIG = {};

   window.CONFIG.shared =  {
    templateDirectory: '/views/',
    baseEndpoint: '',
    apiNamespace: '/api/v1',
    getApiNamespace: function(){
      return this.baseEndpoint + this.apiNamespace;
    },
    mountPoint: '',
    appVersion: 1,
    viewUrlPrefix: '/views/',
    templateFileSuffix: '.html',
    prepareViewTemplateUrl: function(url){
      return this.viewUrlPrefix + url + this.templateFileSuffix;
    },
    routing: {
      html5Mode : true,
      prefix: ''
    },
    authToken: ''
  };
})();

'use strict';
angular.module('sharedElements.Directives', [])
  .directive('fortuneAdminNavbar', [function() {
    return {
      restrict: 'E',
      templateUrl:  CONFIG.shared.prepareViewTemplateUrl('mynavbar'),
      replace: true,
      transclude: true,
      scope: {}
    }
  }])
  .directive('fortuneAdminResourcesCells', ['$http', '$rootScope', function($http, $rootScope){
    return {
      restrict: 'E',
      templateUrl: CONFIG.shared.prepareViewTemplateUrl('resourcesCells'),
      replace: true,
      scope: true,
      link: function(scope){
        scope.r = $rootScope.fortuneAdminRoute;
        scope.resources = [];
        $http.get(CONFIG.fortuneAdmin.baseEndpoint + '/resources').success(function(data){
          scope.resources = data.resources;
          scope.services = {};
          angular.forEach(data.resources, function(r){
            r.service = (r.service || 'default-service').split('-').join(' ');
            scope.services[r.service] = scope.services[r.service] || {name: r.service, resources: [], collapse: true};
            scope.services[r.service].resources.push(r);
          });
        });
      }
    }
  }])
  .directive('fortuneAdminUmlCells', ['$rootScope', function($rootScope){
    return {
      restrict: 'E',
      replace: true,
      templateUrl: CONFIG.shared.prepareViewTemplateUrl('umlCells'),
      scope: true,
      link: function(scope){
        scope.r = $rootScope.fortuneAdminRoute;
      }
    }
  }])
    .directive('fortuneAdminDocsCells', ['$rootScope', function($rootScope){
        return {
            restrict: 'E',
            replace: true,
            templateUrl: CONFIG.shared.prepareViewTemplateUrl('docsCells'),
            scope: true,
            link: function(scope){
                scope.r = $rootScope.docsRoute;
            }
        }
    }]);
'use strict';
angular.module('sharedElements.Filters', [])
    .filter('filterLinks', [function(){
        return function(input){
            var nonLinks = {};
            angular.forEach(input, function(field, name){
                if (!angular.isObject(field) || !field.ref){
                    if (!angular.isArray(field) || !field[0] || !field[0].ref){
                        nonLinks[name] = field;
                    }
                }
            });
            return nonLinks;
        }
    }])

    // filter prevents alphabetical sort of object keys
    .filter('notSorted', [function(){
        return function(object){
            if (!object) {
                return [];
            }
            return Object.keys(object);
        }
    }]);

  // module for elements shared by components
  angular.module('sharedElements', [
        'ui.bootstrap',
        'xeditable',
        'sharedElements.Directives',
        'sharedElements.Filters'
  ]);

// A standalone app. Don't include it in plugin build.
(function(angular){
  angular.module('fortuneAdmin.Standalone', [
    'ngRoute',
    'fortuneAdmin',
    'docs'
  ])
    .config(['$routeProvider', '$locationProvider', '$httpProvider', 'fortuneAdminProvider', 'docsProvider',
      function($routeProvider, $locationProvider, $httpProvider, fortuneAdminProvider, docsProvider){
        fortuneAdminProvider.enableNavbar();
        fortuneAdminProvider.mountTo($routeProvider, '/admin');

        docsProvider.enableNavbar();
        docsProvider.mountTo($routeProvider, '/docs');

        $routeProvider.when('/', {
          templateUrl: 'init.html',
          controller: 'initCtrl'
        });
        $routeProvider.otherwise({
          redirectTo: '/'
        });
        $locationProvider.html5Mode(true);
    }])
    .run(['faActionsService', function(faActionsService){
      faActionsService.registerActions([{
        name: 'global',
        title: 'Default for every resource',
        method: function(model){
          alert('This action is set on every resource');
        }
      }]);
    }])
    .controller('initCtrl', ['$scope', '$rootScope', '$location', 'fortuneAdmin', 'docs', 'faActionsService', function($scope, $rootScope, $location, fortuneAdmin, docs, faActionsService){
      $scope.params = {
        host: 'http://localhost:1337',
        namespace: '/api/v1'
      };

      faActionsService.registerActions([
        {
          name: 'injected',
          resources: ['users'],
          title: "Injected action",
          method: function(model) {
            alert('Say hello to my little friend!');
          }
        }
      ]);
      
      $scope.startDocs = function(){
        docs.setApiHost($scope.params.host);
        docs.setApiNamespace($scope.params.namespace);

        $location.url('/docs/docs');
      };

      $scope.startFA = function(){
        fortuneAdmin.setApiHost($scope.params.host);
        fortuneAdmin.setApiNamespace($scope.params.namespace);
        
        $location.url('/admin/uml');
      };
    }]);
})(angular);