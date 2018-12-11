(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app-pages-pages-module"],{

/***/ "./node_modules/ngx-echarts/ngx-echarts.es5.js":
/*!*****************************************************!*\
  !*** ./node_modules/ngx-echarts/ngx-echarts.es5.js ***!
  \*****************************************************/
/*! exports provided: NgxEchartsModule, NgxEchartsDirective, NgxEchartsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxEchartsModule", function() { return NgxEchartsModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxEchartsDirective", function() { return NgxEchartsDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxEchartsService", function() { return NgxEchartsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_Observable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/Observable */ "./node_modules/rxjs-compat/_esm5/Observable.js");
/* harmony import */ var rxjs_add_observable_of__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/add/observable/of */ "./node_modules/rxjs-compat/_esm5/add/observable/of.js");
/* harmony import */ var rxjs_add_observable_empty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/add/observable/empty */ "./node_modules/rxjs-compat/_esm5/add/observable/empty.js");




var ChangeFilter = (function () {
    /**
     * @param {?} _changes
     */
    function ChangeFilter(_changes) {
        this._changes = _changes;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ChangeFilter.of = function (changes) {
        return new ChangeFilter(changes);
    };
    /**
     * @template T
     * @param {?} key
     * @return {?}
     */
    ChangeFilter.prototype.notEmpty = function (key) {
        if (this._changes[key]) {
            var /** @type {?} */ value = this._changes[key].currentValue;
            if (value !== undefined && value !== null) {
                return rxjs_Observable__WEBPACK_IMPORTED_MODULE_1__["Observable"].of(value);
            }
        }
        return rxjs_Observable__WEBPACK_IMPORTED_MODULE_1__["Observable"].empty();
    };
    /**
     * @template T
     * @param {?} key
     * @return {?}
     */
    ChangeFilter.prototype.has = function (key) {
        if (this._changes[key]) {
            var /** @type {?} */ value = this._changes[key].currentValue;
            return rxjs_Observable__WEBPACK_IMPORTED_MODULE_1__["Observable"].of(value);
        }
        return rxjs_Observable__WEBPACK_IMPORTED_MODULE_1__["Observable"].empty();
    };
    return ChangeFilter;
}());
var NgxEchartsDirective = (function () {
    /**
     * @param {?} el
     * @param {?} _ngZone
     */
    function NgxEchartsDirective(el, _ngZone) {
        this.el = el;
        this._ngZone = _ngZone;
        // chart events:
        this.chartInit = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.chartClick = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.chartDblClick = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.chartMouseDown = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.chartMouseUp = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.chartMouseOver = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.chartMouseOut = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.chartGlobalOut = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.chartContextMenu = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.chartDataZoom = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this._chart = null;
        this.currentWindowWidth = null;
    }
    /**
     * @return {?}
     */
    NgxEchartsDirective.prototype.createChart = function () {
        var _this = this;
        this.currentWindowWidth = window.innerWidth;
        var /** @type {?} */ dom = this.el.nativeElement;
        if (window && window.getComputedStyle) {
            var /** @type {?} */ prop = window.getComputedStyle(dom, null).getPropertyValue('height');
            if (!prop || prop === '0px') {
                dom.style.height = '400px';
            }
        }
        return this._ngZone.runOutsideAngular(function () { return echarts.init(dom, _this.theme || undefined, _this.initOpts || undefined); });
    };
    /**
     * @param {?} event
     * @return {?}
     */
    NgxEchartsDirective.prototype.onWindowResize = function (event) {
        if (event.target.innerWidth !== this.currentWindowWidth) {
            this.currentWindowWidth = event.target.innerWidth;
            if (this._chart) {
                this._chart.resize();
            }
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgxEchartsDirective.prototype.ngOnChanges = function (changes) {
        var _this = this;
        var /** @type {?} */ filter = ChangeFilter.of(changes);
        filter.notEmpty('options').subscribe(function (opt) { return _this.onOptionsChange(opt); });
        filter.notEmpty('merge').subscribe(function (opt) { return _this.setOption(opt); });
        filter.has('loading').subscribe(function (v) { return _this.toggleLoading(!!v); });
    };
    /**
     * @return {?}
     */
    NgxEchartsDirective.prototype.ngOnDestroy = function () {
        if (this._chart) {
            this._chart.dispose();
            this._chart = null;
        }
    };
    /**
     * @param {?} opt
     * @return {?}
     */
    NgxEchartsDirective.prototype.onOptionsChange = function (opt) {
        if (opt) {
            if (!this._chart) {
                this._chart = this.createChart();
                // output echart instance:
                this.chartInit.emit(this._chart);
                // register events:
                this.registerEvents(this._chart);
            }
            this._chart.setOption(this.options, true);
            this._chart.resize();
        }
    };
    /**
     * @param {?} _chart
     * @return {?}
     */
    NgxEchartsDirective.prototype.registerEvents = function (_chart) {
        var _this = this;
        if (_chart) {
            // register mouse events:
            _chart.on('click', function (e) { return _this._ngZone.run(function () { return _this.chartClick.emit(e); }); });
            _chart.on('dblClick', function (e) { return _this._ngZone.run(function () { return _this.chartDblClick.emit(e); }); });
            _chart.on('mousedown', function (e) { return _this._ngZone.run(function () { return _this.chartMouseDown.emit(e); }); });
            _chart.on('mouseup', function (e) { return _this._ngZone.run(function () { return _this.chartMouseUp.emit(e); }); });
            _chart.on('mouseover', function (e) { return _this._ngZone.run(function () { return _this.chartMouseOver.emit(e); }); });
            _chart.on('mouseout', function (e) { return _this._ngZone.run(function () { return _this.chartMouseOut.emit(e); }); });
            _chart.on('globalout', function (e) { return _this._ngZone.run(function () { return _this.chartGlobalOut.emit(e); }); });
            _chart.on('contextmenu', function (e) { return _this._ngZone.run(function () { return _this.chartContextMenu.emit(e); }); });
            // other events;
            _chart.on('datazoom', function (e) { return _this._ngZone.run(function () { return _this.chartDataZoom.emit(e); }); });
        }
    };
    /**
     * @return {?}
     */
    NgxEchartsDirective.prototype.clear = function () {
        if (this._chart) {
            this._chart.clear();
        }
    };
    /**
     * @param {?} loading
     * @return {?}
     */
    NgxEchartsDirective.prototype.toggleLoading = function (loading) {
        if (this._chart) {
            loading ? this._chart.showLoading() : this._chart.hideLoading();
        }
    };
    /**
     * @param {?} option
     * @param {?=} opts
     * @return {?}
     */
    NgxEchartsDirective.prototype.setOption = function (option, opts) {
        if (this._chart) {
            this._chart.setOption(option, opts);
        }
    };
    return NgxEchartsDirective;
}());
NgxEchartsDirective.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                selector: 'echarts, [echarts]'
            },] },
];
/**
 * @nocollapse
 */
NgxEchartsDirective.ctorParameters = function () { return [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], },
]; };
NgxEchartsDirective.propDecorators = {
    'options': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'theme': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'loading': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'initOpts': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'merge': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'chartInit': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'chartClick': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'chartDblClick': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'chartMouseDown': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'chartMouseUp': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'chartMouseOver': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'chartMouseOut': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'chartGlobalOut': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'chartContextMenu': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'chartDataZoom': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'onWindowResize': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"], args: ['window:resize', ['$event'],] },],
};
/**
 * Provide an wrapper for global echarts
 * ```typescript
 * export class AppComponent implements onInit {
 *   constructor(private nes: NgxEchartsService) {}
 *
 *   ngOnInit() {
 *     // const points = ...;
 *     // const rect = ...;
 *
 *     // Get native global echarts object, then call native function
 *     const echarts = this.nes.echarts;
 *     const points = echarts.graphic.clipPointsByRect(points, rect);
 *
 *     // Or call wrapper function directly:
 *     const points = this.nes.graphic.clipPointsByRect(points, rect);
 *   }
 * }
 * ```
 */
var NgxEchartsService = (function () {
    function NgxEchartsService() {
    }
    Object.defineProperty(NgxEchartsService.prototype, "echarts", {
        /**
         * Get global echarts object
         * @return {?}
         */
        get: function () {
            return echarts;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxEchartsService.prototype, "graphic", {
        /**
         * Wrapper for echarts.graphic
         * @return {?}
         */
        get: function () {
            return this._checkEcharts() ? echarts.graphic : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxEchartsService.prototype, "init", {
        /**
         * Wrapper for echarts.init
         * @return {?}
         */
        get: function () {
            return this._checkEcharts() ? echarts.init : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxEchartsService.prototype, "connect", {
        /**
         * Wrapper for echarts.connect
         * @return {?}
         */
        get: function () {
            return this._checkEcharts() ? echarts.connect : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxEchartsService.prototype, "disconnect", {
        /**
         * Wrapper for echarts.disconnect
         * @return {?}
         */
        get: function () {
            return this._checkEcharts() ? echarts.disconnect : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxEchartsService.prototype, "dispose", {
        /**
         * Wrapper for echarts.dispose
         * @return {?}
         */
        get: function () {
            return this._checkEcharts() ? echarts.dispose : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxEchartsService.prototype, "getInstanceByDom", {
        /**
         * Wrapper for echarts.getInstanceByDom
         * @return {?}
         */
        get: function () {
            return this._checkEcharts() ? echarts.getInstanceByDom : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxEchartsService.prototype, "registerMap", {
        /**
         * Wrapper for echarts.registerMap
         * @return {?}
         */
        get: function () {
            return this._checkEcharts() ? echarts.registerMap : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxEchartsService.prototype, "getMap", {
        /**
         * Wrapper for echarts.getMap
         * @return {?}
         */
        get: function () {
            return this._checkEcharts() ? echarts.getMap : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxEchartsService.prototype, "registerTheme", {
        /**
         * Wrapper for echarts.registerTheme
         * @return {?}
         */
        get: function () {
            return this._checkEcharts() ? echarts.registerTheme : undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgxEchartsService.prototype._checkEcharts = function () {
        if (echarts) {
            return true;
        }
        else {
            console.error('[ngx-echarts] global ECharts not loaded');
            return false;
        }
    };
    return NgxEchartsService;
}());
NgxEchartsService.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
];
/**
 * @nocollapse
 */
NgxEchartsService.ctorParameters = function () { return []; };
var NgxEchartsModule = (function () {
    function NgxEchartsModule() {
    }
    return NgxEchartsModule;
}());
NgxEchartsModule.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                declarations: [
                    NgxEchartsDirective
                ],
                exports: [
                    NgxEchartsDirective
                ],
                providers: [
                    NgxEchartsService
                ]
            },] },
];
/**
 * @nocollapse
 */
NgxEchartsModule.ctorParameters = function () { return []; };
/**
 * Generated bundle index. Do not edit.
 */

//# sourceMappingURL=ngx-echarts.es5.js.map


/***/ }),

/***/ "./node_modules/rxjs-compat/_esm5/Observable.js":
/*!******************************************************!*\
  !*** ./node_modules/rxjs-compat/_esm5/Observable.js ***!
  \******************************************************/
/*! exports provided: Observable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Observable", function() { return rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"]; });


//# sourceMappingURL=Observable.js.map

/***/ }),

/***/ "./node_modules/rxjs-compat/_esm5/add/observable/empty.js":
/*!****************************************************************!*\
  !*** ./node_modules/rxjs-compat/_esm5/add/observable/empty.js ***!
  \****************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");

rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"].empty = rxjs__WEBPACK_IMPORTED_MODULE_0__["empty"];
//# sourceMappingURL=empty.js.map

/***/ }),

/***/ "./node_modules/rxjs-compat/_esm5/add/observable/of.js":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs-compat/_esm5/add/observable/of.js ***!
  \*************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");

rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"].of = rxjs__WEBPACK_IMPORTED_MODULE_0__["of"];
//# sourceMappingURL=of.js.map

/***/ }),

/***/ "./src/app/pages/comparegallery/comparegallery.component.html":
/*!********************************************************************!*\
  !*** ./src/app/pages/comparegallery/comparegallery.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "  <ngx-gallery \r\n           baseUrl=\"{{ baseUrl }}\"\r\n           metadataUri=\"{{ apiUrl }}/{{ groupName }}/{{ testName }}/{{ seqNumber }}/data.json\">\r\n\r\n  </ngx-gallery>\r\n"

/***/ }),

/***/ "./src/app/pages/comparegallery/comparegallery.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/pages/comparegallery/comparegallery.component.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/comparegallery/comparegallery.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/pages/comparegallery/comparegallery.component.ts ***!
  \******************************************************************/
/*! exports provided: ComparegalleryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComparegalleryComponent", function() { return ComparegalleryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _nebular_theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nebular/theme */ "./node_modules/@nebular/theme/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ComparegalleryComponent = /** @class */ (function () {
    function ComparegalleryComponent(themeService, route) {
        this.themeService = themeService;
        this.route = route;
        this.baseUrl = '';
        this.apiUrl = '';
        this.groupName = '';
        this.testName = '';
        this.seqNumber = '';
        this.themeService.getJsTheme();
    }
    ComparegalleryComponent.prototype.ngOnInit = function () {
        this.baseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiBase;
        this.apiUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiBase + '/api/file';
        this.groupName = this.route.snapshot.paramMap.get('group');
        this.testName = this.route.snapshot.paramMap.get('testcase');
        this.seqNumber = this.route.snapshot.paramMap.get('seq');
    };
    ComparegalleryComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ngx-comparegallery',
            template: __webpack_require__(/*! ./comparegallery.component.html */ "./src/app/pages/comparegallery/comparegallery.component.html"),
            styles: [__webpack_require__(/*! ./comparegallery.component.scss */ "./src/app/pages/comparegallery/comparegallery.component.scss")],
        }),
        __metadata("design:paramtypes", [_nebular_theme__WEBPACK_IMPORTED_MODULE_1__["NbThemeService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], ComparegalleryComponent);
    return ComparegalleryComponent;
}());



/***/ }),

/***/ "./src/app/pages/comparegallery/comparegallery.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/pages/comparegallery/comparegallery.module.ts ***!
  \***************************************************************/
/*! exports provided: ComparegalleryModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComparegalleryModule", function() { return ComparegalleryModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _comparegallery_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./comparegallery.component */ "./src/app/pages/comparegallery/comparegallery.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _services_image_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/image.service */ "./src/app/pages/comparegallery/services/image.service.ts");
/* harmony import */ var _viewer_viewer_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./viewer/viewer.component */ "./src/app/pages/comparegallery/viewer/viewer.component.ts");
/* harmony import */ var _gallery_gallery_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./gallery/gallery.component */ "./src/app/pages/comparegallery/gallery/gallery.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var ComparegalleryModule = /** @class */ (function () {
    function ComparegalleryModule() {
    }
    ComparegalleryModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
            ],
            declarations: [
                _comparegallery_component__WEBPACK_IMPORTED_MODULE_1__["ComparegalleryComponent"],
                _viewer_viewer_component__WEBPACK_IMPORTED_MODULE_6__["ViewerComponent"],
                _gallery_gallery_component__WEBPACK_IMPORTED_MODULE_7__["GalleryComponent"],
            ],
            providers: [
                _services_image_service__WEBPACK_IMPORTED_MODULE_5__["ImageService"],
            ],
        })
    ], ComparegalleryModule);
    return ComparegalleryModule;
}());



/***/ }),

/***/ "./src/app/pages/comparegallery/gallery/gallery.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/pages/comparegallery/gallery/gallery.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div #galleryContainer class=\"galleryContainer\">\r\n  <div class=\"innerGalleryContainer\">\r\n    <div *ngFor='let imgrow of gallery; let i = index'\r\n         class=\"imagerow\"\r\n         [style.margin-bottom.px]=\"imageMargin\">\r\n      <div *ngFor='let img of imgrow; let j = index'\r\n           [style.background]=\"black\"\r\n           [style.margin-left.px]=\"imageMargin/2\"\r\n           [style.margin-right.px]=\"imageMargin/2\"\r\n           (click)=\"openImageViewer(img)\"\r\n           class=\"imageContainer\">\r\n        <img #imageElement\r\n             class=\"thumbnail\"\r\n             [style.width.px]=\"img['width']\"\r\n             [style.height.px]=\"img['height']\"\r\n             [src]=\"img['srcAfterFocus']\" />\r\n        <div class=\"rate\">\r\n          <div class=\"text\">{{ img['rate'] }} %</div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n\r\n<ngx-viewer baseUrl=\"{{ baseUrl }}\">\r\n</ngx-viewer>\r\n"

/***/ }),

/***/ "./src/app/pages/comparegallery/gallery/gallery.component.scss":
/*!*********************************************************************!*\
  !*** ./src/app/pages/comparegallery/gallery/gallery.component.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".innerGalleryContainer {\n  position: relative; }\n\n.galleryContainer {\n  height: 100%;\n  width: 100%;\n  overflow: hidden; }\n\n.innerGalleryContainer img:last-child {\n  /* important to overwrite inline css and prevent chrome flickering bug */\n  margin-right: -1px !important; }\n\n.galleryContainer img:hover {\n  -webkit-filter: brightness(50%);\n  filter: brightness(50%);\n  transition: all ease-out 0.2s;\n  cursor: pointer; }\n\n.imagerow {\n  margin-right: 1px;\n  overflow: hidden;\n  display: flex; }\n\n.imageContainer {\n  position: relative; }\n\n.rate {\n  transition: .5s ease;\n  opacity: 1;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -ms-transform: translate(-50%, -50%);\n  text-align: center; }\n\n.text {\n  background-color: darkblue;\n  border-radius: 10px 20px;\n  color: white;\n  font-size: 16px;\n  padding: 16px 16px; }\n\n::-webkit-scrollbar {\n  display: none; }\n\n.asyncLoadingContainer {\n  position: absolute;\n  background-color: transparent;\n  height: 0px;\n  width: 0px;\n  bottom: 120px; }\n\n.pagerContainer {\n  margin: 40px auto;\n  width: 180px; }\n\n@media (max-width: 700px) {\n  .pagerContainer {\n    margin: 40px auto;\n    width: 150px; } }\n\n.pager {\n  display: block;\n  height: 60px; }\n\n@media (max-width: 700px) {\n  .pager {\n    display: block;\n    height: 45px; } }\n\n.pager.inactive {\n  opacity: 0.15; }\n\n.pager.left {\n  float: left; }\n\n.pager.right {\n  float: right; }\n"

/***/ }),

/***/ "./src/app/pages/comparegallery/gallery/gallery.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/pages/comparegallery/gallery/gallery.component.ts ***!
  \*******************************************************************/
/*! exports provided: GalleryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GalleryComponent", function() { return GalleryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_image_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/image.service */ "./src/app/pages/comparegallery/services/image.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GalleryComponent = /** @class */ (function () {
    function GalleryComponent(imageService, http, changeDetectorRef) {
        this.imageService = imageService;
        this.http = http;
        this.changeDetectorRef = changeDetectorRef;
        this.images = [];
        this.gallery = [];
        this.imageDataStaticPath = '/api/file';
        this.imageDataCompletePath = '';
        this.dataFileName = 'data.json';
        this.previewImage = 'preview';
        this.imageMargin = 5;
        this.rightArrowInactive = false;
        this.leftArrowInactive = false;
        this.baseUrl = '';
        this.metadataUri = undefined;
        this.viewerChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    GalleryComponent.prototype.triggerCycle = function (event) {
        this.scaleGallery();
    };
    GalleryComponent.prototype.windowResize = function (event) {
        this.render();
    };
    GalleryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.fetchDataAndRender();
        this.viewerSubscription = this.imageService.showImageViewerChanged$
            .subscribe(function (visibility) { return _this.viewerChange.emit(visibility); });
    };
    GalleryComponent.prototype.ngOnChanges = function (changes) {
        // input params changed
        if (changes['metadataUri'] !== undefined) {
            this.fetchDataAndRender();
        }
        else {
            this.render();
        }
    };
    GalleryComponent.prototype.ngOnDestroy = function () {
        if (this.viewerSubscription) {
            this.viewerSubscription.unsubscribe();
        }
    };
    GalleryComponent.prototype.openImageViewer = function (img) {
        this.imageService.updateImages(this.images);
        this.imageService.updateSelectedImageIndex(this.images.indexOf(img));
        this.imageService.showImageViewer(true);
    };
    GalleryComponent.prototype.fetchDataAndRender = function () {
        var _this = this;
        this.http.get(this.metadataUri)
            .subscribe(function (data) {
            _this.images = data;
            _this.imageService.updateImages(_this.images);
            _this.images.forEach(function (image) {
                image['viewerImageLoaded'] = false;
                image['srcAfterFocus'] = '';
            });
            // twice, single leads to different strange browser behaviour
            _this.render();
            _this.render();
        }, function (err) {
            console.error(err);
        }, function () { return undefined; });
    };
    GalleryComponent.prototype.render = function () {
        this.gallery = [];
        if (this.images.length <= 0) {
            return;
        }
        var width = this.images[0][this.previewImage]['width'];
        var rowCount = Math.floor(this.getGalleryWidth() / width);
        this.imageMargin = Math.floor((this.getGalleryWidth() - rowCount * width) / rowCount);
        var tempRow = [];
        for (var index = 0; index < this.images.length; index++) {
            tempRow.push(this.images[index]);
            if (((index + 1) % rowCount) === 0) {
                this.gallery.push(tempRow);
                tempRow = [];
            }
        }
        if (tempRow.length > 0) {
            this.gallery.push(tempRow);
        }
        this.scaleGallery();
        console.log();
    };
    GalleryComponent.prototype.getGalleryWidth = function () {
        if (this.galleryContainer.nativeElement.clientWidth === 0) {
            // for IE11
            return this.galleryContainer.nativeElement.scrollWidth;
        }
        return this.galleryContainer.nativeElement.clientWidth;
    };
    GalleryComponent.prototype.scaleGallery = function () {
        var _this = this;
        var maximumGalleryImageHeight = 0;
        this.gallery.forEach(function (imgRow) {
            imgRow.forEach(function (img) {
                img.width = img[_this.previewImage]['width'];
                img.height = img[_this.previewImage]['height'];
                maximumGalleryImageHeight = Math.max(maximumGalleryImageHeight, img['height']);
                img['srcAfterFocus'] = _this.baseUrl + img[_this.previewImage]['path'];
            });
        });
        this.changeDetectorRef.detectChanges();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('baseUrl'),
        __metadata("design:type", String)
    ], GalleryComponent.prototype, "baseUrl", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('metadataUri'),
        __metadata("design:type", String)
    ], GalleryComponent.prototype, "metadataUri", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], GalleryComponent.prototype, "viewerChange", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('galleryContainer'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], GalleryComponent.prototype, "galleryContainer", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"])('imageElement'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["QueryList"])
    ], GalleryComponent.prototype, "imageElements", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('window:scroll', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], GalleryComponent.prototype, "triggerCycle", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], GalleryComponent.prototype, "windowResize", null);
    GalleryComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ngx-gallery',
            template: __webpack_require__(/*! ./gallery.component.html */ "./src/app/pages/comparegallery/gallery/gallery.component.html"),
            styles: [__webpack_require__(/*! ./gallery.component.scss */ "./src/app/pages/comparegallery/gallery/gallery.component.scss")],
        }),
        __metadata("design:paramtypes", [_services_image_service__WEBPACK_IMPORTED_MODULE_1__["ImageService"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]])
    ], GalleryComponent);
    return GalleryComponent;
}());



