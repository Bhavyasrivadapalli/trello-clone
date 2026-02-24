import Card from "./Card";

export default function Column({ column, setColumns }) {

  const updateCard = (cardId, newTitle) => {
    setColumns(prev =>
      prev.map(col =>
        col.id === column.id
          ? {
              ...col,
              cards: col.cards.map(card =>
                card.id === cardId
                  ? { ...card, title: newTitle }
                  : card
              )
            }
          : col
      )
    );
  };

  return (
    <div className="column">
      <h2>{column.title}</h2>

      {column.cards.map(card => (
        <Card
          key={card.id}
          card={card}
          onUpdate={updateCard}
        />
      ))}
    </div>
  );
}