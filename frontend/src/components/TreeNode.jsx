import { useState } from "react";
import { createNode, deleteNode } from "../services/api";

const TreeNode = ({ node, onRefresh }) => {
  const [expanded, setExpanded] = useState(false);
  const [childName, setChildName] = useState("");

  const handleAdd = async () => {
    if (childName.trim()) {
      await createNode({ name: childName, parentId: node._id });
      setChildName("");
      onRefresh();
    }
  };

  const handleDelete = async () => {
    await deleteNode(node._id);
    onRefresh();
  };

  return (
    <div className="ml-4 mt-2 border-l border-gray-300 pl-4">
      <div className="flex items-center gap-2">
        <button onClick={() => setExpanded(!expanded)} className="text-sm">
          {expanded ? "▼" : "▶"}
        </button>
        <span className="font-medium">{node.name}</span>
        <button onClick={handleDelete} className="text-xs text-red-600">Delete</button>
      </div>

      {expanded && (
        <div className="ml-4 mt-2">
          {node.children?.map(child => (
            <TreeNode key={child._id} node={child} onRefresh={onRefresh} />
          ))}
          <div className="flex items-center mt-2 gap-2">
            <input
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="Add child"
              className="border px-2 py-1 text-sm rounded"
            />
            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white text-xs px-2 py-1 rounded"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreeNode;
