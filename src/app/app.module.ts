import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { GemCalculatorComponent } from './pages/gem-calculator/gem-calculator.component';
import { FormsModule } from '@angular/forms';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { InventoryLookupComponent } from './pages/inventory-lookup/inventory-lookup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BossTrackerComponent } from './pages/boss-tracker/boss-tracker.component';

registerLocaleData(localePt);

@NgModule({ declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        GemCalculatorComponent,
        InventoryLookupComponent,
        BossTrackerComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        NgbModule
    ],
    bootstrap: [AppComponent],
    providers: [
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class AppModule { }
