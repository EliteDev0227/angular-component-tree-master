import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { TreeModule } from "angular-tree-component";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, TreeModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
