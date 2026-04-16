function jarjestaEhdokkaat(ehdokkaat) {
  const kopio = ehdokkaat.map((e) => ({ ...e }));

  kopio.sort((a, b) => {
    if (a.aanet !== b.aanet) {
      return b.aanet - a.aanet;
    }
    return Math.random() - 0.5;
  });

  const ryhmat = {};
  kopio.forEach((e) => {
    if (!ryhmat[e.aanet]) ryhmat[e.aanet] = [];
    ryhmat[e.aanet].push(e);
  });

  Object.values(ryhmat).forEach((ryhma) => {
    if (ryhma.length > 1) {
      ryhma.forEach((e) => {
        e.arvottu = true;
      });
    }
  });

  return kopio;
}

module.exports = { jarjestaEhdokkaat };
