import "./index.css";

interface Properties {
  title: string;
  onClick: () => void;
}

const Card = ({ title, onClick }: Properties) => {
  return (
    <div className="card">
      <h1>{title}</h1>
      <button onClick={onClick}>&gt;</button>
    </div>
  );
};

export default Card;
