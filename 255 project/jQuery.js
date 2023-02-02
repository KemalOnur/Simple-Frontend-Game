$(function(){
    var randNum = [];
    var randtdNum = [];
    var tempRow;
    var tempCol;
    var score = 0 ;
    var temp=0;
    var hiscore=0;
    
    $("#scoreBar1").animate({width: "100%"},0);
    $("#blackpage").animate({width: "100%"},0)
    $("#blackpage").animate({height: "100%"},0)
    for(let k=0;k<3;k++){
    randNum[k]= Math.floor(Math.random()*4)+1;
    randtdNum[k] = Math.floor(Math.random()*4);
    //these whiles for the different starting position to boxes
    while(k===1&&randNum[k-1]===randNum[k]){
        
        randNum[k]= Math.floor(Math.random()*4)+1;
        randtdNum[k] = Math.floor(Math.random()*4);
    }
    while(k===2&&(randNum[k-1]===randNum[k])||(randNum[k-2]===randNum[k])){
        
        randNum[k]= Math.floor(Math.random()*4)+1;
        randtdNum[k] = Math.floor(Math.random()*4);
    } 
    //adding class to the boxes in order to change color to black
    $(`.table tr:nth-of-type(${randNum[k]})`).children().eq(`${randtdNum[k]}`).addClass("black");
    }
    // when the black button clicked button will be white and new button occur
    console.log(randNum);
    $("td").click(function(){
        if($(this).hasClass("black")){
            
    var scoreWidth=$("#scoreBar1").width();
    $("#scoreBar1").stop();
    $("#scoreBar1").animate({width: "100%"},0);
    scoreWidth=Math.floor(scoreWidth/30)+1;
    score+=scoreWidth;
    console.log(scoreWidth);
           $(this).animate({backgroundColor: "green"},200)
           $(this).animate({backgroundColor: "white"},200)
            $(this).removeClass("black")
           
            $("#scoreBar1").animate({
                width: "0%"
             },1000)
            var randomRow = Math.floor(Math.random()*4)+1;
            var randomCol = Math.floor(Math.random()*4);
            while( $(`.table tr:nth-of-type(${randomRow})`).children().eq(`${randomCol}`).hasClass("black")){
                var randomRow = Math.floor(Math.random()*4)+1;
                var randomCol = Math.floor(Math.random()*4);
            }
            $(`.table tr:nth-of-type(${randomRow})`).children().eq(`${randomCol}`).animate({backgroundColor: "black"},500)
                $(`.table tr:nth-of-type(${randomRow})`).children().eq(`${randomCol}`).addClass("black")
                                                        
        }
    $(".score").text(score);
     if(hiscore<score){
    localStorage.setItem("score",score);
     }
     
    })
    $("#t").css("display","none");
    $("#h").css("display","none");
    $("#f5").css("display","none");
    var counter = 10;
    setInterval(function(){
        if(counter==10){
            $("#tap").css("display","flex");
        }
        if(score>0){
    $("#tap").fadeOut();
        counter--;
        if(counter >= 0){
            $("#time").text(counter);
        }
        if(counter== 0){
        if($("td").hasClass("black")){
            $("td").removeClass("black"); 
            $("td").animate({backgroundColor: "white"});
            $("#f5").animate({fontSize: "30px"},500)
            $("#f5").animate({fontSize: "20px"},500)
        }
       
            
        
        if(score>hiscore){
            $.confetti.start();
            setTimeout(() => {
             $.confetti.stop();
            }, 2000)
            $("#h").fadeIn().css("display","flex");  
        }else{
        $("#t").fadeIn().css("display","flex");  
        }
        
        }
    }
    },1000)
     hiscore = localStorage.getItem("score");
    $("#high").text(hiscore);
    })