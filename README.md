# Nicholas Gunner — Personal site

Minimal Eleventy site deployed to GitHub Pages.

## Custom domain setup

1. **Put your domain in the repo**  
   Edit the `CNAME` file in the root: replace `www.yourdomain.com` with your domain (e.g. `www.yoursite.com` or `yoursite.com`). Commit and push. The build copies `CNAME` into the deployed site.

2. **Tell GitHub Pages the domain**  
   On GitHub: **Settings → Pages**. Under “Custom domain”, enter your domain and click **Save**.  
   Optionally enable **Enforce HTTPS** after the domain is verified.

3. **Configure DNS** at your domain registrar or DNS provider.

   **If you use the apex domain (e.g. `yoursite.com`):**

   | Type | Name/Host | Value/Answer        |
   |------|-----------|----------------------|
   | A    | `@`       | `185.199.108.153`   |
   | A    | `@`       | `185.199.109.153`   |
   | A    | `@`       | `185.199.110.153`   |
   | A    | `@`       | `185.199.111.153`   |

   **If you use `www` (e.g. `www.yoursite.com`):**

   | Type  | Name/Host | Value/Answer      |
   |-------|-----------|-------------------|
   | CNAME | `www`     | `ngunner.github.io` |

   **Using both apex and www:**  
   Add the four A records above for the apex and the CNAME for `www`. In GitHub Pages settings you can choose which is primary; GitHub will suggest adding the other as a redirect.

4. **Wait for DNS**  
   Verification can take a few minutes up to 48 hours. When the checkmark appears next to your custom domain in Settings → Pages, the site will be served on your domain. Then you can turn on **Enforce HTTPS** if you want.

## Local development

- `npm install`
- `npm run serve` — dev server with live reload
- `npm run build` — output in `_site/`

## Adding posts

Add a `.md` file in `posts/` with front matter, e.g.:

```yaml
---
title: Your post title
date: 2025-03-15
---
Your content in **Markdown**...
```

## Adding media / press coverage

Append an entry to `_data/media.json`. It renders in the "In the media"
section on the homepage, sorted newest first automatically — so you can add
new entries anywhere in the list.

```json
{
  "title": "Headline of the article",
  "outlet": "Publication name",
  "url": "https://example.com/article",
  "date": "2026-08-31",
  "note": "Optional one-line description. Omit this field to leave it out."
}
```

Only `title`, `outlet`, `url`, and `date` are required. Use `YYYY-MM-DD` for
the date. Links open in a new tab.

## Maintaining the CV

The CV at `/cv/` is rendered by `cv.njk` from `_data/cv.json`. To update it,
edit the JSON (or drop the new information in a Claude Code session and ask for
it to be added) and bump `updated`.

- **Section order** = order in the `sections` array. Empty sections are not
  rendered, so unused ones can stay in the file ready to fill.
- **Item order** within a section is as written — keep newest first.
- `highlight` is the surname to bold in publication author lists.

Section `type`s and their item shape:

| type           | item fields                                                          |
|----------------|----------------------------------------------------------------------|
| `entries`      | `title`, `org`, `location`, `when`, `url`, `details` (list of lines) |
| `publications` | `authors`, `year`, `title`, `venue`, `url`, `status`, `note`         |
| `list`         | plain strings                                                        |
| `media`        | no items — pulls from `_data/media.json` automatically               |

Only `title` (entries) / `authors`, `year`, `title` (publications) are needed;
everything else is optional.

**Plain text vs. HTML:** only `details` lines and publication `authors` are
rendered as HTML (so `<em>` works there). Every other field is escaped, so
write a literal `&` — not `&amp;` — or it will show up on the page as `&amp;`. The page
has print styles, so "Print / save as PDF" in the browser yields a clean PDF.
