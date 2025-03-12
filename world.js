
// Dragon by Poly by Google [CC-BY] via Poly Pizza

// import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import * as THREE from './lib/three.module.js';
import { OBJLoader } from './lib/OBJLoader.js';
import { MTLLoader } from './lib/MTLLoader.js';
import { OrbitControls } from './lib/OrbitControls.js';

function main() {

    const canvas = document.querySelector( '#c' );
    const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;

    const fov = 90;
    const aspect = 2;
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 10, 50 );

    const controls = new OrbitControls( camera, canvas );
    controls.target.set(0, 5, 0);
    controls.update();

    const scene = new THREE.Scene();
	scene.background = new THREE.Color( 'black' );


    // floor    
    { 

        const planeSize = 125;

        const loader = new THREE.TextureLoader();
        const texture = loader.load('./textures/endstone.jpg');
        texture.encoding = THREE.sRGBEncoding;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        const repeats = planeSize / 2;
        texture.repeat.set( repeats, repeats );

        const planeGeo = new THREE.PlaneGeometry( planeSize, planeSize );
        const planeMat = new THREE.MeshPhongMaterial({
            map: texture,
            side: THREE.DoubleSide,
        } );
        const mesh = new THREE.Mesh(planeGeo, planeMat);
        mesh.receiveShadow = true;
        mesh.rotation.x = Math.PI * -.5;
        scene.add(mesh);

    }

	
    // end towers
    const toAnimated = [];
    const decagonPoints = [
      { x: 30, z: 0, size: 5, height: 20 },
      { x: 24, z: 18, size: 5, height: 17 },
      { x: 9, z: 29, size: 6, height: 22 },
      { x: -9, z: 29, size: 4, height: 15 },
      { x: -24, z: 18, size: 6, height: 19 },
      { x: -30, z: 0, size: 5, height: 15 },
      { x: -24, z: -18, size: 5, height: 17 },
      { x: -9, z: -29, size: 6, height: 16 },
      { x: 9, z: -29, size: 4, height: 20 },
      { x: 24, z: -18, size: 6, height: 23 }
    ];

    const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x0a090e });
    const icosahedronMaterial = new THREE.MeshPhongMaterial({ color: 0xbc5ad2 });

    decagonPoints.forEach(({ x, z, size, height }) => {
      // Create the cube
      const cubeGeometry = new THREE.BoxGeometry(size, height, size);
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.castShadow = true;
      cube.receiveShadow = true;
      cube.position.set(x, height / 2, z); // Center the cube based on height
      scene.add(cube);
    
      // Create the icosahedron
      const icosahedronGeometry = new THREE.IcosahedronGeometry(1); // Smaller size for the icosahedron
      const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
      icosahedron.castShadow = true;
      icosahedron.receiveShadow = true;
      icosahedron.position.set(x, height + 2, z); // Position the icosahedron on top of the cube
      scene.add(icosahedron);
    
      // Add icosahedron to toAnimated array for animation
      toAnimated.push(icosahedron);
    });


    
    // end portal
    const portalL = 9;
    const portalH = 4;
    const portalW = 4;
    { 
        const ptlgeo = new THREE.BoxGeometry(portalL, portalH, portalW);
        const ptlloader = new THREE.TextureLoader();
        const ptlmat = new THREE.MeshPhongMaterial({ map: ptlloader.load('./textures/bedrock.png') });
        const ptlcube = new THREE.Mesh(ptlgeo, ptlmat);

        ptlcube.position.set(0, 1.2, -3.2);
        ptlcube.scale.set(0.5,0.5,0.5)
        scene.add(ptlcube);
    }

    { 
        const ptlgeo = new THREE.BoxGeometry(portalL, portalH, portalW);
        const ptlloader = new THREE.TextureLoader();
        const ptlmat = new THREE.MeshPhongMaterial({ map: ptlloader.load('./textures/bedrock.png') });
        const ptlcube = new THREE.Mesh(ptlgeo, ptlmat);

        ptlcube.position.set(-3.2, 1.2, 0);
        ptlcube.rotation.y = 4.7;
        ptlcube.scale.set(0.5,0.5,0.5)
        scene.add(ptlcube);
    }

    { 
        const ptlgeo = new THREE.BoxGeometry(portalL, portalH, portalW);
        const ptlloader = new THREE.TextureLoader();
        const ptlmat = new THREE.MeshPhongMaterial({ map: ptlloader.load('./textures/bedrock.png') });
        const ptlcube = new THREE.Mesh(ptlgeo, ptlmat);

        ptlcube.position.set(3.2, 1.2, 0);
        ptlcube.rotation.y = 4.7;
        ptlcube.scale.set(0.5,0.5,0.5)
        scene.add(ptlcube);
    }

    { 
        const ptlgeo = new THREE.BoxGeometry(portalL, portalH, portalW);
        const ptlloader = new THREE.TextureLoader();
        const ptlmat = new THREE.MeshPhongMaterial({ map: ptlloader.load('./textures/bedrock.png') });
        const ptlcube = new THREE.Mesh(ptlgeo, ptlmat);

        ptlcube.position.set(-0, 1.2, 3.2);
        ptlcube.scale.set(0.5,0.5,0.5)
        scene.add(ptlcube);
    }
    
    // center pill
    {
        const geom = new THREE.CylinderGeometry(1, 1, 7, 10);
        const matr = new THREE.MeshPhongMaterial({ color: 0x3c3c3c });
        const cb = new THREE.Mesh(geom, matr);
        cb.castShadow = true;
        cb.receiveShadow = true;
        cb.position.set(0, 3.5, 0);
        scene.add(cb);
      }
    
    // portal
    {
        const baseGeo = new THREE.BoxGeometry(5, 0.2, 5); // Thin platform
        const baseMat = new THREE.MeshPhongMaterial({ color: 0x000000 }); 
        const base = new THREE.Mesh(baseGeo, baseMat);
        base.position.set(0, 1, 0); // Slightly above the ground
        base.receiveShadow = false;
        scene.add(base);
    }



    // dragon
    {

        const mtlLoader = new MTLLoader();
        const objLoader = new OBJLoader();

        mtlLoader.load('./dragon/Mesh_Dragon.mtl', (mtl) => {
            mtl.preload();
            objLoader.setMaterials(mtl);
            objLoader.load('./dragon/Mesh_Dragon.obj', (root) => {
                root.scale.set(0.03, 0.03, 0.03);
                root.position.set(0, 17, -1);
                scene.add(root);
            });
        });

    }
    


    // lights

    // Point Light / key light
    {

        const color = 0xf1adff;
        const intensity = 1;
        const light = new THREE.PointLight(color, intensity);

        light.position.set(0, 35, 0);
        light.castShadow = true;

        scene.add(light);

    }

    // Ambient Light / back light
    {

        const color = 0xFFFFFF;
        const intensity = 0.2;
        const light = new THREE.AmbientLight(color, intensity);

        scene.add(light);

    }

    // Directional Light / fill light
    {

        const color = 0x000085;
        const intensity = 0.5;
        const light = new THREE.DirectionalLight(color, intensity);

        light.position.set(0, 20, -15);
        light.target.position.set(0, 5, 0);

        scene.add(light);
        scene.add(light.target);

    }



    // skybox
    {
        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
        './sky/nx.png', //left
        './sky/px.png', //right
        './sky/ny.png', //bot
        './sky/py.png', //top
        './sky/nz.png', //back
        './sky/pz.png', //front
        ] );
        scene.background = texture;
    }

    // fog
    {
        const color = 0x8c6691;
        const near = 0;
        const far = 160;
        scene.fog = new THREE.Fog(color, near, far);
    }

    


    function resizeRendererToDisplaySize( renderer ) {

        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if ( needResize ) {

			renderer.setSize( width, height, false );

		}

        return needResize;

    }

    //function render() {
    function render( time ) {
        
        time *= 0.001; // convert time to seconds

        if ( resizeRendererToDisplaySize( renderer ) ) {

			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();

		}

        toAnimated.forEach((obj, idx) => {
            const speed = 5 + idx * .1;
            const rot = time * speed;
            obj.rotation.x = rot;
            obj.rotation.y = rot;
          });

        // cube.rotation.x = time;
        // cube.rotation.y = time;

        renderer.render( scene, camera );

        requestAnimationFrame( render );
    }

    requestAnimationFrame( render );

}

main();