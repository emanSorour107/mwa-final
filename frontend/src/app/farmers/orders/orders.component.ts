import {Country} from './country';
import {CountryService} from './country.service';
import {NgbdSortableHeader, SortEvent} from './sortable.directive';

import {DecimalPipe} from '@angular/common';
import {Component, QueryList, ViewChildren, OnInit} from '@angular/core';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [CountryService, DecimalPipe]
})
export class OrdersComponent implements OnInit {

//   constructor() { }

  ngOnInit(): void {
  }

// }

// export class NgbdTableComplete {
  countries$: Observable<Country[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: CountryService) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
