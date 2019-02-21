(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/actions/actions.component.ts":
/*!**********************************************!*\
  !*** ./src/app/actions/actions.component.ts ***!
  \**********************************************/
/*! exports provided: ActionsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionsComponent", function() { return ActionsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var angular_tree_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular-tree-component */ "./node_modules/angular-tree-component/dist/angular-tree-component.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a;


var actionMapping = {
    mouse: {
        contextMenu: function (tree, node, $event) {
            $event.preventDefault();
            alert("context menu for " + node.data.name);
        },
        dblClick: function (tree, node, $event) {
            if (node.hasChildren) {
                angular_tree_component__WEBPACK_IMPORTED_MODULE_1__["TREE_ACTIONS"].TOGGLE_EXPANDED(tree, node, $event);
            }
        },
        click: function (tree, node, $event) {
            $event.shiftKey
                ? angular_tree_component__WEBPACK_IMPORTED_MODULE_1__["TREE_ACTIONS"].TOGGLE_ACTIVE_MULTI(tree, node, $event)
                : angular_tree_component__WEBPACK_IMPORTED_MODULE_1__["TREE_ACTIONS"].TOGGLE_ACTIVE(tree, node, $event);
        }
    },
    keys: (_a = {},
        _a[angular_tree_component__WEBPACK_IMPORTED_MODULE_1__["KEYS"].ENTER] = function (tree, node, $event) { return alert("This is " + node.data.name); },
        _a)
};
var ActionsComponent = /** @class */ (function () {
    function ActionsComponent() {
        this.nodes = [
            {
                name: 'root1',
                children: [
                    {
                        name: 'child1'
                    }, {
                        name: 'child2'
                    }
                ]
            },
            {
                name: 'root2',
                children: [
                    {
                        name: 'child2.1'
                    }, {
                        name: 'child2.2',
                        children: [
                            {
                                id: 1001,
                                name: 'subsub'
                            }
                        ]
                    }
                ]
            }
        ];
        this.options = {
            actionMapping: actionMapping
        };
    }
    ActionsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-actions',
            styles: [],
            template: "\n    <tree-root\n      #tree\n      [nodes]=\"nodes\"\n      [options]=\"options\"\n      [focused]=\"true\"\n    >\n    </tree-root>\n    <br>\n    <b>Custom Keys:</b><br>\n    enter - show alert<br>\n    <br>\n    <b>Custom Mouse Actions:</b><br>\n    shift+click - select multi<br>\n    double click - expand / collapse<br>\n    right-click - show alert\n  "
        })
    ], ActionsComponent);
    return ActionsComponent;
}());



/***/ }),

/***/ "./src/app/api/api.component.ts":
/*!**************************************!*\
  !*** ./src/app/api/api.component.ts ***!
  \**************************************/
/*! exports provided: ApiComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiComponent", function() { return ApiComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ApiComponent = /** @class */ (function () {
    function ApiComponent() {
        this.options = {};
        this.nodes = [
            {
                name: 'root1',
                children: [
                    {
                        name: 'child1'
                    }, {
                        name: 'child2'
                    }
                ]
            },
            {
                name: 'root2',
                children: [
                    {
                        name: 'child2.1'
                    }, {
                        name: 'child2.2',
                        children: [
                            {
                                id: 1001,
                                name: 'subsub'
                            }
                        ]
                    }
                ]
            }
        ];
    }
    ApiComponent.prototype.addNode = function (tree) {
        this.nodes[0].children.push({
            name: 'a new child'
        });
        tree.treeModel.update();
    };
    ApiComponent.prototype.activateSubSub = function (tree) {
        // tree.treeModel.getNodeBy((node) => node.data.name === 'subsub')
        tree.treeModel.getNodeById(1001)
            .setActiveAndVisible();
    };
    ApiComponent.prototype.activeNodes = function (treeModel) {
        console.log(treeModel.activeNodes);
    };
    ApiComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-api',
            styles: [],
            template: "\n  <tree-root\n    #tree\n    [nodes]=\"nodes\"\n    [options]=\"options\"\n    [focused]=\"true\"\n  >\n  </tree-root>\n  <p>API:</p>\n  <button (click)=\"tree.treeModel.focusNextNode()\">next node</button>\n  <button (click)=\"tree.treeModel.focusPreviousNode()\">previous node</button>\n  <button (click)=\"tree.treeModel.focusDrillDown()\">drill down</button>\n  <button (click)=\"tree.treeModel.focusDrillUp()\">drill up</button>\n  <button (click)=\"options.allowDrag = true\">allowDrag</button>\n  <p></p>\n  <button\n    [disabled]=\"!tree.treeModel.getFocusedNode()\"\n    (click)=\"tree.treeModel.getFocusedNode().toggleActivated()\">\n    {{ tree.treeModel.getFocusedNode()?.isActive ? 'deactivate' : 'activate' }}\n  </button>\n  <button\n    [disabled]=\"!tree.treeModel.getFocusedNode()\"\n    (click)=\"tree.treeModel.getFocusedNode().toggleExpanded()\">\n    {{ tree.treeModel.getFocusedNode()?.isExpanded ? 'collapse' : 'expand' }}\n  </button>\n  <button\n    [disabled]=\"!tree.treeModel.getFocusedNode()\"\n    (click)=\"tree.treeModel.getFocusedNode().blur()\">\n    blur\n  </button>\n  <button\n    (click)=\"addNode(tree)\">\n    Add Node\n  </button>\n  <button\n    (click)=\"activateSubSub(tree)\">\n    Activate inner node\n  </button>\n  <button\n    (click)=\"tree.treeModel.expandAll()\">\n    Expand All\n  </button>\n  <button\n    (click)=\"tree.treeModel.collapseAll()\">\n    Collapse All\n  </button>\n  <button\n    (click)=\"activeNodes(tree.treeModel)\">\n    getActiveNodes()\n  </button>\n  "
        })
    ], ApiComponent);
    return ApiComponent;
}());



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _basictree_basictree_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./basictree/basictree.component */ "./src/app/basictree/basictree.component.ts");
/* harmony import */ var _fulltree_fulltree_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fulltree/fulltree.component */ "./src/app/fulltree/fulltree.component.ts");
/* harmony import */ var _templates_templates_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./templates/templates.component */ "./src/app/templates/templates.component.ts");
/* harmony import */ var _fields_fields_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./fields/fields.component */ "./src/app/fields/fields.component.ts");
/* harmony import */ var _filter_filter_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./filter/filter.component */ "./src/app/filter/filter.component.ts");
/* harmony import */ var _empty_empty_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./empty/empty.component */ "./src/app/empty/empty.component.ts");
/* harmony import */ var _rtl_rtl_tree_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./rtl/rtl-tree.component */ "./src/app/rtl/rtl-tree.component.ts");
/* harmony import */ var _async_async_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./async/async.component */ "./src/app/async/async.component.ts");
/* harmony import */ var _save_restore_save_restore_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./save-restore/save-restore.component */ "./src/app/save-restore/save-restore.component.ts");
/* harmony import */ var _checkboxes_checkboxes_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./checkboxes/checkboxes.component */ "./src/app/checkboxes/checkboxes.component.ts");
/* harmony import */ var _drag_drag_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./drag/drag.component */ "./src/app/drag/drag.component.ts");
/* harmony import */ var _virtualscroll_virtualscroll_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./virtualscroll/virtualscroll.component */ "./src/app/virtualscroll/virtualscroll.component.ts");
/* harmony import */ var _api_api_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./api/api.component */ "./src/app/api/api.component.ts");
/* harmony import */ var _actions_actions_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./actions/actions.component */ "./src/app/actions/actions.component.ts");
/* harmony import */ var _scrollcontainer_scrollcontainer_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./scrollcontainer/scrollcontainer.component */ "./src/app/scrollcontainer/scrollcontainer.component.ts");
/* harmony import */ var _contextmenu_contextmenu_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./contextmenu/contextmenu.component */ "./src/app/contextmenu/contextmenu.component.ts");
/* harmony import */ var _dragover_styling_dragover_styling_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./dragover-styling/dragover-styling.component */ "./src/app/dragover-styling/dragover-styling.component.ts");
/* harmony import */ var _dragover_styling_dragover_styling_full_tree_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./dragover-styling/dragover-styling-full-tree.component */ "./src/app/dragover-styling/dragover-styling-full-tree.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















