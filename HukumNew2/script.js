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

function hitung() {
    const massa = parseFloat(document.getElementById('m').value);
    const percepatan = parseFloat(document.getElementById('a').value);
    const gaya = parseFloat(document.getElementById('F').value);

    let hasil = "";
    
    if (!isNaN(massa) && !isNaN(percepatan) && isNaN(gaya)) {
        // Hitung gaya jika massa dan percepatan terisi
        const F = massa * percepatan;
        hasil = `Gaya (F): ${F}`;
    } else if (!isNaN(gaya) && !isNaN(percepatan) && isNaN(massa)) {
        // Hitung massa jika gaya dan percepatan terisi
        if (percepatan !== 0) {
            const m = gaya / percepatan;
            hasil = `Massa (m): ${m}`;
        } else {
            hasil = "Percepatan tidak boleh nol";
        }
    } else if (!isNaN(gaya) && !isNaN(massa) && isNaN(percepatan)) {
        // Hitung percepatan jika gaya dan massa terisi
        if (massa !== 0) {
            const a = gaya / massa;
            hasil = `Percepatan (a): ${a}`;
        } else {
            hasil = "Massa tidak boleh nol";
        }
    } else {
        hasil = "Isi dua dari tiga nilai (massa, percepatan, atau gaya) untuk menghitung.";
    }

    document.getElementById('hasil').innerText = hasil;
}