/***/ }),

/***/ "./src/app/pages/comparegallery/services/image.service.ts":
/*!****************************************************************!*\
  !*** ./src/app/pages/comparegallery/services/image.service.ts ***!
  \****************************************************************/
/*! exports provided: ImageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageService", function() { return ImageService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var ImageService = /** @class */ (function () {
    function ImageService() {
        this.imagesUpdatedSource = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.imageSelectedIndexUpdatedSource = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.showImageViewerSource = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.imagesUpdated$ = this.imagesUpdatedSource.asObservable();
        this.imageSelectedIndexUpdated$ = this.imageSelectedIndexUpdatedSource.asObservable();
        this.showImageViewerChanged$ = this.showImageViewerSource.asObservable();
    }
    ImageService.prototype.updateImages = function (images) {
        this.imagesUpdatedSource.next(images);
    };
    ImageService.prototype.updateSelectedImageIndex = function (newIndex) {
        this.imageSelectedIndexUpdatedSource.next(newIndex);
    };
    ImageService.prototype.showImageViewer = function (show) {
        this.showImageViewerSource.next(show);
    };
    ImageService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], ImageService);
    return ImageService;
}());



/***/ }),

/***/ "./src/app/pages/comparegallery/viewer/viewer.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/pages/comparegallery/viewer/viewer.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"outerContainer\" (window:resize)=\"onResize()\" *ngIf=\"showViewer\" [@showViewerTransition]=\"showViewer\" style=\"z-index:10000;\">\r\n\r\n\r\n  <img [ngClass]=\"{'activeArrow': leftArrowActive}\" class=\"arrow left\"\r\n       src=\"data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0cHgiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczpza2V0Y2g9Imh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjx0aXRsZS8+PGRlc2MvPiAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgaWQ9Im1pdSIgc3Ryb2tlPSIjNTU1IiBzdHJva2Utd2lkdGg9IjAuMiI+ICAgICA8ZyBpZD0iQXJ0Ym9hcmQtMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM5NS4wMDAwMDAsIC0xOTEuMDAwMDAwKSI+PGcgaWQ9InNsaWNlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMTUuMDAwMDAwLCAxMTkuMDAwMDAwKSIvPjxwYXRoICAgICAgIGQ9Ik0zOTYsMjAyLjUgQzM5NiwxOTYuMTQ4NzI1IDQwMS4xNDg3MjUsMTkxIDQwNy41LDE5MSBDNDEzLjg1MTI3NSwxOTEgNDE5LDE5Ni4xNDg3MjUgNDE5LDIwMi41IEM0MTksMjA4Ljg1MTI3NSA0MTMuODUxMjc1LDIxNCA0MDcuNSwyMTQgQzQwMS4xNDg3MjUsMjE0IDM5NiwyMDguODUxMjc1IDM5NiwyMDIuNSBaIE00MDguNjU2ODU0LDE5Ni44NDMxNDYgTDQxMC4wNzEwNjgsMTk4LjI1NzM1OSBMNDA1LjgyODQyNywyMDIuNSBMNDEwLjA3MTA2OCwyMDYuNzQyNjQxIEw0MDguNjU2ODU0LDIwOC4xNTY4NTQgTDQwMywyMDIuNSBMNDA4LjY1Njg1NCwxOTYuODQzMTQ2IFoiICAgICAgIGZpbGw9IiNhYWEiICAgICAgIGlkPSJjaXJjbGUtYmFjay1hcnJvdy1nbHlwaCIvPjwvZz4gICA8L2c+IDwvc3ZnPg==\"\r\n       [hidden]=\"!leftArrowVisible\" (click)=\"navigate(-1, false)\" />\r\n  <img [ngClass]=\"{'activeArrow': rightArrowActive}\" class=\"arrow right\"\r\n       src=\"data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjI0cHgiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczpza2V0Y2g9Imh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaC9ucyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjx0aXRsZS8+PGRlc2MvPjxkZWZzLz4gICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGlkPSJtaXUiIHN0cm9rZT0iIzU1NSIgc3Ryb2tlLXdpZHRoPSIwLjIiPiAgICAgPGcgaWQ9IkFydGJvYXJkLTEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00NjcuMDAwMDAwLCAtMTkxLjAwMDAwMCkiPjxnIGlkPSJzbGljZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjE1LjAwMDAwMCwgMTE5LjAwMDAwMCkiLz48cGF0aCAgICAgICBkPSJNNDY4LDIwMi41IEM0NjgsMTk2LjE0ODcyNSA0NzMuMTQ4NzI1LDE5MSA0NzkuNSwxOTEgQzQ4NS44NTEyNzUsMTkxIDQ5MSwxOTYuMTQ4NzI1IDQ5MSwyMDIuNSBDNDkxLDIwOC44NTEyNzUgNDg1Ljg1MTI3NSwyMTQgNDc5LjUsMjE0IEM0NzMuMTQ4NzI1LDIxNCA0NjgsMjA4Ljg1MTI3NSA0NjgsMjAyLjUgWiBNNDgwLjY1Njg1NCwxOTYuODQzMTQ2IEw0ODIuMDcxMDY4LDE5OC4yNTczNTkgTDQ3Ny44Mjg0MjcsMjAyLjUgTDQ4Mi4wNzEwNjgsMjA2Ljc0MjY0MSBMNDgwLjY1Njg1NCwyMDguMTU2ODU0IEw0NzUsMjAyLjUgTDQ4MC42NTY4NTQsMTk2Ljg0MzE0NiBaIiAgICAgICBmaWxsPSIjYWFhIiAgICAgICBpZD0iY2lyY2xlLW5leHQtYXJyb3ctZGlzY2xvc3VyZS1nbHlwaCIgICAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDc5LjUwMDAwMCwgMjAyLjUwMDAwMCkgc2NhbGUoLTEsIDEpIHRyYW5zbGF0ZSgtNDc5LjUwMDAwMCwgLTIwMi41MDAwMDApICIvPjwvZz4gICA8L2c+IDwvc3ZnPg==\"\r\n       [hidden]=\"!rightArrowVisible\" (click)=\"navigate(1, false)\" />\r\n\r\n  <div class=\"buttonContainer\">\r\n    <img class=\"action close\"\r\n         src=\"data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjMwcHgiIGlkPSJMYXllcl8xIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgdmVyc2lvbj0iMS4xIiBmaWxsPSIjYWFhIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjI0cHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPiAgPHBhdGggICAgc3Ryb2tlLXdpZHRoPSIzMCIgc3Ryb2tlPSIjNDQ0IiAgICBkPSJNNDM3LjUsMzg2LjZMMzA2LjksMjU2bDEzMC42LTEzMC42YzE0LjEtMTQuMSwxNC4xLTM2LjgsMC01MC45Yy0xNC4xLTE0LjEtMzYuOC0xNC4xLTUwLjksMEwyNTYsMjA1LjFMMTI1LjQsNzQuNSAgYy0xNC4xLTE0LjEtMzYuOC0xNC4xLTUwLjksMGMtMTQuMSwxNC4xLTE0LjEsMzYuOCwwLDUwLjlMMjA1LjEsMjU2TDc0LjUsMzg2LjZjLTE0LjEsMTQuMS0xNC4xLDM2LjgsMCw1MC45ICBjMTQuMSwxNC4xLDM2LjgsMTQuMSw1MC45LDBMMjU2LDMwNi45bDEzMC42LDEzMC42YzE0LjEsMTQuMSwzNi44LDE0LjEsNTAuOSwwQzQ1MS41LDQyMy40LDQ1MS41LDQwMC42LDQzNy41LDM4Ni42eiIvPjwvc3ZnPg==\"\r\n         (click)=\"closeViewer()\" />\r\n  </div>\r\n\r\n  <div #imageContainer class=\"imageContainer\"\r\n       (click)=\"showNavigationArrows()\"\r\n       (swipeleft)=\"navigate(1, $event)\"\r\n       (swiperight)=\"navigate(-1, $event)\"\r\n       (pan)=\"pan($event)\">\r\n\r\n    <div *ngFor='let img of images; let j = index'\r\n         class=\"image\"\r\n         [class.active]=\"img['active']\"\r\n         [style.left]=\"transform+'px'\"\r\n         [@imageTransition]=\"img['transition']\">\r\n\r\n      <div class=\"centerImages\">\r\n        <div class=\"gridImage\">\r\n          <p>Original Image</p>\r\n          <img src=\"{{ baseUrl + img[originImage]['path'] }}\" />\r\n        </div>\r\n        <div class=\"gridImage\">\r\n          <p>{{ img['rate'] }} % Matched</p>\r\n            <img src=\"{{ baseUrl + img[diffImage]['path'] }}\" />\r\n        </div>\r\n        <div class=\"gridImage\">\r\n          <p>Captured Image</p>\r\n          <img src=\"{{ baseUrl + img[capturedImage]['path'] }}\" />\r\n        </div>\r\n\r\n      </div>\r\n\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/comparegallery/viewer/viewer.component.scss":
/*!*******************************************************************!*\
  !*** ./src/app/pages/comparegallery/viewer/viewer.component.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".outerContainer {\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 100%;\n  width: 100%;\n  position: fixed;\n  background-color: rgba(0, 0, 0, 0.95);\n  font-family: sans-serif;\n  z-index: 1031; }\n\n.imageContainer {\n  position: absolute;\n  float: none;\n  top: 0px;\n  bottom: 0px;\n  left: 0px;\n  right: 0px; }\n\n.imageContainer .image,\n.imageContainer .preloading-image {\n  visibility: hidden; }\n\n.imageContainer .image.active {\n  position: absolute;\n  visibility: visible;\n  background-repeat: no-repeat;\n  background-size: contain;\n  background-position: center;\n  margin: auto auto;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  height: 100%;\n  width: 100%;\n  opacity: 1.0; }\n\n.centerImages {\n  width: 80%;\n  position: absolute;\n  top: 10px;\n  bottom: 10px;\n  left: 0;\n  right: 0;\n  margin: auto; }\n\n.gridImage {\n  background-color: white;\n  top: 0;\n  bottom: 0;\n  margin-top: 50px;\n  margin-bottom: auto;\n  margin-left: auto;\n  margin-right: auto;\n  border: 5px solid black;\n  padding: 10px;\n  float: left;\n  width: 33%;\n  text-align: center;\n  color: black;\n  font-size: 24px; }\n\n.gridImage img {\n  height: 100%;\n  width: 100%;\n  -o-object-fit: contain;\n     object-fit: contain; }\n\n.arrow {\n  opacity: 0.0; }\n\n.arrow:hover {\n  cursor: pointer; }\n\n.outerContainer:hover .arrow.activeArrow {\n  height: calc(20px + 1.5vw);\n  position: absolute;\n  /* use sass variables here once they are ready */\n  top: calc(50% - (20px + 1.5vw) / 2);\n  bottom: 50%;\n  z-index: 1;\n  opacity: 1.0;\n  transition: all ease-out 0.5s; }\n\n.arrow.left {\n  left: 2vw; }\n\n.arrow.right {\n  right: 2vw; }\n\n.arrow:not(.activeArrow):hover {\n  opacity: 0.0;\n  cursor: pointer;\n  transition: all ease-out 0.5s; }\n\n.buttonContainer {\n  position: absolute;\n  top: 20px;\n  right: 20px;\n  height: 20px;\n  text-align: center;\n  opacity: 1.0;\n  z-index: 200;\n  transition: all ease-out 0.5s; }\n\n.buttonContainer .action {\n  height: 100%;\n  cursor: pointer;\n  vertical-align: top; }\n\n.buttonContainer .action:focus {\n  outline: 0; }\n\n.buttonContainer .action:hover {\n  background-color: #222;\n  transition: all ease-out 0.3s; }\n\n.buttonContainer .action.close {\n  width: 26px;\n  height: 26px; }\n\nmd-button-toggle.checked {\n  background-color: #a0a0a0; }\n\n.menuButton {\n  position: absolute;\n  bottom: 20px;\n  right: 20px;\n  text-align: center;\n  opacity: 1.0;\n  z-index: 200;\n  transition: all ease-out 0.5s; }\n\n/* fallback */\n\n@font-face {\n  font-family: 'Material Icons';\n  font-style: normal;\n  font-weight: 400;\n  src: local(\"Material Icons\"), local(\"MaterialIcons-Regular\"), url(https://fonts.gstatic.com/s/materialicons/v19/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2) format(\"woff2\"); }\n\n.material-icons {\n  font-family: 'Material Icons';\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-feature-settings: 'liga';\n  -webkit-font-smoothing: antialiased; }\n"

/***/ }),

/***/ "./src/app/pages/comparegallery/viewer/viewer.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/pages/comparegallery/viewer/viewer.component.ts ***!
  \*****************************************************************/
/*! exports provided: ViewerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewerComponent", function() { return ViewerComponent; });
/* harmony import */ var _services_image_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/image.service */ "./src/app/pages/comparegallery/services/image.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ViewerComponent = /** @class */ (function () {
    function ViewerComponent(imageService) {
        var _this = this;
        this.imageService = imageService;
        this.baseUrl = '';
        this.images = [{}];
        this.currentIdx = 0;
        this.leftArrowVisible = true;
        this.rightArrowVisible = true;
        this.originImage = 'origin';
        this.capturedImage = 'captured';
        this.diffImage = 'diff';
        this.qualitySelectorShown = false;
        this.ratio = 0.5;
        imageService.imagesUpdated$.subscribe(function (images) {
            _this.images = images;
        });
        imageService.imageSelectedIndexUpdated$.subscribe(function (newIndex) {
            _this.currentIdx = newIndex;
            _this.images.forEach(function (image) { return image['active'] = false; });
            _this.images[_this.currentIdx]['active'] = true;
            _this.transform = 0;
        });
        imageService.showImageViewerChanged$.subscribe(function (showViewer) {
            _this.showViewer = showViewer;
        });
        this.math = Math;
    }
    Object.defineProperty(ViewerComponent.prototype, "leftArrowActive", {
        get: function () {
            return this.currentIdx > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewerComponent.prototype, "rightArrowActive", {
        get: function () {
            return this.currentIdx < this.images.length - 1;
        },
        enumerable: true,
        configurable: true
    });
    ViewerComponent.prototype.pan = function (swipe) {
        this.transform = swipe.deltaX;
    };
    ViewerComponent.prototype.onResize = function () {
        this.images.forEach(function (image) {
            image['viewerImageLoaded'] = false;
            image['active'] = false;
        });
        this.updateImage();
    };
    ViewerComponent.prototype.showQualitySelector = function () {
        this.qualitySelectorShown = !this.qualitySelectorShown;
    };
    ViewerComponent.prototype.imageLoaded = function (image) {
        image['viewerImageLoaded'] = true;
    };
    /**
     * direction (-1: left, 1: right)
     * swipe (user swiped)
     */
    ViewerComponent.prototype.navigate = function (direction, swipe) {
        if ((direction === 1 && this.currentIdx < this.images.length - 1) ||
            (direction === -1 && this.currentIdx > 0)) {
            if (direction === -1) {
                this.images[this.currentIdx]['transition'] = 'leaveToRight';
                this.images[this.currentIdx - 1]['transition'] = 'enterFromLeft';
            }
            else {
                this.images[this.currentIdx]['transition'] = 'leaveToLeft';
                this.images[this.currentIdx + 1]['transition'] = 'enterFromRight';
            }
            this.currentIdx += direction;
            if (swipe) {
                this.hideNavigationArrows();
            }
            else {
                this.showNavigationArrows();
            }
            this.updateImage();
        }
    };
    ViewerComponent.prototype.showNavigationArrows = function () {
        this.leftArrowVisible = true;
        this.rightArrowVisible = true;
    };
    ViewerComponent.prototype.closeViewer = function () {
        this.images.forEach(function (image) { return image['transition'] = undefined; });
        this.images.forEach(function (image) { return image['active'] = false; });
        this.imageService.showImageViewer(false);
    };
    ViewerComponent.prototype.onKeydown = function (event) {
        var prevent = [37, 39, 27, 36, 35]
            .find(function (no) { return no === event.keyCode; });
        if (prevent) {
            event.preventDefault();
        }
        switch (prevent) {
            case 37:
                // navigate left
                this.navigate(-1, false);
                break;
            case 39:
                // navigate right
                this.navigate(1, false);
                break;
            case 27:
                // esc
                this.closeViewer();
                break;
            case 36:
                // pos 1
                this.images[this.currentIdx]['transition'] = 'leaveToRight';
                this.currentIdx = 0;
                this.images[this.currentIdx]['transition'] = 'enterFromLeft';
                this.updateImage();
                break;
            case 35:
                // end
                this.images[this.currentIdx]['transition'] = 'leaveToLeft';
                this.currentIdx = this.images.length - 1;
                this.images[this.currentIdx]['transition'] = 'enterFromRight';
                this.updateImage();
                break;
            default:
                break;
        }
    };
    ViewerComponent.prototype.hideNavigationArrows = function () {
        this.leftArrowVisible = false;
        this.rightArrowVisible = false;
    };
    ViewerComponent.prototype.updateImage = function () {
        var _this = this;
        // wait for animation to end
        setTimeout(function () {
            _this.images[_this.currentIdx]['active'] = true;
            _this.images.forEach(function (image) {
                if (image !== _this.images[_this.currentIdx]) {
                    image['active'] = false;
                    _this.transform = 0;
                }
            });
        }, 500);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('baseUrl'),
        __metadata("design:type", String)
    ], ViewerComponent.prototype, "baseUrl", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('imageContainer'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], ViewerComponent.prototype, "imageContainer", void 0);
    ViewerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'ngx-viewer',
            template: __webpack_require__(/*! ./viewer.component.html */ "./src/app/pages/comparegallery/viewer/viewer.component.html"),
            styles: [__webpack_require__(/*! ./viewer.component.scss */ "./src/app/pages/comparegallery/viewer/viewer.component.scss")],
            host: {
                '(document:keydown)': 'onKeydown($event)',
            },
            animations: [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["trigger"])('imageTransition', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["state"])('enterFromRight', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({
                        opacity: 1,
                        transform: 'translate(0px, 0px)',
                    })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["state"])('enterFromLeft', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({
                        opacity: 1,
                        transform: 'translate(0px, 0px)',
                    })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["state"])('leaveToLeft', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({
                        opacity: 0,
                        transform: 'translate(-100px, 0px)',
                    })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["state"])('leaveToRight', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({
                        opacity: 0,
                        transform: 'translate(100px, 0px)',
                    })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('* => enterFromRight', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({
                            opacity: 0,
                            transform: 'translate(30px, 0px)',
                        }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])('250ms 500ms ease-in'),
                    ]),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('* => enterFromLeft', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({
                            opacity: 0,
                            transform: 'translate(-30px, 0px)',
                        }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])('250ms 500ms ease-in'),
                    ]),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('* => leaveToLeft', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({
                            opacity: 1,
                        }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])('250ms ease-out')
                    ]),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('* => leaveToRight', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({
                            opacity: 1,
                        }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])('250ms ease-out')
                    ]),
                ]),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["trigger"])('showViewerTransition', [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["state"])('true', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({
                        opacity: 1,
                    })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["state"])('void', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({
                        opacity: 0,
                    })),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('void => *', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({
                            opacity: 0,
                        }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])('1000ms ease-in')
                    ]),
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["transition"])('* => void', [
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["style"])({
                            opacity: 1,
                        }),
                        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_2__["animate"])('500ms ease-out')
                    ]),
                ]),
            ],
        }),
        __metadata("design:paramtypes", [_services_image_service__WEBPACK_IMPORTED_MODULE_0__["ImageService"]])
    ], ViewerComponent);
    return ViewerComponent;
}());



/***/ }),

