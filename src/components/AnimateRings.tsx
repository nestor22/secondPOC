import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const RingsAndCube = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set up the scene
    const scene = new THREE.Scene();

    // Set up the camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Set up the renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Add the rings (using torus geometry)
    const ringGeometry = new THREE.TorusGeometry(2, 0.3, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });

    const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
    const ring2 = new THREE.Mesh(ringGeometry, ringMaterial);
    const ring3 = new THREE.Mesh(ringGeometry, ringMaterial);

    // Set different positions for each ring
    ring1.position.y = -2;
    ring2.position.y = -1;
    ring3.position.y = 0;

    scene.add(ring1);
    scene.add(ring2);
    scene.add(ring3);

    // Add the cube (using box geometry)
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.y = 1.5;
    scene.add(cube);

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the rings and cube
      ring1.rotation.x += 0.01;
      ring1.rotation.y += 0.01;

      ring2.rotation.x += 0.01;
      ring2.rotation.y += 0.01;

      ring3.rotation.x += 0.01;
      ring3.rotation.y += 0.01;

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      // Render the scene
      renderer.render(scene, camera);
    };

    animate();

    // Clean up on component unmount
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} />;
};

export default RingsAndCube;