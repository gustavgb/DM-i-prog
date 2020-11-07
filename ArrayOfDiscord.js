const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function replaceNums (list, pos1, num1, pos2, num2) {
  list[pos1] = num1
  list[pos2] = num2

  return list
}

function solution (lines) {
  if (lines.length === 2) {
    const numbers = lines[1].split(' ')

    for (let i = 1; i < numbers.length; i++) {
      let numA = numbers[i - 1]
      let numB = numbers[i]

      if (numbers[i - 1].length === numbers[i].length) {
        if (numbers[i - 1].length === 1) {
          if (numA === '0') {
            numA = '9'
          } else {
            numB = '0'
          }

          if (numA > numB) {
            return replaceNums(numbers, i - 1, numA, i, numB)
          }
        } else {
          for (let j = 0; j < numA.length; j++) {
            if (numB[j] > 1 && numA[j] > 1) {
              const str = numB.split('')
              str[j] = '1'
              numB = str.join('')

              return replaceNums(numbers, i - 1, numA, i, numB)
            } else if (numB[j] < 9 && numA[j] < 9) {
              const str = numA.split('')
              str[j] = '9'
              numA = str.join('')

              return replaceNums(numbers, i - 1, numA, i, numB)
            }
          }
        }
      }
    }
  }
}

// function run (lines) {
//   console.log('Got: ' + lines.join(', '))

//   const valid = solution(lines)
//   return valid || 'impossible'
// }

// function test () {
//   console.log('Solution: ' + run(['3', '2020 2020 2020']))
//   console.log('Solution: ' + run(['2', '1 999999']))
//   console.log('Solution: ' + run(['4', '1 42 1243 3421']))
//   console.log('Solution: ' + run(['2', '500 500']))
//   console.log('Solution: ' + run(['2', '400 500']))
//   console.log('Solution: ' + run(['2', '100 100']))
//   console.log('Solution: ' + run(['2', '900 900']))
//   console.log('Solution: ' + run(['2', '1 1']))
//   console.log('Solution: ' + run(['2', '9 9']))
//   console.log('Solution: ' + run(['2', '4 5']))
//   console.log('Solution: ' + run(['3', '9 9 9']))
//   console.log('Solution: ' + run(['2', '999 999']))
//   console.log('Solution: ' + run(['3', '1 34 123']))
// }

var lines = []
rl.on('line', (line) => {
  lines.push(line)

  if (lines.length === 2) {
    const valid = solution(lines)

    if (valid) {
      console.log(valid.join(' '))
    } else {
      console.log('impossible')
    }

    process.exit(0)
  }
})
