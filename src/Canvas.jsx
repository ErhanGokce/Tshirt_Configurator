/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import './index.css';
import { Canvas } from '@react-three/fiber'; 
import { OrbitControls, Center, useGLTF, Environment, AccumulativeShadows, RandomizedLight } from '@react-three/drei';
import { useRef } from 'react';



export const App = ({ position = [-1, 0, 2.5 ], fov = 25 }) => (
    
      <Canvas
      shadows
      eventSource={document.getElementById('root')}
      eventPrefix='client'
      camera={{ position, fov}}>
        <ambientLight intensity={0.5} />
        <Environment preset='city' />
        <Center />
        <Shirt />
        <Backdrop />
        <OrbitControls />
      </Canvas>
   
)

function Shirt(props) {
        const { nodes, materials } = useGLTF('models/shirt_baked_collapsed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
      />
    </group>
  )
    
}

function Backdrop() {
    return (
        <AccumulativeShadows
        temporal
        frames={60}
        alphaTest={0.85}
        scale={10}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, -0.14]}
        >
            <RandomizedLight 
            amount={4}
            radius={9}
            intensity={2.5}
            ambient={0.25}
            position={[5, 5, -10]}
            />
            <RandomizedLight 
            amount={4}
            radius={5}
            intensity={2.5}
            ambient={0.55}
            position={[5, 5, -9]}
            />
        </AccumulativeShadows>
    )
}

useGLTF.preload('models/shirt_baked_collapsed.glb')