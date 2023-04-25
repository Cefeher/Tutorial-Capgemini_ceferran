package com.ccsw.tutorial.loan;

import java.util.*;


import javax.transaction.Transactional;

import com.ccsw.tutorial.client.ClientService;
import com.ccsw.tutorial.game.GameService;

import com.ccsw.tutorial.loan.model.LoanDto;
import com.ccsw.tutorial.loan.model.LoanSearchDto;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ccsw.tutorial.loan.model.Loan;

@Service
@Transactional
public class LoanServiceImpl implements LoanService {

    @Autowired
    LoanRepository loanRepository;

    @Autowired
    GameService gameService;

    @Autowired
    ClientService clientService;


    public Page<Loan> findAll(Pageable pageable) {
        return loanRepository.findAll(pageable);
    }


    @Override
    public Page<Loan> findWithFilters(Pageable pageable, LoanSearchDto dto) {
        System.out.println("dto.getGameId() = " + dto.getGameId());
        return this.loanRepository.findByIdGameOrIdClientOrDayLoan(dto.getClientId(), dto.getGameId(), dto.getDayLoan(), pageable);

    }

    @Override
    public void save(Long id, LoanDto dto) {
        Loan loan = null;


        if (id == null) {
            loan = new Loan();
        } else {
            loan = this.loanRepository.findById(id).orElse(null);
        }

        assert loan != null;
        BeanUtils.copyProperties(dto, loan, "id", "client", "game");

        loan.setClient(clientService.get(dto.getClient().getId()));
        loan.setGame(gameService.get(dto.getGame().getId()));

        Date startDate = loan.getLoanDate();
        Date endDate = loan.getReturnDate();

        //validaciones de fecha anterior

        if (endDate != null && endDate.getTime() < startDate.getTime()) {
            throw new IllegalArgumentException("La fecha de devolución no puede ser anterior a la fecha de préstamo");
        }

        //validaciones de fecha superior a 14 días

        long millisecondsPerDay = 24 * 60 * 60 * 1000;
        long daysBetween = (endDate.getTime() - startDate.getTime()) / millisecondsPerDay;

        if (daysBetween > 14) {
            throw new IllegalArgumentException("El período de préstamo no puede ser superior a 14 días.");
        }

        //validacion de juego prestado en ese periodo

        if (loanRepository.findBetweenDate(null, dto.getGame().getId(), startDate, endDate).size() > 0) {
            throw new IllegalArgumentException("El juego ya está prestado en ese período.");
        }

        //validacion de cliente con mas de 2 juegos prestados en un mismo dia

        var entriesList = loanRepository.findBetweenDate(dto.getClient().getId(), null, startDate, endDate);

        Map<Date, Integer> activeEntriesPerDay = new HashMap<>();

        for (Loan entry : entriesList) {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(startDate);
            while (!calendar.getTime().after(endDate)) {
                if (!entry.getLoanDate().after(calendar.getTime()) && !entry.getReturnDate().before(calendar.getTime())) {
                    Integer count = activeEntriesPerDay.get(calendar.getTime());
                    if (count == null) {
                        count = 0;
                    }
                    activeEntriesPerDay.put(calendar.getTime(), count + 1);
                }
                calendar.add(Calendar.DAY_OF_MONTH, 1);
            }
        }
        if (activeEntriesPerDay.values().stream().anyMatch(count -> count >= 2)) {
            throw new IllegalArgumentException("Un mismo cliente no puede tener prestados más de dos juegos en un mismo día");
        }

        this.loanRepository.save(loan);
    }

    @Override
    public void delete(Long id) {
        this.loanRepository.deleteById(id);
    }


}
