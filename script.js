let grid = document.querySelector(".grid");
let sakkbanVan = false;
let abc = false;
let sakkKiir = document.querySelector(".sakkE");
let kiLepKiir = document.querySelector(".kiLep");
let sakkMatt = document.querySelector(".sakkMatt");
let sakkMattKiir = document.querySelector(".sakkMattKiir");
sakkMattKiir.style.display = "none";
sakkMatt.style.display = "none";
sakkMatt.addEventListener('click', () =>{
    sakkMatt.style.display = "none";
    megseGomb.style.display = "none";
    kiLepKiir.style.display = "none";
    sakkKiir.style.display = "none";
    sakkMattKiir.style.display = "block";
    if(kiLep == "feh") sakkMattKiir.innerHTML = "Sakk-matt, fekete nyert.";
    else sakkMattKiir.innerHTML = "Sakk-matt, fehér nyert.";
})
let kiLep = "feh";
let seged123 = false;
let kiLepett = "feh";
let lepesVan = false;
let tabla = ["b2","l2","f2","kn2","k2","f2","l2","b2","p2","p2","p2","p2","p2","p2","p2","p2","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","p1","p1","p1","p1","p1","p1","p1","p1","b1","l1","f1","kn1","k1","f1","l1","b1"];
let megseGomb = document.querySelector(".megseGomb");
megseGomb.style.display = "none";
megseGomb.addEventListener('click', () => {
    lepesVan = false;
    megseGomb.style.display = "none";
    TablaReset();
    TablaCsinal();
})
let feherBastyazas = true;
let feketeBastyazas = true;
let parasztValtas = document.querySelector(".parasztValtas");
parasztValtas.style.display = "none";
let valasztas = false;

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

function SakkCheck(tabla, kiLep){
    let vissza = false;
    let segedTabla = tabla;
    let seged = 0;
    let index = 0;
    if(kiLep == "feh") seged = "2";
    else seged = "1";
    segedTabla.forEach(e => {
        if(e.includes(seged)){
            if(e.includes("p")){
                if(ParasztCheck(index + 1, kiLep, tabla)) vissza = true;
            }
            if(e.includes("b")){
                if(BastyaCheck(index + 1, kiLep, tabla)) vissza = true;
            }
            if(e.includes("l")){
                if(LoCheck(index + 1, kiLep, tabla)) vissza = true;
            }
            if(e.includes("f")){
                if(FutoCheck(index + 1, kiLep, tabla)) vissza = true;
            }
            if(e.includes("kn")){
                if(KnCheck(index + 1, kiLep, tabla)) vissza = true;
            }
        }
        index++;
    });
    return vissza;
}

function LepesSeged(honnan, hova){
    if(kiLep == "feh") {
        kiLep = "fek";
        kiLepett = "feh";
        kiLepKiir.innerHTML = "Fekete lép";
    }
    else{
        kiLep = "feh";
        kiLepett = "fek";
        kiLepKiir.innerHTML = "Fehér lép";
    }

    let tesztTabla = [];
    tabla.forEach(e => {
        tesztTabla.push(e);
    });
    tesztTabla[hova - 1] = tesztTabla[honnan - 1];
    tesztTabla[honnan - 1] = "0";
    if(SakkCheck(tesztTabla, kiLepett)) sakkbanVan = true;

    if(sakkbanVan){
        sakkMatt.style.display = "inline";
        tesztTabla = [];
        tabla.forEach(e => {
            tesztTabla.push(e);
        });
        tesztTabla[hova - 1] = tesztTabla[honnan - 1];
        tesztTabla[honnan - 1] = "0";
        if(!SakkCheck(tesztTabla, kiLepett)){
            sakkbanVan = false;
            sakkKiir.innerHTML = "";
            lepesVan = false;
            megseGomb.style.display = "none";
            tabla[hova - 1] = tabla[honnan - 1];
            tabla[honnan - 1] = "0";
            TablaReset();
            TablaCsinal();
            if(SakkCheck(tabla, kiLep)){
                if(kiLep == "fek") sakkKiir.innerHTML = "Fekete sakkban van";
                else sakkKiir.innerHTML = "Fehér sakkban van";
                sakkbanVan = true;
            }
        }
        else{
            alert("Nem valid lépés!");
            if(kiLep == "feh") {
                kiLep = "fek";
                kiLepett = "feh";
                kiLepKiir.innerHTML = "Fekete lép";
            }
            else{
                kiLep = "feh";
                kiLepett = "fek";
                kiLepKiir.innerHTML = "Fehér lép";
            }
            lepesVan = false;
            megseGomb.style.display = "none";
            TablaReset();
            TablaCsinal();
        }
    }
    else{
        sakkMatt.style.display = "none";
        lepesVan = false;
        megseGomb.style.display = "none";
        tabla[hova - 1] = tabla[honnan - 1];
        tabla[honnan - 1] = "0";
        TablaReset();
        TablaCsinal();
        if(SakkCheck(tabla, kiLep)){
            sakkMatt.style.display = "inline";
            if(kiLep == "fek") sakkKiir.innerHTML = "Fekete sakkban van";
            else sakkKiir.innerHTML = "Fehér sakkban van";
            sakkbanVan = true;
        }
    }
}

