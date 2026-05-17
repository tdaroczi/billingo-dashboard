/*
  Bemutató adatcsomag a Billingo MI irányítópulthoz.
  Minden cég, személy, számla és összeg fiktív.
  A szerkezet szándékosan követi a jelenlegi felület által használt mezőket.
*/
(function () {
  const TODAY = new Date("2026-05-17T12:00:00+02:00");

  const org = {
    name: "MesterMűhely Stúdió Kft.",
    tax_code: "32845671-2-42",
    has_nav_connection: true,
    subscription: {
      features: ["billingo_business"],
      expiration_date: "2026-12-31"
    },
    bemutatoProfile: {
      industry: "Digitalis szolgaltato kisvallalkozas",
      city: "Budapest",
      note: "Weboldalak, arculatok, kampanyok es automatizalasi tanacsadas fiktiv bemutato cege."
    }
  };

  const partners = [
    partner(1, "Borbála Rendezvényház Kft.", "Budapest", "high_value_late", "penzugy@borbalarendezveny.hu"),
    partner(2, "GreenBox Csomagolás Kft.", "Győr", "growing", "iroda@greenbox-bemutato.hu"),
    partner(3, "PixelPék Webshop Bt.", "Szeged", "dormant", "hello@pixelpek-bemutato.hu"),
    partner(4, "Napfény Kávézó Kft.", "Pécs", "steady", "szamla@napfenykavezo.hu"),
    partner(5, "UrbanFit Studio Kft.", "Budapest", "steady", "admin@urbanfit-bemutato.hu"),
    partner(6, "HídTech Automatika Kft.", "Székesfehérvár", "project", "info@hidtech-bemutato.hu"),
    partner(7, "KreatívKert Marketing Bt.", "Debrecen", "late_small", "hello@kreativkert.hu"),
    partner(8, "TisztaLap Könyvelés Kft.", "Budapest", "steady", "iroda@tisztalap-bemutato.hu"),
    partner(9, "Menta Dental Studio Kft.", "Veszprem", "growing", "admin@mentadental-bemutato.hu"),
    partner(10, "AlfaMuhely Gyarto Kft.", "Kecskemet", "high_value", "penzugy@alfamuhely.hu"),
    partner(11, "KisBolt Online Bt.", "Miskolc", "late_small", "rendeles@kisbolt-bemutato.hu"),
    partner(12, "StúdióLámpa Design Kft.", "Budapest", "steady", "contact@studiolampa.hu"),
    partner(13, "BudaWine Kereskedés Kft.", "Budapest", "seasonal", "szamla@budawine-bemutato.hu"),
    partner(14, "KékMadárka Oktatás Bt.", "Eger", "dormant", "iroda@kekmadarka.hu"),
    partner(15, "FutárPont Logisztika Kft.", "Tatabánya", "project", "invoice@futarpont-bemutato.hu"),
    partner(16, "Szikra HR Tanácsadás Kft.", "Budapest", "steady", "hello@szikrahr.hu"),
    partner(17, "MálnaApp Fejlesztő Kft.", "Sopron", "growing", "finance@malnaapp-bemutato.hu"),
    partner(18, "Harmónia Szalon Bt.", "Nyíregyháza", "late_small", "info@harmoniaszalon.hu"),
    partner(19, "DunaPrint Nyomda Kft.", "Budapest", "steady", "szamlazas@dunaprint.hu"),
    partner(20, "OkosOtthon Pro Kft.", "Szentendre", "project", "iroda@okosotthonpro.hu"),
    partner(21, "LigetLakberendezés Kft.", "Budapest", "high_value_late", "penzugy@ligetlak.hu"),
    partner(22, "Forras Coaching Bt.", "Kaposvar", "steady", "hello@forrascoaching.hu"),
    partner(23, "SelyemUt Rendezveny Bt.", "Budapest", "seasonal", "admin@selyemut-bemutato.hu"),
    partner(24, "VektorBiztositas Kft.", "Szolnok", "missing_email", ""),
    partner(25, "Korzó Bisztró Kft.", "Siófok", "seasonal", "iroda@korzobistro.hu"),
    partner(26, "Nimfa Kozmetika Bt.", "Budapest", "late_small", "hello@nimfakozmetika.hu"),
    partner(27, "PatakSoft Kft.", "Miskolc", "steady", "finance@pataksoft.hu"),
    partner(28, "Aranyhíd Apartman Kft.", "Balatonfüred", "seasonal", "szamla@aranyhidapartman.hu"),
    partner(29, "NovaMed Praxis Kft.", "Budapest", "high_value", "iroda@novamedpraxis.hu"),
    partner(30, "TérképTúra Egyesület", "Pécs", "dormant", "kapcsolat@terkeptura.hu")
  ];

  const documents = [];
  let invoiceSeq = 24001;
  let idSeq = 1;

  function partner(id, name, city, segment, email) {
    return {
      id,
      name,
      taxcode: "HU" + String(10000000 + id * 73921),
      segment,
      emails: email ? [email] : [],
      address: {
        country_code: "HU",
        post_code: String(1000 + id * 23),
        city,
        address: "Bemutato utca " + (id + 7) + "."
      }
    };
  }

  function addInvoice(partnerId, month, amount, options) {
    options = options || {};
    const p = partners.find(item => item.id === partnerId);
    const invoiceDate = dateInMonth(month, options.day || 8);
    const dueDays = options.dueDays == null ? 8 : options.dueDays;
    const dueDate = addDays(invoiceDate, dueDays);
    const paidDelay = options.paidDelay == null ? 3 : options.paidDelay;
    const status = options.status || inferStatus(dueDate, paidDelay);
    const paidDate = status === "paid" || status === "late" ? addDays(dueDate, paidDelay) : null;
    const type = options.type || "invoice";
    const vatRate = options.vatRate == null ? 0.27 : options.vatRate;
    const net = Math.round(amount / (1 + vatRate));
    const vat = amount - net;

    documents.push({
      id: idSeq++,
      invoice_number: "MM-" + String(invoiceSeq++),
      type,
      payment_status: status,
      invoice_date: iso(invoiceDate),
      due_date: iso(dueDate),
      paid_date: paidDate ? iso(paidDate) : null,
      payment_method: options.paymentMethod || "wire_transfer",
      currency: "HUF",
      partner: {
        id: p.id,
        name: p.name,
        taxcode: p.taxcode,
        emails: p.emails,
        address: p.address
      },
      summary: {
        net_amount: net,
        vat_amount: vat,
        gross_amount: amount,
        total: amount
      },
      bemutato: {
        service: options.service || "Digitalis szolgaltatas",
        segment: p.segment,
        note: options.note || ""
      }
    });
  }

  function inferStatus(dueDate, paidDelay) {
    const paidDate = addDays(dueDate, paidDelay);
    if (paidDate <= TODAY) return paidDelay > 0 ? "late" : "paid";
    if (dueDate < TODAY) return "expired";
    return "outstanding";
  }

  function dateInMonth(month, day) {
    const parts = month.split("-").map(Number);
    return new Date(parts[0], parts[1] - 1, day, 12, 0, 0);
  }

  function addDays(date, days) {
    const copy = new Date(date);
    copy.setDate(copy.getDate() + days);
    return copy;
  }

  function iso(date) {
    return date.toISOString().slice(0, 10);
  }

  function monthsBetween(start, end) {
    const result = [];
    let cursor = new Date(start + "-01T12:00:00+02:00");
    const stop = new Date(end + "-01T12:00:00+02:00");
    while (cursor <= stop) {
      result.push(cursor.getFullYear() + "-" + String(cursor.getMonth() + 1).padStart(2, "0"));
      cursor.setMonth(cursor.getMonth() + 1);
    }
    return result;
  }

  const months = monthsBetween("2025-03", "2026-05");

  // Stable monthly retainers.
  [
    [4, 145000], [8, 165000], [16, 180000], [27, 175000]
  ].forEach(([partnerId, amount]) => {
    months.forEach((month, index) => {
      const delay = index % 5 === 0 ? 4 : -1;
      addInvoice(partnerId, month, amount + (index % 3) * 12000, {
        day: 5 + (partnerId % 5),
        paidDelay: delay,
        service: "Havi marketing es web tamogatas"
      });
    });
  });

  // High-value late payers.
  months.forEach((month, index) => {
    if (index % 2 === 0) {
      addInvoice(1, month, 520000 + (index % 4) * 65000, {
        day: 10,
        dueDays: 10,
        paidDelay: index >= 13 ? 18 : 14,
        service: "Rendezveny kampany es landing oldal",
        note: "Nagy erteku, rendszeresen kesve fizeto partner"
      });
    }
    if (index % 3 === 0) {
      addInvoice(21, month, 430000 + (index % 5) * 48000, {
        day: 12,
        dueDays: 8,
        paidDelay: index >= 12 ? 22 : 11,
        service: "Lakberendezesi kampanycsomag",
        note: "Magas bevetel, fizetesi csuszas kockazattal"
      });
    }
  });

  // Growing customers: deliberately rising invoice values in recent months.
  months.slice(5).forEach((month, index) => {
    addInvoice(2, month, 95000 + index * 28000, {
      day: 7,
      paidDelay: index < 8 ? -1 : 2,
      service: "Webshop fejlesztes es automatizalas",
      note: "Novekvo ugyfel"
    });
  });
  months.slice(7).forEach((month, index) => {
    addInvoice(9, month, 110000 + index * 21000, {
      day: 11,
      paidDelay: 1,
      service: "Idopontfoglalasi kampany es tartalom"
    });
  });
  months.slice(9).forEach((month, index) => {
    addInvoice(17, month, 160000 + index * 43000, {
      day: 14,
      paidDelay: -1,
      service: "SaaS onboarding funnel"
    });
  });

  // Dormant customers: active earlier, then no recent invoices.
  months.slice(0, 8).forEach((month, index) => {
    addInvoice(3, month, 135000 + (index % 2) * 35000, {
      day: 9,
      paidDelay: index % 3 === 0 ? 7 : 0,
      service: "Webshop kreatív frissites",
      note: "Korabban aktiv, most inaktiv partner"
    });
  });
  months.slice(0, 7).forEach((month, index) => {
    addInvoice(14, month, 98000 + (index % 4) * 15000, {
      day: 6,
      paidDelay: 2,
      service: "Oktatasi landing es hirdeteskezeles"
    });
  });
  months.slice(0, 6).forEach((month, index) => {
    addInvoice(30, month, 76000 + index * 9000, {
      day: 18,
      paidDelay: 0,
      service: "Kampanyoldal es hirlevel sablon"
    });
  });

  // Project-based customers.
  [
    [6, "2025-04", 720000, "Automatizalasi audit"],
    [6, "2025-11", 950000, "Belső workflow rendszer"],
    [10, "2025-06", 880000, "B2B ajanlatkeresi oldal"],
    [10, "2026-02", 1240000, "Partnerportal redesign"],
    [15, "2025-09", 640000, "Logisztikai kampany"],
    [20, "2025-12", 780000, "Okosotthon konfigurator"],
    [20, "2026-04", 690000, "Leadgyujto oldal"],
    [29, "2026-01", 860000, "Praxis weboldal es idopontfoglalas"]
  ].forEach(([partnerId, month, amount, service], index) => {
    addInvoice(partnerId, month, amount, {
      day: 16,
      dueDays: 15,
      paidDelay: index % 3 === 0 ? 5 : -1,
      service
    });
  });

  // Seasonal customers.
  ["2025-05", "2025-06", "2025-07", "2025-11", "2025-12", "2026-04", "2026-05"].forEach((month, index) => {
    addInvoice(13, month, 210000 + index * 18000, {
      day: 13,
      paidDelay: index % 2 === 0 ? -1 : 6,
      service: "Szezonalis kampany"
    });
    addInvoice(25, month, 175000 + index * 14000, {
      day: 15,
      paidDelay: 3,
      service: "Vendeglatohely social kampany"
    });
  });
  ["2025-06", "2025-07", "2025-08", "2026-03", "2026-04", "2026-05"].forEach((month, index) => {
    addInvoice(28, month, 240000 + index * 26000, {
      day: 17,
      paidDelay: index >= 4 ? 9 : 1,
      service: "Turisztikai foglalasi kampany"
    });
  });

  // Small late payers and operational invoices.
  [
    [7, 82000], [11, 69000], [18, 74000], [26, 56000]
  ].forEach(([partnerId, amount]) => {
    months.filter((_, index) => index % 2 === partnerId % 3).forEach((month, index) => {
      addInvoice(partnerId, month, amount + index * 5000, {
        day: 19,
        dueDays: 8,
        paidDelay: index >= 5 ? 13 : 6,
        service: "Kisebb kreatív munka",
        note: "Kis osszegu, de gyakran csuszo partner"
      });
    });
  });

  // Missing contact details.
  ["2025-10", "2026-01", "2026-05"].forEach((month, index) => {
    addInvoice(24, month, 220000 + index * 35000, {
      day: 10,
      paidDelay: index === 2 ? null : 2,
      service: "Online ajanlatkero rendszer",
      note: "Hianyos partneradat: nincs email cim"
    });
  });

  // Explicit current open and overdue invoices for the action center.
  addInvoice(1, "2026-04", 680000, {
    day: 20,
    dueDays: 7,
    status: "expired",
    paidDelay: null,
    service: "Tavaszi rendezveny kampany",
    note: "21+ napos nagy kintlevoseg"
  });
  addInvoice(21, "2026-04", 590000, {
    day: 23,
    dueDays: 8,
    status: "expired",
    paidDelay: null,
    service: "Lakberendezesi kampany landing",
    note: "Nagy osszegu lejart szamla"
  });
  addInvoice(7, "2026-03", 118000, {
    day: 28,
    dueDays: 8,
    status: "expired",
    paidDelay: null,
    service: "Hirdetesi kreatív csomag",
    note: "Kisebb, de regen lejart szamla"
  });
  addInvoice(2, "2026-05", 435000, {
    day: 8,
    dueDays: 15,
    status: "outstanding",
    paidDelay: null,
    service: "Automatizalasi sprint",
    note: "Novekvo ugyfel aktualis nyitott szamlaja"
  });
  addInvoice(17, "2026-05", 418000, {
    day: 9,
    dueDays: 14,
    status: "outstanding",
    paidDelay: null,
    service: "Onboarding funnel masodik utem",
    note: "Kovetkezo 30 nap penzaramlas tetel"
  });

  // A few non-standard document types for realistic filtering.
  addInvoice(23, "2026-05", 180000, {
    day: 4,
    dueDays: 10,
    status: "draft",
    type: "draft",
    service: "Nyari rendezveny kampany tervezet"
  });
  addInvoice(5, "2026-04", 95000, {
    day: 25,
    dueDays: 5,
    status: "cancelled",
    type: "reverse_invoice",
    service: "Sztornozott bemutato tetel"
  });

  documents.sort((a, b) => {
    if (a.invoice_date === b.invoice_date) return a.id - b.id;
    return a.invoice_date < b.invoice_date ? 1 : -1;
  });

  const stories = [
    {
      id: "high-value-late",
      title: "Nagy erteku, de kesve fizeto ugyfelek",
      partnerIds: [1, 21],
      expectedInsight: "Magas bevetelt hoznak, de a kintlevosegi kockazatot is ok adjak."
    },
    {
      id: "growth",
      title: "Novekvo partnerek",
      partnerIds: [2, 9, 17],
      expectedInsight: "Az utolso 3 honapban no a szamlaertek, szerzodeses lehetoseg lehet."
    },
    {
      id: "dormant",
      title: "Lemorzsolodo partnerek",
      partnerIds: [3, 14, 30],
      expectedInsight: "Korabban aktivak voltak, de 90+ napja nincs uj szamla."
    },
    {
      id: "missing-contact",
      title: "Hianyos partneradat",
      partnerIds: [24],
      expectedInsight: "Nincs email cim, ez akadalyozza az automatikus utan kovetest."
    }
  ];

  window.BILLINGO_DEMO_DATA = {
    generatedAt: "2026-05-17",
    org,
    partners,
    documents,
    stories
  };
})();
