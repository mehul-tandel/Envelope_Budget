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
        // console.log(obj);
        envelopes.push(obj);
        res.send(`${name} envelope created.`);
    }
    
});

// get remaining amount from an envelope
envRouter.get("/:name", (req, res) => {
    const name = req.params.name;
    let amount = -1;
    envelopes.forEach(obj => {
        if (obj.name === name) {
            amount = obj.budget;
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
    return res.send(test);
});


module.exports = envRouter;