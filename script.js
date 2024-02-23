let grid = document.querySelector(".grid");
let sakkbanVan = false;
let sakkKiir = document.querySelector(".sakkE");
let kiLepKiir = document.querySelector(".kiLep");
let kiLep = "feh";
let lepesVan = false;
let tabla = ["b2","l2","f2","k2","kn2","f2","l2","b2","p2","p2","p2","p2","p2","p2","p2","p2","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","p1","p1","p1","p1","p1","p1","p1","p1","b1","l1","f1","k1","kn1","f1","l1","b1"];
let megseGomb = document.querySelector(".megseGomb");
megseGomb.style.display = "none";
megseGomb.addEventListener('click', () => {
    lepesVan = false;
    megseGomb.style.display = "none";
    TablaReset();
    TablaCsinal();
})

TablaReset();

// fehér
// 0 üres, p1 paraszt, b1 bástya, l1 ló, f1 futó, kn1 királynő, k1 király
// fekete
// 0 üres, p2 paraszt, b2 bástya, l2 ló, f2 futó, kn2 királynő, k2 király
function TablaCsinal() {
    let seged = 0;
    tabla.forEach(mezo => {
        let aktMezo = document.querySelector(`#s${seged + 1}`);
        if(mezo == "0") aktMezo.innerHTML = "";
        if(mezo == "p1") {
            aktMezo.innerHTML = "♙";
            ParasztLep(seged + 1, "feh");
        }
        if(mezo == "b1") {
            aktMezo.innerHTML = "♖";
            BastyaLep(seged + 1, "feh");
        }
        if(mezo == "l1") {
            aktMezo.innerHTML = "♘";
            LoLep(seged + 1, "feh");
        }
        if(mezo == "f1") {
            aktMezo.innerHTML = "♗";
            FutoLep(seged + 1, "feh");
        }
        if(mezo == "kn1") {
            aktMezo.innerHTML = "♕";
            KnLep(seged + 1, "feh");
        }
        if(mezo == "k1") {
            aktMezo.innerHTML = "♔";
            KiralyLep(seged + 1, "feh");
        }
        if(mezo == "p2") {
            aktMezo.innerHTML = "♟";
            ParasztLep(seged + 1, "fek");
        }
        if(mezo == "b2") {
            aktMezo.innerHTML = "♜";
            BastyaLep(seged + 1, "fek");
        }
        if(mezo == "l2") {
            aktMezo.innerHTML = "♞";
            LoLep(seged + 1, "fek");
        }
        if(mezo == "f2") {
            aktMezo.innerHTML = "♝";
            FutoLep(seged + 1, "fek");
        }
        if(mezo == "kn2") {
            aktMezo.innerHTML = "♛";
            KnLep(seged + 1, "fek");
        }
        if(mezo == "k2") {
            aktMezo.innerHTML = "♚";
            KiralyLep(seged + 1, "fek");
        }
        seged++;
    });
}

function TablaReset(){
    grid.innerHTML = "";
    let seged = 0;
    for(i = 0; i < 64; i++) {
        if(i % 8 == 0 && i % 16 != 0) seged = 1;
        else if(i % 16 == 0) seged = 0;
        let square = document.createElement("div");
        square.classList.add("square");
        square.id = `s${i + 1}`;
        if(square.id.split("s")[1] % 2 == seged) square.classList.add("fekete");
        else square.classList.add("feher");
        grid.appendChild(square);
    }
}

function SakkCheck(){
    let segedTabla = tabla;
    let seged = 0;
    let index = 0;
    if(kiLep == "feh") seged = "2";
    else seged = "1";
    segedTabla.forEach(e => {
        if(e.includes(seged)){
            if(e.includes("p")){
                if(ParasztCheck(index + 1, kiLep)) return true;
            }
            if(e.includes("b")){
                
            }
            if(e.includes("l")){
                
            }
            if(e.includes("f")){
                
            }
            if(e.includes("kn")){
                
            }
        }
        index++;
    });
    return false;
}

function LepesSeged(honnan, hova){
    if(kiLep == "feh") {
        kiLep = "fek";
        kiLepKiir.innerHTML = "Fekete lép";
    }
    else{
        kiLep = "feh";
        kiLepKiir.innerHTML = "Fehér lép";
    }
    lepesVan = false;
    megseGomb.style.display = "none";
    tabla[hova - 1] = tabla[honnan - 1];
    tabla[honnan - 1] = "0";
    TablaReset();
    TablaCsinal();
    if(SakkCheck()){
        if(kiLep == "fek") sakkKiir.innerHTML = "Fekete sakkban van";
        else sakkKiir.innerHTML = "Fehér sakkban van";
    }
}

