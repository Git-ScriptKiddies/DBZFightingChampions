let introduction=["Let's go through controls first","For movement\n A:left, D:right, \n W:up, S:down ","For Attacks\n K:Kick, \n L:Punch \n I:Special Attack","You should first unlock character using wish."];
let index1=0,index2=4;
let isBallAvailable=[1,1,1,1,1,1,1];
let isSelected=["continueGame","mainMenu","optionSelect"];
let curSelected=0;
let Player={"player1":"goku","player2":"goku"};
let Health={"player1":40,"player2":40};
let positionPlayer={"player1":0,"player2":80};
let old="";
let isMatchStarted=0,isGameSettings=0;
let pauseGame=0,isWin=0;
let isHit={"player1":0,"player2":0};
let energyGauge={"player1":0,"player2":0};
let strengthAttack={"kick":5,"punch":5,"specialmove":10};
let facingPlayer={"player1":"facingRight","player2":"facingLeft"};
let heightofCharacters={"goku":25,"vegeta":25,"vegetto":30,"gohan":25,"gogeta":32,"gotenks":25,"gokupunch":25,"vegetapunch":25,"vegettopunch":25,"gogetapunch":28,"gohanpunch":25,"gotenkspunch":25,"gokukick":20,"vegetakick":32,"vegettokick":28,"gogetakick":28,"gohankick":25,"gotenkskick":25,"gokuspecialmove":30,"vegetaspecialmove":30,"vegettospecialmove":32,"gogetaspecialmove":30,"gohanspecialmove":26,"gotenksspecialmove":25};
let widthofCharacters={"goku":24,"vegeta":20,"vegetto":24,"gohan":20,"gogeta":20,"gotenks":20,"gokupunch":31,"vegetapunch":30,"vegettopunch":32,"gogetapunch":28,"gohanpunch":32,"gotenkspunch":26,"gokukick":30,"vegetakick":20,"vegettokick":32,"gogetakick":29,"gohankick":28,"gotenkskick":28,"gokuspecialmove":42,"vegetaspecialmove":45,"vegettospecialmove":45,"gogetaspecialmove":50,"gohanspecialmove":45,"gotenksspecialmove":39};
let Phase="";
let volumeGame=32,selectOptions=0,curSelectedOption=0,curSelectedSettings=0;
let isSelectedOption=["volumeKey","goBackToPauseState"];
let isSelectedSettings=["volumeKeySettings","goBackToMainMenu"];
let BGM={"selectCharacter":new Audio('/img/selectCharactersbgm.mp3'),"wish":new Audio('/img/wishbgm.mp3'),"matchStart":new Audio("/img/startmatchbgm.mp3"),"mainMenu":new Audio("/img/openingbgm.mp3"),"evolution":new Audio("/img/evolutionbgm.mp3")};
let matchScene=["url('/img/fightday.gif')","url('/img/fightevening.gif')","url('/img/fightnight.gif')"];
let selectEvolutionOptions=["kick","punch","specialmove","backToMainMenu"];
let indexOfAttack={"kick":0,"punch":1,"specialmove":2};
let randomMoves=[kick,punch,moveLeftPlayer,moveRightPlayer,specialAttack];
let attackStrength={"player1":[20,20,20],"player2":[20,20,20]};
let curEvolutionOption=0,Money=100,isEvolution=0;
removeAttackDefense=()=>{
    let element=document.getElementById('player1Character');
    element.style.backgroundImage="url('/img/vegettofacingright.png')";
    element.style.height="25vh";
    element.style.width="20vh";
}
function updateGauge(){
    let element=document.getElementById("energyPlayer1");
    element.style.width=energyGauge["player1"]+"vh";
    element=document.getElementById("energyPlayer2");
    element.style.width=energyGauge["player2"]+"vh";
    let temp=90-energyGauge["player2"];
    element.style.marginLeft=temp+"vh";
}
function updateHealthGauge(){
    let element=document.getElementById("healthPlayer1");
    let temp=40-Health["player1"];
    element.style.width=temp+"vh";
    temp=50-temp;
    element.style.marginLeft=temp+"vh";
    element=document.getElementById("healthPlayer2");
    temp=40-Health["player2"];
    element.style.width=temp+"vh";
}
setInterval(()=>{
    energyGauge["player1"]++;
    energyGauge["player2"]++;
    if(energyGauge["player1"]>=30)
    energyGauge["player1"]=30;
    if(energyGauge["player2"]>=30)
    energyGauge["player2"]=30;
    updateGauge();
},1000);
function setFace()
{
    if(positionPlayer["player1"]>positionPlayer["player2"])
    {
        facingPlayer["player1"]="facingleft";
        facingPlayer["player2"]="facingright";
    }
    else{
        facingPlayer["player1"]="facingright";
        facingPlayer["player2"]="facingleft";
    }
    let element=document.getElementById("player1Character");
    let temp=Player["player1"]+facingPlayer["player1"];
    temp="url('/img/"+Player["player1"]+"/"+temp+".png')";
    element.style.backgroundImage=temp;
    element.style.height=heightofCharacters[Player["player1"]]+"vh";
    element.style.width=widthofCharacters[Player["player1"]]+"vh";
    element.style.marginLeft=positionPlayer["player1"]+"vh";
    element.style.zIndex=0;
    element=document.getElementById("player2Character");
    temp=Player["player2"]+facingPlayer["player2"];
    temp="url('/img/"+Player["player2"]+"/"+temp+".png')";
    element.style.backgroundImage=temp;
    element.style.height=heightofCharacters[Player["player2"]]+"vh";
    element.style.width=widthofCharacters[Player["player2"]]+"vh";
    element.style.marginLeft=positionPlayer["player2"]+"vh";
    element.style.zIndex=0;
}
function max(arr)
{
    let res=0;
    for(let i=0;i<arr.length;i++)
    if(arr[i]>res)
    res=arr[i];
    return res;
}
function min(arr)
{
    let res=100;
    for(let i=0;i<arr.length;i++)
    if(arr[i]<res)
    res=arr[i];
    return res;
}
function moveRightPlayer(playername)
{
    let element=document.getElementById(playername+'Character');
    positionPlayer[playername]+=1;
    if(positionPlayer[playername]+widthofCharacters[Player[playername]]>100)
    positionPlayer[playername]=100-widthofCharacters[Player[playername]];
    if(facingPlayer[playername]=='facingright')
    {
        let temp="player1";
        if(temp==playername)
        temp="player2";
        positionPlayer[playername]=min([positionPlayer[temp]-widthofCharacters[Player[playername]]+5,positionPlayer[playername]]);
    }
    element.style.marginLeft=positionPlayer[playername]+"vh";
    setFace();
}
function moveLeftPlayer(playername)
{
    let element=document.getElementById(playername+'Character');
    positionPlayer[playername]-=1;
    if(positionPlayer[playername]<0)
    positionPlayer[playername]=0;
    if(facingPlayer[playername]=='facingleft')
    {
        let temp="player1";
        if(temp==playername)
        temp="player2";
        positionPlayer[playername]=max([positionPlayer[temp]+widthofCharacters[Player[temp]]-5,positionPlayer[playername]]);
    }
    setFace();
}
function jumpPlayer(playername)
{
    let element=document.getElementById(playername+'Character');
    element.classList.add('jump');
    setTimeout(()=>{
        element.classList.remove('jump');
    },500);
}
function YouWin(){
    let element=document.getElementById("pauseGameContents");
    element.innerText="You Win";
    element=document.getElementById("pauseGame");
    element.style.display="block";
}
function YouLose(){
    let element=document.getElementById("pauseGameContents");
    element.innerText="You Lose";
    element=document.getElementById("pauseGame");
    element.style.display="block";
}
function weHaveAWinner(playername)
{
    isWin=1;
    pauseGame=0;
    let element=document.getElementById("reMatch");
    element.innerText="Rematch";
    console.log(playername);
    if(playername=="player1")
    {
        YouWin();
    }
    else{
        YouLose();
    }
}
function setHitZero()
{
    isHit["player1"]=0;
    isHit["player2"]=0;
}
function updateStrengthMeter()
{
    for(let itr=0;itr<3;itr++)
    {
        let element=document.getElementById(selectEvolutionOptions[itr]+"StrengthMeter");
        element.style.width=attackStrength["player1"][itr]+"vh";
    }
}
function updateMoney()
{
    let element=document.getElementById("moneyCount");
    element.innerHTML="Money: "+Money;
}
function deductMoney(){
    Money-=500;
    attackStrength["player1"][curEvolutionOption]+=5;
    // console.log(Money);
    if(attackStrength["player1"][curEvolutionOption]<=50)
    {
        updateMoney();
        updateStrengthMeter();
    }
    else{
        playDummySound();
        Money+=500;
        attackStrength["player1"][curEvolutionOption]-=10;
    }
}
setInterval(()=>{
    if(isWin==0&&isMatchStarted&&isHit["player2"]==0&&pauseGame==0)
    {
        if(energyGauge["player2"]>=5)
        {
            randomMoves[getRndInteger(5)]("player2");
        }
        else{
            randomMoves[getRndInteger(4)]("player2");
        }
    }
},500);
function pauseSound(typeOfQuery,setTo)
{
    BGM[typeOfQuery].pause();
    if(setTo)
    BGM[typeOfQuery].currentTime=0;
}
function playSound(typeOfQuery)
{
    BGM[typeOfQuery].play();
    BGM[typeOfQuery].loop=true;
    BGM[typeOfQuery].volume=volumeGame/32;
}
function healthDown(playername,typeOfQuery)
{
    let temp="player1";
    if(playername=="player1")
    temp="player2";
    Health[playername]-=(attackStrength[temp][indexOfAttack[typeOfQuery]]/50)*strengthAttack[typeOfQuery];
    console.log((attackStrength[temp][typeOfQuery]/50)*strengthAttack[typeOfQuery]);
    Health[playername]=max([Health[playername]]);
    updateHealthGauge();
    isHit[playername]=1;
    setTimeout(setHitZero,500);
    if(Health[playername]==0)
    {
        weHaveAWinner(temp);
    }
}
function updateMargin(playername,typeOfQuery)
{
    let element=document.getElementById(playername+'Character');
    if(facingPlayer[playername]=='facingleft')
    {
        let temp1="player1";
        if(temp1==playername)
        temp1="player2";
        let temp3=10;
        if(typeOfQuery=="specialmove")
        temp3=12;
        let temp2=min([positionPlayer[playername]-(widthofCharacters[Player[playername]+typeOfQuery]-widthofCharacters[Player[playername]]),100-widthofCharacters[Player[playername]+typeOfQuery]]);
        // console.log(temp2,positionPlayer[playername]);
        if(temp2<positionPlayer[temp1]+widthofCharacters[Player[temp1]])
        {
            healthDown(temp1,typeOfQuery);
            let hitEffect=new Audio('/img/'+typeOfQuery+'.mp3');
            hitEffect.play();
            hitEffect.volume=volumeGame/32;
        }
        if(temp2<positionPlayer[temp1]+widthofCharacters[Player[temp1]]-5)
        {
            positionPlayer[temp1]=max([temp2-widthofCharacters[Player[temp1]]+5]);
        }
        setFace();
        element.style.marginLeft=temp2+"vh";
        positionPlayer[playername]=max([positionPlayer[temp1]+widthofCharacters[Player[temp1]]-5,temp2]);
    }
    else{
        let temp1="player1";
        if(temp1==playername)
        temp1="player2";
        let temp3=10;
        if(typeOfQuery=="specialmove")
        temp3=12;
        let temp2=min([100-widthofCharacters[Player[playername]+typeOfQuery]-widthofCharacters[Player[temp1]]+temp3,positionPlayer[playername]]);
        if(temp2+widthofCharacters[Player[playername]+typeOfQuery]>positionPlayer[temp1])
        {
            healthDown(temp1,typeOfQuery);
            let hitEffect=new Audio('/img/'+typeOfQuery+'.mp3');
            hitEffect.play();
            hitEffect.volume=volumeGame/32;
        }
        if(temp2+widthofCharacters[Player[playername]+typeOfQuery]-5>positionPlayer[temp1])
        {
            positionPlayer[temp1]=min([temp2+widthofCharacters[Player[playername]+typeOfQuery]-5,100-widthofCharacters[Player[temp1]]]);
        }
        setFace();
        element.style.marginLeft=temp2+"vh";
        positionPlayer[playername]=min([temp2+(widthofCharacters[Player[playername]+typeOfQuery]-widthofCharacters[Player[playername]]),100-widthofCharacters[Player[playername]]-widthofCharacters[Player[temp1]]+5]);
    }
}
function kick(playername)
{
    let element=document.getElementById(playername+'Character');
    let temp=Player[playername]+"kick"+facingPlayer[playername];
    updateMargin(playername,"kick");
    temp="url('/img/"+Player[playername]+"/"+temp+".png')";
    element.style.backgroundImage=temp;
    element.style.height=heightofCharacters[Player[playername]+"kick"]+"vh";
    element.style.width=widthofCharacters[Player[playername]+"kick"]+"vh";
    element.style.zIndex=1;
    setTimeout(setFace,500);
}
function punch(playername)
{
    let element=document.getElementById(playername+'Character');
    let temp=Player[playername]+"punch"+facingPlayer[playername];
    updateMargin(playername,"punch");
    temp="url('/img/"+Player[playername]+"/"+temp+".png')";
    element.style.backgroundImage=temp;
    element.style.height=heightofCharacters[Player[playername]+"punch"]+"vh";
    element.style.width=widthofCharacters[Player[playername]+"punch"]+"vh";
    element.style.zIndex=1;
    setTimeout(setFace,500);
}
function specialAttack(playername)
{
    if(energyGauge[playername]>5)
    {
        energyGauge[playername]-=5;
        updateGauge();
        let element=document.getElementById(playername+'Character');
        let temp=Player[playername]+"specialmove"+facingPlayer[playername];
        updateMargin(playername,"specialmove");
        temp="url('/img/"+Player[playername]+"/"+temp+".png')";
        element.style.backgroundImage=temp;
        element.style.height=heightofCharacters[Player[playername]+"specialmove"]+"vh";
        element.style.width=widthofCharacters[Player[playername]+"specialmove"]+"vh";
        element.style.zIndex=1;
        setTimeout(setFace,500);
    }
}
function matchBetweeen(playername1,playername2)
{
    pauseSound("matchStart",1);
    playSound("matchStart");
    pauseGame=0;
    isWin=0;
    Player["player1"]=playername1;
    Player["player2"]=playername2;
    let element=document.getElementById("pauseGameContents");
    element.innerText="Game is Paused";
    element=document.getElementById("reMatch");
    element.innerText="Continue";
    element=document.getElementById("player1");
    let temp=Player["player1"]+"full";
    temp="url('/img/"+temp+".png')";
    element.style.backgroundImage=temp;
    positionPlayer["player1"]=0;
    positionPlayer["player2"]=100-widthofCharacters[Player["player2"]];
    element=document.getElementById("player2");
    temp=Player["player2"]+"full";
    temp="url('/img/"+temp+".png')";
    element.style.backgroundImage=temp;
    setFace();
    Health["player1"]=40;
    Health["player2"]=40;
    updateHealthGauge();
    element=document.getElementById('selectPlayer');
    element.style.display="none";
    element=document.getElementById('startMatch');
    element.style.display="block";
    isMatchStarted=1;
}
function playDummySound()
{
    let dummySound=new Audio('/img/volumeChange.wav');
    console.log(dummySound);
    dummySound.play();
    dummySound.volume=volumeGame/32;
}
document.onkeydown = checkKey;
function checkKey(e) {
    e = e || window.event;
    if(isMatchStarted)
    {
        if(selectOptions)
        {
            if(e.keyCode=='38')
            {
                let element=document.getElementById(isSelectedOption[curSelectedOption]);
                element.classList.remove("timePass");
                curSelectedOption^=1;
                element=document.getElementById(isSelectedOption[curSelectedOption]);
                element.classList.add("timePass");
            }
            else if(e.keyCode=='40')
            {
                let element=document.getElementById(isSelectedOption[curSelectedOption]);
                element.classList.remove("timePass");
                curSelectedOption^=1;
                element=document.getElementById(isSelectedOption[curSelectedOption]);
                element.classList.add("timePass");

            }
            else if(curSelectedOption==0&&e.keyCode=='37')
            {
                volumeGame-=2;
                volumeGame=max([volumeGame]);
                let element=document.getElementById("volumeWidth");
                element.style.width=volumeGame+"vh";
                playDummySound();
                //decrease volume
            }
            else if(curSelectedOption==0&&e.keyCode=='39')
            {
                volumeGame+=2;
                if(volumeGame>32)
                volumeGame=32;
                let element=document.getElementById("volumeWidth");
                element.style.width=volumeGame+"vh";
                playDummySound();
                //increase volume
            }
        }
        else if(pauseGame||isWin)
        {
            if (e.keyCode == '38'){
                let element=document.getElementById(isSelected[curSelected]);
                element.classList.remove("timePass");
                curSelected=(3+curSelected-1)%3;
                element=document.getElementById(isSelected[curSelected]);
                element.classList.add("timePass");
                // up arrow
            }
            else if (e.keyCode == '40') {
                let element=document.getElementById(isSelected[curSelected]);
                element.classList.remove("timePass");
                curSelected=(curSelected+1)%3;
                element=document.getElementById(isSelected[curSelected]);
                element.classList.add("timePass");
                // down arrow
            }
            else if(e.keyCode == '27')
            {
                pauseGame=0;
                let element=document.getElementById(isSelected[curSelected]);
                element.classList.remove("timePass");
                curSelected=0;
                element=document.getElementById(isSelected[curSelected]);
                element.classList.add("timePass");
                element=document.getElementById("pauseGame");
                element.style.display="none";
            }
        }
    }
    else if(isGameSettings)
    {
        if(e.keyCode=="38")
        {
            let element=document.getElementById(isSelectedSettings[curSelectedSettings]);
            element.classList.remove("timePass");
            curSelectedSettings^=1;
            element=document.getElementById(isSelectedSettings[curSelectedSettings]);
            element.classList.add("timePass");
        }
        else if(e.keyCode=="40")
        {
            let element=document.getElementById(isSelectedSettings[curSelectedSettings]);
            element.classList.remove("timePass");
            curSelectedSettings^=1;
            element=document.getElementById(isSelectedSettings[curSelectedSettings]);
            element.classList.add("timePass");
        }
        else if(curSelectedSettings==0&&e.keyCode=='37')
        {
            volumeGame-=2;
            volumeGame=max([volumeGame]);
            let element=document.getElementById("volumeWidthSettings");
            element.style.width=volumeGame+"vh";
            playDummySound();
            //decrease volume
        }
        else if(curSelectedSettings==0&&e.keyCode=='39')
        {
            volumeGame+=2;
            if(volumeGame>32)
            volumeGame=32;
            let element=document.getElementById("volumeWidthSettings");
            element.style.width=volumeGame+"vh";
            playDummySound();
            //increase volume
        }
    }
    else if(isEvolution)
    {
        if(e.keyCode=='38')
        {
            let element=document.getElementById(selectEvolutionOptions[curEvolutionOption]);
            element.classList.remove("evolutionCost");
            curEvolutionOption=(curEvolutionOption+3)%4;
            element=document.getElementById(selectEvolutionOptions[curEvolutionOption]);
            element.classList.add("evolutionCost");
        }
        else if(e.keyCode=='40'){
            let element=document.getElementById(selectEvolutionOptions[curEvolutionOption]);
            element.classList.remove("evolutionCost");
            curEvolutionOption=(curEvolutionOption+1)%4;
            element=document.getElementById(selectEvolutionOptions[curEvolutionOption]);
            element.classList.add("evolutionCost");
        }
    }
}
document.addEventListener('keypress', (event) => {
    var name = event.key;
    var code = event.code;
    if(code=='Enter')
    {
        if(index1<index2)
        {
            intro.innerText=introduction[index1];
            index1++;
        }
        else if(index1==index2){
            playSound("mainMenu");
            let element=document.getElementById("talks");
            element.style.display="none";
            element=document.getElementById("gameoptions");
            element.style.display="block";
            index1++;
        }
        else if(isMatchStarted)
        {
            if(selectOptions)
            {
                if(curSelectedOption==1)
                {
                    let element=document.getElementById("optionOptions");
                    element.style.display="none";
                    element=document.getElementById("pauseOptions");
                    element.style.display="block";
                    element=document.getElementById("volumeWidthSettings");
                    element.style.width=volumeGame+"vh";
                    selectOptions=0;
                }
            }
            else{
                console.log(isWin);
                let element=document.getElementById("pauseGame");
                if(isWin==0&&pauseGame==0)
                {
                    pauseGame=1;
                    element.style.display="block";
                    pauseSound("matchStart",0);
                }
                else{
                    pauseGame=0;
                    if(isSelected[curSelected]=="mainMenu")
                    {
                        element.style.display="none";
                        playSound("matchStart");
                        element=document.getElementById("startMatch");
                        element.style.display="none";
                        element=document.getElementById("container");
                        element.style.display="block";
                        isWin=2;
                        isMatchStarted=0;
                        pauseSound("matchStart",0);
                        playSound("mainMenu");
                    }
                    else if(isWin==1&&curSelected==0)
                    {
                        element.style.display="none";
                        playSound("matchStart");
                        console.log(isWin,pauseGame);
                        isMatchStarted=0;
                        matchBetweeen(Player["player1"],Player["player2"]);
                    }
                    else if(curSelected==0)
                    {
                        element.style.display="none";
                        playSound("matchStart");
                        console.log(isWin,pauseGame);
                    }
                    else if(curSelected==2)
                    {
                        selectOptions=1;
                        element=document.getElementById("pauseOptions");
                        element.style.display="none";
                        element=document.getElementById("optionOptions");
                        element.style.display="block";
                        element=document.getElementById("volumeKey");
                        element=document.getElementById("volumeWidth");
                        element.style.width=volumeGame+"vh";
                        pauseGame=1;
                    }
                    element=document.getElementById(isSelected[curSelected]);
                    element.classList.remove("timePass");
                    curSelected=0;
                    element=document.getElementById(isSelected[curSelected]);
                    element.classList.add("timePass");
                }
            }
        }
        else if(isGameSettings)
        {
            if(curSelectedSettings==1)
            {
                playSound("mainMenu");
                let element=document.getElementById("gameSettings");
                element.style.display="none";
                element=document.getElementById("container");
                element.style.display="block";
                isGameSettings=0;
            }
        }
        else if(isEvolution)
        {
            if(curEvolutionOption<3)
            {
                if(Money>=500)
                {
                    deductMoney();
                }
                else{
                    playDummySound();
                }
            }
            else{
                pauseSound("evolution",1);
                playSound("mainMenu");
                let element=document.getElementById("evolutionCharacter");
                element.style.display="none";
                element=document.getElementById("container");
                element.style.display="block";
                isEvloution=0;
            }
            // console.log(selectEvolutionOptions[curEvolutionOption]);
        }
        let itr=0;
        while(itr<7)
        {
            let element=document.getElementById("ball"+(itr+1));
            if(isBallAvailable[itr]==0)
            {
                element.classList.add('invertColor');
            }
            else{
                element.classList.remove('invertColor');
            }
            itr++;
        }
    }
    if(isMatchStarted&&isHit["player1"]==0&&isWin==0&&pauseGame==0)
    {
        if(name=='d')
        {
            moveRightPlayer("player1");
        }
        if(name=='a')
        {
            moveLeftPlayer("player1");
        }
        if(name=='w'||code=='Space')
        {
            jumpPlayer("player1");
        }
        if(name=='k')
        {
            kick("player1");
        }
        if(name=='l')
        {
            punch("player1");
        }
        if(name=='i')
        {
            specialAttack("player1");
        }
    }
    old=name;
    if(code=="Space")
    old="Space";
    setTimeout(()=>{
        old="";
    },400)
    // alert(`Key pressed ${name} \r\n Key code value: ${code}`);
}, false);
function getRndInteger(max, min=0) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
function reply_click(id1)
{
    if(id1=="wish")
    {
        // console.log(Phase);
        let flag=1;
        for(let i=0;i<7;i++)
        flag&=isBallAvailable[i];
        if(flag)
        {
            Phase="-Wish";
            pauseSound("mainMenu",1);
            playSound("wish");
            let element=document.getElementById("container");
            element.style.display="none";
            element=document.getElementById("makeWish");
            element.style.display="block";
        }
    }
    else if(id1=="play")
    {
        pauseSound("mainMenu",1);
        playSound("selectCharacter");
        Phase="-Play";
        let element=document.getElementById("container");
        element.style.display="none";
        element=document.getElementById("selectPlayer");
        element.style.display="block";
        element.style.backgroundImage=matchScene[getRndInteger(3)];
    }
    else if(id1=="options")
    {
        pauseSound("mainMenu",1);
        let element=document.getElementById("container");
        element.style.display="none";
        element=document.getElementById("gameSettings");
        element.style.display="block";
        isGameSettings=1;
    }
    else if(id1=="evolution")
    {
        pauseSound("mainMenu",1);
        playSound("evolution");
        let element=document.getElementById("container");
        element.style.display="none";
        element=document.getElementById("evolutionCharacter");
        element.style.display="block";
        updateStrengthMeter();
        updateMoney();
        isEvolution=1;
    }
    if(Phase=="-Play")
    {
        for(let i=0;i<6;i++)
        {
            let temp=indexWiseCharacters[i]+Phase;
            if(isCharacterAvailable[i]==0&&id1==temp)
            {
                let element=document.getElementById("startMatch");
                element.style.backgroundImage=matchScene[getRndInteger(3)];
                console.log(element);
                pauseSound("selectCharacter",1);
                playSound("matchStart");
                let playername2=indexWiseCharacters[getRndInteger(6)];
                matchBetweeen(indexWiseCharacters[i],playername2);
            }
        }
    }
    else if(Phase=="-Wish")
    {
        for(let i=0;i<6;i++)
        {
            let temp=indexWiseCharacters[i]+Phase;
            if(isCharacterAvailable[i]&&id1==temp)
            {
                let element1=document.getElementById(id1);
                // console.log(id1,element1);
                if(confirm('You Want to unlock '+indexWiseCharacters[i]))
                {
                    pauseSound("wish",1);
                    playSound("mainMenu");
                    element1.classList.add('isNotAvailable');
                    element1=document.getElementById(indexWiseCharacters[i]+"-Play");
                    element1.classList.remove('isNotAvailable');
                    for(let i=0;i<7;i++)
                    {
                        isBallAvailable[i]=0;
                        let element=document.getElementById("ball"+(i+1));
                        element.classList.add('invertColor');
                    }
                    isCharacterAvailable[i]=0;
                    let element=document.getElementById("makeWish");
                    element.style.display="none";
                    element=document.getElementById("container");
                    element.style.display="block";
                }
            }
        }
    }
    if(id1=="exitWish")
    {
        let element=document.getElementById("makeWish");
        element.style.display="none";
        element=document.getElementById("container");
        element.style.display="block";
        pauseSound("wish",1);
        playSound("mainMenu");
        Phase="";
    }
    if(id1=="exitPlay")
    {
        element=document.getElementById('selectPlayer');
        element.style.display="none";
        element=document.getElementById("container");
        element.style.display="block";
        pauseSound("selectCharacter",1);
        playSound("mainMenu");
        Phase="";
    }
}