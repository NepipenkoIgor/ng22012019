import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductComponent } from './product.component';
import { ICartProduct } from '../../../store/reducers/cart.reducer';
import { By } from '@angular/platform-browser';

const product: ICartProduct = {
    '_id': '58e1f809711416f3d8c0a7ad',
    'title': 'Обои',
    'serial': 1045,
    'author': 'Bogema',
    'price': 2000.85,
    'src': 'assets/img/img1.jpg',
    count: 2
};

describe('CartProductComponent', () => {
    let component: ProductComponent;
    let fixture: ComponentFixture<ProductComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ProductComponent
            ]
        });
        fixture = TestBed.createComponent(ProductComponent);
        component = fixture.componentInstance;
        component.product = product;

        spyOn(component, 'incrementProduct')
            .and
            .callThrough();

        spyOn(component, 'decrementProduct')
            .and
            .callThrough();

        spyOn(component, 'removeProduct')
            .and
            .callThrough();

        spyOn(component.increment, 'emit')
            .and
            .callThrough();

        spyOn(component.decrement, 'emit')
            .and
            .callThrough();

        spyOn(component.remove, 'emit')
            .and
            .callThrough();


        fixture.detectChanges();
    });

    it('should increment', () => {
        const incrementProduct = fixture.debugElement.query(By.css('.count__increase'));
        incrementProduct.triggerEventHandler('click', null);
        expect(component.incrementProduct)
            .toHaveBeenCalledWith(product);
    });

    it('should decrement', () => {
        const decrementProduct = fixture.debugElement.query(By.css('.count__decrease'));
        decrementProduct.triggerEventHandler('click', null);
        expect(component.decrement.emit)
            .toHaveBeenCalledWith(product);
        expect(component.remove.emit)
            .not
            .toHaveBeenCalled();
        component.product = {
            ...component.product,
            count: 1
        };

        fixture.detectChanges();
        decrementProduct.triggerEventHandler('click', null);
        expect(component.remove.emit)
            .toHaveBeenCalledWith(component.product);

        expect(component.decrement.emit)
            .toHaveBeenCalledTimes(1);
    });
});
