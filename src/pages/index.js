import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const statuses = [
  { id: "leads", title: "Входящие лиды" },
  { id: "negotiation", title: "Переговоры" },
  { id: "proposal", title: "Готовим предложение" },
  { id: "decision", title: "Принимают решение" }
];

const initialTasks = [
  { id: 1, title: "Siri", subtitle: "Доставка пиццы", status: "leads", amount: 720000, label: "Ждём оплаты" },
  { id: 2, title: "Zeplin", subtitle: "SMM", status: "leads", amount: 1890000, label: "Горячий" },
  { id: 3, title: "Google", subtitle: "Интеграция", status: "proposal", amount: 2500000, label: "Горячий" },
  { id: 4, title: "Panasonic", subtitle: "Адаптация рекламных материалов", status: "decision", amount: 1100000, label: "Ждём оплаты" }
];

function TaskCard({ task }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() })
  }));

  return (
    <div
      ref={drag}
      className="rounded-xl bg-white p-3 shadow mb-3 cursor-move border border-gray-200"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="text-sm font-bold mb-1 flex items-center gap-2">
        <span className={`text-xs px-2 py-1 rounded-full ${getLabelColor(task.label)}`}>{task.label}</span>
        <span>{task.title}</span>
      </div>
      <div className="text-xs text-gray-500">{task.subtitle}</div>
      <div className="text-sm font-semibold mt-2">{task.amount.toLocaleString()} ₽</div>
    </div>
  );
}

function Column({ status, tasks, moveTask }) {
  const [, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => moveTask(item.id, status.id)
  }));

  const total = tasks.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div ref={drop} className="w-72 bg-gray-100 rounded-xl p-4">
      <h2 className="font-bold text-sm mb-1">{status.title}</h2>
      <p className="text-xs text-gray-500 mb-4">{tasks.length} сделок на {total.toLocaleString()} ₽</p>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

function getLabelColor(label) {
  switch (label) {
    case "Горячий": return "bg-red-100 text-red-700";
    case "Ждём оплаты": return "bg-blue-100 text-blue-700";
    case "На согласовании": return "bg-green-100 text-green-700";
    case "Заморожено": return "bg-gray-300 text-gray-700";
    default: return "bg-gray-200 text-gray-600";
  }
}

export default function CRMBoard() {
  const [tasks, setTasks] = useState(initialTasks);

  const moveTask = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50 p-6 overflow-x-auto">
        <div className="flex gap-6">
          {statuses.map((status) => (
            <Column
              key={status.id}
              status={status}
              tasks={tasks.filter((t) => t.status === status.id)}
              moveTask={moveTask}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}
