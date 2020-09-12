package com.todo_acme.todo.services;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainService {
    @GetMapping(value = "/")
    public String index() {
        return "index.html";
    }
}