/***/ "./src/app/pages/dashboard/dashboard.component.html":
/*!**********************************************************!*\
  !*** ./src/app/pages/dashboard/dashboard.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" *ngFor=\"let group of testGroups\">\r\n  <div class=\"col-xxxl-3 col-xxl-4 col-lg-5 col-md-6\" *ngFor=\"let testcase of group.testcases\">\r\n    <ngx-passrate [groupName]=\"group.groupName\"\r\n                  [tcName]=\"testcase.testName\"\r\n                  [passCount]=\"testcase.passCount\"\r\n                  [failCount]=\"testcase.failCount\"\r\n                  [passGate]=\"testcase.passGate\"\r\n                  [avgRate]=\"testcase.avgRate\"\r\n                  [testDate]=\"testcase.testDate\"\r\n                  [testTime]=\"testcase.testTime\">\r\n    </ngx-passrate>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/dashboard/dashboard.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/pages/dashboard/dashboard.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This is a starting point where we declare the maps of themes and globally available functions/mixins\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/*\n\nAccording to the specification (https://www.w3.org/TR/css-scoping-1/#host-selector)\n:host and :host-context are pseudo-classes. So we assume they could be combined,\nlike other pseudo-classes, even same ones.\nFor example: ':nth-of-type(2n):nth-of-type(even)'.\n\nIdeal solution would be to prepend any selector with :host-context([dir=rtl]).\nThen nebular components will behave as an html element and respond to [dir] attribute on any level,\nso direction could be overridden on any component level.\n\nImplementation code:\n\n@mixin nb-rtl() {\n  // add # to scss interpolation statement.\n  // it works in comments and we can't use it here\n  @at-root {selector-append(':host-context([dir=rtl])', &)} {\n    @content;\n  }\n}\n\nAnd when we call it somewhere:\n\n:host {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n:host-context(...) {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n\nResult will look like:\n\n:host-context([dir=rtl]):host .some-class {\n  ...\n}\n:host-context([dir=rtl]):host-context(...) .some-class {\n  ...\n}\n\n*\n  Side note:\n  :host-context():host selector are valid. https://lists.w3.org/Archives/Public/www-style/2015Feb/0305.html\n\n  :host-context([dir=rtl]):host-context(...) should match any permutation,\n  so order is not important.\n*\n\n\nCurrently, there're two problems with this approach:\n\nFirst, is that we can't combine :host, :host-context. Angular bugs #14349, #19199.\nFor the moment of writing, the only possible way is:\n:host {\n  :host-context(...) {\n    ...\n  }\n}\nIt doesn't work for us because mixin could be called somewhere deeper, like:\n:host {\n  p {\n    @include nb-rtl() { ... }\n  }\n}\nWe are not able to go up to :host level to place content passed to mixin.\n\nThe second problem is that we only can be sure that we appending :host-context([dir=rtl]) to another\n:host/:host-context pseudo-class when called in theme files (*.theme.scss).\n  *\n    Side note:\n    Currently, nb-install-component uses another approach where :host prepended with the theme name\n    (https://github.com/angular/angular/blob/5b96078624b0a4760f2dbcf6fdf0bd62791be5bb/packages/compiler/src/shadow_css.ts#L441),\n    but it was made to be able to use current realization of rtl and it can be rewritten back to\n    :host-context($theme) once we will be able to use multiple shadow selectors.\n  *\nBut when it's called in *.component.scss we can't be sure, that selector starts with :host/:host-context,\nbecause angular allows omitting pseudo-classes if we don't need to style :host component itself.\nWe can break such selectors, by just appending :host-context([dir=rtl]) to them.\n  ***\n    Possible solution\n    check if we in theme by some theme variables and if so append, otherwise nest like\n    @at-root :host-context([dir=rtl]) {\n      // add # to scss interpolation statement.\n      // it works in comments and we can't use it here\n      {&} {\n        @content;\n      }\n    }\n    What if :host specified? Can we add space in :host-context(...) :host?\n    Or maybe add :host selector anyway? If multiple :host selectors are allowed\n  ***\n\n\nProblems with the current approach.\n\n1. Direction can be applied only on document level, because mixin prepends theme class,\nwhich placed on the body.\n2. *.component.scss styles should be in :host selector. Otherwise angular will add host\nattribute to [dir=rtl] attribute as well.\n\n\nGeneral problems.\n\nLtr is default document direction, but for proper work of nb-ltr (means ltr only),\n[dir=ltr] should be specified at least somewhere. ':not([dir=rtl]' not applicable here,\nbecause it's satisfy any parent, that don't have [dir=rtl] attribute.\nPrevious approach was to use single rtl mixin and reset ltr properties to initial value.\nBut sometimes it's hard to find, what the previous value should be. And such mixin call looks too verbose.\n*/\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/*\n\nAccording to the specification (https://www.w3.org/TR/css-scoping-1/#host-selector)\n:host and :host-context are pseudo-classes. So we assume they could be combined,\nlike other pseudo-classes, even same ones.\nFor example: ':nth-of-type(2n):nth-of-type(even)'.\n\nIdeal solution would be to prepend any selector with :host-context([dir=rtl]).\nThen nebular components will behave as an html element and respond to [dir] attribute on any level,\nso direction could be overridden on any component level.\n\nImplementation code:\n\n@mixin nb-rtl() {\n  // add # to scss interpolation statement.\n  // it works in comments and we can't use it here\n  @at-root {selector-append(':host-context([dir=rtl])', &)} {\n    @content;\n  }\n}\n\nAnd when we call it somewhere:\n\n:host {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n:host-context(...) {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n\nResult will look like:\n\n:host-context([dir=rtl]):host .some-class {\n  ...\n}\n:host-context([dir=rtl]):host-context(...) .some-class {\n  ...\n}\n\n*\n  Side note:\n  :host-context():host selector are valid. https://lists.w3.org/Archives/Public/www-style/2015Feb/0305.html\n\n  :host-context([dir=rtl]):host-context(...) should match any permutation,\n  so order is not important.\n*\n\n\nCurrently, there're two problems with this approach:\n\nFirst, is that we can't combine :host, :host-context. Angular bugs #14349, #19199.\nFor the moment of writing, the only possible way is:\n:host {\n  :host-context(...) {\n    ...\n  }\n}\nIt doesn't work for us because mixin could be called somewhere deeper, like:\n:host {\n  p {\n    @include nb-rtl() { ... }\n  }\n}\nWe are not able to go up to :host level to place content passed to mixin.\n\nThe second problem is that we only can be sure that we appending :host-context([dir=rtl]) to another\n:host/:host-context pseudo-class when called in theme files (*.theme.scss).\n  *\n    Side note:\n    Currently, nb-install-component uses another approach where :host prepended with the theme name\n    (https://github.com/angular/angular/blob/5b96078624b0a4760f2dbcf6fdf0bd62791be5bb/packages/compiler/src/shadow_css.ts#L441),\n    but it was made to be able to use current realization of rtl and it can be rewritten back to\n    :host-context($theme) once we will be able to use multiple shadow selectors.\n  *\nBut when it's called in *.component.scss we can't be sure, that selector starts with :host/:host-context,\nbecause angular allows omitting pseudo-classes if we don't need to style :host component itself.\nWe can break such selectors, by just appending :host-context([dir=rtl]) to them.\n  ***\n    Possible solution\n    check if we in theme by some theme variables and if so append, otherwise nest like\n    @at-root :host-context([dir=rtl]) {\n      // add # to scss interpolation statement.\n      // it works in comments and we can't use it here\n      {&} {\n        @content;\n      }\n    }\n    What if :host specified? Can we add space in :host-context(...) :host?\n    Or maybe add :host selector anyway? If multiple :host selectors are allowed\n  ***\n\n\nProblems with the current approach.\n\n1. Direction can be applied only on document level, because mixin prepends theme class,\nwhich placed on the body.\n2. *.component.scss styles should be in :host selector. Otherwise angular will add host\nattribute to [dir=rtl] attribute as well.\n\n\nGeneral problems.\n\nLtr is default document direction, but for proper work of nb-ltr (means ltr only),\n[dir=ltr] should be specified at least somewhere. ':not([dir=rtl]' not applicable here,\nbecause it's satisfy any parent, that don't have [dir=rtl] attribute.\nPrevious approach was to use single rtl mixin and reset ltr properties to initial value.\nBut sometimes it's hard to find, what the previous value should be. And such mixin call looks too verbose.\n*/\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/*\n\nAccording to the specification (https://www.w3.org/TR/css-scoping-1/#host-selector)\n:host and :host-context are pseudo-classes. So we assume they could be combined,\nlike other pseudo-classes, even same ones.\nFor example: ':nth-of-type(2n):nth-of-type(even)'.\n\nIdeal solution would be to prepend any selector with :host-context([dir=rtl]).\nThen nebular components will behave as an html element and respond to [dir] attribute on any level,\nso direction could be overridden on any component level.\n\nImplementation code:\n\n@mixin nb-rtl() {\n  // add # to scss interpolation statement.\n  // it works in comments and we can't use it here\n  @at-root {selector-append(':host-context([dir=rtl])', &)} {\n    @content;\n  }\n}\n\nAnd when we call it somewhere:\n\n:host {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n:host-context(...) {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n\nResult will look like:\n\n:host-context([dir=rtl]):host .some-class {\n  ...\n}\n:host-context([dir=rtl]):host-context(...) .some-class {\n  ...\n}\n\n*\n  Side note:\n  :host-context():host selector are valid. https://lists.w3.org/Archives/Public/www-style/2015Feb/0305.html\n\n  :host-context([dir=rtl]):host-context(...) should match any permutation,\n  so order is not important.\n*\n\n\nCurrently, there're two problems with this approach:\n\nFirst, is that we can't combine :host, :host-context. Angular bugs #14349, #19199.\nFor the moment of writing, the only possible way is:\n:host {\n  :host-context(...) {\n    ...\n  }\n}\nIt doesn't work for us because mixin could be called somewhere deeper, like:\n:host {\n  p {\n    @include nb-rtl() { ... }\n  }\n}\nWe are not able to go up to :host level to place content passed to mixin.\n\nThe second problem is that we only can be sure that we appending :host-context([dir=rtl]) to another\n:host/:host-context pseudo-class when called in theme files (*.theme.scss).\n  *\n    Side note:\n    Currently, nb-install-component uses another approach where :host prepended with the theme name\n    (https://github.com/angular/angular/blob/5b96078624b0a4760f2dbcf6fdf0bd62791be5bb/packages/compiler/src/shadow_css.ts#L441),\n    but it was made to be able to use current realization of rtl and it can be rewritten back to\n    :host-context($theme) once we will be able to use multiple shadow selectors.\n  *\nBut when it's called in *.component.scss we can't be sure, that selector starts with :host/:host-context,\nbecause angular allows omitting pseudo-classes if we don't need to style :host component itself.\nWe can break such selectors, by just appending :host-context([dir=rtl]) to them.\n  ***\n    Possible solution\n    check if we in theme by some theme variables and if so append, otherwise nest like\n    @at-root :host-context([dir=rtl]) {\n      // add # to scss interpolation statement.\n      // it works in comments and we can't use it here\n      {&} {\n        @content;\n      }\n    }\n    What if :host specified? Can we add space in :host-context(...) :host?\n    Or maybe add :host selector anyway? If multiple :host selectors are allowed\n  ***\n\n\nProblems with the current approach.\n\n1. Direction can be applied only on document level, because mixin prepends theme class,\nwhich placed on the body.\n2. *.component.scss styles should be in :host selector. Otherwise angular will add host\nattribute to [dir=rtl] attribute as well.\n\n\nGeneral problems.\n\nLtr is default document direction, but for proper work of nb-ltr (means ltr only),\n[dir=ltr] should be specified at least somewhere. ':not([dir=rtl]' not applicable here,\nbecause it's satisfy any parent, that don't have [dir=rtl] attribute.\nPrevious approach was to use single rtl mixin and reset ltr properties to initial value.\nBut sometimes it's hard to find, what the previous value should be. And such mixin call looks too verbose.\n*/\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/*\n\nAccording to the specification (https://www.w3.org/TR/css-scoping-1/#host-selector)\n:host and :host-context are pseudo-classes. So we assume they could be combined,\nlike other pseudo-classes, even same ones.\nFor example: ':nth-of-type(2n):nth-of-type(even)'.\n\nIdeal solution would be to prepend any selector with :host-context([dir=rtl]).\nThen nebular components will behave as an html element and respond to [dir] attribute on any level,\nso direction could be overridden on any component level.\n\nImplementation code:\n\n@mixin nb-rtl() {\n  // add # to scss interpolation statement.\n  // it works in comments and we can't use it here\n  @at-root {selector-append(':host-context([dir=rtl])', &)} {\n    @content;\n  }\n}\n\nAnd when we call it somewhere:\n\n:host {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n:host-context(...) {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n\nResult will look like:\n\n:host-context([dir=rtl]):host .some-class {\n  ...\n}\n:host-context([dir=rtl]):host-context(...) .some-class {\n  ...\n}\n\n*\n  Side note:\n  :host-context():host selector are valid. https://lists.w3.org/Archives/Public/www-style/2015Feb/0305.html\n\n  :host-context([dir=rtl]):host-context(...) should match any permutation,\n  so order is not important.\n*\n\n\nCurrently, there're two problems with this approach:\n\nFirst, is that we can't combine :host, :host-context. Angular bugs #14349, #19199.\nFor the moment of writing, the only possible way is:\n:host {\n  :host-context(...) {\n    ...\n  }\n}\nIt doesn't work for us because mixin could be called somewhere deeper, like:\n:host {\n  p {\n    @include nb-rtl() { ... }\n  }\n}\nWe are not able to go up to :host level to place content passed to mixin.\n\nThe second problem is that we only can be sure that we appending :host-context([dir=rtl]) to another\n:host/:host-context pseudo-class when called in theme files (*.theme.scss).\n  *\n    Side note:\n    Currently, nb-install-component uses another approach where :host prepended with the theme name\n    (https://github.com/angular/angular/blob/5b96078624b0a4760f2dbcf6fdf0bd62791be5bb/packages/compiler/src/shadow_css.ts#L441),\n    but it was made to be able to use current realization of rtl and it can be rewritten back to\n    :host-context($theme) once we will be able to use multiple shadow selectors.\n  *\nBut when it's called in *.component.scss we can't be sure, that selector starts with :host/:host-context,\nbecause angular allows omitting pseudo-classes if we don't need to style :host component itself.\nWe can break such selectors, by just appending :host-context([dir=rtl]) to them.\n  ***\n    Possible solution\n    check if we in theme by some theme variables and if so append, otherwise nest like\n    @at-root :host-context([dir=rtl]) {\n      // add # to scss interpolation statement.\n      // it works in comments and we can't use it here\n      {&} {\n        @content;\n      }\n    }\n    What if :host specified? Can we add space in :host-context(...) :host?\n    Or maybe add :host selector anyway? If multiple :host selectors are allowed\n  ***\n\n\nProblems with the current approach.\n\n1. Direction can be applied only on document level, because mixin prepends theme class,\nwhich placed on the body.\n2. *.component.scss styles should be in :host selector. Otherwise angular will add host\nattribute to [dir=rtl] attribute as well.\n\n\nGeneral problems.\n\nLtr is default document direction, but for proper work of nb-ltr (means ltr only),\n[dir=ltr] should be specified at least somewhere. ':not([dir=rtl]' not applicable here,\nbecause it's satisfy any parent, that don't have [dir=rtl] attribute.\nPrevious approach was to use single rtl mixin and reset ltr properties to initial value.\nBut sometimes it's hard to find, what the previous value should be. And such mixin call looks too verbose.\n*/\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/*\n\nAccording to the specification (https://www.w3.org/TR/css-scoping-1/#host-selector)\n:host and :host-context are pseudo-classes. So we assume they could be combined,\nlike other pseudo-classes, even same ones.\nFor example: ':nth-of-type(2n):nth-of-type(even)'.\n\nIdeal solution would be to prepend any selector with :host-context([dir=rtl]).\nThen nebular components will behave as an html element and respond to [dir] attribute on any level,\nso direction could be overridden on any component level.\n\nImplementation code:\n\n@mixin nb-rtl() {\n  // add # to scss interpolation statement.\n  // it works in comments and we can't use it here\n  @at-root {selector-append(':host-context([dir=rtl])', &)} {\n    @content;\n  }\n}\n\nAnd when we call it somewhere:\n\n:host {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n:host-context(...) {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n\nResult will look like:\n\n:host-context([dir=rtl]):host .some-class {\n  ...\n}\n:host-context([dir=rtl]):host-context(...) .some-class {\n  ...\n}\n\n*\n  Side note:\n  :host-context():host selector are valid. https://lists.w3.org/Archives/Public/www-style/2015Feb/0305.html\n\n  :host-context([dir=rtl]):host-context(...) should match any permutation,\n  so order is not important.\n*\n\n\nCurrently, there're two problems with this approach:\n\nFirst, is that we can't combine :host, :host-context. Angular bugs #14349, #19199.\nFor the moment of writing, the only possible way is:\n:host {\n  :host-context(...) {\n    ...\n  }\n}\nIt doesn't work for us because mixin could be called somewhere deeper, like:\n:host {\n  p {\n    @include nb-rtl() { ... }\n  }\n}\nWe are not able to go up to :host level to place content passed to mixin.\n\nThe second problem is that we only can be sure that we appending :host-context([dir=rtl]) to another\n:host/:host-context pseudo-class when called in theme files (*.theme.scss).\n  *\n    Side note:\n    Currently, nb-install-component uses another approach where :host prepended with the theme name\n    (https://github.com/angular/angular/blob/5b96078624b0a4760f2dbcf6fdf0bd62791be5bb/packages/compiler/src/shadow_css.ts#L441),\n    but it was made to be able to use current realization of rtl and it can be rewritten back to\n    :host-context($theme) once we will be able to use multiple shadow selectors.\n  *\nBut when it's called in *.component.scss we can't be sure, that selector starts with :host/:host-context,\nbecause angular allows omitting pseudo-classes if we don't need to style :host component itself.\nWe can break such selectors, by just appending :host-context([dir=rtl]) to them.\n  ***\n    Possible solution\n    check if we in theme by some theme variables and if so append, otherwise nest like\n    @at-root :host-context([dir=rtl]) {\n      // add # to scss interpolation statement.\n      // it works in comments and we can't use it here\n      {&} {\n        @content;\n      }\n    }\n    What if :host specified? Can we add space in :host-context(...) :host?\n    Or maybe add :host selector anyway? If multiple :host selectors are allowed\n  ***\n\n\nProblems with the current approach.\n\n1. Direction can be applied only on document level, because mixin prepends theme class,\nwhich placed on the body.\n2. *.component.scss styles should be in :host selector. Otherwise angular will add host\nattribute to [dir=rtl] attribute as well.\n\n\nGeneral problems.\n\nLtr is default document direction, but for proper work of nb-ltr (means ltr only),\n[dir=ltr] should be specified at least somewhere. ':not([dir=rtl]' not applicable here,\nbecause it's satisfy any parent, that don't have [dir=rtl] attribute.\nPrevious approach was to use single rtl mixin and reset ltr properties to initial value.\nBut sometimes it's hard to find, what the previous value should be. And such mixin call looks too verbose.\n*/\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/*\n\nAccording to the specification (https://www.w3.org/TR/css-scoping-1/#host-selector)\n:host and :host-context are pseudo-classes. So we assume they could be combined,\nlike other pseudo-classes, even same ones.\nFor example: ':nth-of-type(2n):nth-of-type(even)'.\n\nIdeal solution would be to prepend any selector with :host-context([dir=rtl]).\nThen nebular components will behave as an html element and respond to [dir] attribute on any level,\nso direction could be overridden on any component level.\n\nImplementation code:\n\n@mixin nb-rtl() {\n  // add # to scss interpolation statement.\n  // it works in comments and we can't use it here\n  @at-root {selector-append(':host-context([dir=rtl])', &)} {\n    @content;\n  }\n}\n\nAnd when we call it somewhere:\n\n:host {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n:host-context(...) {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n\nResult will look like:\n\n:host-context([dir=rtl]):host .some-class {\n  ...\n}\n:host-context([dir=rtl]):host-context(...) .some-class {\n  ...\n}\n\n*\n  Side note:\n  :host-context():host selector are valid. https://lists.w3.org/Archives/Public/www-style/2015Feb/0305.html\n\n  :host-context([dir=rtl]):host-context(...) should match any permutation,\n  so order is not important.\n*\n\n\nCurrently, there're two problems with this approach:\n\nFirst, is that we can't combine :host, :host-context. Angular bugs #14349, #19199.\nFor the moment of writing, the only possible way is:\n:host {\n  :host-context(...) {\n    ...\n  }\n}\nIt doesn't work for us because mixin could be called somewhere deeper, like:\n:host {\n  p {\n    @include nb-rtl() { ... }\n  }\n}\nWe are not able to go up to :host level to place content passed to mixin.\n\nThe second problem is that we only can be sure that we appending :host-context([dir=rtl]) to another\n:host/:host-context pseudo-class when called in theme files (*.theme.scss).\n  *\n    Side note:\n    Currently, nb-install-component uses another approach where :host prepended with the theme name\n    (https://github.com/angular/angular/blob/5b96078624b0a4760f2dbcf6fdf0bd62791be5bb/packages/compiler/src/shadow_css.ts#L441),\n    but it was made to be able to use current realization of rtl and it can be rewritten back to\n    :host-context($theme) once we will be able to use multiple shadow selectors.\n  *\nBut when it's called in *.component.scss we can't be sure, that selector starts with :host/:host-context,\nbecause angular allows omitting pseudo-classes if we don't need to style :host component itself.\nWe can break such selectors, by just appending :host-context([dir=rtl]) to them.\n  ***\n    Possible solution\n    check if we in theme by some theme variables and if so append, otherwise nest like\n    @at-root :host-context([dir=rtl]) {\n      // add # to scss interpolation statement.\n      // it works in comments and we can't use it here\n      {&} {\n        @content;\n      }\n    }\n    What if :host specified? Can we add space in :host-context(...) :host?\n    Or maybe add :host selector anyway? If multiple :host selectors are allowed\n  ***\n\n\nProblems with the current approach.\n\n1. Direction can be applied only on document level, because mixin prepends theme class,\nwhich placed on the body.\n2. *.component.scss styles should be in :host selector. Otherwise angular will add host\nattribute to [dir=rtl] attribute as well.\n\n\nGeneral problems.\n\nLtr is default document direction, but for proper work of nb-ltr (means ltr only),\n[dir=ltr] should be specified at least somewhere. ':not([dir=rtl]' not applicable here,\nbecause it's satisfy any parent, that don't have [dir=rtl] attribute.\nPrevious approach was to use single rtl mixin and reset ltr properties to initial value.\nBut sometimes it's hard to find, what the previous value should be. And such mixin call looks too verbose.\n*/\n/*!\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/*\n      :host can be prefixed\n      https://github.com/angular/angular/blob/8d0ee34939f14c07876d222c25b405ed458a34d3/packages/compiler/src/shadow_css.ts#L441\n\n      We have to use :host insted of :host-context($theme), to be able to prefix theme class\n      with something defined inside of @content, by prefixing &.\n      For example this scss code:\n        .nb-theme-default {\n          .some-selector & {\n            ...\n          }\n        }\n      Will result in next css:\n        .some-selector .nb-theme-default {\n          ...\n        }\n\n      It doesn't work with :host-context because angular splitting it in two selectors and removes\n      prefix in one of the selectors.\n    */\n.nb-theme-default :host .solar-card nb-card-header {\n  border: none;\n  padding-bottom: 0; }\n@media (max-width: 767.98px) {\n  .nb-theme-default :host ngx-traffic {\n    display: none; } }\n@media (max-width: 575.98px) {\n  .nb-theme-default :host /deep/ nb-card.large-card {\n    height: 456px; } }\n/*\n      :host can be prefixed\n      https://github.com/angular/angular/blob/8d0ee34939f14c07876d222c25b405ed458a34d3/packages/compiler/src/shadow_css.ts#L441\n\n      We have to use :host insted of :host-context($theme), to be able to prefix theme class\n      with something defined inside of @content, by prefixing &.\n      For example this scss code:\n        .nb-theme-default {\n          .some-selector & {\n            ...\n          }\n        }\n      Will result in next css:\n        .some-selector .nb-theme-default {\n          ...\n        }\n\n      It doesn't work with :host-context because angular splitting it in two selectors and removes\n      prefix in one of the selectors.\n    */\n.nb-theme-cosmic :host .solar-card nb-card-header {\n  border: none;\n  padding-bottom: 0; }\n@media (max-width: 767.98px) {\n  .nb-theme-cosmic :host ngx-traffic {\n    display: none; } }\n@media (max-width: 575.98px) {\n  .nb-theme-cosmic :host /deep/ nb-card.large-card {\n    height: 456px; } }\n/*\n      :host can be prefixed\n      https://github.com/angular/angular/blob/8d0ee34939f14c07876d222c25b405ed458a34d3/packages/compiler/src/shadow_css.ts#L441\n\n      We have to use :host insted of :host-context($theme), to be able to prefix theme class\n      with something defined inside of @content, by prefixing &.\n      For example this scss code:\n        .nb-theme-default {\n          .some-selector & {\n            ...\n          }\n        }\n      Will result in next css:\n        .some-selector .nb-theme-default {\n          ...\n        }\n\n      It doesn't work with :host-context because angular splitting it in two selectors and removes\n      prefix in one of the selectors.\n    */\n.nb-theme-corporate :host .solar-card nb-card-header {\n  border: none;\n  padding-bottom: 0; }\n@media (max-width: 767.98px) {\n  .nb-theme-corporate :host ngx-traffic {\n    display: none; } }\n@media (max-width: 575.98px) {\n  .nb-theme-corporate :host /deep/ nb-card.large-card {\n    height: 456px; } }\n"

/***/ }),

