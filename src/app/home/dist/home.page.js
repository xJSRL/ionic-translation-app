"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomePage = void 0;
var core_1 = require("@angular/core");
var Papa = require("papaparse"); //npm install papaparse 
var ngx_filter_pipe_1 = require("ngx-filter-pipe");
var HomePage = /** @class */ (function () {
    function HomePage(activatedRoute, filterPipe) {
        this.activatedRoute = activatedRoute;
        this.filterPipe = filterPipe;
        this.searchTerm = '';
        this.translations = {};
        this.arr_translations = [];
    }
    HomePage.prototype.ngOnInit = function () {
        this.home = this.activatedRoute.snapshot.paramMap.get('id');
        this.parseCSV();
    };
    //this will convert csv to json 
    HomePage.prototype.parseCSV = function () {
        var _this = this;
        var csvFilePath = '/assets/translate.csv';
        Papa.parse(csvFilePath, {
            header: true,
            download: true,
            complete: function (results) {
                var data = results.data;
                data.forEach(function (row) {
                    var word = row.TAGALOG;
                    var translation = row.KAPAMPANGAN;
                    _this.translations[word] = translation;
                    _this.translations[translation] = word;
                });
                console.log(_this.translations);
            }
        });
    };
    HomePage.prototype.filterData = function () {
        var _this = this;
        var filteredObject = {};
        Object.keys(this.translations).forEach(function (key) {
            if (_this.translations[key].toLowerCase().includes(_this.searchTerm.toLowerCase())) {
                filteredObject[key] = _this.translations[key];
            }
        });
        return filteredObject;
    };
    HomePage = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.page.html',
            styleUrls: ['./home.page.scss'],
            providers: [ngx_filter_pipe_1.FilterPipe]
        })
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
