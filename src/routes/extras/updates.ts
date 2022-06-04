import { Router, Request, Response } from 'express';

import { fetchAllUpdates } from "@helpers/extras"

// authentication middlewares
import { verifySession } from "supertokens-node/recipe/session/framework/express";

const updatesRouter = Router();

updatesRouter.get("/", async (req: Request, res: Response) => {
    try {
        const updatesResults = await fetchAllUpdates();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(updatesResults);
    } catch (error) {
        console.log(error)
        res.status(400).json(error);
    }
})

updatesRouter.post("/make-update",
    verifySession(),
    async (req: Request, res: Response) => {
        try {

        } catch (error) {
            console.log(error)
            res.status(400).json(error);
        }
    })

// export the router
export default updatesRouter;
