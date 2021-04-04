const toasts = document.getElementById("toasts");

function createNotification(message, type) {
    const notif = document.createElement('div');
    notif.classList.add('toast');
    notif.classList.add('fade-in');
    notif.classList.add(type);
    notif.innerHTML = message;

    toasts.appendChild(notif);

    setTimeout(() => {
        notif.classList.remove('fade-in');
        notif.classList.add('fade-away');
        setTimeout(() => {
            notif.remove();
        }, 500);
    }, 2000);
}