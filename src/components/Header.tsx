import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

export const Header = (): JSX.Element => {
  const { pathname } = useRouter();

  const linkList = [
    { name: "TOP", url: "/" },
    { name: "使い方", url: "/info" },
    { name: "お問い合わせ", url: "/form" },
  ];

  return (
    <div className="bg-custom-black flex justify-between items-center pl-12 pr-12 shadow-lg">
      <Image height={100} width={280} src="/logo.png" alt="ロゴ" />
      <div>
        {linkList.map(({ name, url }) => (
          <Link href={url} key={name}>
            <a
              className={`pl-12 text-custom-smoke underline hover:opacity-70 ${
                pathname === url ? "text-main" : ""
              }`}
            >
              {name}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};
