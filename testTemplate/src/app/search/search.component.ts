import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchConfig } from '../models/search-config.model';

@Component({
  selector: 'app-dynamic-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  data: any[] = [];
  

  searchConfig: SearchConfig = {
    radioOptions: ['Male' , 'Female'],
    includeSearchBar: true,
    includeDateRange: true,
    dropdownOptions: ['Boston' , 'New York' , 'Miami'],
    CheckboxValues: ['Boston' , 'New York'],

  };

  @Input() config: SearchConfig | undefined;

  filteredData: any[] = [];

  searchQuery: string = '';
  selectedRadioOption: string = ''; 
  selectedDropdownValue: string = '';

  selectedCheckboxValues: { [key: string]: boolean } = {};

  startDate: string = '';
  endDate: string = '';
  placeholderText: string = 'Search..';

  ngOnInit(): void {
    if (!this.config) {
      this.config = this.searchConfig;
    }
    this.filteredData = this.data;
    console.log(this.filteredData);
    this.endDate = new Date().toISOString().substring(0, 10);

    if (!this.config) {
      // Set default config if not provided
      this.config = {
        radioOptions: ['Male', 'Female'],
        includeSearchBar: true,
        includeDateRange: true,
        dropdownOptions: ['Boston', 'New York', 'Miami'],
        CheckboxValues: ['Boston', 'New York'],
      };
    }
}


}  