function ParasztLep(index, szin){
    if(szin == "feh" && kiLep == "feh"){
        document.querySelector(`#s${index}`).addEventListener('click', () => {
            if(index > 8){
                if(!lepesVan){
                    megseGomb.style.display = "inline";
                    lepesVan = true;
                    //lépés fel
                    if(tabla[index - 9] == "0"){
                        document.querySelector(`#s${index - 8}`).classList.add("lepes");
                        document.querySelector(`#s${index - 8}`).addEventListener('click', () => {
                            LepesSeged(index, index - 8);
                        });
                    }
                    if(tabla[index - 9] == "0" && index < 57 && index > 48){
                        document.querySelector(`#s${index - 16}`).classList.add("lepes");
                        document.querySelector(`#s${index - 16}`).addEventListener('click', () => {
                            LepesSeged(index, index - 16);
                        });
                    }
                    //lépés átlósan
                    if((index + 7) % 8 != 0 && tabla[index - 10].includes("2")){
                        document.querySelector(`#s${index - 9}`).classList.add("utes");
                        document.querySelector(`#s${index - 9}`).addEventListener('click', () => {
                            LepesSeged(index, index - 9);
                        });
                    }
                    if(index % 8 != 0 && tabla[index - 8].includes("2")){
                        document.querySelector(`#s${index - 7}`).classList.add("utes");
                        document.querySelector(`#s${index - 7}`).addEventListener('click', () => {
                            LepesSeged(index, index - 7);
                        });
                    }
                }
            }
            //else paraszt beváltás
        });
    }
    if(szin == "fek" && kiLep == "fek"){
        document.querySelector(`#s${index}`).addEventListener('click', () => {
            if(index < 57){
                if(!lepesVan){
                    megseGomb.style.display = "inline";
                    lepesVan = true;
                    //lépés le
                    if(tabla[index + 7] == "0"){
                        document.querySelector(`#s${index + 8}`).classList.add("lepes");
                        document.querySelector(`#s${index + 8}`).addEventListener('click', () => {
                            LepesSeged(index, index + 8);
                        });
                    }
                    if(tabla[index + 7] == "0" && index > 8 && index < 17){
                        document.querySelector(`#s${index + 16}`).classList.add("lepes");
                        document.querySelector(`#s${index + 16}`).addEventListener('click', () => {
                            LepesSeged(index, index + 16);
                        });
                    }
                    //lépés átlósan
                    if(index % 8 != 0 && tabla[index + 8].includes("1")){
                        document.querySelector(`#s${index + 9}`).classList.add("utes");
                        document.querySelector(`#s${index + 9}`).addEventListener('click', () => {
                            LepesSeged(index, index + 9);
                        });
                    }
                    if((index + 7) % 8 != 0 && tabla[index + 6].includes("1")){
                        document.querySelector(`#s${index + 7}`).classList.add("utes");
                        document.querySelector(`#s${index + 7}`).addEventListener('click', () => {
                            LepesSeged(index, index + 7);
                        });
                    }
                }
            }
            //else paraszt beváltás
        });
    }
}

function BastyaLep(index, szin){
    if(szin == kiLep){
        document.querySelector(`#s${index}`).addEventListener('click', () => {
            if(!lepesVan){
                megseGomb.style.display = "inline";
                lepesVan = true;

                let movementY = Math.floor(index / 8);
                let movementX = ((index + 7) % 8) + 1;
                let direction = 1;
                let directions = [true, true, true, true];
                for (let i = 0; i < 4; i++) {
                    while(directions[i]){
                        let segedLista2 = [movementX + ((movementY-direction)*8) - 1,movementX + ((movementY+direction)*8) - 1 , (movementX-direction) + (movementY*8) - 1, (movementX+direction) + (movementY*8) - 1];
                        let segedLista3 = [segedLista2[0] < 0, segedLista2[1] > 63, (segedLista2[2]+1) % 8 == 0, (segedLista2[3]+8) % 8 == 0];
                        if(segedLista3[i]) directions[i] = false;
                        else if(tabla[segedLista2[i]] == "0"){
                            document.querySelector(`#s${segedLista2[i] + 1}`).classList.add("lepes");
                            document.querySelector(`#s${segedLista2[i] + 1}`).addEventListener('click', () => {
                                LepesSeged(index, segedLista2[i] + 1);
                            });
                        }
                        else if((tabla[segedLista2[i]].includes("2") && szin == "feh")||(tabla[segedLista2[i]].includes("1") && szin == "fek")){
                            document.querySelector(`#s${segedLista2[i] + 1}`).classList.add("utes");
                            document.querySelector(`#s${segedLista2[i] + 1}`).addEventListener('click', () => {
                                LepesSeged(index, segedLista2[i] + 1);
                            });
                            directions[i] = false;
                        }
                        else directions[i] = false;
                        direction++;
                    }
                    direction = 1;
                }
            }
        });
    }
}

