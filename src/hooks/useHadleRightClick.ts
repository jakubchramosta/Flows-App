import Graph from "graphology";
import Sigma, { SigmaStageEventPayload } from "sigma/sigma";

export const useHandleRightClick = () => {
  const rigthClick = (
    e: SigmaStageEventPayload,
    sigma: Sigma,
    graph: Graph,
  ) => {
    e.preventSigmaDefault();
    const coordForGraph = sigma.viewportToGraph({
      x: e.event.x,
      y: e.event.y,
    });

    const node = {
      label: String.fromCharCode(97 + graph.nodes().length).toUpperCase(),
      ...coordForGraph,
      size: 20,
    };
    const id = `node-${String.fromCharCode(97 + graph.nodes().length).toUpperCase()}`;
    graph.addNode(id, node);
  };

  return { rigthClick };
};
