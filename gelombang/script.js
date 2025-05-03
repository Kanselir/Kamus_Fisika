function hitungCepatRambat() {
    const lambda = parseFloat(document.getElementById('F').value);
    const periode = parseFloat(document.getElementById('F1').value);
    
    if (isNaN(lambda) || isNaN(periode)) {
        document.getElementById('Hasil').innerText = "Masukkan nilai yang valid";
        return;
    }

    const cepatRambat = lambda / periode;
    document.getElementById('Hasil').innerText = `Cepat rambat gelombang: ${cepatRambat.toFixed(2)} m/s`;
}

function hitungFrekuensi() {
    const v = parseFloat(document.getElementById('Fa').value);
    const lambda = parseFloat(document.getElementById('Fx').value);
    const periode = parseFloat(document.getElementById('Fy').value);
    const amplitudo = parseFloat(document.getElementById('theta').value);

    if (isNaN(periode)) {
        document.getElementById('hasil').innerText = "Masukkan periode yang valid";
        return;
    }

    const frekuensi = 1 / periode;
    document.getElementById('hasil').innerText = `Frekuensi gelombang: ${frekuensi.toFixed(2)} Hz`;
}

function hitungPanjangGelombang() {
    const v = parseFloat(document.getElementById('v1').value);
    const T = parseFloat(document.getElementById('T1').value);

    if (isNaN(v) || isNaN(T)) {
        document.getElementById('hasilPanjang').innerText = "Masukkan nilai yang valid";
        return;
    }

    const lambda = v * T;
    document.getElementById('hasilPanjang').innerText = `Panjang gelombang: ${lambda.toFixed(2)} m`;
}

function hitungPeriode() {
    const lambda = parseFloat(document.getElementById('lambda1').value);
    const v = parseFloat(document.getElementById('v2').value);

    if (isNaN(lambda) || isNaN(v)) {
        document.getElementById('hasilPeriode').innerText = "Masukkan nilai yang valid";
        return;
    }

    const periode = lambda / v;
    document.getElementById('hasilPeriode').innerText = `Periode gelombang: ${periode.toFixed(2)} s`;
}

function hitungAmplitudo() {
    const ymax = parseFloat(document.getElementById('ymax').value);

    if (isNaN(ymax)) {
        document.getElementById('hasilAmplitudo').innerText = "Masukkan nilai yang valid";
        return;
    }

    const amplitudo = ymax;
    document.getElementById('hasilAmplitudo').innerText = `Amplitudo gelombang: ${amplitudo.toFixed(2)} m`;
}