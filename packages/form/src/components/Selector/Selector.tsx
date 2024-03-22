interface ISelect {
  label?: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[];
}

export const Selector = ({ label = "", name }: ISelect) => {
  return (
    <div className={name}>
      {label && <label htmlFor={name}>{label}</label>}
      <div>comming soon</div>
    </div>
  );
};
