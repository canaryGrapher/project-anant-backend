import { Router, Request, Response } from 'express';

const healthCheckRouter = Router();


// @route   GET /healthcheck
// @desc    Route to get server health
// @access  Public
healthCheckRouter.get("/", async (req: Request, res: Response) => {
    const healthcheck = {
        status: "ok",
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        cpuUsage: process.cpuUsage(),
        processId: process.pid,
        processTitle: process.title,
        processArgv: process.argv,
        processCwd: process.cwd(),
        processExecPath: process.execPath,
        processExecArgv: process.execArgv,
        responseTime: process.hrtime(),
        fresh: req.fresh,
        stale: req.stale,
        hostname: req.hostname,
        ip: req.ip,
        xhr: req.xhr,
        protocol: req.protocol,
        secure: req.secure,
    }
    res.status(200).json(healthcheck);
})

export default healthCheckRouter;