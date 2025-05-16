package com.deepanshu.expense_tracker.controller;

import com.deepanshu.expense_tracker.model.Expense;
import com.deepanshu.expense_tracker.service.ExpenseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @GetMapping
    public List<Expense> getAllExpenses(){
        return  expenseService.getAllExpenses();
    }

    @PostMapping
    public ResponseEntity<?> addExpense(@RequestBody  Expense expense) {
        if (expense.getAmount() == null) {
            return ResponseEntity.badRequest().body("Amount cannot be null");
        }
        Expense savedExpense = expenseService.addexpense(expense);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedExpense);
    }
    @DeleteMapping("{id}")
    public void deleteExpense(@PathVariable Long id){
        expenseService.deleteExpense(id);
    }

    @GetMapping("/category/{category}")
    public List<Expense> getExpenseByCategory(@PathVariable String category){
        return expenseService.getExpenseByCategory(category);
    }

    @GetMapping("/monthly")
    public List<Expense> getMonthlyExpense(@RequestParam int year, @RequestParam int month){
        return expenseService.getMonthlyExpense(year,month);
    }
}
