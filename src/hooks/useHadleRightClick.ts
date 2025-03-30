import Graph from "graphology";
import Sigma, { SigmaStageEventPayload } from "sigma/sigma";

export const useHandleRightClick = (
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
    label: `${Date.now()}`,
    ...coordForGraph,
    size: 20,
  };
  const id = `node-${Date.now()}`;
  graph.addNode(id, node);
};
