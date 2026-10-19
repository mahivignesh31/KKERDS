# KK Learning

Open `lms.html` through a web server. The existing website navigation already links to it. No build or package installation is required.

```sh
python3 -m http.server 8000
```

Visit http://localhost:8000/lms.html. Guest learning works without Firebase: enroll in any of the seven courses, navigate lessons, mark completion, save lesson notes, and take knowledge checks. Search, category filters, personal learning, resources, and achievements all work locally.

## Enable Google authentication and account sync

1. Create a project at https://console.firebase.google.com/ and register a **Web app** in Project settings.
2. Copy its public configuration into `js/firebase-config.js` (`apiKey`, `authDomain`, `projectId`, `appId`). Do not use service-account credentials or an OAuth client secret.
3. Under **Authentication → Sign-in method**, enable **Google**, set the project support email, and save.
4. Under **Authentication → Settings → Authorized domains**, add your production hostname. Add `localhost` for local testing if it is not already present. If you use `http://127.0.0.1:8000`, authorize `127.0.0.1` as well (hostnames only, without protocol or port). Serve production over HTTPS.
5. Create a **Cloud Firestore** database and publish the contents of `firestore.rules` in its Rules tab. The rules grant each signed-in learner access only to their own progress document and deny other collections by default. Do not enable open/test-mode rules.
6. Reload the LMS and choose **Sign in with Google**. Complete a lesson, write a note, and verify `learners/<your Firebase UID>` in Firestore. Reload and sign in on a second device to check restoration. Sign out and confirm that the separate guest workspace returns.

Official reference: https://firebase.google.com/docs/auth/web/google-signin

## Data and behavior

- Google authentication uses Firebase's official browser SDK and session observer. Authentication loads before the button is enabled, so clicking can immediately open the Google popup. The database SDK loads separately after sign-in; Firestore being unavailable does not prevent login. Sessions use browser-local persistence until explicit sign-out.
- Guest progress is stored under a guest-specific localStorage key. Each Google account has a separate local cache; guest data is not automatically copied into accounts.
- Account progress is synced to the learner's own Firestore document when configured. Failed writes keep the local cache and show a status message. A successful cloud read restores the cloud snapshot unless this tab has already been edited during the read.
- This lightweight implementation saves whole progress snapshots. Concurrent edits in different tabs/devices use the most recently written snapshot. Cloud sync is not a conflict-resolution or offline-first collaboration system. If an initial cloud read fails, that session stays local to avoid overwriting unseen remote progress; reload when connectivity returns.
- Each lesson has independent notes (10,000 characters maximum). Progress counts only completed lessons from enrolled courses. The course milestone requires all lessons plus a passing knowledge check; the check requires all three answers correct.
- Milestones are personal, self-reported progress, not official certificates or verified assessments. Existing course content remains publicly accessible. Browser progress and quiz answers must not be used as a trusted credential, payment gate, or authorization check.
- Full Stack Python, Data Analytics, and Power BI use guided reading, practice exercises, official documentation links, and course-specific knowledge checks. Power BI hands-on work uses Power BI Desktop on Windows.
- Original course titles and videos were taken from the repository's existing course pages. External video availability and content are controlled by their creators. Training PDFs link to the files that actually exist in the repository.
- No student records, payments, instructor administration, or secure assessment backend are included. These require separate server-side product work.

## Files

- `lms.html`: accessible dashboard, navigation, and modal shells.
- `css/lms.css`: responsive layout and visual system.
- `js/lms-data.js`: curriculum, video references, resources, and knowledge checks.
- `js/lms.js`: workspace behavior, local progress, sign-in interface, Firestore sync.
- `js/lms-auth.js`: Google authentication initialization, session persistence, and popup/sign-out operations (independent of Firestore).
- `js/firebase-config.js`: deployment-specific public Firebase configuration.
- `firestore.rules`: learner ownership rules.

## Troubleshoot Google sign-in

- **Missing configuration:** all four values in `js/firebase-config.js` must come from the same Firebase Web app. Blank or placeholder values cannot sign in.
- **Opened as a local file:** use the HTTP server above. Do not open `lms.html` through a `file://` URL.
- **Unauthorized domain:** authorize the exact hostname used in the browser in Firebase Authentication settings. New Firebase projects may require adding localhost explicitly.
- **Google provider disabled:** enable it in Authentication → Sign-in method and set the support email.
- **Popup blocked:** allow pop-ups for this site and click the retry button. The app does not silently redirect to a different sign-in flow.
- **Network or SDK loading failure:** restore connectivity, then retry. Initialization errors re-enable the button and support a fresh connection attempt.
- **Signed in but progress sync unavailable:** check Firestore availability and ownership rules. You can still sign in and use account-specific local progress.

Run the authentication regression checks with `node --test tests/lms-auth.test.cjs`. These use a mocked Firebase SDK to test readiness, popup timing, retry behavior, and session handling. Live Google OAuth still needs the real configuration and provider/domain setup above.
