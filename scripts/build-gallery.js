const fs = require('fs');
const path = require('path');

// Read all briefs from the briefs folder
const briefsDir = path.join(__dirname, '..', 'briefs');
const briefs = [];

if (fs.existsSync(briefsDir)) {
  const files = fs.readdirSync(briefsDir);
  
  files.forEach(file => {
    if (file.endsWith('.json')) {
      const content = fs.readFileSync(path.join(briefsDir, file), 'utf8');
      try {
        const brief = JSON.parse(content);
        briefs.push(brief);
      } catch (e) {
        console.error(`Error parsing ${file}:`, e.message);
      }
    }
  });
}

// Sort by submission date (newest first)
briefs.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

// Generate gallery HTML
const galleryHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Off the Record — d-Briefs Gallery</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f5f5f5;
            line-height: 1.6;
            color: #333;
        }
        
        /* Header */
        header {
            background: white;
            border-bottom: 2px solid #D56C2A;
            padding: 20px 0;
            text-align: center;
        }
        
        .brand-header {
            max-width: 850px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        .brand-name {
            font-size: 32px;
            font-weight: 700;
            color: #D56C2A;
            letter-spacing: 1px;
        }
        
        .brand-name a {
            color: #D56C2A;
            text-decoration: none;
        }
        
        .brand-tagline {
            color: #666;
            font-size: 14px;
            margin-top: 5px;
        }
        
        /* Main Content */
        main {
            max-width: 1000px;
            margin: 0 auto;
            padding: 40px 20px;
        }
        
        .page-title {
            text-align: center;
            color: #D56C2A;
            font-size: 28px;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        
        .page-subtitle {
            text-align: center;
            color: #666;
            font-size: 16px;
            margin-bottom: 40px;
        }
        
        .intro-text {
            text-align: center;
            color: #4a5568;
            font-size: 16px;
            margin-bottom: 40px;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
        }
        
        /* Gallery Grid */
        .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 25px;
            margin-bottom: 40px;
        }
        
        .brief-card {
            background: white;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 25px;
            transition: transform 0.2s, box-shadow 0.2s;
            cursor: pointer;
            text-decoration: none;
            color: inherit;
            display: block;
        }
        
        .brief-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .brief-card .citation {
            font-weight: 600;
            color: #D56C2A;
            font-size: 13px;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .brief-card .case-name {
            font-size: 20px;
            color: #1a202c;
            margin-bottom: 10px;
            font-weight: 600;
        }
        
        .brief-card .court {
            font-size: 14px;
            color: #718096;
            margin-bottom: 15px;
        }
        
        .brief-card .snippet {
            font-size: 14px;
            color: #4a5568;
            line-height: 1.5;
            border-top: 1px solid #e2e8f0;
            padding-top: 15px;
            margin-top: 15px;
        }
        
        .brief-card .author {
            margin-top: 10px;
            font-size: 12px;
            color: #999;
        }
        
        /* CTA Section */
        .cta-section {
            text-align: center;
            padding: 40px 0;
            border-top: 1px solid #ddd;
            margin-top: 20px;
        }
        
        .cta-text {
            color: #4a5568;
            font-size: 16px;
            margin-bottom: 20px;
        }
        
        .cta-button {
            display: inline-block;
            padding: 16px 40px;
            background: #D56C2A;
            color: white;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            border-radius: 4px;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: background 0.2s;
        }
        
        .cta-button:hover {
            background: #a04018;
        }
        
        /* Empty State */
        .empty-state {
            text-align: center;
            padding: 60px 20px;
            color: #666;
        }
        
        /* Footer */
        footer {
            text-align: center;
            padding: 30px 20px;
            color: #718096;
            font-size: 14px;
            border-top: 1px solid #ddd;
            background: white;
        }
        
        footer a {
            color: #D56C2A;
            text-decoration: none;
        }
        
        footer a:hover {
            text-decoration: underline;
        }
        
        /* Responsive */
        @media (max-width: 600px) {
            .gallery-grid {
                grid-template-columns: 1fr;
            }
            
            .page-title {
                font-size: 24px;
            }
        }
    </style>
</head>
<body>
    <header>
        <div class="brand-header">
            <div class="brand-name"><a href="index.html">d-BRIEFS</a></div>
            <p class="brand-tagline">Case Brief Gallery</p>
        </div>
    </header>
    
    <main>
        <h1 class="page-title">Off the Record</h1>
        <p class="page-subtitle">A curated selection from the gallery</p>
        
        <p class="intro-text">
            These briefs represent work-in-progress analyses — the unofficial, working versions 
            that precede polished final products. Click any brief to view the full analysis.
        </p>
        
        ${briefs.length === 0 ? `
        <div class="empty-state">
            <h2>No briefs yet</h2>
            <p>Be the first to submit a case brief!</p>
        </div>
        ` : `
        <div class="gallery-grid">
            ${briefs.map(brief => `
            <a href="briefs/${brief.id}.html" class="brief-card">
                <div class="citation">${brief.citation || 'No citation'}</div>
                <div class="case-name">${brief.caseName}</div>
                <div class="court">${brief.court || 'Unknown court'}</div>
                <div class="snippet">${brief.facts ? brief.facts.substring(0, 150) + (brief.facts.length > 150 ? '...' : '') : 'No facts provided'}</div>
                <div class="author">Briefed by: ${brief.briefedBy}</div>
            </a>
            `).join('')}
        </div>
        `}
        
        <div class="cta-section">
            <p class="cta-text">Ready to create your own case brief?</p>
            <a href="https://reb-elle-art.github.io/casebriefr/template-v2.html" class="cta-button">Create a Brief</a>
        </div>
    </main>
    
    <footer>
        <p>d-Briefs — A gallery for case brief research</p>
        <p>Create briefs at <a href="https://reb-elle-art.github.io/casebriefr/">Casebriefr</a> · Browse them here</p>
        <p style="margin-top: 10px; font-size: 12px;">Data provided by the <a href="https://case.law">Caselaw Access Project</a></p>
    </footer>
</body>
</html>`;

// Write the gallery HTML
fs.writeFileSync(path.join(__dirname, '..', 'gallery.html'), galleryHTML);

// Generate individual brief pages
briefs.forEach(brief => {
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  const renderSection = (title, content) => {
    if (!content || content.trim() === '') return '';
    return `
            <div class="section">
                <div class="section-title">${title}</div>
                <div class="section-content">${content.replace(/\n/g, '<br>')}</div>
            </div>`;
  };
  
  const briefHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${brief.caseName} — d-Briefs</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f5f5f5;
            line-height: 1.6;
            color: #333;
        }
        header {
            background: white;
            border-bottom: 2px solid #D56C2A;
            padding: 20px 0;
            text-align: center;
        }
        .brand-header {
            max-width: 850px;
            margin: 0 auto;
            padding: 0 20px;
        }
        .brand-name {
            font-size: 32px;
            font-weight: 700;
            color: #D56C2A;
            letter-spacing: 1px;
        }
        .brand-name a {
            color: #D56C2A;
            text-decoration: none;
        }
        main {
            max-width: 850px;
            margin: 0 auto;
            padding: 40px 20px;
        }
        .back-link {
            display: inline-block;
            margin-bottom: 20px;
            color: #D56C2A;
            text-decoration: none;
            font-weight: 500;
        }
        .back-link:hover { text-decoration: underline; }
        .brief-container {
            background: white;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 40px;
        }
        .brief-header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #D56C2A;
        }
        .case-name {
            font-size: 24px;
            font-weight: 700;
            color: #1a202c;
            margin-bottom: 10px;
            font-style: italic;
        }
        .case-meta {
            color: #666;
            font-size: 14px;
            margin-bottom: 5px;
        }
        .briefed-by {
            color: #999;
            font-size: 13px;
            font-style: italic;
            margin-top: 10px;
        }
        .section {
            margin-bottom: 25px;
        }
        .section-title {
            font-size: 14px;
            font-weight: 700;
            color: #D56C2A;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 10px;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 5px;
        }
        .section-content {
            font-size: 15px;
            line-height: 1.7;
            color: #4a5568;
        }
        footer {
            text-align: center;
            padding: 30px 20px;
            color: #718096;
            font-size: 14px;
            border-top: 1px solid #ddd;
            background: white;
            margin-top: 40px;
        }
        footer a {
            color: #D56C2A;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <header>
        <div class="brand-header">
            <div class="brand-name"><a href="../index.html">d-BRIEFS</a></div>
        </div>
    </header>
    
    <main>
        <a href="../gallery.html" class="back-link">← Back to Gallery</a>
        
        <div class="brief-container">
            <div class="brief-header">
                <div class="case-name">${brief.caseName}</div>
                <div class="case-meta">${brief.citation || ''}</div>
                <div class="case-meta">${brief.court || ''}${brief.court && brief.dateDecided ? ' | ' : ''}${formatDate(brief.dateDecided)}</div>
                ${brief.judge ? `<div class="case-meta">${brief.judge}</div>` : ''}
                <div class="briefed-by">Briefed by: ${brief.briefedBy}</div>
            </div>
            
            ${renderSection('Facts', brief.facts)}
            ${renderSection('Procedural History', brief.proceduralHistory)}
            ${renderSection('Issues', brief.issues)}
            ${renderSection('Holding', brief.holding)}
            ${renderSection('Rule of Law', brief.rule)}
            ${renderSection('Reasoning / Rationale', brief.reasoning)}
            ${renderSection('Concurring Opinion(s)', brief.concurrence)}
            ${renderSection('Dissenting Opinion(s)', brief.dissent)}
            ${renderSection('Analysis & Significance', brief.significance)}
            ${renderSection('Additional Notes', brief.notes)}
        </div>
    </main>
    
    <footer>
        <p>d-Briefs — A gallery for case brief research</p>
        <p>Create briefs at <a href="https://reb-elle-art.github.io/casebriefr/">Casebriefr</a></p>
    </footer>
</body>
</html>`;
  
  fs.writeFileSync(path.join(__dirname, '..', 'briefs', `${brief.id}.html`), briefHTML);
});

console.log(`Generated gallery with ${briefs.length} briefs`);
console.log(`Created ${briefs.length} individual brief pages`);
