import { GraphNode } from '../node';

export const graphToCluster = (graph: any) => {
  let count = 0;
  const cluster = {};
  const visited = new Set();
  for (const node in graph) {
    if (explore(graph, node, visited, cluster, count) === true) count++;
  }
  return cluster;
};

const explore = (
  graph: any,
  src: any,
  visited: any,
  cluster: any,
  count: number,
) => {
  if (visited.has(String(src))) return false;
  visited.add(String(src));

  if (!(count in cluster)) cluster[count] = [];

  const node = new GraphNode({
    x: Math.floor(Math.random() * (500 - 100 + 1) + 100),
    y: Math.floor(Math.random() * (500 - 100 + 1) + 100),
    text: src,
  });
  cluster[count].push(node);

  for (const neighbor of graph[src]) {
    explore(graph, neighbor, visited, cluster, count);
  }

  return true;
};
