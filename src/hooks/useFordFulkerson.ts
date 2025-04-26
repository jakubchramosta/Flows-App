import { GraphInfo } from "../context/GraphContext";

// Funkce pro výpočet maximálního toku pomocí Ford-Fulkerson algoritmu
export const useFordFulkerson = ({
  graph,
  source,
  sink,
  paths,
  snapshots,
}: GraphInfo) => {
  let maxFlow = 0; // Proměnná pro uchování maximálního toku
  let path: string[] | null; // Proměnná pro uchování aktuální cesty

  ////////////////////////////////////////////////////////////////////////////////////////
  //Asi bude dobré tohle hodit do solo souboru, aby to bylo přehlednější a pak to importovat
  // Funkce pro zvýraznění aktuální cesty v grafu
  const highlightCurrentPath = () => {
    if (!path) return; // Pokud není cesta, nic nedělej
    for (let i = 0; i < path.length - 1; i++) {
      const u = path[i];
      const v = path[i + 1];
      const edge = graph.edge(u, v);
      const reverseEdge = graph.edge(v, u);

      graph.setEdgeAttribute(edge, "color", "#0f0"); // Forward edge: green
      if (reverseEdge) {
        graph.setEdgeAttribute(reverseEdge, "color", "#f00"); // Backward edge: red
      }
    }
  };

  // Funkce pro resetování barev hran v grafu
  const resetEdgeColors = () => {
    graph.forEachEdge((edge) => {
      graph.setEdgeAttribute(edge, "color", "#ccc"); // Reset all edges to black
    });
  };

  // Funkce pro aktualizaci popisků hran v grafu
  const updateEdgeLabels = () => {
    graph.forEachEdge((edge) => {
      const flow = graph.getEdgeAttribute(edge, "flow");
      const capacity = graph.getEdgeAttribute(edge, "capacity");
      graph.setEdgeAttribute(edge, "label", `${flow}/${capacity}`);
    });
  };
  ////////////////////////////////////////////////////////////////////////////////////////

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

    visited.add(current); // Označení uzlu jako navštíveného

    // Procházení sousedů aktuálního uzlu
    for (const neighbor of graph.outNeighbors(current)) {
      if (!visited.has(neighbor)) {
        const edge = graph.edge(current, neighbor); // Získání hrany
        const { capacity, flow } = graph.getEdgeAttributes(edge); // Získání atributů hrany

        // Pokud má hrana zbývající kapacitu, pokračujeme v DFS
        if (capacity - flow > 0) {
          const subPath = dfs(neighbor, sink, visited);
          if (subPath) {
            subPath.unshift(current); // Přidání aktuálního uzlu do cesty
            return subPath;
          }
        }
      }
    }

    return null; // Pokud neexistuje augmentační cesta, vrátíme null
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
      pathFlow = Math.min(pathFlow, capacity - flow); // Výpočet bottleneck kapacity
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

    highlightCurrentPath(); // Zvýraznění aktuální cesty

    updateEdgeLabels(); // Aktualizace popisků hran

    snapshots.push(graph.copy()); // Uložení aktuálního stavu grafu do snapshots

    resetEdgeColors(); // Resetování barev hran pro další iteraci

    // Ladící výpisy
    console.log(`Path: ${path.join(" -> ")}, Flow: ${pathFlow}`);
  }

  // Ladící výpisy
  console.log("Final Graph:", graph);
  console.log("All Paths:", paths);
  console.log("All snapshots:", snapshots);

  return maxFlow; // Vrácení maximálního toku
};
