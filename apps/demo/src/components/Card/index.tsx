import "./index.css";

interface Properties {
  title: string;
  onClick: () => void;
}

const Card = ({ title, onClick }: Properties) => {
  return (
    <div className="card">
      <div>
        <h1>{title}</h1>
      </div>
      <button className="icon" onClick={onClick}>
        &gt;
      </button>
    </div>
  );
};

export default Card;
