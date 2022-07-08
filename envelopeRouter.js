const express = require('express');

const envRouter = express.Router();

// envelopes(list) store objects such as {name: envelopeName, budget: amount}
envelopes = []

// create a new envelope from query string
envRouter.post('/create', (req,res) => {
    const name = req.query.name;
    const budget = req.query.budget;
    let flag = false;
    envelopes.forEach(obj => {
        if (obj.name === name){
            flag = true;
        }
    });
    if(flag === true){
        res.status(401).send(`${name} envelope already exists.`);
    } else {
        const obj = {name: name, budget: budget};
        envelopes.push(obj);
        res.send(`${name} envelope created.`);
    }
});

// updates the budget of an envelope
envRouter.post('/update', (req,res) => {
    const name = req.query.name;
    const budget = req.query.budget;
    let flag = false;
    envelopes.forEach(obj => {
        if (obj.name === name){
            flag = true;
            this.delete;
        }
    });
    if(flag === false){
        res.status(404).send(`${name} envelope does not exists.`);
    } else {
        const obj = {name: name, budget: budget};
        envelopes.push(obj);
        res.send(`${name} envelope updated.`);
    }
});

// get remaining amount from an envelope
envRouter.get("/:name", (req, res) => {
    const name = req.params.name;
    let amount = -1;
    envelopes.forEach(obj => {
        if (obj.name === name) {
            amount = Number(obj.budget);
        }
    });
    if (amount < 0) {
        res.send(`No such envelope exists`);
    }else{
        res.send(`${amount} amount remaining.`);
    }
});

// get the list of all envelopes
envRouter.get("/", (req, res) => {
    return res.send(envelopes);
});


module.exports = envRouter;