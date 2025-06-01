function addjarak() {
    const v = parseFloat(document.getElementById('V').value);
    const t = parseFloat(document.getElementById('t').value);
    const hasil = v * t;
    document.getElementById('addResult').innerText = `Jarak: ${hasil.toFixed(2)} meter`;
}

function perpindahan() {
    const x1 = parseFloat(document.getElementById('Vp').value);
    const x2 = parseFloat(document.getElementById('tp').value);
    const hasil = x2 - x1;
    document.getElementById('subResult').innerText = `Perpindahan: ${hasil.toFixed(2)} meter`;
}

function kecepatatan() {
    const s = parseFloat(document.getElementById('PK').value);
    const t = parseFloat(document.getElementById('WK').value);
    const hasil = s / t;
    document.getElementById('kecepatanResult').innerText = `Kecepatan: ${hasil.toFixed(2)} m/s`;
}

function laju() {
    const s = parseFloat(document.getElementById('JL').value);
    const t = parseFloat(document.getElementById('WL').value);
    const hasil = s / t;
    document.getElementById('lajuResult').innerText = `Laju: ${hasil.toFixed(2)} m/s`;
}
