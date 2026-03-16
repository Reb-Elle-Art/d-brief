---
type: process
created: 2026-03-14
modified: 2026-03-14
project: d-briefs
---

# d-Briefs — Process Documentation

*Case brief gallery and legal research output repository*

---

## Overview

**Purpose:** Host and display generated case briefs in a searchable, browsable gallery format

**Current Site:** https://d-briefs.com (GitHub Pages)

**Repository:** `d-brief` (GitHub Pages enabled)

---

## File Organization

### Root Directory
- `index.html` — Main gallery page with search/filter
- `gallery.html` — Alternative gallery view
- `CNAME` — Custom domain configuration (`d-briefs.com`)
- `_PROCESS.md` — This file

### Brief Storage
Case briefs are stored as individual HTML files in the root:
- Format: `YYYY-MM-DD_Case-Name.html`
- Example: `2026-03-10_Smith-v-Jones.html`

### Assets
- `assets/` — CSS, JavaScript, images
- `css/` — Stylesheet files
- `js/` — JavaScript files

---

## Adding New Briefs

### Method 1: Direct Upload
1. Generate case brief using CAP system
2. Save as HTML file with naming convention: `YYYY-MM-DD_Case-Name.html`
3. Add to repository root
4. Commit and push to GitHub
5. Site updates automatically (GitHub Pages)

### Method 2: Auto-Brief Workflow
When using the `AB:` command:
1. Case is fetched from CAP
2. Brief template is generated
3. File is saved to `d-briefs/` directory
4. GitHub commit/push (requires confirmation)
5. Site updates automatically

---

## Naming Convention

**Format:** `YYYY-MM-DD_Case-Name.html`

**Examples:**
- `2026-03-10_Smith-v-Jones.html`
- `2026-03-11_State-v-Commonwealth.html`
- `2026-03-12_In-re-Estate-of-Doe.html`

**Rules:**
- Use YYYY-MM-DD date format
- Replace spaces with hyphens
- Remove special characters
- Use title case for case names

---

## Website Structure

### index.html
- Search bar for case name/citation
- Filter by jurisdiction
- Filter by date range
- Grid/list view toggle
- Brief cards with preview

### gallery.html
- Full-page gallery view
- Larger preview cards
- Category filtering
- Sort options (date, name, jurisdiction)

---

## GitHub Pages Configuration

**Settings:**
- Source: Deploy from branch
- Branch: `main` / `root`
- Custom domain: `d-briefs.com`
- Enforce HTTPS: Enabled

**CNAME File:**
```
d-briefs.com
```

---

## Integration with CAP System

**Source:** Harvard Caselaw Access Project (CAP)

**Workflow:**
1. User provides citation: `AB: 393 Mass. 564`
2. CAP system fetches case metadata and text
3. Brief template is auto-generated
4. Output saved to `d-briefs/YYYY-MM-DD_Case-Name.html`
5. Index is updated
6. GitHub commit/push

**See Also:**
- `p-casebriefr/_PROCESS.md` — CAP system documentation
- `p-casebriefr/CAP_SYSTEM.md` — Full CAP integration details

---

## Maintenance

### Regular Tasks
- [ ] Verify all briefs display correctly
- [ ] Check search functionality
- [ ] Test mobile responsiveness
- [ ] Update index when new briefs added

### Periodic Review
- [ ] Review brief quality
- [ ] Update styling if needed
- [ ] Check GitHub Pages build status
- [ ] Verify custom domain SSL certificate

---

## Related Files

| File | Purpose |
|------|---------|
| `p-casebriefr/_PROCESS.md` | CAP system workflow |
| `p-casebriefr/CAP_SYSTEM.md` | CAP integration details |
| `TOOLS.md` | GitHub credentials and setup |

---

*Process Document Created: March 14, 2026*  
*Version: 1.0*
