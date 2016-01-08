module.exports = (app, mids) => {
    mids.forEach((mid) => app.use(mid));
};