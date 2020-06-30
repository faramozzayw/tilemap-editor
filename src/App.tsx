import React, { useEffect } from "react";
import "./styles.css";

import * as THREE from "three";

import { EditorNavbar, EditorTabs } from "./components";
import { $ } from "./utils";

const App = () => {
  useEffect(() => {
    const canvas = $("canvas")[0] as HTMLCanvasElement;
    const { clientHeight, clientWidth } = canvas;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      clientWidth / clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(clientWidth, clientHeight);

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);

    scene.add(cube);
    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return (
    <>
      <section className="hero is-black is-fullheight">
        <div className="hero-head">
          <EditorNavbar />
        </div>

        <div className="hero-body is-paddingless" id="canvas-wrapper">
          <canvas />
        </div>

        <div className="hero-foot">
          <EditorTabs />
        </div>
      </section>
    </>
  );
};

export default App;