var routes = [
    {
        path: '',
        component: _fulltree_fulltree_component__WEBPACK_IMPORTED_MODULE_3__["FullTreeComponent"]
    },
    {
        path: 'basic',
        component: _basictree_basictree_component__WEBPACK_IMPORTED_MODULE_2__["BasicTreeComponent"]
    },
    {
        path: 'fields',
        component: _fields_fields_component__WEBPACK_IMPORTED_MODULE_5__["FieldsComponent"]
    },
    {
        path: 'templates',
        component: _templates_templates_component__WEBPACK_IMPORTED_MODULE_4__["TemplatesComponent"]
    },
    {
        path: 'filter',
        component: _filter_filter_component__WEBPACK_IMPORTED_MODULE_6__["FilterComponent"]
    },
    {
        path: 'empty',
        component: _empty_empty_component__WEBPACK_IMPORTED_MODULE_7__["EmptyComponent"]
    },
    {
        path: 'rtl',
        component: _rtl_rtl_tree_component__WEBPACK_IMPORTED_MODULE_8__["RtlTreeComponent"]
    },
    {
        path: 'async',
        component: _async_async_component__WEBPACK_IMPORTED_MODULE_9__["AsyncTreeComponent"]
    },
    {
        path: 'save-restore',
        component: _save_restore_save_restore_component__WEBPACK_IMPORTED_MODULE_10__["SaveRestoreComponent"]
    },
    {
        path: 'checkboxes',
        component: _checkboxes_checkboxes_component__WEBPACK_IMPORTED_MODULE_11__["CheckboxesComponent"]
    },
    {
        path: 'drag',
        component: _drag_drag_component__WEBPACK_IMPORTED_MODULE_12__["DragComponent"]
    },
    {
        path: 'dragover-styling',
        component: _dragover_styling_dragover_styling_component__WEBPACK_IMPORTED_MODULE_18__["DragOverStylingComponent"]
    },
    {
        path: 'dragover-styling-full-tree',
        component: _dragover_styling_dragover_styling_full_tree_component__WEBPACK_IMPORTED_MODULE_19__["DragOverStylingFullTreeComponent"]
    },
    {
        path: 'virtual',
        component: _virtualscroll_virtualscroll_component__WEBPACK_IMPORTED_MODULE_13__["VirtualscrollComponent"]
    },
    {
        path: 'api',
        component: _api_api_component__WEBPACK_IMPORTED_MODULE_14__["ApiComponent"]
    },
    {
        path: 'actions',
        component: _actions_actions_component__WEBPACK_IMPORTED_MODULE_15__["ActionsComponent"]
    },
    {
        path: 'scroll-container',
        component: _scrollcontainer_scrollcontainer_component__WEBPACK_IMPORTED_MODULE_16__["ScrollContainerComponent"]
    },
    {
        path: 'context-menu',
        component: _contextmenu_contextmenu_component__WEBPACK_IMPORTED_MODULE_17__["ContextmenuComponent"]
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes, { useHash: true })],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: "\n    <router-outlet></router-outlet>\n  "
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var angular_tree_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular-tree-component */ "./node_modules/angular-tree-component/dist/angular-tree-component.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _basictree_basictree_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./basictree/basictree.component */ "./src/app/basictree/basictree.component.ts");
/* harmony import */ var _fulltree_fulltree_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./fulltree/fulltree.component */ "./src/app/fulltree/fulltree.component.ts");
/* harmony import */ var _templates_templates_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./templates/templates.component */ "./src/app/templates/templates.component.ts");
/* harmony import */ var _fields_fields_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./fields/fields.component */ "./src/app/fields/fields.component.ts");
/* harmony import */ var _filter_filter_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./filter/filter.component */ "./src/app/filter/filter.component.ts");
/* harmony import */ var _empty_empty_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./empty/empty.component */ "./src/app/empty/empty.component.ts");
/* harmony import */ var _rtl_rtl_tree_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./rtl/rtl-tree.component */ "./src/app/rtl/rtl-tree.component.ts");
/* harmony import */ var _async_async_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./async/async.component */ "./src/app/async/async.component.ts");
/* harmony import */ var _save_restore_save_restore_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./save-restore/save-restore.component */ "./src/app/save-restore/save-restore.component.ts");
/* harmony import */ var _checkboxes_checkboxes_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./checkboxes/checkboxes.component */ "./src/app/checkboxes/checkboxes.component.ts");
/* harmony import */ var _drag_drag_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./drag/drag.component */ "./src/app/drag/drag.component.ts");
/* harmony import */ var _virtualscroll_virtualscroll_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./virtualscroll/virtualscroll.component */ "./src/app/virtualscroll/virtualscroll.component.ts");
/* harmony import */ var _api_api_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./api/api.component */ "./src/app/api/api.component.ts");
/* harmony import */ var _actions_actions_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./actions/actions.component */ "./src/app/actions/actions.component.ts");
/* harmony import */ var _scrollcontainer_scrollcontainer_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./scrollcontainer/scrollcontainer.component */ "./src/app/scrollcontainer/scrollcontainer.component.ts");
/* harmony import */ var _contextmenu_contextmenu_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./contextmenu/contextmenu.component */ "./src/app/contextmenu/contextmenu.component.ts");
/* harmony import */ var _dragover_styling_dragover_styling_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./dragover-styling/dragover-styling.component */ "./src/app/dragover-styling/dragover-styling.component.ts");
/* harmony import */ var _dragover_styling_dragover_styling_full_tree_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./dragover-styling/dragover-styling-full-tree.component */ "./src/app/dragover-styling/dragover-styling-full-tree.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"],
                _basictree_basictree_component__WEBPACK_IMPORTED_MODULE_7__["BasicTreeComponent"],
                _fulltree_fulltree_component__WEBPACK_IMPORTED_MODULE_8__["FullTreeComponent"],
                _templates_templates_component__WEBPACK_IMPORTED_MODULE_9__["TemplatesComponent"],
                _fields_fields_component__WEBPACK_IMPORTED_MODULE_10__["FieldsComponent"],
                _filter_filter_component__WEBPACK_IMPORTED_MODULE_11__["FilterComponent"],
                _empty_empty_component__WEBPACK_IMPORTED_MODULE_12__["EmptyComponent"],
                _rtl_rtl_tree_component__WEBPACK_IMPORTED_MODULE_13__["RtlTreeComponent"],
                _async_async_component__WEBPACK_IMPORTED_MODULE_14__["AsyncTreeComponent"],
                _save_restore_save_restore_component__WEBPACK_IMPORTED_MODULE_15__["SaveRestoreComponent"],
                _checkboxes_checkboxes_component__WEBPACK_IMPORTED_MODULE_16__["CheckboxesComponent"],
                _drag_drag_component__WEBPACK_IMPORTED_MODULE_17__["DragComponent"],
                _dragover_styling_dragover_styling_component__WEBPACK_IMPORTED_MODULE_23__["DragOverStylingComponent"],
                _dragover_styling_dragover_styling_full_tree_component__WEBPACK_IMPORTED_MODULE_24__["DragOverStylingFullTreeComponent"],
                _virtualscroll_virtualscroll_component__WEBPACK_IMPORTED_MODULE_18__["VirtualscrollComponent"],
                _api_api_component__WEBPACK_IMPORTED_MODULE_19__["ApiComponent"],
                _actions_actions_component__WEBPACK_IMPORTED_MODULE_20__["ActionsComponent"],
                _scrollcontainer_scrollcontainer_component__WEBPACK_IMPORTED_MODULE_21__["ScrollContainerComponent"],
                _contextmenu_contextmenu_component__WEBPACK_IMPORTED_MODULE_22__["ContextmenuComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
                angular_tree_component__WEBPACK_IMPORTED_MODULE_4__["TreeModule"].forRoot(),
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_5__["AppRoutingModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/async/async.component.ts":
/*!******************************************!*\
  !*** ./src/app/async/async.component.ts ***!
  \******************************************/
/*! exports provided: AsyncTreeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsyncTreeComponent", function() { return AsyncTreeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AsyncTreeComponent = /** @class */ (function () {
    function AsyncTreeComponent() {
        this.options = {
            getChildren: this.getChildren.bind(this),
            useCheckbox: true
        };
        this.nodes = [];
        this.asyncChildren = [
            {
                name: 'child1',
                hasChildren: true
            }, {
                name: 'child2'
            }
        ];
        this.nodes = [
            {
                name: 'root1',
                children: [
                    { name: 'child1' }
                ]
            },
            {
                name: 'root2',
                hasChildren: true
            },
            {
                name: 'root3'
            }
        ];
    }
    AsyncTreeComponent.prototype.getChildren = function (node) {
        var newNodes = this.asyncChildren.map(function (c) { return Object.assign({}, c); });
        return new Promise(function (resolve, reject) {
            setTimeout(function () { return resolve(newNodes); }, 1000);
        });
    };
    AsyncTreeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-async',
            template: "\n    <tree-root #tree [options]=\"options\" [nodes]=\"nodes\"></tree-root>\n ",
            styles: []
        }),
        __metadata("design:paramtypes", [])
    ], AsyncTreeComponent);
    return AsyncTreeComponent;
}());



