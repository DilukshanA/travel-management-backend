 /* This object maps Firebase auth error codes to error messages and status codes. */

const firebaseAuthErrorMap = {
    'auth/email-already-exists': {
        message: 'The email address is already in use by another account.',
        status: 400
    },
    'auth/invalid-email': {
        message: 'The email address is invalid.',
        status: 400
    },
    'auth/invalid-password': {
        message: 'The password is too weak.',
        status: 400
    },
    'auth/uid-already-exists': {
        message: 'The UID is already in use.',
        status: 400
    }
};

export default firebaseAuthErrorMap;
