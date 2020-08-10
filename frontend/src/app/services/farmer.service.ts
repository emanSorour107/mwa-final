import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export default class FarmerService {

  constructor() { }

  getAllProducts = (farmerId: String) : Observable<[]> => {
    return Observable.create((obs) => {
      setTimeout(() => {
        obs.next(mockProducts)
      }, 1000)
    })
  }

  getAllFarmers = () : Observable<[]> => {
    return Observable.create((obs) => {
      setTimeout(() => obs.next(mockFarmers), 1000)
    })
  }
}

const mockFarmers = [
  {
    _id: 'asaasasasas',
    _userId: 'dasasassa',
    firstName: 'Tien Khanh',
    lastName: 'Nguyen',
    email: 'tien@gmail.com',
    tel: '23232322323',
    address: '123 S Main St, Fairfeild, IA 52556',
    reputation: 12
  },
  {
    _id: 'asaasasasas',
    _userId: 'dasasassa',
    firstName: 'Tien Khanh',
    lastName: 'Nguyen',
    email: 'tien@gmail.com',
    tel: '23232322323',
    address: '123 S Main St, Fairfeild, IA 52556',
    reputation: 12
  }
]

const mockProducts = [
  {
    _id: 'asasas',
    farmer: "asasasas",
    name: 'Shrimp - Black Tiger 16/20',
    description: 'scelerisque dui. Suspendisse ac metus vitae velit egestas lacinia. Sed',
    price: 36.07,
    photo: 'https://placeimg.com/500/500/tech?query=1',
    inStock: 7
  },
  {
    _id: 'asfdfdff',
    farmer: "asasasas",
    name: 'Shrimp - Black Tiger 16/20',
    description: 'scelerisque dui. Suspendisse ac metus vitae velit egestas lacinia. Sed',
    price: 36.07,
    photo: 'https://placeimg.com/500/500/tech?query=1',
    inStock: 7
  },
  {
    _id: 'dsdsdsdsd',
    farmer: "asasasas",
    name: 'Shrimp - Black Tiger 16/20',
    description: 'scelerisque dui. Suspendisse ac metus vitae velit egestas lacinia. Sed',
    price: 36.07,
    photo: 'https://placeimg.com/500/500/tech?query=1',
    inStock: 7
  }
]