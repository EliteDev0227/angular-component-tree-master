import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  nodes = [{ name: "Root1", children: [{ name: "Child1" }] }];
  options = {};
}
