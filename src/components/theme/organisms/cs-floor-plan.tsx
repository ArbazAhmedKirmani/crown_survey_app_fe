import {
  useRef,
  useState,
  useEffect,
  MouseEvent,
  useImperativeHandle,
  forwardRef,
} from "react";
import CSButton from "../atoms/cs-button";
import Square from "../../../assets/icons/square.svg";
import Circle from "../../../assets/icons/circle.svg";
import { DeleteOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

interface Shape {
  type: "rectangle" | "circle";
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  isResizing?: boolean;
  index?: number;
}

interface ICSFloorPlan {
  height: number;
  width: number;
}

const CSFloorPlan = forwardRef((props: ICSFloorPlan, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [selectedShapeIndex, setSelectedShapeIndex] = useState<number | null>(
    null
  );
  const [draggingShape, setDraggingShape] = useState<Shape | null>(null);
  const [resizeShape, setResizeShape] = useState<Shape | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useImperativeHandle(ref, () => ({
    values: shapes,
  }));

  useEffect(() => {
    drawShapes();
  }, [shapes]);

  const addRectangle = () => {
    setShapes([
      ...shapes,
      {
        type: "rectangle",
        x: 50,
        y: 50,
        width: 100,
        height: 60,
      },
    ]);
  };

  const addCircle = () => {
    setShapes([
      ...shapes,
      {
        type: "circle",
        x: 150,
        y: 100,
        radius: 50,
      },
    ]);
  };

  const deleteShape = () => {
    if (selectedShapeIndex !== null) {
      const updatedShapes = shapes.filter(
        (_, index) => index !== selectedShapeIndex
      );
      setShapes(updatedShapes);
      setSelectedShapeIndex(null);
    }
  };

  const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    let selectedShape: Shape | null = null;

    shapes.forEach((shape, index) => {
      if (shape.type === "rectangle" && shape.width && shape.height) {
        const resizeAreaSize = 20;
        if (
          mouseX > shape.x + shape.width - resizeAreaSize &&
          mouseX < shape.x + shape.width &&
          mouseY > shape.y + shape.height - resizeAreaSize &&
          mouseY < shape.y + shape.height
        ) {
          selectedShape = { ...shape, isResizing: true, index };
          setResizeShape(selectedShape);
          setOffset({ x: mouseX, y: mouseY });
        } else if (
          mouseX > shape.x &&
          mouseX < shape.x + shape.width &&
          mouseY > shape.y &&
          mouseY < shape.y + shape.height
        ) {
          selectedShape = { ...shape, index };
          setDraggingShape(selectedShape);
          setSelectedShapeIndex(index);
          setOffset({ x: mouseX - shape.x, y: mouseY - shape.y });
        }
      } else if (shape.type === "circle" && shape.radius) {
        const dx = mouseX - shape.x;
        const dy = mouseY - shape.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < shape.radius + 5 && distance > shape.radius - 5) {
          selectedShape = { ...shape, isResizing: true, index };
          setResizeShape(selectedShape);
          setOffset({ x: dx, y: dy });
        } else if (distance < shape.radius) {
          selectedShape = { ...shape, index };
          setDraggingShape(selectedShape);
          setSelectedShapeIndex(index);
          setOffset({ x: dx, y: dy });
        }
      }
    });
  };

  const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (draggingShape) {
      const updatedShapes = shapes.map((shape, index) => {
        if (index === draggingShape.index) {
          return {
            ...shape,
            x: mouseX - offset.x,
            y: mouseY - offset.y,
          };
        }
        return shape;
      });
      setShapes(updatedShapes);
    } else if (resizeShape) {
      const updatedShapes = shapes.map((shape, index) => {
        if (
          index === resizeShape.index &&
          shape.type === "rectangle" &&
          shape.width &&
          shape.height
        ) {
          return {
            ...shape,
            width: mouseX - shape.x,
            height: mouseY - shape.y,
          };
        } else if (index === resizeShape.index && shape.type === "circle") {
          const newRadius = Math.sqrt(
            (mouseX - shape.x) ** 2 + (mouseY - shape.y) ** 2
          );
          return {
            ...shape,
            radius: newRadius,
          };
        }
        return shape;
      });
      setShapes(updatedShapes);
    }
  };

  const handleMouseUp = () => {
    setDraggingShape(null);
    setResizeShape(null);
  };

  const drawShapes = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    shapes.forEach((shape) => {
      ctx.beginPath();
      ctx.fillStyle = "#e3e3e3"; // Light gray fill color
      ctx.strokeStyle = "gray"; // Black border color
      ctx.lineWidth = 3;

      if (shape.type === "rectangle" && shape.width && shape.height) {
        ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
        ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        ctx.fillStyle = "black";
        ctx.fillText(
          `${shape.width.toFixed(0)}x${shape.height.toFixed(0)}`,
          shape.x + shape.width / 4,
          shape.y + shape.height / 2
        );
      } else if (shape.type === "circle" && shape.radius) {
        ctx.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "black";
        ctx.fillText(
          `r:${shape.radius.toFixed(0)}`,
          shape.x - shape.radius / 4,
          shape.y + 5
        );
      }
    });
  };

  return (
    <div className="cs-floor-plan">
      <canvas
        ref={canvasRef}
        width={props.width}
        height={props.height}
        style={{ border: "2px solid black" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <div className="controls">
        <Tooltip placement="right" title="Rectangle">
          <CSButton
            type="link"
            onClick={addRectangle}
            icon={
              <img
                src={Square}
                alt="My Icon"
                style={{ height: 15, width: 15 }}
              />
            }
          >
            {/* Add Rectangle */}
          </CSButton>
        </Tooltip>
        <Tooltip placement="right" title="Circle">
          <CSButton
            type="link"
            onClick={addCircle}
            icon={
              <img
                src={Circle}
                alt="My Icon"
                style={{ height: 15, width: 15 }}
              />
            }
          >
            {/* Add Circle */}
          </CSButton>
        </Tooltip>
        <Tooltip placement="right" title="Delete">
          <CSButton
            type="text"
            onClick={deleteShape}
            disabled={selectedShapeIndex === null}
            icon={<DeleteOutlined />}
          >
            {/* Delete Shape */}
          </CSButton>
        </Tooltip>
      </div>
    </div>
  );
});

export default CSFloorPlan;
