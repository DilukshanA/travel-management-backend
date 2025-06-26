import admin from "../../../config/firebase.js";

const createSessionCookieWithCustomToken = async (token, res) => {
    try {
        const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

        // create custom token
        const customToken = await admin.auth().createCustomToken(token);

        // create session cookie
        //const sessionCookie = await admin.auth().createSessionCookie(customToken, { expiresIn });

        res.cookie("auth_token", customToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: expiresIn,
        })

    } catch (error) {
        console.error("Error creating session cookie:", error);
    }
}

export default createSessionCookieWithCustomToken;