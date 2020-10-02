const express = require('express');
const router = express.Router();
const todoStates = require("../data/todoStates");
const dbs = require("../dbs");
import { authMW } from "../middleware";

router.post('/', authMW, async (req, res) => {
    let commit = false;
    try {
        await dbs.beginSQLTransaction();

        let result = await todoStates.createTodoState(req.name, req.ownerUsername);
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

router.get('/', authMW, async (req, res) => {
    let commit = false;
    try {
        await dbs.beginSQLTransaction();

        let result = await todoStates.readTodoStates(req.ownerUsername);
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

router.get('/by-id', authMW, async (req, res) => {
    let commit = false;
    try {
        await dbs.beginSQLTransaction();

        let result = await todoStates.readTodoStateById(req.id);
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

router.delete('/', authMW, async (req, res) => {
    let commit = false;
    try {
        await dbs.beginSQLTransaction();

        let result = await todoStates.deleteTodoState(req.id);
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
}