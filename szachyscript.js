let curBoard;
let curPlayer;

let curHeldPiece;
let curHeldPieceStartingPosition;

function startGame() {
    const starterPosition = [
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['.', '.', '.', '.', '.', '.', '.', '.'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']
    ];

    const starterPlayer = 'white';

    loadPosition(starterPosition, starterPlayer);
}

function loadPosition(position, playerToMove) {
    curBoard = position;
    curPlayer = playerToMove;

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (position[i][j] !== '.') {
                loadPiece(position[i][j], [i + 1, j + 1]);
            }
        }
    }
}

function loadPiece(piece, position) {
    const squareElement = document.getElementById(`${position[0]}${position[1]}`);

    if (!squareElement) {
        console.error(`Element for position ${position[0]}${position[1]} not found.`);
        return;
    }

    const pieceElement = document.createElement('img');
    pieceElement.classList.add('piece');
    pieceElement.id = piece;
    pieceElement.draggable = false;
    pieceElement.src = getPieceImageSource(piece);

    squareElement.appendChild(pieceElement);
}

function getPieceImageSource(piece) {
    switch (piece) {
        case 'R': return 'assets/black_rook.png';
        case 'N': return 'assets/black_knight.png';
        case 'B': return 'assets/black_bishop.png';
        case 'Q': return 'assets/black_queen.png';
        case 'K': return 'assets/black_king.png';
        case 'P': return 'assets/black_pawn.png';
        case 'r': return 'assets/white_rook.png';
        case 'n': return 'assets/white_knight.png';
        case 'b': return 'assets/white_bishop.png';
        case 'q': return 'assets/white_queen.png';
        case 'k': return 'assets/white_king.png';
        case 'p': return 'assets/white_pawn.png';
        default: return ''; // Default case to avoid errors
    }
}

