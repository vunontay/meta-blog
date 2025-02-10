import arcjet, { detectBot, fixedWindow, shield } from "@arcjet/next";

const aj = arcjet({
    key: process.env.ARCJET_KEY!,
    rules: [
        shield({
            mode: "LIVE",
        }),
        detectBot({
            mode: "LIVE",
            allow: [],
        }),
        fixedWindow({
            mode: "LIVE",
            window: "1m",
            max: 50,
        }),
    ],
});

export default aj;
