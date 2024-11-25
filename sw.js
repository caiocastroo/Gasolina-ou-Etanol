/**
 * Service Worker
 * @author Caio Castro
 */

//Instalaçâo do Serviceworker
self.addEventListener('install', (event) => {
    console.log("Instalando o ServiceWorker....", event)
    //Pré carregamneto do cache
    event.waitUntil(
        //Armazenar em cache
        caches.open('static')
        .then((cache) => {
            console.log("Pré carregamento dos arquivos do app")
            cache.add('/etagas/')
            cache.add('/etagas/index.html')
            cache.add('/etagas/style.css')
            cache.add('/etagas/app.js')
            cache.add('/etagas/img/flex.png')
            cache.add('/etagas/img/calcflex.png')
            cache.add('/etagas/img/etanol.png')
            cache.add('/etagas/img/gasolina.png')
        })
    )
})

//Ativação do Service Worker
self.addEventListener('activate', (event) => {
    console.log("Ativando o ServiceWorker....", event)
    return self.clients.claim()
})

//Escutando requisiçôes "buscando algo"
self.addEventListener('fetch', (event) => {
    //console.log("Buscando algo....", event)
    //armazenar em cache(arquivos estaticos pré carregados) todas as requisiçôes
    event.respondWith(
        caches.match(event.request)
        .then((response)=>{
            if (response) {
                return response
                
            } else {
                return fetch(event.request)
                
            }
        })
    )
})