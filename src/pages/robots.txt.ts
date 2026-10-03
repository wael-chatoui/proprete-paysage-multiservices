import type { APIRoute } from 'astro';
import { SITE_URL } from '../data/business';

// Tout est autorisé, y compris les robots des moteurs IA : l'objectif est d'être cité.
// Attention : chez Cloudflare, les robots IA sont bloqués par défaut sur les nouveaux domaines.
export const GET: APIRoute = () => {
  const corps = `# Propreté Paysage Multiservice
User-agent: *
Allow: /

# Moteurs de recherche
User-agent: Googlebot
User-agent: Bingbot
User-agent: Applebot
User-agent: DuckDuckBot
Allow: /

# Recherche et consultation par les assistants IA
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: Claude-SearchBot
User-agent: Claude-User
User-agent: PerplexityBot
User-agent: Perplexity-User
User-agent: DuckAssistBot
User-agent: MistralAI-User
Allow: /

# Entraînement des modèles : autorisé pour que l'entreprise soit connue des assistants
User-agent: GPTBot
User-agent: ClaudeBot
User-agent: Google-Extended
User-agent: Applebot-Extended
User-agent: CCBot
Allow: /

Sitemap: ${SITE_URL}/sitemap-index.xml
`;
  return new Response(corps, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
