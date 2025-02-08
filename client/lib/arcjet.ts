import arcjet, { shield } from "@arcjet/next";

const aj = arcjet({
    key: process.env.ARCJET_KEY!,
    rules: [
        shield({
            mode: "LIVE",
        }),
    ],
});

export default aj;
