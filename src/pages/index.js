// Kanban CRM аналог Bitrix24
// С Drag & Drop и стилями, приближёнными к скриншоту

import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const STATUSES = ["Новая заявка", "В работе", "Предоплата", "Подготовка документов"];

const Card = ({ task, index, moveCard, status }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CARD",
    item: { index, status },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }));

  return (
    <div
      ref={drag}
      className="bg-white rounded-xl p-3 shadow-md mb-3 cursor-pointer hover:scale-[1.01] transition"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="text-sm font-semibold">{task.title}</div>
      <div className="text-xs text-gray-500">{task.amount} руб</div>
      <div className="text-xs text-blue-500 mt-1">{task.person}</div>
    </div>
  );
};

const Column = ({ status, tasks, moveCard, onDrop }) => {
  const [, drop] = useDrop(() => ({
    accept: "CARD",
    drop: (item) => onDrop(item.index, item.status, status),
  }));

  const total = tasks.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="bg-[#f0f8ff] rounded-2xl p-4 w-[280px] min-h-[500px] flex-shrink-0">
      <h2 className="text-md font-bold mb-2 text-blue-700">{status} ({tasks.length})</h2>
      <div className="text-sm font-semibold text-gray-800 mb-4">{total} руб</div>
      <div ref={drop}>
        {tasks.map((task, i) => (
          <Card key={task.id} task={task} index={i} status={status} moveCard={moveCard} />
        ))}
      </div>
    </div>
  );
};

export default function KanbanCRM() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Тур в Японию", person: "Наталья", status: "В работе", amount: 240000 },
    { id: 2, title: "Тур в Мексику", person: "Филипп", status: "Предоплата", amount: 280000 },
    { id: 3, title: "Заявка сайта", person: "", status: "Новая заявка", amount: 0 },
  ]);

  const moveCard = (fromIndex, fromStatus, toStatus) => {
    const updated = [...tasks];
    const movedItem = updated.find((_, i) => updated[i].status === fromStatus && i === fromIndex);
    if (movedItem) movedItem.status = toStatus;
    setTasks([...updated]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-br from-cyan-100 to-blue-100 p-6 overflow-x-auto">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">Сделки</h1>
        <div className="flex space-x-4">
          {STATUSES.map((status) => (
            <Column
              key={status}
              status={status}
              tasks={tasks.filter((t) => t.status === status)}
              moveCard={moveCard}
              onDrop={moveCard}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}
