import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { Modal } from "antd";
import CSInput from "../atoms/cs-input";
import CSButton from "../atoms/cs-button";

import Room from '../../../assets/images/room.png'
import Wall from '../../../assets/images/wall.png'
import { pixelToMeterConverter } from "../../../utils/helper/general.helper";
import { EditOutlined } from "@ant-design/icons";

const defaultDimention = {
  width: 0,
  height: 0,
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
  text: ''
}
const CSCanvas: React.FC = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const [showEditor, setShowEditore] = useState<{ state: boolean, type: 'rect' | 'line' | 'text' | undefined }>();
  const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(null);
  const [dimensions, setDimensions] = useState<typeof defaultDimention>(defaultDimention);

  const handleEditor = (type?: 'rect' | 'line' | 'text' | undefined) => {
    setShowEditore(prev => {
      if (!prev?.state) {
        setDimensions(defaultDimention)
      }
      return { state: !prev?.state, type }
    })
  }

  useEffect(() => {
    // Initialize canvas
    const canvas = new fabric.Canvas("drawCanvas", {
      width: 1850,
      height: 1200,
      selection: true, // Enable selection
    });

    // Add grid for background (optional)
    const gridSize = 20;
    for (let i = 0; i < 1850 / gridSize; i++) {
      canvas.add(
        new fabric.Line([i * gridSize, 0, i * gridSize, 1200], {
          stroke: "lightgray",
          selectable: false, // grid should not be selectable
        })
      );
      canvas.add(
        new fabric.Line([0, i * gridSize, 1850, i * gridSize], {
          stroke: "lightgray",
          selectable: false, // grid should not be selectable
        })
      );
    }

    // Log to confirm canvas initialization
    console.log("Canvas initialized");

    // Event listener for object selection
    canvas.on("selection:created", (event) => {

      // if (event.selected.length === 1 && event.selected[0] instanceof (fabric.Line || fabric.Rect)) {
      //   const target = event.selected[0];

      //   setSelectedObject(target);

      //   if (target instanceof fabric.Rect) {
      //     setDimensions({
      //       width: target.width! * target.scaleX!,
      //       height: target.height! * target.scaleY!,
      //       x1: 0,
      //       y1: 0,
      //       x2: 0,
      //       y2: 0,
      //     });
      //   } else if (target instanceof fabric.Line) {
      //     setDimensions({
      //       width: 0,
      //       height: 0,
      //       x1: target.x1 || 0,
      //       y1: target.y1 || 0,
      //       x2: target.x2 || 0,
      //       y2: target.y2 || 0,
      //     });
      //   }
      //   handle_editor()
      // }
    });


    // Event listener for clearing selection
    canvas.on("selection:cleared", () => {
      console.log("Selection cleared");
      setSelectedObject(null);
      setDimensions(defaultDimention);
    });

    canvas.on('drag:enter', () => {
      handleEditor()
    })

    // Store the canvas reference
    canvasRef.current = canvas;

    // Clean up on component unmount
    return () => {
      canvas.dispose();
    };
  }, []);

  // Add Rectangle to the canvas
  const addRectangle = (width: number, length: number) => {
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      width: pixelToMeterConverter(width),
      height: pixelToMeterConverter(length),
      fill: "transparent",
      stroke: "gray",
      strokeWidth: 2,
      selectable: true, // Ensure it's selectable
    });
    const label = new fabric.Text(`${length} x ${width}`, {
      left: (rect.left + (rect.width / 2)) - 25,
      top: (rect.top + (rect.height / 2)) - 10, // Position the label above the rectangle
      fontSize: 14,
      selectable: true,
    });

    const group = new fabric.Group([rect, label], {
      left: 0,
      top: 0,
    });
    canvasRef.current?.add(group);
    canvasRef.current?.renderAll(); // Re-render the canvas
    console.log("Rectangle added:", rect);
  };

  // Add Line to the canvas
  const addLine = (length: number) => {
    const line = new fabric.Line([100, 100, 100, 100 + pixelToMeterConverter(length)], {
      stroke: "gray",
      strokeWidth: 3,
      selectable: true, // Ensure it's selectable
      height: 400
    });
    const label = new fabric.Text(`${length}m`, {
      left: 110,
      top: (100 + (line.height/2)) - 10, // Position the label above the rectangle
      fontSize: 14,
      angle:-90,
      selectable: true,
      fontWeight:'bold'
    });
    const group = new fabric.Group([line, label], {
      left: 150,
      top: 150,
    });
    canvasRef.current?.add(group);
    canvasRef.current?.renderAll(); // Re-render the canvas
    console.log("Line added:", line);
  };

  const addText = (text: string) => {
    const label = new fabric.Text(text, {
      left: 100,
      top: 100, // Position the label above the rectangle
      fontSize: 15,
      selectable: true,
    });
    canvasRef.current?.add(label);
    canvasRef.current?.renderAll();
  }
 
  return (
    <div className="cs-canvas">
      <div className="drawpad">
        <canvas id="drawCanvas"></canvas>
      </div>

      <div className="toolbar">
        <CSButton type="text" onClick={() => handleEditor('rect')} icon={<img src={Room} height={18} width={18} />}></CSButton>
        <CSButton type="text" onClick={() => handleEditor('line')} icon={<img src={Wall} height={18} width={18} />}></CSButton>
        <CSButton type="text" onClick={() => handleEditor('text')} icon={<EditOutlined />}></CSButton>
      </div>

      <Modal open={showEditor?.state} onCancel={() => handleEditor()} centered footer={null}>
        {(selectedObject || showEditor?.type) && (
          <div style={{ marginTop: "20px" }}>
            <h3>Information</h3>
            {(selectedObject instanceof fabric.Rect || showEditor?.type === 'rect') && (
              <>
                <label>
                  Width:
                  <CSInput
                    type="number"
                    value={dimensions.width || 0}
                    onChange={(e) =>
                      setDimensions({
                        ...dimensions,
                        width: parseInt(e.target.value),
                      })
                    }
                  />
                </label>
                <br />
                <label>
                  Length:
                  <CSInput
                    type="number"
                    value={dimensions.height || 0}
                    onChange={(e) =>
                      setDimensions({
                        ...dimensions,
                        height: parseInt(e.target.value),
                      })
                    }
                  />
                </label>
              </>
            )}
            {(selectedObject instanceof fabric.Line || showEditor?.type === 'line') && (
              <>
                <label>
                  Length:
                  <CSInput
                    type="number"
                    value={dimensions.y2 || 0}
                    onChange={(e) =>
                      setDimensions({
                        ...dimensions,
                        y2: parseInt(e.target.value),
                      })
                    }
                  />
                </label>
              </>
            )}
            {(showEditor?.type === 'text') && (
              <>
                <label>
                  Text:
                  <CSInput
                    type="text"
                    value={dimensions.text}
                    onChange={(e) =>
                      setDimensions({
                        ...dimensions,
                        text: e.target.value,
                      })
                    }
                  />
                </label>
              </>
            )}
            <br />
            <CSButton
            type="primary"
            style={{margin:'10px 0'}}
            onClick={() => {
              if (showEditor?.type === 'line')
                addLine(dimensions.y2)
              if (showEditor?.type === 'rect')
                addRectangle(dimensions.width, dimensions.height)
              if (showEditor?.type === 'text')
                addText(dimensions.text)
              handleEditor()
            }}>Create</CSButton>
          </div>
        )}
      </Modal>

    </div>
  );
};

export default CSCanvas;
