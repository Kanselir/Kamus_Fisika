function hitungCepatRambat() {
    const lambda = parseFloat(document.getElementById('lambda').value);
    const frekuensi = parseFloat(document.getElementById('frekuensi').value);
    
    if (isNaN(lambda) || isNaN(frekuensi) || lambda <= 0 || frekuensi <= 0) {
        document.getElementById('hasilCepatRambat').innerText = "Masukkan nilai yang valid (harus positif)";
        return;
    }

    const cepatRambat = lambda * frekuensi;
    document.getElementById('hasilCepatRambat').innerText = 
        `Cepat rambat gelombang (v) = ${cepatRambat.toFixed(2)} m/s`;
}

function hitungFrekuensi() {
    const periode = parseFloat(document.getElementById('periode').value);
    
    if (isNaN(periode) || periode <= 0) {
        document.getElementById('hasilFrekuensi').innerText = "Masukkan nilai periode yang valid (harus positif)";
        return;
    }

    const frekuensi = 1 / periode;
    document.getElementById('hasilFrekuensi').innerText = 
        `Frekuensi gelombang (f) = ${frekuensi.toFixed(2)} Hz`;
}

function hitungPanjangGelombang() {
    const v = parseFloat(document.getElementById('cepatRambat').value);
    const f = parseFloat(document.getElementById('frekuensiLambda').value);
    
    if (isNaN(v) || isNaN(f) || v <= 0 || f <= 0) {
        document.getElementById('hasilPanjangGelombang').innerText = "Masukkan nilai yang valid (harus positif)";
        return;
    }

    const lambda = v / f;
    document.getElementById('hasilPanjangGelombang').innerText = 
        `Panjang gelombang (λ) = ${lambda.toFixed(2)} m`;
}

function hitungPeriode() {
    const frekuensi = parseFloat(document.getElementById('frekuensiPeriode').value);
    
    if (isNaN(frekuensi) || frekuensi <= 0) {
        document.getElementById('hasilPeriode').innerText = "Masukkan nilai frekuensi yang valid (harus positif)";
        return;
    }

    const periode = 1 / frekuensi;
    document.getElementById('hasilPeriode').innerText = 
        `Periode gelombang (T) = ${periode.toFixed(2)} s`;
}

function hitungSimpangan() {
    const A = parseFloat(document.getElementById('amplitudo').value);
    const f = parseFloat(document.getElementById('frekuensiGelombang').value);
    const t = parseFloat(document.getElementById('waktu').value);
    const x = parseFloat(document.getElementById('jarak').value);
    const lambda = parseFloat(document.getElementById('panjangGelombang').value);
    
    if (isNaN(A) || isNaN(f) || isNaN(t) || isNaN(x) || isNaN(lambda) || 
        A <= 0 || f <= 0 || lambda <= 0) {
        document.getElementById('hasilSimpangan').innerText = "Masukkan nilai yang valid (amplitudo, frekuensi, dan panjang gelombang harus positif)";
        return;
    }

    const y = A * Math.sin(2 * Math.PI * f * t - 2 * Math.PI * x / lambda);
    
    document.getElementById('hasilSimpangan').innerText = 
        `Simpangan gelombang (y) = ${y.toFixed(2)} m\n` +
        `Amplitudo (A) = ${A.toFixed(2)} m\n` +
        `Frekuensi (f) = ${f.toFixed(2)} Hz\n` +
        `Panjang gelombang (λ) = ${lambda.toFixed(2)} m`;
}