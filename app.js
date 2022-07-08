const express = require('express');

const envRouter = require('./envelopeRouter');

const port = 3000;

app = express();

app.use("/envelopes",envRouter);

app.get("/", (req,res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Listening at port:${port}`);
});

