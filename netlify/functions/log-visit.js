exports.handler = async (event) => {
    const ip =
        event.headers['x-forwarded-for']?.split(',')[0].trim() ||
        event.headers['client-ip'] ||
        'unknown';

    const userAgent  = event.headers['user-agent'] || 'unknown';
    const referer    = event.headers['referer']    || 'direct';
    const timestamp  = new Date().toISOString();

    // Discord webhook küldés
    const DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/1572721779368005824/T-tHCkf9n0pJfNwJOWROntdvYLZKawYkP4d0AbYjtJ3_3TFaSlClJhhEbs2TxgAwtz0f';

    await fetch(DISCORD_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            embeds: [{
                title: '🌐 Új látogató!',
                color: 0xf0b429,
                fields: [
                    { name: '📍 IP-cím',    value: ip,        inline: true },
                    { name: '🕒 Időpont',   value: timestamp, inline: true },
                    { name: '🌍 Referer',   value: referer,   inline: false },
                    { name: '📱 Eszköz',    value: userAgent.substring(0,80), inline: false }
                ]
            }]
        })
    });

    return { statusCode: 200, body: JSON.stringify({ logged: true }) };
};

