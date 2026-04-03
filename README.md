Syncra TechX Website
====================

SyncraTechX is a static marketing website for an enterprise-focused IT services firm. The project now runs entirely on HTML, CSS, and JavaScript, so it can be opened directly in a browser or deployed to any static hosting platform.

Project Structure
-----------------

- `index.html` - home page
- `about.html` - about page
- `contact.html` - contact page
- `404.html` - not found page
- `500.html` - generic error page
- `static/`
  - `css/style.css` - responsive styles and animations
  - `js/layout.js` - shared header, footer, and mobile CTA injection
  - `js/script.js` - navbar behavior, smooth scrolling, stats counter, cursor blob, and AOS initialization
  - `images/logo.png` - Syncra TechX logo

Key Features
------------

- Mobile-first responsive layout with CSS Grid and modern breakpoints
- Animated hero sections, cards, and scrolling reveals
- Shared site chrome generated with vanilla JavaScript
- No backend runtime or package installation required
- Contact flow routed through an external Google Form

Getting Started
---------------

1. Open the `syncratechx-website-main` folder.
2. Launch `index.html` in your browser.

For the best local experience, you can also serve the folder with any lightweight static server, but it is not required.

Deployment
----------

This site can be deployed on any static hosting provider, including GitHub Pages, Netlify, Vercel static hosting, Cloudflare Pages, or a simple web server.

Upload the contents of the project folder and make sure `index.html` is the default entry file.

Notes
-----

- Shared navigation and footer markup lives in `static/js/layout.js`.
- Frontend behaviors are initialized from `static/js/script.js`.
- There is no Python, Flask, or server-side form handling in this project anymore.
