package com.ccsw.tutorial.loan;


import org.springframework.data.domain.Page;

import com.ccsw.tutorial.loan.model.Loan;
import com.ccsw.tutorial.loan.model.LoanDto;
import com.ccsw.tutorial.loan.model.LoanSearchDto;
import org.springframework.data.domain.Pageable;

public interface LoanService {

    Page<Loan> findAll(Pageable pageable);

    Page<Loan> findWithFilters(Pageable pageable, LoanSearchDto dto);

    void save(Long id, LoanDto data);

    void delete(Long id);

}
