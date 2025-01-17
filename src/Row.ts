import Tile from "./Tile";

export default class Row {
    tiles : Tile[];
    correctWord : string;
    div : HTMLDivElement;
    id : number;
    main: string;

    constructor(div: HTMLDivElement, correctWord: string, id:number, main: string) {
        this.correctWord = correctWord;
        this.div = div;
        this.tiles = [];
        this.id = id;
        let ida = 0;
        let chances = 3;
        let letters = 1;
        this.main = main;
        for(let j = 0; j < correctWord.length; j++){
            let isShown = Math.random() * 10 < chances && chances > 0;
            let small = document.createElement("div");
            small.classList.add("small");
            if(letters == 1 && correctWord[j] == this.main[this.id]){
                small.style.border = "2px solid lime";
                letters = 0;
            }
            this.tiles.push(new Tile(correctWord[j], small, isShown, this, ida++))
            this.div.appendChild(small);
        }
        for(let j = 0; j < 7 - correctWord.length; j++){
            let small = document.createElement("div");
            small.classList.add("small");
            small.classList.add("disabled");
            this.tiles.push(new Tile("none", small, false, this, ida++))
            this.div.appendChild(small);
        }
    }
}