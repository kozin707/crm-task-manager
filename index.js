import { useState } from "react";

const statuses = ["Новая", "В работе", "Предоплата", "Документы"];

export default function Home() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Тур в Мексику", status: "Предоплата", sum: 280000 },
    { id: 2, title: "Япония", status: "В работе", sum: 240000 },
    { id: 3, title: "CRM заявка", status: "Новая", sum: 200000 },
  ]);
  const [newTask, setNewTask] = useState({ title: "", status: "Новая", sum: 0 });

  const addTask = () => {
    if (!newTask.title) return;
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
    setNewTask({ title: "", status: "Новая", sum: 0 });
  };

  const moveTask = (id, direction) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === id) {
          const currentIndex = statuses.indexOf(task.status);
          const newIndex = currentIndex + direction;
          if (newIndex >= 0 && newIndex < statuses.length) {
            return { ...task, status: statuses[newIndex] };
          }
        }
        return task;
      })
    );
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2>Сделки</h2>
      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Название сделки"
          value={newTask.title}
          onChange={e => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Сумма"
          value={newTask.sum}
          onChange={e => setNewTask({ ...newTask, sum: Number(e.target.value) })}
        />
        <button onClick={addTask}>Добавить</button>
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        {statuses.map(status => (
          <div key={status} style={{ flex: 1, background: "#f0f0f0", padding: 10 }}>
            <h4>{status}</h4>
            {tasks.filter(t => t.status === status).map(task => (
              <div key={task.id} style={{ background: "#fff", padding: 10, marginBottom: 10, border: "1px solid #ccc" }}>
                <strong>{task.title}</strong><br />
                <span>{task.sum.toLocaleString()} ₽</span><br />
                <div style={{ marginTop: 5 }}>
                  <button onClick={() => moveTask(task.id, -1)}>←</button>
                  <button onClick={() => moveTask(task.id, 1)}>→</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
