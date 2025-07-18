import {
  highlightCurrentPath,
  resetEdgeColors,
  updateEdgeLabels,
} from "../lib/graphEdgeOperations";
import { GraphInfo } from "../context/GraphManagementContext";

// Funkce pro výpočet maximálního toku pomocí Edmonds-Karp algoritmu
export const useEdmondsKarp = (
  { graph, source, sink, paths, snapshots }: GraphInfo,
  editMode: boolean,
) => {
  // Proměnná pro uchování maximálního toku
  let maxFlow = 0;

  // Pomocná funkce pro provedení BFS a nalezení augmentační cesty
  function bfs(): string[] | null {
    // Množina navštívených uzlů
    const visited = new Set<string>();
    // Fronta pro BFS - nyní obsahuje pouze node a path
    const queue: { node: string; path: string[] }[] = [
      { node: source, path: [source] },
    ];

    while (queue.length > 0) {
      const { node, path } = queue.shift()!; // Odebrání prvku z fronty

      // Pokud jsme dosáhli cílového uzlu, vrátíme cestu
      if (node === sink) {
        return path;
      }

      // Označení uzlu jako navštíveného
      visited.add(node);

      // Procházení sousedů aktuálního uzlu
      for (const neighbor of graph.outNeighbors(node).sort()) {
        if (!visited.has(neighbor)) {
          // Získání hrany
          const edge = graph.edge(node, neighbor);
          // Získání atributů hrany
          const { capacity, flow } = graph.getEdgeAttributes(edge);

          // Pokud má hrana zbývající kapacitu, přidáme ji do fronty
          if (capacity - flow > 0) {
            queue.push({
              node: neighbor,
              path: [...path, neighbor],
            });
          }
        }
      }
    }

    // Pokud neexistuje augmentační cesta, vrátíme null
    return null;
  }

  // Pomocná funkce pro výpočet minimálního toku cesty
  function calculatePathFlow(path: string[]): number {
    let pathFlow = Infinity;

    for (let i = 0; i < path.length - 1; i++) {
      const u = path[i];
      const v = path[i + 1];
      const edge = graph.edge(u, v);
      const { capacity, flow } = graph.getEdgeAttributes(edge);
      const availableCapacity = capacity - flow;

      pathFlow = Math.min(pathFlow, availableCapacity);
    }

    return pathFlow;
  }

  // Hlavní smyčka pro nalezení augmentačních cest a aktualizaci toku
  let path: string[] | null;
  while ((path = bfs()) !== null) {
    const pathFlow = calculatePathFlow(path);

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

    // Přidání toku do celkového maximálního toku
    maxFlow += pathFlow;

    if (editMode) {
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
  }

  // Vrácení maximálního toku
  return maxFlow;
};
