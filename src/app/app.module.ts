import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CardComponent } from './content/products/product-list/card/card.component';
import { ProductsFilterPipe } from './products-filter.pipe';
import { TooltipDirective } from './common/directives/tooltip.directive';
import { ToUsdPipe } from './common/pipes/to-usd.pipe';
import { ProductsService } from './products.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BASE_URL_TOKEN } from './config';
import { CustomInterceptorService } from './common/services/custom-interceptor.service';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './store/effects/products.effect';
import { CartComponent } from './header/cart/cart.component';
import { ProductComponent } from './header/cart/product/product.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { ProductsComponent } from './content/products/products.component';
import { ProductListComponent } from './content/products/product-list/product-list.component';
import { OneProductComponent } from './content/products/one-product/one-product.component';
import { CurrentProductEffects } from './store/effects/current-products.effect';
import { ResolveService } from './content/products/one-product/resolve.service';
import { CustomPreloadService } from './common/services/custom-preload.service';
import { CdComponent } from './content/cd/cd.component';
import { DefaultComponent } from './content/cd/default/default.component';
import { OnPushComponent } from './content/cd/on-push/on-push.component';
import { FormsModule } from '@angular/forms';
// module, directive,pipe, service

// es6 - import/export let/const
// ng - declarations/let   imports/import[] exports/export[]

// aot vs jit;

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        CardComponent,
        ProductsFilterPipe,
        TooltipDirective,
        ToUsdPipe,
        CartComponent,
        ProductComponent,
        ProductsComponent,
        ProductListComponent,
        OneProductComponent,
        CdComponent,
        DefaultComponent,
        OnPushComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloadService }),
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([ProductsEffects, CurrentProductEffects]),
        environment.production
            ? []
            : StoreDevtoolsModule.instrument()
    ],
    exports: [],
    providers: [
        ResolveService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CustomInterceptorService,
            multi: true
        },
        ProductsService,
        {
            provide: BASE_URL_TOKEN,
            useValue: environment.baseUrl,
        },
        {
            provide: 'BASE_URL',
            useValue: 'localhost:3000',
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
