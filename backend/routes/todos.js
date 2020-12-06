const express = require('express');
const router = express.Router();
const todos = require("../data/todos");
const dbs = require("../dbs");
const authMW = require("../middleware").authMW;

router.post('/', authMW, async (req, res) => {
    
    try {
        let result = await todos.createTodoItem(req.body.description, req.body.state._id, req.body.dateDue,
          req.user.username);
        
        return res.send(result)
    } catch (e) {
        console.log(e);
        return res.sendStatus(500)
    }
});

router.get('/', authMW, async (req, res) => {
    
    try {

        let result = await todos.readTodoItems(req.user.username);
        
        return res.send({
            todos: result
        })
    } catch (e) {
        console.log(e);
        return res.sendStatus(500)
    }
});

router.get('/by-id', authMW, async (req, res) => {

    try {

        let result = await todos.readTodoItemById(req._id);
        
        return res.send({
            message: result
        })
    } catch (e) {
        console.log(e);
        return res.sendStatus(500)
    }
});

router.put('/', authMW, async (req, res) => {
    
    try {

        await todos.updateTodoItem(req.body._id, req.body.description, req.body.state._id, req.body.dateDue,
            req.user.username);
        
        return res.sendStatus(200);
    } catch (e) {
        console.log(e);
        return res.sendStatus(500)
    }
});

router.delete('/:id', authMW, async (req, res) => {
    
    try {

        await todos.deleteTodoItem(req.params.id);
        
        return res.sendStatus(200);
    } catch (e) {
        console.log(e);
        return res.sendStatus(500)
    }
});

module.exports = {
    routes: router
};
