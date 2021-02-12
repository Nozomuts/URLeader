import Link from "next/link";
import { useRouter } from "next/dist/client/router";
import { GiSpeakerOff, GiSpeaker } from "react-icons/gi";
import { useEffect, useState } from "react";

export const Header = () => {
  const { pathname } = useRouter();
  const [hasSound, setHasSound] = useState<string | null>();

  useEffect(() => {
    setHasSound(localStorage.getItem("has_sound"));
  }, []);

  const linkList = [
    { name: "TOP", url: "/" },
    { name: "プライバシーポリシー", url: "/policy" },
    { name: "お問い合わせ", url: "/form" },
  ];

  const toggleHasSound = (hasSound: string) => {
    localStorage.setItem("has_sound", hasSound);
    setHasSound(hasSound);
  };

  return (
    <>
      <div className="bg-black flex flex-col justify-evenly md:justify-between md:flex-row items-center md:px-12 shadow-lg fixed w-full h-28 md:h-16">
        <Link href="/">
          <a className="flex items-center" aria-label="タイトル">
            <h1 className="font-audio text-3xl text-white">
              <span className="text-main">URL</span>eader
            </h1>
          </a>
        </Link>
        <div className="flex items-center">
          <button
            onClick={() => toggleHasSound(hasSound === "on" ? "off" : "on")}
          >
            {process.browser && hasSound === "on" ? (
              <GiSpeaker color="white" size="25" />
            ) : (
              <GiSpeakerOff color="white" size="25" />
            )}
          </button>
          {linkList.map(({ name, url }) => (
            <Link href={url} key={name}>
              <a
                className={`ml-8 first:ml-0 md:ml-12 text-gray-100 text-xs md:text-base underline hover:opacity-70 ${
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
      <div className="pt-28 md:pt-16"></div>
    </>
  );
};
