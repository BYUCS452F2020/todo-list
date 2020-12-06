const express = require('express');
const router = express.Router();
const todoStates = require("../data/todoStates");
const todos = require("../data/todos");
const dbs = require("../dbs");
const authMW = require("../middleware").authMW;

router.post('/', authMW, async (req, res) => {
    
    try {

        let result = await todoStates.createTodoState(req.body.name, req.user.username);
        
        return res.send(result);
    } catch (e) {
        console.log(e);
        return res.sendStatus(500)
    }
});

router.get('/', authMW, async (req, res) => {
    
    try {

        let result = await todoStates.readTodoStates(req.user.username);
        
        return res.send({
            states: result
        })
    } catch (e) {
        console.log(e);
        return res.sendStatus(500)
    }
});

router.get('/by-id', authMW, async (req, res) => {
    
    try {

        let result = await todoStates.readTodoStateById(req.body.id);
        
        return res.send({
            message: result
        })
    } catch (e) {
        console.log(e);
        return res.sendStatus(500)
    }
});

router.delete('/:id', authMW, async (req, res) => {
    if(req.params.id == 1 || req.params.id == 2) return res.sendStatus(401);
    
    try {
        let result = await todos.readTodoItems(req.user.username);
        let canDelete = true;
        for(let i = 0; i < result.length; i++) {
            if(result[i].state.id == req.params.id) {
                canDelete = false;
            }
        }
        if(!canDelete) return res.sendStatus(401);

        await todoStates.deleteTodoState(req.params.id);
        
        return res.sendStatus(200);
    } catch (e) {
        console.log(e);
        return res.sendStatus(500)
    }
});

module.exports = {
    routes: router
}
