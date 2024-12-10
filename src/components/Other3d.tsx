import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Other3d = ({ ringColor = "#ffffff", cubeColor = "#00ffcc" }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Configuración básica de la escena, cámara y renderizador
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10); // Vista desde arriba

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
    const ringGeometry = new THREE.TorusGeometry(3, 0.2, 16, 100); // Radio del aro, grosor
    const ringMaterial = new THREE.MeshBasicMaterial({ color: ringColor, transparent: true, opacity: 0.8 });

    const rings = [];
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2; // Aseguramos que los aros estén planos
      ring.position.y = i * 1.5; // Separación entre los aros
      scene.add(ring);
      rings.push(ring);
    }

    // Creación del cubo flotante sobre los aros
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: cubeColor });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(0, 3, 0); // Centrado sobre los aros
    scene.add(cube);

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotar los aros
      rings.forEach((ring, index) => {
        ring.rotation.z += 0.01 * (index + 1); // Velocidad de rotación variable
      });

      // Rotar el cubo
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Limpieza
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [ringColor, cubeColor]);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
};

export default Other3d;