/***/ }),

/***/ "./src/app/basictree/basictree.component.ts":
/*!**************************************************!*\
  !*** ./src/app/basictree/basictree.component.ts ***!
  \**************************************************/
/*! exports provided: BasicTreeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BasicTreeComponent", function() { return BasicTreeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var BasicTreeComponent = /** @class */ (function () {
    function BasicTreeComponent() {
        this.nodes = [
            {
                name: 'root1',
                children: [
                    { name: 'child1' },
                    { name: 'child2' }
                ]
            },
            {
                name: 'root2',
                children: [
                    { name: 'child2.1', children: [] },
                    { name: 'child2.2', children: [
                            { name: 'grandchild2.2.1' }
                        ] }
                ]
            },
            { name: 'root3' },
            { name: 'root4', children: [] },
            { name: 'root5', children: null }
        ];
    }
    BasicTreeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-basictree',
            template: "\n    <tree-root [focused]=\"true\" [nodes]=\"nodes\"></tree-root>\n    <br>\n    <p>Keys:</p>\n    down | up | left | right | space | enter\n  ",
            styles: []
        })
    ], BasicTreeComponent);
    return BasicTreeComponent;
}());



/***/ }),

/***/ "./src/app/checkboxes/checkboxes.component.ts":
/*!****************************************************!*\
  !*** ./src/app/checkboxes/checkboxes.component.ts ***!
  \****************************************************/
/*! exports provided: CheckboxesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckboxesComponent", function() { return CheckboxesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var CheckboxesComponent = /** @class */ (function () {
    function CheckboxesComponent() {
        this.nodes = [
            {
                name: 'root1',
            },
            {
                name: 'root2',
                children: [
                    { name: 'child1' },
                    { name: 'child2', children: [
                            { name: 'grandchild1' },
                            { name: 'grandchild2' }
                        ] }
                ]
            },
            {
                name: 'asyncroot',
                hasChildren: true
            }
        ];
        this.options = {
            useCheckbox: true,
            getChildren: this.getChildren.bind(this)
        };
        this.optionsDisabled = {
            useCheckbox: true,
            getChildren: this.getChildren.bind(this),
            useTriState: false
        };
    }
    CheckboxesComponent.prototype.getChildren = function (node) {
        var newNodes = [
            {
                name: 'child1'
            }, {
                name: 'child2'
            }
        ];
        return new Promise(function (resolve, reject) {
            setTimeout(function () { return resolve(newNodes); }, 1000);
        });
    };
    CheckboxesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-checkboxes',
            template: "\n    <h3>tri-state checkboxes</h3>\n    <tree-root\n      id=\"tree1\"\n      [nodes]=\"nodes\"\n      [options]=\"options\">\n    </tree-root>\n    <h3>The tree is using flexbox.<br>\n    Switch expander and checkbox with CSS 'order' attribute:</h3>\n    <tree-root\n      class=\"reverse\"\n      id=\"tree2\"\n      [nodes]=\"nodes\"\n      [options]=\"options\">\n    </tree-root>\n    <h3>Disable tri-state checkboxes</h3>\n    <tree-root\n      id=\"tree3\"\n      [nodes]=\"nodes\"\n      [options]=\"optionsDisabled\">\n    </tree-root>\n  ",
            styles: []
        })
    ], CheckboxesComponent);
    return CheckboxesComponent;
}());



/***/ }),

/***/ "./src/app/contextmenu/contextmenu.component.ts":
/*!******************************************************!*\
  !*** ./src/app/contextmenu/contextmenu.component.ts ***!
  \******************************************************/
