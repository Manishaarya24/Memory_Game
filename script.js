
document.addEventListener("DOMContentLoaded", () => {
    const cardsArray = [
        { id: 1, img: 'image1.png' },
        { id: 2, img: 'image2.jpg' },
        { id: 3, img: 'image3.png' },
        { id: 4, img: 'image4.jpg' },
        { id: 5, img: 'images5.png' },
        { id: 6, img: 'images6.webp' },
        { id: 7, img: 'image7.jpeg' },
        { id: 8, img: 'image8.png' },
        { id: 1, img: 'image1.png' },
        { id: 2, img: 'image2.jpg' },
        { id: 3, img: 'image3.png' },
        { id: 4, img: 'image4.jpg' },
        { id: 5, img: 'images5.png' },
        { id: 6, img: 'images6.webp' },
        { id: 7, img: 'image7.jpeg' },
        { id: 8, img: 'image8.png' }
    ];

    let moves = 0;
    let matches = 0;
    let firstCard, secondCard;
    let lockBoard = false;

    const gameGrid = document.getElementById('gameGrid');
    const moveCounter = document.getElementById('moveCounter');
    const resetButton = document.getElementById('resetButton');
    const welcomeOverlay = document.getElementById('welcomeOverlay');
    const gameOverOverlay = document.getElementById('gameOverOverlay');
    const gameOverMessage = document.getElementById('gameOverMessage');
    const startButton = document.getElementById('startButton');
    const restartButton = document.getElementById('restartButton');

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    function createCard(cardData) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.id = cardData.id;

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.style.backgroundImage = `url(${cardData.img})`;

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        card.addEventListener('click', flipCard);
        return card;
    }

    function setupBoard() {
        shuffle(cardsArray);
        gameGrid.innerHTML = '';
        cardsArray.forEach(cardData => {
            const card = createCard(cardData);
            gameGrid.appendChild(card);
        });
    }

    function flipCard() {
        if (lockBoard || this === firstCard) return;
        this.classList.add('flipped');

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        lockBoard = true;

        moves++;
        moveCounter.textContent = moves;

        checkForMatch();
    }

    function checkForMatch() {
        const isMatch = firstCard.dataset.id === secondCard.dataset.id;

        if (isMatch) {
            disableCards();
            matches++;
            if (matches === cardsArray.length / 2) {
                setTimeout(() => showGameOver(true), 1000);
            }
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard();
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');

            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }

    function showWelcome() {
        welcomeOverlay.classList.add('show');
    }

    function hideWelcome() {
        welcomeOverlay.classList.remove('show');
    }

    function showGameOver(won) {
        gameOverMessage.textContent = won ? "Congratulations! You won the game!" : "Game Over! Try again!";
        gameOverOverlay.classList.add('show');
    }

    function hideGameOver() {
        gameOverOverlay.classList.remove('show');
    }

    startButton.addEventListener('click', () => {
        hideWelcome();
        setupBoard();
    });

    resetButton.addEventListener('click', () => {
        moves = 0;
        matches = 0;
        moveCounter.textContent = moves;
        setupBoard();
    });

    restartButton.addEventListener('click', () => {
        hideGameOver();
        moves = 0;
        matches = 0;
        moveCounter.textContent = moves;
        setupBoard();
    });

    showWelcome();
});
