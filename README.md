# Lyfts — Android APK

This wraps `www/index.html` (your existing Lyfts web app) into a native Android
app using [Capacitor](https://capacitorjs.com/), and ships a GitHub Actions
workflow that builds a **debug-signed APK** you can install on your phone.

## How to use

1. Drop these files into the **root of your `workout-tracker` GitHub repo**
   (keep your existing files; just add these alongside them).
   - `www/` — contains `index.html` + icons (the app's web payload)
   - `capacitor.config.json`
   - `package.json`
   - `.gitignore`
   - `.github/workflows/build-apk.yml`

2. Commit and push to `main`. GitHub Actions will:
   - install Capacitor + the Android SDK
   - generate the `android/` project
   - build `app-debug.apk`
   - publish it to a GitHub Release tagged **`latest`** (auto-updated on every push to `main`)

3. On your Android phone, open the repo's **Releases** page → `latest` →
   tap **`Lyfts-debug.apk`** to download → tap the file to install.
   You'll need to allow "Install unknown apps" for your browser the first time.

## Cutting a versioned release

Push a tag like `v1.0.0` and the workflow will create a matching release:

```bash
git tag v1.0.0
git push origin v1.0.0
```

## Updating the app

Edit `www/index.html` (same file you've been iterating on), commit to `main`,
and the `latest` release APK will be rebuilt automatically. Re-download and
re-install on your phone.

## Identity

- App name: **Lyfts**
- Package ID: **com.lyfts.app**

Change either in `capacitor.config.json` (and delete the `android/` folder if
it was committed, so it gets regenerated).
