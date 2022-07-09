const express = require('express');

const envRouter = express.Router();

// envelopes(list) store objects such as {name: envelopeName, budget: amount}
let envelopes = []

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

// endpoint to delete an envelope
envRouter.delete('/delete/:name', (req,res) => {
    const name = req.params.name;
    let new_envelopes = envelopes.filter(item => {
        return item.name !== name;
    });
    if(envelopes.length === new_envelopes.length){
        res.status(404).send(`${name} envelope does not exist.`);
    } else {
        envelopes = new_envelopes;
        res.send(`${name} envelope deleted.`);
    }
});

// endpoint to take some amount out of envelope and updates remaining amount
envRouter.put("/:name/:amount", (req, res) => {
    const name = req.params.name;
    const amount = req.params.amount;
    let exceed = false;
    let exist = false;
    let remaining = -1;
    envelopes.forEach(obj => {
        if (obj.name === name) {
            remaining = Number(obj.budget) - Number(amount);
            if(remaining < 0) {
                exceed = true;
            }else{
                obj.budget = remaining;
            }
            exist = true;
        }
    });
    if (!exist) {
        res.send(`No such envelope exists`);
    }else{
        if(exceed){
            res.send(`Amount exceeds the budget!`)
        } else{
            res.send(`${remaining} amount remaining.`);
        }
    }
});

// endpoint to transer budget from one envelope to another
envRouter.put('/transfer/:from/:to/:amount', (req,res) => {
    const from = req.params.from;
    const to = req.params.to;
    const amount = req.params.amount;
    let exceed = false;
    let exist = 0;
    envelopes.forEach(envelope => {
        if (envelope.name === from){
            let remaining = Number(envelope.budget) - Number(amount);
            if (remaining < 0){
                exceed = true;
            }else{
                envelope.budget = remaining;
                exist = 1;
            }
        }
    });
    if (exceed){
        res.send(`Amount exceeds the budget of ${from} envelope.`);
    }
    else if (exist === 1) {
        envelopes.forEach(envelope => {
            if (envelope.name === to){
                envelope.budget += Number(amount);
                exist = 2;
            }
        });
    }else if (exist === 2) {
        res.send(`Transfer Successful!`);
    }else{
        res.send('Invalid envelope name.');
    }
    
});

// get the list of all envelopes
envRouter.get("/", (req, res) => {
    return res.send(envelopes);
});


module.exports = envRouter;