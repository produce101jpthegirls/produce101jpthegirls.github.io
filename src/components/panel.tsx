import { FC, ReactNode } from "react";

type PanelProps = {
  children: ReactNode[]|ReactNode|string;
}

const Panel: FC<PanelProps> = ({ children }) => {
  return (
    <div
      className="w-full sm:w-[480px] border border-gray-100 shadow
      rounded-2xl text-sm sm:text-base overflow-hidden bg-white"
    >{children}</div>
  )
};

export default Panel;
