import * as openai from './openai';
import * as ollama from './ollama';
import * as jan from './jan';

export type Provider = 'openai' | 'ollama' | 'jan' | 'custom';

interface ProviderSettings {
  provider: Provider;
  api_key: string;
  model_id: string;
  endpoint?: string;
  [key: string]: any;
}

// This function dispatches to the correct provider.
export async function query_chat(settings: ProviderSettings, prompt: Array<{role: string, content: string}>) {
  switch (settings.provider) {
    case 'openai':
      return openai.query_chat(
        prompt,
        settings.api_key,
        settings.model_id,
        settings.max_tokens,
        settings.temperature,
        settings.top_p,
        settings.frequency_penalty,
        settings.presence_penalty,
        undefined // no custom_url for real OpenAI
      );
    case 'ollama':
      return ollama.query_chat(
        prompt,
        settings.model_id,
        settings.endpoint
      );
    case 'jan':
      return jan.query_chat(
        prompt,
        settings.model_id,
        settings.endpoint
      );
    case 'custom':
      return openai.query_chat(
        prompt,
        settings.api_key,
        settings.model_id,
        settings.max_tokens,
        settings.temperature,
        settings.top_p,
        settings.frequency_penalty,
        settings.presence_penalty,
        settings.endpoint // use custom_url
      );
    default:
      throw new Error(`Unknown provider: ${settings.provider}`);
  }
}
