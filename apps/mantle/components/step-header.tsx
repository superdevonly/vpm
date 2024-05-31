const StepHEader = ({ title, description }: any) => {
  return (
    <div className="max-w[500px] text-center">
      {title && <div className="text-lg">{title}</div>}
      {description && <div className="">{description}</div>}
    </div>
  );
};

export { StepHEader };
