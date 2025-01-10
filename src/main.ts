async function requestWord() : string[]{
    let definition = undefined;
    let word;
    while(typeof(definition) == "undefined") {
        console.log(1)
        word = await fetch("https://random-word.ryanrk.com//api/en/word/random");
        console.log(2)
        word = await word.json();
        // @ts-ignore
        word = await word[0].toLowerCase();
        let reqDef = await fetch(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${import.meta.env.VITE_DICTIONARY_KEY}`);
        // @ts-ignore
        reqDef = await reqDef.json();
        if(typeof(await reqDef) != "undefined"){
            definition = await reqDef[0]["shortdef"];
            console.log(await reqDef[0]);
        }
    }
    console.log(3);
    console.log(word)
    return [word, definition];
}

//drugie api
let tak = await requestWord()
document.getElementById("app")!.innerText = await tak[0] + ", " + await tak[1];

// let lista : string[] = [];
//
// for(let i = 0; i < main.length; i++){
//     let is = false;
//     while(!is) {
//
//         let nowe = await fetch("https://random-word.ryanrk.com//api/en/word/random")
//         lista[i] = await nowe.json();
//         lista[i] = lista[i][0]
//         for (let j = 0; j < lista[i].length; j++) {
//             if (lista[i][j] == main[i]){
//                 is = true;
//                 break;
//             }
//         }
//     }
//     document.getElementById("lista")!.innerText += lista[i] + " " + main[i] + "\n";
// }

//na samej górze słowo-klucz, niżej słowa które mają co najmniej jedną wspólną literkę i jaka to litera