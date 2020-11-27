const express = require('express');
const router = express.Router();
const todoStates = require("../data/todoStates");
const todos = require("../data/todos");
const dbs = require("../dbs");
const authMW = require("../middleware").authMW;

router.post('/', authMW, async (req, res) => {
    let commit = false;
    try {
        await dbs.beginSQLTransaction();

        let result = await todoStates.createTodoState(req.body.name, req.user.username);
        commit = true;
        return res.send(result);
    } catch (e) {
        console.log(e);
        return res.sendStatus(500)
    } finally {
        await dbs.closeSQLConnection(commit);
    }
});

router.get('/', authMW, async (req, res) => {
    let commit = false;
    try {
        await dbs.beginSQLTransaction();

        let result = await todoStates.readTodoStates(req.user.username);
        commit = true;
        return res.send({
            states: result
        })
    } catch (e) {
        console.log(e);
        return res.sendStatus(500)
    } finally {
        await dbs.closeSQLConnection(commit);
    }
});

router.get('/by-id', authMW, async (req, res) => {
    let commit = false;
    try {
        await dbs.beginSQLTransaction();

        let result = await todoStates.readTodoStateById(req.body.id);
        commit = true;
        return res.send({
            message: result
        })
    } catch (e) {
        console.log(e);
        return res.sendStatus(500)
    } finally {
        await dbs.closeSQLConnection(commit);
    }
});

router.delete('/:id', authMW, async (req, res) => {
    if(req.params.id == 1 || req.params.id == 2) return res.sendStatus(401);
    let commit = false;
    try {
        await dbs.beginSQLTransaction();
        let result = await todos.readTodoItems(req.user.username);
        let canDelete = true;
        for(let i = 0; i < result.length; i++) {
            if(result[i].state.id == req.params.id) {
                canDelete = false;
            }
        }
        if(!canDelete) return res.sendStatus(401);

        await todoStates.deleteTodoState(req.params.id);
        commit = true;
        return res.sendStatus(200);
    } catch (e) {
        console.log(e);
        return res.sendStatus(500)
    } finally {
        await dbs.closeSQLConnection(commit);
    }
});

module.exports = {
    routes: router
}
