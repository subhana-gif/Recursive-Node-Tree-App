import express from "express";
import { createNode, getTree, deleteNode } from "../controllers/NodeController.js";

const router = express.Router();
router.post("/", createNode);
router.get("/", getTree);
router.delete("/:id", deleteNode);

export default router;
