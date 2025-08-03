import { useEffect, useState } from "react";
import { fetchTree, createNode } from "./services/api";
import TreeNode from "./components/TreeNode";

function App() {
  const [tree, setTree] = useState([]);
  const [rootName, setRootName] = useState("");

  const getTree = async () => {
    const res = await fetchTree();
    setTree(res.data);
  };

  const addRootNode = async () => {
    if (rootName.trim()) {
      await createNode({ name: rootName });
      setRootName("");
      getTree();
    }
  };

  useEffect(() => {
    getTree();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">🌳 Recursive Node Tree</h1>

      <div className="flex gap-2 mb-6">
        <input
          value={rootName}
          onChange={(e) => setRootName(e.target.value)}
          placeholder="Add root node"
          className="border px-3 py-2 rounded"
        />
        <button
          onClick={addRootNode}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Root
        </button>
      </div>

      {tree.map((node) => (
        <TreeNode key={node._id} node={node} onRefresh={getTree} />
      ))}
    </div>
  );
}

export default App;
