import { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { UserController } from "@/app/controllers/userController"

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user?.email) {
        console.log("No email provided");
        return false;
      }
      
      if (account?.provider === "google") {
        try {
          const searchResponse = await UserController.searchUser(user.email);
          const { data: existingUser } = await searchResponse.json();

          if (!existingUser) {
            const createResponse = await UserController.addUser({
              email: user.email,
              name: user.name,
            });
            
            const { error } = await createResponse.json();
            if (error) {
              console.error('Error creating user:', error);
              return false;
            }
          }

          const logResponse = await UserController.addUserLogging(user.email);
          const { error } = await logResponse.json();
          if (error) {
            console.error('Error logging user:', error);
          }

          return true;
        } catch (error) {
          console.error('Error in sign in callback:', error);
          return false;
        }
      }
      return true;
    },
  },
  pages: {
    error: '/auth/error',
    signIn: '/auth/signin',
  },
  debug: process.env.NODE_ENV === 'development',
} 