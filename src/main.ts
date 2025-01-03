let tak = await fetch("https://random-word.ryanrk.com//api/en/word/random")
//drugie api https://dictionaryapi.com/products/index
let main = await tak.json()
main = main[0];

document.getElementById("app")!.innerText = main;

let lista : string[] = [];

for(let i = 0; i < main.length; i++){
    let is = false;
    while(!is) {

        let nowe = await fetch("https://random-word.ryanrk.com//api/en/word/random")
        lista[i] = await nowe.json();
        lista[i] = lista[i][0]
        for (let j = 0; j < lista[i].length; j++) {
            if (lista[i][j] == main[i]){
                is = true;
                break;
            }
        }
    }
    document.getElementById("lista")!.innerText += lista[i] + " " + main[i] + "\n";
}

//na samej górze słowo-klucz, niżej słowa które mają co najmniej jedną wspólną literkę i jaka to litera