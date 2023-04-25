package com.ccsw.tutorial.auth;

import com.ccsw.tutorial.auth.model.JwtUtil;
import com.ccsw.tutorial.auth.model.User;
import com.devonfw.module.beanmapping.common.api.BeanMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RequestMapping(value = "/auth")
@RestController
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    BeanMapper beanMapper;

    @PostMapping("")
    public ResponseEntity<Map<String, String>> register(@RequestBody User user) {
        if (user.getUsername().equals("admin") && user.getPassword().equals("admin")) {
            String token = jwtUtil.generateToken(user.getUsername());
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            throw new UnauthorizedException("Credenciales inválidas <br> Si no es administrador solo podra acceder como invitado");
        }
    }

    public static class UnauthorizedException extends RuntimeException {
        public UnauthorizedException(String message) {
            super(message);
        }
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<String> handleCustomException(UnauthorizedException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNAUTHORIZED);
    }


}