/*! exports provided: ContextmenuComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextmenuComponent", function() { return ContextmenuComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var angular_tree_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular-tree-component */ "./node_modules/angular-tree-component/dist/angular-tree-component.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var ContextmenuComponent = /** @class */ (function () {
    function ContextmenuComponent() {
        var _this = this;
        this.contextMenu = null;
        this.sourceNode = null;
        this.editNode = null;
        this.doCut = false;
        this.nodes = [
            {
                name: 'root1',
                children: [
                    { name: 'child1' },
                    { name: 'child2' }
                ]
            },
            {
                name: 'root2',
                children: [
                    { name: 'child2.1', children: [] },
                    { name: 'child2.2', children: [
                            { name: 'grandchild2.2.1' }
                        ] }
                ]
            },
            { name: 'root3' },
            { name: 'root4', children: [] },
            { name: 'root5', children: null }
        ];
        this.options = {
            actionMapping: {
                mouse: {
                    contextMenu: function (treeModel, treeNode, e) {
                        e.preventDefault();
                        if (_this.contextMenu && treeNode === _this.contextMenu.node) {
                            return _this.closeMenu();
                        }
                        _this.contextMenu = {
                            node: treeNode,
                            x: e.pageX,
                            y: e.pageY
                        };
                    },
                    click: function (treeModel, treeNode, e) {
                        _this.closeMenu();
                        angular_tree_component__WEBPACK_IMPORTED_MODULE_1__["TREE_ACTIONS"].TOGGLE_ACTIVE(treeModel, treeNode, e);
                    }
                }
            }
        };
        this.closeMenu = function () {
            _this.contextMenu = null;
        };
        this.edit = function () {
            _this.editNode = _this.contextMenu.node;
            _this.closeMenu();
        };
        this.stopEdit = function () {
            _this.editNode = null;
        };
        this.copy = function () {
            _this.sourceNode = _this.contextMenu.node;
            _this.doCut = false;
            _this.closeMenu();
        };
        this.cut = function () {
            _this.sourceNode = _this.contextMenu.node;
            _this.doCut = true;
            _this.closeMenu();
        };
        this.paste = function () {
            if (!_this.canPaste()) {
                return;
            }
            _this.doCut
                ? _this.sourceNode.treeModel.moveNode(_this.sourceNode, { parent: _this.contextMenu.node, index: 0 })
                : _this.sourceNode.treeModel.copyNode(_this.sourceNode, { parent: _this.contextMenu.node, index: 0 });
            _this.sourceNode = null;
            _this.closeMenu();
        };
        this.canPaste = function () {
            if (!_this.sourceNode) {
                return false;
            }
            return _this.sourceNode.treeModel.canMoveNode(_this.sourceNode, { parent: _this.contextMenu.node, index: 0 });
        };
    }
    ContextmenuComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-contextmenu',
            template: "\n    <tree-root [focused]=\"true\" [options]=\"options\" [nodes]=\"nodes\">\n      <ng-template #treeNodeTemplate let-node=\"node\">\n        <span *ngIf=\"node === editNode\">\n          <input\n            autofocus\n            [(ngModel)]=\"node.data.name\"\n            (blur)=\"stopEdit()\"\n            (keyup.enter)=\"stopEdit()\"/>\n        </span>\n        <span *ngIf=\"node !== editNode\">{{ node.data.name }}</span>\n      </ng-template>\n    </tree-root>\n    <div class=\"menu\" *ngIf=\"contextMenu\" [style.left.px]=\"contextMenu.x\" [style.top.px]=\"contextMenu.y\">\n      <div>Menu for {{ contextMenu.node.data.name }}</div>\n      <hr>\n      <ul>\n        <li (click)=\"edit()\"><a>Edit</a></li>\n        <li (click)=\"copy()\"><a>Copy</a></li>\n        <li (click)=\"cut()\"><a>Cut</a></li>\n        <li (click)=\"paste()\"><a [style.opacity]=\"canPaste() && 1 || 0.3\">Paste</a></li>\n      </ul>\n    </div>\n    <br>\n    <p>Keys:</p>\n    down | up | left | right | space | enter\n  ",
            styles: [
                ".menu {\n      position: absolute;\n      background: rgba(255, 255, 255, 0.9);\n      padding: 7px;\n      border-radius: 5px;\n      box-shadow: 0 0 2px 2px rgba(0,0,0,0.2);\n    }",
                "ul {\n      list-style: none;\n      padding: 0;\n      margin: 0;\n    }",
                "li {\n      padding: 7px;\n      border-radius: 3px;\n      cursor: pointer;\n    }",
                "li:hover {\n      background-color: aliceblue;\n    }",
            ]
        })
    ], ContextmenuComponent);
    return ContextmenuComponent;
}());

function uuid() {
    return Math.floor(Math.random() * 10000000000000);
}


/***/ }),

/***/ "./src/app/drag/drag.component.ts":
/*!****************************************!*\
  !*** ./src/app/drag/drag.component.ts ***!
  \****************************************/
/*! exports provided: DragComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DragComponent", function() { return DragComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_1__);
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var DragComponent = /** @class */ (function () {
    function DragComponent() {
        this.state = {
            expandedNodeIds: {
                1: true,
                2: true
            },
            hiddenNodeIds: {},
            activeNodeIds: {}
        };
        this.options = {
            allowDrag: function (node) { return node.isLeaf; },
            getNodeClone: function (node) { return (__assign({}, node.data, { id: Object(uuid__WEBPACK_IMPORTED_MODULE_1__["v4"])(), name: "copy of " + node.data.name })); }
        };
        this.nodes = [
            {
                id: 1,
                name: 'root1',
                children: [
                    { name: 'child1' },
                    { name: 'child2' }
                ]
            },
            {
                name: 'root2',
                id: 2,
                children: [
                    { name: 'child2.1', children: [] },
                    { name: 'child2.2', children: [
                            { name: 'grandchild2.2.1' }
                        ] }
                ]
            },
            { name: 'root3' },
            { name: 'root4', children: [] },
            { name: 'root5', children: null }
        ];
    }
    DragComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-drag',
            template: "\n    <h4>Allowing to drag only leaf nodes; ctrl-drag to copy</h4>\n    <tree-root [state]=\"state\" [options]=\"options\" [focused]=\"true\" [nodes]=\"nodes\"></tree-root>\n  ",
            styles: []
        })
    ], DragComponent);
    return DragComponent;
}());



/***/ }),

/***/ "./src/app/dragover-styling/dragover-styling-full-tree.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/dragover-styling/dragover-styling-full-tree.component.ts ***!
  \**************************************************************************/
/*! exports provided: DragOverStylingFullTreeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DragOverStylingFullTreeComponent", function() { return DragOverStylingFullTreeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var angular_tree_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular-tree-component */ "./node_modules/angular-tree-component/dist/angular-tree-component.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;


