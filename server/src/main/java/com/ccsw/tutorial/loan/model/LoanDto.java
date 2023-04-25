package com.ccsw.tutorial.loan.model;

import java.util.Date;

import com.ccsw.tutorial.client.model.ClientDto;
import com.ccsw.tutorial.game.model.GameDto;
import org.springframework.format.annotation.DateTimeFormat;

public class LoanDto {
	
	private long id;
	
	private GameDto game;
	
	private ClientDto client;

	private Date loanDate;

	private Date returnDate;
	

	public Long getId() {
		return this.id;
	}
	

    public void setId(Long id) {

        this.id = id;
    }

    public GameDto getGame() {

        return this.game;
    }

    public void setGame(GameDto game) {

        this.game = game;
    }

    public ClientDto getClient() {

        return this.client;
    }

    public void setClient(ClientDto client) {

    	this.client = client;
    }

    public Date getLoanDate() {
        return loanDate;
    }

    public void setLoanDate(Date loanDate) {
        this.loanDate = loanDate;
    }

    public Date getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(Date returnDate) {
        this.returnDate = returnDate;
    }
}
