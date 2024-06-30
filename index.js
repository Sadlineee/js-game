let player = document.querySelector('.player')
let playerPosition = { x: 0, y: 0 }

const map = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
]

function move(direction) {
    const directions = {
        'w': { x: -1, y: 0, deg: 0 },
        'a': { x: 0, y: -1, deg: -90 },
        's': { x: 1, y: 0, deg: 180 },
        'd': { x: 0, y: 1, deg: 90 }
    }

    const { x, y, deg } = directions[direction]

    player.style.rotate = deg + 'deg'

    if (movePlayer(playerPosition.x + x, playerPosition.y + y)) {
        playerPosition.x += x
        playerPosition.y += y
        updatePlayerPosition()
    }
}

function movePlayer(x, y) {
    if (x >= 0 && x < map.length && y >= 0 && y < map[0].length && map[y][x] === 0) {
        return true
    }
    return false
}

document.addEventListener('keydown', function(event) {
    const direction = event.key

    if (['w', 'a', 's', 'd'].includes(direction)) {
        move(direction)
    }
})

function updatePlayerPosition() {
    const playerPositionKey = Object.keys(positions).find(
        key => positions[key].x === playerPosition.x && positions[key].y === playerPosition.y
    )

    player.style.top = playerPosition.x * 3 + 'rem'
    player.style.left = playerPosition.y * 3 + 'rem'

    if (playerPositionKey) { 
        if (!collectedPoints.includes(playerPositionKey)) {
            points += rewards[playerPositionKey]
            document.querySelector(`.field_${playerPositionKey}`).style.visibility = 'hidden'
            collectedPoints.push(playerPositionKey)
        }
    }

    pointsCounter.textContent = points + '/1000'
    if (points > 1000) {
        resetPoints()
        location.reload()
    }

    if (playerPosition.x === 4 && playerPosition.y === 4 && points !== 1000) {
        resetPoints()
        location.reload()
    }

    if (playerPosition.x === 4 && playerPosition.y === 4 && points === 1000) {
        alert('YOU WON')
        resetPoints()
        location.reload()
    }
}

let points = 0

const pointsCounter = document.createElement('points')
pointsCounter.textContent = points + '/1000'
document.querySelector('body').append(pointsCounter)

const rewards = {
    'A01': 300, 'B01': 50, 'C01': 150, 'E01': 20,
    'F03': 30, 'C04': 150, 'F01': 30, 'B04': 50, 'D01': 100,
    'D04': 100, 'A02': 300, 'D03': 100, 'E04': 20, 'B02': 50,
    'A04': 300, 'E02': 20, 'B03': 50, 'D02': 100, 'C02': 150,
    'F02': 30, 'C03': 150, 'F04': 30, 'A03': 300
}

const collectedPoints = []

function resetPoints() {
    collectedPoints.length = 0
}

const positions = {
    'A01': { x: 0, y: 1 },
    'B01': { x: 0, y: 2 },
    'C01': { x: 0, y: 3 },
    'E01': { x: 0, y: 4 },
    'F03': { x: 1, y: 0 },
    'C04': { x: 1, y: 1 },
    'F01': { x: 1, y: 2 },
    'B04': { x: 1, y: 3 },
    'D01': { x: 1, y: 4 },
    'D04': { x: 2, y: 0 },
    'A02': { x: 2, y: 1 },
    'D03': { x: 2, y: 2 },
    'E04': { x: 2, y: 3 },
    'B02': { x: 2, y: 4 },
    'A04': { x: 3, y: 0 },
    'E02': { x: 3, y: 1 },
    'B03': { x: 3, y: 2 },
    'D02': { x: 3, y: 3 },
    'C02': { x: 3, y: 4 },
    'F02': { x: 4, y: 0 },
    'C03': { x: 4, y: 1 },
    'F04': { x: 4, y: 2 },
    'A03': { x: 4, y: 3 }
}