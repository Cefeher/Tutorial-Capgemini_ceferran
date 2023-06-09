package com.ccsw.tutorial.loan.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.ccsw.tutorial.client.model.Client;
import com.ccsw.tutorial.game.model.Game;


@Entity
@Table(name = "Loan")
public class Loan {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "game_id", nullable = false)
	private Game game;


	@ManyToOne
	@JoinColumn(name = "client_id", nullable = false)
	private Client client;

    @Temporal(TemporalType.DATE)
    @Column(name = "loan_date")
    private Date loanDate;

    @Temporal(TemporalType.DATE)
    @Column(name = "return_date")
    private Date returnDate;
	
	

    public Long getId() {

        return this.id;
    }

    public void setId(Long id) {

        this.id = id;
    }
    

    public Game getGame() {

        return this.game;
    }

    public void setGame(Game game) {

        this.game = game;
    }


    public Client getClient() {

        return this.client;
    }


    public void setClient(Client client) {

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

    @Override
    public String toString() {
        return "Loan{" +
                "id=" + id +
                ", game=" + game +
                ", client=" + client +
                ", loanDate=" + loanDate +
                ", returnDate=" + returnDate +
                '}';
    }
}
