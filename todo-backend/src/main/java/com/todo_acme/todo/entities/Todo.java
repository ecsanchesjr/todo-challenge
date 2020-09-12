package com.todo_acme.todo.entities;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "todos")
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String task;

    @Column(nullable = false)
    private Boolean isDone = false;

    @Column(nullable = false)
    private Boolean isActive = true;
    private Date createdAt = new Date();
    private Date inactivatedAt = null;
}
