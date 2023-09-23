import Link from "next/link";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="px-4 sm:px-20">
      <hr />
      <div className="mt-6 flex flex-col gap-0 items-center text-pd-gray text-sm">
        <div>© 2023 github/produce101jpthegirls</div>
        <div className="text-center">
          <span className="inline-block">This site is a fan made site.</span>
          <span className="inline-block">{`It's not made by the official team.`}</span>
        </div>
        <div className="mt-4 flex gap-4">
          <Link
            className="hover:text-pd-pink-400 underline"
            href="https://produce101.jp/"
            target="_blank"
          >Official Site</Link>
          <Link
            className="hover:text-pd-pink-400 underline"
            href="https://github.com/produce101jpthegirls/produce101jpthegirls.github.io"
            target="_blank"
          >GitHub</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
