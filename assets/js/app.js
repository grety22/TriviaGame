// ****** TriviaGame ****** //
//Replay
function replay() {
    location.reload();
}
// 
$(document).ready(startGame);
    
//  Global Vars
    var count=31;
    var counter; 
    var counterQuestionNumber = 0;
    var jumpQuestion = true;
    var unanswered = 0;
    var corrects = 0;
    var incorrects = 0;
    var questions = [
//        question1
        {
            questionNumber:1,
            theQuestion:"At Dartmouth College in 1964 John Kemeny and Thomas Kurtz invented .... ?",
            theUserAnswer:null,
            theCorrectAnswer:1,
            possibleAnswers:['ALGOL','BASIC','FORTRAN'],
        },
//        question2
        {
            questionNumber:2,
            theQuestion:"Complete this quote “Computers are useless. They can only give you -------” (Pablo Picasso)",
            theUserAnswer:null,
            theCorrectAnswer:4,
            possibleAnswers:['numbers','pictures','headaches','noise','answers'],
        },
//        question3
        {
            questionNumber:3,
            theQuestion:"Which of these is not a functional programming language:",
            theUserAnswer:null,
            theCorrectAnswer:6,
            possibleAnswers:['F#','Erlang','LISP','APL','Kite','Joy','Fortran','Miranda'],
        },
//        question4
        {
            questionNumber:4,
            theQuestion:"Who invented C++ ?",
            theUserAnswer:null,
            theCorrectAnswer:4,
            possibleAnswers:['Larry Wall','Anders Hejlsberg','Grace Hopper','John Backus','Bjarne Stroustrup','Alan Cooper'],
        },        
//        question5
        {
            questionNumber:5,
            theQuestion:"Dylan, Erlang, Haskell and ML are examples of ... ?",
            theUserAnswer:null,
            theCorrectAnswer:2,
            possibleAnswers:['web languages','declarative languages','functional languages','visual languages'],
        },       
//        question6
        {
            questionNumber:6,
            theQuestion:"A true or false statement put into code that the programmer expects to always be true is an ...",
            theUserAnswer:null,
            theCorrectAnswer:2,
            possibleAnswers:['exception','harness','assertion','expression'],
        }
            
    ]
//    ********************************
function startGame(){
    $('#start').click(start);
}
//    ********************************
function start(){
    $('#start').hide();
    $('#next').removeClass('invisible');
    counter = setInterval(timer, 1000); 
    timer();
    getQuestionAnswers();
    getClickedID();
    clickNext();
}
//    ********************************
function timer(){
    count--;
    if (count <= 0){
        clearInterval(counter);
        showResults();
        showSorry();
    }
    $("#timer").text(count + " secs"); 
}
//    ********************************
function getQuestionAnswers(){
    createQuestion();
    for (var g = 0; g<questions[counterQuestionNumber].possibleAnswers.length; g++){
        createAnswers(g,questions[counterQuestionNumber].possibleAnswers[g]);    
    }
}
//    ********************************
function createQuestion(){
    var container = $('#answersArea');
    var question = questions[counterQuestionNumber].theQuestion;
    var questionSpanOpenTag = '<span class="mx-auto text-center">';
    var questionSpanCloseTag = '</span>';
    var questionComplete = questionSpanOpenTag+question+questionSpanCloseTag;
    container.append(questionComplete);
}
//    ********************************
function createAnswers(radioID,ans){
    var container = $('#answersArea');
    var labelOpenTag = '<label class="custom-control custom-radio">';
    var input = '<input id="'+radioID+'" name="radio-stacked" type="radio" class="custom-control-input">'
    var spanIndicator = '<span class="custom-control-indicator"></span>';
    var spanDescription = '<span class="custom-control-description">'+ans+'</span>';
    var labelCloseTag = '</label>';
    var radioComplete = labelOpenTag+input+spanIndicator+spanDescription+labelCloseTag;
    container.append(radioComplete); 
}
//    ********************************
function getClickedID(){
    $( "#answersArea" ).click(function(event) {
        var target = $( event.target );
        if ( target.is( "input" ) ) {
            questions[counterQuestionNumber].theUserAnswer = event.target.id;
        }
    });
}
//    ********************************
function checkIfCorrect(){
    if (questions[counterQuestionNumber].theUserAnswer == questions[counterQuestionNumber].theCorrectAnswer){
        corrects++;
    }else{
        incorrects++;
    }
}
//    ********************************
function clickNext(){
    $('#next').click(next);
} 
//    ********************************
function next(){
    checkIfCorrect();
    if (counterQuestionNumber < 5){
        counterQuestionNumber++;
        clear();
        getQuestionAnswers();
    }else{
        showResults();
    }
}    
//    ********************************
function clear(){
    $('#answersArea').empty();
}
//    ********************************
function showResults(){
    clearInterval(counter);
    clear();
    
    createResults(corrects,incorrects);
    $('#next').hide();
    $("#timer").hide();
    showReplay();
}
//    ********************************
function showUnaswered(){
    for (var i =0; i<questions.length; i++){
        if (questions[i].theUserAnswer == null){
            unanswered++;
        }
    }
    var container = $('#answersArea');
    var spanUnaswered = '<span id="unansweredSpan">You had '+unanswered+' unanswered questions</span>';
    container.append(spanUnaswered);
}   
//    ********************************    
function showSorry(){
    var container = $('#answersArea');
    var sorry = '<span class="text-center" id="SORRY">SORRY, TIME OUT</span>';
    container.prepend(sorry);
}
//    ********************************    
function showReplay(){
    $('#replayArea').removeClass('invisible');
}   
//    ********************************
function createResults(co,inc){
    showUnaswered();
    var container = $('#answersArea');
    var spanCorrect = '<span id="correctSpan">You had '+co+' correct questions</span>';
    var spanIncorrects = '<span id="incorrectSpan">You had '+inc+' incorrect questions</span>';
    var allResults = spanCorrect+spanIncorrects;
    container.append(allResults);
}

 
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    