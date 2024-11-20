import {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";
import { Canvas, Circle, ITextEvents, Line, Rect, Textbox } from "fabric";
import CSButton from "../atoms/cs-button";
import SquareIcon from "../../../assets/icons/square.svg";
import CircleIcon from "../../../assets/icons/circle.svg";
import { DeleteOutlined, FundViewOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

interface ICSFloorPlan {
  height: number;
  width: number;
}

const CSFloorPlan = forwardRef((props: ICSFloorPlan, ref) => {
  // const canvasRef = useRef<Canvas | null>(null);
  // const [imagePreview, setImagePreview] = useState<string | null>(null); // To store the image preview URL

  useImperativeHandle(ref, () => ({
    values: canvas?.getObjects().map((obj) => {
      if (obj instanceof Circle) {
        return {
          type: obj.type,
          left: obj.left,
          top: obj.top,
          radius: obj.radius,
        };
      } else if (obj instanceof Rect) {
        return {
          type: obj.type,
          left: obj.left,
          top: obj.top,
          width: obj.width,
          height: obj.height,
        };
      } else {
        // Handle other object types as needed
        return {
          type: obj.type,
          left: obj.left,
          top: obj.top,
        };
      }
    }),
  }));

  // useEffect(() => {
  //   canvasRef.current = new Canvas("canvas", {
  //     selection: true,
  //   });

  //   // Clean up the canvas on component unmount
  //   return () => {
  //     canvasRef.current?.dispose();
  //   };
  // }, []);

  // const addRectangle = () => {
  //   const rect = new Rect({
  //     left: 50,
  //     top: 50,
  //     width: 100,
  //     height: 60,
  //     fill: "#e3e3e3",
  //     stroke: "gray",
  //     strokeWidth: 1,
  //     selectable: true,
  //   });

  //   canvasRef.current?.add(rect);
  //   canvasRef.current?.setActiveObject(rect);
  // };

  // const addCircle = () => {
  //   const circle = new Circle({
  //     left: 150,
  //     top: 100,
  //     radius: 50,
  //     fill: "#e3e3e3",
  //     stroke: "gray",
  //     strokeWidth: 1,
  //     selectable: true,
  //   });
  //   canvasRef.current?.add(circle);
  //   canvasRef.current?.setActiveObject(circle);
  // };

  // const deleteShape = () => {
  //   const activeObject = canvasRef.current?.getActiveObject();
  //   if (activeObject) {
  //     canvasRef.current?.remove(activeObject);
  //   }
  // };

  // const previewImage = () => {
  //   const canvas = canvasRef.current;
  //   if (!canvas) return;

  //   // Convert the canvas to a base64 image
  //   const imageURL = canvas.toDataURL({
  //     format: "png",
  //     multiplier: 1,
  //     quality: 1,
  //   });

  //   // Set the preview image URL
  //   setImagePreview(imageURL);
  // };

  // useEffect(()=> {
  //    // Draw grid lines
  // for (let i = 0; i < canvasRef.width; i += gridSize) {
  //   canvasRef.add(new fabric.Line([i, 0, i, canvas.height || 0], {
  //     stroke: "#ddd",
  //     selectable: false,
  //     evented: false,
  //   }));
  // }

  // for (let i = 0; i < canvas.height; i += gridSize) {
  //   canvas.add(new fabric.Line([0, i, canvas.width || 0, i], {
  //     stroke: "#ddd",
  //     selectable: false,
  //     evented: false,
  //   }));
  // }

  // // Disable object selection for grid lines
  // canvas.forEachObject((obj) => {
  //   obj.selectable = false;
  //   obj.evented = false;
  // });
  // },[])

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [drawingMode, setDrawingMode] = useState<
    "rectangle" | "line" | "label" | null
  >(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Fabric.js canvas
    const fabricCanvas = new Canvas(canvasRef.current, {
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: "#f3f3f3",
    });

    // Draw grid
    const gridSize = 50;
    for (let i = 0; i < fabricCanvas.width!; i += gridSize) {
      fabricCanvas.add(
        new Line([i, 0, i, fabricCanvas.height!], {
          stroke: "#ddd",
          selectable: false,
          evented: false,
        })
      );
    }
    for (let i = 0; i < fabricCanvas.height!; i += gridSize) {
      fabricCanvas.add(
        new Line([0, i, fabricCanvas.width!, i], {
          stroke: "#ddd",
          selectable: false,
          evented: false,
        })
      );
    }

    // Enable panning and zooming
    fabricCanvas.on("mouse:down", (opt) => {
      const evt = opt.e as MouseEvent;
      if (evt.altKey) {
        fabricCanvas.isDragging = true;
        fabricCanvas.selection = false;
        fabricCanvas.lastPosX = evt.clientX;
        fabricCanvas.lastPosY = evt.clientY;
      } else if (drawingMode === "rectangle") {
        startRectangleDraw(opt);
      } else if (drawingMode === "line") {
        startLineDraw(opt);
      } else if (drawingMode === "label") {
        addLabel(opt);
      }
    });

    fabricCanvas.on("mouse:move", (opt) => {
      if (fabricCanvas?.isDragging) {
        const evt = opt.e as MouseEvent;
        const vpt = fabricCanvas.viewportTransform!;
        vpt[4] += evt.clientX - fabricCanvas?.lastPosX;
        vpt[5] += evt.clientY - fabricCanvas?.lastPosY;
        fabricCanvas.requestRenderAll();
        fabricCanvas.lastPosX = evt.clientX;
        fabricCanvas.lastPosY = evt.clientY;
      } else if (drawingMode === "rectangle") {
        continueRectangleDraw(opt);
      } else if (drawingMode === "line") {
        continueLineDraw(opt);
      }
    });

    fabricCanvas.on("mouse:up", () => {
      fabricCanvas.isDragging = false;
      fabricCanvas.selection = true;

      // Reset temporary drawing state
      if (drawingMode === "rectangle") finishRectangleDraw();
      if (drawingMode === "line") finishLineDraw();
    });

    setCanvas(fabricCanvas);

    const resizeCanvas = () => {
      fabricCanvas.setWidth(window.innerWidth);
      fabricCanvas.setHeight(window.innerHeight);
      fabricCanvas.renderAll();
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    return () => {
      fabricCanvas.dispose();
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [drawingMode]);

  // Rectangle drawing logic
  let rect: Rect | null = null;
  const startRectangleDraw = (opt: ITextEvents) => {
    const pointer = canvas!.getPointer(opt.e);
    rect = new Rect({
      left: pointer.x,
      top: pointer.y,
      width: 0,
      height: 0,
      fill: "rgba(0,0,255,0.3)",
      stroke: "#0000ff",
      strokeWidth: 2,
    });
    canvas!.add(rect);
  };

  const continueRectangleDraw = (opt: ITextEvents) => {
    if (!rect) return;
    const pointer = canvas!.getPointer(opt.e);
    rect.set({
      width: pointer.x - rect.left!,
      height: pointer.y - rect.top!,
    });
    canvas!.renderAll();
  };

  const finishRectangleDraw = () => {
    rect = null;
  };

  // Line drawing logic
  let line: Line | null = null;
  const startLineDraw = (opt: ITextEvents) => {
    const pointer = canvas!.getPointer(opt.e);
    line = new Line([pointer.x, pointer.y, pointer.x, pointer.y], {
      stroke: "black",
      strokeWidth: 2,
    });
    canvas!.add(line);
  };

  const continueLineDraw = (opt: ITextEvents) => {
    if (!line) return;
    const pointer = canvas!.getPointer(opt.e);
    line.set({ x2: pointer.x, y2: pointer.y });
    canvas!.renderAll();
  };

  const finishLineDraw = () => {
    line = null;
  };

  // Add label logic
  const addLabel = (opt: ITextEvents) => {
    const pointer = canvas!.getPointer(opt.e);
    const text = new Textbox("Label", {
      left: pointer.x,
      top: pointer.y,
      width: 150,
      fontSize: 16,
      fill: "black",
      backgroundColor: "rgba(255,255,255,0.7)",
      editable: true,
    });
    canvas!.add(text);
  };

  return (
    <div className="cs-floor-plan">
      <div className="controls">
        <Tooltip placement="right" title="Rectangle">
          <CSButton
            type="link"
            onClick={() => setDrawingMode("rectangle")}
            icon={
              <img
                src={SquareIcon}
                alt="My Icon"
                style={{ height: 15, width: 15 }}
              />
            }
          />
        </Tooltip>
        <Tooltip placement="right" title="Circle">
          <CSButton
            type="link"
            onClick={() => setDrawingMode("line")}
            icon={
              <img
                src={CircleIcon}
                alt="My Icon"
                style={{ height: 15, width: 15 }}
              />
            }
          />
        </Tooltip>
        <Tooltip placement="right" title="Delete">
          <CSButton
            type="text"
            onClick={() => setDrawingMode("label")}
            icon={<DeleteOutlined />}
          />
        </Tooltip>
        <canvas
          ref={canvasRef}
          // id="canvas"
          // width={props.width}
          // height={props.height}
          // style={{ border: "2px solid black" }}
        />
        {/* <Tooltip placement="right" title="View">
          <CSButton
            type="text"
            onClick={previewImage}
            icon={<FundViewOutlined />}
          />
        </Tooltip> */}
      </div>
      {/* {imagePreview && (
        <img src={imagePreview} draggable={false} alt="Canvas Preview" />
      )} */}
    </div>
  );
});

export default CSFloorPlan;
