import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Papa from 'papaparse'; //npm install papaparse 
import { Translate } from './translate';
import { FilterPipe } from 'ngx-filter-pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [FilterPipe]
})
export class HomePage implements OnInit {
  public home!: string;
  searchTerm: string = '';
  public translations: { [key: string]: string } = {};
  arr_translations = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private filterPipe: FilterPipe
    ) {

     }

  ngOnInit() {
    this.home = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.parseCSV();
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
          const word = row.TAGALOG;
          const translation = row.KAPAMPANGAN;
          this.translations[word] = translation;
          this.translations[translation] = word;
        });
        console.log(this.translations);
      }
    });
  }

  public filterData() {
    let filteredObject = {};
    Object.keys(this.translations).forEach((key) => {
        if (this.translations[key].toLowerCase().includes(this.searchTerm.toLowerCase())) {
            filteredObject[key] = this.translations[key];
        }
    });
    return filteredObject;
}

}