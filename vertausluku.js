// vertausluku.js
export default function laskeVertausluvut(ehdokasLista) {
  if (!Array.isArray(ehdokasLista) || ehdokasLista.length === 0) {
    return [];
  }

  const kokonaisAanimaara = ehdokasLista.reduce((sum, e) => sum + (e.aanet || 0), 0);

  // Lasketaan vertausluku kaikille
  let tulos = ehdokasLista.map(ehdokas => ({
    ...ehdokas,
    vertausluku: Math.floor(kokonaisAanimaara / (ehdokas.aanet || 1))
  }));

  // Järjestetään ensisijaisesti vertausluvun mukaan laskevasti
  tulos.sort((a, b) => b.vertausluku - a.vertausluku);

  // Käsitellään ryhmät satunnaisessa järjestyksessä
  for (let i = 0; i < tulos.length; i++) {
    let j = i;
    while (j < tulos.length && tulos[j].vertausluku === tulos[i].vertausluku) {
      j++;
    }

    if (j - i > 1) {
      const ryhma = tulos.slice(i, j);
      // Random 
      for (let k = ryhma.length - 1; k > 0; k--) {
        const rand = Math.floor(Math.random() * (k + 1));
        [ryhma[k], ryhma[rand]] = [ryhma[rand], ryhma[k]];
      }
      // Merkitään arvotut
      ryhma.forEach(e => e.arvottu = true);
      tulos.splice(i, j - i, ...ryhma);
    }
    i = j - 1;
  }

  return tulos;
}