const servicesConfig = {
    RECAPTCHA : {
        SITE_KEY : '6Lf77BUnAAAAALeqaGqeEFyWMtntf9SocREluLuM',
        SECRET_KEY : '6Lf77BUnAAAAAE655S7BwIGzjl-h2TQd5z0WuJwA',
        options : {
            hl : 'fa'
        }
    },

    Google : {
        clientID : process.env.clientID,
        clientSecret : process.env.clientSecret
    }
}

export default servicesConfig;