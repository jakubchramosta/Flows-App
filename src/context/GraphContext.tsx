import Graph from "graphology";
import { createContext } from "react";
import { useState } from "react";

interface IGraphContext {
  children: React.ReactNode;
}

const graph = new Graph();

export const GraphContext = createContext(graph);

const GraphProvider = ({ children }: IGraphContext) => {
  const graph = new Graph();

  return (
    <GraphContext.Provider value={graph}>{children}</GraphContext.Provider>
  );
};

export default GraphProvider;