/***/ "./src/app/pages/dashboard/dashboard.component.ts":
/*!********************************************************!*\
  !*** ./src/app/pages/dashboard/dashboard.component.ts ***!
  \********************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _nebular_theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nebular/theme */ "./node_modules/@nebular/theme/index.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
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
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(themeService, http, router) {
        var _this = this;
        this.themeService = themeService;
        this.http = http;
        this.router = router;
        this.lightCard = {
            title: 'Light',
            iconClass: 'nb-lightbulb',
            type: 'primary',
        };
        this.rollerShadesCard = {
            title: 'Roller Shades',
            iconClass: 'nb-roller-shades',
            type: 'success',
        };
        this.wirelessAudioCard = {
            title: 'Wireless Audio',
            iconClass: 'nb-audio',
            type: 'info',
        };
        this.coffeeMakerCard = {
            title: 'Coffee Maker',
            iconClass: 'nb-coffee-maker',
            type: 'warning',
        };
        this.commonStatusCardsSet = [
            this.lightCard,
            this.rollerShadesCard,
            this.wirelessAudioCard,
            this.coffeeMakerCard,
        ];
        this.statusCardsByThemes = {
            default: this.commonStatusCardsSet,
            cosmic: this.commonStatusCardsSet,
            corporate: [
                __assign({}, this.lightCard, { type: 'warning' }),
                __assign({}, this.rollerShadesCard, { type: 'primary' }),
                __assign({}, this.wirelessAudioCard, { type: 'danger' }),
                __assign({}, this.coffeeMakerCard, { type: 'secondary' }),
            ],
        };
        this.navigationSubscription = this.router.events.subscribe(function (e) {
            if (e instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationEnd"]) {
                _this.refreshInit();
            }
        });
    }
    DashboardComponent.prototype.refreshInit = function () {
        var _this = this;
        this.http
            .get(_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].apiBase + '/api/file/dashboard')
            .subscribe(function (groups) {
            _this.testGroups = groups;
            console.log(_this.testGroups);
        });
    };
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.themeService.getJsTheme()
            .subscribe(function (theme) {
            _this.statusCards = _this.statusCardsByThemes[theme.name];
        });
    };
    DashboardComponent.prototype.ngOnDestroy = function () {
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    };
    DashboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ngx-dashboard',
            styles: [__webpack_require__(/*! ./dashboard.component.scss */ "./src/app/pages/dashboard/dashboard.component.scss")],
            template: __webpack_require__(/*! ./dashboard.component.html */ "./src/app/pages/dashboard/dashboard.component.html"),
        }),
        __metadata("design:paramtypes", [_nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbThemeService"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/pages/dashboard/dashboard.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/pages/dashboard/dashboard.module.ts ***!
  \*****************************************************/
/*! exports provided: DashboardModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardModule", function() { return DashboardModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _theme_theme_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../@theme/theme.module */ "./src/app/@theme/theme.module.ts");
/* harmony import */ var ngx_echarts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-echarts */ "./node_modules/ngx-echarts/ngx-echarts.es5.js");
/* harmony import */ var _dashboard_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dashboard.component */ "./src/app/pages/dashboard/dashboard.component.ts");
/* harmony import */ var _passrate_passrate_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./passrate/passrate.component */ "./src/app/pages/dashboard/passrate/passrate.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var DashboardModule = /** @class */ (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _theme_theme_module__WEBPACK_IMPORTED_MODULE_1__["ThemeModule"],
                ngx_echarts__WEBPACK_IMPORTED_MODULE_2__["NgxEchartsModule"],
            ],
            declarations: [
                _dashboard_component__WEBPACK_IMPORTED_MODULE_3__["DashboardComponent"],
                _passrate_passrate_component__WEBPACK_IMPORTED_MODULE_4__["PassRateComponent"],
            ],
        })
    ], DashboardModule);
    return DashboardModule;
}());



/***/ }),

/***/ "./src/app/pages/dashboard/passrate/passrate.component.html":
/*!******************************************************************!*\
  !*** ./src/app/pages/dashboard/passrate/passrate.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nb-card size=\"xsmall\" class=\"solar-card\" (click)=\"moveHistory()\">\r\n  <nb-card-header>{{ groupName }} / {{ tcName }}</nb-card-header>\r\n  <nb-card-body>\r\n    <div echarts [options]=\"option\" class=\"echart\">\r\n    </div>\r\n    <div class=\"info\">\r\n      <div class=\"value\">Pass : {{ pass }} / {{ pass+fail }}</div>\r\n      <div class=\"details\">{{ testDate }} {{ testTime }}</div>\r\n      <div class=\"details\"><span>Pass Gate : </span> {{ passGate }}%</div>\r\n      <div class=\"details\"><span>Total Count : </span> {{ pass+fail }}</div>\r\n      <div class=\"details\"><span>Pass Count : </span> {{ pass }}</div>\r\n      <div class=\"details\"><span>Matching Rate : </span> {{ avgRate }}%</div>\r\n    </div>\r\n  </nb-card-body>\r\n</nb-card>\r\n"

/***/ }),

/***/ "./src/app/pages/dashboard/passrate/passrate.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/pages/dashboard/passrate/passrate.component.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This is a starting point where we declare the maps of themes and globally available functions/mixins\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/*\n\nAccording to the specification (https://www.w3.org/TR/css-scoping-1/#host-selector)\n:host and :host-context are pseudo-classes. So we assume they could be combined,\nlike other pseudo-classes, even same ones.\nFor example: ':nth-of-type(2n):nth-of-type(even)'.\n\nIdeal solution would be to prepend any selector with :host-context([dir=rtl]).\nThen nebular components will behave as an html element and respond to [dir] attribute on any level,\nso direction could be overridden on any component level.\n\nImplementation code:\n\n@mixin nb-rtl() {\n  // add # to scss interpolation statement.\n  // it works in comments and we can't use it here\n  @at-root {selector-append(':host-context([dir=rtl])', &)} {\n    @content;\n  }\n}\n\nAnd when we call it somewhere:\n\n:host {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n:host-context(...) {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n\nResult will look like:\n\n:host-context([dir=rtl]):host .some-class {\n  ...\n}\n:host-context([dir=rtl]):host-context(...) .some-class {\n  ...\n}\n\n*\n  Side note:\n  :host-context():host selector are valid. https://lists.w3.org/Archives/Public/www-style/2015Feb/0305.html\n\n  :host-context([dir=rtl]):host-context(...) should match any permutation,\n  so order is not important.\n*\n\n\nCurrently, there're two problems with this approach:\n\nFirst, is that we can't combine :host, :host-context. Angular bugs #14349, #19199.\nFor the moment of writing, the only possible way is:\n:host {\n  :host-context(...) {\n    ...\n  }\n}\nIt doesn't work for us because mixin could be called somewhere deeper, like:\n:host {\n  p {\n    @include nb-rtl() { ... }\n  }\n}\nWe are not able to go up to :host level to place content passed to mixin.\n\nThe second problem is that we only can be sure that we appending :host-context([dir=rtl]) to another\n:host/:host-context pseudo-class when called in theme files (*.theme.scss).\n  *\n    Side note:\n    Currently, nb-install-component uses another approach where :host prepended with the theme name\n    (https://github.com/angular/angular/blob/5b96078624b0a4760f2dbcf6fdf0bd62791be5bb/packages/compiler/src/shadow_css.ts#L441),\n    but it was made to be able to use current realization of rtl and it can be rewritten back to\n    :host-context($theme) once we will be able to use multiple shadow selectors.\n  *\nBut when it's called in *.component.scss we can't be sure, that selector starts with :host/:host-context,\nbecause angular allows omitting pseudo-classes if we don't need to style :host component itself.\nWe can break such selectors, by just appending :host-context([dir=rtl]) to them.\n  ***\n    Possible solution\n    check if we in theme by some theme variables and if so append, otherwise nest like\n    @at-root :host-context([dir=rtl]) {\n      // add # to scss interpolation statement.\n      // it works in comments and we can't use it here\n      {&} {\n        @content;\n      }\n    }\n    What if :host specified? Can we add space in :host-context(...) :host?\n    Or maybe add :host selector anyway? If multiple :host selectors are allowed\n  ***\n\n\nProblems with the current approach.\n\n1. Direction can be applied only on document level, because mixin prepends theme class,\nwhich placed on the body.\n2. *.component.scss styles should be in :host selector. Otherwise angular will add host\nattribute to [dir=rtl] attribute as well.\n\n\nGeneral problems.\n\nLtr is default document direction, but for proper work of nb-ltr (means ltr only),\n[dir=ltr] should be specified at least somewhere. ':not([dir=rtl]' not applicable here,\nbecause it's satisfy any parent, that don't have [dir=rtl] attribute.\nPrevious approach was to use single rtl mixin and reset ltr properties to initial value.\nBut sometimes it's hard to find, what the previous value should be. And such mixin call looks too verbose.\n*/\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/*\n\nAccording to the specification (https://www.w3.org/TR/css-scoping-1/#host-selector)\n:host and :host-context are pseudo-classes. So we assume they could be combined,\nlike other pseudo-classes, even same ones.\nFor example: ':nth-of-type(2n):nth-of-type(even)'.\n\nIdeal solution would be to prepend any selector with :host-context([dir=rtl]).\nThen nebular components will behave as an html element and respond to [dir] attribute on any level,\nso direction could be overridden on any component level.\n\nImplementation code:\n\n@mixin nb-rtl() {\n  // add # to scss interpolation statement.\n  // it works in comments and we can't use it here\n  @at-root {selector-append(':host-context([dir=rtl])', &)} {\n    @content;\n  }\n}\n\nAnd when we call it somewhere:\n\n:host {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n:host-context(...) {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n\nResult will look like:\n\n:host-context([dir=rtl]):host .some-class {\n  ...\n}\n:host-context([dir=rtl]):host-context(...) .some-class {\n  ...\n}\n\n*\n  Side note:\n  :host-context():host selector are valid. https://lists.w3.org/Archives/Public/www-style/2015Feb/0305.html\n\n  :host-context([dir=rtl]):host-context(...) should match any permutation,\n  so order is not important.\n*\n\n\nCurrently, there're two problems with this approach:\n\nFirst, is that we can't combine :host, :host-context. Angular bugs #14349, #19199.\nFor the moment of writing, the only possible way is:\n:host {\n  :host-context(...) {\n    ...\n  }\n}\nIt doesn't work for us because mixin could be called somewhere deeper, like:\n:host {\n  p {\n    @include nb-rtl() { ... }\n  }\n}\nWe are not able to go up to :host level to place content passed to mixin.\n\nThe second problem is that we only can be sure that we appending :host-context([dir=rtl]) to another\n:host/:host-context pseudo-class when called in theme files (*.theme.scss).\n  *\n    Side note:\n    Currently, nb-install-component uses another approach where :host prepended with the theme name\n    (https://github.com/angular/angular/blob/5b96078624b0a4760f2dbcf6fdf0bd62791be5bb/packages/compiler/src/shadow_css.ts#L441),\n    but it was made to be able to use current realization of rtl and it can be rewritten back to\n    :host-context($theme) once we will be able to use multiple shadow selectors.\n  *\nBut when it's called in *.component.scss we can't be sure, that selector starts with :host/:host-context,\nbecause angular allows omitting pseudo-classes if we don't need to style :host component itself.\nWe can break such selectors, by just appending :host-context([dir=rtl]) to them.\n  ***\n    Possible solution\n    check if we in theme by some theme variables and if so append, otherwise nest like\n    @at-root :host-context([dir=rtl]) {\n      // add # to scss interpolation statement.\n      // it works in comments and we can't use it here\n      {&} {\n        @content;\n      }\n    }\n    What if :host specified? Can we add space in :host-context(...) :host?\n    Or maybe add :host selector anyway? If multiple :host selectors are allowed\n  ***\n\n\nProblems with the current approach.\n\n1. Direction can be applied only on document level, because mixin prepends theme class,\nwhich placed on the body.\n2. *.component.scss styles should be in :host selector. Otherwise angular will add host\nattribute to [dir=rtl] attribute as well.\n\n\nGeneral problems.\n\nLtr is default document direction, but for proper work of nb-ltr (means ltr only),\n[dir=ltr] should be specified at least somewhere. ':not([dir=rtl]' not applicable here,\nbecause it's satisfy any parent, that don't have [dir=rtl] attribute.\nPrevious approach was to use single rtl mixin and reset ltr properties to initial value.\nBut sometimes it's hard to find, what the previous value should be. And such mixin call looks too verbose.\n*/\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/*\n\nAccording to the specification (https://www.w3.org/TR/css-scoping-1/#host-selector)\n:host and :host-context are pseudo-classes. So we assume they could be combined,\nlike other pseudo-classes, even same ones.\nFor example: ':nth-of-type(2n):nth-of-type(even)'.\n\nIdeal solution would be to prepend any selector with :host-context([dir=rtl]).\nThen nebular components will behave as an html element and respond to [dir] attribute on any level,\nso direction could be overridden on any component level.\n\nImplementation code:\n\n@mixin nb-rtl() {\n  // add # to scss interpolation statement.\n  // it works in comments and we can't use it here\n  @at-root {selector-append(':host-context([dir=rtl])', &)} {\n    @content;\n  }\n}\n\nAnd when we call it somewhere:\n\n:host {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n:host-context(...) {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n\nResult will look like:\n\n:host-context([dir=rtl]):host .some-class {\n  ...\n}\n:host-context([dir=rtl]):host-context(...) .some-class {\n  ...\n}\n\n*\n  Side note:\n  :host-context():host selector are valid. https://lists.w3.org/Archives/Public/www-style/2015Feb/0305.html\n\n  :host-context([dir=rtl]):host-context(...) should match any permutation,\n  so order is not important.\n*\n\n\nCurrently, there're two problems with this approach:\n\nFirst, is that we can't combine :host, :host-context. Angular bugs #14349, #19199.\nFor the moment of writing, the only possible way is:\n:host {\n  :host-context(...) {\n    ...\n  }\n}\nIt doesn't work for us because mixin could be called somewhere deeper, like:\n:host {\n  p {\n    @include nb-rtl() { ... }\n  }\n}\nWe are not able to go up to :host level to place content passed to mixin.\n\nThe second problem is that we only can be sure that we appending :host-context([dir=rtl]) to another\n:host/:host-context pseudo-class when called in theme files (*.theme.scss).\n  *\n    Side note:\n    Currently, nb-install-component uses another approach where :host prepended with the theme name\n    (https://github.com/angular/angular/blob/5b96078624b0a4760f2dbcf6fdf0bd62791be5bb/packages/compiler/src/shadow_css.ts#L441),\n    but it was made to be able to use current realization of rtl and it can be rewritten back to\n    :host-context($theme) once we will be able to use multiple shadow selectors.\n  *\nBut when it's called in *.component.scss we can't be sure, that selector starts with :host/:host-context,\nbecause angular allows omitting pseudo-classes if we don't need to style :host component itself.\nWe can break such selectors, by just appending :host-context([dir=rtl]) to them.\n  ***\n    Possible solution\n    check if we in theme by some theme variables and if so append, otherwise nest like\n    @at-root :host-context([dir=rtl]) {\n      // add # to scss interpolation statement.\n      // it works in comments and we can't use it here\n      {&} {\n        @content;\n      }\n    }\n    What if :host specified? Can we add space in :host-context(...) :host?\n    Or maybe add :host selector anyway? If multiple :host selectors are allowed\n  ***\n\n\nProblems with the current approach.\n\n1. Direction can be applied only on document level, because mixin prepends theme class,\nwhich placed on the body.\n2. *.component.scss styles should be in :host selector. Otherwise angular will add host\nattribute to [dir=rtl] attribute as well.\n\n\nGeneral problems.\n\nLtr is default document direction, but for proper work of nb-ltr (means ltr only),\n[dir=ltr] should be specified at least somewhere. ':not([dir=rtl]' not applicable here,\nbecause it's satisfy any parent, that don't have [dir=rtl] attribute.\nPrevious approach was to use single rtl mixin and reset ltr properties to initial value.\nBut sometimes it's hard to find, what the previous value should be. And such mixin call looks too verbose.\n*/\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/*\n\nAccording to the specification (https://www.w3.org/TR/css-scoping-1/#host-selector)\n:host and :host-context are pseudo-classes. So we assume they could be combined,\nlike other pseudo-classes, even same ones.\nFor example: ':nth-of-type(2n):nth-of-type(even)'.\n\nIdeal solution would be to prepend any selector with :host-context([dir=rtl]).\nThen nebular components will behave as an html element and respond to [dir] attribute on any level,\nso direction could be overridden on any component level.\n\nImplementation code:\n\n@mixin nb-rtl() {\n  // add # to scss interpolation statement.\n  // it works in comments and we can't use it here\n  @at-root {selector-append(':host-context([dir=rtl])', &)} {\n    @content;\n  }\n}\n\nAnd when we call it somewhere:\n\n:host {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n:host-context(...) {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n\nResult will look like:\n\n:host-context([dir=rtl]):host .some-class {\n  ...\n}\n:host-context([dir=rtl]):host-context(...) .some-class {\n  ...\n}\n\n*\n  Side note:\n  :host-context():host selector are valid. https://lists.w3.org/Archives/Public/www-style/2015Feb/0305.html\n\n  :host-context([dir=rtl]):host-context(...) should match any permutation,\n  so order is not important.\n*\n\n\nCurrently, there're two problems with this approach:\n\nFirst, is that we can't combine :host, :host-context. Angular bugs #14349, #19199.\nFor the moment of writing, the only possible way is:\n:host {\n  :host-context(...) {\n    ...\n  }\n}\nIt doesn't work for us because mixin could be called somewhere deeper, like:\n:host {\n  p {\n    @include nb-rtl() { ... }\n  }\n}\nWe are not able to go up to :host level to place content passed to mixin.\n\nThe second problem is that we only can be sure that we appending :host-context([dir=rtl]) to another\n:host/:host-context pseudo-class when called in theme files (*.theme.scss).\n  *\n    Side note:\n    Currently, nb-install-component uses another approach where :host prepended with the theme name\n    (https://github.com/angular/angular/blob/5b96078624b0a4760f2dbcf6fdf0bd62791be5bb/packages/compiler/src/shadow_css.ts#L441),\n    but it was made to be able to use current realization of rtl and it can be rewritten back to\n    :host-context($theme) once we will be able to use multiple shadow selectors.\n  *\nBut when it's called in *.component.scss we can't be sure, that selector starts with :host/:host-context,\nbecause angular allows omitting pseudo-classes if we don't need to style :host component itself.\nWe can break such selectors, by just appending :host-context([dir=rtl]) to them.\n  ***\n    Possible solution\n    check if we in theme by some theme variables and if so append, otherwise nest like\n    @at-root :host-context([dir=rtl]) {\n      // add # to scss interpolation statement.\n      // it works in comments and we can't use it here\n      {&} {\n        @content;\n      }\n    }\n    What if :host specified? Can we add space in :host-context(...) :host?\n    Or maybe add :host selector anyway? If multiple :host selectors are allowed\n  ***\n\n\nProblems with the current approach.\n\n1. Direction can be applied only on document level, because mixin prepends theme class,\nwhich placed on the body.\n2. *.component.scss styles should be in :host selector. Otherwise angular will add host\nattribute to [dir=rtl] attribute as well.\n\n\nGeneral problems.\n\nLtr is default document direction, but for proper work of nb-ltr (means ltr only),\n[dir=ltr] should be specified at least somewhere. ':not([dir=rtl]' not applicable here,\nbecause it's satisfy any parent, that don't have [dir=rtl] attribute.\nPrevious approach was to use single rtl mixin and reset ltr properties to initial value.\nBut sometimes it's hard to find, what the previous value should be. And such mixin call looks too verbose.\n*/\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/*\n\nAccording to the specification (https://www.w3.org/TR/css-scoping-1/#host-selector)\n:host and :host-context are pseudo-classes. So we assume they could be combined,\nlike other pseudo-classes, even same ones.\nFor example: ':nth-of-type(2n):nth-of-type(even)'.\n\nIdeal solution would be to prepend any selector with :host-context([dir=rtl]).\nThen nebular components will behave as an html element and respond to [dir] attribute on any level,\nso direction could be overridden on any component level.\n\nImplementation code:\n\n@mixin nb-rtl() {\n  // add # to scss interpolation statement.\n  // it works in comments and we can't use it here\n  @at-root {selector-append(':host-context([dir=rtl])', &)} {\n    @content;\n  }\n}\n\nAnd when we call it somewhere:\n\n:host {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n:host-context(...) {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n\nResult will look like:\n\n:host-context([dir=rtl]):host .some-class {\n  ...\n}\n:host-context([dir=rtl]):host-context(...) .some-class {\n  ...\n}\n\n*\n  Side note:\n  :host-context():host selector are valid. https://lists.w3.org/Archives/Public/www-style/2015Feb/0305.html\n\n  :host-context([dir=rtl]):host-context(...) should match any permutation,\n  so order is not important.\n*\n\n\nCurrently, there're two problems with this approach:\n\nFirst, is that we can't combine :host, :host-context. Angular bugs #14349, #19199.\nFor the moment of writing, the only possible way is:\n:host {\n  :host-context(...) {\n    ...\n  }\n}\nIt doesn't work for us because mixin could be called somewhere deeper, like:\n:host {\n  p {\n    @include nb-rtl() { ... }\n  }\n}\nWe are not able to go up to :host level to place content passed to mixin.\n\nThe second problem is that we only can be sure that we appending :host-context([dir=rtl]) to another\n:host/:host-context pseudo-class when called in theme files (*.theme.scss).\n  *\n    Side note:\n    Currently, nb-install-component uses another approach where :host prepended with the theme name\n    (https://github.com/angular/angular/blob/5b96078624b0a4760f2dbcf6fdf0bd62791be5bb/packages/compiler/src/shadow_css.ts#L441),\n    but it was made to be able to use current realization of rtl and it can be rewritten back to\n    :host-context($theme) once we will be able to use multiple shadow selectors.\n  *\nBut when it's called in *.component.scss we can't be sure, that selector starts with :host/:host-context,\nbecause angular allows omitting pseudo-classes if we don't need to style :host component itself.\nWe can break such selectors, by just appending :host-context([dir=rtl]) to them.\n  ***\n    Possible solution\n    check if we in theme by some theme variables and if so append, otherwise nest like\n    @at-root :host-context([dir=rtl]) {\n      // add # to scss interpolation statement.\n      // it works in comments and we can't use it here\n      {&} {\n        @content;\n      }\n    }\n    What if :host specified? Can we add space in :host-context(...) :host?\n    Or maybe add :host selector anyway? If multiple :host selectors are allowed\n  ***\n\n\nProblems with the current approach.\n\n1. Direction can be applied only on document level, because mixin prepends theme class,\nwhich placed on the body.\n2. *.component.scss styles should be in :host selector. Otherwise angular will add host\nattribute to [dir=rtl] attribute as well.\n\n\nGeneral problems.\n\nLtr is default document direction, but for proper work of nb-ltr (means ltr only),\n[dir=ltr] should be specified at least somewhere. ':not([dir=rtl]' not applicable here,\nbecause it's satisfy any parent, that don't have [dir=rtl] attribute.\nPrevious approach was to use single rtl mixin and reset ltr properties to initial value.\nBut sometimes it's hard to find, what the previous value should be. And such mixin call looks too verbose.\n*/\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/*\n\nAccording to the specification (https://www.w3.org/TR/css-scoping-1/#host-selector)\n:host and :host-context are pseudo-classes. So we assume they could be combined,\nlike other pseudo-classes, even same ones.\nFor example: ':nth-of-type(2n):nth-of-type(even)'.\n\nIdeal solution would be to prepend any selector with :host-context([dir=rtl]).\nThen nebular components will behave as an html element and respond to [dir] attribute on any level,\nso direction could be overridden on any component level.\n\nImplementation code:\n\n@mixin nb-rtl() {\n  // add # to scss interpolation statement.\n  // it works in comments and we can't use it here\n  @at-root {selector-append(':host-context([dir=rtl])', &)} {\n    @content;\n  }\n}\n\nAnd when we call it somewhere:\n\n:host {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n:host-context(...) {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n\nResult will look like:\n\n:host-context([dir=rtl]):host .some-class {\n  ...\n}\n:host-context([dir=rtl]):host-context(...) .some-class {\n  ...\n}\n\n*\n  Side note:\n  :host-context():host selector are valid. https://lists.w3.org/Archives/Public/www-style/2015Feb/0305.html\n\n  :host-context([dir=rtl]):host-context(...) should match any permutation,\n  so order is not important.\n*\n\n\nCurrently, there're two problems with this approach:\n\nFirst, is that we can't combine :host, :host-context. Angular bugs #14349, #19199.\nFor the moment of writing, the only possible way is:\n:host {\n  :host-context(...) {\n    ...\n  }\n}\nIt doesn't work for us because mixin could be called somewhere deeper, like:\n:host {\n  p {\n    @include nb-rtl() { ... }\n  }\n}\nWe are not able to go up to :host level to place content passed to mixin.\n\nThe second problem is that we only can be sure that we appending :host-context([dir=rtl]) to another\n:host/:host-context pseudo-class when called in theme files (*.theme.scss).\n  *\n    Side note:\n    Currently, nb-install-component uses another approach where :host prepended with the theme name\n    (https://github.com/angular/angular/blob/5b96078624b0a4760f2dbcf6fdf0bd62791be5bb/packages/compiler/src/shadow_css.ts#L441),\n    but it was made to be able to use current realization of rtl and it can be rewritten back to\n    :host-context($theme) once we will be able to use multiple shadow selectors.\n  *\nBut when it's called in *.component.scss we can't be sure, that selector starts with :host/:host-context,\nbecause angular allows omitting pseudo-classes if we don't need to style :host component itself.\nWe can break such selectors, by just appending :host-context([dir=rtl]) to them.\n  ***\n    Possible solution\n    check if we in theme by some theme variables and if so append, otherwise nest like\n    @at-root :host-context([dir=rtl]) {\n      // add # to scss interpolation statement.\n      // it works in comments and we can't use it here\n      {&} {\n        @content;\n      }\n    }\n    What if :host specified? Can we add space in :host-context(...) :host?\n    Or maybe add :host selector anyway? If multiple :host selectors are allowed\n  ***\n\n\nProblems with the current approach.\n\n1. Direction can be applied only on document level, because mixin prepends theme class,\nwhich placed on the body.\n2. *.component.scss styles should be in :host selector. Otherwise angular will add host\nattribute to [dir=rtl] attribute as well.\n\n\nGeneral problems.\n\nLtr is default document direction, but for proper work of nb-ltr (means ltr only),\n[dir=ltr] should be specified at least somewhere. ':not([dir=rtl]' not applicable here,\nbecause it's satisfy any parent, that don't have [dir=rtl] attribute.\nPrevious approach was to use single rtl mixin and reset ltr properties to initial value.\nBut sometimes it's hard to find, what the previous value should be. And such mixin call looks too verbose.\n*/\n/*!\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/*\n      :host can be prefixed\n      https://github.com/angular/angular/blob/8d0ee34939f14c07876d222c25b405ed458a34d3/packages/compiler/src/shadow_css.ts#L441\n\n      We have to use :host insted of :host-context($theme), to be able to prefix theme class\n      with something defined inside of @content, by prefixing &.\n      For example this scss code:\n        .nb-theme-default {\n          .some-selector & {\n            ...\n          }\n        }\n      Will result in next css:\n        .some-selector .nb-theme-default {\n          ...\n        }\n\n      It doesn't work with :host-context because angular splitting it in two selectors and removes\n      prefix in one of the selectors.\n    */\n.nb-theme-default :host nb-card-body {\n  overflow: hidden;\n  padding: 1rem; }\n.nb-theme-default :host .echart {\n  position: absolute;\n  left: 1em;\n  height: calc(100% - 2 * 1rem);\n  width: 40%; }\n.nb-theme-default :host .info {\n  margin-left: 45%;\n  padding-top: 1.5rem;\n  color: #a4abb3; }\n.nb-theme-default :host .value {\n  font-family: Exo;\n  font-size: 2rem;\n  font-weight: 600;\n  color: #2a2a2a; }\n.nb-theme-default :host .details {\n  font-size: 1.25rem;\n  font-weight: 500;\n  line-height: 1; }\n.nb-theme-default :host .details span {\n    font-size: 1rem;\n    font-weight: 300; }\n.nb-theme-default :host .text-hint {\n  font-size: 1rem; }\n@media (max-width: 399.98px) {\n  .nb-theme-default :host .value {\n    font-size: 1.75rem; } }\n/*\n      :host can be prefixed\n      https://github.com/angular/angular/blob/8d0ee34939f14c07876d222c25b405ed458a34d3/packages/compiler/src/shadow_css.ts#L441\n\n      We have to use :host insted of :host-context($theme), to be able to prefix theme class\n      with something defined inside of @content, by prefixing &.\n      For example this scss code:\n        .nb-theme-default {\n          .some-selector & {\n            ...\n          }\n        }\n      Will result in next css:\n        .some-selector .nb-theme-default {\n          ...\n        }\n\n      It doesn't work with :host-context because angular splitting it in two selectors and removes\n      prefix in one of the selectors.\n    */\n.nb-theme-cosmic :host {\n  color: #ffffff; }\n.nb-theme-cosmic :host nb-card-body {\n    overflow: hidden;\n    padding: 1rem; }\n.nb-theme-cosmic :host .echart {\n    position: absolute;\n    left: 1em;\n    height: calc(100% - 2 * 1rem);\n    width: 40%; }\n.nb-theme-cosmic :host .info {\n    margin-left: 45%;\n    padding-top: 1.5rem;\n    color: #a1a1e5; }\n.nb-theme-cosmic :host .value {\n    font-family: Exo;\n    font-size: 2rem;\n    font-weight: 600;\n    color: #ffffff; }\n.nb-theme-cosmic :host .details {\n    font-size: 1.25rem;\n    font-weight: 500;\n    line-height: 1; }\n.nb-theme-cosmic :host .details span {\n      font-size: 1rem;\n      font-weight: 300; }\n.nb-theme-cosmic :host .text-hint {\n    font-size: 1rem; }\n.nb-theme-cosmic :host .value {\n    color: #00f9a6; }\n.nb-theme-cosmic :host .details span {\n    color: #a1a1e5; }\n@media (max-width: 399.98px) {\n    .nb-theme-cosmic :host .value {\n      font-size: 1.75rem; } }\n/*\n      :host can be prefixed\n      https://github.com/angular/angular/blob/8d0ee34939f14c07876d222c25b405ed458a34d3/packages/compiler/src/shadow_css.ts#L441\n\n      We have to use :host insted of :host-context($theme), to be able to prefix theme class\n      with something defined inside of @content, by prefixing &.\n      For example this scss code:\n        .nb-theme-default {\n          .some-selector & {\n            ...\n          }\n        }\n      Will result in next css:\n        .some-selector .nb-theme-default {\n          ...\n        }\n\n      It doesn't work with :host-context because angular splitting it in two selectors and removes\n      prefix in one of the selectors.\n    */\n.nb-theme-corporate :host nb-card-body {\n  overflow: hidden;\n  padding: 1rem; }\n.nb-theme-corporate :host .echart {\n  position: absolute;\n  left: 1em;\n  height: calc(100% - 2 * 1rem);\n  width: 40%; }\n.nb-theme-corporate :host .info {\n  margin-left: 45%;\n  padding-top: 1.5rem;\n  color: #a4abb3; }\n.nb-theme-corporate :host .value {\n  font-family: Exo;\n  font-size: 2rem;\n  font-weight: 600;\n  color: #181818; }\n.nb-theme-corporate :host .details {\n  font-size: 1.25rem;\n  font-weight: 500;\n  line-height: 1; }\n.nb-theme-corporate :host .details span {\n    font-size: 1rem;\n    font-weight: 300; }\n.nb-theme-corporate :host .text-hint {\n  font-size: 1rem; }\n@media (max-width: 399.98px) {\n  .nb-theme-corporate :host .value {\n    font-size: 1.75rem; } }\n"

