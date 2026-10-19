from pathlib import Path
from html.parser import HTMLParser
import json, re, sys

root = Path(__file__).parent

class Refs(HTMLParser):
    def __init__(self):
        super().__init__(); self.refs=[]
    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            if key in {'src','href'} and value and not value.startswith(('#','http://','https://','mailto:','tel:')):
                self.refs.append(value)

parser=Refs(); parser.feed((root/'index.html').read_text(encoding='utf-8'))
missing=[ref for ref in parser.refs if not (root/ref).exists()]
runtime=[]
# Source links in content.js are editorial evidence, not runtime dependencies/assets.
for name in ('index.html','styles.css','app.js'):
    runtime += re.findall(r'https?://[^\s\"\')]+', (root/name).read_text(encoding='utf-8'))
logo=(root/'assets'/'portal-sulma-logo-sanitized.svg').read_text(encoding='utf-8')
checks={
    'local_refs': parser.refs,
    'missing_refs': missing,
    'external_runtime_urls': sorted(set(runtime)),
    'logo_viewbox_covers_full_wordmark': 'viewBox="20 430 1390 575"' in logo,
    'three_layouts_present': all(x in (root/'styles.css').read_text(encoding='utf-8') for x in ['data-layout="pulse"','data-layout="ledger"','data-layout="horizon"']),
    'four_story_ids_present': all(x in (root/'content.js').read_text(encoding='utf-8') for x in ['RADAR-MA-2026-10-12-01','RADAR-MA-2026-10-12-06','RADAR-MA-2026-10-12-08','RADAR-MA-2026-10-12-09']),
    'publication_locks': (root/'content.js').read_text(encoding='utf-8').count('publicationAuthorized: false') == 4,
}
print(json.dumps(checks, ensure_ascii=False, indent=2))
failed=missing or runtime or not all(value for key,value in checks.items() if key not in {'local_refs','missing_refs','external_runtime_urls'})
sys.exit(1 if failed else 0)
