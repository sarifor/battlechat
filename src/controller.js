export const main = (_, res) => {
    return res.render("main");
};

export const createRoom = (_, res) => {
    return res.redirect("/");
};

export const chat = (_, res) => {
    return res.redirect("/");
};