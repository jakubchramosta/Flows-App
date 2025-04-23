import { GraphInfo } from "../context/GraphContext";

export const useFordFulkerson = ({ graph, source, sink, paths }: GraphInfo) => {
  let maxFlow = 0;

  // Helper function to perform DFS and find an augmenting path
  function dfs(
    current: string,
    sink: string,
    visited: Set<string>,
  ): string[] | null {
    if (current === sink) {
      return [current];
    }

    visited.add(current);

    for (const neighbor of graph.outNeighbors(current)) {
      if (!visited.has(neighbor)) {
        const edge = graph.edge(current, neighbor);
        const { capacity, flow } = graph.getEdgeAttributes(edge);

        if (capacity - flow > 0) {
          const subPath = dfs(neighbor, sink, visited);
          if (subPath) {
            subPath.unshift(current);
            return subPath;
          }
        }
      }
    }

    return null;
  }

  let path: string[] | null;

  // Main loop to find augmenting paths and update the flow
  while ((path = dfs(source, sink, new Set())) !== null) {
    // Find the minimum residual capacity (bottleneck) along the path
    let pathFlow = Infinity;
    for (let i = 0; i < path.length - 1; i++) {
      const u = path[i];
      const v = path[i + 1];
      const edge = graph.edge(u, v);
      const { capacity, flow } = graph.getEdgeAttributes(edge);
      pathFlow = Math.min(pathFlow, capacity - flow);
    }

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

    // Add the path flow to the total maximum flow
    maxFlow += pathFlow;

    // Push the valid path and its flow into the paths array
    paths.push({ path, flow: pathFlow });

    // Debugging logs
    console.log(`Path: ${path.join(" -> ")}, Flow: ${pathFlow}`);
  }

  // Debugging logs
  console.log("Final Graph:", graph);
  console.log("All Paths:", paths);

  return maxFlow;
};
