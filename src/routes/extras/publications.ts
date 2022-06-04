import { Router, Request, Response } from 'express';
import { fetchAllPublications } from "@helpers/extras"

// authentication middlewares
import { verifySession } from "supertokens-node/recipe/session/framework/express";

const publicationsRouter = Router();

publicationsRouter.get("/", async (req: Request, res: Response) => {
    try {
        const publicationsResults = await fetchAllPublications();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(publicationsResults);
    } catch (error) {
        console.log(error)
        res.status(400).json(error);
    }
})

publicationsRouter.post("/add-publication",
    verifySession(),
    async (req: Request, res: Response) => {
        try {

        } catch (error) {
            console.log(error)
            res.status(400).json(error);
        }
    })

publicationsRouter.patch("/toggle-favorite",
    verifySession(),
    async (req: Request, res: Response) => {
        try {

        } catch (error) {
            console.log(error)
            res.status(400).json(error);
        }
    })

publicationsRouter.delete("/delete-publication",
    verifySession(),
    async (req: Request, res: Response) => {
        try {

        } catch (error) {
            console.log(error)
            res.status(400).json(error);
        }
    })

// export the router
export default publicationsRouter;
