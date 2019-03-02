import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DataGridComponent } from './data-grid/data-grid.component';
import { ChartComponent } from './chart/chart.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';

import { HttpModule } from "@angular/http";
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'angular-highcharts';

export const routes : Routes= [
  {path: 'data-grid' , component: DataGridComponent},
  {path: 'high-chart', component: ChartComponent},
  { path: '',   redirectTo: '/data-grid', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    DataGridComponent,
    ChartComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChartModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
