import { Component, OnInit } from '@angular/core';
import { LoanService } from '../loan.service';
import { GameService } from 'src/app/game/game.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ClientService } from 'src/app/client/client.service';
import { PageEvent } from '@angular/material/paginator';
import { Pageable } from 'src/app/core/model/page/Pageable';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Game } from 'src/app/game/model/Game';
import { Client } from 'src/app/client/model/Client';
import { Loan } from '../model/Loan';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';
import { LoanSaveComponent } from '../loan-save/loan-save.component';
import { LoanSearch } from '../model/LoanSearch';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss']
})
export class LoanListComponent implements OnInit {

  games: Game[];
  clients: Client[];

  filterGame: Game;
  filterClient: Client;
  filterSearch: LoanSearch;
  selectedDate: Date;

  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  dataSource = new MatTableDataSource<Loan>();
  displayedColumns: string[] = ["id", "Juego", "Cliente", "loanDate", "returnDate", "action"];

  constructor(
    private gameService: GameService,
    private loanService: LoanService,
    private clientService: ClientService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.loadPage();

    this.gameService.getGames().subscribe(
      games => this.games = games
    );

    this.clientService.getClients().subscribe(
      clients => this.clients = clients
    );

  }


  loadPage(event?: PageEvent) {
    let pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [{
        property: 'id',
        direction: 'ASC'
      }]
    }

    if (event != null) {
      pageable.pageSize = event.pageSize;
      pageable.pageNumber = event.pageIndex;
    }

    this.loanService.getLoan(pageable).subscribe(data => {
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    });
  }

  onCleanFilter(): void {
    this.filterGame = null;
    this.filterClient = null;
    this.selectedDate = null;

    this.onSearch();
  }

  onSearch(): void {

    this.filterSearch = {
      gameId: this.filterGame != null ? this.filterGame.id : null,
      clientId: this.filterClient != null ? this.filterClient.id : null,
      dayLoan: this.selectedDate != null ? this.selectedDate : null
    }

    this.loanService.getFilterLoan(this.filterSearch).subscribe(data => {
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    });

  }

  createLoan() {
    const dialogRef = this.dialog.open(LoanSaveComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  deleteLoan(loan: Loan) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
        itle: "Eliminar préstamo",
        description: "Atención si borra el préstamo se perderán sus datos.<br> ¿Desea eliminar el préstamo?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loanService.deleteLoan(loan.id).subscribe(result => {
          this.ngOnInit();
        });
      }
    });
  }

}
