/* Google authentication is independent of Firestore and course progress. */
(function (root) {
  'use strict';
  const requiredFields = ['apiKey', 'authDomain', 'projectId', 'appId'];
  function missingFields(config) {
    return requiredFields.filter(field => typeof config?.[field] !== 'string' || !config[field].trim() || /^(YOUR_|REPLACE_|<)/i.test(config[field].trim()));
  }
  function failure(code) { return Object.assign(new Error(code), {code}); }
  function createClient({config, onUser, onStatus = () => {}, loadSDK = () => Promise.all([
    import('https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js'),
    import('https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js')
  ])}) {
    let app, auth, sdk, provider, initialization, ready = false;
    return {
      get configured() { return missingFields(config).length === 0; },
      get ready() { return ready; },
      get app() { return app; },
      prepare() {
        if (initialization) return initialization;
        if (missingFields(config).length) return Promise.reject(failure('auth/missing-config'));
        onStatus('loading');
        initialization = (async () => {
          const [appSDK, authSDK] = await loadSDK();
          sdk = authSDK;
          app = appSDK.initializeApp(config);
          auth = sdk.getAuth(app);
          await sdk.setPersistence(auth, sdk.browserLocalPersistence);
          provider = new sdk.GoogleAuthProvider();
          provider.setCustomParameters({prompt:'select_account'});
          sdk.onAuthStateChanged(auth, onUser);
          ready = true;
          onStatus('ready');
        })().catch(error => {
          ready = false;
          initialization = null;
          onStatus('error');
          throw error;
        });
        return initialization;
      },
      signIn() {
        if (!ready) return Promise.reject(failure('auth/not-ready'));
        // Call immediately from the button click: no SDK imports or database awaits first.
        return sdk.signInWithPopup(auth, provider);
      },
      signOut() {
        if (!ready) return Promise.reject(failure('auth/not-ready'));
        return sdk.signOut(auth);
      }
    };
  }
  const api = {createClient, missingFields};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.KKGoogleAuth = api;
})(globalThis);
