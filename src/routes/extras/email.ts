import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { fetchAllEmails } from "@helpers/extras"

// authentication middlewares
import { verifySession } from "supertokens-node/recipe/session/framework/express";

const emailRouter = Router();

// @route   POST /email
// @desc    Route to add a new email to the database
// @access  Protected
emailRouter.post("/",
    body('email').isEmail().withMessage('Please enter a valid email address'),
    verifySession(),
    async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.setHeader('Content-Type', 'application/json');
                res.status(400).json({ errors: errors.array() });
            }
            const { email } = req.body;
            await fetchAllEmails(email);
            res.status(200).json({ password: process.env.ZIP_PASSWORD, zipLink: process.env.ZIP_LINK });
        } catch (error) {
            console.log(error)
            res.status(400).json(error);
        }
    })

// export the router
export default emailRouter;