var actionMapping = {
    mouse: {
        contextMenu: function (tree, node, $event) {
            $event.preventDefault();
            alert("context menu for " + node.data.name);
        },
        dblClick: function (tree, node, $event) {
            if (node.hasChildren) {
                angular_tree_component__WEBPACK_IMPORTED_MODULE_1__["TREE_ACTIONS"].TOGGLE_EXPANDED(tree, node, $event);
            }
        },
        click: function (tree, node, $event) {
            $event.shiftKey
                ? angular_tree_component__WEBPACK_IMPORTED_MODULE_1__["TREE_ACTIONS"].TOGGLE_ACTIVE_MULTI(tree, node, $event)
                : angular_tree_component__WEBPACK_IMPORTED_MODULE_1__["TREE_ACTIONS"].TOGGLE_ACTIVE(tree, node, $event);
        }
    },
    keys: (_a = {},
        _a[angular_tree_component__WEBPACK_IMPORTED_MODULE_1__["KEYS"].ENTER] = function (tree, node, $event) { return alert("This is " + node.data.name); },
        _a)
};
var DragOverStylingFullTreeComponent = /** @class */ (function () {
    function DragOverStylingFullTreeComponent() {
        this.nodes2 = [{ name: 'root' }, { name: 'root2' }];
        this.asyncChildren = new Array(4).fill(null).map(function (item, n) { return ({
            name: 'async child2.' + n,
            subTitle: 'async child ' + n,
            hasChildren: n < 5
        }); });
        this.customTemplateStringOptions = {
            // displayField: 'subTitle',
            isExpandedField: 'expanded',
            idField: 'uuid',
            getChildren: this.getChildren.bind(this),
            actionMapping: actionMapping,
            nodeHeight: 23,
            allowDrag: function (node) {
                // console.log('allowDrag?');
                return true;
            },
            allowDrop: function (node) {
                // console.log('allowDrop?');
                return true;
            },
            allowDragoverStyling: false,
            useVirtualScroll: true,
            animateExpand: true
        };
    }
    DragOverStylingFullTreeComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.nodes = [
                {
                    expanded: true,
                    name: 'root expanded',
                    subTitle: 'the root',
                    children: [
                        {
                            name: 'child2',
                            subTitle: 'a bad child',
                            hasChildren: false
                        },
                        {
                            name: 'child2',
                            subTitle: 'a bad child',
                            hasChildren: false
                        }
                    ]
                },
                {
                    name: 'root2',
                    subTitle: 'the second root',
                    children: [
                        {
                            name: 'child2.1',
                            subTitle: 'new and improved',
                            uuid: '11',
                            hasChildren: false
                        },
                        {
                            name: 'child2.2',
                            subTitle: 'new and improved2',
                            children: [
                                {
                                    uuid: 1001,
                                    name: 'subsub',
                                    subTitle: 'subsub',
                                    hasChildren: false
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'asyncroot',
                    hasChildren: true
                }
            ];
            var _loop_1 = function (i) {
                _this.nodes.push({
                    name: "rootDynamic" + i,
                    subTitle: "root created dynamically " + i,
                    children: new Array(10).fill(null).map(function (item, n) { return ({
                        name: "rootChildDynamic" + i + "." + n,
                        subTitle: "rootChildDynamicTitle" + i + "." + n
                    }); })
                });
            };
            for (var i = 0; i < 1000; i++) {
                _loop_1(i);
            }
        }, 1);
    };
    DragOverStylingFullTreeComponent.prototype.getChildren = function (node) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                return resolve(_this.asyncChildren.map(function (c) {
                    return Object.assign({}, c, {
                        hasChildren: node.level < 5
                    });
                }));
            }, 2000);
        });
    };
    DragOverStylingFullTreeComponent.prototype.addNode = function (tree) {
        this.nodes[0].children.push({
            name: 'a new child'
        });
        tree.treeModel.update();
    };
    DragOverStylingFullTreeComponent.prototype.childrenCount = function (node) {
        return node && node.children ? "(" + node.children.length + ")" : '';
    };
    DragOverStylingFullTreeComponent.prototype.filterNodes = function (text, tree) {
        tree.treeModel.filterNodes(text);
    };
    DragOverStylingFullTreeComponent.prototype.activateSubSub = function (tree) {
        // tree.treeModel.getNodeBy((node) => node.data.name === 'subsub')
        tree.treeModel.getNodeById(1001).setActiveAndVisible();
    };
    DragOverStylingFullTreeComponent.prototype.onEvent = function (event) {
        console.log(event);
    };
    DragOverStylingFullTreeComponent.prototype.onInitialized = function (tree) {
        // tree.treeModel.getNodeById('11').setActiveAndVisible();
    };
    DragOverStylingFullTreeComponent.prototype.go = function ($event) {
        $event.stopPropagation();
        alert('this method is on the app component');
    };
    DragOverStylingFullTreeComponent.prototype.activeNodes = function (treeModel) {
        console.log(treeModel.activeNodes);
    };
    DragOverStylingFullTreeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dragover-styling-fulltree',
            styles: [
                "\n      button: {\n        line-height: 24px;\n        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);\n        border: none;\n        border-radius: 2px;\n        background: #a3d9f5;\n        cursor: pointer;\n        margin: 0 3px;\n      }\n    "
            ],
            template: "\n    <form>\n      <input\n        #filter\n        (keyup)=\"filterNodes(filter.value, tree)\"\n        placeholder=\"filter nodes\"\n      />\n    </form>\n    <div style=\"height: 400px; width: 400px; overflow: hidden;\">\n      <tree-root\n        #tree\n        [nodes]=\"nodes\"\n        [options]=\"customTemplateStringOptions\"\n        [focused]=\"true\"\n        (event)=\"onEvent($event)\"\n        (initialized)=\"onInitialized(tree)\"\n      >\n        <ng-template #treeNodeTemplate let-node>\n          <span title=\"{{ node.data.subTitle }}\">{{ node.data.name }}</span>\n          <span class=\"pull-right\">{{ childrenCount(node) }}</span>\n          <button (click)=\"go($event)\">Custom Action</button>\n        </ng-template>\n        <ng-template #loadingTemplate>Loading, please hold....</ng-template>\n      </tree-root>\n    </div>\n    <br />\n    <p>Keys:</p>\n    down | up | left | right | space | enter\n    <p>Mouse:</p>\n    click to select | shift+click to select multi\n    <p>API:</p>\n    <button (click)=\"tree.treeModel.focusNextNode()\">next node</button>\n    <button (click)=\"tree.treeModel.focusPreviousNode()\">previous node</button>\n    <button (click)=\"tree.treeModel.focusDrillDown()\">drill down</button>\n    <button (click)=\"tree.treeModel.focusDrillUp()\">drill up</button>\n    <button (click)=\"customTemplateStringOptions.allowDrag = true\">\n      allowDrag\n    </button>\n    <p></p>\n    <button\n      [disabled]=\"!tree.treeModel.getFocusedNode()\"\n      (click)=\"tree.treeModel.getFocusedNode().toggleActivated()\"\n    >\n      {{\n        tree.treeModel.getFocusedNode()?.isActive ? \"deactivate\" : \"activate\"\n      }}\n    </button>\n    <button\n      [disabled]=\"!tree.treeModel.getFocusedNode()\"\n      (click)=\"tree.treeModel.getFocusedNode().toggleExpanded()\"\n    >\n      {{ tree.treeModel.getFocusedNode()?.isExpanded ? \"collapse\" : \"expand\" }}\n    </button>\n    <button\n      [disabled]=\"!tree.treeModel.getFocusedNode()\"\n      (click)=\"tree.treeModel.getFocusedNode().blur()\"\n    >\n      blur\n    </button>\n    <button (click)=\"addNode(tree)\">Add Node</button>\n    <button (click)=\"activateSubSub(tree)\">Activate inner node</button>\n    <button (click)=\"tree.treeModel.expandAll()\">Expand All</button>\n    <button (click)=\"tree.treeModel.collapseAll()\">Collapse All</button>\n    <button (click)=\"activeNodes(tree.treeModel)\">getActiveNodes()</button>\n  "
        }),
        __metadata("design:paramtypes", [])
    ], DragOverStylingFullTreeComponent);
    return DragOverStylingFullTreeComponent;
}());



/***/ }),

/***/ "./src/app/dragover-styling/dragover-styling.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/dragover-styling/dragover-styling.component.ts ***!
  \****************************************************************/
/*! exports provided: DragOverStylingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DragOverStylingComponent", function() { return DragOverStylingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_1__);
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var DragOverStylingComponent = /** @class */ (function () {
    function DragOverStylingComponent() {
        this.state = {
            expandedNodeIds: {
                1: true,
                2: true
            },
            hiddenNodeIds: {},
            activeNodeIds: {}
        };
        this.options = {
            allowDrag: function (node) { return true; },
            allowDragoverStyling: false,
            getNodeClone: function (node) { return (__assign({}, node.data, { id: Object(uuid__WEBPACK_IMPORTED_MODULE_1__["v4"])(), name: "copy of " + node.data.name })); }
        };
        this.nodes = [
            {
                id: 1,
                name: 'root1',
                children: [{ name: 'child1' }, { name: 'child2' }]
            },
            {
                name: 'root2',
                id: 2,
                children: [
                    { name: 'child2.1', children: [] },
                    { name: 'child2.2', children: [{ name: 'grandchild2.2.1' }] }
                ]
            },
            { name: 'root3' },
            { name: 'root4', children: [] },
            { name: 'root5', children: null }
        ];
    }
    DragOverStylingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dragover-styling',
            template: "\n    <h4>Disabled styling of nodes on dragover</h4>\n    <tree-root\n      [state]=\"state\"\n      [options]=\"options\"\n      [focused]=\"true\"\n      [nodes]=\"nodes\"\n    ></tree-root>\n  ",
            styles: []
        })
    ], DragOverStylingComponent);
    return DragOverStylingComponent;
}());