/***/ }),

/***/ "./src/app/pages/dashboard/passrate/passrate.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/pages/dashboard/passrate/passrate.component.ts ***!
  \****************************************************************/
/*! exports provided: PassRateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PassRateComponent", function() { return PassRateComponent; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _nebular_theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nebular/theme */ "./node_modules/@nebular/theme/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PassRateComponent = /** @class */ (function () {
    function PassRateComponent(theme, router) {
        this.theme = theme;
        this.router = router;
        this.value = 0;
        this.pass = 0;
        this.fail = 0;
        this.option = {};
    }
    Object.defineProperty(PassRateComponent.prototype, "passCount", {
        set: function (value) {
            this.pass = value;
            this.value = parseInt(((this.pass * 100) / (this.pass + this.fail)).toFixed(), 0);
            if (this.option.series) {
                this.option.series[0].data[0].value = this.value;
                this.option.series[0].data[1].value = 100 - this.value;
                this.option.series[1].data[0].value = this.value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PassRateComponent.prototype, "failCount", {
        set: function (value) {
            this.fail = value;
            this.value = parseInt(((this.pass * 100) / (this.pass + this.fail)).toFixed(), 0);
            if (this.option.series) {
                this.option.series[0].data[0].value = value;
                this.option.series[0].data[1].value = 100 - value;
                this.option.series[1].data[0].value = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    PassRateComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.themeSubscription = this.theme.getJsTheme().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["delay"])(1)).subscribe(function (config) {
            var solarTheme = config.variables.solar;
            _this.option = Object.assign({}, {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)',
                },
                series: [
                    {
                        name: ' ',
                        clockWise: true,
                        hoverAnimation: false,
                        type: 'pie',
                        center: ['45%', '50%'],
                        radius: solarTheme.radius,
                        data: [
                            {
                                value: _this.value,
                                name: ' ',
                                label: {
                                    normal: {
                                        position: 'center',
                                        formatter: '{d}%',
                                        textStyle: {
                                            fontSize: '22',
                                            fontFamily: config.variables.fontSecondary,
                                            fontWeight: '600',
                                            color: config.variables.fgHeading,
                                        },
                                    },
                                },
                                tooltip: {
                                    show: false,
                                },
                                itemStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            {
                                                offset: 0,
                                                color: solarTheme.gradientLeft,
                                            },
                                            {
                                                offset: 1,
                                                color: solarTheme.gradientRight,
                                            },
                                        ]),
                                        shadowColor: solarTheme.shadowColor,
                                        shadowBlur: 0,
                                        shadowOffsetX: 0,
                                        shadowOffsetY: 3,
                                    },
                                },
                                hoverAnimation: false,
                            },
                            {
                                value: 100 - _this.value,
                                name: ' ',
                                tooltip: {
                                    show: false,
                                },
                                label: {
                                    normal: {
                                        position: 'inner',
                                    },
                                },
                                itemStyle: {
                                    normal: {
                                        color: config.variables.layoutBg,
                                    },
                                },
                            },
                        ],
                    },
                    {
                        name: ' ',
                        clockWise: true,
                        hoverAnimation: false,
                        type: 'pie',
                        center: ['45%', '50%'],
                        radius: solarTheme.radius,
                        data: [
                            {
                                value: _this.value,
                                name: ' ',
                                label: {
                                    normal: {
                                        position: 'inner',
                                        show: false,
                                    },
                                },
                                tooltip: {
                                    show: false,
                                },
                                itemStyle: {
                                    normal: {
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                            {
                                                offset: 0,
                                                color: solarTheme.gradientLeft,
                                            },
                                            {
                                                offset: 1,
                                                color: solarTheme.gradientRight,
                                            },
                                        ]),
                                        shadowColor: solarTheme.shadowColor,
                                        shadowBlur: 7,
                                    },
                                },
                                hoverAnimation: false,
                            },
                            {
                                value: 28,
                                name: ' ',
                                tooltip: {
                                    show: false,
                                },
                                label: {
                                    normal: {
                                        position: 'inner',
                                    },
                                },
                                itemStyle: {
                                    normal: {
                                        color: 'none',
                                    },
                                },
                            },
                        ],
                    },
                ],
            });
        });
    };
    PassRateComponent.prototype.ngOnDestroy = function () {
        this.themeSubscription.unsubscribe();
    };
    PassRateComponent.prototype.moveHistory = function () {
        this.router.navigateByUrl('/pages/history/' + this.groupName + '/' + this.tcName);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", String)
    ], PassRateComponent.prototype, "groupName", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", String)
    ], PassRateComponent.prototype, "tcName", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", String)
    ], PassRateComponent.prototype, "testDate", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", String)
    ], PassRateComponent.prototype, "testTime", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", Number)
    ], PassRateComponent.prototype, "passGate", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        __metadata("design:type", Number)
    ], PassRateComponent.prototype, "avgRate", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('passCount'),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], PassRateComponent.prototype, "passCount", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('failCount'),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], PassRateComponent.prototype, "failCount", null);
    PassRateComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'ngx-passrate',
            styles: [__webpack_require__(/*! ./passrate.component.scss */ "./src/app/pages/dashboard/passrate/passrate.component.scss")],
            template: __webpack_require__(/*! ./passrate.component.html */ "./src/app/pages/dashboard/passrate/passrate.component.html"),
        }),
        __metadata("design:paramtypes", [_nebular_theme__WEBPACK_IMPORTED_MODULE_2__["NbThemeService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], PassRateComponent);
    return PassRateComponent;
}());



/***/ }),

/***/ "./src/app/pages/history/graph/graph.component.html":
/*!**********************************************************!*\
  !*** ./src/app/pages/history/graph/graph.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nb-card>\r\n  <div class=\"consumption-table\">\r\n    <div class=\"table-header\">\r\n      <div class=\"subtitle\">{{ groupName }}</div>\r\n      <div>{{ testName }}</div>\r\n    </div>\r\n\r\n    <nb-tabset fullWidth>\r\n      <nb-tab tabTitle=\"Pass/Fail\" active=\"false\">\r\n        <div class=\"stats-month\" *ngFor=\"let data of listdata | reverse\" (click)=\"moveGallery(data.id)\">\r\n          <div>\r\n            <span class=\"testdate\">{{ data.testDate }}<br />{{ data.testTime }}</span>\r\n          </div>\r\n          <div class=\"results\">\r\n            <b>{{ data.passCount }}</b> / <b>{{ data.failCount }}</b>\r\n          </div>\r\n        </div>\r\n      </nb-tab>\r\n      <nb-tab tabTitle=\"Pass/Total\" active=\"true\">\r\n        <div class=\"stats-month\" *ngFor=\"let data of listdata\" (click)=\"moveGallery(data.id)\">\r\n          <div>\r\n            <span class=\"testdate\">{{ data.testDate }}<br />{{ data.testTime }}</span>\r\n          </div>\r\n          <div class=\"results\">\r\n            <b>{{ data.passRate }}</b>% , <b>{{ data.passCount }}</b> / <b>{{ data.passCount+data.failCount }}</b>\r\n          </div>\r\n        </div>\r\n      </nb-tab>\r\n      <nb-tab tabTitle=\"Rate\" active=\"false\">\r\n        <div class=\"stats-month\" *ngFor=\"let data of listdata\" (click)=\"moveGallery(data.id)\">\r\n          <div>\r\n            <span class=\"testdate\">{{ data.testDate }}<br />{{ data.testTime }}</span>\r\n          </div>\r\n          <div class=\"results\">\r\n            <b>{{ data.passRate }}</b>% , <b>{{ data.avgRate }}</b>%\r\n          </div>\r\n        </div>\r\n      </nb-tab>\r\n    </nb-tabset>\r\n  </div>\r\n\r\n  <div class=\"chart-container\">\r\n    <div class=\"chart-header\">\r\n      <div class=\"header-stats\">\r\n        <div class=\"stats-block\">\r\n          <div class=\"subtitle\">Last Tested</div>\r\n          <div>\r\n            <span class=\"value\">{{ lastTestTime }}</span>\r\n            <span class=\"unit\"></span>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"stats-block currency\">\r\n          <div class=\"subtitle\">Pass Rate</div>\r\n          <div>\r\n            <span class=\"value\">{{ lastPassRate }}</span>\r\n            <span class=\"unit\">%</span>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"stats-block currency\">\r\n          <div class=\"subtitle\">Pass Count</div>\r\n          <div>\r\n            <span class=\"value\">{{ lastPassCount }}</span>\r\n            <span class=\"unit\"></span>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"stats-block currency\">\r\n          <div class=\"subtitle\">Fail Count</div>\r\n          <div>\r\n            <span class=\"value\">{{ lastFailCount }}</span>\r\n            <span class=\"unit\"></span>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"stats-block currency\">\r\n          <div class=\"subtitle\">Total Count</div>\r\n          <div>\r\n            <span class=\"value\">{{ lastPassCount+lastFailCount }}</span>\r\n            <span class=\"unit\"></span>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"stats-block currency\">\r\n          <div class=\"subtitle\">Matching Rate</div>\r\n          <div>\r\n            <span class=\"value\">{{ lastMatchingRate }}</span>\r\n            <span class=\"unit\">%</span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"dropdown\"\r\n           [ngClass]=\"{ 'ghost-dropdown': currentTheme === 'corporate' }\"\r\n           ngbDropdown>\r\n        <button type=\"button\" ngbDropdownToggle class=\"btn\"\r\n                [ngClass]=\"{ 'btn-outline-success': currentTheme == 'default', 'btn-primary': currentTheme != 'default'}\">\r\n          {{ selPassGate }}\r\n        </button>\r\n        <ul class=\"dropdown-menu\" ngbDropdownMenu>\r\n          <li class=\"dropdown-item\" *ngFor=\"let gate of selPassGates\" (click)=\"chagePassGate(gate)\">{{ gate }}</li>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n    <div echarts\r\n         [options]=\"passOption\"\r\n         class=\"echart1\"\r\n         (chartInit)=\"onChartInit1($event)\">\r\n    </div>\r\n\r\n    <div echarts\r\n         [options]=\"compareOption\"\r\n         class=\"echart2\"\r\n         (chartInit)=\"onChartInit2($event)\">\r\n    </div>\r\n  </div>\r\n</nb-card>\r\n"

/***/ }),

