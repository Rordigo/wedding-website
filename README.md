# 💍 Wedding Website

An elegant, single-page wedding website built with **Angular 20** and **Bootstrap 5**,
ready to deploy for free on **GitHub Pages**.

Sections: hero with live countdown · our story · event details · schedule ·
photo gallery · travel & accommodation · gifts/registry · RSVP · FAQ.

---

## ✏️ 1. Customise your content

**Almost everything lives in one file:** [`src/app/site-config.ts`](src/app/site-config.ts).

Open it and edit the names, date, venue, story, schedule, gallery captions,
registry links, FAQs and RSVP link. The whole site updates from there.

A few things live elsewhere:

| What | Where |
|------|-------|
| Browser tab title & social preview text | `src/index.html` |
| Colours & fonts (the theme) | `src/styles.scss` (see the `:root` variables at the top) |
| Photos | Put image files in `public/images/`, then reference them as `images/your-photo.jpg` in `site-config.ts` |

### Photos
Drop your images into `public/images/` and set the paths in `site-config.ts`
(e.g. `heroImage: 'images/hero.jpg'`, or each gallery item's `src`).
Any gallery item left with `src: ''` shows a tasteful placeholder tile, so the
site looks finished even before your photos are ready.

### RSVP
The RSVP button links out to a Google Form. Create your form, click **Send →
link**, copy the `https://forms.gle/...` URL, and paste it into
`rsvp.googleFormUrl` in `site-config.ts`.

---

## 💻 2. Run it locally

```bash
npm install      # first time only
npm start        # serves at http://localhost:4200/
```

The page live-reloads as you edit.

---

## 🚀 3. Deploy to GitHub Pages (automatic)

This repo ships with a GitHub Actions workflow
([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) that builds and
publishes the site every time you push to `main`.

**One-time setup:**

1. Create a repository on GitHub and push this project to it:
   ```bash
   git init
   git add .
   git commit -m "Initial wedding site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
2. On GitHub, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.

That's it. Every push to `main` rebuilds and redeploys automatically. Your site
will be live at:

```
https://<your-username>.github.io/<your-repo>/
```

The workflow sets the base path from the repository name automatically, so it
works no matter what you name the repo.

### Custom domain
This site is configured for **www.arianeerodrigo.site**:
- `public/CNAME` holds the domain (published with every deploy, which is what
  tells GitHub Pages to use it).
- The build uses `--base-href "/"` (root of the domain).

For it to resolve, add this DNS record at your domain registrar:

| Type  | Name (host) | Value              |
|-------|-------------|--------------------|
| CNAME | `www`       | `rordigo.github.io` |

(Optional, to also serve the bare `arianeerodrigo.site` and redirect it to
`www`, add four `A` records for the apex pointing to `185.199.108.153`,
`185.199.109.153`, `185.199.110.153`, `185.199.111.153`.)

After DNS propagates, tick **Settings → Pages → Enforce HTTPS**.

### Prefer to deploy by hand?
```bash
npm run build -- --base-href "/<your-repo>/"
# then publish the contents of  dist/wedding-website/browser/
```

---

## 🧰 Tech notes

- Angular 20 (standalone components, signals, `@for`/`@if` control flow)
- Bootstrap 5 + Bootstrap Icons (navbar, grid, accordion)
- Google Fonts: Playfair Display, Lato, Great Vibes
- No backend — 100% static, perfect for GitHub Pages

Built with ❤️.