function LoLep(index, szin){
    if(szin == kiLep){
        document.querySelector(`#s${index}`).addEventListener('click', () => {
            if(!lepesVan){
                megseGomb.style.display = "inline";
                lepesVan = true;
                let movementY = Math.floor(index / 8);
                let movementX = ((index + 7) % 8) + 1;
                let segedLista1 = [index > 17 && (index + 7) % 8 != 0, index > 16 && index % 8 != 0, index > 10 && (index + 6) % 8 != 0 && (index + 7) % 8 != 0, index > 8 && index % 8 != 0 && (index + 1) % 8 != 0, index < 48 && index % 8 != 0, index < 49 && (index + 7) % 8 != 0, index < 57 && index % 8 != 0 && (index + 1) % 8 != 0, index < 57 && (index + 6) % 8 != 0 && (index + 7) % 8 != 0];
                let segedLista2 = [(movementX-1) + ((movementY-2)*8), (movementX+1) + ((movementY-2)*8), (movementX-2) + ((movementY-1)*8), (movementX+2) + ((movementY-1)*8), (movementX+1) + ((movementY+2)*8), (movementX-1) + ((movementY+2)*8), (movementX+2) + ((movementY-1)*8), (movementX-2) + ((movementY+1)*8)];
                for(let i = 0; i < 8; i++){
                    if(segedLista1[i]){
                        if((tabla[segedLista2[i]-1].includes("2") && szin == "feh")||(tabla[segedLista2[i]-1].includes("1") && szin == "fek")){
                            document.querySelector(`#s${segedLista2[i]}`).classList.add("utes");
                            document.querySelector(`#s${segedLista2[i]}`).addEventListener('click', () => {
                                LepesSeged(index, segedLista2[i]);
                            });
                        }
                        else if(tabla[segedLista2[i]-1] == "0"){
                            document.querySelector(`#s${segedLista2[i]}`).classList.add("lepes");
                            document.querySelector(`#s${segedLista2[i]}`).addEventListener('click', () => {
                                LepesSeged(index, segedLista2[i]);
                            });
                        }
                    }
                }
            }
        });
    }
}

function FutoLep(index, szin){
    if(szin == kiLep){
        document.querySelector(`#s${index}`).addEventListener('click', () => {
            megseGomb.style.display = "inline";
            lepesVan = true;
            let movementY = Math.floor(index / 8);
            let movementX = ((index + 7) % 8) + 1;
            let direction = 1;
            let dircetions = [true, true, true, true];
            for (let i = 0; i < 4; i++) {
                while(dircetions[i]){
                    let segedLista2 = [(movementX-direction) + ((movementY-direction)*8)-1,(movementX+direction) + ((movementY-direction)*8)-1,(movementX-direction) + ((movementY+direction)*8)-1,(movementX+direction) + ((movementY+direction)*8)-1];
                    let segedLista3 = [segedLista2[i] < 0 || (segedLista2[i] + 1) % 8 == 0,segedLista2[i] < 0 || (segedLista2[i] + 8) % 8 == 0,segedLista2[i] > 63 || (segedLista2[i]+1) % 8 == 0,segedLista2[i] < 0 || (segedLista2[i] + 1) % 8 == 0];
                    if(segedLista3[i]) dircetions[i] = false;
                    else if(tabla[segedLista2[i]] == "0"){
                        document.querySelector(`#s${segedLista2[i] + 1}`).classList.add("lepes");
                        document.querySelector(`#s${segedLista2[i] + 1}`).addEventListener('click', () => {
                            LepesSeged(index, segedLista2[i] + 1);
                        });
                    }
                    else if((tabla[segedLista2[i]].includes("2") && szin == "feh")||(tabla[segedLista2[i]].includes("1") && szin == "fek")){
                        document.querySelector(`#s${segedLista2[i] + 1}`).classList.add("utes");
                        document.querySelector(`#s${segedLista2[i] + 1}`).addEventListener('click', () => {
                            LepesSeged(index, segedLista2[i] + 1);
                        });
                        dircetions[i] = false;
                    }
                    else dircetions[i] = false;
                    direction++;
                }
                direction = 1;
            }
        });
    }
}

function KnLep(index, szin){
    BastyaLep(index,szin);
    FutoLep(index,szin);
}

