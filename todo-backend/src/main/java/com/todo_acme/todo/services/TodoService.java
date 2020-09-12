package com.todo_acme.todo.services;

import com.todo_acme.todo.entities.Todo;
import com.todo_acme.todo.repositories.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
public class TodoService {
    @Autowired
    private TodoRepository todoRepository;

    @GetMapping("/todos")
    public List<Todo> retrieveByActive(@RequestParam(value="active", defaultValue="1") Boolean active) {
        return todoRepository.findAllByIsActive(active);
    }

    @PostMapping("/todos")
    public ResponseEntity<Object> createTodo(@RequestBody Todo todo) {
        Todo savedTodo = todoRepository.save(todo);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                    .buildAndExpand(savedTodo.getId()).toUri();
        return ResponseEntity.created(location).build();
    }

    @PutMapping("/todos/{id}")
    public ResponseEntity<Object> inactivateTodo(@RequestBody Todo todo, @PathVariable Long id) {
        Optional<Todo> todoOptional = todoRepository.findById(id);
        if(!todoOptional.isPresent()) {
            return ResponseEntity.noContent().build();
        }
        todo.setId(id);

        if(todoOptional.get().getIsActive() != todo.getIsActive()) {
            if(todoOptional.get().getIsActive())
                todo.setInactivatedAt(new Date());
            else
                todo.setInactivatedAt(null);
        }

        todoRepository.save(todo);
        return ResponseEntity.noContent().build();
    }
}