/***/ "./src/app/pages/history/graph/graph.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/pages/history/graph/graph.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This is a starting point where we declare the maps of themes and globally available functions/mixins\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/*\n\nAccording to the specification (https://www.w3.org/TR/css-scoping-1/#host-selector)\n:host and :host-context are pseudo-classes. So we assume they could be combined,\nlike other pseudo-classes, even same ones.\nFor example: ':nth-of-type(2n):nth-of-type(even)'.\n\nIdeal solution would be to prepend any selector with :host-context([dir=rtl]).\nThen nebular components will behave as an html element and respond to [dir] attribute on any level,\nso direction could be overridden on any component level.\n\nImplementation code:\n\n@mixin nb-rtl() {\n  // add # to scss interpolation statement.\n  // it works in comments and we can't use it here\n  @at-root {selector-append(':host-context([dir=rtl])', &)} {\n    @content;\n  }\n}\n\nAnd when we call it somewhere:\n\n:host {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n:host-context(...) {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n\nResult will look like:\n\n:host-context([dir=rtl]):host .some-class {\n  ...\n}\n:host-context([dir=rtl]):host-context(...) .some-class {\n  ...\n}\n\n*\n  Side note:\n  :host-context():host selector are valid. https://lists.w3.org/Archives/Public/www-style/2015Feb/0305.html\n\n  :host-context([dir=rtl]):host-context(...) should match any permutation,\n  so order is not important.\n*\n\n\nCurrently, there're two problems with this approach:\n\nFirst, is that we can't combine :host, :host-context. Angular bugs #14349, #19199.\nFor the moment of writing, the only possible way is:\n:host {\n  :host-context(...) {\n    ...\n  }\n}\nIt doesn't work for us because mixin could be called somewhere deeper, like:\n:host {\n  p {\n    @include nb-rtl() { ... }\n  }\n}\nWe are not able to go up to :host level to place content passed to mixin.\n\nThe second problem is that we only can be sure that we appending :host-context([dir=rtl]) to another\n:host/:host-context pseudo-class when called in theme files (*.theme.scss).\n  *\n    Side note:\n    Currently, nb-install-component uses another approach where :host prepended with the theme name\n    (https://github.com/angular/angular/blob/5b96078624b0a4760f2dbcf6fdf0bd62791be5bb/packages/compiler/src/shadow_css.ts#L441),\n    but it was made to be able to use current realization of rtl and it can be rewritten back to\n    :host-context($theme) once we will be able to use multiple shadow selectors.\n  *\nBut when it's called in *.component.scss we can't be sure, that selector starts with :host/:host-context,\nbecause angular allows omitting pseudo-classes if we don't need to style :host component itself.\nWe can break such selectors, by just appending :host-context([dir=rtl]) to them.\n  ***\n    Possible solution\n    check if we in theme by some theme variables and if so append, otherwise nest like\n    @at-root :host-context([dir=rtl]) {\n      // add # to scss interpolation statement.\n      // it works in comments and we can't use it here\n      {&} {\n        @content;\n      }\n    }\n    What if :host specified? Can we add space in :host-context(...) :host?\n    Or maybe add :host selector anyway? If multiple :host selectors are allowed\n  ***\n\n\nProblems with the current approach.\n\n1. Direction can be applied only on document level, because mixin prepends theme class,\nwhich placed on the body.\n2. *.component.scss styles should be in :host selector. Otherwise angular will add host\nattribute to [dir=rtl] attribute as well.\n\n\nGeneral problems.\n\nLtr is default document direction, but for proper work of nb-ltr (means ltr only),\n[dir=ltr] should be specified at least somewhere. ':not([dir=rtl]' not applicable here,\nbecause it's satisfy any parent, that don't have [dir=rtl] attribute.\nPrevious approach was to use single rtl mixin and reset ltr properties to initial value.\nBut sometimes it's hard to find, what the previous value should be. And such mixin call looks too verbose.\n*/\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/*\n\nAccording to the specification (https://www.w3.org/TR/css-scoping-1/#host-selector)\n:host and :host-context are pseudo-classes. So we assume they could be combined,\nlike other pseudo-classes, even same ones.\nFor example: ':nth-of-type(2n):nth-of-type(even)'.\n\nIdeal solution would be to prepend any selector with :host-context([dir=rtl]).\nThen nebular components will behave as an html element and respond to [dir] attribute on any level,\nso direction could be overridden on any component level.\n\nImplementation code:\n\n@mixin nb-rtl() {\n  // add # to scss interpolation statement.\n  // it works in comments and we can't use it here\n  @at-root {selector-append(':host-context([dir=rtl])', &)} {\n    @content;\n  }\n}\n\nAnd when we call it somewhere:\n\n:host {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n:host-context(...) {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n\nResult will look like:\n\n:host-context([dir=rtl]):host .some-class {\n  ...\n}\n:host-context([dir=rtl]):host-context(...) .some-class {\n  ...\n}\n\n*\n  Side note:\n  :host-context():host selector are valid. https://lists.w3.org/Archives/Public/www-style/2015Feb/0305.html\n\n  :host-context([dir=rtl]):host-context(...) should match any permutation,\n  so order is not important.\n*\n\n\nCurrently, there're two problems with this approach:\n\nFirst, is that we can't combine :host, :host-context. Angular bugs #14349, #19199.\nFor the moment of writing, the only possible way is:\n:host {\n  :host-context(...) {\n    ...\n  }\n}\nIt doesn't work for us because mixin could be called somewhere deeper, like:\n:host {\n  p {\n    @include nb-rtl() { ... }\n  }\n}\nWe are not able to go up to :host level to place content passed to mixin.\n\nThe second problem is that we only can be sure that we appending :host-context([dir=rtl]) to another\n:host/:host-context pseudo-class when called in theme files (*.theme.scss).\n  *\n    Side note:\n    Currently, nb-install-component uses another approach where :host prepended with the theme name\n    (https://github.com/angular/angular/blob/5b96078624b0a4760f2dbcf6fdf0bd62791be5bb/packages/compiler/src/shadow_css.ts#L441),\n    but it was made to be able to use current realization of rtl and it can be rewritten back to\n    :host-context($theme) once we will be able to use multiple shadow selectors.\n  *\nBut when it's called in *.component.scss we can't be sure, that selector starts with :host/:host-context,\nbecause angular allows omitting pseudo-classes if we don't need to style :host component itself.\nWe can break such selectors, by just appending :host-context([dir=rtl]) to them.\n  ***\n    Possible solution\n    check if we in theme by some theme variables and if so append, otherwise nest like\n    @at-root :host-context([dir=rtl]) {\n      // add # to scss interpolation statement.\n      // it works in comments and we can't use it here\n      {&} {\n        @content;\n      }\n    }\n    What if :host specified? Can we add space in :host-context(...) :host?\n    Or maybe add :host selector anyway? If multiple :host selectors are allowed\n  ***\n\n\nProblems with the current approach.\n\n1. Direction can be applied only on document level, because mixin prepends theme class,\nwhich placed on the body.\n2. *.component.scss styles should be in :host selector. Otherwise angular will add host\nattribute to [dir=rtl] attribute as well.\n\n\nGeneral problems.\n\nLtr is default document direction, but for proper work of nb-ltr (means ltr only),\n[dir=ltr] should be specified at least somewhere. ':not([dir=rtl]' not applicable here,\nbecause it's satisfy any parent, that don't have [dir=rtl] attribute.\nPrevious approach was to use single rtl mixin and reset ltr properties to initial value.\nBut sometimes it's hard to find, what the previous value should be. And such mixin call looks too verbose.\n*/\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/*\n\nAccording to the specification (https://www.w3.org/TR/css-scoping-1/#host-selector)\n:host and :host-context are pseudo-classes. So we assume they could be combined,\nlike other pseudo-classes, even same ones.\nFor example: ':nth-of-type(2n):nth-of-type(even)'.\n\nIdeal solution would be to prepend any selector with :host-context([dir=rtl]).\nThen nebular components will behave as an html element and respond to [dir] attribute on any level,\nso direction could be overridden on any component level.\n\nImplementation code:\n\n@mixin nb-rtl() {\n  // add # to scss interpolation statement.\n  // it works in comments and we can't use it here\n  @at-root {selector-append(':host-context([dir=rtl])', &)} {\n    @content;\n  }\n}\n\nAnd when we call it somewhere:\n\n:host {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n:host-context(...) {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n\nResult will look like:\n\n:host-context([dir=rtl]):host .some-class {\n  ...\n}\n:host-context([dir=rtl]):host-context(...) .some-class {\n  ...\n}\n\n*\n  Side note:\n  :host-context():host selector are valid. https://lists.w3.org/Archives/Public/www-style/2015Feb/0305.html\n\n  :host-context([dir=rtl]):host-context(...) should match any permutation,\n  so order is not important.\n*\n\n\nCurrently, there're two problems with this approach:\n\nFirst, is that we can't combine :host, :host-context. Angular bugs #14349, #19199.\nFor the moment of writing, the only possible way is:\n:host {\n  :host-context(...) {\n    ...\n  }\n}\nIt doesn't work for us because mixin could be called somewhere deeper, like:\n:host {\n  p {\n    @include nb-rtl() { ... }\n  }\n}\nWe are not able to go up to :host level to place content passed to mixin.\n\nThe second problem is that we only can be sure that we appending :host-context([dir=rtl]) to another\n:host/:host-context pseudo-class when called in theme files (*.theme.scss).\n  *\n    Side note:\n    Currently, nb-install-component uses another approach where :host prepended with the theme name\n    (https://github.com/angular/angular/blob/5b96078624b0a4760f2dbcf6fdf0bd62791be5bb/packages/compiler/src/shadow_css.ts#L441),\n    but it was made to be able to use current realization of rtl and it can be rewritten back to\n    :host-context($theme) once we will be able to use multiple shadow selectors.\n  *\nBut when it's called in *.component.scss we can't be sure, that selector starts with :host/:host-context,\nbecause angular allows omitting pseudo-classes if we don't need to style :host component itself.\nWe can break such selectors, by just appending :host-context([dir=rtl]) to them.\n  ***\n    Possible solution\n    check if we in theme by some theme variables and if so append, otherwise nest like\n    @at-root :host-context([dir=rtl]) {\n      // add # to scss interpolation statement.\n      // it works in comments and we can't use it here\n      {&} {\n        @content;\n      }\n    }\n    What if :host specified? Can we add space in :host-context(...) :host?\n    Or maybe add :host selector anyway? If multiple :host selectors are allowed\n  ***\n\n\nProblems with the current approach.\n\n1. Direction can be applied only on document level, because mixin prepends theme class,\nwhich placed on the body.\n2. *.component.scss styles should be in :host selector. Otherwise angular will add host\nattribute to [dir=rtl] attribute as well.\n\n\nGeneral problems.\n\nLtr is default document direction, but for proper work of nb-ltr (means ltr only),\n[dir=ltr] should be specified at least somewhere. ':not([dir=rtl]' not applicable here,\nbecause it's satisfy any parent, that don't have [dir=rtl] attribute.\nPrevious approach was to use single rtl mixin and reset ltr properties to initial value.\nBut sometimes it's hard to find, what the previous value should be. And such mixin call looks too verbose.\n*/\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/*\n\nAccording to the specification (https://www.w3.org/TR/css-scoping-1/#host-selector)\n:host and :host-context are pseudo-classes. So we assume they could be combined,\nlike other pseudo-classes, even same ones.\nFor example: ':nth-of-type(2n):nth-of-type(even)'.\n\nIdeal solution would be to prepend any selector with :host-context([dir=rtl]).\nThen nebular components will behave as an html element and respond to [dir] attribute on any level,\nso direction could be overridden on any component level.\n\nImplementation code:\n\n@mixin nb-rtl() {\n  // add # to scss interpolation statement.\n  // it works in comments and we can't use it here\n  @at-root {selector-append(':host-context([dir=rtl])', &)} {\n    @content;\n  }\n}\n\nAnd when we call it somewhere:\n\n:host {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n:host-context(...) {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n\nResult will look like:\n\n:host-context([dir=rtl]):host .some-class {\n  ...\n}\n:host-context([dir=rtl]):host-context(...) .some-class {\n  ...\n}\n\n*\n  Side note:\n  :host-context():host selector are valid. https://lists.w3.org/Archives/Public/www-style/2015Feb/0305.html\n\n  :host-context([dir=rtl]):host-context(...) should match any permutation,\n  so order is not important.\n*\n\n\nCurrently, there're two problems with this approach:\n\nFirst, is that we can't combine :host, :host-context. Angular bugs #14349, #19199.\nFor the moment of writing, the only possible way is:\n:host {\n  :host-context(...) {\n    ...\n  }\n}\nIt doesn't work for us because mixin could be called somewhere deeper, like:\n:host {\n  p {\n    @include nb-rtl() { ... }\n  }\n}\nWe are not able to go up to :host level to place content passed to mixin.\n\nThe second problem is that we only can be sure that we appending :host-context([dir=rtl]) to another\n:host/:host-context pseudo-class when called in theme files (*.theme.scss).\n  *\n    Side note:\n    Currently, nb-install-component uses another approach where :host prepended with the theme name\n    (https://github.com/angular/angular/blob/5b96078624b0a4760f2dbcf6fdf0bd62791be5bb/packages/compiler/src/shadow_css.ts#L441),\n    but it was made to be able to use current realization of rtl and it can be rewritten back to\n    :host-context($theme) once we will be able to use multiple shadow selectors.\n  *\nBut when it's called in *.component.scss we can't be sure, that selector starts with :host/:host-context,\nbecause angular allows omitting pseudo-classes if we don't need to style :host component itself.\nWe can break such selectors, by just appending :host-context([dir=rtl]) to them.\n  ***\n    Possible solution\n    check if we in theme by some theme variables and if so append, otherwise nest like\n    @at-root :host-context([dir=rtl]) {\n      // add # to scss interpolation statement.\n      // it works in comments and we can't use it here\n      {&} {\n        @content;\n      }\n    }\n    What if :host specified? Can we add space in :host-context(...) :host?\n    Or maybe add :host selector anyway? If multiple :host selectors are allowed\n  ***\n\n\nProblems with the current approach.\n\n1. Direction can be applied only on document level, because mixin prepends theme class,\nwhich placed on the body.\n2. *.component.scss styles should be in :host selector. Otherwise angular will add host\nattribute to [dir=rtl] attribute as well.\n\n\nGeneral problems.\n\nLtr is default document direction, but for proper work of nb-ltr (means ltr only),\n[dir=ltr] should be specified at least somewhere. ':not([dir=rtl]' not applicable here,\nbecause it's satisfy any parent, that don't have [dir=rtl] attribute.\nPrevious approach was to use single rtl mixin and reset ltr properties to initial value.\nBut sometimes it's hard to find, what the previous value should be. And such mixin call looks too verbose.\n*/\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/*\n\nAccording to the specification (https://www.w3.org/TR/css-scoping-1/#host-selector)\n:host and :host-context are pseudo-classes. So we assume they could be combined,\nlike other pseudo-classes, even same ones.\nFor example: ':nth-of-type(2n):nth-of-type(even)'.\n\nIdeal solution would be to prepend any selector with :host-context([dir=rtl]).\nThen nebular components will behave as an html element and respond to [dir] attribute on any level,\nso direction could be overridden on any component level.\n\nImplementation code:\n\n@mixin nb-rtl() {\n  // add # to scss interpolation statement.\n  // it works in comments and we can't use it here\n  @at-root {selector-append(':host-context([dir=rtl])', &)} {\n    @content;\n  }\n}\n\nAnd when we call it somewhere:\n\n:host {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n:host-context(...) {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n\nResult will look like:\n\n:host-context([dir=rtl]):host .some-class {\n  ...\n}\n:host-context([dir=rtl]):host-context(...) .some-class {\n  ...\n}\n\n*\n  Side note:\n  :host-context():host selector are valid. https://lists.w3.org/Archives/Public/www-style/2015Feb/0305.html\n\n  :host-context([dir=rtl]):host-context(...) should match any permutation,\n  so order is not important.\n*\n\n\nCurrently, there're two problems with this approach:\n\nFirst, is that we can't combine :host, :host-context. Angular bugs #14349, #19199.\nFor the moment of writing, the only possible way is:\n:host {\n  :host-context(...) {\n    ...\n  }\n}\nIt doesn't work for us because mixin could be called somewhere deeper, like:\n:host {\n  p {\n    @include nb-rtl() { ... }\n  }\n}\nWe are not able to go up to :host level to place content passed to mixin.\n\nThe second problem is that we only can be sure that we appending :host-context([dir=rtl]) to another\n:host/:host-context pseudo-class when called in theme files (*.theme.scss).\n  *\n    Side note:\n    Currently, nb-install-component uses another approach where :host prepended with the theme name\n    (https://github.com/angular/angular/blob/5b96078624b0a4760f2dbcf6fdf0bd62791be5bb/packages/compiler/src/shadow_css.ts#L441),\n    but it was made to be able to use current realization of rtl and it can be rewritten back to\n    :host-context($theme) once we will be able to use multiple shadow selectors.\n  *\nBut when it's called in *.component.scss we can't be sure, that selector starts with :host/:host-context,\nbecause angular allows omitting pseudo-classes if we don't need to style :host component itself.\nWe can break such selectors, by just appending :host-context([dir=rtl]) to them.\n  ***\n    Possible solution\n    check if we in theme by some theme variables and if so append, otherwise nest like\n    @at-root :host-context([dir=rtl]) {\n      // add # to scss interpolation statement.\n      // it works in comments and we can't use it here\n      {&} {\n        @content;\n      }\n    }\n    What if :host specified? Can we add space in :host-context(...) :host?\n    Or maybe add :host selector anyway? If multiple :host selectors are allowed\n  ***\n\n\nProblems with the current approach.\n\n1. Direction can be applied only on document level, because mixin prepends theme class,\nwhich placed on the body.\n2. *.component.scss styles should be in :host selector. Otherwise angular will add host\nattribute to [dir=rtl] attribute as well.\n\n\nGeneral problems.\n\nLtr is default document direction, but for proper work of nb-ltr (means ltr only),\n[dir=ltr] should be specified at least somewhere. ':not([dir=rtl]' not applicable here,\nbecause it's satisfy any parent, that don't have [dir=rtl] attribute.\nPrevious approach was to use single rtl mixin and reset ltr properties to initial value.\nBut sometimes it's hard to find, what the previous value should be. And such mixin call looks too verbose.\n*/\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * This mixin generates keyfames.\n * Because of all keyframes can't be scoped,\n * we need to puts unique name in each btn-pulse call.\n */\n/*\n\nAccording to the specification (https://www.w3.org/TR/css-scoping-1/#host-selector)\n:host and :host-context are pseudo-classes. So we assume they could be combined,\nlike other pseudo-classes, even same ones.\nFor example: ':nth-of-type(2n):nth-of-type(even)'.\n\nIdeal solution would be to prepend any selector with :host-context([dir=rtl]).\nThen nebular components will behave as an html element and respond to [dir] attribute on any level,\nso direction could be overridden on any component level.\n\nImplementation code:\n\n@mixin nb-rtl() {\n  // add # to scss interpolation statement.\n  // it works in comments and we can't use it here\n  @at-root {selector-append(':host-context([dir=rtl])', &)} {\n    @content;\n  }\n}\n\nAnd when we call it somewhere:\n\n:host {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n:host-context(...) {\n  .some-class {\n    @include nb-rtl() {\n      ...\n    }\n  }\n}\n\nResult will look like:\n\n:host-context([dir=rtl]):host .some-class {\n  ...\n}\n:host-context([dir=rtl]):host-context(...) .some-class {\n  ...\n}\n\n*\n  Side note:\n  :host-context():host selector are valid. https://lists.w3.org/Archives/Public/www-style/2015Feb/0305.html\n\n  :host-context([dir=rtl]):host-context(...) should match any permutation,\n  so order is not important.\n*\n\n\nCurrently, there're two problems with this approach:\n\nFirst, is that we can't combine :host, :host-context. Angular bugs #14349, #19199.\nFor the moment of writing, the only possible way is:\n:host {\n  :host-context(...) {\n    ...\n  }\n}\nIt doesn't work for us because mixin could be called somewhere deeper, like:\n:host {\n  p {\n    @include nb-rtl() { ... }\n  }\n}\nWe are not able to go up to :host level to place content passed to mixin.\n\nThe second problem is that we only can be sure that we appending :host-context([dir=rtl]) to another\n:host/:host-context pseudo-class when called in theme files (*.theme.scss).\n  *\n    Side note:\n    Currently, nb-install-component uses another approach where :host prepended with the theme name\n    (https://github.com/angular/angular/blob/5b96078624b0a4760f2dbcf6fdf0bd62791be5bb/packages/compiler/src/shadow_css.ts#L441),\n    but it was made to be able to use current realization of rtl and it can be rewritten back to\n    :host-context($theme) once we will be able to use multiple shadow selectors.\n  *\nBut when it's called in *.component.scss we can't be sure, that selector starts with :host/:host-context,\nbecause angular allows omitting pseudo-classes if we don't need to style :host component itself.\nWe can break such selectors, by just appending :host-context([dir=rtl]) to them.\n  ***\n    Possible solution\n    check if we in theme by some theme variables and if so append, otherwise nest like\n    @at-root :host-context([dir=rtl]) {\n      // add # to scss interpolation statement.\n      // it works in comments and we can't use it here\n      {&} {\n        @content;\n      }\n    }\n    What if :host specified? Can we add space in :host-context(...) :host?\n    Or maybe add :host selector anyway? If multiple :host selectors are allowed\n  ***\n\n\nProblems with the current approach.\n\n1. Direction can be applied only on document level, because mixin prepends theme class,\nwhich placed on the body.\n2. *.component.scss styles should be in :host selector. Otherwise angular will add host\nattribute to [dir=rtl] attribute as well.\n\n\nGeneral problems.\n\nLtr is default document direction, but for proper work of nb-ltr (means ltr only),\n[dir=ltr] should be specified at least somewhere. ':not([dir=rtl]' not applicable here,\nbecause it's satisfy any parent, that don't have [dir=rtl] attribute.\nPrevious approach was to use single rtl mixin and reset ltr properties to initial value.\nBut sometimes it's hard to find, what the previous value should be. And such mixin call looks too verbose.\n*/\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/*!\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/**\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */\n/*\n      :host can be prefixed\n      https://github.com/angular/angular/blob/8d0ee34939f14c07876d222c25b405ed458a34d3/packages/compiler/src/shadow_css.ts#L441\n\n      We have to use :host insted of :host-context($theme), to be able to prefix theme class\n      with something defined inside of @content, by prefixing &.\n      For example this scss code:\n        .nb-theme-default {\n          .some-selector & {\n            ...\n          }\n        }\n      Will result in next css:\n        .some-selector .nb-theme-default {\n          ...\n        }\n\n      It doesn't work with :host-context because angular splitting it in two selectors and removes\n      prefix in one of the selectors.\n    */\n.nb-theme-default :host {\n  /*\n      :host can be prefixed\n      https://github.com/angular/angular/blob/8d0ee34939f14c07876d222c25b405ed458a34d3/packages/compiler/src/shadow_css.ts#L441\n\n      We have to use :host insted of :host-context($theme), to be able to prefix theme class\n      with something defined inside of @content, by prefixing &.\n      For example this scss code:\n        .nb-theme-default {\n          .some-selector & {\n            ...\n          }\n        }\n      Will result in next css:\n        .some-selector .nb-theme-default {\n          ...\n        }\n\n      It doesn't work with :host-context because angular splitting it in two selectors and removes\n      prefix in one of the selectors.\n    */\n  /*\n      :host can be prefixed\n      https://github.com/angular/angular/blob/8d0ee34939f14c07876d222c25b405ed458a34d3/packages/compiler/src/shadow_css.ts#L441\n\n      We have to use :host insted of :host-context($theme), to be able to prefix theme class\n      with something defined inside of @content, by prefixing &.\n      For example this scss code:\n        .nb-theme-default {\n          .some-selector & {\n            ...\n          }\n        }\n      Will result in next css:\n        .some-selector .nb-theme-default {\n          ...\n        }\n\n      It doesn't work with :host-context because angular splitting it in two selectors and removes\n      prefix in one of the selectors.\n    */\n  /*\n      :host can be prefixed\n      https://github.com/angular/angular/blob/8d0ee34939f14c07876d222c25b405ed458a34d3/packages/compiler/src/shadow_css.ts#L441\n\n      We have to use :host insted of :host-context($theme), to be able to prefix theme class\n      with something defined inside of @content, by prefixing &.\n      For example this scss code:\n        .nb-theme-default {\n          .some-selector & {\n            ...\n          }\n        }\n      Will result in next css:\n        .some-selector .nb-theme-default {\n          ...\n        }\n\n      It doesn't work with :host-context because angular splitting it in two selectors and removes\n      prefix in one of the selectors.\n    */ }\n.nb-theme-default :host nb-card {\n    display: flex;\n    flex-direction: row;\n    height: 100%; }\n.nb-theme-default :host nb-card-body {\n    overflow: hidden; }\n.nb-theme-default :host .consumption-table {\n    display: flex;\n    flex-direction: column;\n    width: 20rem;\n    height: 100%;\n    z-index: 2;\n    box-shadow: 0 2px 12px 0 #dfe3eb; }\n.nb-theme-default :host .table-header {\n    padding: 1.25rem;\n    border-bottom-width: 1px;\n    border-bottom-style: solid;\n    border-bottom-color: #ebeef2;\n    border-top-left-radius: 0.375rem;\n    border-top-right-radius: 0.375rem;\n    color: #2a2a2a;\n    font-family: Exo;\n    font-size: 1.125rem;\n    font-weight: 600;\n    font-size: 1.25rem; }\n.nb-theme-default :host .table-header h1 {\n      margin: 0; }\n.nb-theme-default :host .table-header h2 {\n      margin: 0; }\n.nb-theme-default :host .table-header h3 {\n      margin: 0; }\n.nb-theme-default :host .table-header h4 {\n      margin: 0; }\n.nb-theme-default :host .table-header h5 {\n      margin: 0; }\n.nb-theme-default :host .table-header h6 {\n      margin: 0; }\n.nb-theme-default :host .table-header .subtitle {\n      color: #a4abb3;\n      font-family: Roboto;\n      font-size: 1rem;\n      font-weight: 300; }\n.nb-theme-default :host nb-tabset /deep/ {\n    flex: 1;\n    overflow: hidden;\n    display: flex;\n    flex-direction: column; }\n.nb-theme-default :host nb-tabset /deep/ ul {\n      align-items: center;\n      padding: 1rem; }\n.nb-theme-default :host nb-tabset /deep/ ul li a {\n      font-weight: 500;\n      padding: 0.75rem 1rem; }\n.nb-theme-default :host nb-tabset /deep/ ul li.active {\n      position: relative;\n      background-color: #ebeff5;\n      border-radius: 0.375rem 0.375rem 0 0; }\n.nb-theme-default :host nb-tabset /deep/ ul li.active::before {\n        position: absolute;\n        content: '';\n        width: 100%;\n        height: 5px;\n        border-radius: 2.5px;\n        bottom: 0;\n        left: 0;\n        background: #40dc7e; }\n.nb-theme-default :host nb-tabset /deep/ ul li.active a {\n        font-size: 1.5rem; }\n.nb-theme-default :host nb-tabset /deep/ ul li.active a::before {\n        display: none; }\n.nb-theme-default :host nb-tabset /deep/ nb-tab {\n      flex: 1;\n      overflow-y: auto; }\n.nb-theme-default :host .stats-month {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 1.25rem;\n    color: #a4abb3;\n    position: relative; }\n.nb-theme-default :host .stats-month:not(:first-child) {\n      border-top: 1px solid #ebeef2; }\n.nb-theme-default :host .stats-month:hover {\n      background-color: #ebeff5; }\n.nb-theme-default :host .stats-month:hover::before {\n        position: absolute;\n        content: '';\n        height: 100%;\n        width: 6px;\n        left: 0;\n        top: 0;\n        background-color: #40dc7e;\n        border-radius: 0.375rem; }\n.nb-theme-default :host .stats-month .testdate {\n      display: inline-block;\n      font-family: Exo;\n      font-size: 0.875rem;\n      font-weight: 300;\n      color: #2a2a2a; }\n.nb-theme-default :host .stats-month .delta {\n      position: relative;\n      display: inline-block;\n      padding-left: 1rem;\n      font-size: 0.75rem;\n      color: #ff6780; }\n.nb-theme-default :host .stats-month .delta::before {\n        position: absolute;\n        content: '';\n        bottom: 3px;\n        left: 2px;\n        border-left: 5px solid transparent;\n        border-right: 5px solid transparent;\n        border-bottom: 8px solid #ff6780; }\n.nb-theme-default :host .stats-month .delta.down {\n        color: #5de191; }\n.nb-theme-default :host .stats-month .delta.down::before {\n          top: 3px;\n          border-top: 8px solid #5de191;\n          border-bottom: none; }\n.nb-theme-default :host .stats-month .results {\n      font-size: 1.275rem;\n      font-weight: 500; }\n.nb-theme-default :host .stats-month .results b {\n        font-family: Exo;\n        font-size: 1.5rem;\n        font-weight: 600;\n        color: #2a2a2a; }\n.nb-theme-default :host .chart-container {\n    flex: 1;\n    height: 100%;\n    background-image: none;\n    display: flex;\n    flex-direction: column;\n    overflow: hidden; }\n.nb-theme-default :host .chart-header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 1rem 1.75rem 1rem 1rem; }\n.nb-theme-default :host .header-stats {\n    display: flex;\n    align-items: center; }\n.nb-theme-default :host .stats-block {\n    display: flex;\n    flex-direction: column;\n    align-items: normal;\n    color: #a4abb3;\n    padding: 0 1.5rem;\n    border-right: 1px solid #ebeef2; }\n.nb-theme-default :host .stats-block .subtitle {\n      font-size: 1rem;\n      font-weight: 300; }\n.nb-theme-default :host .stats-block .value {\n      font-family: Exo;\n      font-size: 1.5rem;\n      font-weight: 600;\n      color: #2a2a2a; }\n.nb-theme-default :host .stats-block .unit {\n      font-family: Exo;\n      font-size: 1.25rem;\n      font-weight: 300; }\n.nb-theme-default :host .dropdown {\n    min-width: 200px; }\n@media (max-width: 1599.98px) {\n    .nb-theme-default :host .stats-block {\n      border: none;\n      padding: 0 1rem; } }\n@media (min-width: 768px) and (max-width: 1399.98px) {\n    .nb-theme-default :host .consumption-table {\n      display: none; } }\n@media (max-width: 991.98px) {\n    .nb-theme-default :host .chart-header {\n      padding: 1rem; }\n    .nb-theme-default :host .dropdown {\n      min-width: 100px; }\n      .nb-theme-default :host .dropdown button {\n        padding-left: 0.75rem;\n        padding-right: 0.75rem; } }\n@media (max-width: 767.98px) {\n    .nb-theme-default :host .consumption-table {\n      display: none; } }\n@media (max-width: 399.98px) {\n    .nb-theme-default :host .stats-block {\n      padding: 0; }\n      .nb-theme-default :host .stats-block:first-child {\n        padding: 0 0.5rem; }\n      .nb-theme-default :host .stats-block .subtitle {\n        font-size: 1rem; }\n      .nb-theme-default :host .stats-block .value {\n        font-size: 1.5rem; }\n      .nb-theme-default :host .stats-block .unit {\n        display: none; } }\n.nb-theme-default :host .nb-theme-default :host {\n    display: block;\n    flex: 1;\n    position: relative; }\n.nb-theme-default :host .nb-theme-default :host .echart1 {\n      position: absolute;\n      width: 100%;\n      height: 100%; }\n.nb-theme-default :host .nb-theme-default :host .echart2 {\n      position: absolute;\n      width: 100%;\n      height: 100%; }\n.nb-theme-default :host .nb-theme-cosmic :host {\n    display: block;\n    flex: 1;\n    position: relative; }\n.nb-theme-default :host .nb-theme-cosmic :host .echart1 {\n      position: absolute;\n      width: 100%;\n      height: 100%; }\n.nb-theme-default :host .nb-theme-cosmic :host .echart2 {\n      position: absolute;\n      width: 100%;\n      height: 100%; }\n.nb-theme-default :host .nb-theme-corporate :host {\n    display: block;\n    flex: 1;\n    position: relative; }\n.nb-theme-default :host .nb-theme-corporate :host .echart1 {\n      position: absolute;\n      width: 100%;\n      height: 100%; }\n.nb-theme-default :host .nb-theme-corporate :host .echart2 {\n      position: absolute;\n      width: 100%;\n      height: 100%; }\n/*\n      :host can be prefixed\n      https://github.com/angular/angular/blob/8d0ee34939f14c07876d222c25b405ed458a34d3/packages/compiler/src/shadow_css.ts#L441\n\n      We have to use :host insted of :host-context($theme), to be able to prefix theme class\n      with something defined inside of @content, by prefixing &.\n      For example this scss code:\n        .nb-theme-default {\n          .some-selector & {\n            ...\n          }\n        }\n      Will result in next css:\n        .some-selector .nb-theme-default {\n          ...\n        }\n\n      It doesn't work with :host-context because angular splitting it in two selectors and removes\n      prefix in one of the selectors.\n    */\n.nb-theme-cosmic :host {\n  /*\n      :host can be prefixed\n      https://github.com/angular/angular/blob/8d0ee34939f14c07876d222c25b405ed458a34d3/packages/compiler/src/shadow_css.ts#L441\n\n      We have to use :host insted of :host-context($theme), to be able to prefix theme class\n      with something defined inside of @content, by prefixing &.\n      For example this scss code:\n        .nb-theme-default {\n          .some-selector & {\n            ...\n          }\n        }\n      Will result in next css:\n        .some-selector .nb-theme-default {\n          ...\n        }\n\n      It doesn't work with :host-context because angular splitting it in two selectors and removes\n      prefix in one of the selectors.\n    */\n  /*\n      :host can be prefixed\n      https://github.com/angular/angular/blob/8d0ee34939f14c07876d222c25b405ed458a34d3/packages/compiler/src/shadow_css.ts#L441\n\n      We have to use :host insted of :host-context($theme), to be able to prefix theme class\n      with something defined inside of @content, by prefixing &.\n      For example this scss code:\n        .nb-theme-default {\n          .some-selector & {\n            ...\n          }\n        }\n      Will result in next css:\n        .some-selector .nb-theme-default {\n          ...\n        }\n\n      It doesn't work with :host-context because angular splitting it in two selectors and removes\n      prefix in one of the selectors.\n    */\n  /*\n      :host can be prefixed\n      https://github.com/angular/angular/blob/8d0ee34939f14c07876d222c25b405ed458a34d3/packages/compiler/src/shadow_css.ts#L441\n\n      We have to use :host insted of :host-context($theme), to be able to prefix theme class\n      with something defined inside of @content, by prefixing &.\n      For example this scss code:\n        .nb-theme-default {\n          .some-selector & {\n            ...\n          }\n        }\n      Will result in next css:\n        .some-selector .nb-theme-default {\n          ...\n        }\n\n      It doesn't work with :host-context because angular splitting it in two selectors and removes\n      prefix in one of the selectors.\n    */ }\n.nb-theme-cosmic :host nb-card {\n    display: flex;\n    flex-direction: row;\n    height: 100%; }\n.nb-theme-cosmic :host nb-card-body {\n    overflow: hidden; }\n.nb-theme-cosmic :host .consumption-table {\n    display: flex;\n    flex-direction: column;\n    width: 20rem;\n    height: 100%;\n    z-index: 2;\n    box-shadow: 0 8px 20px 0 rgba(40, 37, 89, 0.6); }\n.nb-theme-cosmic :host .table-header {\n    padding: 1.25rem;\n    border-bottom-width: 1px;\n    border-bottom-style: solid;\n    border-bottom-color: #342e73;\n    border-top-left-radius: 0.5rem;\n    border-top-right-radius: 0.5rem;\n    color: #ffffff;\n    font-family: Exo;\n    font-size: 1.125rem;\n    font-weight: 500;\n    font-size: 1.25rem; }\n.nb-theme-cosmic :host .table-header h1 {\n      margin: 0; }\n.nb-theme-cosmic :host .table-header h2 {\n      margin: 0; }\n.nb-theme-cosmic :host .table-header h3 {\n      margin: 0; }\n.nb-theme-cosmic :host .table-header h4 {\n      margin: 0; }\n.nb-theme-cosmic :host .table-header h5 {\n      margin: 0; }\n.nb-theme-cosmic :host .table-header h6 {\n      margin: 0; }\n.nb-theme-cosmic :host .table-header .subtitle {\n      color: #a1a1e5;\n      font-family: Roboto;\n      font-size: 1rem;\n      font-weight: 300; }\n.nb-theme-cosmic :host nb-tabset /deep/ {\n    flex: 1;\n    overflow: hidden;\n    display: flex;\n    flex-direction: column; }\n.nb-theme-cosmic :host nb-tabset /deep/ ul {\n      align-items: center;\n      padding: 1rem; }\n.nb-theme-cosmic :host nb-tabset /deep/ ul li a {\n      font-weight: 500;\n      padding: 0.75rem 1rem; }\n.nb-theme-cosmic :host nb-tabset /deep/ ul li.active {\n      position: relative;\n      background-color: #2f296b;\n      border-radius: 0.5rem 0.5rem 0 0; }\n.nb-theme-cosmic :host nb-tabset /deep/ ul li.active::before {\n        position: absolute;\n        content: '';\n        width: 100%;\n        height: 5px;\n        border-radius: 2.5px;\n        bottom: 0;\n        left: 0;\n        background: #00d977; }\n.nb-theme-cosmic :host nb-tabset /deep/ ul li.active a {\n        font-size: 1.5rem; }\n.nb-theme-cosmic :host nb-tabset /deep/ ul li.active a::before {\n        display: none; }\n.nb-theme-cosmic :host nb-tabset /deep/ nb-tab {\n      flex: 1;\n      overflow-y: auto; }\n.nb-theme-cosmic :host .stats-month {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 1.25rem;\n    color: #a1a1e5;\n    position: relative; }\n.nb-theme-cosmic :host .stats-month:not(:first-child) {\n      border-top: 1px solid #342e73; }\n.nb-theme-cosmic :host .stats-month:hover {\n      background-color: #2f296b; }\n.nb-theme-cosmic :host .stats-month:hover::before {\n        position: absolute;\n        content: '';\n        height: 100%;\n        width: 6px;\n        left: 0;\n        top: 0;\n        background-color: #00d977;\n        border-radius: 0.5rem; }\n.nb-theme-cosmic :host .stats-month .testdate {\n      display: inline-block;\n      font-family: Exo;\n      font-size: 0.875rem;\n      font-weight: 300;\n      color: #ffffff; }\n.nb-theme-cosmic :host .stats-month .delta {\n      position: relative;\n      display: inline-block;\n      padding-left: 1rem;\n      font-size: 0.75rem;\n      color: #ff5680; }\n.nb-theme-cosmic :host .stats-month .delta::before {\n        position: absolute;\n        content: '';\n        bottom: 3px;\n        left: 2px;\n        border-left: 5px solid transparent;\n        border-right: 5px solid transparent;\n        border-bottom: 8px solid #ff5680; }\n.nb-theme-cosmic :host .stats-month .delta.down {\n        color: #26df8b; }\n.nb-theme-cosmic :host .stats-month .delta.down::before {\n          top: 3px;\n          border-top: 8px solid #26df8b;\n          border-bottom: none; }\n.nb-theme-cosmic :host .stats-month .results {\n      font-size: 1.275rem;\n      font-weight: 500; }\n.nb-theme-cosmic :host .stats-month .results b {\n        font-family: Exo;\n        font-size: 1.5rem;\n        font-weight: 600;\n        color: #ffffff; }\n.nb-theme-cosmic :host .chart-container {\n    flex: 1;\n    height: 100%;\n    background-image: radial-gradient(circle at 50% 50%, #423f8c, #302c6e);\n    display: flex;\n    flex-direction: column;\n    overflow: hidden; }\n.nb-theme-cosmic :host .chart-header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 1rem 1.75rem 1rem 1rem; }\n.nb-theme-cosmic :host .header-stats {\n    display: flex;\n    align-items: center; }\n.nb-theme-cosmic :host .stats-block {\n    display: flex;\n    flex-direction: column;\n    align-items: normal;\n    color: #a1a1e5;\n    padding: 0 1.5rem;\n    border-right: 1px solid #342e73; }\n.nb-theme-cosmic :host .stats-block .subtitle {\n      font-size: 1rem;\n      font-weight: 300; }\n.nb-theme-cosmic :host .stats-block .value {\n      font-family: Exo;\n      font-size: 1.5rem;\n      font-weight: 600;\n      color: #ffffff; }\n.nb-theme-cosmic :host .stats-block .unit {\n      font-family: Exo;\n      font-size: 1.25rem;\n      font-weight: 300; }\n.nb-theme-cosmic :host .dropdown {\n    min-width: 200px; }\n.nb-theme-cosmic :host nb-tabset /deep/ ul li.active {\n    background-color: #7659ff;\n    border-radius: 0.5rem; }\n.nb-theme-cosmic :host nb-tabset /deep/ ul li.active::before {\n      display: none; }\n.nb-theme-cosmic :host .stats-block .value {\n    font-weight: 500; }\n.nb-theme-cosmic :host .stats-month:hover::before {\n    background-image: linear-gradient(to top, #00d977, #00d9bf);\n    box-shadow: 0 0 16px -2px #00d99b; }\n@media (max-width: 1599.98px) {\n    .nb-theme-cosmic :host .stats-block {\n      border: none;\n      padding: 0 1rem; } }\n@media (min-width: 768px) and (max-width: 1399.98px) {\n    .nb-theme-cosmic :host .consumption-table {\n      display: none; } }\n@media (max-width: 991.98px) {\n    .nb-theme-cosmic :host .chart-header {\n      padding: 1rem; }\n    .nb-theme-cosmic :host .dropdown {\n      min-width: 100px; }\n      .nb-theme-cosmic :host .dropdown button {\n        padding-left: 0.75rem;\n        padding-right: 0.75rem; } }\n@media (max-width: 767.98px) {\n    .nb-theme-cosmic :host .consumption-table {\n      display: none; } }\n@media (max-width: 399.98px) {\n    .nb-theme-cosmic :host .stats-block {\n      padding: 0; }\n      .nb-theme-cosmic :host .stats-block:first-child {\n        padding: 0 0.5rem; }\n      .nb-theme-cosmic :host .stats-block .subtitle {\n        font-size: 1rem; }\n      .nb-theme-cosmic :host .stats-block .value {\n        font-size: 1.5rem; }\n      .nb-theme-cosmic :host .stats-block .unit {\n        display: none; } }\n.nb-theme-cosmic :host .nb-theme-default :host {\n    display: block;\n    flex: 1;\n    position: relative; }\n.nb-theme-cosmic :host .nb-theme-default :host .echart1 {\n      position: absolute;\n      width: 100%;\n      height: 100%; }\n.nb-theme-cosmic :host .nb-theme-default :host .echart2 {\n      position: absolute;\n      width: 100%;\n      height: 100%; }\n.nb-theme-cosmic :host .nb-theme-cosmic :host {\n    display: block;\n    flex: 1;\n    position: relative; }\n.nb-theme-cosmic :host .nb-theme-cosmic :host .echart1 {\n      position: absolute;\n      width: 100%;\n      height: 100%; }\n.nb-theme-cosmic :host .nb-theme-cosmic :host .echart2 {\n      position: absolute;\n      width: 100%;\n      height: 100%; }\n.nb-theme-cosmic :host .nb-theme-corporate :host {\n    display: block;\n    flex: 1;\n    position: relative; }\n.nb-theme-cosmic :host .nb-theme-corporate :host .echart1 {\n      position: absolute;\n      width: 100%;\n      height: 100%; }\n.nb-theme-cosmic :host .nb-theme-corporate :host .echart2 {\n      position: absolute;\n      width: 100%;\n      height: 100%; }\n/*\n      :host can be prefixed\n      https://github.com/angular/angular/blob/8d0ee34939f14c07876d222c25b405ed458a34d3/packages/compiler/src/shadow_css.ts#L441\n\n      We have to use :host insted of :host-context($theme), to be able to prefix theme class\n      with something defined inside of @content, by prefixing &.\n      For example this scss code:\n        .nb-theme-default {\n          .some-selector & {\n            ...\n          }\n        }\n      Will result in next css:\n        .some-selector .nb-theme-default {\n          ...\n        }\n\n      It doesn't work with :host-context because angular splitting it in two selectors and removes\n      prefix in one of the selectors.\n    */\n.nb-theme-corporate :host {\n  /*\n      :host can be prefixed\n      https://github.com/angular/angular/blob/8d0ee34939f14c07876d222c25b405ed458a34d3/packages/compiler/src/shadow_css.ts#L441\n\n      We have to use :host insted of :host-context($theme), to be able to prefix theme class\n      with something defined inside of @content, by prefixing &.\n      For example this scss code:\n        .nb-theme-default {\n          .some-selector & {\n            ...\n          }\n        }\n      Will result in next css:\n        .some-selector .nb-theme-default {\n          ...\n        }\n\n      It doesn't work with :host-context because angular splitting it in two selectors and removes\n      prefix in one of the selectors.\n    */\n  /*\n      :host can be prefixed\n      https://github.com/angular/angular/blob/8d0ee34939f14c07876d222c25b405ed458a34d3/packages/compiler/src/shadow_css.ts#L441\n\n      We have to use :host insted of :host-context($theme), to be able to prefix theme class\n      with something defined inside of @content, by prefixing &.\n      For example this scss code:\n        .nb-theme-default {\n          .some-selector & {\n            ...\n          }\n        }\n      Will result in next css:\n        .some-selector .nb-theme-default {\n          ...\n        }\n\n      It doesn't work with :host-context because angular splitting it in two selectors and removes\n      prefix in one of the selectors.\n    */\n  /*\n      :host can be prefixed\n      https://github.com/angular/angular/blob/8d0ee34939f14c07876d222c25b405ed458a34d3/packages/compiler/src/shadow_css.ts#L441\n\n      We have to use :host insted of :host-context($theme), to be able to prefix theme class\n      with something defined inside of @content, by prefixing &.\n      For example this scss code:\n        .nb-theme-default {\n          .some-selector & {\n            ...\n          }\n        }\n      Will result in next css:\n        .some-selector .nb-theme-default {\n          ...\n        }\n\n      It doesn't work with :host-context because angular splitting it in two selectors and removes\n      prefix in one of the selectors.\n    */ }\n.nb-theme-corporate :host nb-card {\n    display: flex;\n    flex-direction: row;\n    height: 100%; }\n.nb-theme-corporate :host nb-card-body {\n    overflow: hidden; }\n.nb-theme-corporate :host .consumption-table {\n    display: flex;\n    flex-direction: column;\n    width: 20rem;\n    height: 100%;\n    z-index: 2;\n    box-shadow: none;\n    border-right: 1px solid #d5dbe0; }\n.nb-theme-corporate :host .table-header {\n    padding: 1.25rem;\n    border-bottom-width: 0;\n    border-bottom-style: solid;\n    border-bottom-color: #cdd5dc;\n    border-top-left-radius: 0.17rem;\n    border-top-right-radius: 0.17rem;\n    color: #181818;\n    font-family: Exo;\n    font-size: 1.125rem;\n    font-weight: 600;\n    font-size: 1.25rem; }\n.nb-theme-corporate :host .table-header h1 {\n      margin: 0; }\n.nb-theme-corporate :host .table-header h2 {\n      margin: 0; }\n.nb-theme-corporate :host .table-header h3 {\n      margin: 0; }\n.nb-theme-corporate :host .table-header h4 {\n      margin: 0; }\n.nb-theme-corporate :host .table-header h5 {\n      margin: 0; }\n.nb-theme-corporate :host .table-header h6 {\n      margin: 0; }\n.nb-theme-corporate :host .table-header .subtitle {\n      color: #a4abb3;\n      font-family: Roboto;\n      font-size: 1rem;\n      font-weight: 300; }\n.nb-theme-corporate :host nb-tabset /deep/ {\n    flex: 1;\n    overflow: hidden;\n    display: flex;\n    flex-direction: column; }\n.nb-theme-corporate :host nb-tabset /deep/ ul {\n      align-items: center;\n      padding: 1rem; }\n.nb-theme-corporate :host nb-tabset /deep/ ul li a {\n      font-weight: 500;\n      padding: 0.75rem 1rem; }\n.nb-theme-corporate :host nb-tabset /deep/ ul li.active {\n      position: relative;\n      background-color: #f1f5f8;\n      border-radius: 0.17rem 0.17rem 0 0; }\n.nb-theme-corporate :host nb-tabset /deep/ ul li.active::before {\n        position: absolute;\n        content: '';\n        width: 100%;\n        height: 5px;\n        border-radius: 2.5px;\n        bottom: 0;\n        left: 0;\n        background: #5dcfe3; }\n.nb-theme-corporate :host nb-tabset /deep/ ul li.active a {\n        font-size: 1.5rem; }\n.nb-theme-corporate :host nb-tabset /deep/ ul li.active a::before {\n        display: none; }\n.nb-theme-corporate :host nb-tabset /deep/ nb-tab {\n      flex: 1;\n      overflow-y: auto; }\n.nb-theme-corporate :host .stats-month {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 1.25rem;\n    color: #a4abb3;\n    position: relative; }\n.nb-theme-corporate :host .stats-month:not(:first-child) {\n      border-top: 1px solid #cdd5dc;\n      border-top-color: #ebecee; }\n.nb-theme-corporate :host .stats-month:hover {\n      background-color: #f1f5f8; }\n.nb-theme-corporate :host .stats-month:hover::before {\n        position: absolute;\n        content: '';\n        height: 100%;\n        width: 6px;\n        left: 0;\n        top: 0;\n        background-color: #5dcfe3;\n        border-radius: 0.17rem; }\n.nb-theme-corporate :host .stats-month .testdate {\n      display: inline-block;\n      font-family: Exo;\n      font-size: 0.875rem;\n      font-weight: 300;\n      color: #181818; }\n.nb-theme-corporate :host .stats-month .delta {\n      position: relative;\n      display: inline-block;\n      padding-left: 1rem;\n      font-size: 0.75rem;\n      color: #ff8196; }\n.nb-theme-corporate :host .stats-month .delta::before {\n        position: absolute;\n        content: '';\n        bottom: 3px;\n        left: 2px;\n        border-left: 5px solid transparent;\n        border-right: 5px solid transparent;\n        border-bottom: 8px solid #ff8196; }\n.nb-theme-corporate :host .stats-month .delta.down {\n        color: #75d6e7; }\n.nb-theme-corporate :host .stats-month .delta.down::before {\n          top: 3px;\n          border-top: 8px solid #75d6e7;\n          border-bottom: none; }\n.nb-theme-corporate :host .stats-month .results {\n      font-size: 1.275rem;\n      font-weight: 500; }\n.nb-theme-corporate :host .stats-month .results b {\n        font-family: Exo;\n        font-size: 1.5rem;\n        font-weight: 600;\n        color: #181818; }\n.nb-theme-corporate :host .chart-container {\n    flex: 1;\n    height: 100%;\n    background-image: none;\n    display: flex;\n    flex-direction: column;\n    overflow: hidden; }\n.nb-theme-corporate :host .chart-header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 1rem 1.75rem 1rem 1rem; }\n.nb-theme-corporate :host .header-stats {\n    display: flex;\n    align-items: center; }\n.nb-theme-corporate :host .stats-block {\n    display: flex;\n    flex-direction: column;\n    align-items: normal;\n    color: #a4abb3;\n    padding: 0 1.5rem;\n    border-right: 1px solid #cdd5dc; }\n.nb-theme-corporate :host .stats-block .subtitle {\n      font-size: 1rem;\n      font-weight: 300; }\n.nb-theme-corporate :host .stats-block .value {\n      font-family: Exo;\n      font-size: 1.5rem;\n      font-weight: 600;\n      color: #181818; }\n.nb-theme-corporate :host .stats-block .unit {\n      font-family: Exo;\n      font-size: 1.25rem;\n      font-weight: 300; }\n.nb-theme-corporate :host .dropdown {\n    min-width: 200px; }\n.nb-theme-corporate :host nb-tabset /deep/ ul li.active::before {\n    display: none; }\n.nb-theme-corporate :host .stats-block {\n    border-right: none; }\n.nb-theme-corporate :host .stats-month:hover::before {\n    background-color: #73a1ff; }\n.nb-theme-corporate :host .stats-month .delta.down {\n    color: #88afff; }\n.nb-theme-corporate :host .stats-month .delta.down::before {\n      border-top: 8px solid #88afff; }\n@media (max-width: 1599.98px) {\n    .nb-theme-corporate :host .stats-block {\n      border: none;\n      padding: 0 1rem; } }\n@media (min-width: 768px) and (max-width: 1399.98px) {\n    .nb-theme-corporate :host .consumption-table {\n      display: none; } }\n@media (max-width: 991.98px) {\n    .nb-theme-corporate :host .chart-header {\n      padding: 1rem; }\n    .nb-theme-corporate :host .dropdown {\n      min-width: 100px; }\n      .nb-theme-corporate :host .dropdown button {\n        padding-left: 0.75rem;\n        padding-right: 0.75rem; } }\n@media (max-width: 767.98px) {\n    .nb-theme-corporate :host .consumption-table {\n      display: none; } }\n@media (max-width: 399.98px) {\n    .nb-theme-corporate :host .stats-block {\n      padding: 0; }\n      .nb-theme-corporate :host .stats-block:first-child {\n        padding: 0 0.5rem; }\n      .nb-theme-corporate :host .stats-block .subtitle {\n        font-size: 1rem; }\n      .nb-theme-corporate :host .stats-block .value {\n        font-size: 1.5rem; }\n      .nb-theme-corporate :host .stats-block .unit {\n        display: none; } }\n.nb-theme-corporate :host .nb-theme-default :host {\n    display: block;\n    flex: 1;\n    position: relative; }\n.nb-theme-corporate :host .nb-theme-default :host .echart1 {\n      position: absolute;\n      width: 100%;\n      height: 100%; }\n.nb-theme-corporate :host .nb-theme-default :host .echart2 {\n      position: absolute;\n      width: 100%;\n      height: 100%; }\n.nb-theme-corporate :host .nb-theme-cosmic :host {\n    display: block;\n    flex: 1;\n    position: relative; }\n.nb-theme-corporate :host .nb-theme-cosmic :host .echart1 {\n      position: absolute;\n      width: 100%;\n      height: 100%; }\n.nb-theme-corporate :host .nb-theme-cosmic :host .echart2 {\n      position: absolute;\n      width: 100%;\n      height: 100%; }\n.nb-theme-corporate :host .nb-theme-corporate :host {\n    display: block;\n    flex: 1;\n    position: relative; }\n.nb-theme-corporate :host .nb-theme-corporate :host .echart1 {\n      position: absolute;\n      width: 100%;\n      height: 100%; }\n.nb-theme-corporate :host .nb-theme-corporate :host .echart2 {\n      position: absolute;\n      width: 100%;\n      height: 100%; }\n"

