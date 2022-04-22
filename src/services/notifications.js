const isPushNotificationSupported = () => {
    return "serviceWorker" in navigator && "PushManager" in window;
}

const registerServiceWorker = () => {
    return navigator.serviceWorker.register("/sw.js");
}

const askUserPermission = async () => {
    return await Notification.requestPermission();
}