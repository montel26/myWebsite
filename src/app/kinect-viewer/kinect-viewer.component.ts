import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import GUI from 'lil-gui';

@Component({
  selector: 'app-kinect-viewer',
  templateUrl: './kinect-viewer.component.html',
  styleUrls: ['./kinect-viewer.component.scss']
})
export class KinectViewerComponent implements OnInit, AfterViewInit {
  @ViewChild('threeContainer', { static: true }) threeContainer!: ElementRef;

  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private renderer!: THREE.WebGLRenderer;
  private mesh!: THREE.Points;
  private material!: THREE.ShaderMaterial;
  private mouse!: THREE.Vector3;
  private center!: THREE.Vector3;

  constructor() { }

  ngOnInit(): void {
    // Initialize scene and other properties here if needed
  }

  ngAfterViewInit(): void {
    this.initThreeJs();
  }

  initThreeJs() {
    this.scene = new THREE.Scene();
    this.center = new THREE.Vector3();
    this.center.z = -1000;

    // Set up camera
    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.set(0, 0, 500);

    // Get the video element
    const video = document.getElementById('video') as HTMLVideoElement;
    
    // Wait for the video to be ready
    video.onloadeddata = () => {
      const texture = new THREE.VideoTexture(video);
      texture.minFilter = THREE.NearestFilter;

      const width = 640, height = 480;
      const nearClipping = 850, farClipping = 4000;

      // Create geometry
      const geometry = new THREE.BufferGeometry();
      const vertices = new Float32Array(width * height * 3);
      for (let i = 0, j = 0, l = vertices.length; i < l; i += 3, j++) {
        vertices[i] = j % width;
        vertices[i + 1] = Math.floor(j / width);
      }
      geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

      // Create shader material
      this.material = new THREE.ShaderMaterial({
        uniforms: {
          'map': { value: texture },
          'width': { value: width },
          'height': { value: height },
          'nearClipping': { value: nearClipping },
          'farClipping': { value: farClipping },
          'pointSize': { value: 2 },
          'zOffset': { value: 1000 }
        },
        vertexShader: `
          uniform sampler2D map;
          uniform float width;
          uniform float height;
          uniform float nearClipping, farClipping;
          uniform float pointSize;
          uniform float zOffset;
          varying vec2 vUv;
          const float XtoZ = 1.11146;
          const float YtoZ = 0.83359;
          void main() {
            vUv = vec2(position.x / width, position.y / height);
            vec4 color = texture2D(map, vUv);
            float depth = (color.r + color.g + color.b) / 3.0;
            float z = (1.0 - depth) * (farClipping - nearClipping) + nearClipping;
            vec4 pos = vec4(
              (position.x / width - 0.5) * z * XtoZ,
              (position.y / height - 0.5) * z * YtoZ,
              -z + zOffset,
              1.0
            );
            gl_PointSize = pointSize;
            gl_Position = projectionMatrix * modelViewMatrix * pos;
          }
        `,
        fragmentShader: `
          uniform sampler2D map;
          varying vec2 vUv;
          void main() {
            vec4 color = texture2D(map, vUv);
            gl_FragColor = vec4(color.r, color.g, color.b, 0.2);
          }
        `,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        depthWrite: false,
        transparent: true
      });

      this.mesh = new THREE.Points(geometry, this.material);
      this.scene.add(this.mesh);

      // Initialize GUI
      const gui = new GUI();
      gui.add(this.material.uniforms['nearClipping'], 'value', 1, 10000, 1.0).name('nearClipping');
      gui.add(this.material.uniforms['farClipping'], 'value', 1, 10000, 1.0).name('farClipping');
      gui.add(this.material.uniforms['pointSize'], 'value', 1, 10, 1.0).name('pointSize');
      gui.add(this.material.uniforms['zOffset'], 'value', 0, 4000, 1.0).name('zOffset');

      // Start video playback
      video.play();

      // Set up renderer
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setAnimationLoop(this.animate.bind(this));
      this.threeContainer.nativeElement.appendChild(this.renderer.domElement);

      this.mouse = new THREE.Vector3(0, 0, 1);

      document.addEventListener('mousemove', this.onDocumentMouseMove.bind(this));
      window.addEventListener('resize', this.onWindowResize.bind(this));
    };
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onDocumentMouseMove(event: MouseEvent) {
    this.mouse.x = (event.clientX - window.innerWidth / 2) * 8;
    this.mouse.y = (event.clientY - window.innerHeight / 2) * 8;
  }

  animate() {
    this.camera.position.x += (this.mouse.x - this.camera.position.x) * 0.05;
    this.camera.position.y += (-this.mouse.y - this.camera.position.y) * 0.05;
    this.camera.lookAt(this.center);
    this.renderer.render(this.scene, this.camera);
  }
}





