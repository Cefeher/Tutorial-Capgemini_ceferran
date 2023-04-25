import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAdmin: boolean = false;
  isLoggedIn: boolean = false;


  constructor(public dialog: MatDialog,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {

    this.authService.isLoggedIn().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        this.authService.isAdmin().subscribe(isAdmin => {
          this.isAdmin = isAdmin;
        });
      }
    });

  }

  logIn() {
    if (!this.isLoggedIn) {

      const dialogRef = this.dialog.open(LoginComponent, {
        data: { isAdmin: this.isAdmin }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });

    } else {
      const dialogRef = this.dialog.open(DialogConfirmationComponent, {
        data: { title: "LOGOUT", description: "¿Desea cerrar sesión?" }
      })
    }

  }

}
