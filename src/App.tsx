import React from 'react';
import { WebGLRenderer, Scene, PerspectiveCamera, BoxGeometry, MeshNormalMaterial, Mesh } from 'three';

class App extends React.Component {
  private scene: Scene | null = null;
  private camera: PerspectiveCamera | null = null;
  private renderer: WebGLRenderer | null = null;

  constructor(props: any) {
    super(props);
    this.animate = this.animate.bind(this);
  }

  onCanvasLoaded = (canvas: HTMLCanvasElement) => {
    if (!canvas) {
      return;
    }
    this.renderer = new WebGLRenderer({ canvas: canvas, antialias: true });
    this.scene = new Scene();
    // new THREE.PerspectiveCamera(視野角, アスペクト比, near, far)
    this.camera = new PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 1, 2000);

    // 箱を作成
    const geometry = new BoxGeometry(400, 400, 400);
    const material = new MeshNormalMaterial();
    const box = new Mesh(geometry, material);
    this.scene.add(box);

    this.animate()
  };

  animate() {
    window.requestAnimationFrame(this.animate);
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  render():
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | string
    | number
    | {}
    | React.ReactNodeArray
    | React.ReactPortal
    | boolean
    | null
    | undefined {
    return (
      <div>
        <canvas ref={this.onCanvasLoaded} />
      </div>
    );
  }
}

export default App;