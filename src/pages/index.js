import { useState } from "react";

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
    setTask({
      title: "",
      priority: "Обычный",
      status: "Новый",
      assigned: "",
      dueDate: "",
    });
  };

  const statuses = ["Новый", "В работе", "Готово", "Вопрос"];
  const priorities = ["Обычный", "Срочный", "Низкий"];

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif", maxWidth: 700, margin: "0 auto" }}>
      <h1>Задачи в работе</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
        <input placeholder="Название задачи" value={task.title} onChange={(e) => setTask({ ...task, title: e.target.value })} />
        <select value={task.priority} onChange={(e) => setTask({ ...task, priority: e.target.value })}>
          {priorities.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        <select value={task.status} onChange={(e) => setTask({ ...task, status: e.target.value })}>
          {statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <input placeholder="Назначено на" value={task.assigned} onChange={(e) => setTask({ ...task, assigned: e.target.value })} />
        <input type="date" value={task.dueDate} onChange={(e) => setTask({ ...task, dueDate: e.target.value })} />
        <button onClick={addTask}>Добавить</button>
      </div>
      <div>
        {tasks.map((t) => (
          <div key={t.id} style={{ padding: 10, marginBottom: 10, border: "1px solid #ccc" }}>
            <strong>{t.title}</strong>
            <br />
            Приоритет: {t.priority} | Статус: {t.status} | Назначено: {t.assigned} | Срок: {t.dueDate}
          </div>
        ))}
      </div>
    </div>
  );
}
