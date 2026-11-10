const fs = require('fs');
const html = fs.readFileSync('zypfit_about.html', 'utf8');

// extract <style> blocks specific to about or classes
const styles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(m => m[1]);
console.log('Number of style tags:', styles.length);
if (styles.length) {
  fs.writeFileSync('about_styles.css', styles.join('\n\n'));
  console.log('Saved about_styles.css');
}

// Check main content
const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
if (mainMatch) {
  fs.writeFileSync('about_main.html', mainMatch[1]);
  console.log('Saved about_main.html (size:', mainMatch[1].length, ')');
}

