import { FC, ReactNode } from "react";

type SectionProps = {
    children?: ReactNode[] | ReactNode | string;
}

const Section: FC<SectionProps> = ({ children }) => {
    return (
        <div className="my-6 sm:my-10 px-4 text-center">{children}</div>
    );
};

export default Section;
