function addVectors() {
    const X = parseFloat(document.getElementById('X').value);
    const Y = parseFloat(document.getElementById('Y').value);
    const result = (X ** 2) + (Y ** 2);
    const R = result ** (1/2);
    document.getElementById('addResult').innerText = `Resultat: ${R}`;
}

function subtractVectors() {
    const X = parseFloat(document.getElementById('B1').value);
    const Y = parseFloat(document.getElementById('B2').value);
    const result = (X ** 2) - (Y ** 2);
    const R = result ** (1/2);
    document.getElementById('subResult').innerText = `Resultat: ${R}`;
}

function sudutVectors() {
    const X = parseFloat(document.getElementById('C1').value);
    const Y = parseFloat(document.getElementById('C2').value);
    const S = parseFloat(document.getElementById('C3').value);
    const sudut = S * (Math.PI / 180);
    const cos = Math.cos(sudut);
    const cosPembulatan = cos.toFixed(3);
    const result = (X ** 2) + (Y ** 2) + (2 * X * Y * cosPembulatan);
    const hasil = result ** (1/2);
    document.getElementById('sudutResult').innerText = `Resultat: ${hasil}`;
}

function dotProduct() {
    const A = document.getElementById('D1').value;
    const B = document.getElementById('D2').value;
    const arrA = A.split(",").map(lol => parseInt(lol.trim()));
    const arrB = B.split(",").map(lol => parseInt(lol.trim()));
    if (arrA.length != 3) {
        document.getElementById('dotResult').innerText = `Koordinat 1 error`;
        return;
    }
    if (arrB.length != 3) {
        document.getElementById('dotResult').innerText = `Koordinat 1 error`;
        return;
    }
    const a1 = arrA[0];
    const a2 = arrA[1];
    const a3 = arrA[2];
    const b1 = arrB[0];
    const b2 = arrB[1];
    const b3 = arrB[2];
    document.getElementById('dotResult').innerText = `Resultan: ${(a1+b1)} , ${(a2+b2)} , ${(a3+b3)}`;
}

// function crossProduct() {
//     const D1 = parseFloat(document.getElementById('D1').value);
//     const D2 = parseFloat(document.getElementById('D2').value);
//     const result = D1 * D2; // Simplifikasi untuk 2D, untuk 3D perlu ditambahkan Z.
//     document.getElementById('crossResult').innerText = `Resultat: ${result}`;
// }
