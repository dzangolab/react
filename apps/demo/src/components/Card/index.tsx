import "./index.css";

interface Properties {
  title: string;
  onClick: () => void;
}

const Card = ({ title, onClick }: Properties) => {
  return (
    <div className="card" onClick={onClick}>
      <h1>{title}</h1>
    </div>
  );
};

export default Card;
