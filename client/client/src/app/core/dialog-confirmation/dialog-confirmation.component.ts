import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.scss']
})
export class DialogConfirmationComponent implements OnInit {

  title: string;
  description: string;
  alert: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmationComponent>,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {

    if (this.data.title === "ERROR" || this.data.title === "BIENVENIDO") {
      this.alert = true;
    }
    this.title = this.data.title;
    this.description = this.data.description;

  }

  onYes() {
    if (this.data.title === "LOGOUT") {
      this.authService.logout();
      this.dialogRef.close(true);
    }
    this.dialogRef.close(true);
  }

  onNo() {
    this.dialogRef.close(false);
  }

  onOk() {
    this.dialogRef.close(false);
  }
}
