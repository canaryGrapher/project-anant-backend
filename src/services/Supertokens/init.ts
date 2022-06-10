import { Request, Response } from 'express';

import { middleware } from 'supertokens-node/framework/express';
import { superTokensNextWrapper } from 'supertokens-node/nextjs';

// initialize the supertokens instance
// called in the server.ts file
export default async function superTokens(req: Request, res: Response) {
    await superTokensNextWrapper(
        async (next) => {
            await middleware()(req, res, next)
        },
        req,
        res
    )
    if (!res.writableEnded) {
        res.status(404).send('Not found')
    }
}