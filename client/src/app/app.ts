import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Nav } from "../layout/nav/nav";
import { AccountService } from '../core/services/account-service';
import { User } from '../types/user';
import { Router, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [Nav, RouterOutlet, NgClass],
  templateUrl: './app.html', // Considered a child of this file
  styleUrl: './app.css'
})
export class App implements OnInit {
  
  private accountService = inject(AccountService);
  protected router = inject(Router);
  private http = inject(HttpClient);
  protected readonly title = 'Dating App';
  protected members = signal<User[]>([]); // a property to store fetched users

  ngOnInit(): void {
    this.http.get<User[]>('https://localhost:5001/api/members').subscribe({
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
