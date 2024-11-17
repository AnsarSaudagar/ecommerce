import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(
    private http: HttpClient,
    @Inject('API_BASE_NODE_URL') private apiNodeUrl: string
  ) {
  }

  getAddresses(){
    
    return this.http.get(this.apiNodeUrl + "address/");
  }
}
