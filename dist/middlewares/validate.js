const validate = (validators) => {
    return async (req, res, next) => {
        try {
            if (validators.body) {
                const body = await validators.body.parseAsync(req.body);
                req.body = body;
            }
            if (validators.query) {
                const query = await validators.query.parseAsync(req.query);
                req.query = query;
            }
            if (validators.params) {
                const params = await validators.params.parseAsync(req.params);
                req.params = params;
            }
            next();
        }
        catch (error) {
            return res.status(422).json(error);
        }
    };
};
export { validate };
