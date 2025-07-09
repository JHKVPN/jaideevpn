async function fetchServers() {
  const res = await fetch('servers.json');
  const servers = await res.json();
  const table = document.getElementById('serverTable');

  servers.forEach(server => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${server.country}</td>
      <td>${server.ip}</td>
      <td>${server.protocol}</td>
      <td><span id="status-${server.ip}">Checking...</span></td>
    `;

    table.appendChild(row);

    // Auto check online status
    fetch(`https://${server.ip}`, { method: 'HEAD', mode: 'no-cors' })
      .then(() => setStatus(server.ip, '🟢 Online'))
      .catch(() => setStatus(server.ip, '🔴 Offline'));
  });
}

function setStatus(ip, text) {
  const el = document.getElementById(`status-${ip}`);
  if (el) el.textContent = text;
}

fetchServers();
