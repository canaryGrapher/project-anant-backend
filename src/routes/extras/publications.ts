import { Router, Request, Response } from 'express';
// import { searchObjects, requestBodyForAddingMxene, requestBodyForEditingMxene, requestBodyForDeletingMxene } from '@typeDeclarations/mxene';
// import { body, param, validationResult } from 'express-validator';
// import { fetchMxeneDetails } from "@queries/index"
// import { addMxeneDetails, updateMxeneDetails, deleteMxeneDetails } from "@mutations/index"

import { fetchAllPublications } from "@helpers/extras"

// authentication middlewares
import checkJwt from '@middleware/auth'
import checkScopes from '@middleware/admin'

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
    checkJwt, checkScopes,
    async (req: Request, res: Response) => {
        try {

        } catch (error) {
            console.log(error)
            res.status(400).json(error);
        }
    })

publicationsRouter.patch("/toggle-favorite",
    checkJwt, checkScopes,
    async (req: Request, res: Response) => {
        try {

        } catch (error) {
            console.log(error)
            res.status(400).json(error);
        }
    })

publicationsRouter.delete("/delete-publication",
    checkJwt, checkScopes,
    async (req: Request, res: Response) => {
        try {

        } catch (error) {
            console.log(error)
            res.status(400).json(error);
        }
    })

// export the router
export default publicationsRouter;
