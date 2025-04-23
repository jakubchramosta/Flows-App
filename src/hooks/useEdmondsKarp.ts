import { GraphInfo } from "../context/GraphContext";

export const useEdmondsKarp = ({ graph, source, sink, paths }: GraphInfo) => {
  let maxFlow = 0;

  // Helper function to perform BFS and find an augmenting path
  function bfs(): { path: string[]; pathFlow: number } | null {
    const visited = new Set<string>();
    const queue: { node: string; path: string[]; pathFlow: number }[] = [
      { node: source, path: [source], pathFlow: Infinity },
    ];

    while (queue.length > 0) {
      const { node, path, pathFlow } = queue.shift()!;

      if (node === sink) {
        return { path, pathFlow };
      }

      visited.add(node);

      for (const neighbor of graph.outNeighbors(node)) {
        if (!visited.has(neighbor)) {
          const edge = graph.edge(node, neighbor);
          const { capacity, flow } = graph.getEdgeAttributes(edge);

          if (capacity - flow > 0) {
            const newPathFlow = Math.min(pathFlow, capacity - flow);
            queue.push({
              node: neighbor,
              path: [...path, neighbor],
              pathFlow: newPathFlow,
            });
          }
        }
      }
    }

    return null;
  }

  // Main loop to find augmenting paths and update the flow
  let result;
  while ((result = bfs()) !== null) {
    const { path, pathFlow } = result;

    // Update the residual capacities of the edges and reverse edges
    for (let i = 0; i < path.length - 1; i++) {
      const u = path[i];
      const v = path[i + 1];
      const edge = graph.edge(u, v);
      const reverseEdge = graph.edge(v, u);

      // Update forward edge
      const attrs = graph.getEdgeAttributes(edge);
      graph.setEdgeAttribute(edge, "flow", attrs.flow + pathFlow);
      graph.setEdgeAttribute(edge, "label", `${attrs.flow}/${attrs.capacity}`);

      // Update reverse edge
      if (reverseEdge) {
        const reverseAttrs = graph.getEdgeAttributes(reverseEdge);
        graph.setEdgeAttribute(
          reverseEdge,
          "flow",
          reverseAttrs.flow - pathFlow,
        );
      } else {
        graph.addEdge(v, u, {
          flow: -pathFlow,
          capacity: 0,
          isReverse: true,
          hidden: true,
        });
      }
    }

    maxFlow += pathFlow;

    // Push the valid path and its flow into the paths array
    paths.push({ path, flow: pathFlow });

    // Debugging logs
    console.log(`Path: ${path.join(" -> ")}, Flow: ${pathFlow}`);
  }

  // Debugging logs
  console.log(graph);
  console.log(paths);

  return maxFlow;
};
