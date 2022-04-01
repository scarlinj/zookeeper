const router = require('express').Router();
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
} = require("../../lib/zookeepers");
const {
    zookeeper
} = require("../../data/zookeepers");

router.get("/zookeepers", (req, res) => {
    let results = zookeeper;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get("/zookeepers/:id", (req, res) => {
    const result = findById(req.params.id, zookeeper);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post("/zookeepers", (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = zookeeper.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if (!validateZookeeper(req.body)) {
        res.status(400).send("The zookeeper is not properly formatted.");
    } else {
        const zookeeper = createNewZookeeper(req.body, zookeeper);
        res.json(zookeeper);
    }
});

module.exports = router;