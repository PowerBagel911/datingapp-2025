import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { inject } from '@angular/core';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected accountService = inject(AccountService)
  protected router = inject(Router);
  protected creds: any = {}

  login() {
    this.accountService.login(this.creds).subscribe({
      next: result => {
        this.router.navigateByUrl('/members');
        this.creds = {}; // Clear credentials after successful login
      },
      error: error => alert(error.message)
    });
  }

  logout() {
    this.router.navigateByUrl('/');
    this.accountService.logout();
  }
}
