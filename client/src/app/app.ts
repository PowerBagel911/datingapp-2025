import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Nav } from "../layout/nav/nav";
import { AccountService } from '../core/services/account-service';
import { Home } from "../features/home/home";


@Component({
  selector: 'app-root',
  imports: [Nav, Home],
  templateUrl: './app.html', // Considered a child of this file
  styleUrl: './app.css'
})
export class App implements OnInit {
  
  private accountService = inject(AccountService);
  private http = inject(HttpClient);
  protected readonly title = 'Dating App';
  protected members = signal<any>([]); // a property to store fetched users

  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/members').subscribe({
      next: response => this.members.set(response),
      error: error => console.log(error),
      complete: () => console.log('Completed the http request.')
    })

    this.setCurrentUser();  // ⬅️ First thing: restore login state
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) {
      return;
    }

    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

}
