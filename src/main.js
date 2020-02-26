// 初始化样式
import '@/assets/css/normalize.css'
import '@/assets/css/main.css'
import Stats from 'stats-js'
import * as dat from 'dat.gui'
import '@/assets/js/OrbitControls.js'

var THREE = require('three')
var container = document.getElementById('three-container')

function main() {
  // 常量声明
  var width = container.offsetWidth
  var height = container.offsetHeight
  var k = width / height // 窗口宽高比
  var s = 200 // 三维场景显示范围控制系数，系数越大，显示的范围越大

  // 创建场景、相机、渲染器、辅助工具等
  var scene = new THREE.Scene()
  var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000) // 正交相机(left right top bottom near far)
  var renderer = new THREE.WebGLRenderer()
  var axesHelper = new THREE.AxesHelper(1000)
  var gui = new dat.GUI()
  var status = new Stats()

  scene.add(axesHelper)

  // 创建立方体
  var boxGeometry = new THREE.BoxGeometry(100, 100, 100)
  var materialCube = new THREE.MeshLambertMaterial({ color: 0x0000ff })
  var meshCube = new THREE.Mesh(boxGeometry, materialCube)
  scene.add(meshCube)

  // 创建球体
  var sphereGeometry = new THREE.SphereGeometry(70)
  var materialSphere = new THREE.MeshLambertMaterial({ color: 0xff00ff })
  var meshSphere = new THREE.Mesh(sphereGeometry, materialSphere)
  meshSphere.translateX(200)
  scene.add(meshSphere)

  // 设置光源
  var point = new THREE.PointLight(0xffffff) // 点光源
  point.position.set(400, 200, 300)
  scene.add(point)
  var ambient = new THREE.AmbientLight(0x444444) // 环境光
  scene.add(ambient)

  // 设置相机
  camera.position.set(200, 300, 200) // 相机位置
  camera.lookAt(scene.position) // 相机方向

  // 创建轨道控制器(相机控制)
  var cameraControls = new THREE.OrbitControls(camera, renderer.domElement)

  // 设置渲染器
  renderer.setSize(width, height)
  renderer.setClearColor(0xb9d3ff, 1) // 设置背景颜色

  // 创建dat.GUI，传递并设置属性
  var controls = {
    rotationSpeed: 0.01,
    translateX: 200
  }
  gui.domElement.style = 'position:absolute;top:0px;right:0px'
  gui.add(controls, 'rotationSpeed', 0.0, 0.2)
  gui.add(controls, 'translateX', -1000, 1000)

  // console.log(mesh)

  // 创建动画帧
  function render() {
    // 旋转立方体
    meshCube.rotateY(controls.rotationSpeed)
    meshSphere.position.x = controls.translateX

    requestAnimationFrame(render)
    cameraControls.update()
    status.update()
    renderer.render(scene, camera)
  }

  // 添加元素到页面
  container.appendChild(renderer.domElement)
  container.appendChild(gui.domElement)
  container.appendChild(status.dom)

  render()
}
main()
