function hitungBesarVektor() {
    const x = parseFloat(document.getElementById('vektorX').value);
    const y = parseFloat(document.getElementById('vektorY').value);
    const z = parseFloat(document.getElementById('vektorZ').value) || 0;
    
    if (isNaN(x) || isNaN(y) || isNaN(z)) {
        document.getElementById('hasilBesarVektor').innerText = "Mohon isi semua nilai dengan benar";
        return;
    }

    const besar = Math.sqrt(x*x + y*y + z*z);
    document.getElementById('hasilBesarVektor').innerText = 
        `Besar vektor = ${besar.toFixed(2)}`;
}

function hitungPenjumlahanVektor() {
    const ax = parseFloat(document.getElementById('vektorAX').value);
    const ay = parseFloat(document.getElementById('vektorAY').value);
    const az = parseFloat(document.getElementById('vektorAZ').value) || 0;
    const bx = parseFloat(document.getElementById('vektorBX').value);
    const by = parseFloat(document.getElementById('vektorBY').value);
    const bz = parseFloat(document.getElementById('vektorBZ').value) || 0;
    
    if (isNaN(ax) || isNaN(ay) || isNaN(az) || isNaN(bx) || isNaN(by) || isNaN(bz)) {
        document.getElementById('hasilPenjumlahanVektor').innerText = "Mohon isi semua nilai dengan benar";
        return;
    }

    const rx = ax + bx;
    const ry = ay + by;
    const rz = az + bz;
    const besar = Math.sqrt(rx*rx + ry*ry + rz*rz);

    document.getElementById('hasilPenjumlahanVektor').innerText = 
        `Resultan vektor = (${rx.toFixed(2)}, ${ry.toFixed(2)}, ${rz.toFixed(2)})\n` +
        `Besar resultan = ${besar.toFixed(2)}`;
}

function hitungDotProduct() {
    const ax = parseFloat(document.getElementById('dotAX').value);
    const ay = parseFloat(document.getElementById('dotAY').value);
    const az = parseFloat(document.getElementById('dotAZ').value) || 0;
    const bx = parseFloat(document.getElementById('dotBX').value);
    const by = parseFloat(document.getElementById('dotBY').value);
    const bz = parseFloat(document.getElementById('dotBZ').value) || 0;
    
    if (isNaN(ax) || isNaN(ay) || isNaN(az) || isNaN(bx) || isNaN(by) || isNaN(bz)) {
        document.getElementById('hasilDotProduct').innerText = "Mohon isi semua nilai dengan benar";
        return;
    }

    const dotProduct = ax*bx + ay*by + az*bz;
    const besarA = Math.sqrt(ax*ax + ay*ay + az*az);
    const besarB = Math.sqrt(bx*bx + by*by + bz*bz);
    const sudut = Math.acos(dotProduct / (besarA * besarB)) * (180 / Math.PI);

    document.getElementById('hasilDotProduct').innerText = 
        `A • B = ${dotProduct.toFixed(2)}\n` +
        `Sudut antara vektor = ${sudut.toFixed(2)}°`;
}

function hitungCrossProduct() {
    const ax = parseFloat(document.getElementById('crossAX').value);
    const ay = parseFloat(document.getElementById('crossAY').value);
    const az = parseFloat(document.getElementById('crossAZ').value);
    const bx = parseFloat(document.getElementById('crossBX').value);
    const by = parseFloat(document.getElementById('crossBY').value);
    const bz = parseFloat(document.getElementById('crossBZ').value);
    
    if (isNaN(ax) || isNaN(ay) || isNaN(az) || isNaN(bx) || isNaN(by) || isNaN(bz)) {
        document.getElementById('hasilCrossProduct').innerText = "Mohon isi semua nilai dengan benar";
        return;
    }

    const rx = ay*bz - az*by;
    const ry = az*bx - ax*bz;
    const rz = ax*by - ay*bx;
    const besar = Math.sqrt(rx*rx + ry*ry + rz*rz);

    document.getElementById('hasilCrossProduct').innerText = 
        `A × B = (${rx.toFixed(2)}, ${ry.toFixed(2)}, ${rz.toFixed(2)})\n` +
        `Besar hasil cross product = ${besar.toFixed(2)}`;
}
