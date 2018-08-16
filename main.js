const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
	if (lockBoard) return;
	if (this === firstCard) return;

	this.classList.add('flip');

	if (!hasFlippedCard) {
		//First Click
		hasFlippedCard = true;
		firstCard = this;
		return;
	}

	// Second click
	secondCard = this;
	checkForMatch();
}

function checkForMatch() {
	let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

	isMatch ? disableCard() : unflipCard();
}

function disableCard() {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);
	resetBoard();
}

function unflipCard() {
	lockBoard = true;
	setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');
		resetBoard();
	}, 1000);
}
function resetBoard() {
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}

(function shuffle() {
	cards.forEach(card => {
		let randomPos = Math.floor(Math.random() * 12);
		card.style.order = randomPos;
	});
})();

function hasClass(element, className) {
	return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
}

function restartGame() {
	cards.forEach(card => {
		if (hasClass(card, 'flip')) {
			card.classList.remove('flip');
		}
		setTimeout(() => {
			let randomPos = Math.floor(Math.random() * 12);
			card.style.order = randomPos;
		}, 400);
	});
	cards.forEach(card => card.addEventListener('click', flipCard));
}

cards.forEach(card => card.addEventListener('click', flipCard));
