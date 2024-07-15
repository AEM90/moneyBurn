document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
document.getElementById('updateButton').addEventListener('click', updateCSV, false);

let sessionData = [];

function handleFileSelect(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const contents = e.target.result;
        sessionData = csvToJson(contents);
    };
    reader.readAsText(file);
}

function csvToJson(csv) {
    const lines = csv.split("\n");
    const result = [];
    const headers = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentline = lines[i].split(",");

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return result;
}

function jsonToCsv(json) {
    const header = Object.keys(json[0]).join(",") + "\n";
    const rows = json.map(row => Object.values(row).join(",")).join("\n");
    return header + rows;
}

// Beispiel für das Hinzufügen neuer Sitzungsdaten
function addNewSessionData() {
    const newSession = { 
        sessionId: '4', 
        userId: '101', 
        startTime: '2023-06-21T12:00:00Z', 
        endTime: '2023-06-21T12:30:00Z', 
        pagesVisited: 4 
    };
    sessionData.push(newSession);
}

function updateCSV() {
    addNewSessionData();
    const csvContent = jsonToCsv(sessionData);
    downloadCSV(csvContent, 'updated_website_sessions.csv');
}

function downloadCSV(csvContent, filename) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
