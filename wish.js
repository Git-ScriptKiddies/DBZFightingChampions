let characters={"goku":0,"vegeta":1,"gogeta":2,"vegetto":3,"gohan":4,"gotenks":5};
let indexWiseCharacters=['goku','vegeta','gogeta','vegetto','gohan','gotenks'];
let phases=["-Play","-Wish"];
let isCharacterAvailable=[1,1,1,1,1,1];
// console.log(Phase1);
phases.forEach(Phase1 => {
    
    for(let i=0;i<6;i++)
    {
        let temp=indexWiseCharacters[i]+Phase1;
        let element1=document.getElementById(temp);
        temp=indexWiseCharacters[i]+"full"+Phase1;
        // console.log(temp);
        element1.addEventListener('mouseover',function(){
            console.log(element1);
            console.log(temp);
            let element=document.getElementById(temp);
            element.style.display="block";
        })
        element1.addEventListener('mouseleave',()=>{
            let element=document.getElementById(temp);
            element.style.display="none";
        })
    }
});