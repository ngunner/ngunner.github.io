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
