import React, { useState } from "react";

function ExpenseForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !amount || !category) return;
    onAdd({
      id: Date.now(),
      title,
      amount: parseFloat(amount),
      category,
    });
    setTitle("");
    setAmount("");
    setCategory("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <input
        placeholder="Category"
        value={category}
        onChange={e => setCategory(e.target.value)}
      />
      <button type="submit">Add Expense</button>
    </form>
  );
}

function ExpenseList({ expenses, onDelete }) {
  return (
    <ul>
      {expenses.map(exp => (
        <li key={exp.id}>
          {exp.title} - ${exp.amount} [{exp.category}] 
          <button onClick={() => onDelete(exp.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <select value={selected} onChange={e => onSelect(e.target.value)}>
      <option value="">All</option>
      {categories.map(cat => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>
  );
}

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("");

  function handleAdd(expense) {
    setExpenses(prev => [...prev, expense]);
  }

  function handleDelete(id) {
    setExpenses(prev => prev.filter(exp => exp.id !== id));
  }

  const filtered = filter
    ? expenses.filter(exp => exp.category === filter)
    : expenses;

  const categories = Array.from(new Set(expenses.map(exp => exp.category)));
  const total = filtered.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div>
      <h1>Expense Tracker</h1>
      <ExpenseForm onAdd={handleAdd} />
      <CategoryFilter
        categories={categories}
        selected={filter}
        onSelect={setFilter}
      />
      <ExpenseList expenses={filtered} onDelete={handleDelete} />
      <div>Total: ${total}</div>
    </div>
  );
}
