import React, { useRef, useState, useEffect } from "react";

const clothes = [
  { id: 1, name: "women dress1", image: "/women dress1.png", type: "dress", position: { x: 150, y: 80, width: 340, height: 500 } },
  { id: 2, name: "women dress2", image: "/women dress2.png", type: "dress", position: { x: 150, y: 80, width: 340, height: 500 } },
  // ... other clothing items
];
const BODY_TYPES = {
  SMALL: {
    label: "Small (S)",
    measurements: {
      shoulders: 90,
      bust: 85,
      waist: 70,
      hips: 95,
      height: 160
    }
  },
  MEDIUM: {
    label: "Medium (M)",
    measurements: {
      shoulders: 95,
      bust: 90,
      waist: 75,
      hips: 100,
      height: 165
    }
  },
  LARGE: {
    label: "Large (L)",
    measurements: {
      shoulders: 100,
      bust: 95,
      waist: 80,
      hips: 105,
      height: 170
    }
  },
  XLARGE: {
    label: "Extra Large (XL)",
    measurements: {
      shoulders: 105,
      bust: 100,
      waist: 85,
      hips: 110,
      height: 175
    }
  }
};
const REQUIRED_WIDTH = 640;
const REQUIRED_HEIGHT = 480;

function VirtualTryOn() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const meshCanvasRef = useRef(null);
  const [selectedCloth, setSelectedCloth] = useState(null);
  const [captured, setCaptured] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [wornClothes, setWornClothes] = useState([]);
  const [bodyMeasurements, setBodyMeasurements] = useState(null);
  const [meshPoints, setMeshPoints] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [bodyType, setBodyType] = useState(BODY_TYPES.MEDIUM);
  const [adjustmentPoints, setAdjustmentPoints] = useState([]);
  const [activePointIndex, setActivePointIndex] = useState(null);
  const [showMeasurements, setShowMeasurements] = useState(true);
  
  useEffect(() => {
    const { measurements } = bodyType;
    const points = [
      // Shoulder points
      { x: 200, y: 50, label: 'Left Shoulder', measurement: 'shoulders' },
      { x: 400, y: 50, label: 'Right Shoulder', measurement: 'shoulders' },
      
      // Bust points
      { x: 250, y: 100, label: 'Left Bust', measurement: 'bust' },
      { x: 350, y: 100, label: 'Right Bust', measurement: 'bust' },
      
      // Waist points
      { x: 275, y: 180, label: 'Left Waist', measurement: 'waist' },
      { x: 325, y: 180, label: 'Right Waist', measurement: 'waist' },
      
      // Hip points
      { x: 260, y: 260, label: 'Left Hip', measurement: 'hips' },
      { x: 340, y: 260, label: 'Right Hip', measurement: 'hips' },
    ];
    
    setAdjustmentPoints(points);
  }, [bodyType]);

  // Draw the body and clothing
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw body silhouette
    ctx.fillStyle = '#f0f0f0';
    ctx.beginPath();
    // Body shape based on adjustment points
    ctx.moveTo(adjustmentPoints[0].x, adjustmentPoints[0].y);
    ctx.lineTo(adjustmentPoints[1].x, adjustmentPoints[1].y);
    ctx.lineTo(adjustmentPoints[3].x, adjustmentPoints[3].y);
    ctx.lineTo(adjustmentPoints[5].x, adjustmentPoints[5].y);
    ctx.lineTo(adjustmentPoints[7].x, adjustmentPoints[7].y);
    ctx.lineTo(adjustmentPoints[6].x, adjustmentmentPoints[6].y);
    ctx.lineTo(adjustmentPoints[4].x, adjustmentmentPoints[4].y);
    ctx.lineTo(adjustmentPoints[2].x, adjustmentmentPoints[2].y);
    ctx.closePath();
    ctx.fill();
    // Draw adjustment points
    adjustmentPoints.forEach((point, index) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = activePointIndex === index ? '#ff0000' : '#007bff';
      ctx.fill();
      
      if (showMeasurements) {
        ctx.font = '12px Arial';
        ctx.fillStyle = '#333';
        ctx.fillText(point.label, point.x + 10, point.y - 10);
      }
    });

    // Draw measurements
    if (showMeasurements) {
      ctx.font = 'bold 14px Arial';
      ctx.fillStyle = '#333';
      
      // Shoulders
      const shoulderWidth = Math.sqrt(
        Math.pow(adjustmentPoints[1].x - adjustmentPoints[0].x, 2) +
        Math.pow(adjustmentPoints[1].y - adjustmentPoints[0].y, 2)
      );
      ctx.fillText(`Shoulders: ${Math.round(shoulderWidth)}cm`, 20, 30);
      
      // Bust
      const bustWidth = Math.sqrt(
        Math.pow(adjustmentPoints[3].x - adjustmentPoints[2].x, 2) +
        Math.pow(adjustmentPoints[3].y - adjustmentPoints[2].y, 2)
      );
      ctx.fillText(`Bust: ${Math.round(bustWidth)}cm`, 20, 50);

      // Waist
      const waistWidth = Math.sqrt(
        Math.pow(adjustmentPoints[5].x - adjustmentPoints[4].x, 2) +
        Math.pow(adjustmentPoints[5].y - adjustmentPoints[4].y, 2)
      );
      ctx.fillText(`Waist: ${Math.round(waistWidth)}cm`, 20, 70);
      
      // Hips
      const hipsWidth = Math.sqrt(
        Math.pow(adjustmentPoints[7].x - adjustmentPoints[6].x, 2) +
        Math.pow(adjustmentPoints[7].y - adjustmentPoints[6].y, 2)
      );
      ctx.fillText(`Hips: ${Math.round(hipsWidth)}cm`, 20, 90);
      
      // Height
      ctx.fillText(`Height: ${bodyType.measurements.height}cm`, 20, 110);
    }
    // Draw clothing items
    wornClothes.forEach(cloth => {
      const img = new Image();
      img.src = cloth.image;
      img.onload = () => {
        // Scale clothing based on body measurements
        const scaleFactor = bodyType.measurements.height / 165;
        const width = img.width * scaleFactor;
        const height = img.height * scaleFactor;
        
        // Position clothing based on body type
        const x = 300 - width / 2;
        const y = 50;
        
        ctx.drawImage(img, x, y, width, height);
      };
    });
  };

  useEffect(() => {
    drawCanvas();
  }, [bodyType, adjustmentPoints, wornClothes, activePointIndex, showMeasurements]);

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicked on an adjustment point
    for (let i = 0; i < adjustmentPoints.length; i++) {
      const point = adjustmentPoints[i];
      const distance = Math.sqrt(Math.pow(x - point.x, 2) + Math.pow(y - point.y, 2));
      
      if (distance <= 10) {
        setActivePointIndex(i);
        return;
      }
    }
  };
  // Initialize camera
  useEffect(() => {
    let stream;
    const enableCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: REQUIRED_WIDTH },
            height: { ideal: REQUIRED_HEIGHT },
            facingMode: 'user' 
          } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied:", err);
        alert("Could not access camera. Please enable camera permissions.");
      }
    };

    enableCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleMouseMove = (e) => {
    if (activePointIndex === null) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newPoints = [...adjustmentPoints];
    newPoints[activePointIndex] = { ...newPoints[activePointIndex], x, y };
    setAdjustmentPoints(newPoints);
  };

  const handleMouseUp = () => {
    setActivePointIndex(null);
  };

  const addClothing = () => {
    if (selectedCloth) {
      setWornClothes([...wornClothes, selectedCloth]);
    }
  };

  // Simulate body mesh detection (in a real app, use a proper body detection library)
  const detectBodyMesh = () => {
    // This is a simplified mock - replace with actual body detection
    const points = [];
    const centerX = REQUIRED_WIDTH / 2;
    const centerY = REQUIRED_HEIGHT / 2;
    
    // Head points
    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2;
      points.push({
        x: centerX + Math.cos(angle) * 50,
        y: centerY - 180 + Math.sin(angle) * 50
      });
    }
    
    // Body points
    for (let i = 0; i < 20; i++) {
      points.push({
        x: centerX - 100 + (i * 10),
        y: centerY - 120 + (i * 5)
      });
      points.push({
        x: centerX + 100 - (i * 10),
        y: centerY - 120 + (i * 5)
      });
    }
    
    // Leg points
    for (let i = 0; i < 10; i++) {
      points.push({
        x: centerX - 60,
        y: centerY + 80 + (i * 15)
      });
      points.push({
        x: centerX + 60,
        y: centerY + 80 + (i * 15)
      });
    }
    
    return points;
  };

  const drawMesh = (ctx, points) => {
    if (!points.length) return;
    
    ctx.strokeStyle = 'rgba(0, 150, 255, 0.6)';
    ctx.lineWidth = 2;
    
    // Draw connecting lines
    ctx.beginPath();
    for (let i = 0; i < points.length - 1; i++) {
      ctx.moveTo(points[i].x, points[i].y);
      ctx.lineTo(points[i+1].x, points[i+1].y);
    }
    ctx.stroke();
    
    // Draw points
    ctx.fillStyle = 'rgba(0, 100, 255, 0.8)';
    points.forEach(point => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (video && ctx) {
      // Clear canvas and draw video frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Detect body mesh
      const detectedPoints = detectBodyMesh();
      setMeshPoints(detectedPoints);
      
      // Calculate body measurements from mesh
      if (detectedPoints.length > 0) {
        const minX = Math.min(...detectedPoints.map(p => p.x));
        const maxX = Math.max(...detectedPoints.map(p => p.x));
        const minY = Math.min(...detectedPoints.map(p => p.y));
        const maxY = Math.max(...detectedPoints.map(p => p.y));
        
        setBodyMeasurements({
          width: maxX - minX,
          height: maxY - minY,
          centerX: (minX + maxX) / 2,
          centerY: (minY + maxY) / 2
        });
      }
      
      // Save the captured image
      const imageDataURL = canvas.toDataURL('image/png');
      setCapturedImage(imageDataURL);
      setCaptured(true);
      
      // If clothing is selected, add it to worn clothes
      if (selectedCloth) {
        setWornClothes([...wornClothes, selectedCloth]);
      }
    }
  };

  const drawClothingItems = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const meshCtx = meshCanvasRef.current?.getContext("2d");
    
    if (!ctx || !capturedImage || !meshCtx) return;

    // Clear canvases
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    meshCtx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the captured photo
    const bgImg = new Image();
    bgImg.src = capturedImage;
    bgImg.onload = () => {
      ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
      
      // Draw body mesh
      if (meshPoints.length > 0) {
        drawMesh(meshCtx, meshPoints);
      }

      // Draw each clothing item with scaling based on body measurements
      if (bodyMeasurements) {
        wornClothes.forEach(cloth => {
          const img = new Image();
          img.src = cloth.image;
          img.onload = () => {
            const { x, y, width, height } = cloth.position;
            
            // Adjust position based on body center
            const adjustedX = bodyMeasurements.centerX - (width / 2) + (x - REQUIRED_WIDTH/2);
            const adjustedY = bodyMeasurements.centerY - (height / 2) + (y - REQUIRED_HEIGHT/2);
            
            ctx.drawImage(
              img, 
              adjustedX, 
              adjustedY, 
              width, 
              height
            );
          };
        });
      }
    };
  };

  useEffect(() => {
    if (captured) {
      drawClothingItems();
    }
  }, [wornClothes, captured, bodyMeasurements, meshPoints]);

  const resetCapture = () => {
    setCaptured(false);
    setCapturedImage(null);
    setWornClothes([]);
    setSelectedCloth(null);
    setBodyMeasurements(null);
    setMeshPoints([]);
    
    const ctx = canvasRef.current?.getContext("2d");
    const meshCtx = meshCanvasRef.current?.getContext("2d");
    if (ctx) ctx.clearRect(0, 0, REQUIRED_WIDTH, REQUIRED_HEIGHT);
    if (meshCtx) meshCtx.clearRect(0, 0, REQUIRED_WIDTH, REQUIRED_HEIGHT);
  };

  const saveOutfit = () => {
    setIsSaving(true);
    
    // Combine the canvas with mesh and clothing into one image
    const canvas = canvasRef.current;
    const combinedCanvas = document.createElement('canvas');
    combinedCanvas.width = canvas.width;
    combinedCanvas.height = canvas.height;
    const ctx = combinedCanvas.getContext('2d');
    
    // Draw the base image
    const bgImg = new Image();
    bgImg.src = capturedImage;
    bgImg.onload = () => {
      ctx.drawImage(bgImg, 0, 0);
      
      // Draw all clothing items
      wornClothes.forEach(cloth => {
        const img = new Image();
        img.src = cloth.image;
        img.onload = () => {
          const { x, y, width, height } = cloth.position;
          const adjustedX = bodyMeasurements.centerX - (width / 2) + (x - REQUIRED_WIDTH/2);
          const adjustedY = bodyMeasurements.centerY - (height / 2) + (y - REQUIRED_HEIGHT/2);
          
          ctx.drawImage(img, adjustedX, adjustedY, width, height);
          
          // If this is the last item, save the image
          if (cloth === wornClothes[wornClothes.length - 1]) {
            const link = document.createElement('a');
            link.download = 'virtual-try-on-outfit.png';
            link.href = combinedCanvas.toDataURL('image/png');
            link.click();
            setIsSaving(false);
          }
        };
      });
      
      // If no clothes, just save the base image
      if (wornClothes.length === 0) {
        const link = document.createElement('a');
        link.download = 'virtual-try-on.png';
        link.href = combinedCanvas.toDataURL('image/png');
        link.click();
        setIsSaving(false);
      }
    };
  };

  return (
    <div className="flex flex-col items-center p-4 max-w-6xl mx-auto bg-sky-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Virtual Fitting Room with Body Adjustment</h2>

      <div className="flex flex-col md:flex-row gap-8 w-full">
        {/* Body Canvas Area */}
        <div className="flex-1">
          <div className="relative mb-4 bg-gray-100 rounded-lg overflow-hidden">
            {!captured ? (
              <video 
                ref={videoRef} 
                autoPlay 
                muted 
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={500}
                  className="w-full h-full bg-white"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                />
                <canvas
                  ref={meshCanvasRef}
                  width={600}
                  height={500}
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                />
              </>
            )}
          </div>

          {/* Body Type Selection */}
          <div className="flex flex-wrap gap-4 mb-4">
            {Object.entries(BODY_TYPES).map(([key, type]) => (
              <button
                key={key}
                onClick={() => setBodyType(type)}
                className={`px-4 py-2 rounded-lg ${
                  bodyType.label === type.label
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center gap-4">
            {!captured ? (
              <>
                <button
                  onClick={capturePhoto}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <span className="text-xl">📸</span> Capture with Body Mesh
                </button>
                <div className="text-sm text-gray-600 text-center">
                  <p>Stand about 1.5-2 meters from camera</p>
                  <p>Ensure your whole body is visible in frame</p>
                </div>
              </>
            ) : (
              <>
                {bodyMeasurements && (
                  <div className="text-sm bg-blue-50 p-3 rounded-lg text-center">
                    <p>Body detected: {Math.round(bodyMeasurements.width)}×{Math.round(bodyMeasurements.height)}px</p>
                    <p>{meshPoints.length} mesh points mapped</p>
                  </div>
                )}
                <div className="flex gap-4">
                  <button
                    onClick={resetCapture}
                    className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition flex items-center gap-2"
                  >
                    <span className="text-xl">🔄</span> Retake
                  </button>
                  <button
                    onClick={saveOutfit}
                    disabled={isSaving}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSaving ? 'Saving...' : (
                      <>
                        <span className="text-xl">💾</span> Save Outfit
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setShowMeasurements(!showMeasurements)}
                    className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
                  >
                    <span className="text-xl">📏</span> {showMeasurements ? 'Hide' : 'Show'} Measurements
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Adjustment Guide */}
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-bold mb-2">Adjustment Guide</h3>
            <p className="text-sm">
              Drag the blue dots to customize your body shape. The clothing will automatically adjust to fit.
            </p>
          </div>
        </div>

        {/* Clothing Selection Area */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-4">Wardrobe</h3>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {clothes.map((cloth) => (
              <button
                key={cloth.id}
                onClick={() => {
                  setSelectedCloth(cloth);
                  if (captured) {
                    setWornClothes([...wornClothes, cloth]);
                  }
                }}
                className={`border-2 p-2 rounded-lg hover:scale-105 transition ${
                  selectedCloth?.id === cloth.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200'
                }`}
              >
                <img
                  src={cloth.image}
                  alt={cloth.name}
                  className="w-full h-24 object-contain"
                />
                <p className="text-xs text-center mt-1 text-gray-700">{cloth.name}</p>
              </button>
            ))}
          </div>

          {/* Current Outfit */}
          {captured && wornClothes.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Your Outfit</h3>
              <div className="flex flex-wrap gap-2">
                {wornClothes.map((cloth, index) => (
                  <div key={index} className="relative group border border-gray-200 p-1 rounded-lg">
                    <img
                      src={cloth.image}
                      alt={cloth.name}
                      className="w-16 h-16 object-contain"
                    />
                    <button
                      onClick={() => setWornClothes(wornClothes.filter((_, i) => i !== index))}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Body Measurements */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-bold mb-2">Current Measurements</h3>
            <ul className="text-sm">
              <li>Body Type: {bodyType.label}</li>
              <li>Height: {bodyType.measurements.height}cm</li>
              <li>Shoulders: {bodyType.measurements.shoulders}cm</li>
              <li>Bust: {bodyType.measurements.bust}cm</li>
              <li>Waist: {bodyType.measurements.waist}cm</li>
              <li>Hips: {bodyType.measurements.hips}cm</li>
            </ul>
          </div>

          {/* Body Mesh Guide */}
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mt-4">
            <h4 className="font-medium text-purple-800 mb-2">Body Mesh Guide</h4>
            <ul className="text-sm text-purple-700 list-disc pl-5">
              <li>The blue mesh helps align clothing to your body</li>
              <li>For best results, wear fitted clothing</li>
              <li>Stand in good lighting with plain background</li>
              <li>Keep arms slightly away from your body</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VirtualTryOn;
