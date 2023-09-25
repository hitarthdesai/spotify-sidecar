import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { status } = useSession();

  return (
    <header className="w-full bg-yellow-400">
      <nav className="px-4 py-2">
        <ul className="flex items-center space-x-4">
          <li className="mr-auto">
            <a href="/" className="text-[#2e026d] hover:text-white">
              spotify-sidecar
            </a>
          </li>

          {status === "authenticated" ? (
            <>
              <li>
                <Link
                  href="/playlists"
                  className="text-gray-800 hover:text-gray-600"
                >
                  Playlists
                </Link>
              </li>
              <li>
                <button
                  onClick={() => signOut()}
                  className="rounded bg-gray-800 px-4 py-2 text-white"
                >
                  Sign out
                </button>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={() => signIn()}
                className="rounded bg-gray-800 px-4 py-2 text-white"
              >
                Sign in
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
