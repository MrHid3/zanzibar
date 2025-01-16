import Row from "./Row";

async function requestWord() : Promise<string>{
    let word = "jaka firma?"
    while(word.length > 7){
        let request = await fetch("https://random-word.ryanrk.com//api/en/word/random");
        request = await request.json();
        // @ts-ignore
        word = request[0].toLowerCase();
    }
    return word;
}

async function requestDefintion() : Promise<string[]>{
    let definition = undefined;
    let word = "skibidi toilet";
    while(typeof(definition) == "undefined") {
        word = await requestWord();
        let reqDef = await fetch(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=${import.meta.env.VITE_DICTIONARY_KEY}`);
        // @ts-ignore
        reqDef = await reqDef.json();
        if(typeof(await reqDef) != "undefined"){
            //@ts-ignore
            definition = await reqDef[0]["shortdef"];
        }
    }
    return [word, definition];
}



let big = document.querySelector(".big") as Element;
// let main = "gals";
let rows : Row[] = [];
// let words = [["ligma", "steve job died of this disease"], ["man", "ham aslume protagonist"], ["jonkler", "ham aslume antagonist"], ["balls", "officer"]]
let main = await requestWord();

//powodzenia testować coś z tym
let words : string[][] = [] as string[][];
for(let i = 0; i < main.length; i++){
    let isfine = false;
    let word : string[] =[] as string[];
    while(!isfine){
        word = await requestDefintion();
        for(let j = 0; j < word[0].length; j++){
            if(main[i] == word[0][j]){
                isfine = true;
                break;
            }
        }
    }
    words[i] = word;
    console.log(word);
}

console.log(main)
for(let i = 0; i < main.length; i++){
    let medium = document.createElement("div");
    medium.classList.add("medium");
    rows.push(new Row(medium, words[i][0], i))
    big.appendChild(medium);
}
