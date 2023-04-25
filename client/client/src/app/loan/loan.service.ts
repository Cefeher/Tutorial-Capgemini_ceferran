import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pageable } from '../core/model/page/Pageable';
import { Observable } from 'rxjs';
import { LoanPage } from './model/LoanPage';
import { Loan } from './model/Loan';
import { LoanSearch } from './model/LoanSearch';

@Injectable({
  providedIn: 'root'
})
export class LoanService {


  constructor(
    private http: HttpClient
  ) { }


  getLoan(pageable: Pageable): Observable<LoanPage> {
    return this.http.post<LoanPage>('http://localhost:8090/loan', { pageable: pageable });
  }

  getFilterLoan(filter: LoanSearch): Observable<LoanPage> {
    return this.http.post<LoanPage>('http://localhost:8090/loan/filters', filter);
  }

  saveLoan(loan: Loan): Observable<Loan> {
    let url = 'http://localhost:8090/loan';
    if (loan.id != null) {
      url += '/' + loan.id;
    }
    return this.http.put<Loan>(url, loan);
  }

  deleteLoan(id: number): Observable<void> {
    return this.http.delete<void>('http://localhost:8090/loan/' + id);
  }

}
