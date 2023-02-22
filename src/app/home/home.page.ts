import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Papa from 'papaparse'; //npm install papaparse 
import { Translate } from './translate';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public home!: string;
  searchTerm: string = '';

  public translations: { [key: string]: string } = {};
  public kapampanganTranslations: { [key: string]: string } = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    
    ) {}

  ngOnInit() {
    this.home = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.parseCSV();
  }
  ngOnChanges(){

  }
  
  //this will convert csv to json 
  parseCSV() {
    const csvFilePath = '/assets/translate.csv';  
    Papa.parse(csvFilePath, {
      header: true,
      download: true,
      complete: (results) => {
        const data = results.data as Translate[];
        data.forEach(row => {
          const tagalogWord = row.TAGALOG;
          const kapampanganWord = row.KAPAMPANGAN;
          this.translations[tagalogWord] = kapampanganWord;
          this.kapampanganTranslations[kapampanganWord] = tagalogWord;
        });
      }
    });
  }

  searchTranslations() {
    const searchTerm = this.searchTerm.toLowerCase();
    if (this.translations[searchTerm] === undefined){
      return this.kapampanganTranslations[searchTerm];
    }
    else{
      return this.translations[searchTerm];
    }
  }

}
