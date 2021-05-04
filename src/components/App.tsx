import React from "react"
import { Parametric } from "@react-three/drei"
import { useControls } from "leva"
import * as THREE from "three"
import { useTurntable } from "../lib/useTurntable"

const { sin, sqrt, pow } = Math

const App = () => {
  const { a, b, segments, xInterval, yInterval } = useControls({
    a: {
      min: 0,
      max: 10,
      value: 1,
      step: 1,
    },
    b: {
      min: 0,
      max: 10,
      value: 1,
      step: 1,
    },
    segments: {
      min: 1,
      max: 100,
      step: 1,
      value: 40,
    },
    xInterval: {
      min: -20,
      max: 20,
      value: [-10, 10],
    },
    yInterval: {
      min: -20,
      max: 20,
      value: [-10, 10],
    },
  })

  const [xMin, xMax] = xInterval,
    xRange = xMax - xMin,
    [yMin, yMax] = yInterval,
    yRange = yMax - yMin

  const f = (u: number, v: number, target: THREE.Vector3) => {
    let x = xRange * u + xMin,
      y = yRange * v + yMin,
      z = sin(sqrt(pow(a * x, 2) + pow(b * y, 2)))

    target.set(x, y, z)
  }

  const ref = useTurntable()

  return (
    <Parametric
      ref={ref}
      rotation-x={Math.PI / 2}
      args={[f, segments, segments]}
    >
      <meshPhongMaterial attach="material" color="#f3f3f3" wireframe />
    </Parametric>
  )
}

export default App
