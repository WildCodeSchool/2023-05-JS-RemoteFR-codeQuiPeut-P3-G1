import React, { useEffect } from "react"
import { useAnimations } from "@react-three/drei"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

import { useLoader } from "@react-three/fiber"
import { useControls } from "leva"
import { TextureLoader } from "three/src/loaders/TextureLoader"
import * as THREE from "three" // Add this line to import THREE
import { MeshStandardMaterial } from "three"
import "./Dragon.scss"

export default function Dragon() {
  const dragon = useLoader(
    GLTFLoader,
    "/src/components/3DGuildPhone/Dragon1/dragon.gltf"
  )
  const [diffuseMap, normalMap, occlusionMap, specularGlossinessMap] =
    useLoader(TextureLoader, [
      "/src/components/3DGuildPhone/Dragon1/textures/material_0_diffuse.png",
      "/src/components/3DGuildPhone/Dragon1/textures/material_0_normal.png",
      "/src/components/3DGuildPhone/Dragon1/textures/material_0_occlusion.png",
      "/src/components/3DGuildPhone/Dragon1/textures/material_0_specularGlossiness.png",
    ])

  const goldMaterial = new MeshStandardMaterial({
    color: new THREE.Color("burlyWood"),
    roughness: 0.5,
    metalness: 1.2,
  })

  const animations = useAnimations(dragon.animations, dragon.scene)

  const { animationName } = useControls({
    animationName: { options: animations.names },
  })

  useEffect(() => {
    const action = animations.actions[animationName]
    action.reset().fadeIn(0.5).play()
    return () => {
      action.fadeOut(0.5)
    }
  }, [animationName])

  // Assign the goldMaterial to the dragon model
  dragon.scene.traverse((child) => {
    if (child.isMesh) {
      child.material = goldMaterial
      child.material.map = diffuseMap
      child.material.normalMap = normalMap
      child.material.aoMap = occlusionMap
      child.material.specularGlossinessMap = specularGlossinessMap
      child.material.metalness = 0.0 // Set to a neutral value
      child.material.roughness = 1.0 // Set to a neutral value
    }
  })

  return (
    <>
      <directionalLight
        intensity={0.5}
        decay={-5}
        rotation={[8.077, 8, 8.261]}
        position={[-1.8, -1.6, 2.5]}
        color="yellow"
      />
      <primitive
        object={dragon.scene}
        position={[0, -3, 0]}
        rotation={[0, 0, 0]}
        scale={1}
      />
    </>
  )
}
