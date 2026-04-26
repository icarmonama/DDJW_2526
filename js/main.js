addEventListener('load', function() {
    document.getElementById('play').addEventListener('click', 
    function(){
        sessionStorage.removeItem('load');
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
        let to_load = localStorage.save;
        fetch('../php/load.php', {
            method: "POST",
            body: JSON.stringify({}),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json())
        .then(json => to_load = (!json.error)?JSON.stringify(json.save): localStorage.save)
        .catch (err => {
            console.error(err);
            console.warn("La partida s'intentarà carregar de local");
        });

        if (!to_load) {
            alert("No hi ha cap partida a carregar");
            return;
        }
        sessionStorage.load = to_load;
        window.location.assign("./html/canvasgame.html");
    });
    document.getElementById('mode2').addEventListener('click', 
    function(){
        sessionStorage.removeItem('load');
        sessionStorage.mode = "2";
        window.location.assign("./html/canvasgame.html");
    });

});