/***/ }),

/***/ "./src/app/empty/empty.component.ts":
/*!******************************************!*\
  !*** ./src/app/empty/empty.component.ts ***!
  \******************************************/
/*! exports provided: EmptyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmptyComponent", function() { return EmptyComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var EmptyComponent = /** @class */ (function () {
    function EmptyComponent() {
        this.nodes = [];
        this.nodes2 = null;
    }
    EmptyComponent.prototype.loadNodes = function () {
        this.nodes = [{ name: 'node' }];
        this.nodes2 = [{ name: 'node' }];
    };
    EmptyComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-empty',
            template: "\n    <tree-root #tree1 id=\"tree1\" [focused]=\"true\" [nodes]=\"nodes\"></tree-root>\n    <tree-root #tree2 id=\"tree2\" [focused]=\"true\" [nodes]=\"nodes2\"></tree-root>\n    <button (click)=\"loadNodes()\">loadNodes 1</button>\n  ",
            styles: []
        })
    ], EmptyComponent);
    return EmptyComponent;
}());



/***/ }),

/***/ "./src/app/fields/fields.component.ts":
/*!********************************************!*\
  !*** ./src/app/fields/fields.component.ts ***!
  \********************************************/
/*! exports provided: FieldsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FieldsComponent", function() { return FieldsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FieldsComponent = /** @class */ (function () {
    function FieldsComponent() {
        this.nodes = [
            {
                _id: '1',
                title: 'root1',
                className: 'root1Class',
                nodes: [{ _id: '3', title: 'child1', className: 'root1Class' }]
            },
            {
                _id: '2',
                title: 'root2',
                className: 'root2Class'
            }
        ];
        this.options = {
            displayField: 'title',
            idField: '_id',
            childrenField: 'nodes',
            nodeClass: function (node) { return node.data.className; }
        };
    }
    FieldsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-fields',
            template: "\n    <h3>Overriding displayField & nodeClass</h3>\n    <tree-root id=\"tree1\" [focused]=\"true\" [nodes]=\"nodes\" [options]=\"options\"></tree-root>\n  ",
            styles: []
        })
    ], FieldsComponent);
    return FieldsComponent;
}());



/***/ }),

/***/ "./src/app/filter/filter.component.ts":
/*!********************************************!*\
  !*** ./src/app/filter/filter.component.ts ***!
  \********************************************/
/*! exports provided: FilterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterComponent", function() { return FilterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FilterComponent = /** @class */ (function () {
    function FilterComponent() {
        this.options = {
            useCheckbox: true
        };
        this.nodes = [
            {
                name: 'North America',
                children: [
                    { name: 'United States', children: [
                            { name: 'New York' },
                            { name: 'California' },
                            { name: 'Florida' }
                        ] },
                    { name: 'Canada' }
                ]
            },
            {
                name: 'South America',
                children: [
                    { name: 'Argentina', children: [] },
                    { name: 'Brazil' }
                ]
            },
            {
                name: 'Europe',
                children: [
                    { name: 'England' },
                    { name: 'Germany' },
                    { name: 'France' },
                    { name: 'Italy' },
                    { name: 'Spain' }
                ]
            }
        ];
    }
    FilterComponent.prototype.filterFn = function (value, treeModel) {
        treeModel.filterNodes(function (node) { return fuzzysearch(value, node.data.name); });
    };
    FilterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-filter',
            template: "\n    <h2>Filter</h2>\n    <input id=\"filter\" #filter (keyup)=\"tree.treeModel.filterNodes(filter.value)\" placeholder=\"filter nodes\"/>\n    <button (click)=\"tree.treeModel.clearFilter()\">Clear Filter</button>\n    <tree-root #tree [focused]=\"true\" [options]=\"options\" [nodes]=\"nodes\"></tree-root>\n\n    <input id=\"filter2\" #filter2 (keyup)=\"tree.treeModel.filterNodes(filter2.value, false)\" placeholder=\"filter nodes\"/>\n\n    <h3>Filter By Function (Fuzzy Search)</h3>\n    <input id=\"filter3\" #filter3 (keyup)=\"filterFn(filter3.value, tree.treeModel)\" placeholder=\"filter nodes by fuzzy search\"/>\n ",
            styles: []
        })
    ], FilterComponent);
    return FilterComponent;
}());

function fuzzysearch(needle, haystack) {
    var haystackLC = haystack.toLowerCase();
    var needleLC = needle.toLowerCase();
    var hlen = haystack.length;
    var nlen = needleLC.length;
    if (nlen > hlen) {
        return false;
    }
    if (nlen === hlen) {
        return needleLC === haystackLC;
    }
    outer: for (var i = 0, j = 0; i < nlen; i++) {
        var nch = needleLC.charCodeAt(i);
        while (j < hlen) {
            if (haystackLC.charCodeAt(j++) === nch) {
                continue outer;
            }
        }
        return false;
    }
    return true;
}


/***/ }),

/***/ "./src/app/fulltree/fulltree.component.ts":
/*!************************************************!*\
  !*** ./src/app/fulltree/fulltree.component.ts ***!
  \************************************************/
/*! exports provided: FullTreeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FullTreeComponent", function() { return FullTreeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var angular_tree_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular-tree-component */ "./node_modules/angular-tree-component/dist/angular-tree-component.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;


