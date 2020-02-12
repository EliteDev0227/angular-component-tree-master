import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { TreeModule } from "angular-tree-component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, TreeModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
