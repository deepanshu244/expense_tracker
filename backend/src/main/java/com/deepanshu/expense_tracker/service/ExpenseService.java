package com.deepanshu.expense_tracker.service;

import com.deepanshu.expense_tracker.model.Expense;
import com.deepanshu.expense_tracker.repositiory.ExpenseRepositiory;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ExpenseService {
    private final ExpenseRepositiory expenseRepositiory;

    public ExpenseService(ExpenseRepositiory expenseRepositiory) {
        this.expenseRepositiory = expenseRepositiory;
    }

    public List<Expense> getAllExpenses(){
        return expenseRepositiory.findAll();
    }
    public Expense addexpense(Expense expense){
        return  expenseRepositiory.save(expense);
    }
    public void deleteExpense(Long id){
          expenseRepositiory.deleteById(id);
    }
    public  List<Expense> getExpenseByCategory(String category){
        return expenseRepositiory.findByCategory(category);
    }

    public List<Expense> getMonthlyExpense(int year, int month){
        LocalDate start=LocalDate.of(year,month,1);
        LocalDate end= start.withDayOfMonth(start.lengthOfMonth());
        return expenseRepositiory.findByDateBetween(start, end);
    }

}
