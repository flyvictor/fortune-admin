angular.module('templates-main', ['/dist/views/directives/attribute.html', '/dist/views/directives/description.html', '/dist/views/directives/example.html', '/dist/views/directives/gui.html', '/dist/views/directives/requestResponse.html', '/dist/views/directives/response.html', '/dist/views/docs.html', '/dist/views/directives/faActions.html', '/dist/views/directives/faAlert.html', '/dist/views/directives/faBulkActions.html', '/dist/views/directives/faDeleteConfirm.html', '/dist/views/directives/faDetails.html', '/dist/views/directives/faEditable.html', '/dist/views/directives/faGrid.html', '/dist/views/directives/faUiGrid.html', '/dist/views/directives/uml/canvas.html', '/dist/views/resources.html', '/dist/views/uml.html', '/dist/views/docsCells.html', '/dist/views/mynavbar.html', '/dist/views/resourcesCells.html', '/dist/views/umlCells.html']);

angular.module("/dist/views/directives/attribute.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/dist/views/directives/attribute.html",
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

angular.module("/dist/views/directives/description.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/dist/views/directives/description.html",
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

angular.module("/dist/views/directives/example.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/dist/views/directives/example.html",
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

angular.module("/dist/views/directives/gui.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/dist/views/directives/gui.html",
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

angular.module("/dist/views/directives/requestResponse.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/dist/views/directives/requestResponse.html",
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

angular.module("/dist/views/directives/response.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/dist/views/directives/response.html",
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

angular.module("/dist/views/docs.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/dist/views/docs.html",
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

angular.module("/dist/views/directives/faActions.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/dist/views/directives/faActions.html",
    "<div class=\"btn-group\" dropdown>\n" +
    "  <button ng-if=\"!options.noBulk\" type=\"button\" class=\"btn\" ng-class=\"{'btn-success': isSelected(model), 'btn-default': !isSelected(model)}\" ng-click=\"toggleSelection(model)\">\n" +
    "      <span class=\"glyphicon glyphicon-unchecked\" ng-hide=\"isSelected(model)\"></span>\n" +
    "      <span class=\"glyphicon glyphicon-ok\" ng-show=\"isSelected(model)\"></span>\n" +
    "  </button>\n" +
    "  <button type=\"button\" class=\"btn btn-danger dropdown-toggle\" ng-click=\"setClickCoords($event, model, data)\" dropdown-toggle data-toggle=\"dropdown\" aria-expanded=\"false\">\n" +
    "    <span class=\"caret\"></span>\n" +
    "    <span class=\"sr-only\">Toggle Dropdown</span>\n" +
    "  </button>\n" +
    "  <ul class=\"dropdown-menu\" role=\"menu\" ng-style=\"popupPosition\">\n" +
    "    <li ng-repeat=\"action in actions | singleActions\" ng-class=\"tempCls = action.getCss(model, data)\">\n" +
    "      <a ng-click=\"tempCls !== 'disabled' && applySingleAction(actions[action.name], model, data) \" >{{action.title || action.name}}</a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("/dist/views/directives/faAlert.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/dist/views/directives/faAlert.html",
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

angular.module("/dist/views/directives/faBulkActions.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/dist/views/directives/faBulkActions.html",
    "<div class=\"row bulk-actions\">\n" +
    "  <select class=\"selectpicker\" ng-model=\"actionToRun\" ng-options=\"action as action.title for action in actions | bulkActions\">\n" +
    "    <option value=\"\">- Nothing selected -</option>\n" +
    "  </select>\n" +
    "  <span class=\"btn btn-default\" ng-disabled=\"!actionToRun || getSelected().length === 0\" ng-click=\"applyBulkAction(actionToRun, data)\">Apply bulk action to selected items</span>\n" +
    "</div>");
}]);

angular.module("/dist/views/directives/faDeleteConfirm.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/dist/views/directives/faDeleteConfirm.html",
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

angular.module("/dist/views/directives/faDetails.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/dist/views/directives/faDetails.html",
    "<div class=\"modal-body\">\n" +
    "  <button class=\"close pull-right\" type=\"button\" aria-label=\"Close\" ng-click=\"close()\">\n" +
    "    <span aria-hidden=\"true\">&times;</span>\n" +
    "  </button>\n" +
    "  <h1>\n" +
    "    Details\n" +
    "  </h1>\n" +
    "    <pre class=\"form-control-static\">{{model | json}}</pre>\n" +
    "  <div style=\"text-align : right; margin-top : 10px\">\n" +
    "    <button class=\"btn btn-primary btn-lg\" ng-click=\"close()\">Ok</button>\n" +
    "  <div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("/dist/views/directives/faEditable.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/dist/views/directives/faEditable.html",
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

angular.module("/dist/views/directives/faGrid.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/dist/views/directives/faGrid.html",
    "<div class=\"fa-grid\">\n" +
    "    <table class=\"table table-bordered\">\n" +
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
    "        <th ng-repeat=\"(name, type) in currentResource.schema | filterFields:fields\" ng-class=\"{'column-filter': showFilter}\" ng-init=\"type = type.type || type\">\n" +
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
    "        <td ng-repeat=\"(path, type) in currentResource.schema | filterFields:fields\" ng-init=\"type = type.type || type\">\n" +
    "            <fa-editable ng-model=\"entity[path]\" path=\"path\" resource-name=\"{{currentResource.route}}\" resource-id=\"{{entity.id}}\" schema-type=\"type\"></fa-editable>\n" +
    "        </td>\n" +
    "        <td ng-repeat=\"(linkName, link) in links\">\n" +
    "            <div ng-if=\"linkToMany(linkName)\">\n" +
    "                <a ng-href=\"{{ getSubresourceRoute('subresource', {parent: currentResource.route, id: entity.id, name: link.type, inverse: resolveInverse(linkName)}) }}\">Navigate to {{link.type}}</a>\n" +
    "            </div>\n" +
    "            <div ng-if=\"!linkToMany(linkName)\">\n" +
    "                <div ng-init=\"fname = resolveFieldName(linkName)\"></div>\n" +
    "                <!--Initialize links if they do not come from server-->\n" +
    "                <div ng-init=\"entity.links = entity.links || {}\"></div>\n" +
    "                <fa-ref ng-model=\"entity.links[fname]\" ref=\"currentResource.schema[fname]\" resource-name=\"{{currentResource.route}}\" resource-id=\"{{ entity.id }}\"></fa-ref>\n" +
    "            </div>\n" +
    "        </td>\n" +
    "        <td>\n" +
    "             <fa-actions ng-model=\"entity\" data=\"data\" collection-name=\"currentResource.route\"></fa-actions>\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "</table>\n" +
    "</div>\n" +
    "");
}]);

angular.module("/dist/views/directives/faUiGrid.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/dist/views/directives/faUiGrid.html",
    "<section>\n" +
    "  <div ng-if=\"!fvOptions.noBulk && fvOptions.bulkPosition === 'top'\">\n" +
    "    <fa-bulk-actions collection-name=\"currentResource.route\" options='fvOptions.actions' data=\"data\"></fa-bulk-actions>\n" +
    "  </div>\n" +
    "  <div class=\"fa-ui-grid\" ui-grid=\"gridOptions\" ui-grid-edit></div>\n" +
    "  <div  ng-if=\"!fvOptions.noBulk && fvOptions.bulkPosition !== 'top'\">\n" +
    "      <fa-bulk-actions collection-name=\"currentResource.route\" options='fvOptions.actions' data=\"data\"></fa-bulk-actions>\n" +
    "  </div>\n" +
    "</section>\n" +
    "");
}]);

angular.module("/dist/views/directives/uml/canvas.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/dist/views/directives/uml/canvas.html",
    "<div id=\"umlcanvas\">\n" +
    "</div>");
}]);

angular.module("/dist/views/resources.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/dist/views/resources.html",
    "<section id=\"fortune-admin\" ng-class=\"{wmargin: navbarEnabled}\">\n" +
    "  <div ng-if=\"navbarEnabled\">\n" +
    "    <fortune-admin-navbar></fortune-admin-navbar>\n" +
    "  </div>\n" +
    "  <h4 class=\"text-center\">{{ parentResourceName | uppercase }} {{ parentId ? parentId + ' /' : null}} {{plurResourceName | uppercase}}</h4>\n" +
    "  <fa-grid data=\"data\" links=\"links\" resources=\"resources\" current-resource=\"currentResource\" filter=\"filter\" filter-changed-cb=\"ResourcesCtrl.filterChangedCb()\" get-typeahead-list=\"getTypeaheadList(str, name, type)\" strict-filters=\"strictFilters\"></fa-grid>\n" +
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

angular.module("/dist/views/uml.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/dist/views/uml.html",
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

angular.module("/dist/views/docsCells.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/dist/views/docsCells.html",
    "<li><a data-ng-href=\"{{ r('docs_page') }}\">Docs</a></li>");
}]);

