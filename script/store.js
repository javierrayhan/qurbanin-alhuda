// const sheetId = "1wKBb-g56ayR-vRK9QZ1K60jL7E-TsaADMnF0K7jne00";
// const sheetName = encodeURIComponent("Sheet1");
// const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

// fetch(sheetURL)
//   .then((response) => response.text())
//   .then((csvText) => handleResponse(csvText));

// function handleResponse(csvText) {
//   let sheetObjects = csvToObjects(csvText);
//   console.log(sheetObjects);

//   // Example: show total value of JAN P-1 for all names
//   let totalJanP1 = 0;
//   for (let row of sheetObjects) {
//     const val = parseFloat(row["JAN P-1"].replace(/\./g, "").replace(",", "."));
//     totalJanP1 += isNaN(val) ? 0 : val;
//   }

//   console.log("Total JAN P-1:", totalJanP1);
// }

// function csvToObjects(csv) {
//   const csvRows = csv.trim().split("\n");
//   const headers = csvSplit(csvRows[0]);

//   return csvRows.slice(1).map(row => {
//     const values = csvSplit(row);
//     const obj = {};
//     for (let i = 0; i < headers.length; i++) {
//       obj[headers[i]] = values[i] || "";
//     }
//     return obj;
//   });
// }

// // Correctly handles values with quotes and commas
// function csvSplit(row) {
//   const values = [];
//   let current = "";
//   let insideQuotes = false;

//   for (let i = 0; i < row.length; i++) {
//     const char = row[i];
//     if (char === '"') {
//       insideQuotes = !insideQuotes;
//     } else if (char === ',' && !insideQuotes) {
//       values.push(current);
//       current = "";
//     } else {
//       current += char;
//     }
//   }
//   values.push(current);
//   return values;
// }

// document.addEventListener('DOMContentLoaded', () => {
//     const user = JSON.parse(localStorage.getItem('currentUser'))
//     const nama = user.nama_lengkap || user.username
//     const namaFormatted = nama.charAt(0).toUpperCase() + nama.slice(1).toLowerCase()

//     if (!user) {
//         window.location.href = '/login.html' // Redirect kalau belum login
//     } else {
//         document.getElementById('welcome-msg').textContent =
//         `Assalamualaikum, ${ namaFormatted || user.username}!`
//     }
// })











// const sheetId = "1wKBb-g56ayR-vRK9QZ1K60jL7E-TsaADMnF0K7jne00";
// const sheetName = encodeURIComponent("Sheet1");
// const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

// document.addEventListener('DOMContentLoaded', () => {
//   const user = JSON.parse(localStorage.getItem('currentUser'));

//   if (!user) {
//     window.location.href = '/index.html';
//     return;
//   }

//   const nama = user.nama_lengkap || user.username;
//   const namaFormatted = nama.charAt(0).toUpperCase() + nama.slice(1).toLowerCase();
//   document.getElementById('welcome-msg').textContent = `Assalamualaikum, ${namaFormatted}!`;

//   fetch(sheetURL)
//     .then((response) => response.text())
//     .then((csvText) => handleResponse(csvText, user.username))
//     .catch(err => {
//       console.error("Error fetching sheet:", err);
//       document.getElementById('total-msg').textContent = "Gagal mengambil data.";
//     });
// });

// function handleResponse(csvText, username) {
//   let sheetObjects = csvToObjects(csvText);
//   console.log("All data:", sheetObjects);

//   const userData = sheetObjects.filter(row => row["Nama"]?.trim().toLowerCase() === username.toLowerCase());
//   console.log("Filtered user data:", userData);

//   if (userData.length === 0) {
//     document.getElementById('total-msg').textContent = "Data tidak ditemukan.";
//     return;
//   }

//   let total = 0;

//   for (let i = 0; i < userData.length; i++) {
//     const row = userData[i];
//     const val = parseIndoCurrency(row["TOTAL"]);
//     total += val;
//   }

//   const totalFormattedRaw = new Intl.NumberFormat('id-ID', {
//     style: 'currency',
//     currency: 'IDR',
//     minimumFractionDigits: 0
//   }).format(total);

//   const totalFormatted = totalFormattedRaw.replace(/^Rp/, 'Rp. ');
//   document.getElementById('total-msg').textContent = totalFormatted;

//   // ✅ Cari data tabungan terakhir berdasarkan baris terakhir
//   const lastRow = userData[userData.length - 1];
//   const lastSaving = getLastValidSaving(lastRow);
//   const lastFormatted = lastSaving.formatted.replace(/^Rp/, 'Rp. ');
//   const columnName = lastSaving.kolom ? ` (${lastSaving.kolom})` : "";

//   document.getElementById('last-saving-msg').textContent = `${lastFormatted}`;
// }

// function csvToObjects(csv) {
//   const csvRows = csv.trim().split("\n");
//   const headers = csvSplit(csvRows[0]);

