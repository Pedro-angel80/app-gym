import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    localStorage.clear();
  }
  title = 'app-gym';
}