var actionMapping = {
    mouse: {
        contextMenu: function (tree, node, $event) {
            $event.preventDefault();
            alert("context menu for " + node.data.name);
        },
        dblClick: function (tree, node, $event) {
            if (node.hasChildren) {
                angular_tree_component__WEBPACK_IMPORTED_MODULE_1__["TREE_ACTIONS"].TOGGLE_EXPANDED(tree, node, $event);
            }
        },
        click: function (tree, node, $event) {
            $event.shiftKey
                ? angular_tree_component__WEBPACK_IMPORTED_MODULE_1__["TREE_ACTIONS"].TOGGLE_ACTIVE_MULTI(tree, node, $event)
                : angular_tree_component__WEBPACK_IMPORTED_MODULE_1__["TREE_ACTIONS"].TOGGLE_ACTIVE(tree, node, $event);
        }
    },
    keys: (_a = {},
        _a[angular_tree_component__WEBPACK_IMPORTED_MODULE_1__["KEYS"].ENTER] = function (tree, node, $event) { return alert("This is " + node.data.name); },
        _a)
};
var FullTreeComponent = /** @class */ (function () {
    function FullTreeComponent() {
        this.nodes2 = [{ name: 'root' }, { name: 'root2' }];
        this.asyncChildren = new Array(4).fill(null).map(function (item, n) { return ({
            name: 'async child2.' + n,
            subTitle: 'async child ' + n,
            hasChildren: n < 5
        }); });
        this.customTemplateStringOptions = {
            // displayField: 'subTitle',
            isExpandedField: 'expanded',
            idField: 'uuid',
            getChildren: this.getChildren.bind(this),
            actionMapping: actionMapping,
            nodeHeight: 23,
            allowDrag: function (node) {
                // console.log('allowDrag?');
                return true;
            },
            allowDrop: function (node) {
                // console.log('allowDrop?');
                return true;
            },
            useVirtualScroll: true,
            animateExpand: true
        };
    }
    FullTreeComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.nodes = [
                {
                    expanded: true,
                    name: 'root expanded',
                    subTitle: 'the root',
                    children: [
                        {
                            name: 'child2',
                            subTitle: 'a bad child',
                            hasChildren: false
                        },
                        {
                            name: 'child2',
                            subTitle: 'a bad child',
                            hasChildren: false
                        }
                    ]
                },
                {
                    name: 'root2',
                    subTitle: 'the second root',
                    children: [
                        {
                            name: 'child2.1',
                            subTitle: 'new and improved',
                            uuid: '11',
                            hasChildren: false
                        }, {
                            name: 'child2.2',
                            subTitle: 'new and improved2',
                            children: [
                                {
                                    uuid: 1001,
                                    name: 'subsub',
                                    subTitle: 'subsub',
                                    hasChildren: false
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'asyncroot',
                    hasChildren: true
                }
            ];
            var _loop_1 = function (i) {
                _this.nodes.push({
                    name: "rootDynamic" + i,
                    subTitle: "root created dynamically " + i,
                    children: new Array(10).fill(null).map(function (item, n) { return ({
                        name: "rootChildDynamic" + i + "." + n,
                        subTitle: "rootChildDynamicTitle" + i + "." + n
                    }); })
                });
            };
            for (var i = 0; i < 1000; i++) {
                _loop_1(i);
            }
        }, 1);
    };
    FullTreeComponent.prototype.getChildren = function (node) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            setTimeout(function () { return resolve(_this.asyncChildren.map(function (c) {
                return Object.assign({}, c, {
                    hasChildren: node.level < 5
                });
            })); }, 2000);
        });
    };
    FullTreeComponent.prototype.addNode = function (tree) {
        this.nodes[0].children.push({
            name: 'a new child'
        });
        tree.treeModel.update();
    };
    FullTreeComponent.prototype.childrenCount = function (node) {
        return node && node.children ? "(" + node.children.length + ")" : '';
    };
    FullTreeComponent.prototype.filterNodes = function (text, tree) {
        tree.treeModel.filterNodes(text);
    };
    FullTreeComponent.prototype.activateSubSub = function (tree) {
        // tree.treeModel.getNodeBy((node) => node.data.name === 'subsub')
        tree.treeModel.getNodeById(1001)
            .setActiveAndVisible();
    };
    FullTreeComponent.prototype.onEvent = function (event) {
        console.log(event);
    };
    FullTreeComponent.prototype.onInitialized = function (tree) {
        // tree.treeModel.getNodeById('11').setActiveAndVisible();
    };
    FullTreeComponent.prototype.go = function ($event) {
        $event.stopPropagation();
        alert('this method is on the app component');
    };
    FullTreeComponent.prototype.activeNodes = function (treeModel) {
        console.log(treeModel.activeNodes);
    };
    FullTreeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-fulltree',
            styles: [
                "button: {\n        line - height: 24px;\n        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);\n        border: none;\n        border-radius: 2px;\n        background: #A3D9F5;\n        cursor: pointer;\n        margin: 0 3px;\n      }"
            ],
            template: "\n  <form>\n    <input #filter (keyup)=\"filterNodes(filter.value, tree)\" placeholder=\"filter nodes\"/>\n  </form>\n  <div style=\"height: 400px; width: 400px; overflow: hidden;\">\n\n    <tree-root\n      #tree\n      [nodes]=\"nodes\"\n      [options]=\"customTemplateStringOptions\"\n      [focused]=\"true\"\n      (event)=\"onEvent($event)\"\n      (initialized)=\"onInitialized(tree)\"\n    >\n      <ng-template #treeNodeTemplate let-node>\n        <span title=\"{{node.data.subTitle}}\">{{ node.data.name }}</span>\n        <span class=\"pull-right\">{{ childrenCount(node) }}</span>\n        <button (click)=\"go($event)\">Custom Action</button>\n      </ng-template>\n      <ng-template #loadingTemplate>Loading, please hold....</ng-template>\n    </tree-root>\n  </div>\n  <br>\n  <p>Keys:</p>\n  down | up | left | right | space | enter\n  <p>Mouse:</p>\n  click to select | shift+click to select multi\n  <p>API:</p>\n  <button (click)=\"tree.treeModel.focusNextNode()\">next node</button>\n  <button (click)=\"tree.treeModel.focusPreviousNode()\">previous node</button>\n  <button (click)=\"tree.treeModel.focusDrillDown()\">drill down</button>\n  <button (click)=\"tree.treeModel.focusDrillUp()\">drill up</button>\n  <button (click)=\"customTemplateStringOptions.allowDrag = true\">allowDrag</button>\n  <p></p>\n  <button\n    [disabled]=\"!tree.treeModel.getFocusedNode()\"\n    (click)=\"tree.treeModel.getFocusedNode().toggleActivated()\">\n    {{ tree.treeModel.getFocusedNode()?.isActive ? 'deactivate' : 'activate' }}\n  </button>\n  <button\n    [disabled]=\"!tree.treeModel.getFocusedNode()\"\n    (click)=\"tree.treeModel.getFocusedNode().toggleExpanded()\">\n    {{ tree.treeModel.getFocusedNode()?.isExpanded ? 'collapse' : 'expand' }}\n  </button>\n  <button\n    [disabled]=\"!tree.treeModel.getFocusedNode()\"\n    (click)=\"tree.treeModel.getFocusedNode().blur()\">\n    blur\n  </button>\n  <button\n    (click)=\"addNode(tree)\">\n    Add Node\n  </button>\n  <button\n    (click)=\"activateSubSub(tree)\">\n    Activate inner node\n  </button>\n  <button\n    (click)=\"tree.treeModel.expandAll()\">\n    Expand All\n  </button>\n  <button\n    (click)=\"tree.treeModel.collapseAll()\">\n    Collapse All\n  </button>\n  <button\n    (click)=\"activeNodes(tree.treeModel)\">\n    getActiveNodes()\n  </button>\n  "
        }),
        __metadata("design:paramtypes", [])
    ], FullTreeComponent);
    return FullTreeComponent;
}());



/***/ }),

/***/ "./src/app/rtl/rtl-tree.component.ts":
/*!*******************************************!*\
  !*** ./src/app/rtl/rtl-tree.component.ts ***!
  \*******************************************/
/*! exports provided: RtlTreeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RtlTreeComponent", function() { return RtlTreeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var RtlTreeComponent = /** @class */ (function () {
    function RtlTreeComponent() {
        this.options = {
            rtl: true
        };
        this.nodes = [
            {
                name: 'עץ תיקיות',
                children: [
                    { name: 'קובץ 1' },
                    { name: 'קובץ 2' }
                ]
            },
            {
                name: 'עוד עץ',
                children: [
                    { name: 'עלה', children: [] },
                    { name: 'ענף', children: [
                            { name: 'בן של ענף' }
                        ] }
                ]
            }
        ];
    }
    RtlTreeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-basictree',
            template: "\n    <tree-root [focused]=\"true\" [nodes]=\"nodes\" [options]=\"options\"></tree-root>\n  ",
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            styles: []
        })
    ], RtlTreeComponent);
    return RtlTreeComponent;
}());



/***/ }),

/***/ "./src/app/save-restore/save-restore.component.ts":
/*!********************************************************!*\
  !*** ./src/app/save-restore/save-restore.component.ts ***!
  \********************************************************/
