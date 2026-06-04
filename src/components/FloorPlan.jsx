'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './FloorPlan.css';

const roomDefs = [
  { id:'living',  x:-2,   z:18,  w:13,  d:13,  fc:0xe8e0d0, wc:0xf5f0e8, name:'Living Area',    desc:"10'8.5\" × 13'0\"<br>Open plan layout<br>South balcony access" },
  { id:'dining',  x:-2,   z:5,   w:11,  d:13,  fc:0xf0ece0, wc:0xf5f0e8, name:'Dining Area',    desc:"9'11.5\" × 12'11\"<br>Connected to kitchen<br>Natural light" },
  { id:'kitchen', x:-3,   z:-8,  w:7,   d:13,  fc:0xe0e0e0, wc:0xf8f8f8, name:'Kitchen',        desc:"6'0\" × 12'6\"<br>Modular cabinets<br>Balcony access" },
  { id:'bed1',    x:-16,  z:-5,  w:11,  d:13,  fc:0xd4c4a0, wc:0xede5d0, name:'Bed Room 1',     desc:"10'0\" × 12'6\"<br>Attached toilet<br>Wardrobe space" },
  { id:'bed2',    x:10,   z:-5,  w:11,  d:18,  fc:0xc8b890, wc:0xe8dcc8, name:'Bed Room 2',     desc:"10'0\" × 17'1\"<br>Master bedroom<br>Attached toilet + balcony" },
  { id:'bed3',    x:10,   z:14,  w:11,  d:13,  fc:0xd0c8b0, wc:0xece4d0, name:'Bed Room 3',     desc:"10'0\" × 12'7\"<br>South facing<br>Balcony access" },
  { id:'t1',      x:-16,  z:-17, w:7,   d:5,   fc:0xb8d0d8, wc:0xdceef5, name:'Toilet 1',       desc:"6'0\" × 5'3.5\"<br>Attached to Bed 1" },
  { id:'t2',      x:14,   z:-17, w:7,   d:5,   fc:0xb8d0d8, wc:0xdceef5, name:'Toilet 2',       desc:"6'0\" × 8'0.5\"<br>Attached to Bed 2" },
  { id:'t3',      x:6,    z:5,   w:7,   d:6,   fc:0xb8d0d8, wc:0xdceef5, name:'Common Toilet',  desc:"6'1\" × 5'5\"<br>Common bathroom" },
  { id:'balcony', x:-2,   z:-21, w:18,  d:6,   fc:0x8ab08a, wc:0xaacfaa, name:'Balcony (Top)',  desc:"1.82m wide<br>Deck flooring<br>Garden view" },
  { id:'balcony2',x:-2,   z:26,  w:18,  d:6,   fc:0x8ab08a, wc:0xaacfaa, name:'Balcony (South)',desc:"5'7.5\" wide<br>Deck flooring" },
  { id:'balcony3',x:-20,  z:18,  w:6,   d:7,   fc:0x8ab08a, wc:0xaacfaa, name:'Side Balcony',   desc:"6'0\" wide" },
  { id:'lift',    x:-20,  z:5,   w:8,   d:13,  fc:0xb0b0b0, wc:0xd0d0d0, name:'Lift & Staircase',desc:"Common area<br>DN/UP staircase" },
];

const roomCamPos = {
  living:   {x:-2,  y:1.65, z:18,  yaw:180},
  dining:   {x:-2,  y:1.65, z:5,   yaw:0},
  kitchen:  {x:-3,  y:1.65, z:-6,  yaw:0},
  bed1:     {x:-16, y:1.65, z:-4,  yaw:90},
  bed2:     {x:10,  y:1.65, z:-4,  yaw:90},
  bed3:     {x:10,  y:1.65, z:14,  yaw:90},
  balcony:  {x:-2,  y:1.65, z:-19, yaw:0},
};

const panelInfo = {
  living:  {name:'Living Area',    desc:"10'8.5\" × 13'0\"<br>Open plan layout<br>South balcony access"},
  dining:  {name:'Dining Area',    desc:"9'11.5\" × 12'11\"<br>Connected to kitchen<br>Natural light"},
  kitchen: {name:'Kitchen',        desc:"6'0\" × 12'6\"<br>Modular cabinets<br>Top balcony access"},
  bed1:    {name:'Bed Room 1',     desc:"10'0\" × 12'6\"<br>Attached toilet<br>Wardrobe space"},
  bed2:    {name:'Bed Room 2',     desc:"10'0\" × 17'1\"<br>Master suite<br>Attached toilet + balcony"},
  bed3:    {name:'Bed Room 3',     desc:"10'0\" × 12'7\"<br>South facing<br>Balcony access"},
  balcony: {name:'Balcony (Top)',  desc:"1.82m wide<br>Deck flooring<br>Garden view"},
};