function setPieceHoldEvents() {
    let mouseX, mouseY = 0;

    document.addEventListener('mousemove', function (event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    let pieces = document.getElementsByClassName('piece');
    let movePieceInterval;
    let hasIntervalStarted = false;

    for (const piece of pieces) {
        piece.addEventListener('mousedown', function (event) {
            mouseX = event.clientX;
            mouseY = event.clientY;

            if (hasIntervalStarted === false) {
                piece.style.position = 'absolute';

                curHeldPiece = piece;
                const curHeldPieceStringPosition = piece.parentElement.id.split('');

                curHeldPieceStartingPosition = [parseInt(curHeldPieceStringPosition[0]) - 1, parseInt(curHeldPieceStringPosition[1]) - 1];

                movePieceInterval = setInterval(function () {
                    piece.style.top = mouseY - piece.offsetHeight / 2 + window.scrollY + 'px';
                    piece.style.left = mouseX - piece.offsetWidth / 2 + window.scrollX + 'px';
                }, 1);

                hasIntervalStarted = true;
            }
        });
    }

    document.addEventListener('mouseup', function (event) {
        window.clearInterval(movePieceInterval);

        if (curHeldPiece != null) {
            const boardElement = document.querySelector('.board');

            if ((event.clientX > boardElement.offsetLeft - window.scrollX && event.clientX < boardElement.offsetLeft + boardElement.offsetWidth - window.scrollX) &&
                (event.clientY > boardElement.offsetTop - window.scrollY && event.clientY < boardElement.offsetTop + boardElement.offsetHeight - window.scrollY)) {
                const mousePositionOnBoardX = event.clientX - boardElement.offsetLeft + window.scrollX;
                const mousePositionOnBoardY = event.clientY - boardElement.offsetTop + window.scrollY;

                const boardBorderSize = parseInt(getComputedStyle(document.querySelector('.board'), null)
                    .getPropertyValue('border-left-width')
                    .split('px')[0]);

                const xPosition = Math.floor((mousePositionOnBoardX - boardBorderSize) / document.getElementsByClassName('square')[0].offsetWidth);
                const yPosition = Math.floor((mousePositionOnBoardY - boardBorderSize) / document.getElementsByClassName('square')[0].offsetHeight);

                const pieceReleasePosition = [yPosition, xPosition];

                if (!(pieceReleasePosition[0] == curHeldPieceStartingPosition[0] && pieceReleasePosition[1] == curHeldPieceStartingPosition[1])) {
                    if (validateMovement(curHeldPieceStartingPosition, pieceReleasePosition)) {
                        movePiece(curHeldPiece, curHeldPieceStartingPosition, pieceReleasePosition);

                        if (isCheckmate()) {
                            endGame();
                            return;
                        }
                    }
                }
            }

            curHeldPiece.style.position = 'static';
            curHeldPiece = null;
            curHeldPieceStartingPosition = null;
        }

        hasIntervalStarted = false;
    });
}

function movePiece(piece, startingPosition, endingPosition) {
    const boardPiece = curBoard[startingPosition[0]][startingPosition[1]];

    if (boardPiece !== '.') {
        if ((boardPiece === boardPiece.toUpperCase() && curPlayer === 'black') ||
            (boardPiece === boardPiece.toLowerCase() && curPlayer === 'white')) {
            curBoard[startingPosition[0]][startingPosition[1]] = '.';
            curBoard[endingPosition[0]][endingPosition[1]] = boardPiece;

            const destinationSquare = document.getElementById(`${endingPosition[0] + 1}${endingPosition[1] + 1}`);
            destinationSquare.textContent = '';
            destinationSquare.appendChild(piece);

            // Check if the move results in checkmate
            if (isCheckmate()) {
                endGame();
                return;
            }

            // Switch player
            curPlayer = curPlayer === 'white' ? 'black' : 'white';
        }
    }
}

function validateMovement(startingPosition, endingPosition) {
    const boardPiece = curBoard[startingPosition[0]][startingPosition[1]];

    switch (boardPiece) {
        case 'r':
        case 'R': return validateRookMovement(startingPosition, endingPosition);
        case 'n':
        case 'N': return validateKnightMovement(startingPosition, endingPosition);
        case 'b':
        case 'B': return validateBishopMovement(startingPosition, endingPosition);
        case 'q':
        case 'Q': return validateQueenMovement(startingPosition, endingPosition);
        case 'k':
        case 'K': return validateKingMovement(startingPosition, endingPosition);
        case 'p': return validatePawnMovement('white', startingPosition, endingPosition);
        case 'P': return validatePawnMovement('black', startingPosition, endingPosition);
    }
}

function validateBishopMovement(startingPosition, endingPosition) {
    const [startRow, startCol] = startingPosition;
    const [endRow, endCol] = endingPosition;

    if (Math.abs(endRow - startRow) === Math.abs(endCol - startCol)) {
        return validatePathIsBlocked(startingPosition, endingPosition);
    }
    return false;
}

function validateKingMovement(startingPosition, endingPosition) {
    const [startRow, startCol] = startingPosition;
    const [endRow, endCol] = endingPosition;

    if (Math.abs(endRow - startRow) <= 1 && Math.abs(endCol - startCol) <= 1) {
        if (isFriendlyPieceOnEndingPosition(endingPosition)) {
            return false;
        }
        return true;
    }
    return false;
}

function validateKnightMovement(startingPosition, endingPosition) {
    const [startRow, startCol] = startingPosition;
    const [endRow, endCol] = endingPosition;

    const rowDiff = Math.abs(endRow - startRow);
    const colDiff = Math.abs(endCol - startCol);

    if ((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)) {
        return true;
    }
    return false;
}

function validatePawnMovement(color, startingPosition, endingPosition) {
    const [startRow, startCol] = startingPosition;
    const [endRow, endCol] = endingPosition;

    const direction = color === 'white' ? -1 : 1;

    if (startCol === endCol && endRow === startRow + direction && curBoard[endRow][endCol] === '.') {
        return true;
    }

    if (Math.abs(startCol - endCol) === 1 && endRow === startRow + direction && curBoard[endRow][endCol] !== '.') {
        return true;
    }

    return false;
}

function validateQueenMovement(startingPosition, endingPosition) {
    return validateRookMovement(startingPosition, endingPosition) || validateBishopMovement(startingPosition, endingPosition);
}

function validateRookMovement(startingPosition, endingPosition) {
    const [startRow, startCol] = startingPosition;
    const [endRow, endCol] = endingPosition;

    if (startRow === endRow || startCol === endCol) {
        return validatePathIsBlocked(startingPosition, endingPosition);
    }
    return false;
}

function validatePathIsBlocked(startingPosition, endingPosition) {
    const [startRow, startCol] = startingPosition;
    const [endRow, endCol] = endingPosition;

    const rowStep = (endRow - startRow) === 0 ? 0 : (endRow - startRow) / Math.abs(endRow - startRow);
    const colStep = (endCol - startCol) === 0 ? 0 : (endCol - startCol) / Math.abs(endCol - startCol);

    let row = startRow + rowStep;
    let col = startCol + colStep;

    while (row !== endRow || col !== endCol) {
        if (curBoard[row][col] !== '.') {
            return false;
        }
        row += rowStep;
        col += colStep;
    }

    return true;
}

function isFriendlyPieceOnEndingPosition(position) {
    const [row, col] = position;
    const piece = curBoard[row][col];
    return piece !== '.' && ((curPlayer === 'white' && piece === piece.toLowerCase()) || (curPlayer === 'black' && piece === piece.toUpperCase()));
}

function isCheckmate() {
    const kingPosition = findKingPosition();
    if (!kingPosition) return false;

    return !canKingMove(kingPosition) && isInCheck(kingPosition);
}

function findKingPosition() {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if ((curBoard[row][col] === 'K' && curPlayer === 'white') || (curBoard[row][col] === 'k' && curPlayer === 'black')) {
                return [row, col];
            }
        }
    }
    return null;
}

