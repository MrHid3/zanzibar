import Row from './Row';

export default class Tile {
    correctLetter: string;
    isDisabled: boolean;
    div: HTMLDivElement;
    isShown: boolean;
    parent: Row;
    isSelected: boolean;
    id: number;

    constructor(correctLetter = "none", div: HTMLDivElement, isShown: boolean, parent: Row, id: number) {
        this.isDisabled = (correctLetter == "none");
        this.correctLetter = correctLetter;
        this.div = div;
        this.isShown = isShown;
        this.parent = parent;
        this.isSelected = false;
        this.id = id;
        if(this.isShown) {
            this.div.innerHTML = correctLetter;
        }
        document.addEventListener("keydown", this.reactToKeys.bind(this));
        this.div.addEventListener("click", () => {
            if(this.isSelected || this.isDisabled || this.isShown) return;
            document.dispatchEvent(new Event("reset"));
            this.isSelected = true;
            this.div.classList.add("selected");
        })

        document.addEventListener("reset", () =>{
            this.isSelected = false;
            this.div.classList.remove("selected");
        })

        if(this.isShown){
            this.div.innerText = correctLetter.toUpperCase();
            this.isDisabled = true;
            this.div.classList.add("disabled");
        }
    }

    async reactToKeys(e: KeyboardEvent) {
        if(!this.isSelected) return;
        if(e.key == "ArrowRight" && this.id != this.parent.correctWord.length - 1 && !this.parent.tiles[this.id + 1].isDisabled){
            await new Promise(r => setTimeout(r, 20));
            this.parent.tiles[this.id + 1].div.click();
        }else if(e.key == "ArrowLeft" && this.id != 0 && !this.parent.tiles[this.id - 1].isDisabled){
            await new Promise(r => setTimeout(r, 20));
            this.parent.tiles[this.id - 1].div.click();
        }else if(e.key == "ArrowUp" && this.parent.id != 0  && !document.querySelector(".big")!.children[this.parent.id - 1].children[this.id].classList.contains("disabled")){
            await new Promise(r => setTimeout(r, 20));
            document.querySelector(".big")!.children[this.parent.id - 1].children[this.id].click();
        }else if(e.key == "ArrowDown" && this.parent.id != document.querySelector(".big")!.children.length - 1 && !document.querySelector(".big")!.children[this.parent.id + 1].children[this.id].classList.contains("disabled")){
            await new Promise(r => setTimeout(r, 20));
            document.querySelector(".big")!.children[this.parent.id + 1].children[this.id].click();
        }

    }
}