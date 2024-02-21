import Link from "next/link";
import { atom, useAtom } from "jotai";
import { useState } from "react";

export const tokenAtom = atom<string | null>(null);

export const Header = ({ title }: { title: string }) => {
  const [token, setToken] = useState("");
  const [, setAtom] = useAtom(tokenAtom);

  return (
    <div className="flex h-60 w-full flex-col items-center">
      <div className="flex h-20 w-full items-center justify-center gap-8 px-20 text-lg">
        <Link className="underline" href="/">
          Home
        </Link>
        <Link className="underline" href="/destaques">
          Destaques
        </Link>
        <div className="ml-auto flex gap-2">
          <input
            placeholder="Chave API"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="rounded border p-2"
          />
          <button
            onClick={() => setAtom(token)}
            type="button"
            className="rounded bg-gray-800 p-2 text-gray-300"
          >
            Salvar
          </button>
        </div>
      </div>
      <h1 className="flex h-40 items-center justify-center text-5xl">
        {title}
      </h1>
    </div>
  );
};
