import { Component, OnInit, Inject } from '@angular/core';
import { ClientService } from 'src/app/client/client.service';
import { GameService } from 'src/app/game/game.service';
import { LoanService } from '../loan.service';
import { Game } from 'src/app/game/model/Game';
import { Client } from '../../client/model/Client';
import { Loan } from '../model/Loan';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-loan-save',
  templateUrl: './loan-save.component.html',
  styleUrls: ['./loan-save.component.scss']
})
export class LoanSaveComponent implements OnInit {

  games: Game[];
  filterGame: Game;

  clients: Client[];
  filterClient: Client

  loan: Loan;

  startDate: Date;
  endDate: Date;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<LoanSaveComponent>,
    public dialog: MatDialog,
    private clientService: ClientService,
    private gameService: GameService,
    private loanService: LoanService
  ) { }

  ngOnInit(): void {
    if (!this.data.loan) {
      this.loan = Object.assign({}, this.data.loan);
    } else {
      this.loan = new Loan();
    }

    this.clientService.getClients().subscribe(
      clients => {
        this.clients = clients;

        if (this.loan.client != null) {
          let clientFilter: Client[] = clients.filter(client => client.id == this.data.loan.client.id);
          if (clientFilter.length > 0) {
            this.loan.client = clientFilter[0];
          }
        }
      }
    );

    this.gameService.getGames().subscribe(
      games => {
        this.games = games
        if (this.loan.game != null) {
          let gameFilter: Game[] = games.filter(game => game.id == this.data.loan.game.id);
          if (gameFilter.length > 0) {
            this.loan.game = gameFilter[0];
          }
        }
      }
    );

  }

  onSave() {
    this.loan.loanDate = this.startDate;
    this.loan.returnDate = this.endDate;

    this.loanService.saveLoan(this.loan).subscribe({
      next: result => {
        this.dialogRef.close();
      },
      error: err => {
        console.error(err);
        const dialogRef = this.dialog.open(DialogConfirmationComponent, {
          data: { title: "ERROR", description: err.error.message }
        });
      }
    });
  }

  onClose() {
    this.dialogRef.close();
  }

}

