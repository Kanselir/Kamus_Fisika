function addjarak() {
    const V = parseFloat(document.getElementById('V').value);
    const t = parseFloat(document.getElementById('t').value);
    const hasil = V * t
    document.getElementById('addResult').innerText = `Jarak: ${hasil} meter`;
}

function perpindahan() {
    const X = parseFloat(document.getElementById('Vp').value);
    const Y = parseFloat(document.getElementById('tp').value);
    const result = (X ** 2) - (Y ** 2);
    const R = result ** (1/2);
    document.getElementById('subResult').innerText = `Resultat: rumus perpindahan susah saya kurang bisa menjelaskannya`;
}

function kecepatatan() {
    const P = parseFloat(document.getElementById('PK').value);
    const W = parseFloat(document.getElementById('WK').value);
    const hasil = P / W;
    document.getElementById('kecepatanResult').innerText = `kecepatan: ${hasil.toFixed(3)}`;
}

function laju() {
    const J = parseFloat(document.getElementById('JL').value);
    const W = parseFloat(document.getElementById('WL').value);
    const hasil = J / W;
    document.getElementById('lajuResult').innerText = `laju: ${hasil.toFixed(3)}`;
}
