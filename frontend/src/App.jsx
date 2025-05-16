import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    description: "",
  });

  const categories = [
    "Food",
    "Entertainment",
    "Personal",
    "Drinks",
    "Trip",
    "Other",
  ];

  const fetchExpenses = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/expenses");
      setExpenses(res.data);
    } catch (error) {
      console.error("Failed to fetch expenses", error);
      setExpenses([]);
    }
  };

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const addExpense = async () => {
    if (!form.title || !form.amount) {
      return alert("Title and Amount are required");
    }

    try {
      await axios.post(
        "http://localhost:8080/api/expenses",
        {
          title: form.title,
          amount: Number(form.amount),
          category: form.category,
          description: form.description || "No description provided",
          date: new Date().toISOString().split("T")[0],
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setForm({ ...form, title: "", amount: "", description: "" });
      fetchExpenses();
    } catch (error) {
      console.error("Error:", error.response?.data);
      alert(
        `Error: ${error.response?.data?.message || "Failed to add expense"}`
      );
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/expenses/${id}`);
      fetchExpenses();
    } catch (error) {
      console.error("Error deleting expense", error);
    }
  };

  useEffect(() => { 
    fetchExpenses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Merged Navigation Bar */}
      <div className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="font-bold text-xl">💰 ExpenseTracker</div>
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-500 text-gray-900 px-3 py-1 rounded-md font-medium">
                Total: ₹{totalExpenses.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6">Add New Expense</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              placeholder="Title*"
              className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Amount*"
              className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              required
            />
            <select
              className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Description"
              className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-sm transition-colors duration-200"
            onClick={addExpense}
          >
            Add Expense
          </button>

          <h2 className="text-xl font-semibold mt-10 mb-4">All Expenses</h2>
          {expenses.length === 0 ? (
            <p className="text-gray-500">No expenses found.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {expenses.map((exp) => (
                <li
                  key={exp.id}
                  className="py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-gray-900">{exp.title}</h4>
                      <p className="text-sm text-gray-500">
                        <span className="capitalize">
                          {exp.category.toLowerCase()}
                        </span>{" "}
                        •{exp.description    } {exp.date}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-semibold text-green-600">
                        ₹{exp.amount.toFixed(2)}
                      </span>
                      <button
                        className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition-colors"
                        onClick={() => deleteExpense(exp.id)}
                        title="Delete"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <footer className="bg-white border-t border-gray-200 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} ExpenseTracker. Built with React and
          Spring Boot.
        </div>
      </footer>
    </div>
  );
}

export default App;
