import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ClientService } from '../client.service';
import { Client } from '../model/Client';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})

export class ClientEditComponent implements OnInit {

  client: Client;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ClientEditComponent>,
    public dialog: MatDialog,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    if (this.data.client != null) {
      this.client = Object.assign({}, this.data.client);
    }
    else {
      this.client = new Client();
    }
  }

  onSave() {

    this.clientService.saveClient(this.client).subscribe({
      next: result => {
        this.dialogRef.close();
      },
      error: err => {
        console.error(err);
        const dialogRef = this.dialog.open(DialogConfirmationComponent, {
          data: {
            title: "ERROR",
            description: err.error.message
          }
        });
      }
    });
  }

  onClose() {
    this.dialogRef.close();
  }


}
