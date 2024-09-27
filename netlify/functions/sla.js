export default async (req, context) => {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ status: "error", reason: "invalid method" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }
  
    const { sla, period } = await req.json();
  
    if (typeof sla !== "number" || sla < 0 || sla > 100 || !["yearly", "quarterly", "monthly", "daily"].includes(period)) {
      return new Response(JSON.stringify({ status: "error", reason: "bad parameters" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  
    let totalSeconds;
  
    switch (period) {
      case "yearly":
        totalSeconds = 365 * 24 * 60 * 60;
        break;
      case "quarterly":
        totalSeconds = (365 / 4) * 24 * 60 * 60;
        break;
      case "monthly":
        totalSeconds = (365 / 12) * 24 * 60 * 60;
        break;
      case "daily":
        totalSeconds = 24 * 60 * 60;
        break;
    }
  
    const downtimeSeconds = totalSeconds * ((100 - sla) / 100);
  
    const nbHours = Math.floor(downtimeSeconds / 3600);
    const nbMinutes = Math.floor((downtimeSeconds % 3600) / 60);
    const nbSeconds = Math.floor(downtimeSeconds % 60);
  
    const responseData = {
      status: "success",
      data: {
        nbHours,
        nbMinutes,
        nbSeconds,
      },
    };
  
    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };
  