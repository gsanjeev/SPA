interface AuthConfiguration {
    clientID: string,
    domain: string,
    callbackURL: string
}

export const myConfig: AuthConfiguration = {
    clientID: 'yqIuoG5HNg3LJYK34iF0XBDKCs7FgGeZ',
    domain: 'laxtech.eu.auth0.com',
    callbackURL: 'https://homemgmt.herokuapp.com'
    //callbackURL: 'http://localhost:4200'
};
