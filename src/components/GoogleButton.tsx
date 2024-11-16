'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function GoogleButton() {
  const { data: session } = useSession();

  return (
    <div className="absolute top-4 right-4 flex items-center gap-4">
      {session ? (
        <>
          {session.user?.image && (
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={session.user.image}
                alt="Profile"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
          )}
          <button
            onClick={() => signOut()}
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm h-10 px-4"
          >
            Sign Out
          </button>
        </>
      ) : (
        <button
          onClick={() => signIn('google')}
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm h-10 px-4"
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
}