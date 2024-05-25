var deck_id = "gb5gcq4ubrtw";
shuffle(deck_id);
document.addEventListener("DOMContentLoaded", function () {
    var dealer_value = 0;
    var player_value = 0;
    var cards_remaining = 312;
    var hit_button = document.getElementById('hit');
    var stand_button = document.getElementById('Stand');
    if (stand_button !== null) {
        stand_button.addEventListener("click", function () {
            console.log("Stand Button was clicked!");
            revealHiddenCard();
            dealerPlay().then(function () {
                checkGameState();
                checkForShuffle();
            });
        });
    }
    else {
        console.log('Error with stand button');
    }
    if (hit_button !== null) {
        hit_button.addEventListener("click", function () {
            console.log("Hit Button was clicked!");
            hit_player(deck_id, cards_remaining).then(function (newRemaining) {
                cards_remaining = newRemaining;
                checkGameState();
                checkForShuffle();
            });
        });
    }
    else {
        console.log('Error with hit button');
    }
    function checkGameState() {
        dealer_value = check_dealer_value(dealer_value);
        player_value = check_player_value(player_value);
        console.log("dealer:".concat(dealer_value, ", Player:").concat(player_value));
        if (player_value > 21) {
            alert('Dealer Wins! Player busted.');
            resetGame();
            return;
        }
        if (dealer_value === 21 && player_value === 21) {
            alert("Push");
            resetGame();
        }
        else if (player_value === 21 || dealer_value === 21) {
            if (player_value === 21) {
                alert('Player Has Blackjack');
            }
            else if (dealer_value === 21) {
                alert('Dealer Has Blackjack');
            }
            else {
                alert('Misdeal, Hand is Under Review');
            }
            resetGame();
        }
        else if (dealer_value > 21) {
            alert('Player Wins! Dealer busted.');
            resetGame();
        }
        else if (dealer_value >= 17) {
            if (dealer_value > player_value) {
                alert('Dealer Wins!');
            }
            else if (dealer_value < player_value) {
                alert('Player Wins!');
            }
            else {
                alert('Push');
            }
            resetGame();
        }
    }
    function checkForShuffle() {
        if (cards_remaining <= 312 / 2) {
            shuffle(deck_id).then(function () {
                console.log('Deck shuffled as remaining cards are half or less');
                cards_remaining = 312; // Reset the remaining cards count to full deck
            });
        }
    }
    function revealHiddenCard() {
        var hidden_card = document.querySelector('.back_image');
        if (hidden_card !== null) {
            hidden_card.classList.remove('back_image');
            hidden_card.classList.add('card_image');
            hidden_card.src = "https://deckofcardsapi.com/static/img/".concat(hidden_card.alt, ".png");
        }
        else {
            console.log('hidden_card error');
        }
    }
    function resetGame() {
        var cards = document.querySelectorAll('.card');
        cards.forEach(function (card) {
            card.remove();
        });
        dealer_value = 0;
        player_value = 0;
        startNewRound();
    }
    function startNewRound() {
        hit_dealer(deck_id, cards_remaining)
            .then(function (newRemaining) {
            cards_remaining = newRemaining;
            return hit_player(deck_id, cards_remaining);
        })
            .then(function (newRemaining) {
            cards_remaining = newRemaining;
            return hide_hit(deck_id, cards_remaining);
        })
            .then(function (newRemaining) {
            cards_remaining = newRemaining;
            return hit_player(deck_id, cards_remaining);
        })
            .then(function (newRemaining) {
            cards_remaining = newRemaining;
            checkGameState();
            checkForShuffle();
        });
    }
    // Start the first round
    startNewRound();
});
function hit_player(deck_id, remaining) {
    return new Promise(function (resolve, reject) {
        draw(deck_id, 1)
            .then(function (data) {
            if (data) {
                var card = document.createElement('div');
                card.classList.add('card');
                var card_img = document.createElement('img');
                card_img.src = data.cards[0].image;
                card_img.alt = data.cards[0].code;
                card_img.classList.add('player_card');
                card.appendChild(card_img);
                var player = document.getElementById('player_cards');
                if (player !== null) {
                    player.appendChild(card);
                }
                else {
                    reject(new Error("There is an error with the player"));
                }
            }
            if (data !== undefined) {
                resolve(data.remaining);
            }
            else {
                reject(new Error("Failed to draw a card"));
            }
        })
            .catch(function (error) {
            reject(error);
        });
    });
}
function hit_dealer(deck_id, remaining) {
    return new Promise(function (resolve, reject) {
        draw(deck_id, 1)
            .then(function (data) {
            if (data) {
                var card = document.createElement('div');
                card.classList.add('card');
                var card_img = document.createElement('img');
                card_img.src = data.cards[0].image;
                card_img.alt = data.cards[0].code;
                card_img.classList.add('dealer_card');
                card.appendChild(card_img);
                var dealer = document.getElementById('dealer_cards');
                if (dealer !== null) {
                    dealer.appendChild(card);
                }
                else {
                    reject(new Error("There is an error with the dealer"));
                }
            }
            if (data !== undefined) {
                resolve(data.remaining);
            }
            else {
                reject(new Error("Failed to draw a card"));
            }
        })
            .catch(function (error) {
            reject(error);
        });
    });
}
function hide_hit(deck_id, remaining) {
    return new Promise(function (resolve, reject) {
        draw(deck_id, 1)
            .then(function (data) {
            if (data) {
                var card = document.createElement('div');
                card.classList.add('card');
                var card_img = document.createElement('img');
                card_img.src = 'https://deckofcardsapi.com/static/img/back.png';
                card_img.alt = data.cards[0].code;
                card_img.classList.add('back_image');
                card_img.classList.add('dealer_card');
                card.appendChild(card_img);
                var dealer = document.getElementById('dealer_cards');
                if (dealer !== null) {
                    dealer.appendChild(card);
                }
                else {
                    reject(new Error("There is an error with the dealer"));
                }
            }
            if (data !== undefined) {
                resolve(data.remaining);
            }
            else {
                reject(new Error("Failed to draw a card"));
            }
        })
            .catch(function (error) {
            reject(error);
        });
    });
}
function dealerPlay() {
    return new Promise(function (resolve, reject) {
        function play() {
            if (dealer_value < 17) {
                hit_dealer(deck_id, cards_remaining)
                    .then(function (newRemaining) {
                    cards_remaining = newRemaining;
                    dealer_value = check_dealer_value(dealer_value);
                    play();
                })
                    .catch(function (error) { return reject(error); });
            }
            else {
                resolve();
            }
        }
        play();
    });
}