function KiralyLep(index, szin){
    if(szin == kiLep){
        document.querySelector(`#s${index}`).addEventListener('click', () => {
            megseGomb.style.display = "inline";
            lepesVan = true;
            let segedLista = [index - 8, index - 9, index - 10, index - 2, index, index + 6, index + 7, index + 8];
            let segedLista2 = [index > 8 && index % 8 != 0, index > 8, index > 8 && (index + 7) % 8 != 0, index > 1 && index % 8 != 0, (index + 7) % 8 != 0, index < 57 && index % 8 != 0, index < 57, index < 57 && (index + 7) % 8 != 0];
            for (let i = 0; i < 9; i++) {
                if(segedLista2[i]){
                    if((tabla[segedLista[i]].includes("2") && szin == "feh")||(tabla[segedLista[i]].includes("1") && szin == "fek")){
                        document.querySelector(`#s${segedLista[i] + 1}`).classList.add("utes");
                        document.querySelector(`#s${segedLista[i] + 1}`).addEventListener('click', () => {
                            LepesSeged(index, segedLista[i] + 1);
                        });
                    }
                    else if(tabla[segedLista[i]] == "0"){
                        document.querySelector(`#s${segedLista[i] + 1}`).classList.add("lepes");
                        document.querySelector(`#s${segedLista[i] + 1}`).addEventListener('click', () => {
                            LepesSeged(index, segedLista[i] + 1);
                        });
                    }
                }
            }
        });
    }
}

function ParasztCheck(index, szin){
    if(szin == "fek"){
        if(index > 8){
            if((index + 7) % 8 != 0){
                document.querySelector(`#s${index - 9}`).classList.add("sakkCheck");
                if(tabla[index - 10] == "k2") return true;
            }
            if(index % 8 != 0){
                document.querySelector(`#s${index - 7}`).classList.add("sakkCheck");
                if(tabla[index - 8] == "k2") return true;
            }
        }
    }
    if(szin == "feh"){
        if(index < 57){
            if(index % 8 != 0){
                document.querySelector(`#s${index + 9}`).classList.add("sakkCheck");
                if(tabla[index + 8] == "k1") return true;
            }
            if((index + 7) % 8 != 0){
                document.querySelector(`#s${index + 7}`).classList.add("sakkCheck");
                if(tabla[index + 6] == "k1") return true;
            }
        }
    }
    return false;
}

function BastyaCheck(index, szin){
    if(szin == kiLep){
        document.querySelector(`#s${index}`).addEventListener('click', () => {
            if(!lepesVan){
                megseGomb.style.display = "inline";
                lepesVan = true;
                let seged = 1;
                let segedLista1 = [true, true, true, true];
                for (let i = 0; i < 4; i++) {
                    while(segedLista1[i]){
                        let segedLista2 = [(index-1) - (seged*8), (index-1) + (seged*8), (index-1) - (seged), (index-1) + (seged)];
                        let segedLista3 = [segedLista2[0] < 0, segedLista2[1] > 63, (segedLista2[2]+1) % 8 == 0, (segedLista2[3]+8) % 8 == 0];
                        if(segedLista3[i]) segedLista1[i] = false;
                        else if(tabla[segedLista2[i]] == "0"){
                            document.querySelector(`#s${segedLista2[i] + 1}`).classList.add("lepes");
                            document.querySelector(`#s${segedLista2[i] + 1}`).addEventListener('click', () => {
                                LepesSeged(index, segedLista2[i] + 1);
                            });
                        }
                        else if((tabla[segedLista2[i]].includes("2") && szin == "feh")||(tabla[segedLista2[i]].includes("1") && szin == "fek")){
                            document.querySelector(`#s${segedLista2[i] + 1}`).classList.add("utes");
                            document.querySelector(`#s${segedLista2[i] + 1}`).addEventListener('click', () => {
                                LepesSeged(index, segedLista2[i] + 1);
                            });
                            segedLista1[i] = false;
                        }
                        else segedLista1[i] = false;
                        seged++;
                    }
                    seged = 1;
                }
            }
        });
    }
}

