package com.deepanshu.expense_tracker.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name="expenses")
@Data
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true)
    private String description;

    @Column(nullable = false)
    private Double amount;


    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private LocalDate date;
}
