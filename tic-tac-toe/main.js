let botText = document.getElementById("selection-1");
let playerText = document.getElementById("selection-2");
let win_strike = document.getElementById("win-strike");
let win_modal = document.getElementById("win-modal");
let bot_win = document.getElementById("bot-win");
let canvas = document.getElementById("game-body");

let isBotPlaying = game_on = initialTurn = true;
let alphaLimit = ["a", "b", "c"];
let characters_array = [];
let bot_messages = [
    "Hahahaha!!!",
    "OMG, you fell for that",
    "AI > your eye",
    "and its a wrap",
    "I'm tired of all the winnings",
    "Better luck next time",
    "I'm on fire man",
    "This makes me the best AI of the world",
    "Stand up for the champ",
    "I can teach you how to play"
]

let current_id;
let turn_count = 1;

let player_1 = `
<svg id="tick" class="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
width="352.62px" height="352.62px" viewBox="0 0 352.62 352.62" style="enable-background:new 0 0 352.62 352.62;"
xml:space="preserve">
<g>
<path d="M337.222,22.952c-15.912-8.568-33.66,7.956-44.064,17.748c-23.867,23.256-44.063,50.184-66.708,74.664
   c-25.092,26.928-48.348,53.856-74.052,80.173c-14.688,14.688-30.6,30.6-40.392,48.96c-22.032-21.421-41.004-44.677-65.484-63.648
   c-17.748-13.464-47.124-23.256-46.512,9.18c1.224,42.229,38.556,87.517,66.096,116.28c11.628,12.24,26.928,25.092,44.676,25.704
   c21.42,1.224,43.452-24.48,56.304-38.556c22.645-24.48,41.005-52.021,61.812-77.112c26.928-33.048,54.468-65.485,80.784-99.145
   C326.206,96.392,378.226,44.983,337.222,22.952z M26.937,187.581c-0.612,0-1.224,0-2.448,0.611
   c-2.448-0.611-4.284-1.224-6.732-2.448l0,0C19.593,184.52,22.653,185.132,26.937,187.581z"/>
</g>
</svg>`;
let player_2 = `
<svg id="cross" class="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 415.188 415.188" style="enable-background:new 0 0 415.188 415.188;" xml:space="preserve">
<path d="M412.861,78.976c3.404-6.636,2.831-14.159-0.15-20.404c0.84-7.106-1.02-14.321-7.746-19.855
	c-6.262-5.151-12.523-10.305-18.781-15.457c-11.005-9.055-28.237-11.913-38.941,0c-48.619,54.103-99.461,105.856-152.167,155.725
	c-39.185-36.605-78.846-72.713-118.223-108.868c-13.82-12.693-33.824-8.71-42.519,6.411c-12.665,6.286-22.931,14.481-31.42,28.468
	c-4.042,6.664-3.727,15.076,0,21.764c25.421,45.578,74.557,85.651,114.957,122.529c-5.406,4.839-10.772,9.724-16.287,14.461
	c-54.43,46.742-91.144,76.399-23.029,124.325c0.919,0.647,1.856,0.504,2.789,0.882c1.305,0.602,2.557,1.026,4.004,1.264
	c0.45,0.017,0.87,0.093,1.313,0.058c1.402,0.114,2.774,0.471,4.195,0.192c36.621-7.18,70.677-35.878,101.576-67.48
	c30.1,29.669,62.151,58.013,97.395,74.831c8.391,4.005,18.395,1.671,24.855-3.931c10.832,0.818,20.708-5.913,25.665-15.586
	c0.734-0.454,1.207-0.713,2.002-1.21c15.748-9.838,17.187-29.431,5.534-42.936c-26.313-30.492-54.284-59.478-82.798-87.95
	C316.426,196.043,380.533,141.939,412.861,78.976z"/>
<g>
</svg>`;

function switchUsers() {
    isBotPlaying = !isBotPlaying
    if (!isBotPlaying) {
        botText.classList.add("no-display");
        playerText.classList.remove("no-display");
    }
    else {
        botText.classList.remove("no-display");
        playerText.classList.add("no-display");
    }
}

