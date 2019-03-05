import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from './store/reducers/products.reducer';

@Injectable()
export class ProductsService {

    public constructor(
        private _http: HttpClient,
    ) {}

    public getProducts(): Observable<IProduct[]> {
        // example const user: IUser = { firstName: 'Igor' };
        return this._http.get<IProduct[]>(`/products`, {
            headers: { 'Content-Type':  'jpeg'}
        });
    }

    public getProduct(id: string): Observable<IProduct> {
        return this._http.get<IProduct>(`/products/${id}`);
    }
}