function canKingMove(kingPosition) {
    const [row, col] = kingPosition;

    for (let r = row - 1; r <= row + 1; r++) {
        for (let c = col - 1; c <= col + 1; c++) {
            if (r >= 0 && r < 8 && c >= 0 && c < 8 && (r !== row || c !== col)) {
                if (!isInCheck([r, c]) && isKingSafeAfterMove([r, c])) {
                    return true;
                }
            }
        }
    }
    return false;
}

function isInCheck(kingPosition) {
    const [kingRow, kingCol] = kingPosition;

    // Define a function to check if a position is under attack by a given piece
    function isUnderAttack(row, col, direction, maxSteps) {
        for (let step = 1; step <= maxSteps; step++) {
            const newRow = row + step * direction[0];
            const newCol = col + step * direction[1];

            if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) break;

            const piece = curBoard[newRow][newCol];

            if (piece !== '.') {
                if (isOpponentPiece(piece)) {
                    if (isValidAttack(piece, kingPosition, [newRow, newCol])) {
                        return true;
                    }
                }
                break; // Path is blocked by a piece
            }
        }
        return false;
    }

    function isOpponentPiece(piece) {
        return (curPlayer === 'white' && piece === piece.toLowerCase()) ||
               (curPlayer === 'black' && piece === piece.toUpperCase());
    }

    function isValidAttack(piece, kingPosition, attackerPosition) {
        // Implement logic to check if the piece can attack the king's position
        // Depending on the piece, implement the correct attacking patterns
        const [attackerRow, attackerCol] = attackerPosition;
        switch (piece.toLowerCase()) {
            case 'r':
                return attackerRow === kingPosition[0] || attackerCol === kingPosition[1];
            case 'b':
                return Math.abs(attackerRow - kingPosition[0]) === Math.abs(attackerCol - kingPosition[1]);
            case 'q':
                return (attackerRow === kingPosition[0] || attackerCol === kingPosition[1]) ||
                       (Math.abs(attackerRow - kingPosition[0]) === Math.abs(attackerCol - kingPosition[1]));
            case 'k':
                return Math.abs(attackerRow - kingPosition[0]) <= 1 && Math.abs(attackerCol - kingPosition[1]) <= 1;
            case 'n':
                const rowDiff = Math.abs(attackerRow - kingPosition[0]);
                const colDiff = Math.abs(attackerCol - kingPosition[1]);
                return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
            case 'p':
                const direction = piece === 'p' ? -1 : 1;
                return Math.abs(attackerRow - kingPosition[0]) === 1 && Math.abs(attackerCol - kingPosition[1]) === 1;
            default:
                return false;
        }
    }

    // Check all 8 directions for potential attacks (horizontal, vertical, diagonal)
    const directions = [
        [1, 0], [-1, 0], [0, 1], [0, -1], // Rook directions
        [1, 1], [1, -1], [-1, 1], [-1, -1] // Bishop directions
    ];

    for (const direction of directions) {
        if (isUnderAttack(kingRow, kingCol, direction, 7)) {
            return true;
        }
    }

    // Check for knight attacks
    const knightMoves = [
        [2, 1], [2, -1], [-2, 1], [-2, -1],
        [1, 2], [1, -2], [-1, 2], [-1, -2]
    ];

    for (const move of knightMoves) {
        const newRow = kingRow + move[0];
        const newCol = kingCol + move[1];
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            const piece = curBoard[newRow][newCol];
            if (piece.toLowerCase() === 'n' && isOpponentPiece(piece)) {
                return true;
            }
        }
    }

    // Check for pawn attacks
    const pawnAttacks = [
        [-1, -1], [-1, 1] // White pawns attacking diagonally down
    ];

    if (curPlayer === 'black') {
        pawnAttacks.push([1, -1], [1, 1]); // Black pawns attacking diagonally up
    }

    for (const attack of pawnAttacks) {
        const newRow = kingRow + attack[0];
        const newCol = kingCol + attack[1];
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            const piece = curBoard[newRow][newCol];
            if (piece.toLowerCase() === 'p' && isOpponentPiece(piece)) {
                return true;
            }
        }
    }

    return false;
}

function isKingSafeAfterMove(newPosition) {
    // Temporarily make the move
    const tempBoard = curBoard.map(row => row.slice());
    const [currentRow, currentCol] = findKingPosition();
    const [newRow, newCol] = newPosition;

    // Move the king to the new position
    tempBoard[newRow][newCol] = tempBoard[currentRow][currentCol];
    tempBoard[currentRow][currentCol] = '.';

    // Check if the king is in check at the new position
    const kingInCheck = isInCheck(newPosition);

    // Revert the move
    tempBoard[currentRow][currentCol] = tempBoard[newRow][newCol];
    tempBoard[newRow][newCol] = '.';

    return !kingInCheck;
}

function endGame() {
    alert(`${curPlayer.charAt(0).toUpperCase() + curPlayer.slice(1)} gacz wygrał przez szach-mat!`);
    document.querySelectorAll('.piece').forEach(piece => piece.remove());
}

window.onload = function() {
    startGame();
    setPieceHoldEvents();
};
