import { ProductsFilterPipe } from './products-filter.pipe';
import { data } from './common/mock/data';

describe('ProductsFilterPipe', () => {
    let pipe: ProductsFilterPipe;
    beforeEach(() => {
        pipe = new ProductsFilterPipe();
    });
    it('should filter products', () => {
        expect(pipe.transform(data, 'bog').length)
            .toEqual(4);
        expect(pipe.transform(data, 'awedawasda').length)
            .toEqual(0);
    });
});
