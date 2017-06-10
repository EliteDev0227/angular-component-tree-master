import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
}

@observer class TodoView extends React.Component {
  render() {
    return <div>{this.props.store.filteredItems}</div>
  }
}