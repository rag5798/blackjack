var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//function that got me the first deck id for the code
function getNewDeck(url) {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("URL is down");
                    }
                    return [4 /*yield*/, response.json()
                        //returns the promise of data which is a deck
                    ];
                case 2:
                    data = _a.sent();
                    //returns the promise of data which is a deck
                    return [2 /*return*/, data];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    //else it returns a promise of undefined
                    return [2 /*return*/, undefined];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//shuffle the deck function
function shuffle(deck_id) {
    return __awaiter(this, void 0, void 0, function () {
        var response, json, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://deckofcardsapi.com/api/deck/".concat(deck_id, "/shuffle/"))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    json = _a.sent();
                    console.log("Shuffled Deck");
                    //returns the same structure as the new deck json
                    return [2 /*return*/, json];
                case 3:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [2 /*return*/, undefined];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//suffles the remainging cards in the deck
function shuffleRemaining(deck_id) {
    return __awaiter(this, void 0, void 0, function () {
        var response, json, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://deckofcardsapi.com/api/deck/".concat(deck_id, "/shuffle/?remaining=true"))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    json = _a.sent();
                    console.log("Shuffled Remaining Deck");
                    return [2 /*return*/, json];
                case 3:
                    error_3 = _a.sent();
                    console.log(error_3);
                    return [2 /*return*/, undefined];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//draws a card from the deck
function draw(deck_id, draw_count) {
    return __awaiter(this, void 0, void 0, function () {
        var response, json, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://deckofcardsapi.com/api/deck/".concat(deck_id, "/draw/?count=").concat(draw_count))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    json = _a.sent();
                    console.log("Draw a card");
                    //returns the json structure for the draw (adds the cards that are added)
                    return [2 /*return*/, json];
                case 3:
                    error_4 = _a.sent();
                    console.log(error_4);
                    return [2 /*return*/, undefined];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//draws the card and creates the html elements in the player hand
function hit_player(deck_id) {
    //makes the function return a promise
    return new Promise(function (resolve, reject) {
        //calls the draw
        draw(deck_id, 1)
            //uses .then to use the data after the draw finishes
            .then(function (data) {
            if (data) {
                // creates a div with the class of cards
                var card = document.createElement('div');
                card.classList.add('card');
                //creates the imgage to hold the image from the Draw json
                var card_img = document.createElement('img');
                card_img.src = data.cards[0].image;
                card_img.alt = data.cards[0].code;
                card_img.classList.add('player_card');
                card.appendChild(card_img);
                //makes the image a child of the div and appends the div to the player hand div
                var player = document.getElementById('player_cards');
                if (player !== null) {
                    player.appendChild(card);
                }
                else {
                    reject(new Error("There is an error with the player"));
                }
            }
            //returns the promise to resolve, which then makes the promise of the function a number
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
//does the same thing as the player but builds the dealer hand
function hit_dealer(deck_id) {
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
                var player = document.getElementById('dealer_cards');
                if (player !== null) {
                    player.appendChild(card);
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
//same as the dealer_hit but uses the back of the card image
function hide_hit(deck_id) {
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
                var player = document.getElementById('dealer_cards');
                if (player !== null) {
                    player.appendChild(card);
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
//checks the value of the cards of the player
function check_player_value() {
    var value = 0;
    var cards = document.querySelectorAll('.player_card');
    cards.forEach(function (element) {
        var imgElement = element;
        var alt = imgElement.alt[0];
        var alt_value;
        if (alt === 'A') {
            alt_value = 11;
        }
        else if (alt === 'K' || alt === 'Q' || alt === 'J' || alt === '0') {
            alt_value = 10;
        }
        else {
            alt_value = parseInt(alt);
        }
        value += alt_value;
        console.log(value);
    });
    return value;
}
//same as player but checks the value of the dealer cards
function check_dealer_value() {
    var value = 0;
    var cards = document.querySelectorAll('.dealer_card');
    cards.forEach(function (element) {
        var imgElement = element;
        var alt = imgElement.alt[0];
        var alt_value;
        if (alt === 'A') {
            alt_value = 11;
        }
        else if (alt === 'K' || alt === 'Q' || alt === 'J' || alt === '0') {
            alt_value = 10;
        }
        else {
            alt_value = parseInt(alt);
        }
        value += alt_value;
        console.log(value);
    });
    return value;
}
//logic for dealer playing the hand after the player stands
function play_dealer_hand(deck_id) {
    return __awaiter(this, void 0, void 0, function () {
        //nested function to check the value and wait for the draw card and then check again
        function hitUntilGreaterThan17() {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(value < 17)) return [3 /*break*/, 3];
                            return [4 /*yield*/, hit_dealer(deck_id)];
                        case 1:
                            _a.sent();
                            value = check_dealer_value();
                            if (!(value < 17)) return [3 /*break*/, 3];
                            return [4 /*yield*/, hitUntilGreaterThan17()];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        var value;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    value = check_dealer_value();
                    //play_dealer_hand waits for the nested recursive function
                    return [4 /*yield*/, hitUntilGreaterThan17()];
                case 1:
                    //play_dealer_hand waits for the nested recursive function
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function start_dealer(deck_id) {
    return new Promise(function (resolve, reject) {
        play_dealer_hand(deck_id)
            .then(function () {
            resolve();
        })
            .catch(function (error) {
            reject(error);
        });
    });
}
//makes sure the deck is shuffled
var deck_id = "gb5gcq4ubrtw";
shuffle(deck_id);
//makes sure the html is loaded before running the asyc functions, specifically drawing the first 4 cards
document.addEventListener("DOMContentLoaded", function () {
    var deck_id = "gb5gcq4ubrtw";
    var dealer_value = 0;
    var player_value = 0;
    //sets event listener for the click of the hit and stand button
    var hit_button = document.getElementById('hit');
    var stand_button = document.getElementById('Stand');
    //if the stand button is hit it flips the hidden card and plays the dealer hand
    if (stand_button !== null) {
        stand_button.addEventListener("click", function () {
            console.log("Stand Button was clicked!");
            var hidden_card = document.querySelector('.back_image');
            if (hidden_card !== null) {
                hidden_card.classList.remove('back_image');
                hidden_card.classList.add('card_image');
                hidden_card.src = "https://deckofcardsapi.com/static/img/".concat(hidden_card.alt, ".png");
                start_dealer(deck_id);
            }
            else {
                console.log('hidden_card error');
            }
        });
    }
    else {
        console.log('Error with stand button');
    }
    if (hit_button !== null) {
        hit_button.addEventListener("click", function () {
            console.log("Hit Button was clicked!");
            hit_player(deck_id)
                .then();
        });
    }
    else {
        console.log('Error with hit button');
    }
    hit_dealer(deck_id);
    hit_player(deck_id);
    hide_hit(deck_id);
    hit_player(deck_id)
        .then(function () {
        dealer_value = check_dealer_value();
        player_value = check_player_value();
        console.log("dealer:".concat(dealer_value, ", Player:").concat(player_value));
        if (dealer_value == 21 && player_value == 21) {
            var hidden_card = document.querySelector('.back_image');
            if (hidden_card !== null) {
                hidden_card.classList.remove('back_image');
                hidden_card.classList.add('card_image');
                hidden_card.src = "https://deckofcardsapi.com/static/img/".concat(hidden_card.alt, ".png");
            }
            else {
                console.log('hidden_card error');
            }
            alert("Push");
        }
        else if (player_value == 21 || dealer_value == 21) {
            var hidden_card = document.querySelector('.back_image');
            if (hidden_card !== null) {
                hidden_card.classList.remove('back_image');
                hidden_card.classList.add('card_image');
                hidden_card.src = "https://deckofcardsapi.com/static/img/".concat(hidden_card.alt, ".png");
            }
            else {
                console.log('hidden_card error');
            }
            if (player_value == 21) {
                alert('Player Has Blackjack');
            }
            else if (dealer_value == 21) {
                alert('Dealer Has Blackjack');
            }
            else {
                alert('Misdeal, Hand is Under Review');
            }
            var cards = document.querySelectorAll('.card');
            cards.forEach(function (card) {
                card.remove();
            });
        }
    });
});
