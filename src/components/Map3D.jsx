'use client';

import React, { useRef } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize,
  Minimize
} from 'lucide-react';

import { MAP_DATA } from '../data/mapData';
import { CarSprite, CAR_VARIANTS } from './CarSprite';
import { CarTraffic } from './CarTraffic';
import { PLOTS_DATA } from '../data/plotsData';

const getPlotDetails = (pathId) => {
  const item = MAP_DATA.b.find((p) => p.id === pathId);
  if (!item || !item.name.toLowerCase().includes('plot')) return null;
  const numMatch = item.name.match(/\d+/);
  if (!numMatch) return null;
  const plotNo = parseInt(numMatch[0]);
  return PLOTS_DATA.find((p) => p.plotNo === plotNo);
};

const Map3D = () => {
  const containerRef = useRef(null);

  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [activePath, setActivePath] = React.useState(null);
  const [selectedPaths, setSelectedPaths] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const [selectedCenters, setSelectedCenters] = React.useState({});
  const [expandedPaths, setExpandedPaths] = React.useState([]);

  React.useEffect(() => {
    // Dynamic calculation of selected plots' centers using bounding box
    const centers = {};
    selectedPaths.forEach((id) => {
      const el = document.getElementById(`path-${id}`);
      if (el && typeof el.getBBox === 'function') {
        try {
          const bbox = el.getBBox();
          centers[id] = {
            x: bbox.x + bbox.width / 2,
            y: bbox.y + bbox.height / 2
          };
        } catch (e) {
          console.error('Error getting BBox for', id, e);
        }
      }
    });
    setSelectedCenters(centers);

    // Smart Toggle Accordion: Expand newly selected plot, collapse others
    if (selectedPaths.length > 0) {
      const lastId = selectedPaths[selectedPaths.length - 1];
      setExpandedPaths([lastId]);
    } else {
      setExpandedPaths([]);
    }
  }, [selectedPaths]);

  const toggleExpand = (id) => {
    setExpandedPaths((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current
        ?.requestFullscreen()
        .catch((err) => {
          console.error(
            `Error attempting fullscreen: ${err.message}`
          );
        });
    } else {
      document.exitFullscreen();
    }
  };

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener(
      'fullscreenchange',
      handleFullscreenChange
    );

    return () => {
      document.removeEventListener(
        'fullscreenchange',
        handleFullscreenChange
      );
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden bg-[#f0f0f0]"
    >
      <TransformWrapper
        initialScale={1}
        centerOnInit
        minScale={0.5}
        maxScale={8}
        wheel={{ disabled: true }}
        doubleClick={{ disabled: true }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            {/* Controls */}
            <div className="absolute bottom-10 right-10 z-50 flex flex-col gap-3">
              <button
                onClick={toggleFullscreen}
                className="p-3 bg-white/90 hover:bg-white rounded-full shadow-xl border border-neutral-200 text-neutral-800"
              >
                {isFullscreen ? (
                  <Minimize size={24} />
                ) : (
                  <Maximize size={24} />
                )}
              </button>

              <div className="h-[1px] bg-neutral-200 mx-2" />

              <button
                onClick={() => zoomIn()}
                className="p-3 bg-white/90 hover:bg-white rounded-full shadow-xl border border-neutral-200 text-neutral-800"
              >
                <ZoomIn size={24} />
              </button>

              <button
                onClick={() => zoomOut()}
                className="p-3 bg-white/90 hover:bg-white rounded-full shadow-xl border border-neutral-200 text-neutral-800"
              >
                <ZoomOut size={24} />
              </button>

              <button
                onClick={() => resetTransform()}
                className="p-3 bg-white/90 hover:bg-white rounded-full shadow-xl border border-neutral-200 text-neutral-800"
              >
                <RotateCcw size={24} />
              </button>
            </div>

            {/* Map */}
            <TransformComponent
              wrapperStyle={{
                width: '100%',
                height: '100%'
              }}
              contentStyle={{
                width: '100%',
                height: '100%'
              }}
            >
              <div className="relative w-screen h-screen flex items-center justify-center bg-[#f0f0f0]">

                {/* Base SVG */}
                <img
                  src="/3d-map/MASTER-PLAN.svg"
                  alt="Master Plan"
                  className="w-full h-full object-contain select-none pointer-events-none"
                />

                {/* Overlay SVG */}
                <svg
                  viewBox="0 0 4961 3508"
                  className="absolute inset-0 w-full h-full z-10 overflow-visible"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* ROAD PATHS & PLOTS */}
                  {MAP_DATA.b.map((item) => {
                    const isCarPath = item.id === 'b-36';

                    if (isCarPath) {
                      // Invisible path strictly for animating cars, does not hover or select
                      return (
                        <path
                          key={item.id}
                          id={`path-${item.id}`}
                          d={item.svgPath}
                          transform={item.transform || ''}
                          fill="none"
                          stroke="none"
                          className="pointer-events-none"
                        />
                      );
                    }

                    const isRoad = item.type?.toLowerCase() === 'road' || item.name?.toLowerCase().includes('road');
                    const isSelected = selectedPaths.includes(item.id);
                    const isHovered = activePath === item.id;

                    return (
                      <path
                        key={item.id}
                        id={`path-${item.id}`}
                        d={item.svgPath}
                        transform={item.transform || ''}

                        fill={
                          isSelected
                            ? 'rgba(165, 77, 33, 0.65)'
                            : isHovered
                              ? 'rgba(165, 77, 33, 0.55)'
                              : 'transparent'
                        }

                        stroke={
                          isSelected
                            ? '#a54d21'
                            : isHovered
                              ? '#a54d21'
                              : 'transparent'
                        }

                        strokeWidth="12"
                        className={`${isRoad ? 'cursor-default' : 'cursor-pointer'} transition-all duration-300`}

                        onClick={() => {
                          if (isRoad) return;
                          setSelectedPaths((prev) => {
                            if (prev.includes(item.id)) {
                              return prev.filter((p) => p !== item.id); // Toggle off
                            } else {
                              return [...prev, item.id]; // Toggle on
                            }
                          });
                        }}

                        onMouseEnter={() => {
                          setActivePath(item.id);
                        }}

                        onMouseLeave={() => {
                          setActivePath(null);
                        }}
                      />
                    );
                  })}

                  <CarTraffic pathId="path-b-36" numCars={4} speed={2} />

                  {/* SELECTED PLOT INDICATOR PINS */}
                  {selectedPaths.map((id, index) => {
                    const center = selectedCenters[id];
                    const plot = getPlotDetails(id);
                    if (!center || !plot) return null;

                    // Only show the large detailed tooltip for the most recently selected plot
                    const isLastSelected = index === selectedPaths.length - 1;

                    if (!isLastSelected) {
                      return (
                        <g
                          key={`sel-dot-${id}`}
                          transform={`translate(${center.x}, ${center.y})`}
                          className="pointer-events-none transition-all duration-300 select-none animate-fadeIn"
                        >
                          <circle cx="0" cy="0" r="28" fill="rgba(165, 77, 33, 0.2)" stroke="#a54d21" strokeWidth="6" />
                          <circle cx="0" cy="0" r="10" fill="#a54d21" />
                        </g>
                      );
                    }

                    // For the last selected plot, show the full details badge
                    const isNearTop = center.y < 900;
                    const sign = isNearTop ? 1 : -1;
                    const lineLength = 200 * sign;

                    return (
                      <g
                        key={`pin-${id}`}
                        transform={`translate(${center.x}, ${center.y})`}
                        className="pointer-events-none transition-all duration-300 select-none animate-fadeIn"
                      >
                        {/* Target Circle (Base) */}
                        <circle cx="0" cy="0" r="30" fill="transparent" stroke="#c8a96b" strokeWidth="8" />
                        <circle cx="0" cy="0" r="12" fill="#c8a96b" />
                        
                        {/* Vertical Connecting Line */}
                        <line x1="0" y1={30 * sign} x2="0" y2={lineLength} stroke="#c8a96b" strokeWidth="8" />
                        
                        {/* Label Badge (Rounded Rectangle) */}
                        <g transform={`translate(0, ${lineLength})`}>
                          <rect 
                            x="-280" 
                            y={isNearTop ? "0" : "-220"} 
                            width="560" 
                            height="220" 
                            rx="40" 
                            fill="#faf8f5"
                            stroke="#c8a96b"
                            strokeWidth="8"
                          />
                          <text x="0" y={isNearTop ? "90" : "-130"} textAnchor="middle" fill="#a54d21" fontSize="64" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif">
                            {plot.sqYd} Sq.Yd.
                          </text>
                          <text x="0" y={isNearTop ? "165" : "-55"} textAnchor="middle" fill="#c8a96b" fontSize="42" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif" className="tracking-wide">
                            {plot.widthFt} × {plot.lengthFt} Ft
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>

      {/* Floating Info Overlay Panel */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50 pointer-events-auto">
        <div className="bg-[#faf8f5]/90 backdrop-blur-xl border border-[#e4ded5] p-3.5 sm:p-4 rounded-2xl shadow-2xl max-w-[240px] text-stone-900 min-w-[230px]">
          <h2 className="text-sm font-black tracking-tight text-stone-900 leading-tight">
            Osiyan Habitat
          </h2>
          <p className="text-[8px] text-[#a54d21]/80 uppercase tracking-wider font-bold">Interactive Master Plan</p>

          {showForm ? (
            <div className="mt-3 pt-3 border-t border-[#e4ded5] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[8px] text-stone-400 uppercase tracking-wider font-bold">Enquire Selected Plots</span>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setSubmitted(false);
                  }}
                  className="text-[9px] text-[#a54d21] hover:text-[#a54d21]/80 transition-colors font-bold"
                >
                  ← Back
                </button>
              </div>

              {submitted ? (
                <div className="text-center py-4 space-y-2.5">
                  <div className="w-10 h-10 bg-[#a54d21]/10 border border-[#a54d21]/20 text-[#a54d21] rounded-full flex items-center justify-center mx-auto animate-bounce text-sm font-bold">
                    ✓
                  </div>
                  <p className="text-xs font-bold text-stone-900">Thank You!</p>
                  <p className="text-[9px] text-stone-500 leading-relaxed">
                    Your enquiry for <span className="text-[#a54d21] font-semibold">{selectedPaths.map(id => MAP_DATA.b.find(p => p.id === id)?.name).join(', ')}</span> has been successfully sent. Our team will contact you shortly!
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setShowForm(false);
                      setSelectedPaths([]);
                    }}
                    className="w-full mt-1.5 py-1.5 bg-[#a54d21] hover:bg-[#a54d21]/90 text-white rounded-lg text-[10px] font-bold transition-all shadow-md shadow-[#a54d21]/10"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-2.5"
                >
                  <div className="space-y-0.5">
                    <label className="text-[8px] text-stone-500 uppercase tracking-wider font-semibold">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ankur Jha"
                      className="w-full bg-white border border-[#e4ded5] rounded-lg px-2.5 py-1.5 text-[10px] text-stone-900 placeholder-stone-300 focus:outline-none focus:border-[#a54d21] focus:ring-1 focus:ring-[#a54d21]/15 transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-0.5">
                    <label className="text-[8px] text-stone-500 uppercase tracking-wider font-semibold">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full bg-white border border-[#e4ded5] rounded-lg px-2.5 py-1.5 text-[10px] text-stone-900 placeholder-stone-300 focus:outline-none focus:border-[#a54d21] focus:ring-1 focus:ring-[#a54d21]/15 transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-0.5">
                    <label className="text-[8px] text-stone-500 uppercase tracking-wider font-semibold">Email Address (Optional)</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-white border border-[#e4ded5] rounded-lg px-2.5 py-1.5 text-[10px] text-stone-900 placeholder-stone-300 focus:outline-none focus:border-[#a54d21] focus:ring-1 focus:ring-[#a54d21]/15 transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-0.5">
                    <label className="text-[8px] text-stone-500 uppercase tracking-wider font-semibold">Selected Plots</label>
                    <div className="bg-[#a54d21]/5 border border-[#a54d21]/15 rounded-lg px-2.5 py-1.5 text-[9px] text-[#a54d21] font-bold max-h-[44px] overflow-y-auto">
                      {selectedPaths.map(id => MAP_DATA.b.find(p => p.id === id)?.name).join(', ')}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-1.5 py-1.5 bg-[#a54d21] hover:bg-[#a54d21]/90 text-white rounded-lg text-[10px] font-bold transition-all shadow-md shadow-[#a54d21]/10"
                  >
                    Submit Request
                  </button>
                </form>
              )}
            </div>
          ) : activePath || selectedPaths.length > 0 ? (
            <div className="mt-3 pt-3 border-t border-[#e4ded5] space-y-3">

              {/* Hover View */}
              {activePath && (() => {
                const plot = getPlotDetails(activePath);
                const item = MAP_DATA.b.find((p) => p.id === activePath);
                const isRoadItem = item?.type?.toLowerCase() === 'road' || item?.name?.toLowerCase().includes('road');
                return (
                  <div className="bg-[#a54d21]/5 border border-[#a54d21]/15 rounded-lg p-2.5 space-y-1.5">
                    <p className="text-[#a54d21]/80 text-[8px] uppercase tracking-wider font-bold">Hovering over</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#a54d21] animate-pulse" />
                        <p className="text-stone-900 font-black text-[10px] uppercase tracking-wide">
                          {isRoadItem ? item.name : MAP_DATA.b.find((p) => p.id === activePath)?.name}
                        </p>
                      </div>
                      {!isRoadItem && plot && plot.facing && (
                        <span className="bg-[#a54d21]/10 text-[#a54d21] border border-[#a54d21]/20 text-[7px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                          {plot.facing}
                        </span>
                      )}
                    </div>

                    {plot ? (
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 pt-1.5 border-t border-[#e4ded5]/30 text-[9px]">
                        <div>
                          <span className="text-stone-400 block text-[7px] uppercase font-bold">Area</span>
                          <span className="text-stone-900 font-extrabold">{plot.sqYd} Sq.Yd.</span>
                        </div>
                        <div>
                          <span className="text-stone-400 block text-[7px] uppercase font-bold">Dimensions</span>
                          <span className="text-stone-900 font-extrabold">{plot.widthFt} × {plot.lengthFt} Ft</span>
                        </div>
                        <div>
                          <span className="text-stone-400 block text-[7px] uppercase font-bold">Area (Mt)</span>
                          <span className="text-stone-600 font-semibold">{plot.sqMtr} Sq.Mtr</span>
                        </div>
                        <div>
                          <span className="text-stone-400 block text-[7px] uppercase font-bold">PLC Charge</span>
                          <span className={`${plot.plc !== '-' ? 'text-[#a54d21] font-bold' : 'text-stone-600'}`}>{plot.plc !== '-' ? plot.plc : 'Nil'}</span>
                        </div>
                      </div>
                    ) : isRoadItem ? null : (
                      <p className="text-[9px] text-stone-500 italic">Ancillary Area</p>
                    )}
                  </div>
                );
              })()}

              {/* Selected List - Collapsible Accordion & Totals Summary */}
              {selectedPaths.length > 0 && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] text-stone-400 uppercase tracking-wider font-extrabold">Selected Specs</span>
                    <span className="text-stone-400 text-[8px] font-medium">Click to toggle</span>
                  </div>

                  {/* Scrollable list of accordion items */}
                  <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-0.5 custom-scrollbar">
                    {selectedPaths.map((id) => {
                      const item = MAP_DATA.b.find((p) => p.id === id);
                      const isRoadItem = item?.type?.toLowerCase() === 'road' || item?.name?.toLowerCase().includes('road');
                      const plot = getPlotDetails(id);
                      if (!plot && !isRoadItem) return null;
                      const isExpanded = expandedPaths.includes(id);

                      return (
                        <div
                          key={id}
                          className="bg-[#a54d21]/5 border border-[#a54d21]/15 rounded-lg p-2 space-y-1.5 relative transition-all duration-300"
                        >
                          <div
                            onClick={() => toggleExpand(id)}
                            className={`flex items-center justify-between ${plot ? 'cursor-pointer' : ''} select-none pr-5`}
                          >
                            <div className="flex items-center gap-1.5">
                              <span className="text-stone-900 font-black text-[10px] uppercase tracking-wide">
                                {isRoadItem ? item.name : `Plot ${plot.plotNo}`}
                              </span>
                              {plot && (
                                <span className="text-stone-400 text-[7px] transition-transform duration-300">
                                  {isExpanded ? '▲' : '▼'}
                               </span>
                              )}
                            </div>
                            {!isRoadItem && plot && plot.facing && (
                              <span className="bg-[#a54d21]/10 text-[#a54d21] border border-[#a54d21]/20 text-[7px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                                {plot.facing}
                              </span>
                            )}
                          </div>

                          {/* Quick deselect button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPaths((prev) => prev.filter((p) => p !== id));
                            }}
                            className="absolute top-2 right-2 text-stone-400 hover:text-stone-700 text-xs transition-colors font-bold p-0.5 leading-none"
                            title={isRoadItem ? "Remove road" : "Remove plot"}
                          >
                            ×
                          </button>

                          {/* Collapsible Details Panel */}
                          {plot && isExpanded && (
                            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[9px] pt-1.5 border-t border-[#e4ded5]/30 animate-fadeIn">
                              <div>
                                <span className="text-stone-400 block text-[6.5px] uppercase font-bold">Area</span>
                                <span className="text-[#a54d21] font-extrabold">{plot.sqYd} Sq.Yd.</span>
                              </div>
                              <div>
                                <span className="text-stone-400 block text-[6.5px] uppercase font-bold">Dimensions</span>
                                <span className="text-stone-900 font-extrabold">{plot.widthFt} × {plot.lengthFt} Ft</span>
                              </div>
                              <div>
                                <span className="text-stone-400 block text-[6.5px] uppercase font-bold">Area (Mt)</span>
                                <span className="text-stone-600 font-semibold">{plot.sqMtr} Sq.Mtr</span>
                              </div>
                              <div>
                                <span className="text-stone-400 block text-[6.5px] uppercase font-bold">PLC Charge</span>
                                <span className={`${plot.plc !== '-' ? 'text-[#a54d21] font-bold' : 'text-stone-600'}`}>
                                  {plot.plc !== '-' ? plot.plc : 'Nil'}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Summary calculations (Sq.Yd. and Sq.Mtr.) */}
                  {(() => {
                    const totalSqYd = selectedPaths.reduce((sum, id) => {
                      const plot = getPlotDetails(id);
                      return sum + (plot ? plot.sqYd : 0);
                    }, 0);
                    const totalSqMtr = selectedPaths.reduce((sum, id) => {
                      const plot = getPlotDetails(id);
                      return sum + (plot ? plot.sqMtr : 0);
                    }, 0);
                    
                    if (totalSqYd === 0) return null;
                    
                    return (
                      <div className="bg-[#faf8f5] border border-[#e4ded5] rounded-lg p-2 space-y-1 text-[9px] mt-1.5">
                        <div className="flex justify-between items-center text-stone-500">
                          <span>Total Selected Plots:</span>
                          <span className="text-stone-900 font-extrabold">{selectedPaths.length}</span>
                        </div>
                        <div className="flex justify-between items-center text-stone-500">
                          <span>Combined Area:</span>
                          <span className="text-[#a54d21] font-extrabold">
                            {totalSqYd.toFixed(3)} Sq.Yd.
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-stone-400 text-[8px]">
                          <span>In Metric:</span>
                          <span>{totalSqMtr.toFixed(3)} Sq.Mtr</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          ) : (
            <div className="mt-3 pt-3 border-t border-[#e4ded5] text-stone-500 text-[10px] leading-relaxed">
              Hover or click multiple plots on the master plan to select them.
            </div>
          )}

          {selectedPaths.length > 0 && !showForm && (
            <div className="flex gap-1.5 mt-3">
              <button
                onClick={() => setSelectedPaths([])}
                className="flex-1 py-1.5 bg-[#faf8f5] hover:bg-stone-50 text-stone-700 rounded-lg text-[10px] font-bold transition-all border border-[#e4ded5]"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="flex-1 py-1.5 bg-[#a54d21] hover:bg-[#a54d21]/90 text-white rounded-lg text-[10px] font-bold transition-all shadow-md shadow-[#a54d21]/10"
              >
                Enquire Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Map3D;
