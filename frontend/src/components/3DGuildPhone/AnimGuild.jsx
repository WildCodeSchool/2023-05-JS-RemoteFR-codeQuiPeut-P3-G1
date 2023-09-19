import React, { useRef } from "react"
import { useGLTF, PerspectiveCamera } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { MeshStandardMaterial } from "three"
import * as THREE from "three"

export default function AnimGuild(props) {
  const { nodes } = useGLTF(
    "/src/components/3DGuildPhone/Guild/glTF/guild.gltf"
  )

  const animationAmplitude = 0.5
  const animationSpeed = 0.7

  const groupRef = useRef()
  const swordRef1 = useRef()
  const swordRef2 = useRef()
  const twentyDRef = useRef()
  const eightDRef = useRef()
  const purpleMaterial = new MeshStandardMaterial({
    color: new THREE.Color("purple"),
    roughness: 0.5,
    metalness: 0.5
  })
  const turquoiseMaterial = new MeshStandardMaterial({
    color: new THREE.Color("turquoise"),
    roughness: 0.5,
    metalness: 1.3
  })
  const pinkMaterial = new MeshStandardMaterial({
    color: new THREE.Color("pink"),
    roughness: 0.5,
    metalness: 1.3
  })
  const goldMaterial = new MeshStandardMaterial({
    color: new THREE.Color("burlyWood"),
    roughness: 0.5,
    metalness: 1.7
  })

  let time = 0
  let rotationAngle = 0 // Define and initialize rotationAngle
  useFrame((state, delta) => {
    time += delta

    // Calculate the rotation angles for each sword
    rotationAngle = time * 1.5 // Adjust this value for the desired rotation speed

    // Calculate the rotation angles for each sword
    const rotationAngle1 = rotationAngle
    const rotationAngle2 = -rotationAngle // Opposite direction

    // Set the sword rotations
    swordRef1.current.rotation.z = rotationAngle1
    swordRef2.current.rotation.z = rotationAngle2
    twentyDRef.current.rotation.z = rotationAngle1
    eightDRef.current.rotation.z = rotationAngle2

    // Calculate the z position for animation
    const yPosition = animationAmplitude * Math.sin(time * animationSpeed)
    groupRef.current.position.y = yPosition
  })

  return (
    <group {...props} dispose={null}>
      <directionalLight
        decay={2}
        rotation={[77, 94, 61]}
        intensity={-0.5}
        position={[50.8, 20.6, 50.5]}
        color="green"
      />
      <group
        ref={groupRef}
        position={[0, 0, -5]}
        rotation={[0, 0, 0]}
        scale={0.011}
      >
        <group position={[0.5, 0.238, 0]} rotation={[-0.2, 0, 0]} scale={0.7}>
          <group
            position={[-27.066, -152.603, -26.853]}
            scale={[0.994, 0.941, 0.744]}
          >
            <mesh
              name="camera dot"
              castShadow
              receiveShadow
              geometry={nodes.Rectangle_4.geometry}
              material={nodes.Rectangle_4.material}
              position={[45.934, 401.298, 13.235]}
              scale={[0.75, 0.75, 1]}

              // Assign the material instance here
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Rectangle_3.geometry}
              // material={nodes.Rectangle_3.material}
              position={[-9.257, 401.298, 13.235]}
              scale={[0.75, 0.75, 1]}
              material={goldMaterial}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.screen.geometry}
              material={nodes.screen.material}
              position={[0, 0, 9.887]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Boolean_2.geometry}
              // material={nodes.Boolean_2.material}
              position={[0, 0, -1.201]}
              material={goldMaterial}
            />
          </group>
          <group position={[-30.86, 106.22, 61.413]}>
            <group
              position={[-354.988, -306.452, 97.639]}
              rotation={[0.165, 0.684, 1.032]}
              scale={[817.426, 907.757, 946.313]}
            >
              <group
                position={[-0.001, 0.007, 0.062]}
                rotation={[-2.227, 1.21, -0.019]}
              >
                <group
                  position={[0.019, -0.005, 0]}
                  rotation={[1.745, 0, 0]}
                  scale={0.012}
                >
                  <group
                    position={[-0.022, 37.975, -0.005]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={0.99}
                    material={goldMaterial}
                  >
                    <mesh
                      ref={swordRef1}
                      castShadow
                      receiveShadow
                      geometry={nodes.sword_LP__0.geometry}
                      material={nodes.sword_LP__0.material}
                      position={[0.031, 0.005, -35.023]}
                    />
                  </group>
                </group>
              </group>
              <group
                position={[0.271, -0.553, 0.494]}
                rotation={[-2.227, 1.21, -0.019]}
              >
                <group
                  position={[0.019, -0.005, 0]}
                  rotation={[1.745, 0, 0]}
                  scale={0.012}
                >
                  <group
                    position={[-0.022, 37.975, -0.005]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={0.99}
                  >
                    <mesh
                      ref={swordRef2}
                      castShadow
                      receiveShadow
                      geometry={nodes.sword_LP__0_1.geometry}
                      material={nodes.sword_LP__0_1.material}
                      position={[0.031, 0.005, -35.023]}
                    />
                  </group>
                </group>
              </group>
            </group>
          </group>
          {/* <mesh
            castShadow
            receiveShadow
            geometry={nodes.Text.geometry}
            // material={nodes.Text.material}
            position={[-2.928, -320, 50.314]}
            scale={0.7}
            material={goldMaterial}
          /> */}

          <group position={[-20.656, -54.513, -228.8]}>
            <group rotation={[-Math.PI / 2, 0, 0]} scale={7.319}>
              <group rotation={[Math.PI / 2, 0, 0]}>
                <group scale={0.01}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_228.geometry}
                    material={nodes.Object_228.material}
                  />
                </group>
              </group>
            </group>
          </group>
          <group
            position={[-39.351, -85.889, -435.203]}
            rotation={[0, -1.418, 0]}
            scale={0.01}
          >
            <group rotation={[-Math.PI / 2, 0, 0]} scale={[0.96, 0.957, 0.957]}>
              <group rotation={[Math.PI / 2, 0, 0]}>
                <group position={[0, -0.042, 0]}>
                  <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_7.geometry}
                    material={nodes.Object_7.material}
                  />
                </group>
              </group>
            </group>
          </group>
          <group position={[-20.656, -54.513, 20.949]} scale={31.791}>
            <group rotation={[-Math.PI / 2, 0, 0]}>
              <group
                position={[-1.224, 10.04, -6.124]}
                rotation={[-3.068, 0.034, -1.666]}
                scale={0.01}
              >
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.d20_0.geometry}
                  material={goldMaterial}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.d20_1.geometry}
                  // material={nodes.d20_1.material}
                  material={goldMaterial}
                />
              </group>
              <group
                ref={twentyDRef}
                position={[18.996, 5.38, -8.739]}
                rotation={[0.361, 0, 0]}
                scale={[1.722, 2.001, 1.722]}
              >
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.d12_0.geometry}
                  // material={nodes.d12_0.material}
                  material={turquoiseMaterial}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.d12_1.geometry}
                  // material={nodes.d12_1.material}
                  material={purpleMaterial}
                />
              </group>
              <mesh
                ref={eightDRef}
                castShadow
                receiveShadow
                geometry={nodes.d8_0.geometry}
                // material={nodes.d8_0.material}
                position={[-18.107, 0.616, 3.512]}
                rotation={[0.762, -0.972, -1.542]}
                scale={[1.563, 1.563, 1.907]}
                material={pinkMaterial}
              />
            </group>
          </group>
          <group position={[18.884, 199.425, -967.156]} scale={0.01}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.HeroHelmet002_HeroHelmet_Material_0.geometry}
              // material={nodes.HeroHelmet002_HeroHelmet_Material_0.material}
              position={[0.279, 1.699, 23.836]}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={[1.563, 1.563, 1.907]}
              material={goldMaterial}
            />
          </group>
          <group
            position={[3.41, 133.929, -212.502]}
            scale={[0.88, 0.856, 0.659]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube_10.geometry}
              // material={nodes.Cube_10.material}
              position={[284.574, 204.965, 25.054]}
              rotation={[0, 0.087, 0]}
              material={purpleMaterial}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube_7.geometry}
              // material={nodes.Cube_7.material}
              position={[-176.157, 115.549, 246.99]}
              material={purpleMaterial}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube.geometry}
              // material={nodes.Cube.material}
              position={[343.388, -715.983, 248.599]}
              rotation={[0, 0, -0.963]}
              material={purpleMaterial}
            />
          </group>
          <group
            position={[-16.81, -53.473, 16.148]}
            scale={[0.902, 0.854, 0.675]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube_1.geometry}
              // material={nodes.Cube_1.material}
              position={[-444.824, -319.904, -163.019]}
              rotation={[0.151, -0.315, -0.657]}
              material={purpleMaterial}
            />
          </group>
        </group>
        <PerspectiveCamera
          makeDefault={false}
          far={100000}
          near={5}
          fov={45}
          position={[15.629, -23.75, 1511.168]}
        />
      </group>
    </group>
  )
}

useGLTF.preload("/Guild/glTF/guild.gltf")
