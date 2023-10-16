const alertForm = document.getElementById('alert-form');
const medicineNameInput = document.getElementById('medicine-name');
const minStockInput = document.getElementById('min-stock');
const expiryDateInput = document.getElementById('expiry-date');
const notificationMethodInput = document.getElementById('notification-method');
const alertList = document.getElementById('alert-list');

const alerts = []; // Almacenar alertas configuradas (simulado)

alertForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const medicineName = medicineNameInput.value;
    const minStock = parseInt(minStockInput.value);
    const expiryDate = parseInt(expiryDateInput.value);
    const notificationMethod = notificationMethodInput.value;

    // Validar y almacenar la alerta configurada
    if (medicineName && !isNaN(minStock) && !isNaN(expiryDate)) {
        alerts.push({ medicineName, minStock, expiryDate, notificationMethod });
        displayAlerts();
        alertForm.reset();
    }
});

function displayAlerts() {
    alertList.innerHTML = '';
    alerts.forEach((alert, index) => {
        const alertItem = document.createElement('li');
        alertItem.innerHTML = `
            Medicamento: ${alert.medicineName}<br>
            Cantidad Mínima en Stock: ${alert.minStock}<br>
            Fecha de Vencimiento Cercana: ${alert.expiryDate} días<br>
            Método de Notificación: ${alert.notificationMethod}<br>
        `;
        alertList.appendChild(alertItem);
    });
}
