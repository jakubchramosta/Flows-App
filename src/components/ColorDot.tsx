interface ColorDotProps {
  color: string;
  size?: number;
}

export const ColorDot = ({ color, size = 12 }: ColorDotProps) => {
  return (
    <div
      className="border rounded-full border-muted"
      style={{
        backgroundColor: color,
        width: size,
        height: size,
      }}
      title={color}
    />
  );
};
