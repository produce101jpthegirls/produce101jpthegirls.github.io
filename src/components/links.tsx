import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FC, ReactNode } from "react";

type StableLinkProps = {
  children?: ReactNode[] | ReactNode | string;
  className?: string;
  pathname: string;
};

export const StableLink: FC<StableLinkProps> = ({ children, className, pathname }) => {
  const searchParams = useSearchParams();
  return (
    <Link
      className={className}
      href={{
        pathname: pathname,
        query: searchParams.toString(),
      }}
    >{children}</Link>
  )
};
