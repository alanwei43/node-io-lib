import fetch from "node-fetch";

/**
 * 获取当前网络的IP
 * @author alan 
 * @date 2022-03-16
 */
export async function getMyIp(timeout?: number): Promise<Array<GetMyIpItem>> {
  const services: Array<string> = [
    "https://icanhazip.com",
    "https://ifconfig.me/all.json",
    "https://api.ipify.org",
    "https://bot.whatismyipaddress.com",
    "https://ipinfo.io/ip",
    "https://ipecho.net/plain",
    "https://alanwei.azurewebsites.net/api/tool/ip"
  ];

  const list: Array<GetMyIpItem> = [];
  const to = timeout || 5000;
  for (let svr of services) {
    const start = Date.now();
    const ip = await req(svr, to);
    const end = Date.now();
    list.push({
      source: svr,
      ip: ip,
      cost: end - start
    });
  }
  return list;
}

function req(url: string, timeout: number): Promise<string> {
  return new Promise((resolve, reject) => {
    let resolved: boolean = false;
    fetch(url, {
      headers: {
        "User-Agent": "curl"
      },
    })
      .then(response => response.text())
      .then(data => {
        if (resolved) { return; }
        resolved = true;
        resolve(data
          .replace(/\n/g, "")
          .replace(/\t/g, " ")
          .replace(/ {,2}/g, " "));
      })
      .catch(err => resolve(err.message));

    setTimeout(() => {
      if (resolved) { return; }
      resolved = true;
      resolve("timeout");
    }, timeout);
  });
}

export interface GetMyIpItem { source: string, ip: string, cost: number }