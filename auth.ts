import NextAuth from "next-auth"
import keycloak from "next-auth/providers/keycloak"

export const { handlers, signIn, signOut, auth } = NextAuth({

  debug: true,

  providers: [keycloak({
    profile(profile) {
      return { id: profile.id, name: profile.name, email: profile.email, image: profile.image, role: profile.groups ?? "user" }
    },
  })],

  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,

  callbacks: {
    jwt: async ({ token, account, user, profile, session }) => {

      if (user) {
        token.role = (user as { role?: string }).role ?? "user";
      }

      return token
    },

    session: async ({ session, token, user }) => {
      session.user.role = Array.isArray(token.role) ? token.role : [token.role]; // Ensure role is an array
      return session
    }
  }

})