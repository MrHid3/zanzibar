import Tile from "./Tile";

export default class Row {
    tiles : Tile[];
    correctWord : string;
    div : HTMLDivElement;
    id : number;

    constructor(div: HTMLDivElement, correctWord: string, id:number) {
        this.correctWord = correctWord;
        this.div = div;
        this.tiles = [];
        this.id = id;
        let ida = 0;
        let chances = 3;
        for(let j = 0; j < correctWord.length; j++){
            let isShown = Math.random() * 10 < chances && chances > 0;
            let small = document.createElement("div");
            small.classList.add("small");
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