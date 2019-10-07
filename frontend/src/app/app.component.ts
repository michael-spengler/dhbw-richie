import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  loginWindow: any;

  login() {
    this.loginWindow = window.open('http://localhost:3000/api/auth/google', '_blank');
    window.addEventListener('message', (event) => {
      this.onLogin(event.data);
    });
  }

  onLogin(token) {
    console.log('onLogin', token);
    localStorage.setItem('token', token);
    this.loginWindow.close();
    window.removeEventListener('message', this.onLogin);
  }
}
