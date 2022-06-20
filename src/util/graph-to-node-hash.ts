import { GraphNode } from '../node';

export const graphToNodeHash = (graph: any) => {
  const nodeHash = {};
  for (const key in graph) {
    const node = new GraphNode({
      x: Math.floor(Math.random() * (500 - 100 + 1) + 100),
      y: Math.floor(Math.random() * (500 - 100 + 1) + 100),
      text: key,
    });
    nodeHash[key] = node;
  }
  return nodeHash;
};
