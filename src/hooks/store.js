// Array che memorizza i provider dei wallet rilevati e i loro dettagli.
let providers = [];

// Oggetto che contiene due metodi. Lo store tiene traccia dello stato dei provider Ethereum rilevati.
// È implementato come uno store esterno, rendendolo disponibile per la sottoscrizione e la sincronizzazione
// nell'intera dapp.
export const store = {
  // Ritorna lo stato attuale dei provider.
  value: () => providers,
  // Si iscrive agli annunci dei provider e aggiorna lo store di conseguenza.
  // Accetta una funzione di callback da invocare su ogni aggiornamento dello store, restituendo una funzione per
  // annullare la sottoscrizione dall'evento.
  subscribe: (callback) => {
    function onAnnouncement(event) {
      if (providers.map(p => p.info.uuid).includes(event.detail.info.uuid)) return;
      providers = [...providers, event.detail];
      callback();
    }
    window.addEventListener("eip6963:announceProvider", onAnnouncement);
    window.dispatchEvent(new Event("eip6963:requestProvider"));

    return () => window.removeEventListener("eip6963:announceProvider", onAnnouncement);
  }
}
