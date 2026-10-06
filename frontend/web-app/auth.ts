import NextAuth, { Profile } from "next-auth"
import { OIDCConfig } from "next-auth/providers"
import DuendeIDS6Provider from "next-auth/providers/duende-identity-server6"

export const { handlers, signIn, signOut, auth } = NextAuth( {
    providers: [
        DuendeIDS6Provider({
            id: 'id-server',
            clientId: "nextApp",
            clientSecret: "secret",
            issuer: "http://identity-svc:5001",
            authorization: { params: { scope: 'openid profile auctionApp' } },
            idToken: false,
        } as OIDCConfig<Profile>)
    ],
    callbacks: {
        async authorized({auth}) {
            return !!auth
        },

        async jwt({ token, profile, account}) {
            if (account && account.access_token) {
                token.accessToken = account.access_token
            }
            if (profile) {
                token.username = profile.username
            }
        return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.username = token.username as string;
                session.accessToken = token.accessToken;
            }
            return session;
        }
    }
})