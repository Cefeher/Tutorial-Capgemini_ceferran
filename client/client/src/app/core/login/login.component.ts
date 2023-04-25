import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  isLoggedIn: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<LoginComponent>,
    public dialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.username = '';
    this.password = '';

  }


  onCancel(): void {

    if (!this.isLoggedIn) {
      this.authService.logout();
    }
    this.dialogRef.close();

  }

  onAccept(): void {

    this.authService.login(this.username, this.password).subscribe({
      next: token => {
        sessionStorage.setItem('access_token', token);
        const dialogRef = this.dialog.open(DialogConfirmationComponent, {
          data: { title: "BIENVENIDO", description: this.username }
        });
        this.isLoggedIn = false;
        this.dialogRef.close();
      },
      error: err => {
        console.error('Error:', err);
        const dialogRef = this.dialog.open(DialogConfirmationComponent, {
          data: { title: "ERROR", description: err.error }
        });
        this.ngOnInit();
      }
    });

  }

}