function markIt(id) {
    characters_array.push(id);
    let box = document.getElementById(id);
    box.classList.add("no-pointer-event");

    if (initialTurn && game_on) {
        box.innerHTML = player_1;
        current_id = "tick";
        checkWin(box);
        turn_count++;
    }
    else {
        box.innerHTML = player_2;
        current_id = "cross";
        checkWin(box);
        turn_count++;
    }

    initialTurn = !initialTurn;

    if (isBotPlaying && !initialTurn && game_on) {
        let botChoice = Math.floor((Math.random()) * 3) + 1;
        let botCharacter = alphaLimit[Math.floor(Math.random() * 3)];
        let check = document.getElementById(botCharacter + botChoice);
        setTimeout(() => {
            while (characters_array.includes(botCharacter + botChoice)) {
                if (turn_count > 10)
                    break;
                botChoice = Math.floor(Math.random() * 3) + 1;
                botCharacter = alphaLimit[Math.floor(Math.random() * 3)];
                check = document.getElementById(botCharacter + botChoice);
            }
            if (!characters_array.includes(botCharacter + botChoice)) {
                markIt(botCharacter + botChoice);
            }
        }, 500);
    }
}


function checkWin(box) {
    let position = box.id;
    let char = box.id.substr(0, 1);
    let digit = box.id.substr(1, 1);

    for (loop = 1; loop <= 3; loop++) {
        switch (loop) {
            case 1:
                check_horizontal(char, position);
                break;

            case 2:
                check_vertical(digit, position);
                break;

            case 3:
                check_diagonal(digit, char, position);
                break;
        }
    }
}

function check_horizontal(char, position) {
    let _count = 1, last_element = "";

    if (alphaLimit.includes(char)) {
        for (let i = 1; i <= 3; i++) {
            let char_right = returnNextChar(1, position, i);
            let char_left = returnPrevChar(1, position, i);
            if (char_left < 4 && char_left > 0) {
                let a = document.getElementById(char + char_left);
                a.childNodes.forEach(node => {
                    if (node.nodeType == 1 && node.id == current_id) {
                        last_element = a.id;
                        _count++;
                    }
                });
            }
            if (char_right < 4 && char_right > 0) {
                let a = document.getElementById(char + char_right);
                a.childNodes.forEach(node => {
                    if (node.nodeType == 1 && node.id == current_id) {
                        last_element = a.id;
                        _count++;
                    }
                });
            }
        }
    }
    if (_count === 3) {
        if (last_element.includes('a1') || last_element.includes('a3')) {
            win_strike.classList.add("top-100px");
            game_end("top-100px");
            if (!isBotPlaying) {
                setTimeout(() => {
                    reset_game("top-100px");
                }, 500);
            }
        }
        if (last_element.includes('b1') || last_element.includes('b3')) {
            win_strike.classList.add("top-300px");
            game_end("top-300px");
            if(!isBotPlaying) {
                setTimeout(() => {
                    reset_game("top-300px");
                }, 500);
            }
        }
        if (last_element.includes('c1') || last_element.includes('c3')) {
            win_strike.classList.add("bottom-100px");
            game_end("bottom-100px");
            if (!isBotPlaying) {
                setTimeout(() => {
                    reset_game("bottom-100px");
                }, 500);
            }
        }
    }
}


function check_vertical(digit, position) {
    let _count = 1;

    if (digit > 0 && digit < 4) {
        for (let i = 1; i <= 3; i++) {
            let char_right = returnNextChar(0, position, i);
            let char_left = returnPrevChar(0, position, i);

            if (alphaLimit.includes(char_left)) {
                let a = document.getElementById(char_left + digit);
                a.childNodes.forEach(node => {
                    if (node.nodeType == 1 && node.id == current_id) {
                        last_element = a.id;
                        _count++;
                    }
                });
            }
            if (alphaLimit.includes(char_right)) {
                let a = document.getElementById(char_right + digit);
                a.childNodes.forEach(node => {
                    if (node.nodeType == 1 && node.id == current_id) {
                        last_element = a.id;
                        _count++;
                    }
                });
            }
        }
    }
    if (_count === 3) {
        if (last_element.includes('a1') || last_element.includes('c1')) {
            win_strike.classList.add("left-trasnlate-90");
            game_end("left-trasnlate-90");
            if (!isBotPlaying) {
                setTimeout(() => {
                    reset_game("left-trasnlate-90");
                }, 500);
            }
        }
        if (last_element.includes('a2') || last_element.includes('c2')) {
            win_strike.classList.add("middle-trasnlate-90");
            game_end("middle-trasnlate-90");
            if (!isBotPlaying) {
                setTimeout(() => {
                    reset_game("middle-trasnlate-90");
                }, 500);
            }
        }
        if (last_element.includes('a3') || last_element.includes('c3')) {
            win_strike.classList.add("right-trasnlate-90");
            game_end("right-trasnlate-90");
            if (!isBotPlaying) {
                setTimeout(() => {
                    reset_game("right-trasnlate-90");
                }, 500);

            }
        }
    }
}


