import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TreeModule } from 'angular-tree-component';
import { Router, Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BasicTreeComponent } from './basictree/basictree.component';
import { FullTreeComponent } from './fulltree/fulltree.component';

const routes: Route[] = [
  {
    path: '',
    component: FullTreeComponent
  },
  {
    path: 'basic',
    component: BasicTreeComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BasicTreeComponent,
    FullTreeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TreeModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
