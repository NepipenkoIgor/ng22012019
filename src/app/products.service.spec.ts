import { inject, TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomInterceptorService } from './common/services/custom-interceptor.service';
import { BASE_URL_TOKEN } from './config';
import { environment } from '../environments/environment';
import { ProductsService } from './products.service';
import { IProduct } from './store/reducers/products.reducer';
import { data } from './common/mock/data';

describe('ProductsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                HttpClientTestingModule
            ],
            providers: [
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: CustomInterceptorService,
                    multi: true
                },
                {
                    provide: BASE_URL_TOKEN,
                    useValue: environment.baseUrl,
                },
                ProductsService
            ]
        });
    });

    it('test service', inject(
        [ProductsService, HttpTestingController],
        (_productService: ProductsService, _backend: HttpTestingController) => {
            _productService.getProducts()
                .subscribe((products: IProduct[]) => {
                    expect(Array.isArray(products))
                        .toBeTruthy();

                    expect(products.length)
                        .toEqual(10);
                });

            _backend.expectOne({
                method: 'GET',
                url: `${environment.baseUrl}/products`
            })
                .flush({ data });
        }
    ));
});