function check_diagonal(digit, char, position) {
    let _count1 = _count2 = _count3 = _count4 = 1;
    let char_left, char_top, char_right, char_bottom = '';

    for (let i = 1; i <= 3; i++) {
        char_left = returnPrevChar(1, position, i);
        char_right = returnNextChar(1, position, i);
        char_top = returnPrevChar(0, position, i);
        char_bottom = returnNextChar(0, position, i);

        if (alphaLimit.includes(char_top)) {
            if (char_left > 0 && char_left < 4) {
                let a = document.getElementById(char_top + char_left);
                a.childNodes.forEach(node => {
                    if (node.nodeType == 1 && node.id == current_id) {
                        last_element = a.id;
                        _count1++;
                    }
                });
            }
            if (char_right > 0 && char_right < 4) {
                let a = document.getElementById(char_top + char_right);
                a.childNodes.forEach(node => {
                    if (node.nodeType == 1 && node.id == current_id) {
                        last_element = a.id;
                        _count2++;
                    }
                });
            }
        }
        if (alphaLimit.includes(char_bottom)) {
            if (char_left > 0 && char_left < 4) {
                let a = document.getElementById(char_bottom + char_left);
                a.childNodes.forEach(node => {
                    if (node.nodeType == 1 && node.id == current_id) {
                        last_element = a.id;
                        _count2++;
                    }
                });
            }
            if (char_right > 0 && char_right < 4) {
                let a = document.getElementById(char_bottom + char_right);
                a.childNodes.forEach(node => {
                    if (node.nodeType == 1 && node.id == current_id) {
                        last_element = a.id;
                        _count1++;
                    }
                });
            }
        }
    }

    if (_count1 === 3 || _count2 === 3) {
        if (last_element.includes('a1') || last_element.includes('c3')) {
            win_strike.classList.add("diagonal");
            game_end("diagonal");
            if (!isBotPlaying) {
                setTimeout(() => {
                    reset_game("diagonal");
                }, 500);
            }
        }
        if (last_element.includes('a3') || last_element.includes('c1')) {
            win_strike.classList.add("anti-diagonal");
            game_end("anti-diagonal");
            if (!isBotPlaying) {
                setTimeout(() => {
                    reset_game("anti-diagonal");
                }, 500);
            }
        }
    }
}

function game_end() {
    win_strike.style.display = "block";
    game_on = false;
    if (isBotPlaying && !initialTurn) {
        win_modal.classList.remove("no-display");
        bot_win.innerHTML = "Bot: " + bot_messages[Math.floor(Math.random() * 10)];
        canvas.classList.add("no-pointer-event");
    }
    else {
        setTimeout(() => {
            location.reload();
        }, 500);
    }
}

function reset_game(strike_class) {
    for (let i = 1; i <= 3; i++) {
        document.getElementById("a" + i).innerHTML = "";
        document.getElementById("b" + i).innerHTML = "";
        document.getElementById("c" + i).innerHTML = "";
    }
    current_id;
    turn_count = 1;
    win_strike.classList.remove(strike_class);
    win_strike.style.display = "none";
    location.reload();
}

// Return next row's element
function returnNextChar(start, character, nextRange) {
    return String.fromCharCode(character.substr(start, 1).charCodeAt(0) + nextRange)
}
// Return previous row's element
function returnPrevChar(start, character, prevRange) {
    return String.fromCharCode(character.substr(start, 1).charCodeAt(0) - prevRange)
}