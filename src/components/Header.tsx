import Link from "next/link";
import { useRouter } from "next/dist/client/router";

export const Header = () => {
  const { pathname } = useRouter();

  const linkList = [
    { name: "TOP", url: "/" },
    { name: "プライバシーポリシー", url: "/policy" },
    { name: "お問い合わせ", url: "/form" },
  ];

  return (
    <>
      <div className="bg-black flex flex-col justify-evenly md:justify-between md:flex-row items-center md:px-12 shadow-lg fixed w-full h-28">
        <Link href="/">
          <a className="flex items-center" aria-label="タイトル">
            <h1 className="font-audio text-4xl text-white">
              <span className="text-main">URL</span>eader
            </h1>
          </a>
        </Link>
        <div>
          {linkList.map(({ name, url }) => (
            <Link href={url} key={name}>
              <a
                className={`ml-8 md:ml-12 text-gray-100 underline hover:opacity-70 ${
                  pathname === url ? "text-main" : ""
                }`}
                aria-label={name}
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
