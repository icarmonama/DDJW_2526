import {$} from "../library/jquery-4.0.0.slim.module.min.js";

var options = function(){
    const default_options = {
        pairs: 2,
        difficulty: 'normal',
	groupSize: 2,
 	startMode: 1,
	startLevel: 1
    } 

    var pairs = $('#pairs');
    var difficulty = $('#dif');
    var groupSize = $('#groupSize');
    var startMode = $('#startMode');
    var startLevel = $('#startLevel');
    var savedOptions = localStorage.options && JSON.parse(localStorage.options);
    var options = Object.create(default_options);

    if (savedOptions && savedOptions.pairs)
        options.pairs = savedOptions.pairs;
    if (savedOptions && savedOptions.difficulty)
        options.difficulty = savedOptions.difficulty;
    if (savedOptions && savedOptions.groupSize)
        options.groupSize = savedOptions.groupSize;
    if (savedOptions && savedOptions.startMode)
        options.startMode = savedOptions.startMode;
    if (savedOptions && savedOptions.startLevel)
        options.startLevel = savedOptions.startLevel;
    pairs.val(options.pairs);
    difficulty.val(options.difficulty);
    groupSize.val(options.groupSize);
    startMode.val(options.startMode);
    startLevel.val(options.startLevel);
    pairs.on('change', function (){
        options.pairs = pairs.val();
    });

    difficulty.on('change', function (){
        options.difficulty = difficulty.val();
    });
    groupSize.on('change', function (){
        options.groupSize = parseInt(groupSize.val());
    });

    startMode.on('change', function (){
        options.startMode = parseInt(startMode.val());
    });

    startLevel.on('change', function (){
        options.startLevel = parseInt(startLevel.val());
    });
    return {
        applyChanges: function(){
            localStorage.options = JSON.stringify(options);
        },
        defaultValues: function(){
            options.pairs = default_options.pairs;
            options.difficulty = default_options.difficulty;
	    options.groupSize = default_options.groupSize;
	    options.startMode = default_options.startMode;
	    options.startLevel = default_options.startLevel;
            pairs.val(options.pairs);
            difficulty.val(options.difficulty);
	    groupSize.val(options.groupSize);
	    startMode.val(options.startMode);
	    startLevel.val(options.startLevel);
        }
    }
}();

$('#default').on('click', function(){
    options.defaultValues();
})

$('#apply').on('click', function(){
    options.applyChanges();
    location.assign("../");
});
