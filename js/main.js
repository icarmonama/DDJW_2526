addEventListener('load', function() {
    document.getElementById('play').addEventListener('click', 
    function(){
        sessionStorage.removeItem('load');
	sessionStorage.removeItem('level');
    	sessionStorage.removeItem('totalScore');
    	sessionStorage.removeItem('saveId');
    	sessionStorage.removeItem('saveDate');
	sessionStorage.mode = "1";
        window.location.assign("./html/canvasgame.html");
    });
    document.getElementById('scores').addEventListener('click', 
    function(){
        let ranking = localStorage.ranking ? JSON.parse(localStorage.ranking) : [];
        if (ranking.length === 0) {
            alert("Encara no hi ha puntuacions guardades");
            return;
        }

        let text = "Puntuacions:\n\n";
        ranking.forEach(function(p, index){
            text += (index + 1) + ". " + p.alias + " - " + p.score + " punts\n";
        });
        alert(text);
    });
    document.getElementById('options').addEventListener('click', 
    function(){
        window.location.assign("./html/options.html");
    });

    document.getElementById('saves').addEventListener('click', 
    function(){
	window.location.assign("./html/load.html");
    });
    document.getElementById('mode2').addEventListener('click', 
    function(){
        sessionStorage.removeItem('load');
	sessionStorage.removeItem('level');
        sessionStorage.removeItem('totalScore');
        sessionStorage.removeItem('saveId');
        sessionStorage.removeItem('saveDate');
	sessionStorage.mode = "2";
        window.location.assign("./html/canvasgame.html");
    });

});
