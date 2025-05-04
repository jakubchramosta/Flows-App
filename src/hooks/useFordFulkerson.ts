import {
  highlightCurrentPath,
  resetEdgeColors,
  updateEdgeLabels,
} from "../lib/graphEdgeOperations";
import { GraphInfo } from "../context/GraphContext";

// Funkce pro výpočet maximálního toku pomocí Ford-Fulkerson algoritmu
export const useFordFulkerson = ({
  graph,
  source,
  sink,
  paths,
  snapshots,
}: GraphInfo) => {
  // Proměnná pro uchování maximálního toku
  let maxFlow = 0;
  // Proměnná pro uchování aktuální cesty
  let path: string[] | null;

  // Pomocná funkce pro provedení DFS a nalezení augmentační cesty
  function dfs(
    current: string,
    sink: string,
    visited: Set<string>,
  ): string[] | null {
    // Pokud jsme dosáhli cílového uzlu, vrátíme cestu
    if (current === sink) {
      return [current];
    }

    // Označení uzlu jako navštíveného
    visited.add(current);

    // Procházení sousedů aktuálního uzlu
    for (const neighbor of graph.outNeighbors(current)) {
      if (!visited.has(neighbor)) {
        // Získání hrany
        const edge = graph.edge(current, neighbor);
        // Získání atributů hrany
        const { capacity, flow } = graph.getEdgeAttributes(edge);

        // Pokud má hrana zbývající kapacitu, pokračujeme v DFS
        if (capacity - flow > 0) {
          const subPath = dfs(neighbor, sink, visited);
          if (subPath) {
            // Přidání aktuálního uzlu do cesty
            subPath.unshift(current);
            return subPath;
          }
        }
      }
    }

    // Pokud neexistuje augmentační cesta, vrátíme null
    return null;
  }

  // Hlavní smyčka pro nalezení augmentačních cest a aktualizaci toku
  while ((path = dfs(source, sink, new Set())) !== null) {
    // Nalezení minimální reziduální kapacity (bottleneck) podél cesty
    let pathFlow = Infinity;
    for (let i = 0; i < path.length - 1; i++) {
      const u = path[i];
      const v = path[i + 1];
      const edge = graph.edge(u, v);
      const { capacity, flow } = graph.getEdgeAttributes(edge);
      // Výpočet bottleneck kapacity
      pathFlow = Math.min(pathFlow, capacity - flow);
    }

    // Aktualizace reziduálních kapacit hran a zpětných hran
    for (let i = 0; i < path.length - 1; i++) {
      const u = path[i];
      const v = path[i + 1];
      const edge = graph.edge(u, v);
      const reverseEdge = graph.edge(v, u);

      // Aktualizace toku na přímé hraně
      const attrs = graph.getEdgeAttributes(edge);
      graph.setEdgeAttribute(edge, "flow", attrs.flow + pathFlow);

      // Aktualizace toku na zpětné hraně
      if (reverseEdge) {
        const reverseAttrs = graph.getEdgeAttributes(reverseEdge);
        graph.setEdgeAttribute(
          reverseEdge,
          "flow",
          reverseAttrs.flow - pathFlow,
        );
      } else {
        // Pokud zpětná hrana neexistuje, vytvoříme ji
        graph.addEdge(v, u, {
          flow: -pathFlow,
          capacity: 0,
          isReverse: true,
          hidden: true,
        });
      }
    }

    // Přidání aktuálního toku do celkového maximálního toku
    maxFlow += pathFlow;

    // Uložení nalezené cesty a jejího toku do pole paths
    paths.push({ path, flow: pathFlow });

    // Zvýraznění aktuální cesty
    highlightCurrentPath(graph, path);

    // Aktualizace popisků hran
    updateEdgeLabels(graph);

    // Uložení aktuálního stavu grafu do snapshots
    snapshots.push(graph.copy());

    // Resetování barev hran pro další iteraci
    resetEdgeColors(graph);

    // Ladící výpisy
    console.log(`Path: ${path.join(" -> ")}, Flow: ${pathFlow}`);
  }

  // Ladící výpisy
  console.log("Final Graph:", graph);
  console.log("All Paths:", paths);
  console.log("All snapshots:", snapshots);

  // Vrácení maximálního toku
  return maxFlow;
};
