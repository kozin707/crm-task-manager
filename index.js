import { useState } from "react";

const STATUSES = [
  { name: "Новая заявка", color: "#cceeff" },
  { name: "В работе", color: "#ffd580" },
  { name: "Предоплата", color: "#a5e3f7" },
  { name: "Подготовка документов", color: "#f9b3dd" }
];

export default function CRM() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    title: "",
    client: "",
    amount: "",
    status: STATUSES[0].name
  });

  const addTask = () => {
    if (!task.title || !task.amount) return;
    setTasks([...tasks, { ...task, id: Date.now() }]);
    setTask({ title: "", client: "", amount: "", status: STATUSES[0].name });
  };

  return (
    <div className="p-4 font-sans">
      <h1 className="text-xl font-bold mb-4">CRM-сделки</h1>
      <div className="flex gap-2 mb-6">
        <input
          className="border p-2 rounded"
          placeholder="Сделка"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Клиент"
          value={task.client}
          onChange={(e) => setTask({ ...task, client: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Сумма"
          type="number"
          value={task.amount}
          onChange={(e) => setTask({ ...task, amount: e.target.value })}
        />
        <select
          className="border p-2 rounded"
          value={task.status}
          onChange={(e) => setTask({ ...task, status: e.target.value })}
        >
          {STATUSES.map((s) => (
            <option key={s.name}>{s.name}</option>
          ))}
        </select>
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          + Добавить сделку
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {STATUSES.map((status) => (
          <div
            key={status.name}
            className="p-2 rounded shadow"
            style={{ backgroundColor: status.color }}
          >
            <h2 className="font-bold text-sm mb-2">{status.name}</h2>
            {tasks
              .filter((t) => t.status === status.name)
              .map((t) => (
                <div
                  key={t.id}
                  className="bg-white rounded p-2 mb-2 shadow border"
                >
                  <div className="font-semibold">{t.title}</div>
                  💰 {t.amount} руб <br />
                  👤 {t.client || "Без имени"}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
