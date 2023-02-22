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
var HomePage = /** @class */ (function () {
    function HomePage(activatedRoute) {
        this.activatedRoute = activatedRoute;
        this.searchTerm = '';
        this.translations = {};
        this.kapampanganTranslations = {};
    }
    HomePage.prototype.ngOnInit = function () {
        this.home = this.activatedRoute.snapshot.paramMap.get('id');
        this.parseCSV();
    };
    HomePage.prototype.ngOnChanges = function () {
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
                    var tagalogWord = row.TAGALOG;
                    var kapampanganWord = row.KAPAMPANGAN;
                    _this.translations[tagalogWord] = kapampanganWord;
                    _this.kapampanganTranslations[kapampanganWord] = tagalogWord;
                });
            }
        });
    };
    HomePage.prototype.searchTranslations = function () {
        var searchTerm = this.searchTerm.toLowerCase();
        if (this.translations[searchTerm] === undefined) {
            return this.kapampanganTranslations[searchTerm];
        }
        else {
            return this.translations[searchTerm];
        }
    };
    HomePage = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.page.html',
            styleUrls: ['./home.page.scss']
        })
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
