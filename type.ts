//This is the json structure of the new deck call
interface Deck {
    success: boolean,
    deck_id: string,
    shuffled: boolean,
    remaining: number
}

//This is the json structure of the Draw card call
interface Draw {
    success: boolean,
    deck_id: string,
    cards: Array<Cards>,
    remaining: number
}

//This is the json structure of the cards object in the Draw call
interface Cards {
    code: string,
    image: string,
    images: Images,
    value: string,
    suit: string
}

//This is the object structure of the images object in the cards list
interface Images {
    svg: string,
    png: string
}

//function that got me the first deck id for the code
async function getNewDeck(url: string): Promise<Deck | undefined> {
    try {
        //tries to fecth the data from deck api
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error("URL is down")
        }

        //the json will be in the structure of deck
        const data: Deck = await response.json()
        //returns the promise of data which is a deck
        return data
    } catch (error) {
        console.log(error)
        //else it returns a promise of undefined
        return undefined
    }
}

//shuffle the deck function
async function shuffle(deck_id: string): Promise<Deck | undefined> {
    //similar to new deck
    try {
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/shuffle/`)
        const json: Deck = await response.json()
        console.log("Shuffled Deck")
        //returns the same structure as the new deck json
        return json
    } catch (error) {
        console.log(error)
        return undefined
    }
}

//suffles the remainging cards in the deck
async function shuffleRemaining(deck_id: string): Promise<Deck | undefined> {
    //same as shuffle function
    try {
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/shuffle/?remaining=true`)
        const json: Deck = await response.json()
        console.log("Shuffled Remaining Deck")
        return json
    } catch (error) {
        console.log(error)
        return undefined
    }
}

