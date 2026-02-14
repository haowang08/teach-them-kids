import { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Fish {
  id: string;
  mesh: THREE.Group;
  color: string;
  speed: number;
  direction: THREE.Vector3;
  targetPos: THREE.Vector3;
}

interface Decoration {
  id: string;
  type: 'plant' | 'rock' | 'treasure';
  mesh: THREE.Group;
}

interface ShopItem {
  id: string;
  name: string;
  type: 'fish' | 'plant' | 'rock' | 'treasure';
  cost: number;
  icon: string;
  description: string;
}

interface MathChallenge {
  equation: string;
  answer: number;
  reward: number;
  hint: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const SHOP_ITEMS: ShopItem[] = [
  { id: 'goldfish', name: 'Goldfish', type: 'fish', cost: 10, icon: '🐟', description: 'A cheerful orange fish' },
  { id: 'bluefish', name: 'Blue Tang', type: 'fish', cost: 15, icon: '🐠', description: 'A beautiful blue swimmer' },
  { id: 'angelfish', name: 'Angelfish', type: 'fish', cost: 20, icon: '🐟', description: 'An elegant striped fish' },
  { id: 'clownfish', name: 'Clownfish', type: 'fish', cost: 25, icon: '🐠', description: 'A colorful orange & white fish' },
  { id: 'plant1', name: 'Seaweed', type: 'plant', cost: 5, icon: '🌿', description: 'Swaying green plants' },
  { id: 'plant2', name: 'Coral', type: 'plant', cost: 10, icon: '🪸', description: 'Pink coral decoration' },
  { id: 'rock1', name: 'Small Rock', type: 'rock', cost: 5, icon: '🪨', description: 'A smooth pebble' },
  { id: 'rock2', name: 'Big Rock', type: 'rock', cost: 8, icon: '🪨', description: 'A large boulder' },
  { id: 'treasure', name: 'Treasure Chest', type: 'treasure', cost: 30, icon: '💎', description: 'A shiny treasure chest!' },
];

const FISH_COLORS: Record<string, number> = {
  goldfish: 0xff8c00,
  bluefish: 0x0077be,
  angelfish: 0xffd700,
  clownfish: 0xff4500,
};

function generateMathChallenge(): MathChallenge {
  const templates = [
    // Simple: x + a = b
    () => {
      const x = Math.floor(Math.random() * 10) + 1;
      const a = Math.floor(Math.random() * 10) + 1;
      const b = x + a;
      return {
        equation: `x + ${a} = ${b}`,
        answer: x,
        reward: 10,
        hint: `Subtract ${a} from both sides`,
      };
    },
    // Simple: x - a = b
    () => {
      const x = Math.floor(Math.random() * 15) + 5;
      const a = Math.floor(Math.random() * (x - 1)) + 1;
      const b = x - a;
      return {
        equation: `x - ${a} = ${b}`,
        answer: x,
        reward: 10,
        hint: `Add ${a} to both sides`,
      };
    },
    // Medium: ax = b
    () => {
      const a = Math.floor(Math.random() * 5) + 2;
      const x = Math.floor(Math.random() * 8) + 1;
      const b = a * x;
      return {
        equation: `${a}x = ${b}`,
        answer: x,
        reward: 15,
        hint: `Divide both sides by ${a}`,
      };
    },
    // Medium: x/a = b
    () => {
      const a = Math.floor(Math.random() * 5) + 2;
      const b = Math.floor(Math.random() * 8) + 1;
      const x = a * b;
      return {
        equation: `x / ${a} = ${b}`,
        answer: x,
        reward: 15,
        hint: `Multiply both sides by ${a}`,
      };
    },
    // Hard: ax + b = c
    () => {
      const a = Math.floor(Math.random() * 4) + 2;
      const x = Math.floor(Math.random() * 6) + 1;
      const b = Math.floor(Math.random() * 10) + 1;
      const c = a * x + b;
      return {
        equation: `${a}x + ${b} = ${c}`,
        answer: x,
        reward: 20,
        hint: `First subtract ${b}, then divide by ${a}`,
      };
    },
    // Hard: ax - b = c
    () => {
      const a = Math.floor(Math.random() * 4) + 2;
      const x = Math.floor(Math.random() * 6) + 2;
      const b = Math.floor(Math.random() * 8) + 1;
      const c = a * x - b;
      return {
        equation: `${a}x - ${b} = ${c}`,
        answer: x,
        reward: 20,
        hint: `First add ${b}, then divide by ${a}`,
      };
    },
  ];

  const template = templates[Math.floor(Math.random() * templates.length)];
  return template();
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

function createFishMesh(colorHex: number): THREE.Group {
  const group = new THREE.Group();

  // Body (elongated sphere)
  const bodyGeom = new THREE.SphereGeometry(0.3, 16, 12);
  bodyGeom.scale(1.5, 1, 0.8);
  const bodyMat = new THREE.MeshPhongMaterial({
    color: colorHex,
    shininess: 60,
    specular: 0x444444
  });
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  group.add(body);

  // Tail (cone)
  const tailGeom = new THREE.ConeGeometry(0.2, 0.4, 8);
  const tailMat = new THREE.MeshPhongMaterial({
    color: colorHex,
    shininess: 40
  });
  const tail = new THREE.Mesh(tailGeom, tailMat);
  tail.rotation.z = Math.PI / 2;
  tail.position.x = -0.5;
  group.add(tail);

  // Dorsal fin
  const finGeom = new THREE.ConeGeometry(0.1, 0.25, 4);
  const finMat = new THREE.MeshPhongMaterial({
    color: colorHex,
    shininess: 40,
    transparent: true,
    opacity: 0.8
  });
  const dorsalFin = new THREE.Mesh(finGeom, finMat);
  dorsalFin.position.y = 0.25;
  dorsalFin.position.x = 0.1;
  group.add(dorsalFin);

  // Eyes
  const eyeGeom = new THREE.SphereGeometry(0.06, 8, 8);
  const eyeMat = new THREE.MeshPhongMaterial({ color: 0xffffff });
  const pupilGeom = new THREE.SphereGeometry(0.03, 8, 8);
  const pupilMat = new THREE.MeshPhongMaterial({ color: 0x000000 });

  const leftEye = new THREE.Mesh(eyeGeom, eyeMat);
  leftEye.position.set(0.3, 0.08, 0.15);
  const leftPupil = new THREE.Mesh(pupilGeom, pupilMat);
  leftPupil.position.set(0.35, 0.08, 0.17);

  const rightEye = new THREE.Mesh(eyeGeom, eyeMat);
  rightEye.position.set(0.3, 0.08, -0.15);
  const rightPupil = new THREE.Mesh(pupilGeom, pupilMat);
  rightPupil.position.set(0.35, 0.08, -0.17);

  group.add(leftEye, leftPupil, rightEye, rightPupil);

  return group;
}

function createPlantMesh(type: string): THREE.Group {
  const group = new THREE.Group();

  if (type === 'plant1') {
    // Seaweed - multiple tall cylinders
    for (let i = 0; i < 3; i++) {
      const height = 0.8 + Math.random() * 0.6;
      const geom = new THREE.CylinderGeometry(0.03, 0.05, height, 8);
      const mat = new THREE.MeshPhongMaterial({
        color: 0x228b22,
        shininess: 30
      });
      const stem = new THREE.Mesh(geom, mat);
      stem.position.set((i - 1) * 0.15, height / 2, 0);
      stem.rotation.z = (Math.random() - 0.5) * 0.3;
      group.add(stem);
    }
  } else {
    // Coral - branching structure
    const colors = [0xff69b4, 0xff1493, 0xdb7093];
    for (let i = 0; i < 5; i++) {
      const geom = new THREE.CylinderGeometry(0.02, 0.08, 0.4 + Math.random() * 0.3, 6);
      const mat = new THREE.MeshPhongMaterial({
        color: colors[i % colors.length],
        shininess: 50
      });
      const branch = new THREE.Mesh(geom, mat);
      const angle = (i / 5) * Math.PI * 2;
      branch.position.set(Math.cos(angle) * 0.1, 0.2, Math.sin(angle) * 0.1);
      branch.rotation.x = (Math.random() - 0.5) * 0.5;
      branch.rotation.z = (Math.random() - 0.5) * 0.5;
      group.add(branch);
    }
  }

  return group;
}

function createRockMesh(type: string): THREE.Group {
  const group = new THREE.Group();

  const size = type === 'rock1' ? 0.2 : 0.35;
  const geom = new THREE.DodecahedronGeometry(size, 0);
  const mat = new THREE.MeshPhongMaterial({
    color: 0x808080,
    flatShading: true
  });
  const rock = new THREE.Mesh(geom, mat);
  rock.scale.set(1, 0.7, 1);
  group.add(rock);

  if (type === 'rock2') {
    const smallGeom = new THREE.DodecahedronGeometry(0.15, 0);
    const smallRock = new THREE.Mesh(smallGeom, mat);
    smallRock.position.set(0.2, -0.1, 0.1);
    group.add(smallRock);
  }

  return group;
}

function createTreasureMesh(): THREE.Group {
  const group = new THREE.Group();

  // Chest body
  const bodyGeom = new THREE.BoxGeometry(0.5, 0.3, 0.35);
  const bodyMat = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
  const body = new THREE.Mesh(bodyGeom, bodyMat);
  body.position.y = 0.15;
  group.add(body);

  // Chest lid (half cylinder)
  const lidGeom = new THREE.CylinderGeometry(0.175, 0.175, 0.5, 16, 1, false, 0, Math.PI);
  const lidMat = new THREE.MeshPhongMaterial({ color: 0x8b4513 });
  const lid = new THREE.Mesh(lidGeom, lidMat);
  lid.rotation.z = Math.PI / 2;
  lid.rotation.y = Math.PI / 2;
  lid.position.y = 0.3;
  group.add(lid);

  // Gold trim
  const trimGeom = new THREE.BoxGeometry(0.52, 0.05, 0.37);
  const trimMat = new THREE.MeshPhongMaterial({ color: 0xffd700, shininess: 100 });
  const trim = new THREE.Mesh(trimGeom, trimMat);
  trim.position.y = 0.15;
  group.add(trim);

  // Lock
  const lockGeom = new THREE.BoxGeometry(0.08, 0.1, 0.05);
  const lockMat = new THREE.MeshPhongMaterial({ color: 0xffd700, shininess: 100 });
  const lock = new THREE.Mesh(lockGeom, lockMat);
  lock.position.set(0, 0.25, 0.18);
  group.add(lock);

  return group;
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function AquariumBuilder() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number>(0);
  const fishRef = useRef<Fish[]>([]);
  const decorationsRef = useRef<Decoration[]>([]);
  const tankRef = useRef<THREE.Group | null>(null);

  const [coins, setCoins] = useState(20); // Starting coins (reduced to encourage solving)
  const [totalFish, setTotalFish] = useState(0);
  const [totalDecorations, setTotalDecorations] = useState(0);
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [currentChallenge, setCurrentChallenge] = useState<MathChallenge>(() => generateMathChallenge());
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [streak, setStreak] = useState(0);
  const [challengesSolved, setChallengesSolved] = useState(0);

  // Tank boundaries
  const TANK_WIDTH = 4;
  const TANK_HEIGHT = 2.5;
  const TANK_DEPTH = 2;

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const width = container.clientWidth;
    const height = Math.min(280, container.clientWidth * 0.5); // Shorter for mobile

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a3d62);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x6699cc, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x00bfff, 0.5, 10);
    pointLight.position.set(0, 2, 2);
    scene.add(pointLight);

    // Create aquarium tank
    const tankGroup = new THREE.Group();
    tankRef.current = tankGroup;

    // Tank glass (wireframe box)
    const glassGeom = new THREE.BoxGeometry(TANK_WIDTH, TANK_HEIGHT, TANK_DEPTH);
    const glassMat = new THREE.MeshPhongMaterial({
      color: 0x88ccff,
      transparent: true,
      opacity: 0.2,
      side: THREE.BackSide,
    });
    const glassBox = new THREE.Mesh(glassGeom, glassMat);
    tankGroup.add(glassBox);

    // Tank edges
    const edgesGeom = new THREE.EdgesGeometry(glassGeom);
    const edgesMat = new THREE.LineBasicMaterial({ color: 0x4a90d9, linewidth: 2 });
    const edges = new THREE.LineSegments(edgesGeom, edgesMat);
    tankGroup.add(edges);

    // Sand floor
    const sandGeom = new THREE.PlaneGeometry(TANK_WIDTH - 0.1, TANK_DEPTH - 0.1);
    const sandMat = new THREE.MeshPhongMaterial({
      color: 0xd4a574,
      shininess: 10
    });
    const sand = new THREE.Mesh(sandGeom, sandMat);
    sand.rotation.x = -Math.PI / 2;
    sand.position.y = -TANK_HEIGHT / 2 + 0.01;
    tankGroup.add(sand);

    // Water surface effect (subtle)
    const waterGeom = new THREE.PlaneGeometry(TANK_WIDTH - 0.1, TANK_DEPTH - 0.1);
    const waterMat = new THREE.MeshPhongMaterial({
      color: 0x00bfff,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
    });
    const water = new THREE.Mesh(waterGeom, waterMat);
    water.rotation.x = -Math.PI / 2;
    water.position.y = TANK_HEIGHT / 2 - 0.05;
    tankGroup.add(water);

    // Bubbles (simple spheres)
    for (let i = 0; i < 8; i++) {
      const bubbleGeom = new THREE.SphereGeometry(0.03 + Math.random() * 0.02, 8, 8);
      const bubbleMat = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.4,
      });
      const bubble = new THREE.Mesh(bubbleGeom, bubbleMat);
      bubble.position.set(
        (Math.random() - 0.5) * (TANK_WIDTH - 0.5),
        (Math.random() - 0.5) * TANK_HEIGHT,
        (Math.random() - 0.5) * (TANK_DEPTH - 0.5)
      );
      bubble.userData.speed = 0.005 + Math.random() * 0.01;
      bubble.userData.startX = bubble.position.x;
      tankGroup.add(bubble);
    }

    scene.add(tankGroup);

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001; // Time in seconds

      // Animate fish with smooth, natural swimming
      for (const fish of fishRef.current) {
        // Smooth lerp towards target (much slower, more natural)
        const lerpFactor = 0.008 + fish.speed * 0.5; // Very gentle movement
        fish.mesh.position.lerp(fish.targetPos, lerpFactor);

        // Check if close to target, pick new target (larger threshold for smoother transitions)
        if (fish.mesh.position.distanceTo(fish.targetPos) < 0.3) {
          fish.targetPos = new THREE.Vector3(
            (Math.random() - 0.5) * (TANK_WIDTH - 1),
            (Math.random() - 0.5) * (TANK_HEIGHT - 0.8),
            (Math.random() - 0.5) * (TANK_DEPTH - 0.6)
          );
        }

        // Smoothly rotate to face movement direction
        const direction = new THREE.Vector3()
          .subVectors(fish.targetPos, fish.mesh.position)
          .normalize();
        if (direction.length() > 0.01) {
          const targetQuat = new THREE.Quaternion();
          const lookMatrix = new THREE.Matrix4().lookAt(
            fish.mesh.position,
            new THREE.Vector3().addVectors(fish.mesh.position, direction),
            new THREE.Vector3(0, 1, 0)
          );
          targetQuat.setFromRotationMatrix(lookMatrix);
          fish.mesh.quaternion.slerp(targetQuat, 0.02); // Slow rotation
        }

        // Gentle swimming undulation (tail wagging effect)
        const swimPhase = time * 2 + parseFloat(fish.id) * 100;
        fish.mesh.rotation.z = Math.sin(swimPhase) * 0.08;
        // Subtle up/down bob
        fish.mesh.position.y += Math.sin(swimPhase * 0.7) * 0.001;
      }

      // Animate bubbles
      tankGroup.children.forEach((child: THREE.Object3D) => {
        if (child.userData.speed) {
          child.position.y += child.userData.speed;
          child.position.x = child.userData.startX + Math.sin(Date.now() * 0.003 + child.position.y) * 0.05;
          if (child.position.y > TANK_HEIGHT / 2) {
            child.position.y = -TANK_HEIGHT / 2;
          }
        }
      });

      // Gentle water ripple
      if (water) {
        water.position.y = TANK_HEIGHT / 2 - 0.05 + Math.sin(Date.now() * 0.002) * 0.02;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = Math.min(280, newWidth * 0.5);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  // Add fish to tank
  const addFish = useCallback((itemId: string) => {
    if (!sceneRef.current || !tankRef.current) return;

    const colorHex = FISH_COLORS[itemId] || 0xff8c00;
    const fishMesh = createFishMesh(colorHex);

    // Random starting position
    fishMesh.position.set(
      (Math.random() - 0.5) * (TANK_WIDTH - 1),
      (Math.random() - 0.5) * (TANK_HEIGHT - 0.5),
      (Math.random() - 0.5) * (TANK_DEPTH - 0.5)
    );

    const newFish: Fish = {
      id: generateId(),
      mesh: fishMesh,
      color: itemId,
      speed: 0.003 + Math.random() * 0.004, // Much slower for natural swimming
      direction: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize(),
      targetPos: new THREE.Vector3(
        (Math.random() - 0.5) * (TANK_WIDTH - 1),
        (Math.random() - 0.5) * (TANK_HEIGHT - 0.8),
        (Math.random() - 0.5) * (TANK_DEPTH - 0.6)
      ),
    };

    tankRef.current.add(fishMesh);
    fishRef.current = [...fishRef.current, newFish];
    setTotalFish((prev) => prev + 1);
  }, []);

  // Add decoration to tank
  const addDecoration = useCallback((item: ShopItem) => {
    if (!sceneRef.current || !tankRef.current) return;

    let mesh: THREE.Group;

    if (item.type === 'plant') {
      mesh = createPlantMesh(item.id);
    } else if (item.type === 'rock') {
      mesh = createRockMesh(item.id);
    } else {
      mesh = createTreasureMesh();
    }

    // Position on the floor
    mesh.position.set(
      (Math.random() - 0.5) * (TANK_WIDTH - 0.8),
      -TANK_HEIGHT / 2 + 0.1,
      (Math.random() - 0.5) * (TANK_DEPTH - 0.6)
    );

    const newDecoration: Decoration = {
      id: generateId(),
      type: item.type as 'plant' | 'rock' | 'treasure',
      mesh,
    };

    tankRef.current.add(mesh);
    decorationsRef.current = [...decorationsRef.current, newDecoration];
    setTotalDecorations((prev) => prev + 1);
  }, []);

  // Purchase item
  const purchaseItem = useCallback((item: ShopItem) => {
    if (coins < item.cost) {
      setFeedback({ type: 'error', message: 'Not enough coins! Solve math challenges to earn more.' });
      setTimeout(() => setFeedback(null), 2000);
      return;
    }

    setCoins((prev) => prev - item.cost);

    if (item.type === 'fish') {
      addFish(item.id);
    } else {
      addDecoration(item);
    }

    setFeedback({ type: 'success', message: `Added ${item.name} to your aquarium!` });
    setTimeout(() => setFeedback(null), 2000);
    setSelectedItem(null);
  }, [coins, addFish, addDecoration]);

  // Generate a new challenge (skip current one)
  const skipChallenge = useCallback(() => {
    setCurrentChallenge(generateMathChallenge());
    setAnswer('');
    setShowHint(false);
    setFeedback(null);
    setStreak(0); // Reset streak when skipping
  }, []);

  // Submit answer
  const submitAnswer = useCallback(() => {
    if (!currentChallenge || !answer) return;

    const numAnswer = parseInt(answer, 10);
    if (isNaN(numAnswer)) {
      setFeedback({ type: 'error', message: 'Please enter a number!' });
      return;
    }

    if (numAnswer === currentChallenge.answer) {
      const bonus = streak >= 2 ? Math.floor(currentChallenge.reward * 0.5) : 0;
      const totalReward = currentChallenge.reward + bonus;

      setCoins((prev) => prev + totalReward);
      setStreak((prev) => prev + 1);
      setChallengesSolved((prev) => prev + 1);
      setFeedback({
        type: 'success',
        message: `Correct! +${totalReward} coins${bonus > 0 ? ` (+${bonus} streak bonus!)` : ''}`
      });

      // Generate new challenge after short delay
      setTimeout(() => {
        setCurrentChallenge(generateMathChallenge());
        setAnswer('');
        setFeedback(null);
        setShowHint(false);
      }, 1200);
    } else {
      setStreak(0);
      setFeedback({ type: 'error', message: `Not quite! Answer was ${currentChallenge.answer}.` });

      // Generate new challenge after showing correct answer
      setTimeout(() => {
        setCurrentChallenge(generateMathChallenge());
        setAnswer('');
        setFeedback(null);
        setShowHint(false);
      }, 1800);
    }
  }, [currentChallenge, answer, streak]);


  return (
    <div className="rounded-xl bg-gradient-to-br from-blue-900 via-cyan-900 to-teal-900 p-4 sm:p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-2xl">🐟</span> Aquarium Builder
          </h2>
          <p className="text-xs text-cyan-300">Algebra: Solve for X</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-yellow-400 bg-yellow-900/40 rounded-full px-3 py-1 border border-yellow-600">
            🪙 {coins} coins
          </span>
          {streak > 0 && (
            <span className="text-xs font-semibold text-orange-300 bg-orange-900/40 rounded-full px-2 py-1 border border-orange-600">
              🔥 {streak} streak
            </span>
          )}
        </div>
      </div>

      {/* Math Challenge - Prominently placed at top for mobile visibility */}
      <div className="bg-gradient-to-br from-purple-900/60 to-indigo-900/60 border border-purple-600/50 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-purple-200 flex items-center gap-2">
            <span>📝</span> Solve for X to Earn Coins
          </h3>
          <span className="text-xs text-yellow-400 bg-yellow-900/40 px-2 py-0.5 rounded-full">
            🪙+{currentChallenge.reward}
          </span>
        </div>

        {/* Equation display */}
        <div className="bg-slate-900/60 rounded-lg p-3 mb-3 text-center">
          <p className="text-2xl sm:text-3xl font-mono font-bold text-cyan-300">{currentChallenge.equation}</p>
        </div>

        {/* Answer input */}
        <div className="flex gap-2 mb-2">
          <input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submitAnswer()}
            className="flex-1 bg-slate-800 border-2 border-indigo-500 rounded-lg px-3 py-2 text-lg text-white text-center font-mono
              focus:outline-none focus:border-cyan-400 transition-colors"
            placeholder="x = ?"
          />
          <button
            onClick={submitAnswer}
            disabled={!answer}
            className={`rounded-lg px-4 py-2 font-bold text-sm transition-all cursor-pointer
              ${answer
                ? 'bg-green-600 hover:bg-green-500 text-white'
                : 'bg-slate-700 text-slate-400 cursor-not-allowed'
              }`}
          >
            ✓
          </button>
        </div>

        {/* Hint and Skip buttons */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <button
              onClick={() => setShowHint(true)}
              disabled={showHint}
              className={`text-xs px-2 py-1 rounded transition-all cursor-pointer shrink-0
                ${showHint
                  ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                  : 'bg-yellow-600/30 hover:bg-yellow-600/50 text-yellow-300'
                }`}
            >
              💡 Hint
            </button>
            {showHint && (
              <span className="text-xs text-yellow-200/80 italic truncate">{currentChallenge.hint}</span>
            )}
          </div>
          <button
            onClick={skipChallenge}
            className="text-xs px-2 py-1 rounded bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 transition-all cursor-pointer shrink-0"
          >
            Skip →
          </button>
        </div>

        {/* Inline feedback */}
        {feedback && (
          <div className={`mt-2 rounded-lg p-2 text-xs font-semibold text-center
            ${feedback.type === 'success' ? 'bg-green-900/60 text-green-300' : 'bg-red-900/60 text-red-300'}`}>
            {feedback.message}
          </div>
        )}

        {challengesSolved > 0 && (
          <div className="mt-2 text-xs text-purple-300 text-center">
            ✅ {challengesSolved} solved this session
          </div>
        )}
      </div>

      {/* Stats bar */}
      <div className="flex gap-3 mb-4 text-xs">
        <div className="bg-blue-800/40 rounded-lg px-3 py-1.5 border border-blue-600/50">
          <span className="text-blue-300">🐠 Fish:</span>{' '}
          <span className="text-white font-bold">{totalFish}</span>
        </div>
        <div className="bg-green-800/40 rounded-lg px-3 py-1.5 border border-green-600/50">
          <span className="text-green-300">🌿 Decor:</span>{' '}
          <span className="text-white font-bold">{totalDecorations}</span>
        </div>
      </div>

      {/* 3D Aquarium View */}
      <div ref={containerRef} className="relative rounded-xl overflow-hidden border-4 border-cyan-700/50 mb-4 bg-blue-950">
        <canvas ref={canvasRef} className="w-full block" style={{ maxHeight: '300px' }} />
      </div>

      {/* Shop Panel */}
      <div className="bg-gradient-to-br from-teal-900/60 to-cyan-900/60 border border-teal-600/50 rounded-xl p-4">
        <h3 className="text-sm font-bold text-teal-200 mb-3 flex items-center gap-2">
          <span>🛒</span> Aquarium Shop
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {SHOP_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedItem(item)}
              disabled={coins < item.cost}
              className={`rounded-lg p-2 text-center transition-all cursor-pointer border-2
                ${selectedItem?.id === item.id
                  ? 'bg-cyan-700 border-cyan-400 shadow-lg'
                  : coins >= item.cost
                  ? 'bg-slate-800/60 border-slate-600 hover:border-cyan-500 hover:bg-slate-700/60'
                  : 'bg-slate-900/60 border-slate-700 opacity-50 cursor-not-allowed'
                }`}
            >
              <div className="text-xl mb-0.5">{item.icon}</div>
              <div className="text-[10px] text-white font-semibold truncate">{item.name}</div>
              <div className="text-[10px] text-yellow-400">🪙{item.cost}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Item Preview */}
      {selectedItem && (
        <div className="mt-4 bg-slate-800/60 border border-slate-600 rounded-xl p-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl">{selectedItem.icon}</div>
            <div className="flex-1">
              <h4 className="font-bold text-white">{selectedItem.name}</h4>
              <p className="text-xs text-slate-300">{selectedItem.description}</p>
              <p className="text-sm text-yellow-400 font-semibold mt-1">Cost: 🪙{selectedItem.cost}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => purchaseItem(selectedItem)}
                disabled={coins < selectedItem.cost}
                className={`rounded-lg px-4 py-2 font-bold text-sm transition-all cursor-pointer
                  ${coins >= selectedItem.cost
                    ? 'bg-green-600 hover:bg-green-500 text-white'
                    : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  }`}
              >
                Buy
              </button>
              <button
                onClick={() => setSelectedItem(null)}
                className="rounded-lg px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="mt-4 bg-cyan-900/30 border border-cyan-700/50 rounded-lg p-3">
        <h4 className="text-xs font-bold text-cyan-300 mb-1">Tips</h4>
        <ul className="text-xs text-cyan-200/80 space-y-0.5">
          <li>- Solve math challenges to earn coins - build your streak for bonus rewards!</li>
          <li>- Add fish and watch them swim around your 3D aquarium</li>
          <li>- Decorate with plants, rocks, and treasure chests</li>
        </ul>
      </div>
    </div>
  );
}
