//variables
const cardImages = ["bear","bear","bird","bird","cat","cat","dog", "dog","fish", "fish","giraffe","giraffe","monkey","monkey","tiger","tiger","horse","horse"];
const cards = [];
const players = [];
let activePlayer;
let nbPlayers=2 ;
let openedCards = [];
const divPlayers=document.getElementById("players");

function Card(id, image) {
    this.id = id;
    this.cssClass="card";
    this.image = image;
    this.disable = function () {
        document.getElementById(this.id).removeEventListener("click", handler);  
        document.getElementById(this.id).style = "cursor:auto";
    }
}
function Player(id, name, active, score) {
    this.id = id;
    this.name = name;
    this.active = active;
    this.score = score;
    this.addScore = function () {
        this.score++;
    }
}

function createCard(idx, image) {
    let card = new Card(idx, image);
    cards.push(card);
    const cardEl = document.createElement("div");
    cardEl.id = idx;
    cardEl.className = "card";
    cardEl.style = "cursor:pointer";
    cardEl.addEventListener('click',handler);
    return cardEl;
}

let handler= function(e){
    openCard(e);
}

function checkPlayersNames(){
    let playersInputs=[...document.getElementById("players").querySelectorAll("[id^='player']")];
    if(playersInputs.find(v=>v.value=='')==undefined){
        document.getElementById("startBtn").removeAttribute("disabled");
        document.getElementById("startBtn").classList.remove("button-disabbled");   
    }
    else if(document.getElementById("startBtn").classList.contains("button-disabbled")==false){
        document.getElementById("startBtn").classList.add("button-disabbled");
        document.getElementById("startBtn").disabled = true;
    }
}

function initPlayers() {
    players.push(new Player(1, document.querySelector("input#player1").value, true, 0));
    players.push(new Player(2, document.querySelector("input#player2").value, false, 0));
    activePlayer = players[0];
}

function areCardsSimilar() {
    return openedCards[0].image == openedCards[1].image
}
function openCard(e) {
    if (openedCards.length <= 1) {
        e.target.classList.add(cards[e.target.id].image);
        cards[e.target.id].cssClass=cards[e.target.id].cssClass+" "+ cards[e.target.id].image;
        openedCards.push(cards[e.target.id]);
        if (openedCards.length == 2) {
            if (areCardsSimilar()) {
                activePlayer.addScore();
                document.getElementById("score"+activePlayer.id).innerText = `score ${activePlayer.name} : ${activePlayer.score}`
               disablePair();
               if(isEnded()){
                   document.getElementById("winner").innerText = players.filter(v=>v.score==Math.max(...players.map(o => o.score)))[0].name +" is the winer!";
                   document.getElementById("winner").hidden = false;
                   document.getElementsByClassName("board").disabled= true;
               }
            } else {
                for (p of players) {
                    p.active = !p.active
                }
                activePlayer = players.filter(player => player.active == true)[0];
                setTimeout(hideCard, 2000);
                displayCurrentPlayer();
            }
        }
    }
}

function hideCard() {
    const list=document.getElementById(openedCards[0].id).classList;
    list.remove(openedCards[0].image);
    const list2=document.getElementById(openedCards[1].id).classList;
    list2.remove(openedCards[1].image);
    openedCards[0].cssClass="card";
    openedCards[1].cssClass="card";
    openedCards = [];
}

function disablePair() {
    for (i of openedCards) {
        i.disable();
    }
    openedCards = [];
}

function createPlayersInput(){
    for(i=0;i<nbPlayers;i++){
        createOnePlayerInput(`player${i+1}`); 
    }
}

function createScorePlayers(){
    for(i=0;i<nbPlayers;i++){
        const score=document.createElement("span");
        score.id=`score${i+1}`;
        score.innerText="score: 0";
        divPlayers.appendChild(score);
    }
}

function initFirstScreen(){
    createPlayersInput();
    createScorePlayers();
    const startBtn=document.createElement("button");
    startBtn.id="startBtn";
    startBtn.disabled=true;
    startBtn.addEventListener("click",initGame);
    startBtn.innerText="Start Playing";
    divPlayers.appendChild(startBtn);
    const turn=document.createElement("div");
    turn.id="turn";
    divPlayers.appendChild(turn);
    const winner=document.createElement("div");
    winner.id="winner";
    winner.hidden=true;
    divPlayers.appendChild(winner);
}

function initGame() {
    initPlayers();
     shuffle(cardImages);
     const board = document.getElementById("board");
     for (i in cardImages) {
         const element = createCard(i, cardImages[i]);
         board.appendChild(element);
     }
     document.getElementById("startBtn").hidden= true;
     document.querySelector("#board").removeAttribute("hidden");
     displayCurrentPlayer();
}

function shuffle(arr) {
    arr.sort(() => Math.random() - 0.5);
}

function displayCurrentPlayer() {
   document.getElementById("turn").innerText = `${activePlayer.name} is playing`;
}

function createOnePlayerInput(player){
    const spanP=document.createElement("span");
    spanP.className = player;
    const label=document.createElement("label");
    label.htmlFor=player;
    label.innerText=player+" :";
    const input=document.createElement("input");
    input.type="text";
    input.id=player;
    input.name=player;
    input.addEventListener("focusout",checkPlayersNames);
    input.addEventListener("input",checkPlayersNames);
    input.placeholder="enter a name"
    spanP.appendChild(label);
    spanP.appendChild(input);
    divPlayers.appendChild(spanP);
}

function isEnded(){
    return ( cards.filter((v)=>v.cssClass=='card').length==0);
}

initFirstScreen();