import React from "react";

type Props = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
};
export const SectionHeading = ({ icon, title, subtitle }: Props) => {
  return (
    <div className="mb-4 flex items-center">
      {icon && (
        <div className="pr-2 text-yellow-500">
          {icon}
        </div>
      )}
      <div className="grow">
        <h2 className="text-2xl">
          {title}
        </h2>
        {subtitle && (
          <div className="uppercase text-[var(--textSecondaryColor)]">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};
