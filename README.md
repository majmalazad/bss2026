# BSS 2026 workshop website

This is a static website for the **5th International Workshop on Blockchain Security and Scalability (BSS 2026)**, co-located with IEEE Blockchain 2026 in Montbéliard, France.

The site uses plain HTML, CSS and JavaScript. It has no build step, package manager, database, analytics service or third-party JavaScript dependency.

## Production features

- Responsive layout for desktop, tablet and mobile screens
- Accessible keyboard navigation, skip links, visible focus states and reduced-motion support
- Controlled landing-page slideshow with previous, pause/play and next controls
- Optimised WebP slideshow images
- Search and social metadata on every public page
- First-visit cookie notice that only stores the dismissal choice
- Safe external links using `noopener noreferrer`
- Custom favicon, web-app manifest, `robots.txt`, `.nojekyll` and a branded `404.html`
- GitHub Pages-compatible relative paths

## Repository structure

```text
.
├── .nojekyll
├── 404.html
├── README.md
├── call-for-papers.html
├── committee.html
├── index.html
├── previous-editions.html
├── programme.html
├── reviewer.html
├── robots.txt
├── site.webmanifest
├── submission.html
└── assets
    ├── css
    │   └── style.css
    ├── img
    │   ├── slides
    │   └── workshop, committee and affiliation images
    └── js
        └── site.js
```

Keep `index.html` and the `assets` directory at the same repository level. A missing `assets` directory causes the browser to display unstyled HTML and broken images.

## Local preview

Do not rely only on opening `index.html` as a local file. Run a local web server from the repository root:

```bash
python -m http.server 8000
```

Open:

```text
http://localhost:8000/
```

Test the homepage, navigation, slideshow, committee images, EDAS links, cookie notice and mobile menu.

## Deploy to GitHub Pages

1. Extract this package.
2. Upload the **contents** of the extracted directory to the root of your GitHub repository. Do not upload an enclosing folder around the website files.
3. Confirm that GitHub shows both `index.html` and the `assets` directory in the repository root.
4. Open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select the `main` branch and `/(root)` directory.
7. Save the settings and wait for deployment to complete.
8. Perform a hard refresh in your browser after deployment: `Ctrl + F5` on Windows or `Cmd + Shift + R` on macOS.

### Custom domain

If your repository already contains a `CNAME` file, keep it. This package does not include one because the correct domain depends on your deployment.

For a custom domain:

1. Enter the domain in **Settings → Pages → Custom domain**.
2. Allow GitHub to create or update `CNAME`, or create a `CNAME` file containing only the domain name.
3. Configure the required DNS records with your domain provider.
4. Enable **Enforce HTTPS** after GitHub validates the domain.

Do not place a protocol, path or trailing slash in `CNAME`.

## Common deployment problems

### The page appears as plain text with bullet-point navigation

The stylesheet did not load. Check that this exact file exists:

```text
assets/css/style.css
```

Also confirm that the repository contains the full `assets` directory and preserves lowercase filenames.

### Images or the logo do not appear

Check the browser developer tools for `404` responses. File and folder names on GitHub Pages are case-sensitive. For example, `assets/img/bss-logo.svg` differs from `Assets/Img/BSS-Logo.svg`.

### Changes do not appear immediately

Wait for the latest GitHub Pages deployment to finish. Then clear the browser cache or perform a hard refresh.

### The custom domain shows an old version

Confirm that the domain points to the correct GitHub Pages site, that the repository's `CNAME` matches the domain, and that the latest Pages deployment succeeded.

## Content maintenance

### Important dates

Update dates in:

- `index.html`
- `call-for-papers.html`
- `submission.html`
- `programme.html`, once the programme is available

Use valid `<time datetime="YYYY-MM-DD">` values when an exact date exists.

### EDAS submission link

Search the HTML files for:

```text
https://edas.info/newPaper.php?c=35179&track=139226
```

Update all occurrences if the EDAS track changes.

### Committee

Edit `committee.html`. Store approved portraits in `assets/img/`, use short lowercase filenames, and add accurate alternative text.

### Landing-page slideshow

Store slideshow images in `assets/img/slides/`. Use WebP images with a width near 1600 pixels. Add or remove the corresponding `.hero-slide` entries in `index.html`.

### Styling and behaviour

- Edit `assets/css/style.css` for layout and visual changes.
- Edit `assets/js/site.js` for the mobile menu, slideshow, back-to-top button and cookie notice.

## Cookie notice and privacy

The site does not load analytics or advertising scripts. It uses local storage and a first-party cookie only to remember that a visitor dismissed the cookie notice:

- Local-storage key: `bss-cookie-notice-v1`
- Cookie name: `bss_cookie_notice`
- Cookie lifetime: one year

Review this statement before adding analytics, embedded videos, external fonts, maps or other third-party services. Those services may require a fuller consent and privacy process.

## Release checklist

Before publication:

- Confirm the workshop date, venue and conference details.
- Confirm submission deadlines, paper length, review model and publication arrangements.
- Confirm every committee member's role, affiliation, spelling and permission to display their photograph.
- Confirm permission to use all IEEE, institutional, sponsor and venue logos.
- Test all internal pages and external links.
- Test keyboard navigation and mobile presentation.
- Check the browser console for errors and the network panel for missing files.
- Run an accessibility and performance audit, such as Lighthouse, against the deployed site.
- Retain the existing `CNAME` file when deploying to a custom domain.

## Asset and brand notice

IEEE, IEEE Computer Society, IEEE Technical Community on Scalable Computing, Birmingham City University and other third-party names and logos remain the property of their respective owners. Confirm that the workshop has permission to display each logo and photograph before public release.
