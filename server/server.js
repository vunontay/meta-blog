const app = require("./src/app");
const {
    app: { port },
} = require("./src/configs/mongodb-config");
const PORT = port || process.env.DEV_APP_PORT;

const server = app.listen(PORT, () => {
    console.log(`Sever Listen On Port ${PORT}`);
});

process.on("SIGINT", () => {
    server.close(() => console.log(`Exist Server Express`));
});
