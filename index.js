import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const statuses = ["Новая заявка", "В работе", "Предоплата", "Подготовка документов"];

const ItemTypes = { CARD: "card" };

function TaskCard({ task, moveCard }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="p-2 m-2 bg-white rounded shadow cursor-move text-sm"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="font-bold">{task.title}</div>
      <div>{task.amount} руб</div>
      <div className="text-xs text-gray-500">{task.assigned}</div>
    </div>
  );
}

function Column({ status, tasks, onDropTask }) {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item) => onDropTask(item.id, status),
  }));

  const sum = tasks.reduce((acc, task) => acc + task.amount, 0);

  return (
    <div ref={drop} className="w-1/4 bg-blue-100 p-2 m-2 rounded">
      <h2 className="text-lg font-semibold">
        {status} ({tasks.length})
      </h2>
      <p className="text-sm text-blue-700 font-bold mb-2">{sum} руб</p>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

export default function KanbanCRM() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Заявка сайта",
      assigned: "Наталья",
      amount: 0,
      status: "Новая заявка",
    },
    {
      id: 2,
      title: "Тур в Японию",
      assigned: "Филипп",
      amount: 240000,
      status: "Предоплата",
    },
    {
      id: 3,
      title: "Тур в Мексику",
      assigned: "Наталья",
      amount: 280000,
      status: "Предоплата",
    },
  ]);

  const handleDrop = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex min-h-screen bg-gradient-to-b from-blue-200 to-cyan-100 p-4">
        {statuses.map((status) => (
          <Column
            key={status}
            status={status}
            tasks={tasks.filter((t) => t.status === status)}
            onDropTask={handleDrop}
          />
        ))}
      </div>
    </DndProvider>
  );
}
