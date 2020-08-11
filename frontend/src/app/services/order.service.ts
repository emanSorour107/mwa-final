import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export default class OrderService {

  constructor() { }

  getOrders = (farmerId: String) : Observable<[]> => {
    return Observable.create((obs) => {
      setTimeout(() => {
        obs.next(mockOrders)
      }, 1000)
    })
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
    customer: 'cust1',
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
    farmer:'far1',
    productList: '',
    status: 'READY',
    totalAmount :1020,
    pickUpTime:'2020-08-15T05:00:00.000Z',
    rate:'GOOD'   
  },
  {
    _id : '5f321164098a8d6164f36e67',
    orderCode:'44444',
    createDate:'2020-08-10T05:00:00.000',
    customer: 'cust2',
    farmer:'far3',
    productList: '',
    status: 'COMPLETE',
    totalAmount :1020,
    pickUpTime:'2020-08-15T05:00:00.000Z',
    rate:'GOOD'   
  },
  {
    _id : '5f321164098a8d6164f36e67',
    orderCode:'33333',
    createDate:'2020-08-10T05:00:00.000',
    customer: 'cust1',
    farmer:'far4',
    productList: '',
    status: 'READY',
    totalAmount :1020,
    pickUpTime:'2020-08-15T05:00:00.000Z',
    rate:'GOOD'   
  },
  {
    _id : '5f321164098a8d6164f36e67',
    orderCode:'22222',
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
    orderCode:'11111',
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
    _id : '5f321164098a8d6164f36e67',
    orderCode:'00001',
    createDate:'2020-08-10T05:00:00.000',
    customer: 'cust3',
    farmer:'far3',
    productList: '',
    status: 'READY',
    totalAmount :1020,
    pickUpTime:'2020-08-15T05:00:00.000Z',
    rate:'GOOD'   
  },
  {
    _id : '5f321164098a8d6164f36e67',
    orderCode:'00002',
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
    _id : '5f321164098a8d6164f36e67',
    orderCode:'00003',
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
    _id : '5f321164098a8d6164f36e67',
    orderCode:'00004',
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
    _id : '5f321164098a8d6164f36e67',
    orderCode:'00005',
    createDate:'2020-08-10T05:00:00.000',
    customer: 'cust2',
    farmer:'far3',
    productList: '',
    status: 'COMPLETE',
    totalAmount :1020,
    pickUpTime:'2020-08-15T05:00:00.000Z',
    rate:'GOOD'   
  }
]