const wallH = 3.2;
const W = 0.12;

export default function FloorPlan() {
  const mountRef = useRef(null);
  const [mode, setModeState] = useState('walkthrough');
  const [activeRoom, setActiveRoom] = useState('living');
  const [info, setInfo] = useState(panelInfo.living);

  const threeRef = useRef(null);

  useEffect(() => {
    const canvas = mountRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    scene.fog = new THREE.Fog(0x1a1a2e, 20, 60);

    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 200);

    const floorGroup = new THREE.Group();
    scene.add(floorGroup);

    function addWall(w, h, d, x, y, z, mat) {
      const geo = new THREE.BoxGeometry(w, h, d);
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.castShadow = true;
      floorGroup.add(m);
    }

    function addPLight(color, intensity, x, y, z) {
      const l = new THREE.PointLight(color, intensity, 12);
      l.position.set(x, y, z);
      floorGroup.add(l);
    }

    function addLabel(r) {
      const canvas2 = document.createElement('canvas');
      canvas2.width = 256; canvas2.height = 64;
      const ctx = canvas2.getContext('2d');
      ctx.fillStyle = 'rgba(0,0,0,0)';
      ctx.fillRect(0, 0, 256, 64);
      ctx.font = 'bold 22px Segoe UI';
      ctx.fillStyle = '#ffe060';
      ctx.textAlign = 'center';
      ctx.fillText(r.name, 128, 38);
      const tex = new THREE.CanvasTexture(canvas2);
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0.9, depthWrite: false });
      const sprite = new THREE.Sprite(mat);
      sprite.position.set(r.x, wallH + 0.5, r.z);
      sprite.scale.set(6, 1.5, 1);
      sprite.userData = { isLabel: true };
      floorGroup.add(sprite);
    }

    function box(w, h, d, color, x, y, z, ry = 0) {
      const g = new THREE.BoxGeometry(w, h, d);
      const m = new THREE.MeshLambertMaterial({ color });
      const mesh = new THREE.Mesh(g, m);
      mesh.position.set(x, y, z);
      mesh.rotation.y = ry;
      mesh.castShadow = true;
      floorGroup.add(mesh);
    }

    function cyl(rt, rb, h, color, x, y, z) {
      const g = new THREE.CylinderGeometry(rt, rb, h, 16);
      const m = new THREE.MeshLambertMaterial({ color });
      const mesh = new THREE.Mesh(g, m);
      mesh.position.set(x, y, z);
      floorGroup.add(mesh);
    }

    function addFurnitureAll() {
      // LIVING
      box(5, 0.55, 1.4, 0x9b8878, -2, 0.28, 22);
      box(1.4, 0.55, 3, 0x9b8878, -4.8, 0.28, 20.5);
      box(5, 0.9, 0.3, 0x7a6858, -2, 0.45, 22.7);
      box(2, 0.08, 1, 0x5a4a38, -2, 0.55, 19.5);
      box(0.06, 0.55, 0.06, 0x5a4a38, -2.9, 0.28, 19.1); box(0.06, 0.55, 0.06, 0x5a4a38, -1.1, 0.28, 19.1);
      box(0.06, 0.55, 0.06, 0x5a4a38, -2.9, 0.28, 19.9); box(0.06, 0.55, 0.06, 0x5a4a38, -1.1, 0.28, 19.9);
      box(4, 0.5, 0.5, 0x2a2a2a, -2, 0.25, 13.0);
      box(3.5, 1.3, 0.08, 0x1a1a2e, -2, 0.9, 13.04);
      cyl(0.12, 0.16, 0.4, 0x8b5e3c, -5.5, 0.2, 13.5);
      cyl(0.3, 0.01, 0.7, 0x2d7a2d, -5.5, 0.75, 13.5);

      // DINING
      box(3, 0.08, 1.4, 0x6a5040, -2, 0.7, 5);
      box(0.06, 0.7, 0.06, 0x5a4030, -3.3, 0.35, 4.4); box(0.06, 0.7, 0.06, 0x5a4030, -0.7, 0.35, 4.4);
      box(0.06, 0.7, 0.06, 0x5a4030, -3.3, 0.35, 5.6); box(0.06, 0.7, 0.06, 0x5a4030, -0.7, 0.35, 5.6);
      box(0.9, 0.06, 0.9, 0x8a7060, -2, 0.7, 3.7); box(0.9, 0.06, 0.9, 0x8a7060, -2, 0.7, 6.3);
      box(0.9, 0.06, 0.9, 0x8a7060, -4, 0.7, 5);   box(0.9, 0.06, 0.9, 0x8a7060, 0, 0.7, 5);

      // KITCHEN
      box(6, 1.0, 0.55, 0x555555, -3, 0.5, -8.5);
      box(6, 0.06, 0.6, 0x888888, -3, 1.04, -8.5);
      box(6, 1.2, 0.4, 0x444444, -3, 2.2, -8.75);
      box(0.8, 0.6, 0.6, 0xeeeeee, 0.5, 0.3, -8.5);

      // BED 1
      box(4, 0.28, 5, 0x7a5a38, -16, 0.14, -5);
      box(3.8, 0.35, 4.7, 0xeeeedd, -16, 0.46, -5);
      box(3.8, 1.1, 0.18, 0x7a5a38, -16, 0.75, -7.4);
      box(0.9, 0.15, 0.5, 0xfff8f0, -17.5, 0.67, -3.5);
      box(0.9, 0.15, 0.5, 0xfff8f0, -14.5, 0.67, -3.5);
      box(2.5, 3.0, 0.5, 0x8a6a40, -20.5, 1.5, -5);

      // BED 2
      box(4.5, 0.3, 5.5, 0x8b6a38, 10, 0.15, -5);
      box(4.3, 0.4, 5.2, 0xf0ede0, 10, 0.47, -5);
      box(4.5, 1.3, 0.2, 0x8b6a38, 10, 0.8, -7.8);
      box(1, 0.15, 0.55, 0xfff5e0, 7.8, 0.72, -4); box(1, 0.15, 0.55, 0xfff5e0, 12.2, 0.72, -4);
      cyl(0.06, 0.06, 0.7, 0xaaaaaa, 7.8, 1.07, -4); cyl(0.22, 0.01, 0.28, 0xffe880, 7.8, 1.47, -4);
      box(3, 3.5, 0.55, 0x7a5a30, 14.5, 1.75, -7);
      box(3, 0.06, 1.5, 0xddccbb, 14.5, 1.06, -1);

      // BED 3
      box(4, 0.28, 5, 0x7a5a38, 10, 0.14, 14);
      box(3.8, 0.35, 4.7, 0xeeeedd, 10, 0.46, 14);
      box(3.8, 1.0, 0.18, 0x7a5a38, 10, 0.68, 11.6);

      // BALCONY
      cyl(0.18, 0.22, 0.4, 0x8b5e3c, -5, 0.2, -23); cyl(0.32, 0.01, 0.9, 0x2d7a2d, -5, 0.85, -23);
      cyl(0.18, 0.22, 0.4, 0x8b5e3c, 1, 0.2, -23);  cyl(0.32, 0.01, 0.9, 0x2d7a2d, 1, 0.85, -23);
      cyl(0.18, 0.22, 0.4, 0x8b5e3c, 5, 0.2, -23);  cyl(0.32, 0.01, 0.9, 0x2d7a2d, 5, 0.85, -23);
      box(1.2, 0.35, 1.2, 0x5a4a38, -2, 0.18, -21.5);
      cyl(0.4, 0.4, 0.1, 0x888888, -2, 0.55, -21.5);
    }

    function buildFloor() {
      floorGroup.add(new THREE.AmbientLight(0xffffff, 0.55));
      const sun = new THREE.DirectionalLight(0xffe8c0, 0.9);
      sun.position.set(10, 20, 10);
      sun.castShadow = true;
      floorGroup.add(sun);
      const fill = new THREE.DirectionalLight(0xc0d8ff, 0.3);
      fill.position.set(-10, 10, -10);
      floorGroup.add(fill);

      roomDefs.forEach(r => {
        const fgeo = new THREE.BoxGeometry(r.w, 0.12, r.d);
        const fmat = new THREE.MeshLambertMaterial({ color: r.fc });
        const floor = new THREE.Mesh(fgeo, fmat);
        floor.position.set(r.x, -0.06, r.z);
        floor.receiveShadow = true;
        floor.userData = { roomId: r.id };
        floorGroup.add(floor);

        const cgeo = new THREE.BoxGeometry(r.w - 0.1, 0.08, r.d - 0.1);
        const cmat = new THREE.MeshLambertMaterial({ color: 0xf8f5f0, transparent: true, opacity: 0.18 });
        const ceil = new THREE.Mesh(cgeo, cmat);
        ceil.position.set(r.x, wallH, r.z);
        floorGroup.add(ceil);

        const wmat = new THREE.MeshLambertMaterial({ color: r.wc });
        addWall(r.w, wallH, W, r.x, wallH / 2, r.z - r.d / 2, wmat); // North
        addWall(r.w, wallH, W, r.x, wallH / 2, r.z + r.d / 2, wmat); // South
        addWall(W, wallH, r.d, r.x - r.w / 2, wallH / 2, r.z, wmat); // West
        addWall(W, wallH, r.d, r.x + r.w / 2, wallH / 2, r.z, wmat); // East

        addLabel(r);
      });

      addPLight(0xfff5d0, 0.8, -2, 2.5, 18);    // living
      addPLight(0xfff5d0, 0.7, -2, 2.5, 5);     // dining
      addPLight(0xffffff, 0.8, -3, 2.5, -8);    // kitchen
      addPLight(0xffe8b0, 0.7, -16, 2.5, -5);   // bed1
      addPLight(0xffe8b0, 0.8, 10, 2.5, -5);    // bed2
      addPLight(0xffe8b0, 0.7, 10, 2.5, 14);    // bed3
      addPLight(0x88ffaa, 0.5, -2, 2, -21);     // balcony

      addFurnitureAll();
    }

    buildFloor();

    // Controls state
    const state = {
      mode: 'walkthrough',
      yaw: 180, pitch: 0, fov: 70,
      camPos: new THREE.Vector3(-2, 1.65, 18),
      targetPos: new THREE.Vector3(-2, 1.65, 18),
      lerpT: 0,
      orbitTheta: 0.3, orbitPhi: 0.9, orbitR: 38,
      isDrag: false, px: 0, py: 0
    };

    threeRef.current = state;
    camera.position.set(-2, 1.65, 18);

    // Initial setup for mode
    floorGroup.children.forEach(c => { if (c.userData && c.userData.isLabel) c.visible = false; });

    // Events
    const handleDown = (clientX, clientY) => {
      state.isDrag = true; state.px = clientX; state.py = clientY;
    };
    const handleMove = (clientX, clientY) => {
      if (!state.isDrag) return;
      const dx = (clientX - state.px) * 0.35, dy = (clientY - state.py) * 0.25;
      state.px = clientX; state.py = clientY;
      if (state.mode === 'walkthrough') {
        state.yaw -= dx;
        state.pitch = Math.max(-55, Math.min(55, state.pitch - dy));
      } else {
        state.orbitTheta -= dx * 0.01;
        state.orbitPhi = Math.max(0.2, Math.min(1.4, state.orbitPhi + dy * 0.01));
      }
    };
    const handleUp = () => { state.isDrag = false; };

    const onMouseDown = e => handleDown(e.clientX, e.clientY);
    const onMouseMove = e => handleMove(e.clientX, e.clientY);
    const onMouseUp = () => handleUp();
    
    const onTouchStart = e => handleDown(e.touches[0].clientX, e.touches[0].clientY);
    const onTouchMove = e => handleMove(e.touches[0].clientX, e.touches[0].clientY);
    const onTouchEnd = () => handleUp();

    const onWheel = e => {
      if (state.mode === 'walkthrough') {
        state.fov = Math.max(40, Math.min(100, state.fov + e.deltaY * 0.05));
      } else {
        state.orbitR = Math.max(15, Math.min(70, state.orbitR + e.deltaY * 0.05));
      }
      camera.fov = state.fov; camera.updateProjectionMatrix();
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    canvas.addEventListener('wheel', onWheel, { passive: true });

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    threeRef.current.doZoom = (dir) => {
      if (state.mode === 'walkthrough') {
        state.fov = Math.max(40, Math.min(100, state.fov - dir * 8));
      } else {
        state.orbitR = Math.max(15, Math.min(70, state.orbitR - dir * 5));
      }
      camera.fov = state.fov; camera.updateProjectionMatrix();
    };

    threeRef.current.setMode = (m) => {
      state.mode = m;
      floorGroup.children.forEach(c => {
        if (c.userData && c.userData.isLabel) c.visible = (m === 'topdown');
      });

      if (m === 'topdown') {
        camera.position.set(0, 30, 10);
        camera.lookAt(0, 0, 0);
        state.fov = 55; camera.fov = state.fov; camera.updateProjectionMatrix();
      } else {
        camera.position.copy(state.camPos);
        state.fov = 70; camera.fov = state.fov; camera.updateProjectionMatrix();
      }
    };

    threeRef.current.gotoRoom = (id) => {
      const c = roomCamPos[id];
      state.targetPos.set(c.x, c.y, c.z);
      state.yaw = c.yaw; state.pitch = 0; state.lerpT = 0;
    };

    let reqId;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      if (state.mode === 'walkthrough') {
        if (state.lerpT < 1) {
          state.lerpT = Math.min(1, state.lerpT + 0.05);
          state.camPos.lerp(state.targetPos, 0.08);
        }
        camera.position.copy(state.camPos);
        const yr = THREE.MathUtils.degToRad(state.yaw);
        const pr = THREE.MathUtils.degToRad(state.pitch);
        camera.lookAt(
          state.camPos.x + Math.sin(yr) * Math.cos(pr),
          state.camPos.y + Math.sin(pr),
          state.camPos.z - Math.cos(yr) * Math.cos(pr)
        );
      } else {
        const x = state.orbitR * Math.sin(state.orbitTheta) * Math.sin(state.orbitPhi);
        const y = state.orbitR * Math.cos(state.orbitPhi);
        const z = state.orbitR * Math.cos(state.orbitTheta) * Math.sin(state.orbitPhi);
        camera.position.set(x, y, z);
        camera.lookAt(0, 0, 0);
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      canvas.removeEventListener('wheel', onWheel);
      renderer.dispose();
    };
  }, []);

  const handleSetMode = (m) => {
    setModeState(m);
    if (threeRef.current) threeRef.current.setMode(m);
  };

  const handleGotoRoom = (id) => {
    setActiveRoom(id);
    setInfo(panelInfo[id]);
    if (threeRef.current) threeRef.current.gotoRoom(id);
  };

  const handleZoom = (dir) => {
    if (threeRef.current) threeRef.current.doZoom(dir);
  };

  return (
    <div className="floor-plan-container">
      <div className="fp-navbar">
        <div className="fp-logo flex items-center">
          <img src="/logo/whitewolflogo.png" alt="Logo" className="h-10 w-auto mr-3" />
          White Wolf <span className="ml-1">— B Layout</span>
        </div>
        <div className="fp-nav-right">
          <button 
            className={`fp-view-btn ${mode === 'walkthrough' ? 'active' : ''}`}
            onClick={() => handleSetMode('walkthrough')}
          >
            🚶 Walkthrough
          </button>
          <button 
            className={`fp-view-btn ${mode === 'topdown' ? 'active' : ''}`}
            onClick={() => handleSetMode('topdown')}
          >
            📐 Top-Down 3D
          </button>
        </div>
      </div>

      <canvas ref={mountRef} className="fp-canvas"></canvas>

      <div className="fp-info-panel">
        <h3>{info.name}</h3>
        <p dangerouslySetInnerHTML={{ __html: info.desc }}></p>
        <div className="fp-badge">3 BHK — B Layout</div>
      </div>

      <div className="fp-hint">
        {mode === 'walkthrough' ? '🖱️ Drag to look around · Scroll to zoom' : '🖱️ Drag to orbit · Scroll to zoom'}
      </div>

      <div className="fp-room-list">
        {Object.keys(roomCamPos).map((id) => (
          <button 
            key={id}
            className={`fp-r-btn ${activeRoom === id ? 'active' : ''}`}
            onClick={() => handleGotoRoom(id)}
          >
            {id === 'living' && '🛋️ Living'}
            {id === 'dining' && '🍽️ Dining'}
            {id === 'kitchen' && '🍳 Kitchen'}
            {id === 'bed1' && '🛏️ Bed 1'}
            {id === 'bed2' && '🛏️ Bed 2'}
            {id === 'bed3' && '🛏️ Bed 3'}
            {id === 'balcony' && '🌿 Balcony'}
          </button>
        ))}
      </div>

      <div className="fp-zooms">
        <button className="fp-z-btn" onClick={() => handleZoom(-1)}>+</button>
        <button className="fp-z-btn" onClick={() => handleZoom(1)}>−</button>
      </div>
    </div>
  );
}
