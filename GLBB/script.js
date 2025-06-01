function hitungKecepatanAkhir() {
    const v0 = parseFloat(document.getElementById('v0').value);
    const a = parseFloat(document.getElementById('a').value);
    const t = parseFloat(document.getElementById('t').value);
    const hasil = v0 + (a * t);
    document.getElementById('kecepatanAkhirResult').innerText = `Kecepatan Akhir: ${hasil.toFixed(2)} m/s`;
}

function hitungJarak() {
    const v0 = parseFloat(document.getElementById('v0J').value);
    const a = parseFloat(document.getElementById('aJ').value);
    const t = parseFloat(document.getElementById('tJ').value);
    const hasil = (v0 * t) + (0.5 * a * Math.pow(t, 2));
    document.getElementById('jarakResult').innerText = `Jarak: ${hasil.toFixed(2)} meter`;
}

function hitungKecepatanAkhirTanpaWaktu() {
    const v0 = parseFloat(document.getElementById('v0K').value);
    const a = parseFloat(document.getElementById('aK').value);
    const s = parseFloat(document.getElementById('sK').value);
    const hasil = Math.sqrt(Math.pow(v0, 2) + (2 * a * s));
    document.getElementById('kecepatanAkhirTanpaWaktuResult').innerText = `Kecepatan Akhir: ${hasil.toFixed(2)} m/s`;
}

function hitungPerpindahan() {
    const v0 = parseFloat(document.getElementById('v0P').value);
    const a = parseFloat(document.getElementById('aP').value);
    const t = parseFloat(document.getElementById('tP').value);
    const hasil = (v0 * t) + (0.5 * a * Math.pow(t, 2));
    document.getElementById('perpindahanResult').innerText = `Perpindahan: ${hasil.toFixed(2)} meter`;
}
