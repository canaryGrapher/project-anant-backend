import { Router, Request, Response } from 'express';
// import { searchObjects, requestBodyForAddingMxene, requestBodyForEditingMxene, requestBodyForDeletingMxene } from '@typeDeclarations/mxene';
// import { body, param, validationResult } from 'express-validator';
// import { fetchMxeneDetails } from "@queries/index"
// import { addMxeneDetails, updateMxeneDetails, deleteMxeneDetails } from "@mutations/index"

import { fetchAllUpdates } from "@helpers/extras"

// authentication middlewares
import checkJwt from '@middleware/auth'
import checkScopes from '@middleware/admin'

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
    checkJwt, checkScopes,
    async (req: Request, res: Response) => {
        try {

        } catch (error) {
            console.log(error)
            res.status(400).json(error);
        }
    })

// export the router
export default updatesRouter;
