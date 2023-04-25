package com.ccsw.tutorial.loan.model;

import org.springframework.data.domain.Pageable;

import java.util.Date;

public class LoanSearchDto {

    private Long loanId;

    private Long clientId;

    private Long gameId;

    private Date dayLoan;

    private Pageable pageable;



    public Pageable getPageable() {

        return this.pageable;
    }

    public void setPageable(Pageable pageable) {

        this.pageable = pageable;
    }

    public Long getLoanId() {
        return loanId;
    }

    public void setLoanId(Long loanId) {
        this.loanId = loanId;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public Long getGameId() {
        return gameId;
    }

    public void setGameId(Long gameId) {
        this.gameId = gameId;
    }

    public Date getDayLoan() {
        return dayLoan;
    }

    public void setDayLoan(Date dayLoan) {
        this.dayLoan = dayLoan;
    }


}
