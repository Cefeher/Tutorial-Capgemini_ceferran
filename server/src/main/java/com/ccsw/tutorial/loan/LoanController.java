package com.ccsw.tutorial.loan;


import com.ccsw.tutorial.auth.model.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import com.ccsw.tutorial.config.mapper.BeanMapper;
import com.ccsw.tutorial.loan.model.LoanDto;
import com.ccsw.tutorial.loan.model.LoanSearchDto;


@RequestMapping(value = "/loan")
@RestController
@CrossOrigin(origins = "*")


public class LoanController {

    @Autowired
    LoanService loanService;

    @Autowired
    BeanMapper beanMapper;

    @Autowired
    JwtUtil jwtUtil;


    @RequestMapping(path = "", method = RequestMethod.POST)
    public Page<LoanDto> find(Pageable pageable) {
        return beanMapper.mapPage(this.loanService.findAll(pageable), LoanDto.class);
    }

    @RequestMapping(path = "filters", method = RequestMethod.POST)
    public Page<LoanDto> findFilters(Pageable pageable, @RequestBody LoanSearchDto dto) {
        return beanMapper.mapPage(this.loanService.findWithFilters(pageable, dto), LoanDto.class);
    }

    //Metodo con verificacion de token. De ser necesario se aplicara a todos los metodos
    @RequestMapping(path = {"", "/{id}"}, method = RequestMethod.PUT)
    public void save(@RequestHeader("Authorization") String token, @PathVariable(name = "id", required = false) Long id, @RequestBody LoanDto dto) {
        jwtUtil.checkToken(token);
        loanService.save(id, dto);
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("id") Long id) {
        this.loanService.delete(id);
    }


}