/***/ }),

/***/ "./src/app/pages/history/graph/graph.component.ts":
/*!********************************************************!*\
  !*** ./src/app/pages/history/graph/graph.component.ts ***!
  \********************************************************/
/*! exports provided: ReversePipe, GraphComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReversePipe", function() { return ReversePipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphComponent", function() { return GraphComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _nebular_theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nebular/theme */ "./node_modules/@nebular/theme/index.js");
/* harmony import */ var _core_data_layout_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../@core/data/layout.service */ "./src/app/@core/data/layout.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _core_data_electricity_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../@core/data/electricity.service */ "./src/app/@core/data/electricity.service.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ReversePipe = /** @class */ (function () {
    function ReversePipe() {
    }
    ReversePipe.prototype.transform = function (values) {
        if (values) {
            return values.reverse();
        }
    };
    ReversePipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'reverse',
            pure: false
        })
    ], ReversePipe);
    return ReversePipe;
}());

var GraphComponent = /** @class */ (function () {
    function GraphComponent(eService, themeService, http, theme, layoutService, router) {
        var _this = this;
        this.eService = eService;
        this.themeService = themeService;
        this.http = http;
        this.theme = theme;
        this.layoutService = layoutService;
        this.router = router;
        this.groupName = '';
        this.testName = '';
        this.lastTestTime = ':';
        this.lastPassRate = 0;
        this.lastPassCount = 0;
        this.lastFailCount = 0;
        this.lastMatchingRate = 0;
        this.selPassGate = 'Pass Gate : 90%';
        this.selPassGates = ['Pass Gate : 95%', 'Pass Gate : 90%', 'Pass Gate : 85%', 'Pass Gate : 80%', 'Pass Gate : 75%', 'Pass Gate : 70%'];
        this.currentTheme = 'corporate';
        this.themeSubscription = this.themeService.getJsTheme().subscribe();
        this.layoutService.onChangeLayoutSize()
            .subscribe(function () { return _this.resizeChart(); });
    }
    GraphComponent.prototype.ngOnChanges = function (changes) {
        var group = changes.groupName;
        var test = changes.testName;
        if (group == undefined && test == undefined) {
            return;
        }
        this.requestChartData();
    };
    GraphComponent.prototype.requestChartData = function () {
        var _this = this;
        this.http
            .get(_environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].apiBase + '/api/file/' + this.groupName + '/' + this.testName + '/history')
            .subscribe(function (history) {
            _this.passGate = history.passgate;
            _this.selPassGate = 'Pass Gate : ' + history.passgate + '%';
            _this.listdata = history.datas;
            _this.drawChart(history.datas);
        });
    };
    GraphComponent.prototype.onChartInit1 = function (echarts) {
        this.echartsIntance1 = echarts;
    };
    GraphComponent.prototype.onChartInit2 = function (echarts) {
        this.echartsIntance2 = echarts;
    };
    GraphComponent.prototype.resizeChart = function () {
        if (this.echartsIntance1) {
            this.echartsIntance1.resize();
        }
        if (this.echartsIntance2) {
            this.echartsIntance2.resize();
        }
    };
    GraphComponent.prototype.ngOnDestroy = function () {
        this.themeSubscription.unsubscribe();
    };
    GraphComponent.prototype.drawChart = function (datas) {
        var _this = this;
        this.passData = datas.map(function (obj, index) { return ({
            label: obj.testDate + ' ' + obj.testTime,
            value: obj.passRate
        }); });
        this.compareData = datas.map(function (obj, index) { return ({
            label: obj.testDate + ' ' + obj.testTime,
            value: obj.avgRate
        }); });
        var size = datas.length;
        if (size > 0) {
            this.lastTestTime = datas[size - 1].testDate + ' ' + datas[size - 1].testTime;
            this.lastPassRate = datas[size - 1].passRate;
            this.lastPassCount = datas[size - 1].passCount;
            this.lastFailCount = datas[size - 1].failCount;
            this.lastMatchingRate = datas[size - 1].avgRate;
        }
        this.theme.getJsTheme()
            .subscribe(function (config) {
            var eTheme = config.variables.electricity;
            _this.passOption = {
                grid: {
                    left: 20,
                    top: 0,
                    right: 20,
                    bottom: 30,
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'line',
                        lineStyle: {
                            color: eTheme.tooltipLineColor,
                            width: eTheme.tooltipLineWidth,
                        },
                    },
                    textStyle: {
                        color: eTheme.tooltipTextColor,
                        fontSize: 20,
                        fontWeight: eTheme.tooltipFontWeight,
                    },
                    position: 'top',
                    backgroundColor: eTheme.tooltipBg,
                    borderColor: eTheme.tooltipBorderColor,
                    borderWidth: 3,
                    formatter: '{b0}<br/>Pass Rate : {c0} %',
                    extraCssText: eTheme.tooltipExtraCss,
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    offset: 25,
                    data: _this.passData.map(function (i) { return i.label; }),
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        color: eTheme.xAxisTextColor,
                        fontSize: 18,
                    },
                    axisLine: {
                        lineStyle: {
                            color: eTheme.axisLineColor,
                            width: '2',
                        },
                    },
                },
                yAxis: {
                    boundaryGap: [0, '5%'],
                    axisLine: {
                        show: false,
                    },
                    axisLabel: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: eTheme.yAxisSplitLine,
                            width: '1',
                        },
                    },
                },
                series: [
                    {
                        type: 'line',
                        smooth: true,
                        symbolSize: 20,
                        itemStyle: {
                            normal: {
                                opacity: 0,
                            },
                            emphasis: {
                                color: '#ffffff',
                                borderColor: eTheme.itemBorderColor,
                                borderWidth: 2,
                                opacity: 1,
                            },
                        },
                        lineStyle: {
                            normal: {
                                width: eTheme.lineWidth,
                                type: eTheme.lineStyle,
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: eTheme.lineGradFrom,
                                    }, {
                                        offset: 1,
                                        color: eTheme.lineGradTo,
                                    }]),
                                shadowColor: eTheme.lineShadow,
                                shadowBlur: 6,
                                shadowOffsetY: 12,
                            },
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: eTheme.areaGradFrom,
                                    }, {
                                        offset: 1,
                                        color: eTheme.areaGradTo,
                                    }]),
                            },
                        },
                        data: _this.passData.map(function (i) { return i.value; }),
                    },
                    {
                        type: 'line',
                        smooth: true,
                        symbol: 'none',
                        lineStyle: {
                            normal: {
                                width: eTheme.lineWidth,
                                type: eTheme.lineStyle,
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: eTheme.lineGradFrom,
                                    }, {
                                        offset: 1,
                                        color: eTheme.lineGradTo,
                                    }]),
                                shadowColor: eTheme.shadowLineDarkBg,
                                shadowBlur: 14,
                                opacity: 1,
                            },
                        },
                        data: _this.passData.map(function (i) { return i.value; }),
                    },
                ],
            };
            _this.compareOption = {
                grid: {
                    left: 20,
                    top: 10,
                    right: 20,
                    bottom: 30,
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'line',
                        lineStyle: {
                            color: eTheme.tooltipLineColor,
                            width: eTheme.tooltipLineWidth,
                        },
                    },
                    textStyle: {
                        color: eTheme.tooltipTextColor,
                        fontSize: 20,
                        fontWeight: eTheme.tooltipFontWeight,
                    },
                    position: 'top',
                    backgroundColor: eTheme.tooltipBg,
                    borderColor: eTheme.tooltipBorderColor,
                    borderWidth: 3,
                    formatter: '{b0}<br/>Compare Rate : {c0} %',
                    extraCssText: eTheme.tooltipExtraCss,
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    offset: 25,
                    data: _this.compareData.map(function (i) { return i.label; }),
                    axisTick: {
                        show: false,
                    },
                    axisLabel: {
                        color: eTheme.xAxisTextColor,
                        fontSize: 18,
                    },
                    axisLine: {
                        lineStyle: {
                            color: eTheme.axisLineColor,
                            width: '2',
                        },
                    },
                },
                yAxis: {
                    boundaryGap: [0, '5%'],
                    axisLine: {
                        show: false,
                    },
                    axisLabel: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: eTheme.yAxisSplitLine,
                            width: '1',
                        },
                    },
                },
                series: [
                    {
                        type: 'line',
                        smooth: true,
                        symbolSize: 20,
                        itemStyle: {
                            normal: {
                                opacity: 0,
                            },
                            emphasis: {
                                color: '#ffffff',
                                borderColor: eTheme.itemBorderColor,
                                borderWidth: 2,
                                opacity: 1,
                            },
                        },
                        lineStyle: {
                            normal: {
                                width: eTheme.lineWidth,
                                type: eTheme.lineStyle,
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: eTheme.lineGradFrom,
                                    }, {
                                        offset: 1,
                                        color: eTheme.lineGradTo,
                                    }]),
                                shadowColor: eTheme.lineShadow,
                                shadowBlur: 6,
                                shadowOffsetY: 12,
                            },
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: eTheme.areaGradFrom,
                                    }, {
                                        offset: 1,
                                        color: eTheme.areaGradTo,
                                    }]),
                            },
                        },
                        data: _this.compareData.map(function (i) { return i.value; }),
                    },
                    {
                        type: 'line',
                        smooth: true,
                        symbol: 'none',
                        lineStyle: {
                            normal: {
                                width: eTheme.lineWidth,
                                type: eTheme.lineStyle,
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: eTheme.lineGradFrom,
                                    }, {
                                        offset: 1,
                                        color: eTheme.lineGradTo,
                                    }]),
                                shadowColor: eTheme.shadowLineDarkBg,
                                shadowBlur: 14,
                                opacity: 1,
                            },
                        },
                        data: _this.compareData.map(function (i) { return i.value; }),
                    },
                ],
            };
        });
    };
    GraphComponent.prototype.moveGallery = function (id) {
        console.log('/pages/gallery/' + this.groupName + '/' + this.testName + '/' + id);
        this.router.navigateByUrl('/pages/gallery/' + this.groupName + '/' + this.testName + '/' + id);
    };
    GraphComponent.prototype.chagePassGate = function (gate) {
        var _this = this;
        var gatePass = gate.replace('%', '').substring(12);
        this.selPassGate = gate;
        this.http
            .get(_environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"].apiBase + '/api/file/' + this.groupName + '/' + this.testName + '/' + gatePass + '/generate')
            .subscribe(function (gen) {
            console.log(gen);
            _this.requestChartData();
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], GraphComponent.prototype, "groupName", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], GraphComponent.prototype, "testName", void 0);
    GraphComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ngx-graph',
            styles: [__webpack_require__(/*! ./graph.component.scss */ "./src/app/pages/history/graph/graph.component.scss")],
            template: __webpack_require__(/*! ./graph.component.html */ "./src/app/pages/history/graph/graph.component.html"),
        }),
        __metadata("design:paramtypes", [_core_data_electricity_service__WEBPACK_IMPORTED_MODULE_5__["ElectricityService"],
            _nebular_theme__WEBPACK_IMPORTED_MODULE_1__["NbThemeService"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"],
            _nebular_theme__WEBPACK_IMPORTED_MODULE_1__["NbThemeService"],
            _core_data_layout_service__WEBPACK_IMPORTED_MODULE_2__["LayoutService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], GraphComponent);
    return GraphComponent;
}());



/***/ }),