//draws a card from the deck
async function draw(deck_id: string, draw_count: number): Promise<Draw | undefined> {
    try {
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${draw_count}`)
        const json: Draw = await response.json()
        console.log("Draw a card")
        //returns the json structure for the draw (adds the cards that are added)
        return json
    } catch (error) {
        console.log(error)
        return undefined
    }
}

//draws the card and creates the html elements in the player hand
function hit_player(deck_id: string): Promise<number> {
    //makes the function return a promise
    return new Promise((resolve, reject) => {
        //calls the draw
        draw(deck_id, 1)
        //uses .then to use the data after the draw finishes
            .then((data: Draw | undefined) => {
                if (data) {
                    // creates a div with the class of cards
                    const card = document.createElement('div')
                    card.classList.add('card')

                    //creates the imgage to hold the image from the Draw json
                    const card_img = document.createElement('img')
                    card_img.src = data.cards[0].image
                    card_img.alt = data.cards[0].code
                    card_img.classList.add('player_card')
                    card.appendChild(card_img)

                    //makes the image a child of the div and appends the div to the player hand div
                    const player = document.getElementById('player_cards')
                    if (player !== null) {
                        player.appendChild(card)
                    } else {
                        reject(new Error("There is an error with the player"))
                    }
                }
                //returns the promise to resolve, which then makes the promise of the function a number
                if (data !== undefined) {
                    resolve(data.remaining)
                } else {
                    reject(new Error("Failed to draw a card"))
                }
            })
            .catch(error => {
                reject(error)
            })
    })
}

//does the same thing as the player but builds the dealer hand
function hit_dealer(deck_id: string): Promise<number> {
    return new Promise((resolve, reject) => {
        draw(deck_id, 1)
            .then((data: Draw | undefined) => {
                if (data) {
                    const card = document.createElement('div')
                    card.classList.add('card')

                    const card_img = document.createElement('img')
                    card_img.src = data.cards[0].image
                    card_img.alt = data.cards[0].code
                    card_img.classList.add('dealer_card')
                    card.appendChild(card_img)

                    const player = document.getElementById('dealer_cards')
                    if (player !== null) {
                        player.appendChild(card)
                    } else {
                        reject(new Error("There is an error with the dealer"))
                    }
                }
                if (data !== undefined) {
                    resolve(data.remaining)
                } else {
                    reject(new Error("Failed to draw a card"))
                }
            })
            .catch(error => {
                reject(error)
            })
    })
}

//same as the dealer_hit but uses the back of the card image
function hide_hit(deck_id: string): Promise<number> {
    return new Promise((resolve, reject) => {
        draw(deck_id, 1)
            .then((data: Draw | undefined) => {
                if (data) {
                    const card = document.createElement('div')
                    card.classList.add('card')

                    const card_img = document.createElement('img')
                    card_img.src = 'https://deckofcardsapi.com/static/img/back.png'
                    card_img.alt = data.cards[0].code
                    card_img.classList.add('back_image')
                    card_img.classList.add('dealer_card')
                    card.appendChild(card_img)

                    const player = document.getElementById('dealer_cards')
                    if (player !== null) {
                        player.appendChild(card)
                    } else {
                        reject(new Error("There is an error with the dealer"))
                    }
                }
                if (data !== undefined) {
                    resolve(data.remaining)
                } else {
                    reject(new Error("Failed to draw a card"))
                }
            })
            .catch(error => {
                reject(error)
            })
    })
}

//checks the value of the cards of the player
function check_player_value(): number {
    let value = 0
    const cards = document.querySelectorAll('.player_card')
    cards.forEach(element => {
        const imgElement = element as HTMLImageElement
        const alt = imgElement.alt[0]
        let alt_value: number
        if (alt === 'A') {
            alt_value = 11
        } else if (alt === 'K' || alt === 'Q' || alt === 'J' || alt === '0') {
            alt_value = 10
        } else {
            alt_value = parseInt(alt)
        }
        value += alt_value
        console.log(value)
    })
    return value
}

//same as player but checks the value of the dealer cards
function check_dealer_value(): number {
    let value = 0
    const cards = document.querySelectorAll('.dealer_card')
    cards.forEach(element => {
        const imgElement = element as HTMLImageElement
        const alt = imgElement.alt[0]
        let alt_value: number
        if (alt === 'A') {
            alt_value = 11
        } else if (alt === 'K' || alt === 'Q' || alt === 'J' || alt === '0') {
            alt_value = 10
        } else {
            alt_value = parseInt(alt)
        }
        value += alt_value
        console.log(value)
    })
    return value
}

//logic for dealer playing the hand after the player stands
async function play_dealer_hand(deck_id:string): Promise<void> {
    let value = check_dealer_value()
    //nested function to check the value and wait for the draw card and then check again
    async function hitUntilGreaterThan17(): Promise<void> {
        if (value < 17) {
            await hit_dealer(deck_id)
            value = check_dealer_value()
            if (value < 17) {
                await hitUntilGreaterThan17()
            }
        }
    }

    //play_dealer_hand waits for the nested recursive function
    await hitUntilGreaterThan17()
}

function start_dealer(deck_id: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        play_dealer_hand(deck_id)
            .then(() => {
                resolve();
            })
            .catch((error) => {
                reject(error);
            });
    });
}


//makes sure the deck is shuffled
const deck_id = "gb5gcq4ubrtw"
shuffle(deck_id)

//makes sure the html is loaded before running the asyc functions, specifically drawing the first 4 cards
document.addEventListener("DOMContentLoaded", () => {
    const deck_id = "gb5gcq4ubrtw"
    let dealer_value = 0
    let player_value = 0

    //sets event listener for the click of the hit and stand button
    const hit_button = document.getElementById('hit')
    const stand_button = document.getElementById('Stand')
    //if the stand button is hit it flips the hidden card and plays the dealer hand
    if (stand_button !== null){
        stand_button.addEventListener("click", function () {
            console.log("Stand Button was clicked!")
            const hidden_card  = document.querySelector('.back_image') as HTMLImageElement | null
            if (hidden_card !== null){
                hidden_card.classList.remove('back_image')
                hidden_card.classList.add('card_image')
                hidden_card.src = `https://deckofcardsapi.com/static/img/${hidden_card.alt}.png`
                start_dealer(deck_id)
            }else{
                console.log('hidden_card error')
            }
        })
    }else{
        console.log('Error with stand button')
    }

    if (hit_button !== null) {
        hit_button.addEventListener("click", function () {
            console.log("Hit Button was clicked!")
            hit_player(deck_id)
                .then()
        })
    }else{
        console.log('Error with hit button')
    }

    hit_dealer(deck_id)
    hit_player(deck_id)
    hide_hit(deck_id)
    hit_player(deck_id)
        .then(() => {
            dealer_value = check_dealer_value()
            player_value = check_player_value()
            console.log(`dealer:${dealer_value}, Player:${player_value}`)
            if (dealer_value == 21 && player_value == 21){
                const hidden_card  = document.querySelector('.back_image') as HTMLImageElement | null
                if (hidden_card !== null){
                    hidden_card.classList.remove('back_image')
                    hidden_card.classList.add('card_image')
                    hidden_card.src = `https://deckofcardsapi.com/static/img/${hidden_card.alt}.png`
                }else{
                    console.log('hidden_card error')
                }
        
                alert(`Push`)
            }else if(player_value == 21 || dealer_value == 21){
                const hidden_card  = document.querySelector('.back_image') as HTMLImageElement | null
                if (hidden_card !== null){
                    hidden_card.classList.remove('back_image')
                    hidden_card.classList.add('card_image')
                    hidden_card.src = `https://deckofcardsapi.com/static/img/${hidden_card.alt}.png`
                }else{
                    console.log('hidden_card error')
                }
        
                if (player_value == 21){
                    alert('Player Has Blackjack')
                }else if(dealer_value == 21){
                    alert('Dealer Has Blackjack')
                }else{
                    alert('Misdeal, Hand is Under Review')
                }
        
                const cards = document.querySelectorAll('.card')
                cards.forEach(card => {
                    card.remove()
                })
            }
        })
})
