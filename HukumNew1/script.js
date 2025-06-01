// function hukumnw() {
//     const A = document.getElementById('F').value;
//     const B = document.getElementById('F1').value;
//     const arrA = A.split(",").map(lol => parseInt(lol.trim()));
//     const arrB = B.split(",").map(lol => parseInt(lol.trim()));
//     let sumA = 0;
//     let sumB = 0;
//     for (let i = 0; i < arrA.length; i++){
//         sumA += arrA[i];
//     };
//     for (let i = 0; i < arrB.length; i++){
//         sumB += arrB[i];
//     };
//     const hasil = (sumA - sumB) * -1;
//     document.getElementById('Hasil').innerText = `hasil: ${hasil}`;
// }

function hitungResultanGayaHorizontal() {
    const gayaKanan = parseFloat(document.getElementById('gayaKanan').value);
    const gayaKiri = parseFloat(document.getElementById('gayaKiri').value);
    
    if (isNaN(gayaKanan) || isNaN(gayaKiri)) {
        document.getElementById('hasilResultanGaya').innerText = "Mohon isi semua nilai dengan benar";
        return;
    }

    const resultan = gayaKanan - gayaKiri;
    let status = "";
    
    if (resultan === 0) {
        status = "Benda dalam keadaan seimbang (diam atau bergerak dengan kecepatan tetap)";
    } else if (resultan > 0) {
        status = "Benda akan bergerak ke kanan";
    } else {
        status = "Benda akan bergerak ke kiri";
    }

    document.getElementById('hasilResultanGaya').innerText = 
        `Resultan Gaya = ${resultan.toFixed(2)} N\n${status}`;
}

function hitungKomponenGaya() {
    const gaya = parseFloat(document.getElementById('gaya').value);
    const sudut = parseFloat(document.getElementById('sudut').value);
    
    if (isNaN(gaya) || isNaN(sudut)) {
        document.getElementById('hasilKomponenGaya').innerText = "Mohon isi semua nilai dengan benar";
        return;
    }

    const sudutRad = sudut * (Math.PI / 180);
    const Fx = gaya * Math.cos(sudutRad);
    const Fy = gaya * Math.sin(sudutRad);

    document.getElementById('hasilKomponenGaya').innerText = 
        `Komponen Gaya:\nFx = ${Fx.toFixed(2)} N\nFy = ${Fy.toFixed(2)} N`;
}

function hitungResultanDariKomponen() {
    const Fx = parseFloat(document.getElementById('gayaX').value);
    const Fy = parseFloat(document.getElementById('gayaY').value);
    
    if (isNaN(Fx) || isNaN(Fy)) {
        document.getElementById('hasilResultanDariKomponen').innerText = "Mohon isi semua nilai dengan benar";
        return;
    }

    const resultan = Math.sqrt(Fx * Fx + Fy * Fy);
    const sudut = Math.atan2(Fy, Fx) * (180 / Math.PI);
    let status = "";

    if (resultan === 0) {
        status = "Benda dalam keadaan seimbang (diam atau bergerak dengan kecepatan tetap)";
    } else {
        status = "Benda akan bergerak dengan resultan gaya " + resultan.toFixed(2) + " N";
    }

    document.getElementById('hasilResultanDariKomponen').innerText = 
        `Resultan Gaya = ${resultan.toFixed(2)} N\nSudut = ${sudut.toFixed(2)}°\n${status}`;
}
