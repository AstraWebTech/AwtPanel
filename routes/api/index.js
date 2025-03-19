const express = require("express");
const router = express.Router();

const getElementTables = require("./tables/getElementTables");
const getListTables = require("./tables/getListTables");
const createElementTables = require("./tables/createElementTables");
const putElementTables = require("./tables/putElementTables");
const deleteElementTables = require("./tables/deleteElementTables");

const dump = require("./dump");

router.use("/element", getElementTables);
router.use("/element", createElementTables);
router.use("/element", putElementTables);
router.use("/element", deleteElementTables);
router.use("/list", getListTables);

router.use("/get-bd-dump", dump);

module.exports = router;
