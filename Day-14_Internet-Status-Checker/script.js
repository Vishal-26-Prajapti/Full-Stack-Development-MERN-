window.addEventListener("load", checkInternetConnection);
window.addEventListener("online", checkInternetConnection);
window.addEventListener("offline", checkInternetConnection);

function checkInternetConnection() {
    const statusText = document.getElementById("statusText");
    const ipAddressText = document.getElementById("ipAddressText");
    const networkStrengthText = document.getElementById("networkStrengthText");
    const indicator = document.getElementById("indicator");

    statusText.textContent = "Checking...";
    statusText.className = "status-text";

    if (navigator.onLine) {
        fetch("https://api.ipify.org/?format=json")
            .then((res) => res.json())
            .then((data) => {
                statusText.textContent = "Connected";
                statusText.classList.add("online");

                indicator.className = "indicator online";

                ipAddressText.textContent = data.ip;

                const connection = navigator.connection;
                networkStrengthText.textContent = connection
                    ? `${connection.downlink} Mbps`
                    : "Unknown";
            })
            .catch(() => {
                showOffline();
            });
    } else {
        showOffline();
    }

    function showOffline() {
        statusText.textContent = "Disconnected";
        statusText.classList.add("offline");

        indicator.className = "indicator offline";

        ipAddressText.textContent = "-";
        networkStrengthText.textContent = "-";
    }
}