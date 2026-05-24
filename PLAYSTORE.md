# DataGuard — Google Play Store Build Guide

## Prerequisites

1. **Google Play Developer Account** — One-time $25 registration at https://play.google.com/console/signup
2. **Android Studio** — Download from https://developer.android.com/studio
3. **Node.js 18+** — Already installed if you run the web version locally

## Quick Start (Build APK)

```bash
# 1. Install dependencies
npm install

# 2. Build the web app
npm run build

# 3. Initialize Android project (first time only)
npm run android:init

# 4. Sync web assets to Android
npm run android:sync

# 5. Open in Android Studio
npm run android:open
```

From Android Studio: **Build → Generate Signed Bundle / APK** → follow the wizard.

## For Play Store Release (AAB format)

```bash
# Build release bundle (requires signing key)
npm run android:release
```

The AAB file will be at: `android/app/build/outputs/bundle/release/app-release.aab`

## Signing Key (one-time setup)

```bash
keytool -genkey -v -keystore dataguard-release.keystore -alias dataguard -keyalg RSA -keysize 2048 -validity 10000
```

Then add to `android/app/build.gradle`:
```groovy
android {
    signingConfigs {
        release {
            storeFile file('../../dataguard-release.keystore')
            storePassword 'YOUR_PASSWORD'
            keyAlias 'dataguard'
            keyPassword 'YOUR_PASSWORD'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

## Play Store Listing Requirements

You'll need:
- [ ] App icon (512×512 PNG)
- [ ] Feature graphic (1024×500 PNG)
- [ ] At least 2 screenshots (phone)
- [ ] Short description (80 chars max)
- [ ] Full description (4000 chars max)
- [ ] Privacy policy URL (you already have this on your site)
- [ ] Content rating questionnaire (takes 5 min)
- [ ] Target audience declaration

## Architecture

The Play Store version is the **same web app** wrapped in a native Android shell via Capacitor.
Both versions (web + Play Store) can run simultaneously with no conflicts:

- **Web**: dataguard-six.vercel.app (unchanged)
- **Android**: Same code, packaged as native app with offline support

## Updating the App

When you add new apps or make changes:
1. Changes go to GitHub as usual
2. Run `npm run android:build` to rebuild
3. Upload new AAB to Play Console

The web version updates instantly via Vercel; the Play Store version needs a manual upload + review (~1-3 days).
