const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let linesCommand = ''

function addVertices (points) {
  const lines = []

  for (let i = 0; i < points.length; i++) {
    const point1 = points[i]
    const point2 = points[(i + 1) % points.length]

    const vector = [
      point2[0] - point1[0],
      point2[1] - point1[1]
    ]

    lines.push([point1, vector])
  }

  linesCommand = lines.map(line => {
    return `parametric_plot((${line[0][0]} + t * ${line[1][0]}, ${line[0][1]} + t * ${line[1][1]}), (t, 0, 2))`
  }).join(' + ')

  const result = []
  for (let i = lines.length - 1; i >= 0; i--) {
    const firstLine = lines[i]
    lines.forEach(otherLine => {
      const x0 = firstLine[0][0]
      const y0 = firstLine[0][1]
      const a0 = firstLine[1][0]
      const b0 = firstLine[1][1]
      const x1 = otherLine[0][0]
      const y1 = otherLine[0][1]
      const a1 = otherLine[1][0]
      const b1 = otherLine[1][1]

      if (a0 * b1 - b0 * a1 !== 0) {
        const t = (a0 * (y0 - y1) + b0 * (x1 - x0)) / (a0 * b1 - a1 * b0)
        const x = x1 + t * a1
        const y = y1 + t * b1

        console.log(`Lines ${x0},${y0}->${a0},${b0} and ${x1},${y1}->${a1},${b1} give point: ${x},${y}`)

        if (!isNaN(x) && !isNaN(y) && !result.find((point) => point[0] === x && point[1] === y)) {
          result.push([x, y])
        }
      }
    })

    lines.splice(i, 1)
  }

  return result
}

function sortByAngle (points) {
  const centerX = points.reduce((sum, point) => sum + point[0], 0) / points.length
  const centerY = points.reduce((sum, point) => sum + point[1], 0) / points.length

  return points.sort((a, b) => {
    const angleA = Math.atan2(a[1] - centerY, a[0] - centerX)
    const angleB = Math.atan2(b[1] - centerY, b[0] - centerX)

    if (angleA > angleB) {
      return -1
    } else if (angleA < angleB) {
      return 1
    }
    return 0
  })
}

function findArea (points) {
  let sum = 0
  for (let i = 0; i < points.length; i++) {
    const point1 = points[i]
    const point2 = points[(i + 1) % points.length]

    sum += point1[0] * point2[1] - point1[1] * point2[0]
  }

  sum /= 2

  return Math.abs(sum)
}

function rightIndicator (vector, other) {
  return vector[0] * other[1] - vector[1] * other[0]
}

function removePoints (points, result) {
  for (let i = 0; i < points.length; i++) {
    const point1 = points[i]
    const point2 = points[(i + 1) % points.length]

    const vector = [
      point2[0] - point1[0],
      point2[1] - point1[1]
    ]

    for (let j = result.length - 1; j >= 0; j--) {
      const other = [
        result[j][0] - point1[0],
        result[j][1] - point1[1]
      ]

      console.log(vector, other, Math.round(rightIndicator(vector, other)))
      if (rightIndicator(vector, other) > 0) {
        result.splice(j, 1)
      }
    }
  }

  return result
}

function findSolution (lines) {
  const points = lines.slice(1).map(point => point.split(' ').map(str => parseInt(str, 10)))
  let result = Array.from(points).concat(
    addVertices(points).filter(point => !points.find(pointB => point[0] === pointB[0] && point[1] === pointB[1]))
  )

  console.log('Before filtering')
  console.log(`list_plot(numpy.array([${result.map(p => JSON.stringify(p)).join(', ')}])) + ${linesCommand}`)

  result = removePoints(points, result)

  result = sortByAngle(result)

  console.log('After')
  console.log(`list_plot(numpy.array([${result.map(p => JSON.stringify(p)).join(', ')}])) + ${linesCommand}`)

  return findArea(result)
}

// Test
function test () {
  function testOne (input) {
    console.log(
      'Got:',
      input,
      'Solution:',
      findSolution(input)
    )
  }

  testOne(['8', '0 0', '0 1', '1 1', '1 2', '2 2', '2 1', '3 1', '3 0'])
  testOne(['8', '0 0', '0 2', '1 2', '1 1', '2 1', '2 2', '3 2', '3 0'])
  testOne(['6', '140 62', '97 141', '68 156', '129 145', '153 176', '130 109'])
}

test()

// // Run in Kattis
// var lines = []
// rl.on('line', (line) => {
//   lines.push(line)

//   if (lines.length === 2) {
//     const valid = findSolution(lines)

//     if (valid) {
//       console.log(valid.join(' '))
//     } else {
//       console.log('impossible')
//     }

//     process.exit(0)
//   }
// })
