export const useEdmondsKarp = (graph: any, source: string, sink: string) => {
  const bfs = (graph: any, source: string, sink: string) => {
    const queue = [source];
    const visited = new Set([source]);
    const parent: { [key: string]: string | null } = { [source]: null };

    while (queue.length > 0) {
      const currentNode = queue.shift();
      if (currentNode === undefined) {
        continue;
      }
      if (currentNode === sink) {
        break;
      }

      for (const neighbor of graph.neighbors(currentNode)) {
        if (
          !visited.has(neighbor) &&
          graph.getEdgeAttribute(currentNode, neighbor, "capacity") > 0
        ) {
          visited.add(neighbor);
          parent[neighbor] = currentNode;
          queue.push(neighbor);
        }
      }
    }

    return parent[sink] !== null ? parent : null;
  };

  const edmondsKarp = () => {
    let maxFlow = 0;

    while (true) {
      const parent = bfs(graph, source, sink);
      if (!parent) break;

      let pathFlow = Infinity;
      let s = sink;

      while (s !== source) {
        const p = parent[s]!;
        pathFlow = Math.min(pathFlow, graph.getEdgeAttribute(p, s, "capacity"));
        s = p;
      }

      s = sink;
      while (s !== source) {
        const p = parent[s]!;
        graph.setEdgeAttribute(
          p,
          s,
          "capacity",
          graph.getEdgeAttribute(p, s, "capacity") - pathFlow,
        );
        graph.setEdgeAttribute(
          s,
          p,
          "capacity",
          graph.getEdgeAttribute(s, p, "capacity") + pathFlow,
        );
        s = p;
      }

      maxFlow += pathFlow;
    }

    return maxFlow;
  };

  return edmondsKarp();
};