/***/ "./src/app/pages/history/history.component.html":
/*!******************************************************!*\
  !*** ./src/app/pages/history/history.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n  <div class=\"col-xxxl-12 col-xxl-12 col-lg-12 col-md-12\">\r\n    <ngx-graph [groupName]=\"groupName\"\r\n               [testName]=\"testName\">\r\n    </ngx-graph>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/history/history.component.scss":
/*!******************************************************!*\
  !*** ./src/app/pages/history/history.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/pages/history/history.component.ts":
/*!****************************************************!*\
  !*** ./src/app/pages/history/history.component.ts ***!
  \****************************************************/
/*! exports provided: HistoryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HistoryComponent", function() { return HistoryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _nebular_theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nebular/theme */ "./node_modules/@nebular/theme/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HistoryComponent = /** @class */ (function () {
    function HistoryComponent(themeService, route, router) {
        var _this = this;
        this.themeService = themeService;
        this.route = route;
        this.router = router;
        this.groupName = '';
        this.testName = '';
        this.navigationSubscription = this.router.events.subscribe(function (e) {
            if (e instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationEnd"]) {
                _this.refreshInit();
            }
        });
    }
    HistoryComponent.prototype.refreshInit = function () {
        this.groupName = this.route.snapshot.paramMap.get('group');
        this.testName = this.route.snapshot.paramMap.get('testcase');
    };
    HistoryComponent.prototype.ngOnInit = function () {
        this.themeService.getJsTheme();
    };
    HistoryComponent.prototype.ngOnDestroy = function () {
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    };
    HistoryComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ngx-history',
            template: __webpack_require__(/*! ./history.component.html */ "./src/app/pages/history/history.component.html"),
            styles: [__webpack_require__(/*! ./history.component.scss */ "./src/app/pages/history/history.component.scss")],
        }),
        __metadata("design:paramtypes", [_nebular_theme__WEBPACK_IMPORTED_MODULE_2__["NbThemeService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], HistoryComponent);
    return HistoryComponent;
}());



/***/ }),

/***/ "./src/app/pages/history/history.module.ts":
/*!*************************************************!*\
  !*** ./src/app/pages/history/history.module.ts ***!
  \*************************************************/
/*! exports provided: HistoryModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HistoryModule", function() { return HistoryModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_echarts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-echarts */ "./node_modules/ngx-echarts/ngx-echarts.es5.js");
/* harmony import */ var _theme_theme_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../@theme/theme.module */ "./src/app/@theme/theme.module.ts");
/* harmony import */ var _history_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./history.component */ "./src/app/pages/history/history.component.ts");
/* harmony import */ var _graph_graph_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./graph/graph.component */ "./src/app/pages/history/graph/graph.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var HistoryModule = /** @class */ (function () {
    function HistoryModule() {
    }
    HistoryModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _theme_theme_module__WEBPACK_IMPORTED_MODULE_2__["ThemeModule"],
                ngx_echarts__WEBPACK_IMPORTED_MODULE_1__["NgxEchartsModule"],
            ],
            declarations: [
                _history_component__WEBPACK_IMPORTED_MODULE_3__["HistoryComponent"],
                _graph_graph_component__WEBPACK_IMPORTED_MODULE_4__["GraphComponent"],
                _graph_graph_component__WEBPACK_IMPORTED_MODULE_4__["ReversePipe"],
            ],
        })
    ], HistoryModule);
    return HistoryModule;
}());



/***/ }),

/***/ "./src/app/pages/pages-menu.ts":
/*!*************************************!*\
  !*** ./src/app/pages/pages-menu.ts ***!
  \*************************************/
/*! exports provided: MENU_ITEMS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MENU_ITEMS", function() { return MENU_ITEMS; });
var MENU_ITEMS = [];


/***/ }),

/***/ "./src/app/pages/pages-routing.module.ts":
/*!***********************************************!*\
  !*** ./src/app/pages/pages-routing.module.ts ***!
  \***********************************************/
/*! exports provided: PagesRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagesRoutingModule", function() { return PagesRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _pages_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages.component */ "./src/app/pages/pages.component.ts");
/* harmony import */ var _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dashboard/dashboard.component */ "./src/app/pages/dashboard/dashboard.component.ts");
/* harmony import */ var _history_history_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./history/history.component */ "./src/app/pages/history/history.component.ts");
/* harmony import */ var _comparegallery_comparegallery_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./comparegallery/comparegallery.component */ "./src/app/pages/comparegallery/comparegallery.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var routes = [{
        path: '',
        component: _pages_component__WEBPACK_IMPORTED_MODULE_2__["PagesComponent"],
        children: [{
                path: 'dashboard',
                component: _dashboard_dashboard_component__WEBPACK_IMPORTED_MODULE_3__["DashboardComponent"],
            }, {
                path: 'history/:group/:testcase',
                component: _history_history_component__WEBPACK_IMPORTED_MODULE_4__["HistoryComponent"],
            }, {
                path: 'gallery/:group/:testcase/:seq',
                component: _comparegallery_comparegallery_component__WEBPACK_IMPORTED_MODULE_5__["ComparegalleryComponent"],
            }, {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            }],
    }];
var PagesRoutingModule = /** @class */ (function () {
    function PagesRoutingModule() {
    }
    PagesRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)
            ],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]],
        })
    ], PagesRoutingModule);
    return PagesRoutingModule;
}());



/***/ }),

/***/ "./src/app/pages/pages.component.ts":
/*!******************************************!*\
  !*** ./src/app/pages/pages.component.ts ***!
  \******************************************/
/*! exports provided: PagesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagesComponent", function() { return PagesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _pages_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages-menu */ "./src/app/pages/pages-menu.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PagesComponent = /** @class */ (function () {
    function PagesComponent(http) {
        this.http = http;
        this.menu = [];
        this.getMenus();
        this.menu = this.menuItems;
    }
    PagesComponent.prototype.getMenus = function () {
        var _this = this;
        this.menuItems = _pages_menu__WEBPACK_IMPORTED_MODULE_2__["MENU_ITEMS"];
        var offset = this.menuItems.length;
        this.http
            .get(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiBase + '/api/file/all')
            .subscribe(function (groups) { return _this.getTestcases(offset, groups); });
    };
    PagesComponent.prototype.getTestcases = function (offset, groups) {
        var _this = this;
        var _loop_1 = function (index1) {
            this_1.menuItems.push({
                title: groups[index1], icon: 'nb-grid-a-outline', children: [],
            });
            this_1.http
                .get(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiBase + '/api/file/' + groups[index1] + '/all')
                .subscribe(function (testcases) {
                for (var index2 = 0; index2 < testcases.length; index2++) {
                    _this.menuItems[offset + index1].children.push({
                        title: testcases[index2],
                        icon: 'nb-bar-chart',
                        link: '/pages/history/' + groups[index1] + '/' + testcases[index2],
                    });
                }
            });
        };
        var this_1 = this;
        for (var index1 = 0; index1 < groups.length; index1++) {
            _loop_1(index1);
        }
    };
    PagesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ngx-pages',
            template: "\n    <ngx-sample-layout>\n      <nb-menu [items]=\"menu\"></nb-menu>\n      <router-outlet></router-outlet>\n    </ngx-sample-layout>\n  ",
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], PagesComponent);
    return PagesComponent;
}());



/***/ }),

/***/ "./src/app/pages/pages.module.ts":
/*!***************************************!*\
  !*** ./src/app/pages/pages.module.ts ***!
  \***************************************/
/*! exports provided: PagesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagesModule", function() { return PagesModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _pages_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages.component */ "./src/app/pages/pages.component.ts");
/* harmony import */ var _dashboard_dashboard_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dashboard/dashboard.module */ "./src/app/pages/dashboard/dashboard.module.ts");
/* harmony import */ var _pages_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages-routing.module */ "./src/app/pages/pages-routing.module.ts");
/* harmony import */ var _theme_theme_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../@theme/theme.module */ "./src/app/@theme/theme.module.ts");
/* harmony import */ var _history_history_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./history/history.module */ "./src/app/pages/history/history.module.ts");
/* harmony import */ var _comparegallery_comparegallery_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./comparegallery/comparegallery.module */ "./src/app/pages/comparegallery/comparegallery.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var PagesModule = /** @class */ (function () {
    function PagesModule() {
    }
    PagesModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _pages_routing_module__WEBPACK_IMPORTED_MODULE_3__["PagesRoutingModule"],
                _theme_theme_module__WEBPACK_IMPORTED_MODULE_4__["ThemeModule"],
                _dashboard_dashboard_module__WEBPACK_IMPORTED_MODULE_2__["DashboardModule"],
                _history_history_module__WEBPACK_IMPORTED_MODULE_5__["HistoryModule"],
                _comparegallery_comparegallery_module__WEBPACK_IMPORTED_MODULE_6__["ComparegalleryModule"],
            ],
            declarations: [
                _pages_component__WEBPACK_IMPORTED_MODULE_1__["PagesComponent"],
            ],
        })
    ], PagesModule);
    return PagesModule;
}());



/***/ })

}]);
//# sourceMappingURL=app-pages-pages-module.js.map