"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js"

export function TubeCursorBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(true) 

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile || !containerRef.current) return

    // --- SETUP ---
    const container = containerRef.current
    const width = window.innerWidth
    const height = window.innerHeight

    const scene = new THREE.Scene()
    // Fondo oscuro para resaltar tu tubaso
    scene.background = new THREE.Color("#020617") 

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.z = 60

    const renderer = new THREE.WebGLRenderer({ 
      antialias: false,
      powerPreference: "high-performance",
      stencil: false,
      depth: false
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ReinhardToneMapping
    container.appendChild(renderer.domElement)

    // --- LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0x000000)
    scene.add(ambientLight)

    // --- POST PROCESSING (BLOOM) los parametros son para: fuerza de brillo, radio de brillo, umbral de brillo ---
    const renderScene = new RenderPass(scene, camera)
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      2.0,
      0.5,
      0.0
    )

    const composer = new EffectComposer(renderer)
    composer.addPass(renderScene)
    composer.addPass(bloomPass)

    // --- PATHS (S & L) ---
    // Scaled down S
    const pathS = new THREE.CurvePath<THREE.Vector3>()
    const sScale = 0.5 // reduce escala
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

    // Scaled down L
    const pathL = new THREE.CurvePath<THREE.Vector3>()
    const lWidth = 4  // reduce ancho
    const lHeight = 10 // reduce alto
    const lTop = new THREE.Vector3(0, lHeight/2, 0)
    const lCorner = new THREE.Vector3(0, -lHeight/2, 0)
    const lEnd = new THREE.Vector3(lWidth, -lHeight/2, 0)

    pathL.add(new THREE.LineCurve3(lTop, lCorner))
    pathL.add(new THREE.LineCurve3(lCorner, lEnd))
    pathL.add(new THREE.LineCurve3(lEnd, lCorner))
    pathL.add(new THREE.LineCurve3(lCorner, lTop))

    // --- CLASSES ---

    class SparkStorm {
      mesh: THREE.Points
      count: number
      positions: Float32Array
      velocities: THREE.Vector3[]
      lives: Float32Array
      geometry: THREE.BufferGeometry
      material: THREE.PointsMaterial

      constructor(scene: THREE.Scene, count = 100) {
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

      emit(position: THREE.Vector3) {
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
      scene: THREE.Scene
      width: number
      maxPoints: number
      points: THREE.Vector3[]
      originalColor: THREE.Color
      material: THREE.MeshBasicMaterial
      mesh: THREE.Mesh | null
      dummyVec: THREE.Vector3
      spatialOffset: THREE.Vector3
      personalLag: number

      constructor(scene: THREE.Scene, color: string, width: number) {
        this.scene = scene
        this.width = width
        this.maxPoints = 8 // Cantidad de puntos de la curva, si le das a mas lo haces menos lento, hasta con 16 sirve o 32 pero se ve hasta el nabo no repercute tanto en la optimizacion
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

      update(targetPosition: THREE.Vector3, overrideLag: number | null = null) { 
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

    // --- INSTANTIATION ---

    const mouse = new THREE.Vector2(0, 0)
    const raycaster = new THREE.Raycaster()
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
    const targetPosition = new THREE.Vector3()
    
    let isMouseOver = false
    let lastMouseMoveTime = 0
    let animationFrameId: number

    const tubes: TubeCursor[] = []
    const numTubes = 20 
    
    // Updated Brand Palette for Follow Mode
    const neonColors = [
      "#3B82F6", // Vibrant Blue
      "#00FFA3", // Neon Mint
      "#60A5FA", // Light Blue
      "#D946EF"  // Magenta
    ]

    for (let i = 0; i < numTubes; i++) {
        const color = neonColors[i % neonColors.length]
        const width = 0.03 + Math.random() * 0.05
        tubes.push(new TubeCursor(scene, color, width))
    }

    const sparks = new SparkStorm(scene, 80)

    // --- EVENT HANDLERS ---

    const getAutoPathPosition = (time: number) => {
        const t = time * 0.0005
        return new THREE.Vector3(Math.sin(t*3)*20, Math.cos(t*2)*12, Math.sin(t)*5)
    }

    const updateMouse = (x: number, y: number) => {
        mouse.x = (x / window.innerWidth) * 2 - 1
        mouse.y = -(y / window.innerHeight) * 2 + 1
    }

    const handleMouseMove = (e: MouseEvent) => {
      isMouseOver = true
      lastMouseMoveTime = Date.now()
      updateMouse(e.clientX, e.clientY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      isMouseOver = true
      lastMouseMoveTime = Date.now()
      if(e.touches.length > 0) {
        updateMouse(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    const handleResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      composer.setSize(w, h)
    }

    const handleScroll = () => {
       lastMouseMoveTime = Date.now() 
       isMouseOver = true
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)

    // --- ANIMATION LOOP ---
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
                // S & L Mode
                const isS = index < numTubes / 2
                const offset = (index % (numTubes/2)) / (numTubes/2)
                const loopTime = (time * 0.0002 + offset) % 1 

                let pointOnCurve
                let centerOffset

                if (isS) {
                    pointOnCurve = pathS.getPointAt(loopTime)
                    centerOffset = new THREE.Vector3(-4, 0, 0) // Ajuste el offset para el ancho menor
                    // Color S: Blue (Brand Accent)
                    tube.material.color.setHex(0x3B82F6) 
                } else {
                    pointOnCurve = pathL.getPointAt(loopTime)
                    centerOffset = new THREE.Vector3(4, 0, 0) // Ajuste el offset para el ancho menor
                    // Color L: Silver/Cool Gray
                    tube.material.color.setHex(0x94A3B8)
                }
                
                if (pointOnCurve) {
                   const finalPos = new THREE.Vector3().copy(targetPosition).add(centerOffset).add(pointOnCurve)
                   tube.update(finalPos, 0.25)
                   if (Math.random() < 0.01) sparks.emit(finalPos)
                }

            } else {
                // Follow Mode
                tube.resetColor()
                tube.update(targetPosition, null) 
            }
        })

        sparks.update()
        composer.render()
    }

    animate()

    // --- CLEANUP ---
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      
      cancelAnimationFrame(animationFrameId)
      
      if (renderer) renderer.dispose()
      if (container) {
          while(container.firstChild) {
              container.removeChild(container.firstChild)
          }
      }
      bloomPass.dispose()
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[-1] pointer-events-none"
      style={{ backgroundColor: '#020617' }} 
    />
  )
}