import { Router, Request, Response } from 'express';

import { fetchAllUpdates } from "@helpers/extras"

// authentication middlewares
import { verifySession } from "supertokens-node/recipe/session/framework/express";

const updatesRouter = Router();

// @route   GET /updates
// @desc    Route to get all updates from the database
// @access  Public
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

// INCOMPLETE INCOMPLETE INCOMPLETE INCOMPLETE INCOMPLETE
// @route   POST /updates/make-update
// @desc    Route to add an update to the database
// @access  Protected
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
