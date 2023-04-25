package com.ccsw.tutorial.loan;

import com.ccsw.tutorial.client.model.ClientDto;
import com.ccsw.tutorial.game.model.GameDto;
import com.ccsw.tutorial.loan.model.LoanDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest()
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class LoanTest {

    @Autowired
    private LoanService loanService;

    private static final ClientDto CLIENT_1 = clientOf(1L);
    private static final ClientDto CLIENT_2 = clientOf(2L);

    private static final GameDto GAME_1 = gameOf(1L);
    private static final GameDto GAME_2 = gameOf(2L);
    private static final GameDto GAME_3 = gameOf(3L);

    @Test
    void saveNotExistLoanIdShouldInsert() {
        loanService.save(null, loanOf(CLIENT_1, GAME_1, "2025-01-01", "2025-01-02"));
    }

    @Test
    void saveNotExistLoanWhenLoanDaysExceedLimitsShouldThrowException() {
        assertThrows(IllegalArgumentException.class, () -> loanService.save(null, loanOf(CLIENT_1, GAME_1, "2026-01-01", "2026-01-17")));
    }

    @Test
    void saveNotExistLoanWhenReturnIsBeforeLoanShouldThrowException() {
        assertThrows(IllegalArgumentException.class, () -> loanService.save(null, loanOf(CLIENT_1, GAME_1, "2030-05-15", "2030-05-10")));
    }

    @Test
    void saveNotExistLoanWhenGameIdIsLoanInDateRangeShouldThrowException() {
        loanService.save(null, loanOf(CLIENT_1, GAME_1, "2027-01-01", "2027-01-10"));
        assertThrows(IllegalArgumentException.class, () -> loanService.save(null, loanOf(CLIENT_2, GAME_1, "2027-01-05", "2027-01-12")));
    }

    @Test
    void saveNotExistLoanWhenClientIdHaveMoreThanTwoGameShouldThrowException() {
        loanService.save(null, loanOf(CLIENT_1, GAME_1, "2028-01-29", "2028-02-06"));
        loanService.save(null, loanOf(CLIENT_1, GAME_2, "2028-01-27", "2028-02-03"));

        assertThrows(IllegalArgumentException.class, () -> loanService.save(null, loanOf(CLIENT_1, GAME_3, "2028-01-30", "2028-02-05")));
        assertThrows(IllegalArgumentException.class, () -> loanService.save(null, loanOf(CLIENT_1, GAME_3, "2028-02-01", "2028-02-08")));
        assertThrows(IllegalArgumentException.class, () -> loanService.save(null, loanOf(CLIENT_1, GAME_3, "2028-02-03", "2028-02-10")));
        assertThrows(IllegalArgumentException.class, () -> loanService.save(null, loanOf(CLIENT_1, GAME_3, "2028-01-26", "2028-02-01")));
        assertThrows(IllegalArgumentException.class, () -> loanService.save(null, loanOf(CLIENT_1, GAME_3, "2028-01-26", "2028-02-07")));

        loanService.save(null, loanOf(CLIENT_1, GAME_2, "2028-02-04", "2028-02-14"));
    }

    private static LoanDto loanOf(ClientDto client, GameDto game, String loanDate, String returnDate) {
        LoanDto dto = new LoanDto();
        dto.setClient(client);
        dto.setGame(game);
        dto.setLoanDate(dateOf(loanDate));
        dto.setReturnDate(dateOf(returnDate));
        return dto;
    }

    private static ClientDto clientOf(Long id) {
        ClientDto dto = new ClientDto();
        dto.setId(id);
        return dto;
    }

    private static GameDto gameOf(Long id) {
        GameDto dto = new GameDto();
        dto.setId(id);
        return dto;
    }

    private static Date dateOf(String date) {
        return Date.from(LocalDate.parse(date).atStartOfDay(ZoneId.systemDefault()).toInstant());
    }
}
