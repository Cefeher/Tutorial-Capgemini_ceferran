package com.ccsw.tutorial.loan;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.ccsw.tutorial.loan.model.Loan;
import org.springframework.data.repository.query.Param;

public interface LoanRepository extends CrudRepository<Loan, Long> {

    //Devuelve todos los préstamos.
    Page<Loan> findAll(Pageable pageable);

    //Devuelve los prestamos filtrados por cliente, juego o fecha.
    @Query("SELECT l FROM Loan l WHERE (:clientId IS NULL OR l.client.id = :clientId) AND (:gameId IS NULL OR l.game.id = :gameId) AND (:dayLoan IS NULL OR :dayLoan BETWEEN l.loanDate AND l.returnDate)")
    Page<Loan> findByIdGameOrIdClientOrDayLoan(@Param("clientId") Long clientId, @Param("gameId") Long gameId, @Param("dayLoan") Date dayLoan, Pageable pageable);

    //Devuelve un juegoId o un clienteId dentro de un rango de fechas prestadas.
    @Query("select l from Loan l where (:client_id is null or l.client.id = :client_id) and (:game_id is null or l.game.id = :game_id) and (loan_date <= :to) and (return_date >= :from)")
    List<Loan> findBetweenDate(@Param("client_id") Long clientId, @Param("game_id") Long gameId, @Param("from") Date from, @Param("to") Date to);

}