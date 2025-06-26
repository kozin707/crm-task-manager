import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const statuses = [
  "Входящие лиды",
  "Переговоры",
  "Готовим предложение",
  "Принимают решение"
];

const initialDeals = [
  { id: 1, client: "Zeplin", title: "SMM", sum: 1890000, labels: ["Горячий"], status: statuses[0] },
  { id: 2, client: "Siri", title: "Доставка пиццы", sum: 720000, labels: ["Ждем оплаты"], status: statuses[1] },
  { id: 3, client: "Google", title: "Интеграция", sum: 2500000, labels: ["Горячий"], status: statuses[2] },
  { id: 4, client: "Panasonic", title: "Адаптация рекламных материалов", sum: 1100000, labels: ["Ждем оплаты"], status: statuses[3] }
];

const ItemType = "CARD";

function KanbanCard({ deal, moveCard }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { id: deal.id },
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  }));

  return (
    <div
      ref={drag}
      className="p-2 m-2 bg-white rounded-xl shadow text-sm border hover:shadow-md cursor-move"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="flex flex-wrap gap-1 mb-1">
        {deal.labels.map((label, i) => (
          <span
            key={i}
            className="px-2 py-0.5 text-white text-xs rounded-full"
            style={{ background: label === "Горячий" ? '#f97316' : '#0ea5e9' }}
          >
            {label}
          </span>
        ))}
      </div>
      <div className="font-medium">{deal.client}</div>
      <div className="text-gray-600">{deal.title}</div>
      <div className="font-semibold">{deal.sum.toLocaleString()} ₽</div>
    </div>
  );
}

function KanbanColumn({ status, deals, onDrop }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item) => onDrop(item.id, status),
    collect: (monitor) => ({ isOver: monitor.isOver() })
  }));

  const total = deals.reduce((sum, d) => sum + d.sum, 0);

  return (
    <div className="w-72 bg-gray-100 rounded-xl p-3" ref={drop}>
      <h2 className="font-bold mb-2">{status}</h2>
      <div className="text-xs text-gray-500 mb-2">
        {deals.length} сделок на {total.toLocaleString()} ₽
      </div>
      {deals.map((deal) => (
        <KanbanCard key={deal.id} deal={deal} />
      ))}
    </div>
  );
}

export default function Home() {
  const [deals, setDeals] = useState(initialDeals);

  const moveCard = (id, toStatus) => {
    setDeals((prev) =>
      prev.map((deal) =>
        deal.id === id ? { ...deal, status: toStatus } : deal
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex gap-4 p-4 overflow-x-auto h-screen bg-gray-200">
        {statuses.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            deals={deals.filter((d) => d.status === status)}
            onDrop={moveCard}
          />
        ))}
      </div>
    </DndProvider>
  );
}
