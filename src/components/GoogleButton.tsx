'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function GoogleButton() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut({ 
        redirect: true,
        callbackUrl: '/' 
      });
    } catch (error) {
      console.error('Sign out error:', error);
      router.push('/');
    }
  };

  const handleSignIn = async () => {
    try {
      console.log('Attempting to sign in...');
      const result = await signIn('google', { callbackUrl: '/' });
      console.log('Sign in result:', result);
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  return (
    <div className="absolute top-4 right-4 flex items-center gap-4 z-50">
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
            onClick={handleSignOut}
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm h-10 px-4"
          >
            Sign Out
          </button>
        </>
      ) : (
        <button
          onClick={handleSignIn}
          type="button"
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm h-10 px-4 cursor-pointer"
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
}