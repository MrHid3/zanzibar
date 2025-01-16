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
let main = await requestWord();
console.log(main)
for(let i = 0; i < main.length; i++){
    let medium = document.createElement("div");
    medium.classList.add("medium");
    for(let j = 0; j < 7; j++){
        let small = document.createElement("div");
        small.classList.add("small");
        medium.appendChild(small);
    }
    big.appendChild(medium);
}

let words = [];
for(let i = 0; i < main.length; i++){
    let isfine = false;
    let word;
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

for(let i = 0; i < words.length; i++){
    //@ts-ignore
    for(let j = 6; j > words[i].length; j++){

    }
}