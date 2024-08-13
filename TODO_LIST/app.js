let btn=document.querySelector("button");
let inp=document.querySelector("input");
let ul=document.querySelector("ul");
let li=document.querySelector("li");

btn.addEventListener("click",function(){
    let newTask=document.createElement("li");
    newTask.innerText=inp.value;
    ul.appendChild(newTask); 
    inp.value="";
    let delbtn = document.createElement("button");
    delbtn.classList.add("delete");
    delbtn.innerText="X";
    newTask.append(delbtn);
});
// let delbtns=document.querySelectorAll(".delete");
// for( btn of delbtns){
//     btn.addEventListener("click", function(){
//         this.parentElement.remove();
//     });
// };
ul.addEventListener("click",function(n){
    console.dir(n.target.tagName);
    if(n.target.tagName=="BUTTON"){
        n.target.parentElement.remove();
    };
});