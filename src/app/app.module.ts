import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import{ MatToolbarModule } from '@angular/material/toolbar';
import{ FlexLayoutModule } from '@angular/flex-layout';
import{ MatListModule } from '@angular/material/list';
import {MatGridListModule }from '@angular/material/grid-list'
import { AppRoutingModule } from './app-routing/app-routing.module';
import { RouterModule } from '@angular/router';

import { MatCardModule} from'@angular/material/card';
import { MatButtonModule}from '@angular/material/button';
import 'hammerjs';
import { from } from 'rxjs';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component'
import { MenuComponent } from './menu/menu.component';
import { AppComponent } from './app.component';
import {DishService } from './services/dish.service';
import {PromotionService} from './services/promotion.service';
import { LeaderService } from './services/leader.service';
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule,
    MatListModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    RouterModule
  ],
  providers: [ DishService, PromotionService, LeaderService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
