import Graph from "graphology";
import Sigma from "sigma";
import { SigmaStageEventPayload } from "sigma/dist/declarations/src/types";

export const useHandleClicks = () => {
  const doubleClick = (
    e: SigmaStageEventPayload,
    sigma: Sigma,
    graph: Graph,
  ) => {
    e.preventSigmaDefault();
    const coordForGraph = sigma.viewportToGraph({
      x: e.event.x,
      y: e.event.y,
    });

    //TODO: Při smazání B z A->B->C začne vyhazovat error že bod C již existuje
    const node = {
      label: String.fromCharCode(97 + graph.nodes().length).toUpperCase(),
      ...coordForGraph,
      size: 20,
    };
    const id = String.fromCharCode(97 + graph.nodes().length).toUpperCase();
    graph.addNode(id, node);
  };

  return { doubleClick };
};
