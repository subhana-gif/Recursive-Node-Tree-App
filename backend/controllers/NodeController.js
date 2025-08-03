import Node from "../models/Node.js";

// Create Node
export const createNode = async (req, res) => {
  try {
    const { name, parentId } = req.body;
    const node = new Node({ name, parentId: parentId || null });
    await node.save();
    res.status(201).json(node);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Tree
export const getTree = async (req, res) => {
  const buildTree = (nodes, parentId = null) => {
    return nodes
      .filter(n => String(n.parentId) === String(parentId))
      .map(n => ({
        ...n._doc,
        children: buildTree(nodes, n._id)
      }));
  };

  try {
    const nodes = await Node.find();
    const tree = buildTree(nodes);
    res.json(tree);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Node and Children
export const deleteNode = async (req, res) => {
  try {
    const deleteRecursive = async (id) => {
      const children = await Node.find({ parentId: id });
      for (const child of children) {
        await deleteRecursive(child._id);
      }
      await Node.findByIdAndDelete(id);
    };

    await deleteRecursive(req.params.id);
    res.json({ message: "Deleted recursively" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