function Bastyazas(honnan){
    console.log(honnan);
    sakkMatt.style.display = "none";
    lepesVan = false;
    megseGomb.style.display = "none";

    if(kiLep == "feh"){
        if(honnan == 64){
            tabla[63] = "0";
            tabla[62] = "k1";
            tabla[61] = "b1";
            tabla[60] = "0";
        }
        if(honnan == 57){
            tabla[56] = "0";
            tabla[58] = "k1";
            tabla[59] = "b1";
            tabla[60] = "0";
        }
    }
    else{
        if(honnan == 1){
            tabla[0] = "0";
            tabla[2] = "k1";
            tabla[3] = "b1";
            tabla[4] = "0";
        }
        if(honnan == 8){
            tabla[7] = "0";
            tabla[6] = "k1";
            tabla[5] = "b1";
            tabla[4] = "0";
        }
    }

    TablaReset();
    TablaCsinal();
    if(kiLep == "feh") {
        kiLep = "fek";
        kiLepett = "feh";
        kiLepKiir.innerHTML = "Fekete lép";
    }
    else{
        kiLep = "feh";
        kiLepett = "fek";
        kiLepKiir.innerHTML = "Fehér lép";
    }
}

function ParasztValtas(honnan, hova){
    parasztValtas.style.display = "inline";
    valasztas = true;
    sakkMatt.style.display = "none";
    lepesVan = true;
    megseGomb.style.display = "none";
    parasztValtas.style.display = "inline";
    tabla[honnan-1] = "0";
    tabla[hova-1] = "0";
    let bastyaV = document.createElement("span");
    bastyaV.innerHTML = " bástya ";
    bastyaV.classList.add("bastyaV");

    let loV = document.createElement("span");
    loV.innerHTML = "ló ";
    loV.classList.add("loV");

    let futoV = document.createElement("span");
    futoV.innerHTML = "futó ";
    futoV.classList.add("futoV");

    let knV = document.createElement("span");
    knV.innerHTML = "királynő";
    knV.classList.add("knV");

    bastyaV.addEventListener('click', () => {
        if(kiLep == "feh") tabla[hova-1] = "b1";
        else tabla[hova-1] = "b2";
        ValtasSeged();
    });
    loV.addEventListener('click', () => {
        if(kiLep == "feh") tabla[hova-1] = "l1";
        else tabla[hova-1] = "l2";
        ValtasSeged();
    });
    futoV.addEventListener('click', () => {
        if(kiLep == "feh") tabla[hova-1] = "f1";
        else tabla[hova-1] = "f2";
        ValtasSeged();
    });
    knV.addEventListener('click', () => {
        if(kiLep == "feh") tabla[hova-1] = "kn1";
        else tabla[hova-1] = "kn2";
        ValtasSeged();
    });

    parasztValtas.appendChild(bastyaV);
    parasztValtas.appendChild(loV);
    parasztValtas.appendChild(futoV);
    parasztValtas.appendChild(knV);
}

