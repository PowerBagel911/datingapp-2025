import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { inject } from '@angular/core';
import { AccountService } from '../../core/services/account-service';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected accountService = inject(AccountService)
  protected creds: any = {}

  login() {
    this.accountService.login(this.creds).subscribe({
      next: result => {
        console.log(result);
        this.creds = {}; // Clear credentials after successful login
      },
      error: error => alert(error.message)
    });
  }

  logout() {
    this.accountService.logout();
  }
}
