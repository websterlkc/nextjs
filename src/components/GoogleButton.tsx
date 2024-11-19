'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

interface GoogleButtonProps {
  showOnPath?: string[];  // paths where button should be shown
  hideOnPath?: string[];  // paths where button should be hidden
}

export default function GoogleButton({ showOnPath, hideOnPath }: GoogleButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // Visibility logic
  const shouldShow = () => {
    if (showOnPath && !showOnPath.includes(pathname)) {
      return false;
    }
    if (hideOnPath && hideOnPath.includes(pathname)) {
      return false;
    }
    return true;
  };

  if (!shouldShow()) {
    return null;
  }

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
    <div className="flex items-center">
      {session ? (
        <div className="flex items-center gap-2">
          {session.user?.image && (
            <div className="relative w-6 h-6 rounded-full overflow-hidden">
              <Image
                src={session.user.image}
                alt="Profile"
                width={24}
                height={24}
                className="object-cover"
              />
            </div>
          )}
          <button
            onClick={handleSignOut}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button
          onClick={handleSignIn}
          type="button"
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
}