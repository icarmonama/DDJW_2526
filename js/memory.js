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
        }
        else{ // Nova partida
	    let options = localStorage.options && JSON.parse(localStorage.options);
	    if (options && options.pairs) this.pairs = parseInt(options.pairs);
	    if (options && options.groupSize) this.groupSize = parseInt(options.groupSize);

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

            	        alert(`Has guanyat amb ${this.score} punts!!!!`);

            	        window.location.assign("../");

        	    }

    	    }

    	    else {
		    this.selectedCards.forEach(idx => this.goBack(idx));

        	    this.score -= 25;

        	    if (this.score <= 0){

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
	    selectedCards: this.selectedCards
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
