import Link from "next/link";

interface FullscreenMenuProps {
  fullMenuHandler: (value: boolean) => void;
}

const FullscreenMenu = ({ fullMenuHandler }: FullscreenMenuProps) => {
  return (
    <ul className="fullscreen-menulist mb-0 flex h-screen items-center justify-between pl-0">
      <li className="section group flex basis-1/5 items-center justify-center self-stretch border-l border-white border-opacity-10 text-center transition-all duration-500 first:border-l-0 hover:basis-2/5">
        <Link href="/homepage1">
          <a
            className="flex w-full items-center justify-center self-stretch p-5 text-5xl font-bold uppercase text-heading group-hover:text-primary xl:text-6xl"
            onClick={(e) => fullMenuHandler(false)}
          >
            <span className="fullmenuitem rotate-180">Home</span>
          </a>
        </Link>
      </li>
      <li className="section group flex basis-1/5 items-center justify-center self-stretch border-l border-white border-opacity-10 text-center transition-all duration-500 first:border-l-0 hover:basis-2/5">
        <Link href="/about">
          <a
            className="flex w-full items-center justify-center self-stretch p-5 text-5xl font-bold uppercase text-heading group-hover:text-primary xl:text-6xl"
            onClick={(e) => fullMenuHandler(false)}
          >
            <span className="fullmenuitem rotate-180">About</span>
          </a>
        </Link>
      </li>
      <li className="section group flex basis-1/5 items-center justify-center self-stretch border-l border-white border-opacity-10 text-center transition-all duration-500 first:border-l-0 hover:basis-2/5">
        <Link href="/resume">
          <a
            className="flex w-full items-center justify-center self-stretch p-5 text-5xl font-bold uppercase text-heading group-hover:text-primary xl:text-6xl"
            onClick={(e) => fullMenuHandler(false)}
          >
            <span className="fullmenuitem rotate-180">Resume</span>
          </a>
        </Link>
      </li>
      <li className="section group flex basis-1/5 items-center justify-center self-stretch border-l border-white border-opacity-10 text-center transition-all duration-500 first:border-l-0 hover:basis-2/5">
        <Link href="/works">
          <a
            className="flex w-full items-center justify-center self-stretch p-5 text-5xl font-bold uppercase text-heading group-hover:text-primary xl:text-6xl"
            onClick={(e) => fullMenuHandler(false)}
          >
            <span className="fullmenuitem rotate-180">Works</span>
          </a>
        </Link>
      </li>
      <li className="section group flex basis-1/5 items-center justify-center self-stretch border-l border-white border-opacity-10 text-center transition-all duration-500 first:border-l-0 hover:basis-2/5">
        <Link href="/posts/1">
          <a
            className="flex w-full items-center justify-center self-stretch p-5 text-5xl font-bold uppercase text-heading group-hover:text-primary xl:text-6xl"
            onClick={(e) => fullMenuHandler(false)}
          >
            <span className="fullmenuitem rotate-180">Blogs</span>
          </a>
        </Link>
      </li>
      <li className="section group flex basis-1/5 items-center justify-center self-stretch border-l border-white border-opacity-10 text-center transition-all duration-500 first:border-l-0 hover:basis-2/5">
        <Link href="/contact">
          <a
            className="flex w-full items-center justify-center self-stretch p-5 text-5xl font-bold uppercase text-heading group-hover:text-primary xl:text-6xl"
            onClick={(e) => fullMenuHandler(false)}
          >
            <span className="fullmenuitem rotate-180">Contact</span>
          </a>
        </Link>
      </li>
    </ul>
  );
};

export default FullscreenMenu;
