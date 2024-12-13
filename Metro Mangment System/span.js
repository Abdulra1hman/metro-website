
const metroLines = {
    "Line1": ["Giza", "Sadat", "Shohadaa", "Attaba", "Shubra"],
    "Line2": ["Adly Mansour", "Attaba", "Rod Elfarag", "Naser"],
    "Line3": ["Helwan", "Sadat", "Shohadaa", "El Marg", "Naser"]
};

document.getElementById("journeyForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const fromStation = document.getElementById("fromStation").value;
    const toStation = document.getElementById("toStation").value;

    if (!isStationValid(fromStation) || !isStationValid(toStation)) {
        alert("Invalid station(s). Please try again.");
        return;
    }

    const transferStations = findTransferStations(fromStation, toStation);

    if (transferStations.length === 0) {
        alert("No route found.");
        return;
    }

    const price = calculatePrice(transferStations.length);
    const time = calculateTime(transferStations.length);

    document.getElementById("transferStations").textContent = transferStations.join(" -> ");
    document.getElementById("estimatedPrice").textContent = `Estimated Price: ${price} EGP`;
    document.getElementById("estimatedTime").textContent = `Estimated Time: ${time} minutes`;

    document.getElementById("result").style.display = "block";
});

function isStationValid(station) {
    for (let line in metroLines) {
        if (metroLines[line].includes(station)) return true;
    }
    return false;
}

function findTransferStations(current, destination) {
    let transferStations = [];

    for (let line in metroLines) {
        if (metroLines[line].includes(current) && metroLines[line].includes(destination)) {
            transferStations.push(current, destination);
            return transferStations;
        }
    }

    for (let line1 in metroLines) {
        if (metroLines[line1].includes(current)) {
            for (let line2 in metroLines) {
                if (metroLines[line2].includes(destination)) {
                    for (let transferStation of metroLines[line1]) {
                        if (metroLines[line2].includes(transferStation)) {
                            transferStations.push(transferStation);
                            return transferStations;
                        }
                    }
                }
            }
        }
    }

    return transferStations;
}

function calculatePrice(numberOfStations) {
    return (5.0 + (numberOfStations - 1) * 2.0).toFixed(2);
}

function calculateTime(numberOfStations) {
    return (numberOfStations * 3.5).toFixed(2);
}
