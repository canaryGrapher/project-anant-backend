import express, { Application, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';

// imports related to supertokens
import supertokens from "supertokens-node";
import { backendConfig } from "@services/Supertokens/config";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { middleware } from "supertokens-node/framework/express";
import { errorHandler } from "supertokens-node/framework/express";

//importing routes for mxene
import mxeneSearchRouter from "@routes/search/mxene";
import mxeneDownloadRouter from "@routes/download/mxene";
import mutateMxeneRouter from "@routes/mutate/mxene";
//importing routes for other services
import publicationsRouter from "@routes/extras/publications";
import updatesRouter from "@routes/extras/updates";
import faqRouter from "@routes/extras/faqs";
//importing helthcheck route
import healthCheckRouter from "@routes/extras/healthcheck";

// iniitalizing express server
const server: Application = express();

// initialize supertokens for authentication
backendConfig();

// defining cors options
server.use(cors({
    origin: process.env.FRONTEND_URL,
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    preflightContinue: false,
    optionsSuccessStatus: 200
}));
server.use(middleware());
server.use(mongoSanitize());
server.use(express.json({ limit: "10kb", strict: true, type: "application/json" }));
server.use(helmet());

// giving access to the pdb and the image forlder of the database folder publically
const pdb_file_locations = process.env.MXENE_DOWNLOAD_RESOLVER + "/pdb";
const band_images_locations = process.env.MXENE_DOWNLOAD_RESOLVER + "/band_plots";
const staticOptions = {
    dotfiles: 'deny',
    etag: true,
    immutable: true,
    maxAge: '1d',
}
server.use('/static/pdb', express.static(pdb_file_locations, staticOptions));
server.use('/static/image', express.static(band_images_locations, staticOptions));

// @route   GET /
// @desc    dummy route for testing
// @access  Public
server.get("/", (req: Request, res: Response) => {
    res.status(200).send("The application is healthy");
})

// mxene routes
server.use("/searchmxene", mxeneSearchRouter)
server.use("/downloadmxene", mxeneDownloadRouter)
server.use("/mutatemxene", mutateMxeneRouter)
// extra routes
server.use("/publications", publicationsRouter)
server.use("/updates", updatesRouter)
server.use("/faqs", faqRouter)
server.use("/healthcheck", healthCheckRouter)
// authentication routes

// @route   GET /sessioninfo
// @desc    information about the current session
// @access  Protected
server.get("/", verifySession(), async (req: Request, res: Response) => {
    let session = req.session;
    res.status(200).json({
        session: session,
        sessionHandle: session.getHandle(),
        userId: session.getUserId(),
        accessTokenPayload: session.getAccessTokenPayload(),
    });
});

server.use(errorHandler());

server.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send(err);
});

// @route   GET *
// @desc    Handle routing when no defined route is called
// @access  Public
server.get('*', (req: Request, res: Response) => {
    console.log("Something seems to be the issue")
    res.status(404).send("Nothing was found")
})

const port = process.env.PORT || 3002;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
