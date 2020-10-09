const SwRegister = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('../sw.js')
            .then(() => console.log('ServiceWorker Registered!'))
            .catch(() => console.log('ServiceWorker not Registered!'))
    }
}

export default SwRegister
