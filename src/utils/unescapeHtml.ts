let entityMap: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&#x2F;': '/',
    '&#x60;': '`',
    '&#x3D;': '=',
    '&#8230;': '...',
    '&rsquo;': "'",
    "&#8217;": "'"
};

export function unescapeHtml(input: string): string {
    return String(input).replace(/&amp;|&lt;|&gt;|&quot;|&#39;|&#x2F;|&#x60;|&#x3D;|&#8230;|&rsquo;|&#8217;/g, function (s) {
        return entityMap[s];
    });
}