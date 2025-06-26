import { useState } from "react";

const STATUS = ["Новый", "В работе", "Завершен"];

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    title: "",
    priority: "Обычный",
    status: "Новый",
    assigned: "",
    dueDate: "",
  });

  const addTask = () => {
    if (!task.title) return;
    setTasks([...tasks, { ...task, id: Date.now() }]);
    setTask({ title: "", priority: "Обычный", status: "Новый", assigned: "", dueDate: "" });
  };

  const updateStatus = (id, newStatus) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h1>CRM Kanban</h1>
      <div style={{ marginBottom: 10 }}>
        <input
          placeholder="Заголовок"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
        <select value={task.priority} onChange={(e) => setTask({ ...task, priority: e.target.value })}>
          <option>Обычный</option>
          <option>Высокий</option>
          <option>Низкий</option>
        </select>
        <input placeholder="Кому назначено" value={task.assigned} onChange={(e) => setTask({ ...task, assigned: e.target.value })} />
        <input type="date" value={task.dueDate} onChange={(e) => setTask({ ...task, dueDate: e.target.value })} />
        <button onClick={addTask}>Добавить</button>
      </div>

      <div style={{ display: "flex", gap: 20 }}>
        {STATUS.map((column) => (
          <div key={column} style={{ width: "33%", background: "#f0f0f0", padding: 10, borderRadius: 5 }}>
            <h3>{column}</h3>
            {tasks.filter(t => t.status === column).map(t => (
              <div key={t.id} style={{ background: "#fff", padding: 10, marginBottom: 10, borderRadius: 5 }}>
                <b>{t.title}</b><br />
                📌 {t.priority} <br />
                👤 {t.assigned || "Не назначено"} <br />
                📅 {t.dueDate || "Без срока"} <br />
                <select value={t.status} onChange={(e) => updateStatus(t.id, e.target.value)}>
                  {STATUS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
