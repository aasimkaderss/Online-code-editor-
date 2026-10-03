# Online Code Editor with Live Preview

## Internship Project
A browser-based IDE for HTML, CSS and JavaScript with instant preview.

### Features
- Monaco code editor
- Separate HTML, CSS and JavaScript tabs
- Instant live preview using a sandboxed iframe
- Starter and Profile Card templates
- Reset, theme toggle and share-link generation
- Responsive interface

### Technology
React, Vite, Monaco Editor, HTML, CSS, JavaScript.

### Run
```bash
npm install
npm run dev
```
Open the local URL shown by Vite.

### Project flow
1. User selects a language tab.
2. User edits code in Monaco Editor.
3. React state stores the latest HTML/CSS/JS.
4. The code is combined into an HTML document.
5. The document is rendered in a sandboxed iframe.
6. Template, reset, theme and share controls improve usability.
