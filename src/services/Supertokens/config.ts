import { appInfo } from './appInfo'
import SuperTokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import ThirdParty from "supertokens-node/recipe/thirdparty";
let { Google, Github, Apple, Facebook } = ThirdParty;


export const backendConfig = () => {
    SuperTokens.init({
        framework: "express",
        supertokens: {
            connectionURI: process.env.SUPERTOKENS_CONNECTION_URI,
            apiKey: process.env.SUPERTOKENS_API_KEY,
        },
        appInfo,
        recipeList: [
            ThirdParty.init({
                signInAndUpFeature: {
                    providers: [
                        Google({
                            clientId: process.env.SUPERTOKENS_SOCIAL_GOOGLE_ID,
                            clientSecret: process.env.SUPERTOKENS_SOCIAL_GOOGLE_SECRET,
                        }),
                        Github({
                            clientId: process.env.SUPERTOKENS_SOCIAL_GITHUB_ID,
                            clientSecret: process.env.SUPERTOKENS_SOCIAL_GITHUB_SECRET
                        }),
                        Apple({
                            clientId: process.env.SUPERTOKENS_SOCIAL_APPLE_ID,
                            clientSecret: {
                                keyId: process.env.SUPERTOKENS_SOCIAL_APPLE_SECRET_ID,
                                privateKey: process.env.SUPERTOKENS_SOCIAL_APPLE_PRIVATE_KEY,
                                teamId: process.env.SUPERTOKENS_SOCIAL_APPLE_TEAM_ID,
                            },
                        }),
                        Facebook({
                            clientSecret: process.env.SUPERTOKENS_SOCIAL_FACEBOOK_ID,
                            clientId: process.env.SUPERTOKENS_SOCIAL_FACEBOOK_SECRET,
                        })
                    ]
                }
            }),
            Session.init()
        ]
    });
}