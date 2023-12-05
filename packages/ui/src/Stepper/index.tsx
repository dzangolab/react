type MenuItem = {
  label: string;
  command?: (event: any) => void;
};

interface IProperties {
  list?: MenuItem[];
}

export const Stepper: React.FC<IProperties> = ({
  list = [{ label: "Manish" }, { label: "Gaurav" }],
}) => {
  return (
    <ul className="stepper">
      {list.map((element, index) => {
        return (
          <li
            className="step"
            key={index}
            onClick={(event: any) => element.command?.(event)}
          >
            <div className="label-wrapper">
              <span>{index + 1}</span>
              <span className="step-label">{element.label}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
