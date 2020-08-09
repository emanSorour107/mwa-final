import { Component, OnInit } from '@angular/core';
import FarmerService from '../services/farmer.service';

@Component({
  selector: 'app-farmers',
  templateUrl: './farmers.component.html',
  styleUrls: ['./farmers.component.css']
})
export class FarmersComponent implements OnInit {

  constructor(private farmerService: FarmerService) { }

  farmers: []

  ngOnInit(): void {
    this.farmerService.getAllFarmers()
    .subscribe((records) => this.farmers = records)
  }

}
