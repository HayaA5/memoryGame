const cards=["A","B","C","A","B","C"];

// const imgApple=new Image("50","50");
// imgApple.src="apple.webp";
// const cards2=[imgApple];



const board= document.getElementById("board");
shuffle(cards);

for (i of cards){
    const element=document.createElement("div");
    
   // const image= document.createElement("img");

    //image.src="apple.webp";
    // image.width="50";
    // image.height="50";
    
    element.innerHTML= i; //"bla";
    //const board= document.getElementById("board");
    board.appendChild(element); //dev tools elements--> div in div
    //board.appendChild(image);
}

function shuffle(arr){
        arr.sort(()=> Math.random() - 0.5);
}
