const resources = ['../resources/cb.png', '../resources/co.png',
                '../resources/sb.png', '../resources/so.png',
                '../resources/tb.png', '../resources/to.png'];
const back = '../resources/back.png';

const StateCard = Object.freeze({
  DISABLE: 0,
  ENABLE: 1,
  DONE: 2
});

var game = {
    items: [],
    states: [],
    setValue: null,
    ready: 0,
    lastCard: null,
    score: 200,
    pairs: 2,
    groupSize: 2,
    selectedCards: [],
    mode: 1,
    level: 1,
    totalScore: 0,
    goBack: function(idx){
        this.setValue && this.setValue[idx](back);
        this.states[idx] = StateCard.ENABLE;
    },
    goFront: function(idx){
        this.setValue && this.setValue[idx](this.items[idx]);
        this.states[idx] = StateCard.DISABLE;
    },
    select: function(){
        if (sessionStorage.load){ // Carreguem partida
            let toLoad = JSON.parse(sessionStorage.load);
            this.items = toLoad.items;
            this.states = toLoad.states;
            this.lastCard = toLoad.lastCard;
            this.score = toLoad.score;
            this.pairs = toLoad.pairs;
	    this.groupSize = toLoad.groupSize || 2;
	    this.selectedCards = toLoad.selectedCards || [];
	    this.mode = toLoad.mode || 1;
	    this.level = toLoad.level || 1;
	    this.totalScore = toLoad.totalScore || 0;
        }
        else{ // Nova partida
	    let options = localStorage.options && JSON.parse(localStorage.options);
	    this.ready = 0;
	    this.lastCard = null;
	    this.selectedCards = [];
	    this.mode = parseInt(sessionStorage.mode || 1);
	    this.level = sessionStorage.level ? parseInt(sessionStorage.level) : (options && options.startLevel ? parseInt(options.startLevel) : 1);
 	    this.totalScore = sessionStorage.totalScore ? parseInt(sessionStorage.totalScore) : 0;
	    if (options && options.pairs) this.pairs = parseInt(options.pairs);
	    if (options && options.groupSize) this.groupSize = parseInt(options.groupSize);
	    if (this.mode === 2) {
		this.pairs = Math.min(2 + this.level - 1, 6);
	    	if (this.level < 3) {
       		    this.groupSize = 2;
    	    	}
    	    	else if (this.level < 5) {
        	    this.groupSize = 3;
    	   	}
    	    	else {
        	    this.groupSize = 4;
    		}
    	    	this.score = 200 + this.level * 50;
	    }
	    this.items = resources.slice();
	    shuffe(this.items);
    	    this.items = this.items.slice(0, this.pairs);

	    let baseItems = this.items.slice();
	    this.items = [];

	    baseItems.forEach(item => {
    	        for (let i = 0; i < this.groupSize; i++) {
       	            this.items.push(item);
   		}
	    });

	    shuffe(this.items);
	    this.states = new Array(this.items.length);
	    this.selectedCards = [];
        }
    },
    start: function(){
        this.items.forEach((_,indx)=>{
            if (this.states[indx] === StateCard.DISABLE ||
                this.states[indx] === StateCard.DONE){
                this.ready++;
            }
            else{
                setTimeout(()=>{
                    this.ready++;
                    this.goBack(indx);
                }, 1000 + 100 * indx);
            }
        });
    },
    click: function(indx){
	    if (this.states[indx] !== StateCard.ENABLE || this.ready < this.items.length) return;
    	    this.goFront(indx);
    	    this.selectedCards.push(indx);
	    if (this.selectedCards.length < this.groupSize) return;
    	    let firstItem = this.items[this.selectedCards[0]];
    	    let correct = this.selectedCards.every(idx => this.items[idx] === firstItem);
    	    if (correct){
        	    this.selectedCards.forEach(idx => this.states[idx] = StateCard.DONE);
        	    this.pairs--;
        	    if (this.pairs <= 0){
 	   	        if (this.mode === 2) {
			    this.totalScore += this.score + this.level * 100;
 	 	   	    sessionStorage.totalScore = this.totalScore;
        	    	    this.level++;
	                    sessionStorage.level = this.level;
	 		    sessionStorage.mode = "2";
    			    sessionStorage.removeItem('load');
    			    alert(`Nivell superat! Puntuació total: ${this.totalScore}. Ara comença el nivell ${this.level}`);
    			    window.location.assign("./canvasgame.html");
    			}
    			else {
        		    alert(`Has guanyat amb ${this.score} punts!!!!`);
        	    	    window.location.assign("../");
    			}
        	    }
    	    }
    	    else {
		    let wrongCards = this.selectedCards.slice();
		    this.score -= 25;
    		    setTimeout(() => {
        	        wrongCards.forEach(idx => this.goBack(idx));
    	 	    }, 700);
        	    if (this.score <= 0){
            	        if (this.mode === 2) {
        		    this.saveRanking();
    			}
			alert("Has perdut");
            	        window.location.assign("../");
        	    }
    	    }
    	    this.selectedCards = [];
    },
    save: function(){
        let to_save = JSON.stringify({
            items: this.items,
            states: this.states,
            lastCard: this.lastCard,
            score: this.score,
            pairs: this.pairs,
	    groupSize: this.groupSize,
	    selectedCards: this.selectedCards,
	    mode: this.mode,
	    level: this.level,
	    totalScore: this.totalScore
        });
        let ret = false;
        fetch('../php/save.php', {
            method: "POST",
            body: to_save,
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => ret = JSON.parse(response))
        .catch (err => console.error(err));

        if (!ret) {
            console.warn("La partida s'ha guardat en local.");
            localStorage.save = to_save;
        }
        window.location.assign("../");
    
},

    saveRanking: function(){
        let alias = prompt("Introdueix el teu àlies:");
        if (!alias) alias = "Jugador";
        let ranking = localStorage.ranking ? JSON.parse(localStorage.ranking) : [];
        ranking.push({
            alias: alias,
            score: this.totalScore,
            level: this.level
        });
        ranking.sort((a, b) => b.score - a.score);
        ranking = ranking.slice(0, 10);
        localStorage.ranking = JSON.stringify(ranking);
    }
}

function shuffe(arr){
    arr.sort(function () {return Math.random() - 0.5});
}

export var gameItems;
export function selectCards() { 
    game.select();
    gameItems = game.items;
}
export function clickCard(indx){ game.click(indx); }
export function startGame(){ game.start(); }
export function initCard(callback) { 
    if (!game.setValue) game.setValue = [];
    game.setValue.push(callback); 
}
export function saveGame(){
    game.save();
}