function LoCheck(index, szin){
    if(szin == kiLep){
        document.querySelector(`#s${index}`).addEventListener('click', () => {
            if(!lepesVan){
                megseGomb.style.display = "inline";
                lepesVan = true;
                let segedLista1 = [index > 17 && (index + 7) % 8 != 0, index > 16 && index % 8 != 0, index > 10 && (index + 6) % 8 != 0 && (index + 7) % 8 != 0, index > 8 && index % 8 != 0 && (index + 1) % 8 != 0, index < 48 && index % 8 != 0, index < 49 && (index + 7) % 8 != 0, index < 57 && index % 8 != 0 && (index + 1) % 8 != 0, index < 57 && (index + 6) % 8 != 0 && (index + 7) % 8 != 0];
                let segedLista2 = [index - 17, index - 15, index - 10, index - 6, index + 17, index + 15, index + 10, index + 6];
                for(let i = 0; i < 8; i++){
                    if(segedLista1[i]){
                        if((tabla[segedLista2[i]-1].includes("2") && szin == "feh")||(tabla[segedLista2[i]-1].includes("1") && szin == "fek")){
                            document.querySelector(`#s${segedLista2[i]}`).classList.add("utes");
                            document.querySelector(`#s${segedLista2[i]}`).addEventListener('click', () => {
                                LepesSeged(index, segedLista2[i]);
                            });
                        }
                        else if(tabla[segedLista2[i]-1] == "0"){
                            document.querySelector(`#s${segedLista2[i]}`).classList.add("lepes");
                            document.querySelector(`#s${segedLista2[i]}`).addEventListener('click', () => {
                                LepesSeged(index, segedLista2[i]);
                            });
                        }
                    }
                }
            }
        });
    }
}

function FutoCheck(index, szin){
    if(szin == kiLep){
        document.querySelector(`#s${index}`).addEventListener('click', () => {
            megseGomb.style.display = "inline";
            lepesVan = true;
            let seged = 1;
            let segedLista1 = [true, true, true, true];
            //1
            for (let i = 0; i < 4; i++) {
                while(segedLista1[i]){
                    let segedLista2 = [(index-1) - (seged*9),(index-1) - (seged*7),(index-1) + (seged*9),(index-1) + (seged*7)];
                    let segedLista3 = [segedLista2[i] < 0 || (segedLista2[i] + 1) % 8 == 0,segedLista2[i] < 0 || (segedLista2[i] + 8) % 8 == 0,segedLista2[i] > 63 || (segedLista2[i] + 8) % 8 == 0,segedLista2[i] < 0 || (segedLista2[i] + 1) % 8 == 0];
                    if(segedLista3[i]) segedLista1[i] = false;
                    else if(tabla[segedLista2[i]] == "0"){
                        document.querySelector(`#s${segedLista2[i] + 1}`).classList.add("lepes");
                        document.querySelector(`#s${segedLista2[i] + 1}`).addEventListener('click', () => {
                            LepesSeged(index, segedLista2[i] + 1);
                        });
                    }
                    else if((tabla[segedLista2[i]].includes("2") && szin == "feh")||(tabla[segedLista2[i]].includes("1") && szin == "fek")){
                        document.querySelector(`#s${segedLista2[i] + 1}`).classList.add("utes");
                        document.querySelector(`#s${segedLista2[i] + 1}`).addEventListener('click', () => {
                            LepesSeged(index, segedLista2[i] + 1);
                        });
                        segedLista1[i] = false;
                    }
                    else segedLista1[i] = false;
                    seged++;
                }
                seged = 1;
            }
        });
    }
}

function KnCheck(index, szin){
    BastyaCheck(index,szin);
    FutoCheck(index,szin);
}

function KiralyCheck(index, szin){
    if(szin == kiLep){
        document.querySelector(`#s${index}`).addEventListener('click', () => {
            megseGomb.style.display = "inline";
            lepesVan = true;
            let segedLista = [index - 8, index - 9, index - 10, index - 2, index, index + 6, index + 7, index + 8];
            let segedLista2 = [index > 8 && index % 8 != 0, index > 8, index > 8 && (index + 7) % 8 != 0, index > 1 && index % 8 != 0, (index + 7) % 8 != 0, index < 57 && index % 8 != 0, index < 57, index < 57 && (index + 7) % 8 != 0];
            for (let i = 0; i < 9; i++) {
                if(segedLista2[i]){
                    if((tabla[segedLista[i]].includes("2") && szin == "feh")||(tabla[segedLista[i]].includes("1") && szin == "fek")){
                        document.querySelector(`#s${segedLista[i] + 1}`).classList.add("utes");
                        document.querySelector(`#s${segedLista[i] + 1}`).addEventListener('click', () => {
                            LepesSeged(index, segedLista[i] + 1);
                        });
                    }
                    else if(tabla[segedLista[i]] == "0"){
                        document.querySelector(`#s${segedLista[i] + 1}`).classList.add("lepes");
                        document.querySelector(`#s${segedLista[i] + 1}`).addEventListener('click', () => {
                            LepesSeged(index, segedLista[i] + 1);
                        });
                    }
                }
            }
        });
    }
}

TablaCsinal();