import {$} from "../library/jquery-4.0.0.slim.module.min.js";

let savesList = $('#savesList');

function showSaves(){
    let saves = localStorage.saves ? JSON.parse(localStorage.saves) : [];

    if (saves.length === 0) {
        savesList.append("<p>No hi ha cap partida guardada.</p>");
        return;
    }

    saves.forEach(function(savedGame, index){
	let modeText = savedGame.mode == 2 ? "Mode 2" : "Mode 1";
	let levelText = savedGame.mode == 2 ? "<br>Nivell " + savedGame.level : "";
        let points = savedGame.mode == 2 ? savedGame.totalScore : savedGame.score;
        let dateText = savedGame.date ? savedGame.date : "";

	savesList.append(`
	    <button class="center save-card" id="save-${index}">
	        <strong>Partida ${index + 1}</strong><br>
	        ${modeText}${levelText}<br>
	        Punts: ${points}
	    </button>
	`);
        $('#save-' + index).on('click', function(){
            let to_load = JSON.stringify(savedGame);

            sessionStorage.load = to_load;
            sessionStorage.mode = savedGame.mode || "1";
            sessionStorage.level = savedGame.level || "1";
            sessionStorage.totalScore = savedGame.totalScore || "0";

            window.location.assign("./canvasgame.html");
        });
    });
}

$('#back').on('click', function(){
    window.location.assign("../");
});

showSaves();