/*! exports provided: SaveRestoreComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SaveRestoreComponent", function() { return SaveRestoreComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var getChildren = function () { return new Promise(function (resolve) {
    setTimeout(function () { return resolve([
        { id: 5, name: 'child2.1', children: [] },
        { id: 6, name: 'child2.2', children: [
                { id: 7, name: 'grandchild2.2.1' }
            ] }
    ]); }, 2000);
}); };
var SaveRestoreComponent = /** @class */ (function () {
    function SaveRestoreComponent() {
        this.options = {
            getChildren: getChildren
        };
        this.nodes = [
            {
                id: 1,
                name: 'root1',
                children: [
                    { id: 2, name: 'child1' },
                    { id: 3, name: 'child2' }
                ]
            },
            {
                id: 4,
                name: 'root2',
                hasChildren: true
            }
        ];
    }
    Object.defineProperty(SaveRestoreComponent.prototype, "state", {
        get: function () {
            return localStorage.treeState && JSON.parse(localStorage.treeState);
        },
        set: function (state) {
            localStorage.treeState = JSON.stringify(state);
        },
        enumerable: true,
        configurable: true
    });
    SaveRestoreComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-saverestore',
            template: "\n    <input id=\"filter\" #filter (keyup)=\"tree.treeModel.filterNodes(filter.value)\" placeholder=\"filter nodes\"/>\n    <tree-root [options]=\"options\" [(state)]=\"state\" #tree [focused]=\"true\" [nodes]=\"nodes\"></tree-root>\n  ",
            styles: []
        })
    ], SaveRestoreComponent);
    return SaveRestoreComponent;
}());



/***/ }),

/***/ "./src/app/scrollcontainer/scrollcontainer.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/scrollcontainer/scrollcontainer.component.ts ***!
  \**************************************************************/
/*! exports provided: ScrollContainerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrollContainerComponent", function() { return ScrollContainerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ScrollContainerComponent = /** @class */ (function () {
    function ScrollContainerComponent() {
        this.nodes = [];
        this.options = {
            scrollContainer: document.body.parentElement
        };
    }
    ScrollContainerComponent.prototype.ngOnInit = function () {
        for (var i = 0; i < 200; i++) {
            this.nodes.push({
                name: "rootDynamic" + i,
                subTitle: "root created dynamically " + i
            });
        }
    };
    ScrollContainerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-scrollcontainer',
            styles: [],
            template: "\n  <div style=\"height: 300px; width: 200px;border: 1px solid grey\">Padding</div>\n  <div>\n    <tree-root\n      #tree\n      [nodes]=\"nodes\"\n      [options]=\"options\"\n      [focused]=\"true\"\n    ></tree-root>\n  </div>\n  "
        }),
        __metadata("design:paramtypes", [])
    ], ScrollContainerComponent);
    return ScrollContainerComponent;
}());



/***/ }),

/***/ "./src/app/templates/templates.component.ts":
/*!**************************************************!*\
  !*** ./src/app/templates/templates.component.ts ***!
  \**************************************************/
/*! exports provided: TemplatesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplatesComponent", function() { return TemplatesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var TemplatesComponent = /** @class */ (function () {
    function TemplatesComponent() {
        this.nodes1 = [
            {
                title: 'root1',
                className: 'root1Class'
            },
            {
                title: 'root2',
                className: 'root2Class',
                hasChildren: true
            }
        ];
        this.nodes2 = [
            {
                title: 'root1',
                className: 'root1Class'
            },
            {
                title: 'root2',
                className: 'root2Class',
                children: [
                    { title: 'child1', className: 'child1Class' }
                ]
            }
        ];
        this.options1 = {
            getChildren: function () { return new Promise(function (resolve, reject) { }); }
        };
        this.options0 = {
            displayField: 'title',
            nodeClass: function (node) { return node.data.title + "Class"; }
        };
    }
    TemplatesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-templates',
            template: "\n    <h3>treeNodeTemplate and loadingTemplate</h3>\n    <tree-root id=\"tree1\" [focused]=\"true\" [nodes]=\"nodes1\" [options]=\"options1\">\n      <ng-template #treeNodeTemplate let-node let-index=\"index\">\n        <span [class]=\"node.data.className + 'Index'\">{{ index }}</span>\n        <span [class]=\"node.data.className\" [class.title]=\"true\">{{ node.data.title }}</span>\n      </ng-template>\n      <ng-template #loadingTemplate let-node>\n        <div [class]=\"node.data.className + 'Loading'\">Loading {{ node.data.title }}...</div>\n      </ng-template>\n    </tree-root>\n    \n    <h3>treeNodeWrapper</h3>\n    <tree-root id=\"tree3\" [focused]=\"true\" [nodes]=\"nodes2\" [options]=\"options1\">\n      <ng-template #treeNodeWrapperTemplate let-node let-index=\"index\">\n        <span [class]=\"node.data.className + 'Index'\">{{ index }}</span>      \n         <input type=\"checkbox\"><span>&rarr;</span>\n         <span [class]=\"node.data.className\" [class.title]=\"true\">{{ node.data.title }}</span>\n      </ng-template>\n    </tree-root>\n\n    <h3>treeNodeFullTemplate</h3>\n    <tree-root id=\"tree2\" [focused]=\"true\" [nodes]=\"nodes2\">\n      <ng-template #treeNodeFullTemplate let-node let-index=\"index\" let-templates=\"templates\">\n        <div class=\"tree-node\">\n          <input type=\"checkbox\" [checked]=\"node.isActive\" (change)=\"node.toggleActivated(true)\" />\n          <tree-node-expander [node]=\"node\"></tree-node-expander>\n          <div\n            class=\"node-content-wrapper\"\n            [class.node-content-wrapper-active]=\"node.isActive\"\n            [class.node-content-wrapper-focused]=\"node.isFocused\"\n            (click)=\"node.toggleActivated(true)\">\n            <span [class]=\"node.data.className + 'Index'\">{{ index }}</span>\n            <span [class]=\"node.data.className\" [class.title]=\"true\">{{ node.data.title }}</span>\n          </div>\n          <tree-node-children [node]=\"node\" [templates]=\"templates\"></tree-node-children>\n        </div>\n      </ng-template>\n    </tree-root>\n  ",
            styles: [
                '.root1Class { color: blue }',
                '.root2Class { color: red }'
            ]
        })
    ], TemplatesComponent);
    return TemplatesComponent;
}());



/***/ }),

/***/ "./src/app/virtualscroll/virtualscroll.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/virtualscroll/virtualscroll.component.ts ***!
  \**********************************************************/
/*! exports provided: VirtualscrollComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VirtualscrollComponent", function() { return VirtualscrollComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var VirtualscrollComponent = /** @class */ (function () {
    function VirtualscrollComponent() {
        this.options = {
            nodeHeight: 23,
            useVirtualScroll: true
        };
        this.nodes = new Array(1000).fill(null).map(function (item, i) { return ({
            id: "" + i,
            name: "rootDynamic" + i,
            children: new Array(100).fill(null).map(function (item, n) { return ({
                id: i + "." + n,
                name: "rootChildDynamic" + i + "." + n
            }); })
        }); });
    }
    VirtualscrollComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-virtualscroll',
            styles: [],
            template: "\n  <div style=\"height: 800px; width: 500px; overflow: hidden;\">\n\n    <tree-root\n      #tree\n      [nodes]=\"nodes\"\n      [options]=\"options\"\n      [focused]=\"true\"\n    >\n    </tree-root>\n  </div>\n  "
        }),
        __metadata("design:paramtypes", [])
    ], VirtualscrollComponent);
    return VirtualscrollComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/adamklein/projects/angular-tree-component/example/cli/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map