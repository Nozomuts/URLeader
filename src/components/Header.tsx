import Link from "next/link";
import { useRouter } from "next/dist/client/router";

export const Header = () => {
  const { pathname } = useRouter();

  const linkList = [
    { name: "TOP", url: "/" },
    { name: "使い方", url: "/info" },
    { name: "お問い合わせ", url: "/form" },
  ];

  return (
    <>
      <div className="bg-black flex justify-between items-center px-12 shadow-lg fixed w-full h-28">
        <Link href="/">
          <a className="flex items-center">
            <h1 className="font-audio text-4xl text-white">
              <span className="text-main">URL</span>eader
            </h1>
          </a>
        </Link>
        <div>
          {linkList.map(({ name, url }) => (
            <Link href={url} key={name}>
              <a
                className={`ml-12 text-gray-100 underline hover:opacity-70 ${
                  pathname === url ? "text-main" : ""
                }`}
              >
                {name}
              </a>
            </Link>
          ))}
        </div>
      </div>
      <div className="pt-28"></div>
    </>
  );
};
