import Graph from "graphology";
import { GraphInfo } from "../context/GraphContext";

export const useEdmondsKarp = ({ graph, source, sink, paths }: GraphInfo) => {
  const bfs = (
    graph: Graph,
    source: string,
    sink: string,
    parent: { [key: string]: string | null },
  ) => {
    const visited = new Set<string>();
    const queue: string[] = [source];
    visited.add(source);
    parent[source] = null;

    while (queue.length > 0) {
      const u = queue.shift()!;
      const neighbors = graph.neighbors(u);

      for (const v of neighbors) {
        const capacity = graph.getEdgeAttribute(u, v, "capacity");
        if (!visited.has(v) && capacity > 0) {
          queue.push(v);
          parent[v] = u;
          visited.add(v);
        }
      }
    }
    return visited.has(sink);
  };

  const edmondsKarp = () => {
    const parent: { [key: string]: string | null } = {};
    let maxFlow = 0;

    while (bfs(graph, source, sink, parent)) {
      let pathFlow = Infinity;
      let v = sink;

      while (v !== source) {
        const u = parent[v]!;
        const capacity = graph.getEdgeAttribute(u, v, "capacity");
        pathFlow = Math.min(pathFlow, capacity);
        v = u;
      }

      v = sink;
      while (v !== source) {
        const u = parent[v]!;
        const currentCapacity = graph.getEdgeAttribute(u, v, "capacity");
        const reverseCapacity = graph.getEdgeAttribute(v, u, "capacity") || 0;

        graph.setEdgeAttribute(u, v, "capacity", currentCapacity - pathFlow);
        graph.setEdgeAttribute(v, u, "capacity", reverseCapacity + pathFlow);
        v = u;
      }

      maxFlow += pathFlow;

      // Record the path
      const path: string[] = [];
      v = sink;
      while (v !== source) {
        path.unshift(v);
        v = parent[v]!;
      }
      path.unshift(source);
      paths.push({ path, flow: pathFlow });
    }

    return maxFlow;
  };

  return { edmondsKarp };
};
