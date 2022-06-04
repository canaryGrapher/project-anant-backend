import express, { Application, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';

import { backendConfig } from "@services/Supertokens/config";
import supertokens from "supertokens-node";
// supertokens-node/recipe/session/framework/express
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { middleware } from "supertokens-node/framework/express";
import { errorHandler } from "supertokens-node/framework/express";




const server: Application = express();
const port = process.env.PORT || 3002;

//importing routes
import mxeneSearchRouter from "@routes/search/mxene";
import mxeneDownloadRouter from "@routes/download/mxene";
import mutateMxeneRouter from "@routes/mutate/mxene";

import publicationsRouter from "@routes/extras/publications";
import updatesRouter from "@routes/extras/updates";
import faqRouter from "@routes/extras/faqs";

backendConfig();
server.use(cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    preflightContinue: false,
    optionsSuccessStatus: 200
}));
server.use(middleware());
server.use(mongoSanitize());
server.use(express.json({ limit: "10kb", strict: true, type: "application/json" }));
server.use(helmet({ contentSecurityPolicy: false }));

const pdb_file_locations = process.env.MXENE_DOWNLOAD_RESOLVER + "/pdb";
const band_images_locations = process.env.MXENE_DOWNLOAD_RESOLVER + "/band_plots";
server.use('/static/pdb', express.static(pdb_file_locations));
server.use('/static/image', express.static(band_images_locations));

server.get("/", (req: Request, res: Response) => {
    res.status(200).send("The application is healthy");
})
server.get("/test", (req: Request, res: Response) => {
    res.send("Message")
})

// mxene routes
server.use("/searchmxene", mxeneSearchRouter)
server.use("/downloadmxene", mxeneDownloadRouter)
server.use("/mutatemxene", mutateMxeneRouter)
// extra routes
server.use("/publications", publicationsRouter)
server.use("/updates", updatesRouter)
server.use("/faqs", faqRouter)

server.get("/sessioninfo", verifySession(), async (req: Request, res: Response) => {
    let session = req.session;
    console.log("My session: ", session);
    res.send({
        session: session,
        sessionHandle: session.getHandle(),
        userId: session.getUserId(),
        accessTokenPayload: session.getAccessTokenPayload(),
    });
});


server.use(errorHandler());

server.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log("Req: ", req)
    res.status(500).send(err);
});


// server.get('*', (req: Request, res: Response) => {
//     console.log("Something seems to be the issue")
//     res.status(404).send("Not found as of now")
// })

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
