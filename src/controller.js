export const test = (req, res) => {
    return res.render("main");
};

export const createRoom = (req, res) => {
    return res.render("create-room");
};

export const chat = (req, res) => {
    return res.render("chat");
};