function ValtasSeged(){
    parasztValtas.style.display = "none";
    valasztas = false;
    lepesVan = false;
    parasztValtas.innerHTML = "Paraszt beváltása:";
    if(kiLep == "feh") {
        kiLep = "fek";
        kiLepett = "feh";
        kiLepKiir.innerHTML = "Fekete lép";
    }
    else{
        kiLep = "feh";
        kiLepett = "fek";
        kiLepKiir.innerHTML = "Fehér lép";
    }
    TablaReset();
    TablaCsinal();
}

function ParasztLep(index, szin){
    if(szin == "feh" && kiLep == "feh"){
        document.querySelector(`#s${index}`).addEventListener('click', () => {
            if(index > 16){
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
            //paraszt beváltás
            else{
                if(!lepesVan){
                    megseGomb.style.display = "inline";
                    lepesVan = true;
                    //lépés fel
                    if(tabla[index - 9] == "0"){
                        document.querySelector(`#s${index - 8}`).classList.add("bevaltas");
                        document.querySelector(`#s${index - 8}`).addEventListener('click', () => {
                            ParasztValtas(index, index - 8);
                        });
                    }
                    //lépés átlósan
                    if((index + 7) % 8 != 0 && tabla[index - 10].includes("2")){
                        document.querySelector(`#s${index - 9}`).classList.add("bevaltas");
                        document.querySelector(`#s${index - 9}`).addEventListener('click', () => {
                            ParasztValtas(index, index - 9);
                        });
                    }
                    if(index % 8 != 0 && tabla[index - 8].includes("2")){
                        document.querySelector(`#s${index - 7}`).classList.add("bevaltas");
                        document.querySelector(`#s${index - 7}`).addEventListener('click', () => {
                            ParasztValtas(index, index - 7);
                        });
                    }
                }
            }
        });
    }
    if(szin == "fek" && kiLep == "fek"){
        document.querySelector(`#s${index}`).addEventListener('click', () => {
            if(index < 49){
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
            else{
                if(!lepesVan){
                    megseGomb.style.display = "inline";
                    lepesVan = true;
                    //lépés fel
                    if(tabla[index + 7] == "0"){
                        document.querySelector(`#s${index + 8}`).classList.add("bevaltas");
                        document.querySelector(`#s${index + 8}`).addEventListener('click', () => {
                            ParasztValtas(index, index + 8);
                        });
                    }
                    //lépés átlósan
                    if((index + 7) % 8 != 0 && tabla[index + 8].includes("1")){
                        document.querySelector(`#s${index + 9}`).classList.add("bevaltas");
                        document.querySelector(`#s${index + 9}`).addEventListener('click', () => {
                            ParasztValtas(index, index + 9);
                        });
                    }
                    if(index % 8 != 0 && tabla[index + 6].includes("1")){
                        document.querySelector(`#s${index + 7}`).classList.add("bevaltas");
                        document.querySelector(`#s${index + 7}`).addEventListener('click', () => {
                            ParasztValtas(index, index + 7);
                        });
                    }
                }
            }
        });
    }
}

function BastyaLep(index, szin){
    // if(szin == kiLep){
    //     document.querySelector(`#s${index}`).addEventListener('click', () => {
    //         if(!lepesVan){
    //             megseGomb.style.display = "inline";
    //             lepesVan = true;

    //             let movementY = Math.floor(index / 8);
    //             let movementX = ((index + 7) % 8) + 1;
    //             let direction = 1;
    //             let directions = [true, true, true, true];
    //             for (let i = 0; i < 4; i++) {
    //                 while(directions[i]){
    //                     let segedLista2 = [movementX + ((movementY-direction)*8) - 1,movementX + ((movementY+direction)*8) - 1 , (movementX-direction) + (movementY*8) - 1, (movementX+direction) + (movementY*8) - 1];
    //                     let segedLista3 = [segedLista2[0] < 0, segedLista2[1] > 63, (segedLista2[2]+1) % 8 == 0, (segedLista2[3]+8) % 8 == 0];
    //                     if(segedLista3[i]) directions[i] = false;
    //                     else if(tabla[segedLista2[i]] == "0"){
    //                         document.querySelector(`#s${segedLista2[i] + 1}`).classList.add("lepes");
    //                         document.querySelector(`#s${segedLista2[i] + 1}`).addEventListener('click', () => {
    //                             LepesSeged(index, segedLista2[i] + 1);
    //                         });
    //                     }
    //                     else if((tabla[segedLista2[i]].includes("2") && szin == "feh")||(tabla[segedLista2[i]].includes("1") && szin == "fek")){
    //                         document.querySelector(`#s${segedLista2[i] + 1}`).classList.add("utes");
    //                         document.querySelector(`#s${segedLista2[i] + 1}`).addEventListener('click', () => {
    //                             LepesSeged(index, segedLista2[i] + 1);
    //                         });
    //                         directions[i] = false;
    //                     }
    //                     else directions[i] = false;
    //                     direction++;
    //                 }
    //                 direction = 1;
    //             }
    //         }
    //     });
    // }
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

                        else if(tabla[segedLista2[i]] == "k1" && szin == "feh" && feherBastyazas && !sakkbanVan && tabla[index-1] == "b1"){
                            document.querySelector(`#s${segedLista2[i] + 1}`).classList.add("bastyazas");
                            document.querySelector(`#s${segedLista2[i] + 1}`).addEventListener('click', () => {
                                Bastyazas(index);
                            });
                            feherBastyazas = false;
                            directions[i] = false;
                        }
                        else if(tabla[segedLista2[i]] == "k2" && szin == "fek" && feketeBastyazas && !sakkbanVan && tabla[index-1] == "b2"){
                            document.querySelector(`#s${segedLista2[i] + 1}`).classList.add("bastyazas");
                            document.querySelector(`#s${segedLista2[i] + 1}`).addEventListener('click', () => {
                                Bastyazas(index);
                            });
                            feketeBastyazas = false;
                            directions[i] = false;
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

function LoLep(index, szin){
    // if(szin == kiLep){
    //     document.querySelector(`#s${index}`).addEventListener('click', () => {
    //         if(!lepesVan){
    //             megseGomb.style.display = "inline";
    //             lepesVan = true;
    //             let movementY = Math.floor(index / 8);
    //             let movementX = ((index + 7) % 8) + 1;
    //             let segedLista1 = [index > 17 && (index + 7) % 8 != 0, index > 16 && index % 8 != 0, index > 10 && (index + 6) % 8 != 0 && (index + 7) % 8 != 0, index > 8 && index % 8 != 0 && (index + 1) % 8 != 0, index < 48 && index % 8 != 0, index < 49 && (index + 7) % 8 != 0, index < 57 && index % 8 != 0 && (index + 1) % 8 != 0, index < 57 && (index + 6) % 8 != 0 && (index + 7) % 8 != 0];
    //             let segedLista2 = [(movementX-1) + ((movementY-2)*8), (movementX+1) + ((movementY-2)*8), (movementX-2) + ((movementY-1)*8), (movementX+2) + ((movementY-1)*8), (movementX+1) + ((movementY+2)*8), (movementX-1) + ((movementY+2)*8), (movementX+2) + ((movementY-1)*8), (movementX-2) + ((movementY+1)*8)];
    //             for(let i = 0; i < 8; i++){
    //                 if(segedLista1[i]){
    //                     if((tabla[segedLista2[i]-1].includes("2") && szin == "feh")||(tabla[segedLista2[i]-1].includes("1") && szin == "fek")){
    //                         document.querySelector(`#s${segedLista2[i]}`).classList.add("utes");
    //                         document.querySelector(`#s${segedLista2[i]}`).addEventListener('click', () => {
    //                             LepesSeged(index, segedLista2[i]);
    //                         });
    //                     }
    //                     else if(tabla[segedLista2[i]-1] == "0"){
    //                         document.querySelector(`#s${segedLista2[i]}`).classList.add("lepes");
    //                         document.querySelector(`#s${segedLista2[i]}`).addEventListener('click', () => {
    //                             LepesSeged(index, segedLista2[i]);
    //                         });
    //                     }
    //                 }
    //             }
    //         }
    //     });
    // }

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

function FutoLep(index, szin){
    // if(szin == kiLep){
    //     document.querySelector(`#s${index}`).addEventListener('click', () => {
    //         megseGomb.style.display = "inline";
    //         lepesVan = true;
    //         let movementY = Math.floor(index / 8);
    //         let movementX = ((index + 7) % 8) + 1;
    //         let direction = 1;
    //         let dircetions = [true, true, true, true];
    //         for (let i = 0; i < 4; i++) {
    //             while(dircetions[i]){
    //                 let segedLista2 = [(movementX-direction) + ((movementY-direction)*8)-1,(movementX+direction) + ((movementY-direction)*8)-1,(movementX-direction) + ((movementY+direction)*8)-1,(movementX+direction) + ((movementY+direction)*8)-1];
    //                 let segedLista3 = [segedLista2[i] < 0 || (segedLista2[i] + 1) % 8 == 0,segedLista2[i] < 0 || (segedLista2[i] + 8) % 8 == 0,segedLista2[i] > 63 || (segedLista2[i]+1) % 8 == 0,segedLista2[i] < 0 || (segedLista2[i] + 1) % 8 == 0];
    //                 if(segedLista3[i]) dircetions[i] = false;
    //                 else if(tabla[segedLista2[i]] == "0"){
    //                     document.querySelector(`#s${segedLista2[i] + 1}`).classList.add("lepes");
    //                     document.querySelector(`#s${segedLista2[i] + 1}`).addEventListener('click', () => {
    //                         LepesSeged(index, segedLista2[i] + 1);
    //                     });
    //                 }
    //                 else if((tabla[segedLista2[i]].includes("2") && szin == "feh")||(tabla[segedLista2[i]].includes("1") && szin == "fek")){
    //                     document.querySelector(`#s${segedLista2[i] + 1}`).classList.add("utes");
    //                     document.querySelector(`#s${segedLista2[i] + 1}`).addEventListener('click', () => {
    //                         LepesSeged(index, segedLista2[i] + 1);
    //                     });
    //                     dircetions[i] = false;
    //                 }
    //                 else dircetions[i] = false;
    //                 direction++;
    //             }
    //             direction = 1;
    //         }
    //     });
    // }
    if(szin == kiLep){
        document.querySelector(`#s${index}`).addEventListener('click', () => {
            megseGomb.style.display = "inline";
            lepesVan = true;
            let direction = 1;
            let directions = [true, true, true, true];
            for (let i = 0; i < 4; i++) {
                while(directions[i]){
                    let segedLista2 = [(index-1) - (direction*9),(index-1) - (direction*7),(index-1) + (direction*9),(index-1) + (direction*7)];
                    let segedLista3 = [segedLista2[i] < 0 || (segedLista2[i] + 1) % 8 == 0,segedLista2[i] < 0 || (segedLista2[i] + 8) % 8 == 0,segedLista2[i] > 63 || (segedLista2[i] + 8) % 8 == 0,segedLista2[i] < 0 || (segedLista2[i] + 1) % 8 == 0];
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

function ParasztCheck(index, szin, tabla){
    let vissza = false;
    if(szin == "fek"){
        if(index > 8){
            if((index + 7) % 8 != 0){
                document.querySelector(`#s${index - 9}`).classList.add("sakkCheck");
                if(tabla[index - 10] == "k2") vissza = true;
            }
            if(index % 8 != 0){
                document.querySelector(`#s${index - 7}`).classList.add("sakkCheck");
                if(tabla[index - 8] == "k2") vissza = true;
            }
        }
    }
    if(szin == "feh"){
        if(index < 57){
            if(index % 8 != 0){
                document.querySelector(`#s${index + 9}`).classList.add("sakkCheck");
                if(tabla[index + 8] == "k1") vissza = true;
            }
            if((index + 7) % 8 != 0){
                document.querySelector(`#s${index + 7}`).classList.add("sakkCheck");
                if(tabla[index + 6] == "k1") vissza = true;
            }
        }
    }
    return vissza;
}

function BastyaCheck(index, szin, tabla){
    let vissza = false;
    let seged = 1;
    let segedLista1 = [true, true, true, true];
    for (let i = 0; i < 4; i++) {
        while(segedLista1[i]){
            let segedLista2 = [(index-1) - (seged*8), (index-1) + (seged*8), (index-1) - (seged), (index-1) + (seged)];
            let segedLista3 = [segedLista2[0] < 0, segedLista2[1] > 63, (segedLista2[2]+1) % 8 == 0, (segedLista2[3]+8) % 8 == 0];
            if(segedLista3[i]) segedLista1[i] = false;
            else if(tabla[segedLista2[i]] == "0" || tabla[segedLista2[i]] == "k1" || tabla[segedLista2[i]] == "k2"){
                document.querySelector(`#s${segedLista2[i] + 1}`).classList.add("sakkCheck");
                if((tabla[segedLista2[i]] == "k2" && szin == "fek")||(tabla[segedLista2[i]] == "k1" && szin == "feh")) vissza = true;
            }
            else segedLista1[i] = false;
            seged++;
        }
        seged = 1;
    }
    return vissza;
}

function LoCheck(index, szin, tabla){
    let vissza = false;
    let segedLista1 = [index > 17 && (index + 7) % 8 != 0, index > 16 && index % 8 != 0, index > 10 && (index + 6) % 8 != 0 && (index + 7) % 8 != 0, index > 8 && index % 8 != 0 && (index + 1) % 8 != 0, index < 48 && index % 8 != 0, index < 49 && (index + 7) % 8 != 0, index < 57 && index % 8 != 0 && (index + 1) % 8 != 0, index < 57 && (index + 6) % 8 != 0 && (index + 7) % 8 != 0];
    let segedLista2 = [index - 17, index - 15, index - 10, index - 6, index + 17, index + 15, index + 10, index + 6];
    for(let i = 0; i < 8; i++){
        if(segedLista1[i]){
            if(tabla[segedLista2[i]-1] == "0" || tabla[segedLista2[i]-1] == "k1" || tabla[segedLista2[i]-1] == "k2"){
                document.querySelector(`#s${segedLista2[i]}`).classList.add("sakkCheck");
                if((tabla[segedLista2[i]-1] == "k2" && szin == "fek")||(tabla[segedLista2[i]-1] == "k1" && szin == "feh")) vissza = true;
            }
        }
    }
    return vissza;
}

function FutoCheck(index, szin, tabla){
    let vissza = false;
    let seged = 1;
    let segedLista1 = [true, true, true, true];
    for (let i = 0; i < 4; i++) {
        while(segedLista1[i]){
            let segedLista2 = [(index-1) - (seged*9),(index-1) - (seged*7),(index-1) + (seged*9),(index-1) + (seged*7)];
            let segedLista3 = [segedLista2[i] < 0 || (segedLista2[i] + 1) % 8 == 0,segedLista2[i] < 0 || (segedLista2[i] + 8) % 8 == 0,segedLista2[i] > 63 || (segedLista2[i] + 8) % 8 == 0,segedLista2[i] < 0 || (segedLista2[i] + 1) % 8 == 0];
            if(segedLista3[i]) segedLista1[i] = false;
            else if(tabla[segedLista2[i]] == "0" || tabla[segedLista2[i]] == "k1" || tabla[segedLista2[i]] == "k2"){
                document.querySelector(`#s${segedLista2[i] + 1}`).classList.add("sakkCheck");
                if((tabla[segedLista2[i]] == "k2" && szin == "fek")||(tabla[segedLista2[i]] == "k1" && szin == "feh")) vissza = true;
            }
            else segedLista1[i] = false;
            seged++;
        }
        seged = 1;
    }
    return vissza;
}

function KnCheck(index, szin, tabla){
    let vissza = false;
    if(BastyaCheck(index, szin, tabla)) vissza = true;
    if(FutoCheck(index, szin, tabla)) vissza = true;
    return vissza;
}

TablaCsinal();