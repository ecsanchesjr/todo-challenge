package com.todo_acme.todo.entities;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "todos")
public class Todo {

    @Id
    @SequenceGenerator(name="TODO_SEQ", sequenceName="TODO_SEQ_ID", initialValue = 1, allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "TODO_SEQ")
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
