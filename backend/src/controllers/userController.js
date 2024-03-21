const User = require('./models/User');

async function authenticateUser(username, password, oauthData) {
    let user;

    if (oauthData) {
        user = await User.findOne({ 'oauthProviders.provider': oauthData.provider, 'oauthProviders.providerId': oauthData.providerId });
        if (!user) {
            user = new User({
                email: oauthData.email,
                oauthProviders: [{
                    provider: oauthData.provider,
                    providerId: oauthData.providerId
                }]
            });
            await user.save();
        }
    } else {
        if (!username || !password) {
            throw new Error('Both username and password are required for traditional authentication.');
        }
        user = await User.findOne({ username, password });
        if (!user) {
            throw new Error('Invalid username or password.');
        }
    }

    return user;
}

try {
    const oauthData = {
        provider: 'google',
        providerId: 'google123',
        email: 'example@gmail.com'
    };
    const authenticatedUser = await authenticateUser(null, null, oauthData);
    console.log('Authenticated user:', authenticatedUser);

    const authenticatedUser2 = await authenticateUser('username', 'password', null);
    console.log('Authenticated user:', authenticatedUser2);
} catch (error) {
    console.error('Authentication failed:', error.message);
}

module.exports = authenticateUser;
