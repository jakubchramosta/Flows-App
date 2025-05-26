export enum Algorithms {
  FORD_FULKERSON = "Ford-Fulkerson",
  EDMONDS_KARP = "Edmonds-Karp",
}

export enum ButtonVariants {
  OUTLINE = "outline",
  DEFAULT = "default",
  LINK = "link",
  DESTRUCTIVE = "destructive",
  SECONDARY = "secondary",
  GHOST = "ghost",
}

export enum ButtonSizes {
  ICON = "icon",
  ROUNDED = "rounded",
  DEFAULT = "default",
}

export enum GraphTypes {
  EXAMPLE = "Základní graf",
  SIMPLE_LINEAR = "Jednoduchý lineární graf",
  MANY_PATHS = "Graf s více cestami",
  CYCLE = "Graf s cyklem",
  COMPLEX = "Složitý graf",
}

export enum EdgeTypes {
  STRAIGHT = "",
  CURVED = "curved",
}

export enum Colors {
  SOURCE = "#00ff00",
  SINK = "#ff0000",
  DEFAULT_NODE = "#0091ff",
  DEFAULT_EDGE = "#ccc",
  EDGE_LABEL = "#000",
  RED_EDGE = "red",
  GREEN_EDGE = "green",
}
