const test = require('node:test');
const assert = require('node:assert/strict');
const {createClient, missingFields} = require('../js/lms-auth.js');
const config = {apiKey:'test-public-key',authDomain:'test-project.firebaseapp.com',projectId:'test-project',appId:'test-app-id'};
function fixture(options = {}) {
  const calls = [];
  let observer;
  const sdk = {
    getAuth: () => ({id:'auth'}),
    browserLocalPersistence: 'local',
    setPersistence: async (_, persistence) => { calls.push(['persistence',persistence]); },
    GoogleAuthProvider: class { setCustomParameters(params) { calls.push(['provider',params]); } },
    onAuthStateChanged: (_, callback) => { observer = callback; },
    signInWithPopup: () => { calls.push(['popup']); return options.popupError ? Promise.reject(options.popupError) : Promise.resolve({user:{uid:'learner'}}); },
    signOut: async () => { calls.push(['signout']); }
  };
  let loads = 0;
  const client = createClient({config:options.config || config, onUser:user => calls.push(['user',user]), onStatus:status => calls.push(['status',status]), loadSDK:async () => {
    loads++;
    if (options.failFirstLoad && loads === 1) throw Error('Offline');
    return [{initializeApp: supplied => ({config:supplied})},sdk];
  }});
  return {client,calls,loads:()=>loads,emit:user=>observer(user)};
}
test('missing and placeholder configuration never reaches Firebase', async () => {
  const {client,loads} = fixture({config:{apiKey:'YOUR_API_KEY'}});
  assert.equal(client.configured,false);
  await assert.rejects(client.prepare(),{code:'auth/missing-config'});
  assert.equal(loads(),0);
  assert.deepEqual(missingFields({}),['apiKey','authDomain','projectId','appId']);
});
test('a popup cannot run before authentication is ready', async () => {
  const {client,calls} = fixture();
  await assert.rejects(client.signIn(),{code:'auth/not-ready'});
  assert.equal(calls.some(c=>c[0]==='popup'),false);
});
test('concurrent initialization shares one SDK load', async () => {
  const {client,loads} = fixture();
  await Promise.all([client.prepare(),client.prepare()]);
  assert.equal(loads(),1);
  assert.equal(client.ready,true);
});
test('persistence is configured before sign-in and the popup starts synchronously', async () => {
  const {client,calls} = fixture();
  await client.prepare();
  const login = client.signIn();
  assert.equal(calls.at(-1)[0],'popup');
  assert.ok(calls.findIndex(c=>c[0]==='persistence') < calls.findIndex(c=>c[0]==='popup'));
  assert.equal((await login).user.uid,'learner');
  assert.deepEqual(calls.find(c=>c[0]==='provider')[1],{prompt:'select_account'});
});
test('an SDK network failure can be retried', async () => {
  const {client,loads} = fixture({failFirstLoad:true});
  await assert.rejects(client.prepare(),/Offline/);
  assert.equal(client.ready,false);
  await client.prepare();
  assert.equal(client.ready,true);
  assert.equal(loads(),2);
});
test('popup errors are preserved for actionable UI messages', async () => {
  const {client} = fixture({popupError:{code:'auth/popup-blocked'}});
  await client.prepare();
  await assert.rejects(client.signIn(),{code:'auth/popup-blocked'});
  assert.equal(client.ready,true);
});
test('session restoration and sign-out use the Firebase auth observer and SDK', async () => {
  const {client,calls,emit} = fixture();
  await client.prepare();
  emit({uid:'restored-learner'});
  await client.signOut();
  emit(null);
  assert.deepEqual(calls.filter(c=>['user','signout'].includes(c[0])),[['user',{uid:'restored-learner'}],['signout'],['user',null]]);
});
