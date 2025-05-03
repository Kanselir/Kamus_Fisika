function hukumnw() {
    const A = document.getElementById('F').value;
    const B = document.getElementById('F1').value;
    const arrA = A.split(",").map(lol => parseInt(lol.trim()));
    const arrB = B.split(",").map(lol => parseInt(lol.trim()));
    let sumA = 0;
    let sumB = 0;
    for (let i = 0; i < arrA.length; i++){
        sumA += arrA[i];
    };
    for (let i = 0; i < arrB.length; i++){
        sumB += arrB[i];
    };
    const hasil = (sumA - sumB) * -1;
    document.getElementById('Hasil').innerText = `hasil: ${hasil}`;
}

function hitungKomponenGaya() {
    const F = parseFloat(document.getElementById('Fa').value);  // besar gaya (F)
    const Fx = parseFloat(document.getElementById('Fx').value);  // komponen gaya sumbu-x (Fx)
    const Fy = parseFloat(document.getElementById('Fy').value);  // komponen gaya sumbu-y (Fy)
    const theta = parseFloat(document.getElementById('theta').value);  // sudut (θ)

    let sigmaFx = Fx;
    let sigmaFy = Fy;
    let gayaF = F;
    let sudutTheta = theta;

    if (!isNaN(gayaF) && !isNaN(sudutTheta) && isNaN(sigmaFx) && isNaN(sigmaFy)) {
        // Jika F dan theta diisi, hitung Fx dan Fy
        const thetaRad = sudutTheta * (Math.PI / 180);  // Konversi ke radian
        sigmaFx = gayaF * Math.cos(thetaRad);
        sigmaFy = gayaF * Math.sin(thetaRad);
    } else if (!isNaN(sigmaFx) && !isNaN(sigmaFy) && isNaN(gayaF) && isNaN(sudutTheta)) {
        // Jika Fx dan Fy diisi, hitung F dan theta
        gayaF = Math.sqrt(sigmaFx * sigmaFx + sigmaFy * sigmaFy);  // F = sqrt(Fx^2 + Fy^2)
        sudutTheta = Math.atan2(sigmaFy, sigmaFx) * (180 / Math.PI);  // θ = atan2(Fy, Fx), konversi ke derajat
    } else if (!isNaN(gayaF) && !isNaN(sigmaFx) && isNaN(sigmaFy) && isNaN(sudutTheta)) {
        // Jika F dan Fx diisi, hitung Fy dan theta
        sigmaFy = Math.sqrt(gayaF * gayaF - sigmaFx * sigmaFx);  // Fy = sqrt(F^2 - Fx^2)
        sudutTheta = Math.atan2(sigmaFy, sigmaFx) * (180 / Math.PI);  // θ = atan2(Fy, Fx)
    } else if (!isNaN(gayaF) && !isNaN(sigmaFy) && isNaN(sigmaFx) && isNaN(sudutTheta)) {
        // Jika F dan Fy diisi, hitung Fx dan theta
        sigmaFx = Math.sqrt(gayaF * gayaF - sigmaFy * sigmaFy);  // Fx = sqrt(F^2 - Fy^2)
        sudutTheta = Math.atan2(sigmaFy, sigmaFx) * (180 / Math.PI);  // θ = atan2(Fy, Fx)
    } else {
        // Jika input tidak valid atau kombinasi input salah
        document.getElementById('hasil').innerText = "Input tidak valid atau kombinasi input salah. Isi dua nilai untuk menghitung yang lainnya.";
        return;
    }

    // Tampilkan hasil
    document.getElementById('hasil').innerText = 
        `ΣFx: ${sigmaFx.toFixed(2)} N\nΣFy: ${sigmaFy.toFixed(2)} N\nF: ${gayaF.toFixed(2)} N\nSudut θ: ${sudutTheta.toFixed(2)}°`;
}
