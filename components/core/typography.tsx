type Props = {
  icon?: React.ReactNode;
  subtitle?: React.ReactNode;
  title: React.ReactNode;
};
export const PageHeading = ({ icon, subtitle, title }: Props) => {
  return (
    <div className="mb-4 flex items-center">
      {icon && <div className="pr-2 text-yellow-500">{icon}</div>}
      <div className="grow">
        <h1 className="text-3xl">{title}</h1>
        {subtitle && (
          <div className="uppercase text-[var(--textSecondaryColor)]">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};
