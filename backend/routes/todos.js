const express = require('express');
const router = express.Router();
const todos = require("../data/todos");
const dbs = require("../dbs");
const authMW = require("../middleware").authMW;

router.post('/', authMW, async (req, res) => {
    let commit = false;
    try {
        await dbs.beginSQLTransaction();

        let result = await todos.createTodoItem(req.body.description, req.body.state.id, req.body.dateDue,
          req.user.username);
        commit = true;
        return res.send(result)
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

        let result = await todos.readTodoItems(req.user.username);
        commit = true;
        return res.send({
            todos: result
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

        let result = await todos.readTodoItemById(req.id);
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

router.put('/', authMW, async (req, res) => {
    let commit = false;
    try {
        await dbs.beginSQLTransaction();

        await todos.updateTodoItem(req.body.id, req.body.description, req.body.state.id, req.body.dateDue);
        commit = true;
        return res.sendStatus(200);
    } catch (e) {
        console.log(e);
        return res.sendStatus(500)
    } finally {
        await dbs.closeSQLConnection(commit);
    }
});

router.delete('/', authMW, async (req, res) => {
    let commit = false;
    try {
        await dbs.beginSQLTransaction();

        let result = await todos.deleteTodoItem(req.id);
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

module.exports = {
    routes: router
};
