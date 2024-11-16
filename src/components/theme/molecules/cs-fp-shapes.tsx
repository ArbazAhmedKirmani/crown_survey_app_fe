import Konva from "konva";
import { CircleConfig } from "konva/lib/shapes/Circle";
import { RectConfig } from "konva/lib/shapes/Rect";
import { forwardRef, LegacyRef } from "react";
import { Circle, Rect } from "react-konva";

export interface IRectangle extends RectConfig {
  width: number;
  height: number;
  fill?: string;
  shadowBlur?: number;
}
export interface ICircle extends CircleConfig {
  radius: number;
  fill?: string;
}

const CSFPShapes = () => {
  return <div></div>;
};

CSFPShapes.Rectangle = forwardRef<Konva.Rect, IRectangle>((props, ref) => {
  const {
    x = 50,
    y = 50,
    height = 100,
    width = 100,
    fill = "grey",
    shadowBlur = 0,
    ...rest
  } = props;
  return (
    <Rect
      ref={ref}
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      shadowBlur={shadowBlur}
      draggable
      {...rest}
    />
  );
});

CSFPShapes.Circle = forwardRef(
  (props: Konva.Circle, ref: LegacyRef<Konva.Circle> | undefined) => {
    const { x = 50, y = 50, fill = "grey", radius = 50 } = props;
    return (
      <Circle
        ref={ref}
        x={x as number}
        y={y as number}
        radius={radius as number}
        fill={fill as string}
        draggable
      />
    );
  }
);

export default CSFPShapes;
