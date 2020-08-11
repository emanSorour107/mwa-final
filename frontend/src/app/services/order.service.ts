import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export default class OrderService {

  constructor() { }

  getAllOrders = (farmerId: String) : Observable<[]> => {
    return Observable.create((obs) => setTimeout(obs.next(mockOrders), 1000))
  }
  
}


const mockOrders = [
  {
    _id : '5f321164098a8d6164f36e69',
    orderCode:'77777',
    createDate:'2020-08-10T05:00:00.000',
    customer: 'cust2',
    farmer:'far3',
    productList: '',
    status: 'READY',
    totalAmount :1020,
    pickUpTime:'2020-08-15T05:00:00.000Z',
    rate:'GOOD'
  },
  {
    _id : '5f321164098a8d6164f36e68',
    orderCode:'66666',
    createDate:'2020-08-10T05:00:00.000',
    customer: 'cust2',
    farmer:'far2',
    productList: '',
    status: 'PENDING',
    totalAmount :1020,
    pickUpTime:'2020-08-15T05:00:00.000Z',
    rate:'GOOD'
  },
  {
    _id : '5f321164098a8d6164f36e67',
    orderCode:'55555',
    createDate:'2020-08-10T05:00:00.000',
    customer: 'cust2',
    farmer:'far3',
    productList: '',
    status: 'READY',
    totalAmount :1020,
    pickUpTime:'2020-08-15T05:00:00.000Z',
    rate:'GOOD'   
  }
]


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