//   return csvRows.slice(1).map(row => {
//     const values = csvSplit(row);
//     const obj = {};
//     for (let i = 0; i < headers.length; i++) {
//       obj[headers[i]] = values[i] || "";
//     }
//     return obj;
//   });
// }

// function csvSplit(row) {
//   const values = [];
//   let current = "";
//   let insideQuotes = false;

//   for (let i = 0; i < row.length; i++) {
//     const char = row[i];
//     if (char === '"') {
//       insideQuotes = !insideQuotes;
//     } else if (char === ',' && !insideQuotes) {
//       values.push(current);
//       current = "";
//     } else {
//       current += char;
//     }
//   }
//   values.push(current);
//   return values;
// }

// function parseIndoCurrency(value) {
//   if (!value) return 0;

//   const clean = value
//     .replace(/[^0-9,]/g, "")
//     .replace(/\./g, "")
//     .replace(",", ".");

//   const number = parseFloat(clean);
//   return isNaN(number) ? 0 : number;
// }

// function getLastValidSaving(userRow) {
//   const keys = Object.keys(userRow).filter(k => k !== "Nama" && k !== "TOTAL");

//   for (let i = keys.length - 1; i >= 0; i--) {
//     const value = userRow[keys[i]];
//     if (value && value !== "0,00") {
//       return {
//         kolom: keys[i],
//         nominal: parseIndoCurrency(value),
//         formatted: new Intl.NumberFormat('id-ID', {
//           style: 'currency',
//           currency: 'IDR',
//           minimumFractionDigits: 0
//         }).format(parseIndoCurrency(value))
//       };
//     }
//   }

//   return {
//     kolom: null,
//     nominal: 0,
//     formatted: "Rp. 0"
//   };
// }

let userData = [];

const sheetId = "1wKBb-g56ayR-vRK9QZ1K60jL7E-TsaADMnF0K7jne00";
const sheetName = encodeURIComponent("Sheet1");
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const showAllLink = document.getElementById("show-all");

    if (!user) {
        window.location.href = '/index.html';
        return;
    }

    fetch(sheetURL)
        .then((response) => response.text())
        .then((csvText) => handleResponse(csvText, user.username))
        .catch(err => {
            console.error("Error fetching sheet:", err);
            document.getElementById('total-msg').textContent = "Gagal mengambil data.";
        });

    if (showAllLink) {
  }
});

function handleResponse(csvText, username) {
    let sheetObjects = csvToObjects(csvText);
    console.log("All data:", sheetObjects);

    userData = sheetObjects.filter(row => row["Nama"]?.trim().toLowerCase() === username.toLowerCase());
    console.log("Filtered user data:", userData);

    if (userData.length === 0) {
        document.getElementById('total-msg').textContent = "Rp. NO DATA";
        return;
    }

    let total = 0;
    for (let i = 0; i < userData.length; i++) {
        const row = userData[i];
        const val = parseIndoCurrency(row["TOTAL"]);
        total += val;
    }

    const totalFormattedRaw = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(total);

    const totalFormatted = totalFormattedRaw.replace(/^Rp/, 'Rp');
    document.getElementById('total-msg').textContent = totalFormatted;

    const lastRow = userData[userData.length - 1];
    const lastSaving = getLastValidSaving(lastRow);
}

function csvToObjects(csv) {
    const csvRows = csv.trim().split("\n");
    const headers = csvSplit(csvRows[0]);

    return csvRows.slice(1).map(row => {
        const values = csvSplit(row);
        const obj = {};
        for (let i = 0; i < headers.length; i++) {
            obj[headers[i]] = values[i] || "";
        }
        return obj;
    });
}

function csvSplit(row) {
    const values = [];
    let current = "";
    let insideQuotes = false;

    for (let i = 0; i < row.length; i++) {
        const char = row[i];
        if (char === '"') {
            insideQuotes = !insideQuotes;
        } else if (char === ',' && !insideQuotes) {
            values.push(current);
            current = "";
        } else {
            current += char;
        }
    }
    values.push(current);
    return values;
}

function parseIndoCurrency(value) {
    if (!value) return 0;

    const clean = value
        .replace(/[^0-9,]/g, "")
        .replace(/\./g, "")
        .replace(",", ".");

    const number = parseFloat(clean);
    return isNaN(number) ? 0 : number;
}

function getLastValidSaving(userRow) {
    const keys = Object.keys(userRow).filter(k => k !== "Nama" && k !== "TOTAL");

    for (let i = keys.length - 1; i >= 0; i--) {
        const value = userRow[keys[i]];
        if (value && value !== "0,00") {
            return {
                kolom: keys[i],
                nominal: parseIndoCurrency(value),
                formatted: new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0
                }).format(parseIndoCurrency(value))
            };
        }
    }

    return {
        kolom: null,
        nominal: 0,
        formatted: "Rp. 0"
    };
}

