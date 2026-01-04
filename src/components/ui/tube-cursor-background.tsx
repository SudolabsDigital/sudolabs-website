"use client"

import { useEffect, useRef, useState } from "react"
// NO importamos THREE aqui arriba para evitar que se incluya en el bundle inicial de movil o responsive
import type * as THREE_TYPE from "three"

export function TubeCursorBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(true) 
  const [canRender, setCanRender] = useState(false)

  useEffect(() => {
    // 1. Detección rápida de móvil
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    
    // 2. Temporizador de 2.5s para no bloquear el hilo principal al cargar la pagina
    const timer = setTimeout(() => setCanRender(true), 2500)
    
    window.addEventListener("resize", checkMobile)
    return () => {
      window.removeEventListener("resize", checkMobile)
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    // Si e movil no descargamos Three.js
    if (isMobile || !canRender || !containerRef.current) return

    let animationFrameId: number
    let renderer: THREE_TYPE.WebGLRenderer
    let composer: any // Tipo any para evitar complejidad con los tipos de examples/jsm
    let geometry: THREE_TYPE.BufferGeometry
    let bloomPass: any
    let scene: THREE_TYPE.Scene
    let camera: THREE_TYPE.PerspectiveCamera
    
    const container = containerRef.current

    // --- FUNCIÓN ASÍNCRONA DE INICIALIZACIÓN ---
    const initThreeJS = async () => {
      // IMPORTACIÓN DINAMICA SOLO AQUI
      const THREE = await import("three")
      const { EffectComposer } = await import("three/examples/jsm/postprocessing/EffectComposer.js")
      const { RenderPass } = await import("three/examples/jsm/postprocessing/RenderPass.js")
      const { UnrealBloomPass } = await import("three/examples/jsm/postprocessing/UnrealBloomPass.js")

      // --- SETUP STANDARD ---
      const width = window.innerWidth
      const height = window.innerHeight

      scene = new THREE.Scene()
      scene.background = new THREE.Color("#020617")

      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
      camera.position.z = 60

      renderer = new THREE.WebGLRenderer({ 
        antialias: false,
        powerPreference: "high-performance",
        stencil: false,
        depth: false
      })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.toneMapping = THREE.ReinhardToneMapping
      
      // Limpiar contenedor por si acaso
      while(container.firstChild) container.removeChild(container.firstChild)
      container.appendChild(renderer.domElement)

      const ambientLight = new THREE.AmbientLight(0x000000)
      scene.add(ambientLight)

      const renderScene = new RenderPass(scene, camera)
      bloomPass = new UnrealBloomPass(
        new THREE.Vector2(width, height),
        2.0, 0.3, 0.0  // Difuso, intensidad, radio
      )

      composer = new EffectComposer(renderer)
      composer.addPass(renderScene)
      composer.addPass(bloomPass)

      // --- DEFINICIONES DE CLASES INTERNAS (Para usar el THREE importado) ---

      class SparkStorm {
        mesh: THREE_TYPE.Points
        count: number
        positions: Float32Array
        velocities: THREE_TYPE.Vector3[]
        lives: Float32Array
        geometry: THREE_TYPE.BufferGeometry
        material: THREE_TYPE.PointsMaterial
  
        constructor(scene: THREE_TYPE.Scene, count = 100) {
          this.count = count
          this.geometry = new THREE.BufferGeometry()
          this.positions = new Float32Array(count * 3)
          this.velocities = []
          this.lives = new Float32Array(count)
  
          for(let i=0; i<count; i++) {
              this.positions[i*3] = 9999
              this.velocities.push(new THREE.Vector3())
              this.lives[i] = 0
          }
  
          this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3))
          this.material = new THREE.PointsMaterial({
              color: 0xFFFFFF, 
              size: 0.8, 
              transparent: true, 
              opacity: 0.8, 
              blending: THREE.AdditiveBlending 
          })
          this.mesh = new THREE.Points(this.geometry, this.material)
          scene.add(this.mesh)
        }
  
        emit(position: THREE_TYPE.Vector3) {
          let spawned = 0
          const burst = 3 + Math.floor(Math.random() * 3)
          for(let i=0; i<this.count; i++) {
              if(this.lives[i] <= 0) {
                  this.positions[i*3] = position.x
                  this.positions[i*3+1] = position.y
                  this.positions[i*3+2] = position.z
                  
                  const theta = Math.random() * Math.PI * 2
                  const phi = Math.acos((Math.random() * 2) - 1)
                  const speed = 0.1 + Math.random() * 0.3
                  
                  this.velocities[i].set(
                      speed * Math.sin(phi) * Math.cos(theta),
                      speed * Math.sin(phi) * Math.sin(theta),
                      speed * Math.cos(phi)
                  )
                  
                  this.lives[i] = 1.0 
                  spawned++
                  if(spawned >= burst) break
              }
          }
        }
  
        update() {
          for(let i=0; i<this.count; i++) {
              if(this.lives[i] > 0) {
                  this.positions[i*3] += this.velocities[i].x
                  this.positions[i*3+1] += this.velocities[i].y
                  this.positions[i*3+2] += this.velocities[i].z
                  this.lives[i] -= 0.03 
              } else { 
                this.positions[i*3] = 9999 
              }
          }
          this.geometry.attributes.position.needsUpdate = true
        }
      }

      class TubeCursor {
        scene: THREE_TYPE.Scene
        width: number
        maxPoints: number
        points: THREE_TYPE.Vector3[]
        originalColor: THREE_TYPE.Color
        material: THREE_TYPE.MeshBasicMaterial
        mesh: THREE_TYPE.Mesh | null
        dummyVec: THREE_TYPE.Vector3
        spatialOffset: THREE_TYPE.Vector3
        personalLag: number
  
        constructor(scene: THREE_TYPE.Scene, color: string, width: number) {
          this.scene = scene
          this.width = width
          this.maxPoints =10
          this.points = []
          for (let i = 0; i < this.maxPoints; i++) {
              this.points.push(new THREE.Vector3(0, 0, 0))
          }
          this.originalColor = new THREE.Color(color)
          this.material = new THREE.MeshBasicMaterial({ color: this.originalColor })
          this.mesh = null
          this.dummyVec = new THREE.Vector3()
  
          const spread = 1.5 
          this.spatialOffset = new THREE.Vector3(
              (Math.random() - 0.5) * spread,
              (Math.random() - 0.5) * spread,
              (Math.random() - 0.5) * spread
          )
  
          this.personalLag = 0.05 + Math.random() * 0.09
        }
  
        update(targetPosition: THREE_TYPE.Vector3, overrideLag: number | null = null) { 
          const head = this.points[this.points.length - 1]
          
          const finalTarget = new THREE.Vector3().copy(targetPosition).add(this.spatialOffset)
          const lag = overrideLag !== null ? overrideLag : this.personalLag
  
          this.dummyVec.copy(finalTarget).sub(head).multiplyScalar(lag)
          head.add(this.dummyVec)
  
          for (let i = 0; i < this.points.length - 1; i++) {
              const current = this.points[i]
              const next = this.points[i + 1]
              this.dummyVec.copy(next).sub(current).multiplyScalar(0.65) 
              current.add(this.dummyVec)
          }
  
          const curve = new THREE.CatmullRomCurve3(this.points) 
          
          if (this.mesh) {
              this.mesh.geometry.dispose()
              this.scene.remove(this.mesh)
          }
  
          const geometry = new THREE.TubeGeometry(curve, 20, this.width, 6, false)
          this.mesh = new THREE.Mesh(geometry, this.material)
          this.scene.add(this.mesh)
        }
  
        resetColor() {
          if (!this.material.color.equals(this.originalColor)) {
              this.material.color.copy(this.originalColor)
          }
        }
      }

      // --- RUTAS Y OBJETOS ---

      const pathS = new THREE.CurvePath<THREE_TYPE.Vector3>()
      const sScale = 0.5 
      const sTop = new THREE.Vector3(3 * sScale, 8 * sScale, 0)
      const sCenter = new THREE.Vector3(0, 0, 0)
      const sBottom = new THREE.Vector3(-3 * sScale, -8 * sScale, 0)
      const sControl1 = new THREE.Vector3(-3 * sScale, 8 * sScale, 0)
      const sControl2 = new THREE.Vector3(-6 * sScale, 2 * sScale, 0)
      const sControl3 = new THREE.Vector3(6 * sScale, -2 * sScale, 0)
      const sControl4 = new THREE.Vector3(3 * sScale, -8 * sScale, 0)
      pathS.add(new THREE.CubicBezierCurve3(sTop, sControl1, sControl2, sCenter))
      pathS.add(new THREE.CubicBezierCurve3(sCenter, sControl3, sControl4, sBottom))
      pathS.add(new THREE.CubicBezierCurve3(sBottom, sControl4, sControl3, sCenter))
      pathS.add(new THREE.CubicBezierCurve3(sCenter, sControl2, sControl1, sTop))

      const pathL = new THREE.CurvePath<THREE_TYPE.Vector3>()
      const lWidth = 4
      const lHeight = 10 
      const lTop = new THREE.Vector3(0, lHeight/2, 0)
      const lCorner = new THREE.Vector3(0, -lHeight/2, 0)
      const lEnd = new THREE.Vector3(lWidth, -lHeight/2, 0)
      pathL.add(new THREE.LineCurve3(lTop, lCorner))
      pathL.add(new THREE.LineCurve3(lCorner, lEnd))
      pathL.add(new THREE.LineCurve3(lEnd, lCorner))
      pathL.add(new THREE.LineCurve3(lCorner, lTop))

      // --- INICIALIZACIÓN DE ENTIDADES ---
      const tubes: TubeCursor[] = []
      const numTubes = 16 // Cantidad de tubos
      const neonColors = ["#3B82F6", "#00FFA3", "#60A5FA", "#D946EF"]
      for (let i = 0; i < numTubes; i++) {
        tubes.push(new TubeCursor(scene, neonColors[i % neonColors.length], 0.03 + Math.random() * 0.05))
      }
      const sparks = new SparkStorm(scene, 80)

      // --- EVENT LOOP VARIABLES ---
      const mouse = new THREE.Vector2(0, 0)
      const raycaster = new THREE.Raycaster()
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
      const targetPosition = new THREE.Vector3()
      
      let isMouseOver = false
      let lastMouseMoveTime = 0

      // Helpers
      const getAutoPathPosition = (time: number) => {
        const t = time * 0.0005
        return new THREE.Vector3(Math.sin(t*3)*20, Math.cos(t*2)*12, Math.sin(t)*5)
      }

      // Eventos
      const handleMouseMove = (e: MouseEvent) => {
        isMouseOver = true
        lastMouseMoveTime = Date.now()
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
      }
      const handleTouchMove = (e: TouchEvent) => {
        if(e.touches.length > 0) {
          isMouseOver = true
          lastMouseMoveTime = Date.now()
          mouse.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1
          mouse.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1
        }
      }
      const handleScroll = () => { lastMouseMoveTime = Date.now(); isMouseOver = true; }
      const handleResize = () => {
        const w = window.innerWidth; const h = window.innerHeight;
        camera.aspect = w / h; camera.updateProjectionMatrix();
        renderer.setSize(w, h); composer.setSize(w, h);
      }

      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('touchmove', handleTouchMove, { passive: false })
      window.addEventListener('resize', handleResize)
      window.addEventListener('scroll', handleScroll)

      // Loop
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate)
        const time = Date.now()
        const isHoveringIdle = isMouseOver && (time - lastMouseMoveTime > 500)

        if (isMouseOver) {
          raycaster.setFromCamera(mouse, camera)
          raycaster.ray.intersectPlane(plane, targetPosition)
        } else {
          targetPosition.copy(getAutoPathPosition(time))
        }

        tubes.forEach((tube, index) => {
          if (isHoveringIdle) {
            const isS = index < numTubes / 2
            const offset = (index % (numTubes/2)) / (numTubes/2)
            const loopTime = (time * 0.0002 + offset) % 1 
            let pointOnCurve, centerOffset
            if (isS) {
                pointOnCurve = pathS.getPointAt(loopTime)
                centerOffset = new THREE.Vector3(-4, 0, 0)
                tube.material.color.setHex(0x3B82F6) 
            } else {
                pointOnCurve = pathL.getPointAt(loopTime)
                centerOffset = new THREE.Vector3(4, 0, 0)
                tube.material.color.setHex(0x94A3B8)
            }
            if (pointOnCurve) {
               const finalPos = new THREE.Vector3().copy(targetPosition).add(centerOffset).add(pointOnCurve)
               tube.update(finalPos, 0.25)
               if (Math.random() < 0.01) sparks.emit(finalPos)
            }
          } else {
            tube.resetColor()
            tube.update(targetPosition, null) 
          }
        })
        sparks.update()
        composer.render()
      }

      animate()
    }

    // EJECUTAR CARGA
    initThreeJS()

    // CLEANUP
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      
      // Intentamos limpiar si el renderer existe
      if (renderer) renderer.dispose()
      if (bloomPass) bloomPass.dispose()
    }
  }, [isMobile, canRender]) 

  if (isMobile) return null

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ backgroundColor: '#020617' }} 
    />
  )
}
