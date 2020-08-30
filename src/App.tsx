import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {VRButton} from 'three/examples/jsm/webxr/VRButton.js';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';



const App = () => {
  /** case1 */
  const createBox = () => {
    // サイズを指定
    const width = 960;
    const height = 540;

    // レンダラを作成
    const renderer: any = new THREE.WebGLRenderer({
      canvas: document.querySelector("#nyumon-sample1") as HTMLCanvasElement
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 50);
    camera.position.set(0, 1.60, 0);

    // const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    // directionalLight.position.set( -1, 2, 4 );
    // scene.add( directionalLight );

    // 箱を作成
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshNormalMaterial();
    const box = new THREE.Mesh(geometry, material);
    scene.add(box);

    new OrbitControls(camera, renderer.domElement);

    function onSelectStart(this:any) {
      this.userData.isSelecting = true;

    }

    function onSelectEnd(this:any) {
      this.userData.isSelecting = false;
    }

    const buildController = function ( data:any ) {

      switch ( data.targetRayMode ) {

        case 'tracked-pointer': {

          const geometry = new THREE.BufferGeometry();
          geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( [ 0, 0, 0, 0, 0, - 1 ], 3 ) );
          geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( [ 0.5, 0.5, 0.5, 0, 0, 0 ], 3 ) );

          const material = new THREE.LineBasicMaterial( { vertexColors: true, blending: THREE.AdditiveBlending } );

          return new THREE.Line( geometry, material );
        }
        case 'gaze':

          const geometry = new THREE.RingBufferGeometry( 0.02, 0.04, 32 ).translate( 0, 0, - 1 );
          const material = new THREE.MeshBasicMaterial( { opacity: 0.5, transparent: true } );
          return new THREE.Mesh( geometry, material );

      }

    }
    const controller1 = renderer.xr.getController( 0 );
    console.log(controller1);
    controller1.addEventListener( 'selectstart', onSelectStart );
    controller1.addEventListener( 'selectend', onSelectEnd );
    controller1.addEventListener( 'connected', function ( event:any ) {
      controller1.add(buildController( event.data ))
    } );
    controller1.addEventListener( 'disconnected', function () {
      controller1.remove( controller1.children[ 0 ] );
    } );
    scene.add( controller1 );
    const controllerModelFactory = new XRControllerModelFactory();

    const controllerGrip1 = renderer.xr.getControllerGrip( 0 );
    controllerGrip1.add( controllerModelFactory.createControllerModel( controllerGrip1 ) );
    scene.add( controllerGrip1 );
        
    renderer.xr.enabled = true;
    document.body.appendChild( VRButton.createButton( renderer ) );

    const render = () => {
      renderer.render( scene, camera );
      //console.log('render');
    }
    renderer.setAnimationLoop( render );

    // tick();

    // 毎フレーム時に実行されるループイベント
    /* function tick() {
      // box.rotation.y += 0.01;
      renderer.render(scene, camera); // レンダリング

      requestAnimationFrame(tick);
    } */
  };

  /** case2 */
  const createBox2 = () => {
    // サイズを指定
    const width = 960;
    const height = 540;

    // レンダラを作成
    const renderer: any = new THREE.WebGLRenderer({
      canvas: document.querySelector("#nyumon-sample2") as HTMLCanvasElement
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, +1000);

    // 箱を作成
    const geometry = new THREE.BoxGeometry(400, 400, 400);
    const material = new THREE.MeshNormalMaterial();
    const box = new THREE.Mesh(geometry, material);
    scene.add(box);

    tick();

    // 毎フレーム時に実行されるループイベント
    function tick() {
      box.rotation.y += 0.01;
      box.rotation.z += 0.01;
      renderer.render(scene, camera); // レンダリング

      requestAnimationFrame(tick);
    }
  };

  /** case3 */
  const createBox3 = () => {
    // サイズを指定
    const width = 960;
    const height = 540;

    // レンダラを作成
    const renderer: any = new THREE.WebGLRenderer({
      canvas: document.querySelector("#nyumon-sample3") as HTMLCanvasElement
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, +1000);

    // 箱を作成
    const geometry = new THREE.BoxGeometry(400, 400, 400);
    const material = new THREE.MeshNormalMaterial();
    const box = new THREE.Mesh(geometry, material);
    scene.add(box);

    tick();

    // 毎フレーム時に実行されるループイベント
    function tick() {
      box.rotation.y += 0.1;
      box.rotation.x += 0.1;
      renderer.render(scene, camera); // レンダリング

      requestAnimationFrame(tick);
    }
  };

  /** case4 */
  const createBox4 = () => {
    // サイズを指定
    const width = 960;
    const height = 540;

    // レンダラを作成
    const renderer: any = new THREE.WebGLRenderer({
      canvas: document.querySelector("#nyumon-sample4") as HTMLCanvasElement
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, +1000);

    // 箱を作成
    const geometry = new THREE.BoxGeometry(400, 400, 400);
    const material = new THREE.MeshNormalMaterial();
    const box = new THREE.Mesh(geometry, material);
    scene.add(box);

    tick();

    // 毎フレーム時に実行されるループイベント
    function tick() {
      box.rotation.y += 1;
      box.rotation.x += 1;
      renderer.render(scene, camera);

      requestAnimationFrame(tick);
    }
  };

  /** case5 */
  // ここでは箱をたくさん作りたいので、箱を作っている処理のみ、関数化する。
  /** 箱をつくる */
  const createBoxFunc = (): THREE.Mesh<
    THREE.BoxGeometry,
    THREE.MeshNormalMaterial
  > => {
    const geometry = new THREE.BoxGeometry(100, 100, 100);
    const material = new THREE.MeshNormalMaterial();
    const box = new THREE.Mesh(geometry, material);
    return box;
  };

  const createBox5 = () => {
    // サイズを指定
    const width = 960;
    const height = 540;

    // レンダラを作成
    const renderer: any = new THREE.WebGLRenderer({
      canvas: document.querySelector("#nyumon-sample5") as HTMLCanvasElement
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 0, +1000);

    // 箱を作成
    let boxes: THREE.Mesh<
      THREE.BoxGeometry,
      THREE.MeshNormalMaterial
    >[] = new Array(200).fill(null).map(_ => createBoxFunc());

    boxes.forEach((v, i) => {
      v.position.x = Math.floor(Math.random() * 1200 - 600);
      v.position.y = Math.floor(Math.random() * 1200 - 600);
      v.position.x = Math.floor(Math.random() * 1200 - 600);
    });
    scene.add(...boxes);

    tick();

    // 毎フレーム時に実行されるループイベント
    function tick() {
      boxes.forEach(v => {
        v.rotation.y += 0.01;
        v.rotation.x += 0.01;
      });
      renderer.render(scene, camera);

      requestAnimationFrame(tick);
    }
  };

  // didMountの後で描画しないと、Cannot read property 'width' of nullというエラーが出る
  // canvasが表示される前だから？
  useEffect(() => {
    createBox();
    // createBox2();
    // createBox3();
    // createBox4();
    // createBox5();
    // createBox5()を呼び出すと第二引数でエラーが起きるため、react-hooks/exhaustive-deps を disable にしておく
    // 理由は後で調べる
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <h2>入門編 - sample1</h2>
      <h3>case1</h3>
      <canvas id="nyumon-sample1" />
      {/* <h3>case2 - ローテーションz軸方向追加</h3>
      <canvas id="nyumon-sample2" />
      <h3>case3 - ローテーション速度up</h3>
      <canvas id="nyumon-sample3" />
      <h3>case4 - さらにローテーション速度up</h3>
      <canvas id="nyumon-sample4" />
      <h3>case5 - 箱増殖(200個)</h3>
      <canvas id="nyumon-sample5" /> */}
    </>
  );
};

export default App;