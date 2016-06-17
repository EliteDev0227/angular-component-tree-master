"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var angular2_tree_component_1 = require('angular2-tree-component');
var CUSTOM_TEMPLATE_STRING = '{{ node.data.name }}';
var AppComponent = (function () {
    function AppComponent() {
        this.nodes = [
            {
                id: uuid(),
                name: 'root1',
                subTitle: 'the root',
                children: [
                    {
                        id: uuid(),
                        name: 'child1',
                        subTitle: 'a good child'
                    }, {
                        id: uuid(),
                        name: 'child2',
                        subTitle: 'a bad child',
                    }
                ]
            },
            {
                id: uuid(),
                name: 'root2',
                subTitle: 'the second root',
                children: [
                    {
                        id: uuid(),
                        name: 'child2.1',
                        subTitle: 'new and improved'
                    }, {
                        id: uuid(),
                        name: 'child2.2',
                        subTitle: 'new and improved2',
                        children: [
                            {
                                id: uuid(),
                                name: 'subsub',
                                subTitle: 'subsub'
                            }
                        ]
                    }
                ]
            },
            {
                id: uuid(),
                name: 'asyncroot',
                hasChildren: true
            }
        ];
        this.asyncChildren = [
            {
                name: 'child2.1',
                subTitle: 'new and improved'
            }, {
                name: 'child2.2',
                subTitle: 'new and improved2'
            }
        ];
        this.customTemplateStringOptions = {
            treeNodeTemplate: CUSTOM_TEMPLATE_STRING,
            // treeNodeTemplate: MyTreeNodeTemplate,
            // displayField: 'subTitle',
            loadingComponent: MyTreeLoadingTemplate,
            getChildren: this.getChildren.bind(this)
        };
        this.onEvent = function ($event) { return console.log($event); };
    }
    AppComponent.prototype.getChildren = function (node) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            setTimeout(function () { return resolve(_this.asyncChildren.map(function (c) {
                return Object.assign(c, {
                    hasChildren: node.level < 5,
                    id: uuid()
                });
            })); }, 1000);
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            directives: [angular2_tree_component_1.TreeComponent],
            selector: 'my-app',
            styles: [
                "button: {\n        line - height: 24px;\n        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);\n        border: none;\n        border-radius: 2px;\n        background: #A3D9F5;\n        cursor: pointer;\n        margin: 0 3px;\n      }"
            ],
            template: "<Tree\n    #tree\n    [nodes]=\"nodes\"\n    [focused]=\"true\"\n    [options]=\"customTemplateStringOptions\"\n    (onToggle)=\"onEvent($event)\"\n    (onActivate)=\"onEvent($event)\"\n    (onDeactivate)=\"onEvent($event)\"\n    (onActiveChanged)=\"onEvent($event)\"\n    (onFocus)=\"onEvent($event)\"\n    (onBlur)=\"onEvent($event)\"\n  ></Tree>\n  <br>\n  <p>Keys:</p>\n  down | up | left | right | space | enter\n  <p>API:</p>\n  <button (click)=\"tree.treeModel.focusNextNode()\">next node</button>\n  <button (click)=\"tree.treeModel.focusPreviousNode()\">previous node</button>\n  <button (click)=\"tree.treeModel.focusDrillDown()\">drill down</button>\n  <button (click)=\"tree.treeModel.focusDrillUp()\">drill up</button>\n  <p></p>\n  <button\n    [disabled]=\"!tree.treeModel.focusedNode\"\n    (click)=\"tree.treeModel.focusedNode.toggleActivated()\">\n    {{ tree.treeModel.focusedNode?.isActive ? 'deactivate' : 'activate' }}\n  </button>\n  <button\n    [disabled]=\"!tree.treeModel.focusedNode\"\n    (click)=\"tree.treeModel.focusedNode.toggle()\">\n    {{ tree.treeModel.focusedNode?.isExpanded ? 'collapse' : 'expand' }}\n  </button>\n  <button\n    [disabled]=\"!tree.treeModel.focusedNode\"\n    (click)=\"tree.treeModel.focusedNode.blur()\">\n    blur\n  </button>"
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
var MyTreeNodeTemplate = (function () {
    function MyTreeNodeTemplate() {
    }
    MyTreeNodeTemplate = __decorate([
        core_1.Component({
            template: CUSTOM_TEMPLATE_STRING
        }), 
        __metadata('design:paramtypes', [])
    ], MyTreeNodeTemplate);
    return MyTreeNodeTemplate;
}());
var MyTreeLoadingTemplate = (function () {
    function MyTreeLoadingTemplate() {
    }
    MyTreeLoadingTemplate = __decorate([
        core_1.Component({
            template: 'Loading, please hold....'
        }), 
        __metadata('design:paramtypes', [])
    ], MyTreeLoadingTemplate);
    return MyTreeLoadingTemplate;
}());
var id = 0;
function uuid() {
    id = id + 1;
    return id;
}
//# sourceMappingURL=app.component.js.map