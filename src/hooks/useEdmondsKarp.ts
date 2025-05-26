import {
  highlightCurrentPath,
  resetEdgeColors,
  updateEdgeLabels,
} from "../lib/graphEdgeOperations";
import { GraphInfo } from "../context/GraphContext";

// Funkce pro výpočet maximálního toku pomocí Edmonds-Karp algoritmu
export const useEdmondsKarp = ({
  graph,
  source,
  sink,
  paths,
  snapshots,
}: GraphInfo) => {
  // Proměnná pro uchování maximálního toku
  let maxFlow = 0;

  // Pomocná funkce pro provedení BFS a nalezení augmentační cesty
  function bfs(): { path: string[]; pathFlow: number } | null {
    // Množina navštívených uzlů
    const visited = new Set<string>();
    // Fronta pro BFS
    const queue: { node: string; path: string[]; pathFlow: number }[] = [
      { node: source, path: [source], pathFlow: Infinity },
    ];

    while (queue.length > 0) {
      const { node, path, pathFlow } = queue.shift()!; // Odebrání prvku z fronty

      // Pokud jsme dosáhli cílového uzlu, vrátíme cestu a její průtok
      if (node === sink) {
        return { path, pathFlow };
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
            // Výpočet minimálního toku
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

    // Pokud neexistuje augmentační cesta, vrátíme null
    return null;
  }

  // Hlavní smyčka pro nalezení augmentačních cest a aktualizaci toku
  let result;
  while ((result = bfs()) !== null) {
    const { path, pathFlow } = result;

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
  console.log(graph);
  console.log(paths);

  // Vrácení maximálního toku
  return maxFlow;
};
