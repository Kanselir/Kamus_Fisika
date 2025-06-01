// function hitungGaya() {
//     const massa = parseFloat(document.getElementById('m').value);
//     const percepatan = parseFloat(document.getElementById('a').value);
    
//     if (isNaN(massa) || isNaN(percepatan)) {
//         document.getElementById('HasilF').innerText = "Input tidak valid";
//         return;
//     }

//     const gaya = massa * percepatan;
//     document.getElementById('HasilF').innerText = `Hasil: ${gaya}`;
// }

// function hitungMassa() {
//     const gaya = parseFloat(document.getElementById('F').value);
//     const percepatan = parseFloat(document.getElementById('a').value);
    
//     if (isNaN(gaya) || isNaN(percepatan) || percepatan === 0) {
//         document.getElementById('Hasilm').innerText = "Percepatan tidak boleh nol atau input tidak valid";
//         return;
//     }

//     const massa = gaya / percepatan;
//     document.getElementById('Hasilm').innerText = `Hasil: ${massa}`;
// }

// function hitungPercepatan() {
//     const gaya = parseFloat(document.getElementById('F').value);
//     const massa = parseFloat(document.getElementById('m').value);
    
//     if (isNaN(gaya) || isNaN(massa) || massa === 0) {
//         document.getElementById('Hasila').innerText = "Massa tidak boleh nol atau input tidak valid";
//         return;
//     }

//     const percepatan = gaya / massa;
//     document.getElementById('Hasila').innerText = `Hasil: ${percepatan}`;
// }

function hitungGaya() {
    const massa = parseFloat(document.getElementById('m1').value);
    const percepatan = parseFloat(document.getElementById('a1').value);
    
    if (isNaN(massa) || isNaN(percepatan)) {
        document.getElementById('hasilGaya').innerText = "Mohon isi semua nilai dengan benar";
        return;
    }

    const gaya = massa * percepatan;
    document.getElementById('hasilGaya').innerText = `Gaya (F) = ${gaya.toFixed(2)} Newton`;
}

function hitungMassa() {
    const gaya = parseFloat(document.getElementById('F2').value);
    const percepatan = parseFloat(document.getElementById('a2').value);
    
    if (isNaN(gaya) || isNaN(percepatan)) {
        document.getElementById('hasilMassa').innerText = "Mohon isi semua nilai dengan benar";
        return;
    }

    if (percepatan === 0) {
        document.getElementById('hasilMassa').innerText = "Percepatan tidak boleh nol";
        return;
    }

    const massa = gaya / percepatan;
    document.getElementById('hasilMassa').innerText = `Massa (m) = ${massa.toFixed(2)} kg`;
}

function hitungPercepatan() {
    const gaya = parseFloat(document.getElementById('F3').value);
    const massa = parseFloat(document.getElementById('m3').value);
    
    if (isNaN(gaya) || isNaN(massa)) {
        document.getElementById('hasilPercepatan').innerText = "Mohon isi semua nilai dengan benar";
        return;
    }

    if (massa === 0) {
        document.getElementById('hasilPercepatan').innerText = "Massa tidak boleh nol";
        return;
    }

    const percepatan = gaya / massa;
    document.getElementById('hasilPercepatan').innerText = `Percepatan (a) = ${percepatan.toFixed(2)} m/s²`;
}

// function hitung() {
//     const massa = parseFloat(document.getElementById('m').value);
//     const percepatan = parseFloat(document.getElementById('a').value);
//     const gaya = parseFloat(document.getElementById('F').value);

//     let hasil = "";
    
//     if (!isNaN(massa) && !isNaN(percepatan) && isNaN(gaya)) {
//         const F = massa * percepatan;
//         hasil = `Gaya (F): ${F}`;
//     } else if (!isNaN(gaya) && !isNaN(percepatan) && isNaN(massa)) {
//         if (percepatan !== 0) {
//             const m = gaya / percepatan;
//             hasil = `Massa (m): ${m}`;
//         } else {
//             hasil = "Percepatan tidak boleh nol";
//         }
//     } else if (!isNaN(gaya) && !isNaN(massa) && isNaN(percepatan)) {
//         // Hitung percepatan jika gaya dan massa terisi
//         if (massa !== 0) {
//             const a = gaya / massa;
//             hasil = `Percepatan (a): ${a}`;
//         } else {
//             hasil = "Massa tidak boleh nol";
//         }
//     } else {
//         hasil = "Isi dua dari tiga nilai (massa, percepatan, atau gaya) untuk menghitung.";
//     }

//     document.getElementById('hasil').innerText = hasil;
// }