angular.module("/dist/views/mynavbar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/dist/views/mynavbar.html",
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

angular.module("/dist/views/resourcesCells.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/dist/views/resourcesCells.html",
    "<li class=\"dropdown\" dropdown>\n" +
    "  <a href=\"#\" class=\"dropdown-toggle\" dropdown-toggle>Resources <b class=\"caret\"></b></a>\n" +
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

angular.module("/dist/views/umlCells.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/dist/views/umlCells.html",
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
        viewUrlPrefix: '/dist/views/',
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
    viewUrlPrefix: '/dist/views/',
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

      $scope.isSelected = function(model){
        return faActionsService.isSelected(model);
      };
      $scope.toggleSelection = function(model){
        faActionsService.toggleSelection(model);
      };

      $scope.actions = {
        'delete': {
          name: 'delete',
          single: true,
          bulk: true,
          title: 'Delete',
          method: function(models, isBulk, data) {
            var dialog = $modal.open({
               templateUrl: CONFIG.shared.prepareViewTemplateUrl('directives/faDeleteConfirm'),
               controller: 'DeleteConfirmCtrl'
            }).result.then(function(confirmed) {
              if(confirmed) {
                // Delete confirmed
                var ids = [];
                angular.forEach(models, function(model){
                  ids.push(model.id);
                });
                $http.delete([CONFIG.fortuneAdmin.getApiNamespace(), $scope.collectionName, ids.join(',') ].join('/'))
                  .then(function(resp) {
                    var map = _.indexBy( models, "id" ),
                        i = j = 0;

                    while( i < data.length ){
                      if( map[ data[i].id ] ) {
                        data.splice( i, 1 );
                        j++;

                        if( j === models.length ) {
                          break;
                        }
                      } else {
                        i++;
                      }
                    }
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
          single: true,
          bulk: false,
          title: "Show Details",
          method: function(models, isBulk) {
            angular.forEach(models, function(model) {
              var dialog = $modal.open({
                size : "lg",
                templateUrl: CONFIG.shared.prepareViewTemplateUrl('directives/faDetails'),
                controller: 'DetailsCtrl',
                resolve: {
                  model: function () {
                    return model;
                  }
                }
              });
            });
          }
        }
      };
      $scope.options = $scope.options || {};

      for( var opt in $scope.options ) {
        if( $scope.actions[ opt ] && $scope.options[ opt ] === false ) {
          delete $scope.actions[ opt ];
        }
      }

      $scope.applySingleAction = function(iAction, model, data){
        iAction.method([model], false, data);
      };
      $scope.applyBulkAction = function(iAction, data){
        var selected = $scope.getSelected();
        iAction.method(selected, true, data);
      };

      var additionalResourceActions = faActionsService.getActions($scope.collectionName);
      angular.forEach(additionalResourceActions, function(action){
        $scope.actions[action.name] = action;
      });
      $scope.getSelected = function() {
        var selected = faActionsService.getSelectedItems($scope.data);
        return selected;
      }
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
    'fortuneAdmin',
    'resources',
    'data',
    function ($scope, $http, $routeParams, fortuneAdmin, resources, data){
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
      $scope.strictFilters = fortuneAdmin.getStrictFilters();
      var defaultTypeahead = function(str, name, type){
        var strict  = fortuneAdmin.getStrictFilters();
        var query = {};
        if (!strict[plurResourceName]){
          query['filter[' + name + '][regex]'] = str;
          query['filter[' + name + '][options'] = 'i';
        }else{
          query['filter[' + name + ']'] = str;
        }
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
      $scope.getTypeaheadList = defaultTypeahead;
      //fortuneAdmin.typeaheadList({route: plurResourceName}, defaultTypeahead);

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
angular.module('fortuneAdmin.Directives', ['ui.grid', 'ui.grid.edit', 'ui.grid.resizeColumns', 'ui.grid.pagination', 'fortuneAdmin.Filters'])
  .directive('faActions', [function(){
    return {
      restrict: 'E',
      templateUrl: CONFIG.fortuneAdmin.prepareViewTemplateUrl('directives/faActions'),
      controller: 'faActionsCtrl',
      scope: {
        model: "=ngModel",
        data: "=",
        collectionName: "=",
        options : "="
      },
      link: function(scope){
        scope.setClickCoords = function($event, model, data){
          //Current row
          var el = $( $event.target ).parents("div[class*='ui-grid-row']").eq(0),
          //Canvas is being offset while scrolling, so we need to take that into account
              canvas = el.parents("div[class*='ui-grid-canvas']").eq(0);

          scope.popupPosition = {
            position: 'fixed',
            top  : el.position().top + canvas.position().top + 'px',
            right:  "0px",
            left : "auto",
            'x-index': 100500
          };
        };
      }
    }
  }])
  .directive('faBulkActions', [function(){
    return {
      restrict: 'E',
      templateUrl: CONFIG.fortuneAdmin.prepareViewTemplateUrl('directives/faBulkActions'),
      controller: 'faActionsCtrl',
      scope: {
        data: '=',
        collectionName: '=',
        options : "="
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
        fields: '@',
        currentResource: '=',
        filter: '=',
        filterChangedCb: '&',
        getTypeaheadList: '&',
        strictFilters: '='
      },
      templateUrl: CONFIG.fortuneAdmin.prepareViewTemplateUrl('directives/faGrid'),
      link: function(scope, attr){

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

        scope.getSubresourceRoute = function(url, params){
          return CONFIG.fortuneAdmin.route(url, params);
        };

        scope.applyFilter = function(selected, fieldName, type){
          console.log("scope.fields", scope.fields);
          var isStrict = !!scope.strictFilters[scope.currentResource.route];
          switch (type){
            case 'String':
              //Derived from typeahead
              if (isStrict){
                scope.filter['filter[' + fieldName + ']'] = selected.model;
              }else{
                scope.filter['filter[' + fieldName + '][regex]'] = selected.model;
                scope.filter['filter[' + fieldName + '][options]'] = 'i';
              }
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
  .directive('faUiGrid', [function(){
    return {
      restrict: 'E',
      scope: {
        data: '=',
        currentResource: '=',
        columns: '=',
        options: '=',
        fvOptions: '='
      },
      templateUrl: CONFIG.fortuneAdmin.prepareViewTemplateUrl('directives/faUiGrid'),
      controller: function($scope){
        $scope.options = angular.isObject($scope.options) ? $scope.options : {};
        $scope.fvOptions = $scope.fvOptions || {};
        $scope.fvOptions.actions = $scope.fvOptions.actions || {};
        $scope.gridOptions = angular.extend($scope.options, {
          //TODO: this be achieved requiring this controller from nested directives?
          _fortuneAdminData: { //Quite ugly hack to pass custom data through ui-grid
            currentResource: $scope.currentResource,
            actionsOptions : $scope.fvOptions.actions
          }
        });
        $scope.gridOptions.data = $scope.data;
        $scope.gridOptions.enableCellEdit = true;
        $scope.gridOptions.enableColumnResizing = true;

        if( $scope.fvOptions.noBulk ) {
          $scope.fvOptions.actions.noBulk = true;
        }
        if ($scope.columns) {
          //Creating shallow copy to avoid propagating local changes to parent $scope
          $scope.gridOptions.columnDefs = angular.copy($scope.columns).map(function(col){
            if (!col.faCellType) return col;
            switch (col.faCellType){
              case 'checkmark':
                col.cellTemplate = "<div class='ui-grid-cell-contents'>{{COL_FIELD ? '\u2713' : '\u2718'}}</div>";
                break;
              case 'streetlight':
                col.cellTemplate = "<div class='ui-grid-cell-contents'><div class='circle {{col.colDef.predicate(COL_FIELD, row)}}'></div></div>";
                var predicate = col.faPredicate;
                col.predicate = function(value, row){
                  var result = predicate(value, row);
                  if (['red', 'amber', 'green'].indexOf(result) === -1) throw new Error('Unexpected predicate result for streetlight cell. Expected red/amber/green, got ' + result);
                  return result;
                };
                break;
            }
            return col;
          });


          if( !$scope.fvOptions.ignoreIds ) {
            $scope.gridOptions.columnDefs.unshift({ name: 'id', enableCellEdit: false });
          }

          if (!$scope.fvOptions.disableActions){
            $scope.gridOptions.columnDefs.push(_.extend({
              name: ' ',
              enableColumnMenu : false,
              enableCellEdit: false,
              enableSorting : false,
              width: $scope.fvOptions.noBulk ? 35 : 68,
              cellTemplate: "<fa-actions ng-model='row.entity' options='row.grid.options._fortuneAdminData.actionsOptions' data='row.grid.options.data' collection-name='row.grid.options._fortuneAdminData.currentResource.route'></fa-actions>"
            }, $scope.fvOptions.actions.colDef || {}));
          }
        }
      }
    };
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


          $http.get(CONFIG.fortuneAdmin.baseEndpoint + '/resources', {cache: true}).success(function(data){
            resources = data.resources;
            angular.forEach(resources, function(resource){
              if (resource.name === scope.ref.ref){
                refRoute = resource.route;
                currentResource = resource;
              }
            });
            $http.get(CONFIG.fortuneAdmin.getApiNamespace() + '/' + refRoute, {cache: true})
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

'use strict';
angular.module('fortuneAdmin.Filters', [])
  .filter('singleActions', [function(){
    return function(input){
      var filtered = [];
      angular.forEach(input, function(item){
        if (item.single){
          filtered.push(item);
        }
      });
      return filtered;
    }
  }])
  .filter('bulkActions', [function(){
    return function(input){
      var filtered = [];
      angular.forEach(input, function(item){
        if (item.bulk){
          filtered.push(item);
        }
      });
      return filtered;
    }
  }]);

  //Fix grunt addtemplates task if you change this line
  angular.module('fortuneAdmin', [ 'templates-main', 
        'sharedElements',
        'fortuneAdmin.Controllers',
        'fortuneAdmin.Filters',
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
      var provider = {
        _strictFilters: null,
        setStrictFiltering: function(map){
          this._strictFilters = map;
        },
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
                var query = {};
                query['filter[' + inverse + ']'] = parentId;
                query.limit = 20;
                $http.get(config.getApiNamespace() + '/' + childResource, {params: query})
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
            },
            getStrictFilters: function(){
              return angular.copy(provider._strictFilters);
            }
          }
        }
      };

      return provider;
    })
    .run(['$rootScope', '$location', 'fortuneAdmin', 'editableOptions',
      function($rootScope, $location, fortuneAdmin, editableOptions) {
      var prefix = '';

      $rootScope.fortuneAdminRoute = function(url, args) {
        return prefix + fortuneAdmin.routePath(url, args);
      };
      CONFIG.fortuneAdmin.route = function(url, args) {
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
    .directive('resourceAction', ['$compile', 'UmlElementsRegistry', resourceAction])
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
            , tallestHeight = Object.keys(tempStorage[0].schema).length + Object.keys(tempStorage[0].actions || {}).length
            , tallestIndex = 0;
          angular.forEach(tempStorage, function(resource, index){
            var heightOfResource = Object.keys(resource.schema).length + Object.keys(resource.actions || {}).length;
              if (heightOfResource > tallestHeight){
              tallestElt = resource;
              tallestHeight = heightOfResource;
              tallestIndex = index;
            }
          });
          var tmp = serviceResources.splice(tallestIndex, 1);
          serviceResources = tmp.concat(serviceResources);
          angular.forEach(serviceResources, function(resource, index){
            //Split resources by services here
            var service = resource.service || 'default';
            schema[service] = schema[service] || [];
            schema[service][index] = {
              properties: [],
              actions: []
            };
            resources[service] = resources[service] || {};
            resources[service][index] = {
              name: resource.name,
              service: resource.service
            };
            if (resource.modelOptions && resource.modelOptions.pk){
              resources[service][index].pk = resource.modelOptions.pk || 'id';
            }
            angular.forEach(resource.schema, function(fieldParams, fieldName){
              schema[service][index].properties.push({
                name: fieldName,
                params: fieldParams,
                pk: resources[service][index].pk === fieldName
              });
            });

            angular.forEach(resource.actions, function(fieldParams, fieldName){
              schema[service][index].actions.push({
                name: fieldParams.name || fieldName,
                params: fieldParams
              });
            });

            var comparator = function (a, b) {
              return a.name > b.name ? 1 : -1;
            };

            schema[service][index].properties.sort(comparator);
            schema[service][index].actions.sort(comparator);
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
              var propertiesAndActions = resource.properties.concat(resource.actions);
              var elementHeight = propertiesAndActions.length * config.fieldHeight + config.headerHeight;
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
          .attr('height', function(resource){
            return resource.actions.concat(resource.properties).length * config.fieldHeight;
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
          .attr('height', function(resource){
            return (resource.actions.length + resource.properties.length) * config.fieldHeight + config.headerHeight;
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

        //renders fields or actions depending on the collection & type you pass.
        function renderElements(collection, type) {
          var x = 0;
          var y = -20;
          var collectionHeight = collection.length * config.fieldHeight;
          if (collectionHeight) {
            var svg = d3.select(elt[0])
                .append('svg')
                .attr('width', config.fieldWidth)
                .attr('height', collectionHeight);

            var directiveToRender = type === 'actions' ? 'resource-action' : 'resource-property';
            var directiveAttribute = type === 'actions' ? 'action' : 'field';

            svg.selectAll('g')
                .data(collection)
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
                .attr(directiveToRender, '')
                .attr(directiveAttribute, function(d, i){
                  return 'resource.' + type + '[' + i + ']';
                })
                .attr('class', 'text-center ' + type)
                .attr('style', 'width: 100%');

            y += config.fieldHeight;

            svg.append('line')
                .attr('x1', x)
                .attr('y1', y)
                .attr('x2', x + config.fieldWidth)
                .attr('y2', y)
                .attr("stroke-width", 3)
                .attr("stroke", "black");
          }
        }

        renderElements(scope.resource.properties, 'properties');
        renderElements(scope.resource.actions, 'actions');

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

  function resourceAction($compile, UmlElementsRegistry){
    return {
      restrict: 'A',
      scope: {
        action: '='
      },
      link: function(scope, elt){
        var portConfig = {
          width: 10,
          height: config.fieldHeight
        };
        elt.text(scope.action.name + '( )');
        elt.removeAttr('resource-action');
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
.service('faActionsService', ['$rootScope', function($rootScope) {
    var actionsMap  = {};
    var selected = [];
    var srv = this;

    this.isSelected = function(model){
       return selected.indexOf(model.id) !== -1;
    };

    this.toggleSelection = function(model){
      if (this.isSelected(model)){
        selected.splice(selected.indexOf(model.id), 1);
      }else{
        selected.push(model.id);
      }
    };

    this.getSelectedItems = function(data){
      var ret = [];
      angular.forEach(data, function(item){
        if (srv.isSelected(item)) ret.push(item);
      });
      return ret;
    };

    this.initialize = function(){
      selected = [];
    };

    $rootScope.$on('$locationChangeStart', function(){
      srv.initialize();
    });

   this.registerActions = function(actions){
      angular.forEach(actions, function(action){
          if (angular.isDefined(actionsMap[action.name])) console.warn('Overwriting existing action ', action.name);
          actionsMap[action.name] = action;
      });
   };
   this.getActions = function(resName) {
      var res_actions = [];
      angular.forEach(actionsMap, function(action){
          if (angular.isUndefined(action.resources)) {
              res_actions.push(action);
          }else if (action.resources.indexOf(resName) !== -1) {
              res_actions.push(action);
          }
      });
      return res_actions;
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
    viewUrlPrefix: '/dist/views/',
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
    .filter('filterFields', [function(){
        return function(input, fields){

            if (typeof fields === 'string') {
                fields = fields.split(",");
            }
            // Kept for backwards compatibility with old filter methods.
            /* @todo Check if this is needed/update dependent code */
            else if (angular.isArray(fields)) {
                console.log('filterFields passed Array fields');
                fields = Object.keys(fields);
            }

            var nonLinks = {};

            angular.forEach(input, function(field, name){

                if (fields) {
                  if ( fields.indexOf(name) !== -1 ) {
                    nonLinks[name] = field;
                  }
                }
                else {
                    if (!angular.isObject(field) || !field.ref){
                        if (!angular.isArray(field) || !field[0] || !field[0].ref ){
                            nonLinks[name] = field;
                        }
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

/*
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * Version: 0.12.0 - 2014-11-16
 * License: MIT
 */
angular.module("ui.bootstrap", ["ui.bootstrap.collapse","ui.bootstrap.transition","ui.bootstrap.dropdown","ui.bootstrap.typeahead","ui.bootstrap.position","ui.bootstrap.bindHtml","ui.bootstrap.modal"]);
angular.module('ui.bootstrap.collapse', ['ui.bootstrap.transition'])

  .directive('collapse', ['$transition', function ($transition) {

    return {
      link: function (scope, element, attrs) {

        var initialAnimSkip = true;
        var currentTransition;

        function doTransition(change) {
          var newTransition = $transition(element, change);
          if (currentTransition) {
            currentTransition.cancel();
          }
          currentTransition = newTransition;
          newTransition.then(newTransitionDone, newTransitionDone);
          return newTransition;

          function newTransitionDone() {
            // Make sure it's this transition, otherwise, leave it alone.
            if (currentTransition === newTransition) {
              currentTransition = undefined;
            }
          }
        }

        function expand() {
          if (initialAnimSkip) {
            initialAnimSkip = false;
            expandDone();
          } else {
            element.removeClass('collapse').addClass('collapsing');
            doTransition({ height: element[0].scrollHeight + 'px' }).then(expandDone);
          }
        }

        function expandDone() {
          element.removeClass('collapsing');
          element.addClass('collapse in');
          element.css({height: 'auto'});
        }

        function collapse() {
          if (initialAnimSkip) {
            initialAnimSkip = false;
            collapseDone();
            element.css({height: 0});
          } else {
            // CSS transitions don't work with height: auto, so we have to manually change the height to a specific value
            element.css({ height: element[0].scrollHeight + 'px' });
            //trigger reflow so a browser realizes that height was updated from auto to a specific value
            var x = element[0].offsetWidth;

            element.removeClass('collapse in').addClass('collapsing');

            doTransition({ height: 0 }).then(collapseDone);
          }
        }

        function collapseDone() {
          element.removeClass('collapsing');
          element.addClass('collapse');
        }

        scope.$watch(attrs.collapse, function (shouldCollapse) {
          if (shouldCollapse) {
            collapse();
          } else {
            expand();
          }
        });
      }
    };
  }]);

angular.module('ui.bootstrap.transition', [])

/**
 * $transition service provides a consistent interface to trigger CSS 3 transitions and to be informed when they complete.
 * @param  {DOMElement} element  The DOMElement that will be animated.
 * @param  {string|object|function} trigger  The thing that will cause the transition to start:
 *   - As a string, it represents the css class to be added to the element.
 *   - As an object, it represents a hash of style attributes to be applied to the element.
 *   - As a function, it represents a function to be called that will cause the transition to occur.
 * @return {Promise}  A promise that is resolved when the transition finishes.
 */
.factory('$transition', ['$q', '$timeout', '$rootScope', function($q, $timeout, $rootScope) {

  var $transition = function(element, trigger, options) {
    options = options || {};
    var deferred = $q.defer();
    var endEventName = $transition[options.animation ? 'animationEndEventName' : 'transitionEndEventName'];

    var transitionEndHandler = function(event) {
      $rootScope.$apply(function() {
        element.unbind(endEventName, transitionEndHandler);
        deferred.resolve(element);
      });
    };

    if (endEventName) {
      element.bind(endEventName, transitionEndHandler);
    }

    // Wrap in a timeout to allow the browser time to update the DOM before the transition is to occur
    $timeout(function() {
      if ( angular.isString(trigger) ) {
        element.addClass(trigger);
      } else if ( angular.isFunction(trigger) ) {
        trigger(element);
      } else if ( angular.isObject(trigger) ) {
        element.css(trigger);
      }
      //If browser does not support transitions, instantly resolve
      if ( !endEventName ) {
        deferred.resolve(element);
      }
    });

    // Add our custom cancel function to the promise that is returned
    // We can call this if we are about to run a new transition, which we know will prevent this transition from ending,
    // i.e. it will therefore never raise a transitionEnd event for that transition
    deferred.promise.cancel = function() {
      if ( endEventName ) {
        element.unbind(endEventName, transitionEndHandler);
      }
      deferred.reject('Transition cancelled');
    };

    return deferred.promise;
  };

  // Work out the name of the transitionEnd event
  var transElement = document.createElement('trans');
  var transitionEndEventNames = {
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'transition': 'transitionend'
  };
  var animationEndEventNames = {
    'WebkitTransition': 'webkitAnimationEnd',
    'MozTransition': 'animationend',
    'OTransition': 'oAnimationEnd',
    'transition': 'animationend'
  };
  function findEndEventName(endEventNames) {
    for (var name in endEventNames){
      if (transElement.style[name] !== undefined) {
        return endEventNames[name];
      }
    }
  }
  $transition.transitionEndEventName = findEndEventName(transitionEndEventNames);
  $transition.animationEndEventName = findEndEventName(animationEndEventNames);
  return $transition;
}]);

angular.module('ui.bootstrap.dropdown', [])

.constant('dropdownConfig', {
  openClass: 'open'
})

.service('dropdownService', ['$document', function($document) {
  var openScope = null;

  this.open = function( dropdownScope ) {
    if ( !openScope ) {
      $document.bind('click', closeDropdown);
      $document.bind('keydown', escapeKeyBind);
    }

    if ( openScope && openScope !== dropdownScope ) {
        openScope.isOpen = false;
    }

    openScope = dropdownScope;
  };

  this.close = function( dropdownScope ) {
    if ( openScope === dropdownScope ) {
      openScope = null;
      $document.unbind('click', closeDropdown);
      $document.unbind('keydown', escapeKeyBind);
    }
  };

  var closeDropdown = function( evt ) {
    // This method may still be called during the same mouse event that
    // unbound this event handler. So check openScope before proceeding.
    if (!openScope) { return; }

    var toggleElement = openScope.getToggleElement();
    if ( evt && toggleElement && toggleElement[0].contains(evt.target) ) {
        return;
    }

    openScope.$apply(function() {
      openScope.isOpen = false;
    });
  };

  var escapeKeyBind = function( evt ) {
    if ( evt.which === 27 ) {
      openScope.focusToggleElement();
      closeDropdown();
    }
  };
}])

.controller('DropdownController', ['$scope', '$attrs', '$parse', 'dropdownConfig', 'dropdownService', '$animate', function($scope, $attrs, $parse, dropdownConfig, dropdownService, $animate) {
  var self = this,
      scope = $scope.$new(), // create a child scope so we are not polluting original one
      openClass = dropdownConfig.openClass,
      getIsOpen,
      setIsOpen = angular.noop,
      toggleInvoker = $attrs.onToggle ? $parse($attrs.onToggle) : angular.noop;

  this.init = function( element ) {
    self.$element = element;

    if ( $attrs.isOpen ) {
      getIsOpen = $parse($attrs.isOpen);
      setIsOpen = getIsOpen.assign;

      $scope.$watch(getIsOpen, function(value) {
        scope.isOpen = !!value;
      });
    }
  };

  this.toggle = function( open ) {
    return scope.isOpen = arguments.length ? !!open : !scope.isOpen;
  };

  // Allow other directives to watch status
  this.isOpen = function() {
    return scope.isOpen;
  };

  scope.getToggleElement = function() {
    return self.toggleElement;
  };

  scope.focusToggleElement = function() {
    if ( self.toggleElement ) {
      self.toggleElement[0].focus();
    }
  };

  scope.$watch('isOpen', function( isOpen, wasOpen ) {
    $animate[isOpen ? 'addClass' : 'removeClass'](self.$element, openClass);

    if ( isOpen ) {
      scope.focusToggleElement();
      dropdownService.open( scope );
    } else {
      dropdownService.close( scope );
    }

    setIsOpen($scope, isOpen);
    if (angular.isDefined(isOpen) && isOpen !== wasOpen) {
      toggleInvoker($scope, { open: !!isOpen });
    }
  });

  $scope.$on('$locationChangeSuccess', function() {
    scope.isOpen = false;
  });

  $scope.$on('$destroy', function() {
    scope.$destroy();
  });
}])

.directive('dropdown', function() {
  return {
    controller: 'DropdownController',
    link: function(scope, element, attrs, dropdownCtrl) {
      dropdownCtrl.init( element );
    }
  };
})

.directive('dropdownToggle', function() {
  return {
    require: '?^dropdown',
    link: function(scope, element, attrs, dropdownCtrl) {
      if ( !dropdownCtrl ) {
        return;
      }

      dropdownCtrl.toggleElement = element;

      var toggleDropdown = function(event) {
        event.preventDefault();

        if ( !element.hasClass('disabled') && !attrs.disabled ) {
          scope.$apply(function() {
            dropdownCtrl.toggle();
          });
        }
      };

      element.bind('click', toggleDropdown);

      // WAI-ARIA
      element.attr({ 'aria-haspopup': true, 'aria-expanded': false });
      scope.$watch(dropdownCtrl.isOpen, function( isOpen ) {
        element.attr('aria-expanded', !!isOpen);
      });

      scope.$on('$destroy', function() {
        element.unbind('click', toggleDropdown);
      });
    }
  };
});

angular.module('ui.bootstrap.typeahead', ['ui.bootstrap.position', 'ui.bootstrap.bindHtml'])

/**
 * A helper service that can parse typeahead's syntax (string provided by users)
 * Extracted to a separate service for ease of unit testing
 */
  .factory('typeaheadParser', ['$parse', function ($parse) {

  //                      00000111000000000000022200000000000000003333333333333330000000000044000
  var TYPEAHEAD_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;

  return {
    parse:function (input) {

      var match = input.match(TYPEAHEAD_REGEXP);
      if (!match) {
        throw new Error(
          'Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_"' +
            ' but got "' + input + '".');
      }

      return {
        itemName:match[3],
        source:$parse(match[4]),
        viewMapper:$parse(match[2] || match[1]),
        modelMapper:$parse(match[1])
      };
    }
  };
}])

  .directive('typeahead', ['$compile', '$parse', '$q', '$timeout', '$document', '$position', 'typeaheadParser',
    function ($compile, $parse, $q, $timeout, $document, $position, typeaheadParser) {

  var HOT_KEYS = [9, 13, 27, 38, 40];

  return {
    require:'ngModel',
    link:function (originalScope, element, attrs, modelCtrl) {

      //SUPPORTED ATTRIBUTES (OPTIONS)

      //minimal no of characters that needs to be entered before typeahead kicks-in
      var minSearch = originalScope.$eval(attrs.typeaheadMinLength) || 1;

      //minimal wait time after last character typed before typehead kicks-in
      var waitTime = originalScope.$eval(attrs.typeaheadWaitMs) || 0;

      //should it restrict model values to the ones selected from the popup only?
      var isEditable = originalScope.$eval(attrs.typeaheadEditable) !== false;

      //binding to a variable that indicates if matches are being retrieved asynchronously
      var isLoadingSetter = $parse(attrs.typeaheadLoading).assign || angular.noop;

      //a callback executed when a match is selected
      var onSelectCallback = $parse(attrs.typeaheadOnSelect);

      var inputFormatter = attrs.typeaheadInputFormatter ? $parse(attrs.typeaheadInputFormatter) : undefined;

      var appendToBody =  attrs.typeaheadAppendToBody ? originalScope.$eval(attrs.typeaheadAppendToBody) : false;

      var focusFirst = originalScope.$eval(attrs.typeaheadFocusFirst) !== false;

      //INTERNAL VARIABLES

      //model setter executed upon match selection
      var $setModelValue = $parse(attrs.ngModel).assign;

      //expressions used by typeahead
      var parserResult = typeaheadParser.parse(attrs.typeahead);

      var hasFocus;

      //create a child scope for the typeahead directive so we are not polluting original scope
      //with typeahead-specific data (matches, query etc.)
      var scope = originalScope.$new();
      originalScope.$on('$destroy', function(){
        scope.$destroy();
      });

      // WAI-ARIA
      var popupId = 'typeahead-' + scope.$id + '-' + Math.floor(Math.random() * 10000);
      element.attr({
        'aria-autocomplete': 'list',
        'aria-expanded': false,
        'aria-owns': popupId
      });

      //pop-up element used to display matches
      var popUpEl = angular.element('<div typeahead-popup></div>');
      popUpEl.attr({
        id: popupId,
        matches: 'matches',
        active: 'activeIdx',
        select: 'select(activeIdx)',
        query: 'query',
        position: 'position'
      });
      //custom item template
      if (angular.isDefined(attrs.typeaheadTemplateUrl)) {
        popUpEl.attr('template-url', attrs.typeaheadTemplateUrl);
      }

      var resetMatches = function() {
        scope.matches = [];
        scope.activeIdx = -1;
        element.attr('aria-expanded', false);
      };

      var getMatchId = function(index) {
        return popupId + '-option-' + index;
      };

      // Indicate that the specified match is the active (pre-selected) item in the list owned by this typeahead.
      // This attribute is added or removed automatically when the `activeIdx` changes.
      scope.$watch('activeIdx', function(index) {
        if (index < 0) {
          element.removeAttr('aria-activedescendant');
        } else {
          element.attr('aria-activedescendant', getMatchId(index));
        }
      });

      var getMatchesAsync = function(inputValue) {

        var locals = {$viewValue: inputValue};
        isLoadingSetter(originalScope, true);
        $q.when(parserResult.source(originalScope, locals)).then(function(matches) {

          //it might happen that several async queries were in progress if a user were typing fast
          //but we are interested only in responses that correspond to the current view value
          var onCurrentRequest = (inputValue === modelCtrl.$viewValue);
          if (onCurrentRequest && hasFocus) {
            if (matches.length > 0) {

              scope.activeIdx = focusFirst ? 0 : -1;
              scope.matches.length = 0;

              //transform labels
              for(var i=0; i<matches.length; i++) {
                locals[parserResult.itemName] = matches[i];
                scope.matches.push({
                  id: getMatchId(i),
                  label: parserResult.viewMapper(scope, locals),
                  model: matches[i]
                });
              }

              scope.query = inputValue;
              //position pop-up with matches - we need to re-calculate its position each time we are opening a window
              //with matches as a pop-up might be absolute-positioned and position of an input might have changed on a page
              //due to other elements being rendered
              scope.position = appendToBody ? $position.offset(element) : $position.position(element);
              scope.position.top = scope.position.top + element.prop('offsetHeight');

              element.attr('aria-expanded', true);
            } else {
              resetMatches();
            }
          }
          if (onCurrentRequest) {
            isLoadingSetter(originalScope, false);
          }
        }, function(){
          resetMatches();
          isLoadingSetter(originalScope, false);
        });
      };

      resetMatches();

      //we need to propagate user's query so we can higlight matches
      scope.query = undefined;

      //Declare the timeout promise var outside the function scope so that stacked calls can be cancelled later 
      var timeoutPromise;

      var scheduleSearchWithTimeout = function(inputValue) {
        timeoutPromise = $timeout(function () {
          getMatchesAsync(inputValue);
        }, waitTime);
      };

      var cancelPreviousTimeout = function() {
        if (timeoutPromise) {
          $timeout.cancel(timeoutPromise);
        }
      };

      //plug into $parsers pipeline to open a typeahead on view changes initiated from DOM
      //$parsers kick-in on all the changes coming from the view as well as manually triggered by $setViewValue
      modelCtrl.$parsers.unshift(function (inputValue) {

        hasFocus = true;

        if (inputValue && inputValue.length >= minSearch) {
          if (waitTime > 0) {
            cancelPreviousTimeout();
            scheduleSearchWithTimeout(inputValue);
          } else {
            getMatchesAsync(inputValue);
          }
        } else {
          isLoadingSetter(originalScope, false);
          cancelPreviousTimeout();
          resetMatches();
        }

        if (isEditable) {
          return inputValue;
        } else {
          if (!inputValue) {
            // Reset in case user had typed something previously.
            modelCtrl.$setValidity('editable', true);
            return inputValue;
          } else {
            modelCtrl.$setValidity('editable', false);
            return undefined;
          }
        }
      });

      modelCtrl.$formatters.push(function (modelValue) {

        var candidateViewValue, emptyViewValue;
        var locals = {};

        if (inputFormatter) {

          locals.$model = modelValue;
          return inputFormatter(originalScope, locals);

        } else {

          //it might happen that we don't have enough info to properly render input value
          //we need to check for this situation and simply return model value if we can't apply custom formatting
          locals[parserResult.itemName] = modelValue;
          candidateViewValue = parserResult.viewMapper(originalScope, locals);
          locals[parserResult.itemName] = undefined;
          emptyViewValue = parserResult.viewMapper(originalScope, locals);

          return candidateViewValue!== emptyViewValue ? candidateViewValue : modelValue;
        }
      });

      scope.select = function (activeIdx) {
        //called from within the $digest() cycle
        var locals = {};
        var model, item;

        locals[parserResult.itemName] = item = scope.matches[activeIdx].model;
        model = parserResult.modelMapper(originalScope, locals);
        $setModelValue(originalScope, model);
        modelCtrl.$setValidity('editable', true);

        onSelectCallback(originalScope, {
          $item: item,
          $model: model,
          $label: parserResult.viewMapper(originalScope, locals)
        });

        resetMatches();

        //return focus to the input element if a match was selected via a mouse click event
        // use timeout to avoid $rootScope:inprog error
        $timeout(function() { element[0].focus(); }, 0, false);
      };

      //bind keyboard events: arrows up(38) / down(40), enter(13) and tab(9), esc(27)
      element.bind('keydown', function (evt) {

        //typeahead is open and an "interesting" key was pressed
        if (scope.matches.length === 0 || HOT_KEYS.indexOf(evt.which) === -1) {
          return;
        }

        // if there's nothing selected (i.e. focusFirst) and enter is hit, don't do anything
        if (scope.activeIdx == -1 && (evt.which === 13 || evt.which === 9)) {
          return;
        }

        evt.preventDefault();

        if (evt.which === 40) {
          scope.activeIdx = (scope.activeIdx + 1) % scope.matches.length;
          scope.$digest();

        } else if (evt.which === 38) {
          scope.activeIdx = (scope.activeIdx > 0 ? scope.activeIdx : scope.matches.length) - 1;
          scope.$digest();

        } else if (evt.which === 13 || evt.which === 9) {
          scope.$apply(function () {
            scope.select(scope.activeIdx);
          });

        } else if (evt.which === 27) {
          evt.stopPropagation();

          resetMatches();
          scope.$digest();
        }
      });

      element.bind('blur', function (evt) {
        hasFocus = false;
      });

      // Keep reference to click handler to unbind it.
      var dismissClickHandler = function (evt) {
        if (element[0] !== evt.target) {
          resetMatches();
          scope.$digest();
        }
      };

      $document.bind('click', dismissClickHandler);

      originalScope.$on('$destroy', function(){
        $document.unbind('click', dismissClickHandler);
        if (appendToBody) {
          $popup.remove();
        }
      });

      var $popup = $compile(popUpEl)(scope);
      if (appendToBody) {
        $document.find('body').append($popup);
      } else {
        element.after($popup);
      }
    }
  };

}])

  .directive('typeaheadPopup', function () {
    return {
      restrict:'EA',
      scope:{
        matches:'=',
        query:'=',
        active:'=',
        position:'=',
        select:'&'
      },
      replace:true,
      templateUrl:'template/typeahead/typeahead-popup.html',
      link:function (scope, element, attrs) {

        scope.templateUrl = attrs.templateUrl;

        scope.isOpen = function () {
          return scope.matches.length > 0;
        };

        scope.isActive = function (matchIdx) {
          return scope.active == matchIdx;
        };

        scope.selectActive = function (matchIdx) {
          scope.active = matchIdx;
        };

        scope.selectMatch = function (activeIdx) {
          scope.select({activeIdx:activeIdx});
        };
      }
    };
  })

  .directive('typeaheadMatch', ['$http', '$templateCache', '$compile', '$parse', function ($http, $templateCache, $compile, $parse) {
    return {
      restrict:'EA',
      scope:{
        index:'=',
        match:'=',
        query:'='
      },
      link:function (scope, element, attrs) {
        var tplUrl = $parse(attrs.templateUrl)(scope.$parent) || 'template/typeahead/typeahead-match.html';
        $http.get(tplUrl, {cache: $templateCache}).success(function(tplContent){
           element.replaceWith($compile(tplContent.trim())(scope));
        });
      }
    };
  }])

  .filter('typeaheadHighlight', function() {

    function escapeRegexp(queryToEscape) {
      return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    }

    return function(matchItem, query) {
      return query ? ('' + matchItem).replace(new RegExp(escapeRegexp(query), 'gi'), '<strong>$&</strong>') : matchItem;
    };
  });

angular.module('ui.bootstrap.position', [])

/**
 * A set of utility methods that can be use to retrieve position of DOM elements.
 * It is meant to be used where we need to absolute-position DOM elements in
 * relation to other, existing elements (this is the case for tooltips, popovers,
 * typeahead suggestions etc.).
 */
  .factory('$position', ['$document', '$window', function ($document, $window) {

    function getStyle(el, cssprop) {
      if (el.currentStyle) { //IE
        return el.currentStyle[cssprop];
      } else if ($window.getComputedStyle) {
        return $window.getComputedStyle(el)[cssprop];
      }
      // finally try and get inline style
      return el.style[cssprop];
    }

    /**
     * Checks if a given element is statically positioned
     * @param element - raw DOM element
     */
    function isStaticPositioned(element) {
      return (getStyle(element, 'position') || 'static' ) === 'static';
    }

    /**
     * returns the closest, non-statically positioned parentOffset of a given element
     * @param element
     */
    var parentOffsetEl = function (element) {
      var docDomEl = $document[0];
      var offsetParent = element.offsetParent || docDomEl;
      while (offsetParent && offsetParent !== docDomEl && isStaticPositioned(offsetParent) ) {
        offsetParent = offsetParent.offsetParent;
      }
      return offsetParent || docDomEl;
    };

    return {
      /**
       * Provides read-only equivalent of jQuery's position function:
       * http://api.jquery.com/position/
       */
      position: function (element) {
        var elBCR = this.offset(element);
        var offsetParentBCR = { top: 0, left: 0 };
        var offsetParentEl = parentOffsetEl(element[0]);
        if (offsetParentEl != $document[0]) {
          offsetParentBCR = this.offset(angular.element(offsetParentEl));
          offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
          offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
        }

        var boundingClientRect = element[0].getBoundingClientRect();
        return {
          width: boundingClientRect.width || element.prop('offsetWidth'),
          height: boundingClientRect.height || element.prop('offsetHeight'),
          top: elBCR.top - offsetParentBCR.top,
          left: elBCR.left - offsetParentBCR.left
        };
      },

      /**
       * Provides read-only equivalent of jQuery's offset function:
       * http://api.jquery.com/offset/
       */
      offset: function (element) {
        var boundingClientRect = element[0].getBoundingClientRect();
        return {
          width: boundingClientRect.width || element.prop('offsetWidth'),
          height: boundingClientRect.height || element.prop('offsetHeight'),
          top: boundingClientRect.top + ($window.pageYOffset || $document[0].documentElement.scrollTop),
          left: boundingClientRect.left + ($window.pageXOffset || $document[0].documentElement.scrollLeft)
        };
      },

      /**
       * Provides coordinates for the targetEl in relation to hostEl
       */
      positionElements: function (hostEl, targetEl, positionStr, appendToBody) {

        var positionStrParts = positionStr.split('-');
        var pos0 = positionStrParts[0], pos1 = positionStrParts[1] || 'center';

        var hostElPos,
          targetElWidth,
          targetElHeight,
          targetElPos;

        hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);

        targetElWidth = targetEl.prop('offsetWidth');
        targetElHeight = targetEl.prop('offsetHeight');

        var shiftWidth = {
          center: function () {
            return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
          },
          left: function () {
            return hostElPos.left;
          },
          right: function () {
            return hostElPos.left + hostElPos.width;
          }
        };

        var shiftHeight = {
          center: function () {
            return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
          },
          top: function () {
            return hostElPos.top;
          },
          bottom: function () {
            return hostElPos.top + hostElPos.height;
          }
        };

        switch (pos0) {
          case 'right':
            targetElPos = {
              top: shiftHeight[pos1](),
              left: shiftWidth[pos0]()
            };
            break;
          case 'left':
            targetElPos = {
              top: shiftHeight[pos1](),
              left: hostElPos.left - targetElWidth
            };
            break;
          case 'bottom':
            targetElPos = {
              top: shiftHeight[pos0](),
              left: shiftWidth[pos1]()
            };
            break;
          default:
            targetElPos = {
              top: hostElPos.top - targetElHeight,
              left: shiftWidth[pos1]()
            };
            break;
        }

        return targetElPos;
      }
    };
  }]);

angular.module('ui.bootstrap.bindHtml', [])

  .directive('bindHtmlUnsafe', function () {
    return function (scope, element, attr) {
      element.addClass('ng-binding').data('$binding', attr.bindHtmlUnsafe);
      scope.$watch(attr.bindHtmlUnsafe, function bindHtmlUnsafeWatchAction(value) {
        element.html(value || '');
      });
    };
  });
angular.module('ui.bootstrap.modal', ['ui.bootstrap.transition'])

/**
 * A helper, internal data structure that acts as a map but also allows getting / removing
 * elements in the LIFO order
 */
  .factory('$$stackedMap', function () {
    return {
      createNew: function () {
        var stack = [];

        return {
          add: function (key, value) {
            stack.push({
              key: key,
              value: value
            });
          },
          get: function (key) {
            for (var i = 0; i < stack.length; i++) {
              if (key == stack[i].key) {
                return stack[i];
              }
            }
          },
          keys: function() {
            var keys = [];
            for (var i = 0; i < stack.length; i++) {
              keys.push(stack[i].key);
            }
            return keys;
          },
          top: function () {
            return stack[stack.length - 1];
          },
          remove: function (key) {
            var idx = -1;
            for (var i = 0; i < stack.length; i++) {
              if (key == stack[i].key) {
                idx = i;
                break;
              }
            }
            return stack.splice(idx, 1)[0];
          },
          removeTop: function () {
            return stack.splice(stack.length - 1, 1)[0];
          },
          length: function () {
            return stack.length;
          }
        };
      }
    };
  })

/**
 * A helper directive for the $modal service. It creates a backdrop element.
 */
  .directive('modalBackdrop', ['$timeout', function ($timeout) {
    return {
      restrict: 'EA',
      replace: true,
      templateUrl: 'template/modal/backdrop.html',
      link: function (scope, element, attrs) {
        scope.backdropClass = attrs.backdropClass || '';

        scope.animate = false;

        //trigger CSS transitions
        $timeout(function () {
          scope.animate = true;
        });
      }
    };
  }])

  .directive('modalWindow', ['$modalStack', '$timeout', function ($modalStack, $timeout) {
    return {
      restrict: 'EA',
      scope: {
        index: '@',
        animate: '='
      },
      replace: true,
      transclude: true,
      templateUrl: function(tElement, tAttrs) {
        return tAttrs.templateUrl || 'template/modal/window.html';
      },
      link: function (scope, element, attrs) {
        element.addClass(attrs.windowClass || '');
        scope.size = attrs.size;

        $timeout(function () {
          // trigger CSS transitions
          scope.animate = true;

          /**
           * Auto-focusing of a freshly-opened modal element causes any child elements
           * with the autofocus attribute to lose focus. This is an issue on touch
           * based devices which will show and then hide the onscreen keyboard.
           * Attempts to refocus the autofocus element via JavaScript will not reopen
           * the onscreen keyboard. Fixed by updated the focusing logic to only autofocus
           * the modal element if the modal does not contain an autofocus element.
           */
          if (!element[0].querySelectorAll('[autofocus]').length) {
            element[0].focus();
          }
        });

        scope.close = function (evt) {
          var modal = $modalStack.getTop();
          if (modal && modal.value.backdrop && modal.value.backdrop != 'static' && (evt.target === evt.currentTarget)) {
            evt.preventDefault();
            evt.stopPropagation();
            $modalStack.dismiss(modal.key, 'backdrop click');
          }
        };
      }
    };
  }])

  .directive('modalTransclude', function () {
    return {
      link: function($scope, $element, $attrs, controller, $transclude) {
        $transclude($scope.$parent, function(clone) {
          $element.empty();
          $element.append(clone);
        });
      }
    };
  })

  .factory('$modalStack', ['$transition', '$timeout', '$document', '$compile', '$rootScope', '$$stackedMap',
    function ($transition, $timeout, $document, $compile, $rootScope, $$stackedMap) {

      var OPENED_MODAL_CLASS = 'modal-open';

      var backdropDomEl, backdropScope;
      var openedWindows = $$stackedMap.createNew();
      var $modalStack = {};

      function backdropIndex() {
        var topBackdropIndex = -1;
        var opened = openedWindows.keys();
        for (var i = 0; i < opened.length; i++) {
          if (openedWindows.get(opened[i]).value.backdrop) {
            topBackdropIndex = i;
          }
        }
        return topBackdropIndex;
      }

      $rootScope.$watch(backdropIndex, function(newBackdropIndex){
        if (backdropScope) {
          backdropScope.index = newBackdropIndex;
        }
      });

      function removeModalWindow(modalInstance) {

        var body = $document.find('body').eq(0);
        var modalWindow = openedWindows.get(modalInstance).value;

        //clean up the stack
        openedWindows.remove(modalInstance);

        //remove window DOM element
        removeAfterAnimate(modalWindow.modalDomEl, modalWindow.modalScope, 300, function() {
          modalWindow.modalScope.$destroy();
          body.toggleClass(OPENED_MODAL_CLASS, openedWindows.length() > 0);
          checkRemoveBackdrop();
        });
      }

      function checkRemoveBackdrop() {
          //remove backdrop if no longer needed
          if (backdropDomEl && backdropIndex() == -1) {
            var backdropScopeRef = backdropScope;
            removeAfterAnimate(backdropDomEl, backdropScope, 150, function () {
              backdropScopeRef.$destroy();
              backdropScopeRef = null;
            });
            backdropDomEl = undefined;
            backdropScope = undefined;
          }
      }

      function removeAfterAnimate(domEl, scope, emulateTime, done) {
        // Closing animation
        scope.animate = false;

        var transitionEndEventName = $transition.transitionEndEventName;
        if (transitionEndEventName) {
          // transition out
          var timeout = $timeout(afterAnimating, emulateTime);

          domEl.bind(transitionEndEventName, function () {
            $timeout.cancel(timeout);
            afterAnimating();
            scope.$apply();
          });
        } else {
          // Ensure this call is async
          $timeout(afterAnimating);
        }

        function afterAnimating() {
          if (afterAnimating.done) {
            return;
          }
          afterAnimating.done = true;

          domEl.remove();
          if (done) {
            done();
          }
        }
      }

      $document.bind('keydown', function (evt) {
        var modal;

        if (evt.which === 27) {
          modal = openedWindows.top();
          if (modal && modal.value.keyboard) {
            evt.preventDefault();
            $rootScope.$apply(function () {
              $modalStack.dismiss(modal.key, 'escape key press');
            });
          }
        }
      });

      $modalStack.open = function (modalInstance, modal) {

        openedWindows.add(modalInstance, {
          deferred: modal.deferred,
          modalScope: modal.scope,
          backdrop: modal.backdrop,
          keyboard: modal.keyboard
        });

        var body = $document.find('body').eq(0),
            currBackdropIndex = backdropIndex();

        if (currBackdropIndex >= 0 && !backdropDomEl) {
          backdropScope = $rootScope.$new(true);
          backdropScope.index = currBackdropIndex;
          var angularBackgroundDomEl = angular.element('<div modal-backdrop></div>');
          angularBackgroundDomEl.attr('backdrop-class', modal.backdropClass);
          backdropDomEl = $compile(angularBackgroundDomEl)(backdropScope);
          body.append(backdropDomEl);
        }

        var angularDomEl = angular.element('<div modal-window></div>');
        angularDomEl.attr({
          'template-url': modal.windowTemplateUrl,
          'window-class': modal.windowClass,
          'size': modal.size,
          'index': openedWindows.length() - 1,
          'animate': 'animate'
        }).html(modal.content);

        var modalDomEl = $compile(angularDomEl)(modal.scope);
        openedWindows.top().value.modalDomEl = modalDomEl;
        body.append(modalDomEl);
        body.addClass(OPENED_MODAL_CLASS);
      };

      $modalStack.close = function (modalInstance, result) {
        var modalWindow = openedWindows.get(modalInstance);
        if (modalWindow) {
          modalWindow.value.deferred.resolve(result);
          removeModalWindow(modalInstance);
        }
      };

      $modalStack.dismiss = function (modalInstance, reason) {
        var modalWindow = openedWindows.get(modalInstance);
        if (modalWindow) {
          modalWindow.value.deferred.reject(reason);
          removeModalWindow(modalInstance);
        }
      };

      $modalStack.dismissAll = function (reason) {
        var topModal = this.getTop();
        while (topModal) {
          this.dismiss(topModal.key, reason);
          topModal = this.getTop();
        }
      };

      $modalStack.getTop = function () {
        return openedWindows.top();
      };

      return $modalStack;
    }])

  .provider('$modal', function () {

    var $modalProvider = {
      options: {
        backdrop: true, //can be also false or 'static'
        keyboard: true
      },
      $get: ['$injector', '$rootScope', '$q', '$http', '$templateCache', '$controller', '$modalStack',
        function ($injector, $rootScope, $q, $http, $templateCache, $controller, $modalStack) {

          var $modal = {};

          function getTemplatePromise(options) {
            return options.template ? $q.when(options.template) :
              $http.get(angular.isFunction(options.templateUrl) ? (options.templateUrl)() : options.templateUrl,
                {cache: $templateCache}).then(function (result) {
                  return result.data;
              });
          }

          function getResolvePromises(resolves) {
            var promisesArr = [];
            angular.forEach(resolves, function (value) {
              if (angular.isFunction(value) || angular.isArray(value)) {
                promisesArr.push($q.when($injector.invoke(value)));
              }
            });
            return promisesArr;
          }

          $modal.open = function (modalOptions) {

            var modalResultDeferred = $q.defer();
            var modalOpenedDeferred = $q.defer();

            //prepare an instance of a modal to be injected into controllers and returned to a caller
            var modalInstance = {
              result: modalResultDeferred.promise,
              opened: modalOpenedDeferred.promise,
              close: function (result) {
                $modalStack.close(modalInstance, result);
              },
              dismiss: function (reason) {
                $modalStack.dismiss(modalInstance, reason);
              }
            };

            //merge and clean up options
            modalOptions = angular.extend({}, $modalProvider.options, modalOptions);
            modalOptions.resolve = modalOptions.resolve || {};

            //verify options
            if (!modalOptions.template && !modalOptions.templateUrl) {
              throw new Error('One of template or templateUrl options is required.');
            }

            var templateAndResolvePromise =
              $q.all([getTemplatePromise(modalOptions)].concat(getResolvePromises(modalOptions.resolve)));


            templateAndResolvePromise.then(function resolveSuccess(tplAndVars) {

              var modalScope = (modalOptions.scope || $rootScope).$new();
              modalScope.$close = modalInstance.close;
              modalScope.$dismiss = modalInstance.dismiss;

              var ctrlInstance, ctrlLocals = {};
              var resolveIter = 1;

              //controllers
              if (modalOptions.controller) {
                ctrlLocals.$scope = modalScope;
                ctrlLocals.$modalInstance = modalInstance;
                angular.forEach(modalOptions.resolve, function (value, key) {
                  ctrlLocals[key] = tplAndVars[resolveIter++];
                });

                ctrlInstance = $controller(modalOptions.controller, ctrlLocals);
                if (modalOptions.controllerAs) {
                  modalScope[modalOptions.controllerAs] = ctrlInstance;
                }
              }

              $modalStack.open(modalInstance, {
                scope: modalScope,
                deferred: modalResultDeferred,
                content: tplAndVars[0],
                backdrop: modalOptions.backdrop,
                keyboard: modalOptions.keyboard,
                backdropClass: modalOptions.backdropClass,
                windowClass: modalOptions.windowClass,
                windowTemplateUrl: modalOptions.windowTemplateUrl,
                size: modalOptions.size
              });

            }, function resolveError(reason) {
              modalResultDeferred.reject(reason);
            });

            templateAndResolvePromise.then(function () {
              modalOpenedDeferred.resolve(true);
            }, function () {
              modalOpenedDeferred.reject(false);
            });

            return modalInstance;
          };

          return $modal;
        }]
    };

    return $modalProvider;
  });

/*
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * Version: 0.12.0 - 2014-11-16
 * License: MIT
 */
angular.module("ui.bootstrap",["ui.bootstrap.collapse","ui.bootstrap.transition","ui.bootstrap.dropdown","ui.bootstrap.typeahead","ui.bootstrap.position","ui.bootstrap.bindHtml","ui.bootstrap.modal"]),angular.module("ui.bootstrap.collapse",["ui.bootstrap.transition"]).directive("collapse",["$transition",function(e){return{link:function(t,n,o){function i(t){function o(){s===i&&(s=void 0)}var i=e(n,t);return s&&s.cancel(),s=i,i.then(o,o),i}function a(){u?(u=!1,r()):(n.removeClass("collapse").addClass("collapsing"),i({height:n[0].scrollHeight+"px"}).then(r))}function r(){n.removeClass("collapsing"),n.addClass("collapse in"),n.css({height:"auto"})}function l(){if(u)u=!1,c(),n.css({height:0});else{n.css({height:n[0].scrollHeight+"px"});{n[0].offsetWidth}n.removeClass("collapse in").addClass("collapsing"),i({height:0}).then(c)}}function c(){n.removeClass("collapsing"),n.addClass("collapse")}var s,u=!0;t.$watch(o.collapse,function(e){e?l():a()})}}}]),angular.module("ui.bootstrap.transition",[]).factory("$transition",["$q","$timeout","$rootScope",function(e,t,n){function o(e){for(var t in e)if(void 0!==a.style[t])return e[t]}var i=function(o,a,r){r=r||{};var l=e.defer(),c=i[r.animation?"animationEndEventName":"transitionEndEventName"],s=function(){n.$apply(function(){o.unbind(c,s),l.resolve(o)})};return c&&o.bind(c,s),t(function(){angular.isString(a)?o.addClass(a):angular.isFunction(a)?a(o):angular.isObject(a)&&o.css(a),c||l.resolve(o)}),l.promise.cancel=function(){c&&o.unbind(c,s),l.reject("Transition cancelled")},l.promise},a=document.createElement("trans"),r={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"},l={WebkitTransition:"webkitAnimationEnd",MozTransition:"animationend",OTransition:"oAnimationEnd",transition:"animationend"};return i.transitionEndEventName=o(r),i.animationEndEventName=o(l),i}]),angular.module("ui.bootstrap.dropdown",[]).constant("dropdownConfig",{openClass:"open"}).service("dropdownService",["$document",function(e){var t=null;this.open=function(i){t||(e.bind("click",n),e.bind("keydown",o)),t&&t!==i&&(t.isOpen=!1),t=i},this.close=function(i){t===i&&(t=null,e.unbind("click",n),e.unbind("keydown",o))};var n=function(e){if(t){var n=t.getToggleElement();e&&n&&n[0].contains(e.target)||t.$apply(function(){t.isOpen=!1})}},o=function(e){27===e.which&&(t.focusToggleElement(),n())}}]).controller("DropdownController",["$scope","$attrs","$parse","dropdownConfig","dropdownService","$animate",function(e,t,n,o,i,a){var r,l=this,c=e.$new(),s=o.openClass,u=angular.noop,d=t.onToggle?n(t.onToggle):angular.noop;this.init=function(o){l.$element=o,t.isOpen&&(r=n(t.isOpen),u=r.assign,e.$watch(r,function(e){c.isOpen=!!e}))},this.toggle=function(e){return c.isOpen=arguments.length?!!e:!c.isOpen},this.isOpen=function(){return c.isOpen},c.getToggleElement=function(){return l.toggleElement},c.focusToggleElement=function(){l.toggleElement&&l.toggleElement[0].focus()},c.$watch("isOpen",function(t,n){a[t?"addClass":"removeClass"](l.$element,s),t?(c.focusToggleElement(),i.open(c)):i.close(c),u(e,t),angular.isDefined(t)&&t!==n&&d(e,{open:!!t})}),e.$on("$locationChangeSuccess",function(){c.isOpen=!1}),e.$on("$destroy",function(){c.$destroy()})}]).directive("dropdown",function(){return{controller:"DropdownController",link:function(e,t,n,o){o.init(t)}}}).directive("dropdownToggle",function(){return{require:"?^dropdown",link:function(e,t,n,o){if(o){o.toggleElement=t;var i=function(i){i.preventDefault(),t.hasClass("disabled")||n.disabled||e.$apply(function(){o.toggle()})};t.bind("click",i),t.attr({"aria-haspopup":!0,"aria-expanded":!1}),e.$watch(o.isOpen,function(e){t.attr("aria-expanded",!!e)}),e.$on("$destroy",function(){t.unbind("click",i)})}}}}),angular.module("ui.bootstrap.typeahead",["ui.bootstrap.position","ui.bootstrap.bindHtml"]).factory("typeaheadParser",["$parse",function(e){var t=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;return{parse:function(n){var o=n.match(t);if(!o)throw new Error('Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_" but got "'+n+'".');return{itemName:o[3],source:e(o[4]),viewMapper:e(o[2]||o[1]),modelMapper:e(o[1])}}}}]).directive("typeahead",["$compile","$parse","$q","$timeout","$document","$position","typeaheadParser",function(e,t,n,o,i,a,r){var l=[9,13,27,38,40];return{require:"ngModel",link:function(c,s,u,d){var p,f=c.$eval(u.typeaheadMinLength)||1,m=c.$eval(u.typeaheadWaitMs)||0,h=c.$eval(u.typeaheadEditable)!==!1,v=t(u.typeaheadLoading).assign||angular.noop,g=t(u.typeaheadOnSelect),$=u.typeaheadInputFormatter?t(u.typeaheadInputFormatter):void 0,b=u.typeaheadAppendToBody?c.$eval(u.typeaheadAppendToBody):!1,y=c.$eval(u.typeaheadFocusFirst)!==!1,w=t(u.ngModel).assign,k=r.parse(u.typeahead),E=c.$new();c.$on("$destroy",function(){E.$destroy()});var C="typeahead-"+E.$id+"-"+Math.floor(1e4*Math.random());s.attr({"aria-autocomplete":"list","aria-expanded":!1,"aria-owns":C});var T=angular.element("<div typeahead-popup></div>");T.attr({id:C,matches:"matches",active:"activeIdx",select:"select(activeIdx)",query:"query",position:"position"}),angular.isDefined(u.typeaheadTemplateUrl)&&T.attr("template-url",u.typeaheadTemplateUrl);var x=function(){E.matches=[],E.activeIdx=-1,s.attr("aria-expanded",!1)},S=function(e){return C+"-option-"+e};E.$watch("activeIdx",function(e){0>e?s.removeAttr("aria-activedescendant"):s.attr("aria-activedescendant",S(e))});var O=function(e){var t={$viewValue:e};v(c,!0),n.when(k.source(c,t)).then(function(n){var o=e===d.$viewValue;if(o&&p)if(n.length>0){E.activeIdx=y?0:-1,E.matches.length=0;for(var i=0;i<n.length;i++)t[k.itemName]=n[i],E.matches.push({id:S(i),label:k.viewMapper(E,t),model:n[i]});E.query=e,E.position=b?a.offset(s):a.position(s),E.position.top=E.position.top+s.prop("offsetHeight"),s.attr("aria-expanded",!0)}else x();o&&v(c,!1)},function(){x(),v(c,!1)})};x(),E.query=void 0;var U,M=function(e){U=o(function(){O(e)},m)},A=function(){U&&o.cancel(U)};d.$parsers.unshift(function(e){return p=!0,e&&e.length>=f?m>0?(A(),M(e)):O(e):(v(c,!1),A(),x()),h?e:e?void d.$setValidity("editable",!1):(d.$setValidity("editable",!0),e)}),d.$formatters.push(function(e){var t,n,o={};return $?(o.$model=e,$(c,o)):(o[k.itemName]=e,t=k.viewMapper(c,o),o[k.itemName]=void 0,n=k.viewMapper(c,o),t!==n?t:e)}),E.select=function(e){var t,n,i={};i[k.itemName]=n=E.matches[e].model,t=k.modelMapper(c,i),w(c,t),d.$setValidity("editable",!0),g(c,{$item:n,$model:t,$label:k.viewMapper(c,i)}),x(),o(function(){s[0].focus()},0,!1)},s.bind("keydown",function(e){0!==E.matches.length&&-1!==l.indexOf(e.which)&&(-1!=E.activeIdx||13!==e.which&&9!==e.which)&&(e.preventDefault(),40===e.which?(E.activeIdx=(E.activeIdx+1)%E.matches.length,E.$digest()):38===e.which?(E.activeIdx=(E.activeIdx>0?E.activeIdx:E.matches.length)-1,E.$digest()):13===e.which||9===e.which?E.$apply(function(){E.select(E.activeIdx)}):27===e.which&&(e.stopPropagation(),x(),E.$digest()))}),s.bind("blur",function(){p=!1});var I=function(e){s[0]!==e.target&&(x(),E.$digest())};i.bind("click",I),c.$on("$destroy",function(){i.unbind("click",I),b&&q.remove()});var q=e(T)(E);b?i.find("body").append(q):s.after(q)}}}]).directive("typeaheadPopup",function(){return{restrict:"EA",scope:{matches:"=",query:"=",active:"=",position:"=",select:"&"},replace:!0,templateUrl:"template/typeahead/typeahead-popup.html",link:function(e,t,n){e.templateUrl=n.templateUrl,e.isOpen=function(){return e.matches.length>0},e.isActive=function(t){return e.active==t},e.selectActive=function(t){e.active=t},e.selectMatch=function(t){e.select({activeIdx:t})}}}}).directive("typeaheadMatch",["$http","$templateCache","$compile","$parse",function(e,t,n,o){return{restrict:"EA",scope:{index:"=",match:"=",query:"="},link:function(i,a,r){var l=o(r.templateUrl)(i.$parent)||"template/typeahead/typeahead-match.html";e.get(l,{cache:t}).success(function(e){a.replaceWith(n(e.trim())(i))})}}}]).filter("typeaheadHighlight",function(){function e(e){return e.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")}return function(t,n){return n?(""+t).replace(new RegExp(e(n),"gi"),"<strong>$&</strong>"):t}}),angular.module("ui.bootstrap.position",[]).factory("$position",["$document","$window",function(e,t){function n(e,n){return e.currentStyle?e.currentStyle[n]:t.getComputedStyle?t.getComputedStyle(e)[n]:e.style[n]}function o(e){return"static"===(n(e,"position")||"static")}var i=function(t){for(var n=e[0],i=t.offsetParent||n;i&&i!==n&&o(i);)i=i.offsetParent;return i||n};return{position:function(t){var n=this.offset(t),o={top:0,left:0},a=i(t[0]);a!=e[0]&&(o=this.offset(angular.element(a)),o.top+=a.clientTop-a.scrollTop,o.left+=a.clientLeft-a.scrollLeft);var r=t[0].getBoundingClientRect();return{width:r.width||t.prop("offsetWidth"),height:r.height||t.prop("offsetHeight"),top:n.top-o.top,left:n.left-o.left}},offset:function(n){var o=n[0].getBoundingClientRect();return{width:o.width||n.prop("offsetWidth"),height:o.height||n.prop("offsetHeight"),top:o.top+(t.pageYOffset||e[0].documentElement.scrollTop),left:o.left+(t.pageXOffset||e[0].documentElement.scrollLeft)}},positionElements:function(e,t,n,o){var i,a,r,l,c=n.split("-"),s=c[0],u=c[1]||"center";i=o?this.offset(e):this.position(e),a=t.prop("offsetWidth"),r=t.prop("offsetHeight");var d={center:function(){return i.left+i.width/2-a/2},left:function(){return i.left},right:function(){return i.left+i.width}},p={center:function(){return i.top+i.height/2-r/2},top:function(){return i.top},bottom:function(){return i.top+i.height}};switch(s){case"right":l={top:p[u](),left:d[s]()};break;case"left":l={top:p[u](),left:i.left-a};break;case"bottom":l={top:p[s](),left:d[u]()};break;default:l={top:i.top-r,left:d[u]()}}return l}}}]),angular.module("ui.bootstrap.bindHtml",[]).directive("bindHtmlUnsafe",function(){return function(e,t,n){t.addClass("ng-binding").data("$binding",n.bindHtmlUnsafe),e.$watch(n.bindHtmlUnsafe,function(e){t.html(e||"")})}}),angular.module("ui.bootstrap.modal",["ui.bootstrap.transition"]).factory("$$stackedMap",function(){return{createNew:function(){var e=[];return{add:function(t,n){e.push({key:t,value:n})},get:function(t){for(var n=0;n<e.length;n++)if(t==e[n].key)return e[n]},keys:function(){for(var t=[],n=0;n<e.length;n++)t.push(e[n].key);return t},top:function(){return e[e.length-1]},remove:function(t){for(var n=-1,o=0;o<e.length;o++)if(t==e[o].key){n=o;break}return e.splice(n,1)[0]},removeTop:function(){return e.splice(e.length-1,1)[0]},length:function(){return e.length}}}}}).directive("modalBackdrop",["$timeout",function(e){return{restrict:"EA",replace:!0,templateUrl:"template/modal/backdrop.html",link:function(t,n,o){t.backdropClass=o.backdropClass||"",t.animate=!1,e(function(){t.animate=!0})}}}]).directive("modalWindow",["$modalStack","$timeout",function(e,t){return{restrict:"EA",scope:{index:"@",animate:"="},replace:!0,transclude:!0,templateUrl:function(e,t){return t.templateUrl||"template/modal/window.html"},link:function(n,o,i){o.addClass(i.windowClass||""),n.size=i.size,t(function(){n.animate=!0,o[0].querySelectorAll("[autofocus]").length||o[0].focus()}),n.close=function(t){var n=e.getTop();n&&n.value.backdrop&&"static"!=n.value.backdrop&&t.target===t.currentTarget&&(t.preventDefault(),t.stopPropagation(),e.dismiss(n.key,"backdrop click"))}}}}]).directive("modalTransclude",function(){return{link:function(e,t,n,o,i){i(e.$parent,function(e){t.empty(),t.append(e)})}}}).factory("$modalStack",["$transition","$timeout","$document","$compile","$rootScope","$$stackedMap",function(e,t,n,o,i,a){function r(){for(var e=-1,t=f.keys(),n=0;n<t.length;n++)f.get(t[n]).value.backdrop&&(e=n);return e}function l(e){var t=n.find("body").eq(0),o=f.get(e).value;f.remove(e),s(o.modalDomEl,o.modalScope,300,function(){o.modalScope.$destroy(),t.toggleClass(p,f.length()>0),c()})}function c(){if(u&&-1==r()){var e=d;s(u,d,150,function(){e.$destroy(),e=null}),u=void 0,d=void 0}}function s(n,o,i,a){function r(){r.done||(r.done=!0,n.remove(),a&&a())}o.animate=!1;var l=e.transitionEndEventName;if(l){var c=t(r,i);n.bind(l,function(){t.cancel(c),r(),o.$apply()})}else t(r)}var u,d,p="modal-open",f=a.createNew(),m={};return i.$watch(r,function(e){d&&(d.index=e)}),n.bind("keydown",function(e){var t;27===e.which&&(t=f.top(),t&&t.value.keyboard&&(e.preventDefault(),i.$apply(function(){m.dismiss(t.key,"escape key press")})))}),m.open=function(e,t){f.add(e,{deferred:t.deferred,modalScope:t.scope,backdrop:t.backdrop,keyboard:t.keyboard});var a=n.find("body").eq(0),l=r();if(l>=0&&!u){d=i.$new(!0),d.index=l;var c=angular.element("<div modal-backdrop></div>");c.attr("backdrop-class",t.backdropClass),u=o(c)(d),a.append(u)}var s=angular.element("<div modal-window></div>");s.attr({"template-url":t.windowTemplateUrl,"window-class":t.windowClass,size:t.size,index:f.length()-1,animate:"animate"}).html(t.content);var m=o(s)(t.scope);f.top().value.modalDomEl=m,a.append(m),a.addClass(p)},m.close=function(e,t){var n=f.get(e);n&&(n.value.deferred.resolve(t),l(e))},m.dismiss=function(e,t){var n=f.get(e);n&&(n.value.deferred.reject(t),l(e))},m.dismissAll=function(e){for(var t=this.getTop();t;)this.dismiss(t.key,e),t=this.getTop()},m.getTop=function(){return f.top()},m}]).provider("$modal",function(){var e={options:{backdrop:!0,keyboard:!0},$get:["$injector","$rootScope","$q","$http","$templateCache","$controller","$modalStack",function(t,n,o,i,a,r,l){function c(e){return e.template?o.when(e.template):i.get(angular.isFunction(e.templateUrl)?e.templateUrl():e.templateUrl,{cache:a}).then(function(e){return e.data})}function s(e){var n=[];return angular.forEach(e,function(e){(angular.isFunction(e)||angular.isArray(e))&&n.push(o.when(t.invoke(e)))}),n}var u={};return u.open=function(t){var i=o.defer(),a=o.defer(),u={result:i.promise,opened:a.promise,close:function(e){l.close(u,e)},dismiss:function(e){l.dismiss(u,e)}};if(t=angular.extend({},e.options,t),t.resolve=t.resolve||{},!t.template&&!t.templateUrl)throw new Error("One of template or templateUrl options is required.");var d=o.all([c(t)].concat(s(t.resolve)));return d.then(function(e){var o=(t.scope||n).$new();o.$close=u.close,o.$dismiss=u.dismiss;var a,c={},s=1;t.controller&&(c.$scope=o,c.$modalInstance=u,angular.forEach(t.resolve,function(t,n){c[n]=e[s++]}),a=r(t.controller,c),t.controllerAs&&(o[t.controllerAs]=a)),l.open(u,{scope:o,deferred:i,content:e[0],backdrop:t.backdrop,keyboard:t.keyboard,backdropClass:t.backdropClass,windowClass:t.windowClass,windowTemplateUrl:t.windowTemplateUrl,size:t.size})},function(e){i.reject(e)}),d.then(function(){a.resolve(!0)},function(){a.reject(!1)}),u},u}]};return e});
/*
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * Version: 0.12.0 - 2014-11-16
 * License: MIT
 */
angular.module("ui.bootstrap", ["ui.bootstrap.tpls","ui.bootstrap.collapse","ui.bootstrap.transition","ui.bootstrap.dropdown","ui.bootstrap.typeahead","ui.bootstrap.position","ui.bootstrap.bindHtml","ui.bootstrap.modal"]);
angular.module("ui.bootstrap.tpls", ["template/typeahead/typeahead-match.html","template/typeahead/typeahead-popup.html","template/modal/backdrop.html","template/modal/window.html"]);
angular.module('ui.bootstrap.collapse', ['ui.bootstrap.transition'])

  .directive('collapse', ['$transition', function ($transition) {

    return {
      link: function (scope, element, attrs) {

        var initialAnimSkip = true;
        var currentTransition;

        function doTransition(change) {
          var newTransition = $transition(element, change);
          if (currentTransition) {
            currentTransition.cancel();
          }
          currentTransition = newTransition;
          newTransition.then(newTransitionDone, newTransitionDone);
          return newTransition;

          function newTransitionDone() {
            // Make sure it's this transition, otherwise, leave it alone.
            if (currentTransition === newTransition) {
              currentTransition = undefined;
            }
          }
        }

        function expand() {
          if (initialAnimSkip) {
            initialAnimSkip = false;
            expandDone();
          } else {
            element.removeClass('collapse').addClass('collapsing');
            doTransition({ height: element[0].scrollHeight + 'px' }).then(expandDone);
          }
        }

        function expandDone() {
          element.removeClass('collapsing');
          element.addClass('collapse in');
          element.css({height: 'auto'});
        }

        function collapse() {
          if (initialAnimSkip) {
            initialAnimSkip = false;
            collapseDone();
            element.css({height: 0});
          } else {
            // CSS transitions don't work with height: auto, so we have to manually change the height to a specific value
            element.css({ height: element[0].scrollHeight + 'px' });
            //trigger reflow so a browser realizes that height was updated from auto to a specific value
            var x = element[0].offsetWidth;

            element.removeClass('collapse in').addClass('collapsing');

            doTransition({ height: 0 }).then(collapseDone);
          }
        }

        function collapseDone() {
          element.removeClass('collapsing');
          element.addClass('collapse');
        }

        scope.$watch(attrs.collapse, function (shouldCollapse) {
          if (shouldCollapse) {
            collapse();
          } else {
            expand();
          }
        });
      }
    };
  }]);

angular.module('ui.bootstrap.transition', [])

/**
 * $transition service provides a consistent interface to trigger CSS 3 transitions and to be informed when they complete.
 * @param  {DOMElement} element  The DOMElement that will be animated.
 * @param  {string|object|function} trigger  The thing that will cause the transition to start:
 *   - As a string, it represents the css class to be added to the element.
 *   - As an object, it represents a hash of style attributes to be applied to the element.
 *   - As a function, it represents a function to be called that will cause the transition to occur.
 * @return {Promise}  A promise that is resolved when the transition finishes.
 */
.factory('$transition', ['$q', '$timeout', '$rootScope', function($q, $timeout, $rootScope) {

  var $transition = function(element, trigger, options) {
    options = options || {};
    var deferred = $q.defer();
    var endEventName = $transition[options.animation ? 'animationEndEventName' : 'transitionEndEventName'];

    var transitionEndHandler = function(event) {
      $rootScope.$apply(function() {
        element.unbind(endEventName, transitionEndHandler);
        deferred.resolve(element);
      });
    };

    if (endEventName) {
      element.bind(endEventName, transitionEndHandler);
    }

    // Wrap in a timeout to allow the browser time to update the DOM before the transition is to occur
    $timeout(function() {
      if ( angular.isString(trigger) ) {
        element.addClass(trigger);
      } else if ( angular.isFunction(trigger) ) {
        trigger(element);
      } else if ( angular.isObject(trigger) ) {
        element.css(trigger);
      }
      //If browser does not support transitions, instantly resolve
      if ( !endEventName ) {
        deferred.resolve(element);
      }
    });

    // Add our custom cancel function to the promise that is returned
    // We can call this if we are about to run a new transition, which we know will prevent this transition from ending,
    // i.e. it will therefore never raise a transitionEnd event for that transition
    deferred.promise.cancel = function() {
      if ( endEventName ) {
        element.unbind(endEventName, transitionEndHandler);
      }
      deferred.reject('Transition cancelled');
    };

    return deferred.promise;
  };

  // Work out the name of the transitionEnd event
  var transElement = document.createElement('trans');
  var transitionEndEventNames = {
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'transition': 'transitionend'
  };
  var animationEndEventNames = {
    'WebkitTransition': 'webkitAnimationEnd',
    'MozTransition': 'animationend',
    'OTransition': 'oAnimationEnd',
    'transition': 'animationend'
  };
  function findEndEventName(endEventNames) {
    for (var name in endEventNames){
      if (transElement.style[name] !== undefined) {
        return endEventNames[name];
      }
    }
  }
  $transition.transitionEndEventName = findEndEventName(transitionEndEventNames);
  $transition.animationEndEventName = findEndEventName(animationEndEventNames);
  return $transition;
}]);

angular.module('ui.bootstrap.dropdown', [])

.constant('dropdownConfig', {
  openClass: 'open'
})

.service('dropdownService', ['$document', function($document) {
  var openScope = null;

  this.open = function( dropdownScope ) {
    if ( !openScope ) {
      $document.bind('click', closeDropdown);
      $document.bind('keydown', escapeKeyBind);
    }

    if ( openScope && openScope !== dropdownScope ) {
        openScope.isOpen = false;
    }

    openScope = dropdownScope;
  };

  this.close = function( dropdownScope ) {
    if ( openScope === dropdownScope ) {
      openScope = null;
      $document.unbind('click', closeDropdown);
      $document.unbind('keydown', escapeKeyBind);
    }
  };

  var closeDropdown = function( evt ) {
    // This method may still be called during the same mouse event that
    // unbound this event handler. So check openScope before proceeding.
    if (!openScope) { return; }

    var toggleElement = openScope.getToggleElement();
    if ( evt && toggleElement && toggleElement[0].contains(evt.target) ) {
        return;
    }

    openScope.$apply(function() {
      openScope.isOpen = false;
    });
  };

  var escapeKeyBind = function( evt ) {
    if ( evt.which === 27 ) {
      openScope.focusToggleElement();
      closeDropdown();
    }
  };
}])

.controller('DropdownController', ['$scope', '$attrs', '$parse', 'dropdownConfig', 'dropdownService', '$animate', function($scope, $attrs, $parse, dropdownConfig, dropdownService, $animate) {
  var self = this,
      scope = $scope.$new(), // create a child scope so we are not polluting original one
      openClass = dropdownConfig.openClass,
      getIsOpen,
      setIsOpen = angular.noop,
      toggleInvoker = $attrs.onToggle ? $parse($attrs.onToggle) : angular.noop;

  this.init = function( element ) {
    self.$element = element;

    if ( $attrs.isOpen ) {
      getIsOpen = $parse($attrs.isOpen);
      setIsOpen = getIsOpen.assign;

      $scope.$watch(getIsOpen, function(value) {
        scope.isOpen = !!value;
      });
    }
  };

  this.toggle = function( open ) {
    return scope.isOpen = arguments.length ? !!open : !scope.isOpen;
  };

  // Allow other directives to watch status
  this.isOpen = function() {
    return scope.isOpen;
  };

  scope.getToggleElement = function() {
    return self.toggleElement;
  };

  scope.focusToggleElement = function() {
    if ( self.toggleElement ) {
      self.toggleElement[0].focus();
    }
  };

  scope.$watch('isOpen', function( isOpen, wasOpen ) {
    $animate[isOpen ? 'addClass' : 'removeClass'](self.$element, openClass);

    if ( isOpen ) {
      scope.focusToggleElement();
      dropdownService.open( scope );
    } else {
      dropdownService.close( scope );
    }

    setIsOpen($scope, isOpen);
    if (angular.isDefined(isOpen) && isOpen !== wasOpen) {
      toggleInvoker($scope, { open: !!isOpen });
    }
  });

  $scope.$on('$locationChangeSuccess', function() {
    scope.isOpen = false;
  });

  $scope.$on('$destroy', function() {
    scope.$destroy();
  });
}])

.directive('dropdown', function() {
  return {
    controller: 'DropdownController',
    link: function(scope, element, attrs, dropdownCtrl) {
      dropdownCtrl.init( element );
    }
  };
})

.directive('dropdownToggle', function() {
  return {
    require: '?^dropdown',
    link: function(scope, element, attrs, dropdownCtrl) {
      if ( !dropdownCtrl ) {
        return;
      }

      dropdownCtrl.toggleElement = element;

      var toggleDropdown = function(event) {
        event.preventDefault();

        if ( !element.hasClass('disabled') && !attrs.disabled ) {
          scope.$apply(function() {
            dropdownCtrl.toggle();
          });
        }
      };

      element.bind('click', toggleDropdown);

      // WAI-ARIA
      element.attr({ 'aria-haspopup': true, 'aria-expanded': false });
      scope.$watch(dropdownCtrl.isOpen, function( isOpen ) {
        element.attr('aria-expanded', !!isOpen);
      });

      scope.$on('$destroy', function() {
        element.unbind('click', toggleDropdown);
      });
    }
  };
});

angular.module('ui.bootstrap.typeahead', ['ui.bootstrap.position', 'ui.bootstrap.bindHtml'])

/**
 * A helper service that can parse typeahead's syntax (string provided by users)
 * Extracted to a separate service for ease of unit testing
 */
  .factory('typeaheadParser', ['$parse', function ($parse) {

  //                      00000111000000000000022200000000000000003333333333333330000000000044000
  var TYPEAHEAD_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;

  return {
    parse:function (input) {

      var match = input.match(TYPEAHEAD_REGEXP);
      if (!match) {
        throw new Error(
          'Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_"' +
            ' but got "' + input + '".');
      }

      return {
        itemName:match[3],
        source:$parse(match[4]),
        viewMapper:$parse(match[2] || match[1]),
        modelMapper:$parse(match[1])
      };
    }
  };
}])

  .directive('typeahead', ['$compile', '$parse', '$q', '$timeout', '$document', '$position', 'typeaheadParser',
    function ($compile, $parse, $q, $timeout, $document, $position, typeaheadParser) {

  var HOT_KEYS = [9, 13, 27, 38, 40];

  return {
    require:'ngModel',
    link:function (originalScope, element, attrs, modelCtrl) {

      //SUPPORTED ATTRIBUTES (OPTIONS)

      //minimal no of characters that needs to be entered before typeahead kicks-in
      var minSearch = originalScope.$eval(attrs.typeaheadMinLength) || 1;

      //minimal wait time after last character typed before typehead kicks-in
      var waitTime = originalScope.$eval(attrs.typeaheadWaitMs) || 0;

      //should it restrict model values to the ones selected from the popup only?
      var isEditable = originalScope.$eval(attrs.typeaheadEditable) !== false;

      //binding to a variable that indicates if matches are being retrieved asynchronously
      var isLoadingSetter = $parse(attrs.typeaheadLoading).assign || angular.noop;

      //a callback executed when a match is selected
      var onSelectCallback = $parse(attrs.typeaheadOnSelect);

      var inputFormatter = attrs.typeaheadInputFormatter ? $parse(attrs.typeaheadInputFormatter) : undefined;

      var appendToBody =  attrs.typeaheadAppendToBody ? originalScope.$eval(attrs.typeaheadAppendToBody) : false;

      var focusFirst = originalScope.$eval(attrs.typeaheadFocusFirst) !== false;

      //INTERNAL VARIABLES

      //model setter executed upon match selection
      var $setModelValue = $parse(attrs.ngModel).assign;

      //expressions used by typeahead
      var parserResult = typeaheadParser.parse(attrs.typeahead);

      var hasFocus;

      //create a child scope for the typeahead directive so we are not polluting original scope
      //with typeahead-specific data (matches, query etc.)
      var scope = originalScope.$new();
      originalScope.$on('$destroy', function(){
        scope.$destroy();
      });

      // WAI-ARIA
      var popupId = 'typeahead-' + scope.$id + '-' + Math.floor(Math.random() * 10000);
      element.attr({
        'aria-autocomplete': 'list',
        'aria-expanded': false,
        'aria-owns': popupId
      });

      //pop-up element used to display matches
      var popUpEl = angular.element('<div typeahead-popup></div>');
      popUpEl.attr({
        id: popupId,
        matches: 'matches',
        active: 'activeIdx',
        select: 'select(activeIdx)',
        query: 'query',
        position: 'position'
      });
      //custom item template
      if (angular.isDefined(attrs.typeaheadTemplateUrl)) {
        popUpEl.attr('template-url', attrs.typeaheadTemplateUrl);
      }

      var resetMatches = function() {
        scope.matches = [];
        scope.activeIdx = -1;
        element.attr('aria-expanded', false);
      };

      var getMatchId = function(index) {
        return popupId + '-option-' + index;
      };

      // Indicate that the specified match is the active (pre-selected) item in the list owned by this typeahead.
      // This attribute is added or removed automatically when the `activeIdx` changes.
      scope.$watch('activeIdx', function(index) {
        if (index < 0) {
          element.removeAttr('aria-activedescendant');
        } else {
          element.attr('aria-activedescendant', getMatchId(index));
        }
      });

      var getMatchesAsync = function(inputValue) {

        var locals = {$viewValue: inputValue};
        isLoadingSetter(originalScope, true);
        $q.when(parserResult.source(originalScope, locals)).then(function(matches) {

          //it might happen that several async queries were in progress if a user were typing fast
          //but we are interested only in responses that correspond to the current view value
          var onCurrentRequest = (inputValue === modelCtrl.$viewValue);
          if (onCurrentRequest && hasFocus) {
            if (matches.length > 0) {

              scope.activeIdx = focusFirst ? 0 : -1;
              scope.matches.length = 0;

              //transform labels
              for(var i=0; i<matches.length; i++) {
                locals[parserResult.itemName] = matches[i];
                scope.matches.push({
                  id: getMatchId(i),
                  label: parserResult.viewMapper(scope, locals),
                  model: matches[i]
                });
              }

              scope.query = inputValue;
              //position pop-up with matches - we need to re-calculate its position each time we are opening a window
              //with matches as a pop-up might be absolute-positioned and position of an input might have changed on a page
              //due to other elements being rendered
              scope.position = appendToBody ? $position.offset(element) : $position.position(element);
              scope.position.top = scope.position.top + element.prop('offsetHeight');

              element.attr('aria-expanded', true);
            } else {
              resetMatches();
            }
          }
          if (onCurrentRequest) {
            isLoadingSetter(originalScope, false);
          }
        }, function(){
          resetMatches();
          isLoadingSetter(originalScope, false);
        });
      };

      resetMatches();

      //we need to propagate user's query so we can higlight matches
      scope.query = undefined;

      //Declare the timeout promise var outside the function scope so that stacked calls can be cancelled later 
      var timeoutPromise;

      var scheduleSearchWithTimeout = function(inputValue) {
        timeoutPromise = $timeout(function () {
          getMatchesAsync(inputValue);
        }, waitTime);
      };

      var cancelPreviousTimeout = function() {
        if (timeoutPromise) {
          $timeout.cancel(timeoutPromise);
        }
      };

      //plug into $parsers pipeline to open a typeahead on view changes initiated from DOM
      //$parsers kick-in on all the changes coming from the view as well as manually triggered by $setViewValue
      modelCtrl.$parsers.unshift(function (inputValue) {

        hasFocus = true;

        if (inputValue && inputValue.length >= minSearch) {
          if (waitTime > 0) {
            cancelPreviousTimeout();
            scheduleSearchWithTimeout(inputValue);
          } else {
            getMatchesAsync(inputValue);
          }
        } else {
          isLoadingSetter(originalScope, false);
          cancelPreviousTimeout();
          resetMatches();
        }

        if (isEditable) {
          return inputValue;
        } else {
          if (!inputValue) {
            // Reset in case user had typed something previously.
            modelCtrl.$setValidity('editable', true);
            return inputValue;
          } else {
            modelCtrl.$setValidity('editable', false);
            return undefined;
          }
        }
      });

      modelCtrl.$formatters.push(function (modelValue) {

        var candidateViewValue, emptyViewValue;
        var locals = {};

        if (inputFormatter) {

          locals.$model = modelValue;
          return inputFormatter(originalScope, locals);

        } else {

          //it might happen that we don't have enough info to properly render input value
          //we need to check for this situation and simply return model value if we can't apply custom formatting
          locals[parserResult.itemName] = modelValue;
          candidateViewValue = parserResult.viewMapper(originalScope, locals);
          locals[parserResult.itemName] = undefined;
          emptyViewValue = parserResult.viewMapper(originalScope, locals);

          return candidateViewValue!== emptyViewValue ? candidateViewValue : modelValue;
        }
      });

      scope.select = function (activeIdx) {
        //called from within the $digest() cycle
        var locals = {};
        var model, item;

        locals[parserResult.itemName] = item = scope.matches[activeIdx].model;
        model = parserResult.modelMapper(originalScope, locals);
        $setModelValue(originalScope, model);
        modelCtrl.$setValidity('editable', true);

        onSelectCallback(originalScope, {
          $item: item,
          $model: model,
          $label: parserResult.viewMapper(originalScope, locals)
        });

        resetMatches();

        //return focus to the input element if a match was selected via a mouse click event
        // use timeout to avoid $rootScope:inprog error
        $timeout(function() { element[0].focus(); }, 0, false);
      };

      //bind keyboard events: arrows up(38) / down(40), enter(13) and tab(9), esc(27)
      element.bind('keydown', function (evt) {

        //typeahead is open and an "interesting" key was pressed
        if (scope.matches.length === 0 || HOT_KEYS.indexOf(evt.which) === -1) {
          return;
        }

        // if there's nothing selected (i.e. focusFirst) and enter is hit, don't do anything
        if (scope.activeIdx == -1 && (evt.which === 13 || evt.which === 9)) {
          return;
        }

        evt.preventDefault();

        if (evt.which === 40) {
          scope.activeIdx = (scope.activeIdx + 1) % scope.matches.length;
          scope.$digest();

        } else if (evt.which === 38) {
          scope.activeIdx = (scope.activeIdx > 0 ? scope.activeIdx : scope.matches.length) - 1;
          scope.$digest();

        } else if (evt.which === 13 || evt.which === 9) {
          scope.$apply(function () {
            scope.select(scope.activeIdx);
          });

        } else if (evt.which === 27) {
          evt.stopPropagation();

          resetMatches();
          scope.$digest();
        }
      });

      element.bind('blur', function (evt) {
        hasFocus = false;
      });

      // Keep reference to click handler to unbind it.
      var dismissClickHandler = function (evt) {
        if (element[0] !== evt.target) {
          resetMatches();
          scope.$digest();
        }
      };

      $document.bind('click', dismissClickHandler);

      originalScope.$on('$destroy', function(){
        $document.unbind('click', dismissClickHandler);
        if (appendToBody) {
          $popup.remove();
        }
      });

      var $popup = $compile(popUpEl)(scope);
      if (appendToBody) {
        $document.find('body').append($popup);
      } else {
        element.after($popup);
      }
    }
  };

}])

  .directive('typeaheadPopup', function () {
    return {
      restrict:'EA',
      scope:{
        matches:'=',
        query:'=',
        active:'=',
        position:'=',
        select:'&'
      },
      replace:true,
      templateUrl:'template/typeahead/typeahead-popup.html',
      link:function (scope, element, attrs) {

        scope.templateUrl = attrs.templateUrl;

        scope.isOpen = function () {
          return scope.matches.length > 0;
        };

        scope.isActive = function (matchIdx) {
          return scope.active == matchIdx;
        };

        scope.selectActive = function (matchIdx) {
          scope.active = matchIdx;
        };

        scope.selectMatch = function (activeIdx) {
          scope.select({activeIdx:activeIdx});
        };
      }
    };
  })

  .directive('typeaheadMatch', ['$http', '$templateCache', '$compile', '$parse', function ($http, $templateCache, $compile, $parse) {
    return {
      restrict:'EA',
      scope:{
        index:'=',
        match:'=',
        query:'='
      },
      link:function (scope, element, attrs) {
        var tplUrl = $parse(attrs.templateUrl)(scope.$parent) || 'template/typeahead/typeahead-match.html';
        $http.get(tplUrl, {cache: $templateCache}).success(function(tplContent){
           element.replaceWith($compile(tplContent.trim())(scope));
        });
      }
    };
  }])

  .filter('typeaheadHighlight', function() {

    function escapeRegexp(queryToEscape) {
      return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    }

    return function(matchItem, query) {
      return query ? ('' + matchItem).replace(new RegExp(escapeRegexp(query), 'gi'), '<strong>$&</strong>') : matchItem;
    };
  });

angular.module('ui.bootstrap.position', [])

/**
 * A set of utility methods that can be use to retrieve position of DOM elements.
 * It is meant to be used where we need to absolute-position DOM elements in
 * relation to other, existing elements (this is the case for tooltips, popovers,
 * typeahead suggestions etc.).
 */
  .factory('$position', ['$document', '$window', function ($document, $window) {

    function getStyle(el, cssprop) {
      if (el.currentStyle) { //IE
        return el.currentStyle[cssprop];
      } else if ($window.getComputedStyle) {
        return $window.getComputedStyle(el)[cssprop];
      }
      // finally try and get inline style
      return el.style[cssprop];
    }

    /**
     * Checks if a given element is statically positioned
     * @param element - raw DOM element
     */
    function isStaticPositioned(element) {
      return (getStyle(element, 'position') || 'static' ) === 'static';
    }

    /**
     * returns the closest, non-statically positioned parentOffset of a given element
     * @param element
     */
    var parentOffsetEl = function (element) {
      var docDomEl = $document[0];
      var offsetParent = element.offsetParent || docDomEl;
      while (offsetParent && offsetParent !== docDomEl && isStaticPositioned(offsetParent) ) {
        offsetParent = offsetParent.offsetParent;
      }
      return offsetParent || docDomEl;
    };

    return {
      /**
       * Provides read-only equivalent of jQuery's position function:
       * http://api.jquery.com/position/
       */
      position: function (element) {
        var elBCR = this.offset(element);
        var offsetParentBCR = { top: 0, left: 0 };
        var offsetParentEl = parentOffsetEl(element[0]);
        if (offsetParentEl != $document[0]) {
          offsetParentBCR = this.offset(angular.element(offsetParentEl));
          offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
          offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
        }

        var boundingClientRect = element[0].getBoundingClientRect();
        return {
          width: boundingClientRect.width || element.prop('offsetWidth'),
          height: boundingClientRect.height || element.prop('offsetHeight'),
          top: elBCR.top - offsetParentBCR.top,
          left: elBCR.left - offsetParentBCR.left
        };
      },

      /**
       * Provides read-only equivalent of jQuery's offset function:
       * http://api.jquery.com/offset/
       */
      offset: function (element) {
        var boundingClientRect = element[0].getBoundingClientRect();
        return {
          width: boundingClientRect.width || element.prop('offsetWidth'),
          height: boundingClientRect.height || element.prop('offsetHeight'),
          top: boundingClientRect.top + ($window.pageYOffset || $document[0].documentElement.scrollTop),
          left: boundingClientRect.left + ($window.pageXOffset || $document[0].documentElement.scrollLeft)
        };
      },

      /**
       * Provides coordinates for the targetEl in relation to hostEl
       */
      positionElements: function (hostEl, targetEl, positionStr, appendToBody) {

        var positionStrParts = positionStr.split('-');
        var pos0 = positionStrParts[0], pos1 = positionStrParts[1] || 'center';

        var hostElPos,
          targetElWidth,
          targetElHeight,
          targetElPos;

        hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);

        targetElWidth = targetEl.prop('offsetWidth');
        targetElHeight = targetEl.prop('offsetHeight');

        var shiftWidth = {
          center: function () {
            return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
          },
          left: function () {
            return hostElPos.left;
          },
          right: function () {
            return hostElPos.left + hostElPos.width;
          }
        };

        var shiftHeight = {
          center: function () {
            return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
          },
          top: function () {
            return hostElPos.top;
          },
          bottom: function () {
            return hostElPos.top + hostElPos.height;
          }
        };

        switch (pos0) {
          case 'right':
            targetElPos = {
              top: shiftHeight[pos1](),
              left: shiftWidth[pos0]()
            };
            break;
          case 'left':
            targetElPos = {
              top: shiftHeight[pos1](),
              left: hostElPos.left - targetElWidth
            };
            break;
          case 'bottom':
            targetElPos = {
              top: shiftHeight[pos0](),
              left: shiftWidth[pos1]()
            };
            break;
          default:
            targetElPos = {
              top: hostElPos.top - targetElHeight,
              left: shiftWidth[pos1]()
            };
            break;
        }

        return targetElPos;
      }
    };
  }]);

angular.module('ui.bootstrap.bindHtml', [])

  .directive('bindHtmlUnsafe', function () {
    return function (scope, element, attr) {
      element.addClass('ng-binding').data('$binding', attr.bindHtmlUnsafe);
      scope.$watch(attr.bindHtmlUnsafe, function bindHtmlUnsafeWatchAction(value) {
        element.html(value || '');
      });
    };
  });
angular.module('ui.bootstrap.modal', ['ui.bootstrap.transition'])

/**
 * A helper, internal data structure that acts as a map but also allows getting / removing
 * elements in the LIFO order
 */
  .factory('$$stackedMap', function () {
    return {
      createNew: function () {
        var stack = [];

        return {
          add: function (key, value) {
            stack.push({
              key: key,
              value: value
            });
          },
          get: function (key) {
            for (var i = 0; i < stack.length; i++) {
              if (key == stack[i].key) {
                return stack[i];
              }
            }
          },
          keys: function() {
            var keys = [];
            for (var i = 0; i < stack.length; i++) {
              keys.push(stack[i].key);
            }
            return keys;
          },
          top: function () {
            return stack[stack.length - 1];
          },
          remove: function (key) {
            var idx = -1;
            for (var i = 0; i < stack.length; i++) {
              if (key == stack[i].key) {
                idx = i;
                break;
              }
            }
            return stack.splice(idx, 1)[0];
          },
          removeTop: function () {
            return stack.splice(stack.length - 1, 1)[0];
          },
          length: function () {
            return stack.length;
          }
        };
      }
    };
  })

/**
 * A helper directive for the $modal service. It creates a backdrop element.
 */
  .directive('modalBackdrop', ['$timeout', function ($timeout) {
    return {
      restrict: 'EA',
      replace: true,
      templateUrl: 'template/modal/backdrop.html',
      link: function (scope, element, attrs) {
        scope.backdropClass = attrs.backdropClass || '';

        scope.animate = false;

        //trigger CSS transitions
        $timeout(function () {
          scope.animate = true;
        });
      }
    };
  }])

  .directive('modalWindow', ['$modalStack', '$timeout', function ($modalStack, $timeout) {
    return {
      restrict: 'EA',
      scope: {
        index: '@',
        animate: '='
      },
      replace: true,
      transclude: true,
      templateUrl: function(tElement, tAttrs) {
        return tAttrs.templateUrl || 'template/modal/window.html';
      },
      link: function (scope, element, attrs) {
        element.addClass(attrs.windowClass || '');
        scope.size = attrs.size;

        $timeout(function () {
          // trigger CSS transitions
          scope.animate = true;

          /**
           * Auto-focusing of a freshly-opened modal element causes any child elements
           * with the autofocus attribute to lose focus. This is an issue on touch
           * based devices which will show and then hide the onscreen keyboard.
           * Attempts to refocus the autofocus element via JavaScript will not reopen
           * the onscreen keyboard. Fixed by updated the focusing logic to only autofocus
           * the modal element if the modal does not contain an autofocus element.
           */
          if (!element[0].querySelectorAll('[autofocus]').length) {
            element[0].focus();
          }
        });

        scope.close = function (evt) {
          var modal = $modalStack.getTop();
          if (modal && modal.value.backdrop && modal.value.backdrop != 'static' && (evt.target === evt.currentTarget)) {
            evt.preventDefault();
            evt.stopPropagation();
            $modalStack.dismiss(modal.key, 'backdrop click');
          }
        };
      }
    };
  }])

  .directive('modalTransclude', function () {
    return {
      link: function($scope, $element, $attrs, controller, $transclude) {
        $transclude($scope.$parent, function(clone) {
          $element.empty();
          $element.append(clone);
        });
      }
    };
  })

  .factory('$modalStack', ['$transition', '$timeout', '$document', '$compile', '$rootScope', '$$stackedMap',
    function ($transition, $timeout, $document, $compile, $rootScope, $$stackedMap) {

      var OPENED_MODAL_CLASS = 'modal-open';

      var backdropDomEl, backdropScope;
      var openedWindows = $$stackedMap.createNew();
      var $modalStack = {};

      function backdropIndex() {
        var topBackdropIndex = -1;
        var opened = openedWindows.keys();
        for (var i = 0; i < opened.length; i++) {
          if (openedWindows.get(opened[i]).value.backdrop) {
            topBackdropIndex = i;
          }
        }
        return topBackdropIndex;
      }

      $rootScope.$watch(backdropIndex, function(newBackdropIndex){
        if (backdropScope) {
          backdropScope.index = newBackdropIndex;
        }
      });

      function removeModalWindow(modalInstance) {

        var body = $document.find('body').eq(0);
        var modalWindow = openedWindows.get(modalInstance).value;

        //clean up the stack
        openedWindows.remove(modalInstance);

        //remove window DOM element
        removeAfterAnimate(modalWindow.modalDomEl, modalWindow.modalScope, 300, function() {
          modalWindow.modalScope.$destroy();
          body.toggleClass(OPENED_MODAL_CLASS, openedWindows.length() > 0);
          checkRemoveBackdrop();
        });
      }

      function checkRemoveBackdrop() {
          //remove backdrop if no longer needed
          if (backdropDomEl && backdropIndex() == -1) {
            var backdropScopeRef = backdropScope;
            removeAfterAnimate(backdropDomEl, backdropScope, 150, function () {
              backdropScopeRef.$destroy();
              backdropScopeRef = null;
            });
            backdropDomEl = undefined;
            backdropScope = undefined;
          }
      }

      function removeAfterAnimate(domEl, scope, emulateTime, done) {
        // Closing animation
        scope.animate = false;

        var transitionEndEventName = $transition.transitionEndEventName;
        if (transitionEndEventName) {
          // transition out
          var timeout = $timeout(afterAnimating, emulateTime);

          domEl.bind(transitionEndEventName, function () {
            $timeout.cancel(timeout);
            afterAnimating();
            scope.$apply();
          });
        } else {
          // Ensure this call is async
          $timeout(afterAnimating);
        }

        function afterAnimating() {
          if (afterAnimating.done) {
            return;
          }
          afterAnimating.done = true;

          domEl.remove();
          if (done) {
            done();
          }
        }
      }

      $document.bind('keydown', function (evt) {
        var modal;

        if (evt.which === 27) {
          modal = openedWindows.top();
          if (modal && modal.value.keyboard) {
            evt.preventDefault();
            $rootScope.$apply(function () {
              $modalStack.dismiss(modal.key, 'escape key press');
            });
          }
        }
      });

      $modalStack.open = function (modalInstance, modal) {

        openedWindows.add(modalInstance, {
          deferred: modal.deferred,
          modalScope: modal.scope,
          backdrop: modal.backdrop,
          keyboard: modal.keyboard
        });

        var body = $document.find('body').eq(0),
            currBackdropIndex = backdropIndex();

        if (currBackdropIndex >= 0 && !backdropDomEl) {
          backdropScope = $rootScope.$new(true);
          backdropScope.index = currBackdropIndex;
          var angularBackgroundDomEl = angular.element('<div modal-backdrop></div>');
          angularBackgroundDomEl.attr('backdrop-class', modal.backdropClass);
          backdropDomEl = $compile(angularBackgroundDomEl)(backdropScope);
          body.append(backdropDomEl);
        }

        var angularDomEl = angular.element('<div modal-window></div>');
        angularDomEl.attr({
          'template-url': modal.windowTemplateUrl,
          'window-class': modal.windowClass,
          'size': modal.size,
          'index': openedWindows.length() - 1,
          'animate': 'animate'
        }).html(modal.content);

        var modalDomEl = $compile(angularDomEl)(modal.scope);
        openedWindows.top().value.modalDomEl = modalDomEl;
        body.append(modalDomEl);
        body.addClass(OPENED_MODAL_CLASS);
      };

      $modalStack.close = function (modalInstance, result) {
        var modalWindow = openedWindows.get(modalInstance);
        if (modalWindow) {
          modalWindow.value.deferred.resolve(result);
          removeModalWindow(modalInstance);
        }
      };

      $modalStack.dismiss = function (modalInstance, reason) {
        var modalWindow = openedWindows.get(modalInstance);
        if (modalWindow) {
          modalWindow.value.deferred.reject(reason);
          removeModalWindow(modalInstance);
        }
      };

      $modalStack.dismissAll = function (reason) {
        var topModal = this.getTop();
        while (topModal) {
          this.dismiss(topModal.key, reason);
          topModal = this.getTop();
        }
      };

      $modalStack.getTop = function () {
        return openedWindows.top();
      };

      return $modalStack;
    }])

  .provider('$modal', function () {

    var $modalProvider = {
      options: {
        backdrop: true, //can be also false or 'static'
        keyboard: true
      },
      $get: ['$injector', '$rootScope', '$q', '$http', '$templateCache', '$controller', '$modalStack',
        function ($injector, $rootScope, $q, $http, $templateCache, $controller, $modalStack) {

          var $modal = {};

          function getTemplatePromise(options) {
            return options.template ? $q.when(options.template) :
              $http.get(angular.isFunction(options.templateUrl) ? (options.templateUrl)() : options.templateUrl,
                {cache: $templateCache}).then(function (result) {
                  return result.data;
              });
          }

          function getResolvePromises(resolves) {
            var promisesArr = [];
            angular.forEach(resolves, function (value) {
              if (angular.isFunction(value) || angular.isArray(value)) {
                promisesArr.push($q.when($injector.invoke(value)));
              }
            });
            return promisesArr;
          }

          $modal.open = function (modalOptions) {

            var modalResultDeferred = $q.defer();
            var modalOpenedDeferred = $q.defer();

            //prepare an instance of a modal to be injected into controllers and returned to a caller
            var modalInstance = {
              result: modalResultDeferred.promise,
              opened: modalOpenedDeferred.promise,
              close: function (result) {
                $modalStack.close(modalInstance, result);
              },
              dismiss: function (reason) {
                $modalStack.dismiss(modalInstance, reason);
              }
            };

            //merge and clean up options
            modalOptions = angular.extend({}, $modalProvider.options, modalOptions);
            modalOptions.resolve = modalOptions.resolve || {};

            //verify options
            if (!modalOptions.template && !modalOptions.templateUrl) {
              throw new Error('One of template or templateUrl options is required.');
            }

            var templateAndResolvePromise =
              $q.all([getTemplatePromise(modalOptions)].concat(getResolvePromises(modalOptions.resolve)));


            templateAndResolvePromise.then(function resolveSuccess(tplAndVars) {

              var modalScope = (modalOptions.scope || $rootScope).$new();
              modalScope.$close = modalInstance.close;
              modalScope.$dismiss = modalInstance.dismiss;

              var ctrlInstance, ctrlLocals = {};
              var resolveIter = 1;

              //controllers
              if (modalOptions.controller) {
                ctrlLocals.$scope = modalScope;
                ctrlLocals.$modalInstance = modalInstance;
                angular.forEach(modalOptions.resolve, function (value, key) {
                  ctrlLocals[key] = tplAndVars[resolveIter++];
                });

                ctrlInstance = $controller(modalOptions.controller, ctrlLocals);
                if (modalOptions.controllerAs) {
                  modalScope[modalOptions.controllerAs] = ctrlInstance;
                }
              }

              $modalStack.open(modalInstance, {
                scope: modalScope,
                deferred: modalResultDeferred,
                content: tplAndVars[0],
                backdrop: modalOptions.backdrop,
                keyboard: modalOptions.keyboard,
                backdropClass: modalOptions.backdropClass,
                windowClass: modalOptions.windowClass,
                windowTemplateUrl: modalOptions.windowTemplateUrl,
                size: modalOptions.size
              });

            }, function resolveError(reason) {
              modalResultDeferred.reject(reason);
            });

            templateAndResolvePromise.then(function () {
              modalOpenedDeferred.resolve(true);
            }, function () {
              modalOpenedDeferred.reject(false);
            });

            return modalInstance;
          };

          return $modal;
        }]
    };

    return $modalProvider;
  });

angular.module("template/typeahead/typeahead-match.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/typeahead/typeahead-match.html",
    "<a tabindex=\"-1\" bind-html-unsafe=\"match.label | typeaheadHighlight:query\"></a>");
}]);

angular.module("template/typeahead/typeahead-popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/typeahead/typeahead-popup.html",
    "<ul class=\"dropdown-menu\" ng-show=\"isOpen()\" ng-style=\"{top: position.top+'px', left: position.left+'px'}\" style=\"display: block;\" role=\"listbox\" aria-hidden=\"{{!isOpen()}}\">\n" +
    "    <li ng-repeat=\"match in matches track by $index\" ng-class=\"{active: isActive($index) }\" ng-mouseenter=\"selectActive($index)\" ng-click=\"selectMatch($index)\" role=\"option\" id=\"{{match.id}}\">\n" +
    "        <div typeahead-match index=\"$index\" match=\"match\" query=\"query\" template-url=\"templateUrl\"></div>\n" +
    "    </li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("template/modal/backdrop.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/modal/backdrop.html",
    "<div class=\"modal-backdrop fade {{ backdropClass }}\"\n" +
    "     ng-class=\"{in: animate}\"\n" +
    "     ng-style=\"{'z-index': 1040 + (index && 1 || 0) + index*10}\"\n" +
    "></div>\n" +
    "");
}]);

angular.module("template/modal/window.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/modal/window.html",
    "<div tabindex=\"-1\" role=\"dialog\" class=\"modal fade\" ng-class=\"{in: animate}\" ng-style=\"{'z-index': 1050 + index*10, display: 'block'}\" ng-click=\"close($event)\">\n" +
    "    <div class=\"modal-dialog\" ng-class=\"{'modal-sm': size == 'sm', 'modal-lg': size == 'lg'}\"><div class=\"modal-content\" modal-transclude></div></div>\n" +
    "</div>");
}]);

/*
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * Version: 0.12.0 - 2014-11-16
 * License: MIT
 */
angular.module("ui.bootstrap",["ui.bootstrap.tpls","ui.bootstrap.collapse","ui.bootstrap.transition","ui.bootstrap.dropdown","ui.bootstrap.typeahead","ui.bootstrap.position","ui.bootstrap.bindHtml","ui.bootstrap.modal"]),angular.module("ui.bootstrap.tpls",["template/typeahead/typeahead-match.html","template/typeahead/typeahead-popup.html","template/modal/backdrop.html","template/modal/window.html"]),angular.module("ui.bootstrap.collapse",["ui.bootstrap.transition"]).directive("collapse",["$transition",function(e){return{link:function(t,n,o){function a(t){function o(){s===a&&(s=void 0)}var a=e(n,t);return s&&s.cancel(),s=a,a.then(o,o),a}function i(){d?(d=!1,r()):(n.removeClass("collapse").addClass("collapsing"),a({height:n[0].scrollHeight+"px"}).then(r))}function r(){n.removeClass("collapsing"),n.addClass("collapse in"),n.css({height:"auto"})}function l(){if(d)d=!1,c(),n.css({height:0});else{n.css({height:n[0].scrollHeight+"px"});{n[0].offsetWidth}n.removeClass("collapse in").addClass("collapsing"),a({height:0}).then(c)}}function c(){n.removeClass("collapsing"),n.addClass("collapse")}var s,d=!0;t.$watch(o.collapse,function(e){e?l():i()})}}}]),angular.module("ui.bootstrap.transition",[]).factory("$transition",["$q","$timeout","$rootScope",function(e,t,n){function o(e){for(var t in e)if(void 0!==i.style[t])return e[t]}var a=function(o,i,r){r=r||{};var l=e.defer(),c=a[r.animation?"animationEndEventName":"transitionEndEventName"],s=function(){n.$apply(function(){o.unbind(c,s),l.resolve(o)})};return c&&o.bind(c,s),t(function(){angular.isString(i)?o.addClass(i):angular.isFunction(i)?i(o):angular.isObject(i)&&o.css(i),c||l.resolve(o)}),l.promise.cancel=function(){c&&o.unbind(c,s),l.reject("Transition cancelled")},l.promise},i=document.createElement("trans"),r={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"},l={WebkitTransition:"webkitAnimationEnd",MozTransition:"animationend",OTransition:"oAnimationEnd",transition:"animationend"};return a.transitionEndEventName=o(r),a.animationEndEventName=o(l),a}]),angular.module("ui.bootstrap.dropdown",[]).constant("dropdownConfig",{openClass:"open"}).service("dropdownService",["$document",function(e){var t=null;this.open=function(a){t||(e.bind("click",n),e.bind("keydown",o)),t&&t!==a&&(t.isOpen=!1),t=a},this.close=function(a){t===a&&(t=null,e.unbind("click",n),e.unbind("keydown",o))};var n=function(e){if(t){var n=t.getToggleElement();e&&n&&n[0].contains(e.target)||t.$apply(function(){t.isOpen=!1})}},o=function(e){27===e.which&&(t.focusToggleElement(),n())}}]).controller("DropdownController",["$scope","$attrs","$parse","dropdownConfig","dropdownService","$animate",function(e,t,n,o,a,i){var r,l=this,c=e.$new(),s=o.openClass,d=angular.noop,p=t.onToggle?n(t.onToggle):angular.noop;this.init=function(o){l.$element=o,t.isOpen&&(r=n(t.isOpen),d=r.assign,e.$watch(r,function(e){c.isOpen=!!e}))},this.toggle=function(e){return c.isOpen=arguments.length?!!e:!c.isOpen},this.isOpen=function(){return c.isOpen},c.getToggleElement=function(){return l.toggleElement},c.focusToggleElement=function(){l.toggleElement&&l.toggleElement[0].focus()},c.$watch("isOpen",function(t,n){i[t?"addClass":"removeClass"](l.$element,s),t?(c.focusToggleElement(),a.open(c)):a.close(c),d(e,t),angular.isDefined(t)&&t!==n&&p(e,{open:!!t})}),e.$on("$locationChangeSuccess",function(){c.isOpen=!1}),e.$on("$destroy",function(){c.$destroy()})}]).directive("dropdown",function(){return{controller:"DropdownController",link:function(e,t,n,o){o.init(t)}}}).directive("dropdownToggle",function(){return{require:"?^dropdown",link:function(e,t,n,o){if(o){o.toggleElement=t;var a=function(a){a.preventDefault(),t.hasClass("disabled")||n.disabled||e.$apply(function(){o.toggle()})};t.bind("click",a),t.attr({"aria-haspopup":!0,"aria-expanded":!1}),e.$watch(o.isOpen,function(e){t.attr("aria-expanded",!!e)}),e.$on("$destroy",function(){t.unbind("click",a)})}}}}),angular.module("ui.bootstrap.typeahead",["ui.bootstrap.position","ui.bootstrap.bindHtml"]).factory("typeaheadParser",["$parse",function(e){var t=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;return{parse:function(n){var o=n.match(t);if(!o)throw new Error('Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_" but got "'+n+'".');return{itemName:o[3],source:e(o[4]),viewMapper:e(o[2]||o[1]),modelMapper:e(o[1])}}}}]).directive("typeahead",["$compile","$parse","$q","$timeout","$document","$position","typeaheadParser",function(e,t,n,o,a,i,r){var l=[9,13,27,38,40];return{require:"ngModel",link:function(c,s,d,p){var u,f=c.$eval(d.typeaheadMinLength)||1,m=c.$eval(d.typeaheadWaitMs)||0,h=c.$eval(d.typeaheadEditable)!==!1,v=t(d.typeaheadLoading).assign||angular.noop,g=t(d.typeaheadOnSelect),$=d.typeaheadInputFormatter?t(d.typeaheadInputFormatter):void 0,y=d.typeaheadAppendToBody?c.$eval(d.typeaheadAppendToBody):!1,b=c.$eval(d.typeaheadFocusFirst)!==!1,w=t(d.ngModel).assign,k=r.parse(d.typeahead),C=c.$new();c.$on("$destroy",function(){C.$destroy()});var E="typeahead-"+C.$id+"-"+Math.floor(1e4*Math.random());s.attr({"aria-autocomplete":"list","aria-expanded":!1,"aria-owns":E});var x=angular.element("<div typeahead-popup></div>");x.attr({id:E,matches:"matches",active:"activeIdx",select:"select(activeIdx)",query:"query",position:"position"}),angular.isDefined(d.typeaheadTemplateUrl)&&x.attr("template-url",d.typeaheadTemplateUrl);var T=function(){C.matches=[],C.activeIdx=-1,s.attr("aria-expanded",!1)},S=function(e){return E+"-option-"+e};C.$watch("activeIdx",function(e){0>e?s.removeAttr("aria-activedescendant"):s.attr("aria-activedescendant",S(e))});var O=function(e){var t={$viewValue:e};v(c,!0),n.when(k.source(c,t)).then(function(n){var o=e===p.$viewValue;if(o&&u)if(n.length>0){C.activeIdx=b?0:-1,C.matches.length=0;for(var a=0;a<n.length;a++)t[k.itemName]=n[a],C.matches.push({id:S(a),label:k.viewMapper(C,t),model:n[a]});C.query=e,C.position=y?i.offset(s):i.position(s),C.position.top=C.position.top+s.prop("offsetHeight"),s.attr("aria-expanded",!0)}else T();o&&v(c,!1)},function(){T(),v(c,!1)})};T(),C.query=void 0;var U,M=function(e){U=o(function(){O(e)},m)},A=function(){U&&o.cancel(U)};p.$parsers.unshift(function(e){return u=!0,e&&e.length>=f?m>0?(A(),M(e)):O(e):(v(c,!1),A(),T()),h?e:e?void p.$setValidity("editable",!1):(p.$setValidity("editable",!0),e)}),p.$formatters.push(function(e){var t,n,o={};return $?(o.$model=e,$(c,o)):(o[k.itemName]=e,t=k.viewMapper(c,o),o[k.itemName]=void 0,n=k.viewMapper(c,o),t!==n?t:e)}),C.select=function(e){var t,n,a={};a[k.itemName]=n=C.matches[e].model,t=k.modelMapper(c,a),w(c,t),p.$setValidity("editable",!0),g(c,{$item:n,$model:t,$label:k.viewMapper(c,a)}),T(),o(function(){s[0].focus()},0,!1)},s.bind("keydown",function(e){0!==C.matches.length&&-1!==l.indexOf(e.which)&&(-1!=C.activeIdx||13!==e.which&&9!==e.which)&&(e.preventDefault(),40===e.which?(C.activeIdx=(C.activeIdx+1)%C.matches.length,C.$digest()):38===e.which?(C.activeIdx=(C.activeIdx>0?C.activeIdx:C.matches.length)-1,C.$digest()):13===e.which||9===e.which?C.$apply(function(){C.select(C.activeIdx)}):27===e.which&&(e.stopPropagation(),T(),C.$digest()))}),s.bind("blur",function(){u=!1});var q=function(e){s[0]!==e.target&&(T(),C.$digest())};a.bind("click",q),c.$on("$destroy",function(){a.unbind("click",q),y&&I.remove()});var I=e(x)(C);y?a.find("body").append(I):s.after(I)}}}]).directive("typeaheadPopup",function(){return{restrict:"EA",scope:{matches:"=",query:"=",active:"=",position:"=",select:"&"},replace:!0,templateUrl:"template/typeahead/typeahead-popup.html",link:function(e,t,n){e.templateUrl=n.templateUrl,e.isOpen=function(){return e.matches.length>0},e.isActive=function(t){return e.active==t},e.selectActive=function(t){e.active=t},e.selectMatch=function(t){e.select({activeIdx:t})}}}}).directive("typeaheadMatch",["$http","$templateCache","$compile","$parse",function(e,t,n,o){return{restrict:"EA",scope:{index:"=",match:"=",query:"="},link:function(a,i,r){var l=o(r.templateUrl)(a.$parent)||"template/typeahead/typeahead-match.html";e.get(l,{cache:t}).success(function(e){i.replaceWith(n(e.trim())(a))})}}}]).filter("typeaheadHighlight",function(){function e(e){return e.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")}return function(t,n){return n?(""+t).replace(new RegExp(e(n),"gi"),"<strong>$&</strong>"):t}}),angular.module("ui.bootstrap.position",[]).factory("$position",["$document","$window",function(e,t){function n(e,n){return e.currentStyle?e.currentStyle[n]:t.getComputedStyle?t.getComputedStyle(e)[n]:e.style[n]}function o(e){return"static"===(n(e,"position")||"static")}var a=function(t){for(var n=e[0],a=t.offsetParent||n;a&&a!==n&&o(a);)a=a.offsetParent;return a||n};return{position:function(t){var n=this.offset(t),o={top:0,left:0},i=a(t[0]);i!=e[0]&&(o=this.offset(angular.element(i)),o.top+=i.clientTop-i.scrollTop,o.left+=i.clientLeft-i.scrollLeft);var r=t[0].getBoundingClientRect();return{width:r.width||t.prop("offsetWidth"),height:r.height||t.prop("offsetHeight"),top:n.top-o.top,left:n.left-o.left}},offset:function(n){var o=n[0].getBoundingClientRect();return{width:o.width||n.prop("offsetWidth"),height:o.height||n.prop("offsetHeight"),top:o.top+(t.pageYOffset||e[0].documentElement.scrollTop),left:o.left+(t.pageXOffset||e[0].documentElement.scrollLeft)}},positionElements:function(e,t,n,o){var a,i,r,l,c=n.split("-"),s=c[0],d=c[1]||"center";a=o?this.offset(e):this.position(e),i=t.prop("offsetWidth"),r=t.prop("offsetHeight");var p={center:function(){return a.left+a.width/2-i/2},left:function(){return a.left},right:function(){return a.left+a.width}},u={center:function(){return a.top+a.height/2-r/2},top:function(){return a.top},bottom:function(){return a.top+a.height}};switch(s){case"right":l={top:u[d](),left:p[s]()};break;case"left":l={top:u[d](),left:a.left-i};break;case"bottom":l={top:u[s](),left:p[d]()};break;default:l={top:a.top-r,left:p[d]()}}return l}}}]),angular.module("ui.bootstrap.bindHtml",[]).directive("bindHtmlUnsafe",function(){return function(e,t,n){t.addClass("ng-binding").data("$binding",n.bindHtmlUnsafe),e.$watch(n.bindHtmlUnsafe,function(e){t.html(e||"")})}}),angular.module("ui.bootstrap.modal",["ui.bootstrap.transition"]).factory("$$stackedMap",function(){return{createNew:function(){var e=[];return{add:function(t,n){e.push({key:t,value:n})},get:function(t){for(var n=0;n<e.length;n++)if(t==e[n].key)return e[n]},keys:function(){for(var t=[],n=0;n<e.length;n++)t.push(e[n].key);return t},top:function(){return e[e.length-1]},remove:function(t){for(var n=-1,o=0;o<e.length;o++)if(t==e[o].key){n=o;break}return e.splice(n,1)[0]},removeTop:function(){return e.splice(e.length-1,1)[0]},length:function(){return e.length}}}}}).directive("modalBackdrop",["$timeout",function(e){return{restrict:"EA",replace:!0,templateUrl:"template/modal/backdrop.html",link:function(t,n,o){t.backdropClass=o.backdropClass||"",t.animate=!1,e(function(){t.animate=!0})}}}]).directive("modalWindow",["$modalStack","$timeout",function(e,t){return{restrict:"EA",scope:{index:"@",animate:"="},replace:!0,transclude:!0,templateUrl:function(e,t){return t.templateUrl||"template/modal/window.html"},link:function(n,o,a){o.addClass(a.windowClass||""),n.size=a.size,t(function(){n.animate=!0,o[0].querySelectorAll("[autofocus]").length||o[0].focus()}),n.close=function(t){var n=e.getTop();n&&n.value.backdrop&&"static"!=n.value.backdrop&&t.target===t.currentTarget&&(t.preventDefault(),t.stopPropagation(),e.dismiss(n.key,"backdrop click"))}}}}]).directive("modalTransclude",function(){return{link:function(e,t,n,o,a){a(e.$parent,function(e){t.empty(),t.append(e)})}}}).factory("$modalStack",["$transition","$timeout","$document","$compile","$rootScope","$$stackedMap",function(e,t,n,o,a,i){function r(){for(var e=-1,t=f.keys(),n=0;n<t.length;n++)f.get(t[n]).value.backdrop&&(e=n);return e}function l(e){var t=n.find("body").eq(0),o=f.get(e).value;f.remove(e),s(o.modalDomEl,o.modalScope,300,function(){o.modalScope.$destroy(),t.toggleClass(u,f.length()>0),c()})}function c(){if(d&&-1==r()){var e=p;s(d,p,150,function(){e.$destroy(),e=null}),d=void 0,p=void 0}}function s(n,o,a,i){function r(){r.done||(r.done=!0,n.remove(),i&&i())}o.animate=!1;var l=e.transitionEndEventName;if(l){var c=t(r,a);n.bind(l,function(){t.cancel(c),r(),o.$apply()})}else t(r)}var d,p,u="modal-open",f=i.createNew(),m={};return a.$watch(r,function(e){p&&(p.index=e)}),n.bind("keydown",function(e){var t;27===e.which&&(t=f.top(),t&&t.value.keyboard&&(e.preventDefault(),a.$apply(function(){m.dismiss(t.key,"escape key press")})))}),m.open=function(e,t){f.add(e,{deferred:t.deferred,modalScope:t.scope,backdrop:t.backdrop,keyboard:t.keyboard});var i=n.find("body").eq(0),l=r();if(l>=0&&!d){p=a.$new(!0),p.index=l;var c=angular.element("<div modal-backdrop></div>");c.attr("backdrop-class",t.backdropClass),d=o(c)(p),i.append(d)}var s=angular.element("<div modal-window></div>");s.attr({"template-url":t.windowTemplateUrl,"window-class":t.windowClass,size:t.size,index:f.length()-1,animate:"animate"}).html(t.content);var m=o(s)(t.scope);f.top().value.modalDomEl=m,i.append(m),i.addClass(u)},m.close=function(e,t){var n=f.get(e);n&&(n.value.deferred.resolve(t),l(e))},m.dismiss=function(e,t){var n=f.get(e);n&&(n.value.deferred.reject(t),l(e))},m.dismissAll=function(e){for(var t=this.getTop();t;)this.dismiss(t.key,e),t=this.getTop()},m.getTop=function(){return f.top()},m}]).provider("$modal",function(){var e={options:{backdrop:!0,keyboard:!0},$get:["$injector","$rootScope","$q","$http","$templateCache","$controller","$modalStack",function(t,n,o,a,i,r,l){function c(e){return e.template?o.when(e.template):a.get(angular.isFunction(e.templateUrl)?e.templateUrl():e.templateUrl,{cache:i}).then(function(e){return e.data})}function s(e){var n=[];return angular.forEach(e,function(e){(angular.isFunction(e)||angular.isArray(e))&&n.push(o.when(t.invoke(e)))}),n}var d={};return d.open=function(t){var a=o.defer(),i=o.defer(),d={result:a.promise,opened:i.promise,close:function(e){l.close(d,e)},dismiss:function(e){l.dismiss(d,e)}};if(t=angular.extend({},e.options,t),t.resolve=t.resolve||{},!t.template&&!t.templateUrl)throw new Error("One of template or templateUrl options is required.");var p=o.all([c(t)].concat(s(t.resolve)));return p.then(function(e){var o=(t.scope||n).$new();o.$close=d.close,o.$dismiss=d.dismiss;var i,c={},s=1;t.controller&&(c.$scope=o,c.$modalInstance=d,angular.forEach(t.resolve,function(t,n){c[n]=e[s++]}),i=r(t.controller,c),t.controllerAs&&(o[t.controllerAs]=i)),l.open(d,{scope:o,deferred:a,content:e[0],backdrop:t.backdrop,keyboard:t.keyboard,backdropClass:t.backdropClass,windowClass:t.windowClass,windowTemplateUrl:t.windowTemplateUrl,size:t.size})},function(e){a.reject(e)}),p.then(function(){i.resolve(!0)},function(){i.reject(!1)}),d},d}]};return e}),angular.module("template/typeahead/typeahead-match.html",[]).run(["$templateCache",function(e){e.put("template/typeahead/typeahead-match.html",'<a tabindex="-1" bind-html-unsafe="match.label | typeaheadHighlight:query"></a>')}]),angular.module("template/typeahead/typeahead-popup.html",[]).run(["$templateCache",function(e){e.put("template/typeahead/typeahead-popup.html",'<ul class="dropdown-menu" ng-show="isOpen()" ng-style="{top: position.top+\'px\', left: position.left+\'px\'}" style="display: block;" role="listbox" aria-hidden="{{!isOpen()}}">\n    <li ng-repeat="match in matches track by $index" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)" ng-click="selectMatch($index)" role="option" id="{{match.id}}">\n        <div typeahead-match index="$index" match="match" query="query" template-url="templateUrl"></div>\n    </li>\n</ul>\n')}]),angular.module("template/modal/backdrop.html",[]).run(["$templateCache",function(e){e.put("template/modal/backdrop.html",'<div class="modal-backdrop fade {{ backdropClass }}"\n     ng-class="{in: animate}"\n     ng-style="{\'z-index\': 1040 + (index && 1 || 0) + index*10}"\n></div>\n')}]),angular.module("template/modal/window.html",[]).run(["$templateCache",function(e){e.put("template/modal/window.html",'<div tabindex="-1" role="dialog" class="modal fade" ng-class="{in: animate}" ng-style="{\'z-index\': 1050 + index*10, display: \'block\'}" ng-click="close($event)">\n    <div class="modal-dialog" ng-class="{\'modal-sm\': size == \'sm\', \'modal-lg\': size == \'lg\'}"><div class="modal-content" modal-transclude></div></div>\n</div>')}]);