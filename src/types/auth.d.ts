declare global {
    namespace Express {
        interface Request {
            user: string;
            session: any;
        }
    }
}

export { }