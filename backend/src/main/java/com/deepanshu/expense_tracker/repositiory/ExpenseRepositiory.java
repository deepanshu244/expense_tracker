package com.deepanshu.expense_tracker.repositiory;

import com.deepanshu.expense_tracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ExpenseRepositiory extends JpaRepository<Expense,Long> {
    List<Expense> findByCategory(String category);
    List<Expense> findByDateBetween(LocalDate start, LocalDate end);
}
