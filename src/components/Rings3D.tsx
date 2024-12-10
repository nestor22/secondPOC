import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader"; // Para cargar SVG


const RingsWithSVG = ({ ringColor = "#ffffff", svgPath = "/path-to-your-svg.svg" }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Configuración básica de escena, cámara y renderizador
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Luz ambiental
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(ambientLight, pointLight);

    // Creación de los aros (usando geometría Torus)
    const ringGeometry = new THREE.TorusGeometry(3, 0.1, 16, 100); // Radio del aro, grosor
    const ringMaterial = new THREE.MeshBasicMaterial({ color: ringColor, transparent: true, opacity: 0.8 });

    const rings = [];
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2; // Posición vertical
      ring.position.y = i * 1.5; // Separación entre aros
      scene.add(ring);
      rings.push(ring);
    }

    // Agregar el SVG cargado
    const loader = new SVGLoader();
    loader.load(
      svgPath,
      (data) => {
        const paths = data.paths;
        const svgGroup = new THREE.Group();
        paths.forEach((path) => {
          const material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
          const shapes = path.toShapes(true);
          shapes.forEach((shape) => {
            const geometry = new THREE.ShapeGeometry(shape);
            const mesh = new THREE.Mesh(geometry, material);
            svgGroup.add(mesh);
          });
        });
        svgGroup.scale.set(0.05, 0.05, 0.05); // Escalar el SVG
        svgGroup.position.set(0, 2.5, 0); // Centrarlo sobre los aros
        scene.add(svgGroup);
      },
      undefined,
      (error) => {
        console.error("Error cargando el SVG:", error);
      }
    );

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotar los aros
      rings.forEach((ring, index) => {
        ring.rotation.z += 0.01 * (index + 1); // Velocidad de rotación variable
      });

      renderer.render(scene, camera);
    };

    animate();

    // Limpieza
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [ringColor, svgPath]);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
};

export default RingsWithSVG;