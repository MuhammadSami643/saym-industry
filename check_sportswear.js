async function run() {
  const res = await fetch('https://zypfit.com/sportswear-manufacturer-exporter', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const html = await res.text();
  const styles = html.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  console.log('=== CSS ===\n', styles ? styles[1] : 'none');
  
  const sectionRegex = /<section[\s\S]*?<\/section>/gi;
  const sections = html.match(sectionRegex) || [];
  console.log('\n=== SECTIONS ===', sections.length);
  sections.forEach((sec, i) => {
    const h1 = sec.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const h2 = sec.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
    const cls = sec.match(/class=["']([^"']*)["']/i);
    console.log(`Section ${i+1} [${cls ? cls[1] : ''}]:`, h1 ? 'H1: ' + h1[1].replace(/<[^>]+>/g,'').trim() : (h2 ? 'H2: ' + h2[1].replace(/<[^>]+>/g,'').trim() : 'no header'));
  });
}
run();
