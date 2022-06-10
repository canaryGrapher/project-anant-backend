import { Router, Request, Response } from 'express';
import { fetchAllPublications } from "@helpers/extras"

// authentication middlewares
import { verifySession } from "supertokens-node/recipe/session/framework/express";

const publicationsRouter = Router();

// @route   GET /publications
// @desc    Route to get all publications on the database
// @access  Public
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

// INCOMPLETE INCOMPLETE INCOMPLETE INCOMPLETE INCOMPLETE
// @route   POST /publications
// @desc    Route to add a new publication to the database
// @access  Protected
publicationsRouter.post("/add-publication",
    verifySession(),
    async (req: Request, res: Response) => {
        try {

        } catch (error) {
            console.log(error)
            res.status(400).json(error);
        }
    })

// INCOMPLETE INCOMPLETE INCOMPLETE INCOMPLETE INCOMPLETE    
// @route   Patch /publications/toggle-favorite/:id
// @desc    Route to add/remove a publication to/from favorites
// @access  Protected
publicationsRouter.patch("/toggle-favorite",
    verifySession(),
    async (req: Request, res: Response) => {
        try {

        } catch (error) {
            console.log(error)
            res.status(400).json(error);
        }
    })

// INCOMPLETE INCOMPLETE INCOMPLETE INCOMPLETE INCOMPLETE
// @route   DELETE /publications/delete-publication/:id
// @desc    Route to delete a publication entry from the database
// @access  Protected
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
