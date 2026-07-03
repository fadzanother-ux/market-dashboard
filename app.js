async function fetchCrypto() {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,binancecoin,xrp,dogecoin&vs_currencies=usd&include_24hr_change=true");
    const data = await res.json();

    // Bitcoin
    document.getElementById("btcPrice").innerText = "$" + data.bitcoin.usd.toLocaleString();
    document.getElementById("btcChange").innerText = data.bitcoin.usd_24h_change.toFixed(2) + "%";

    // Ethereum
    document.getElementById("ethPrice").innerText = "$" + data.ethereum.usd.toLocaleString();
    document.getElementById("ethChange").innerText = data.ethereum.usd_24h_change.toFixed(2) + "%";

    // Solana
    document.getElementById("solPrice").innerText = "$" + data.solana.usd.toLocaleString();

    // BNB
    document.getElementById("bnbPrice").innerText = "$" + data.binancecoin.usd.toLocaleString();

    // XRP
    document.getElementById("xrpPrice").innerText = "$" + data.xrp.usd.toLocaleString();

    // DOGE
    document.getElementById("dogePrice").innerText = "$" + data.dogecoin.usd.toLocaleString();

  } catch (err) {
    console.log("Error fetch crypto:", err);
  }
}

// update awal
fetchCrypto();

// update setiap 15 detik
setInterval(fetchCrypto, 15000);function randomChange(base) {
  // simulasi perubahan harga (karena API saham butuh berbayar)
  return (base + (Math.random() - 0.5) * base * 0.02).toFixed(0);
}

function randomPercent() {
  return ((Math.random() - 0.5) * 2).toFixed(2);
}

// ===== SAHAM INDONESIA (SIMULASI) =====
function updateIndoStock() {

  let stocks = {
    bbca: 9500,
    bbri: 5200,
    bmri: 7200,
    bbni: 4800,
    tlkm: 3800,
    goto: 150,
    asii: 5600,
    antm: 2200,
    medc: 1200,
    adro: 2800,
    ptba: 3000,
    klbf: 1500,
    indf: 7200,
    icbp: 11000
  };

  for (let key in stocks) {
    let price = randomChange(stocks[key]);
    let change = randomPercent();

    let elPrice = document.getElementById(key);

    if (elPrice) {
      elPrice.innerText = "Rp " + Number(price).toLocaleString();

      if (change >= 0) {
        elPrice.style.color = "#00ff84";
      } else {
        elPrice.style.color = "#ff4d4d";
      }
    }
  }
}

// ===== SAHAM AMERIKA (SIMULASI) =====
function updateUSStock() {

  let stocks = {
    aapl: 190,
    msft: 410,
    nvda: 120,
    tsla: 250,
    meta: 480,
    amzn: 180,
    googl: 170,
    nflx: 600,
    coin: 220,
    mstr: 1400
  };

  for (let key in stocks) {
    let price = randomChange(stocks[key]);
    let change = randomPercent();

    let el = document.getElementById(key);

    if (el) {
      el.innerText = "$ " + Number(price).toLocaleString();

      if (change >= 0) {
        el.style.color = "#00ff84";
      } else {
        el.style.color = "#ff4d4d";
      }
    }
  }
}

// update awal
updateIndoStock();
updateUSStock();

// auto refresh tiap 10 detik
setInterval(updateIndoStock, 10000);
setInterval(updateUSStock, 10000);// ===== SEARCH FUNCTION =====
const searchInput = document.querySelector(".search input");

searchInput.addEventListener("keyup", function () {
  let value = this.value.toLowerCase();

  // cari di semua baris tabel
  let rows = document.querySelectorAll("table tbody tr");

  rows.forEach(row => {
    let text = row.innerText.toLowerCase();

    if (text.includes(value)) {
      row.style.display = "";
      row.style.background = "#1a2235";
    } else {
      row.style.display = "none";
    }
  });
});

// ===== SIMPLE WATCHLIST =====
let watchlist = [];

function addToWatchlist(symbol) {
  if (!watchlist.includes(symbol)) {
    watchlist.push(symbol);
    console.log("Added to watchlist:", symbol);
  }
}

// klik row untuk add watchlist
document.querySelectorAll("table tbody tr").forEach(row => {
  row.addEventListener("click", function () {
    let symbol = this.innerText.split("\n")[0];
    addToWatchlist(symbol);
  });
});

// ===== SHOW WATCHLIST (console simple dulu) =====
function showWatchlist() {
  console.log("WATCHLIST:", watchlist);
}

setInterval(showWatchlist, 30000);// ===== WATCHLIST UI =====
let watchlistData = [];

function renderWatchlist() {
  let container = document.getElementById("watchlistBox");

  if (!container) {
    container = document.createElement("div");
    container.id = "watchlistBox";
    container.style.marginTop = "30px";
    container.innerHTML = "<h2 class='section-title'>⭐ Watchlist</h2>";
    document.querySelector(".main").appendChild(container);
  }

  container.innerHTML = "<h2 class='section-title'>⭐ Watchlist</h2>";

  watchlistData.forEach(item => {
    let div = document.createElement("div");
    div.className = "card";
    div.style.marginBottom = "10px";
    div.innerHTML = `<b>${item}</b>`;
    container.appendChild(div);
  });
}

// override add watchlist dari PART 7
function addToWatchlist(symbol) {
  if (!watchlistData.includes(symbol)) {
    watchlistData.push(symbol);
    renderWatchlist();
  }
}

// ===== TOP GAINERS / LOSERS SIMPLE =====
function updateMarketStats() {
  let marketcap = document.getElementById("marketcap");
  let btcdom = document.getElementById("btcdom");
  let fear = document.getElementById("fear");
  let volume = document.getElementById("volume");

  if (marketcap) {
    marketcap.innerText = "$ " + (1.2 + Math.random()).toFixed(2) + "T";
  }

  if (btcdom) {
    btcdom.innerText = (45 + Math.random() * 5).toFixed(2) + "%";
  }

  if (fear) {
    fear.innerText = Math.floor(Math.random() * 100);
  }

  if (volume) {
    volume.innerText = "$ " + (80 + Math.random() * 20).toFixed(0) + "B";
  }
}

// ===== AUTO UPDATE MARKET STATS =====
setInterval(updateMarketStats, 5000);
updateMarketStats();
