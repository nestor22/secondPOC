import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const WinnerCircle3D = ({ logo }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Configuración básica de Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Monta el renderizador en el DOM
    mountRef.current.appendChild(renderer.domElement);

    // Añadir luz
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9); // Luz suave
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1); // Luz puntual
    pointLight.position.set(5, 9, 5);
    scene.add(pointLight);

    // Crear toros (círculos)
    const createTorus = (radius, tube, radialSegments, tubularSegments, color, positionY) => {
      const geometry = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments);
      const material = new THREE.MeshStandardMaterial({ color });
      const torus = new THREE.Mesh(geometry, material);
      torus.rotation.x = Math.PI / 2; // Rotar para que se vea como un óvalo
      torus.position.y = positionY;
      return torus;
    };

    const circle1 = createTorus(3, 0.3, 5, 100, 0x666666, -2); // Círculo grande
    const circle2 = createTorus(2, 0.2, 11, 100, 0x666666, -3); // Círculo mediano
    const circle3 = createTorus(2, 0.2, 11, 100, 0x999999, -4); // Círculo pequeño

    scene.add(circle1, circle2, circle3);

    // Crear el logo (textura)
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(logo, (texture) => {
      const planeGeometry = new THREE.PlaneGeometry(3, 3); // Tamaño del logo
      const planeMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
      const logoPlane = new THREE.Mesh(planeGeometry, planeMaterial);
      logoPlane.position.set(0, 0, 0); // Ajustar posición del logo
      scene.add(logoPlane);
    });

    // Configuración de la cámara
    camera.position.z = 10;

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotación para añadir dinamismo
      circle1.rotation.z += 0.01;
      circle2.rotation.z += 0.01;
      circle3.rotation.z += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [logo]);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
};

export default WinnerCircle3D;
