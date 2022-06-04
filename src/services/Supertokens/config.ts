import { appInfo } from './appInfo'
import SuperTokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import ThirdParty from "supertokens-node/recipe/thirdparty";
let { Google, Github, Apple, Facebook } = ThirdParty;


export const backendConfig = () => {
    SuperTokens.init({
        framework: "express",
        supertokens: {
            // These are the connection details of the app you created on supertokens.com
            connectionURI: "https://00abdf01e24411ecb6cd51056a67bbb0-ap-southeast-1.aws.supertokens.io:3567",
            apiKey: "R=dinEDm9ehrU7XAc-RBslUy16ddXV",
            // connectionURI: "https://try.supertokens.com",
        },
        appInfo,
        recipeList: [
            ThirdParty.init({
                signInAndUpFeature: {
                    providers: [
                        // We have provided you with development keys which you can use for testing.
                        // IMPORTANT: Please replace them with your own OAuth keys for production use.
                        Google({
                            clientId: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
                            clientSecret: "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"
                        }),
                        Github({
                            clientId: "467101b197249757c71f",
                            clientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd"
                        }),
                        Apple({
                            clientId: "4398792-io.supertokens.example.service",
                            clientSecret: {
                                keyId: "7M48Y4RYDL",
                                privateKey:
                                    "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----",
                                teamId: "YWQCXGJRJL",
                            },
                        }),
                        Facebook({
                            clientSecret: "FACEBOOK_CLIENT_SECRET",
                            clientId: "FACEBOOK_CLIENT_ID"
                        })
                    ]
                }
            }),
            Session.init() // initializes session features
        ]
    });
}