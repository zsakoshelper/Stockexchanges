exports.handler = async (event) => {
    const ip =
        event.headers['x-forwarded-for']?.split(',')[0].trim() ||
        event.headers['client-ip'] ||
        'unknown';

    const userAgent  = event.headers['user-agent'] || 'unknown';
    const referer    = event.headers['referer']    || 'direct';
    const timestamp  = new Date().toISOString();

    console.log(JSON.stringify({
        type: 'VISIT',
        timestamp,
        ip,
        userAgent,
        referer
    }));

    return {
        statusCode: 200,
        body: JSON.stringify({ logged: true })
    };
};
