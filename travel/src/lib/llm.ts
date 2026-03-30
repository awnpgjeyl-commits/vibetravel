interface LLMResponse {
  persona_title: string;
  persona_emoji: string;
  analysis: string;
  destinations: {
    name: string;
    country: string;
    reason: string;
  }[];
}

interface UserAnswer {
  question: string;
  answer: string;
  tags: string[];
}

class LLMClient {
  private apiKey: string;
  private endpoint: string;
  private model: string;

  constructor() {
    this.apiKey = process.env.LLM_API_KEY || '';
    this.endpoint = process.env.LLM_API_ENDPOINT || 'https://api.openai.com/v1/chat/completions';
    this.model = process.env.LLM_MODEL || 'gpt-4o';
  }

  async analyzePersona(answers: UserAnswer[]): Promise<LLMResponse> {
    try {
      const systemPrompt = `你是全球顶尖的旅行心理学家和目的地规划师。你擅长从用户的旅行偏好中洞察其深层人格，并结合全球地理、文化、体验数据，提供独到且精准的旅行目的地推荐。

根据用户提供的旅行问答结果（包含问题、答案及关联标签），深入分析其旅行人格。请严格按照以下JSON格式返回结果。推荐目的地应具有多样性，并确保推荐理由具体且吸引人。

JSON格式要求：
{
  "persona_title": "创意人格标题（如：追逐自由的荒野游侠，或：都市脉搏的探索者）",
  "persona_emoji": "一个最能代表该人格的Emoji符号",
  "analysis": "结合用户旅行偏好和潜在性格特征的深度分析（中文，150字以内，避免空泛，突出个性）",
  "destinations": [
    { "name": "城市/地点名", "country": "国家", "reason": "为什么这个目的地最适合他/她（中文，50字以内，具体说明与人格的契合点）" },
    { "name": "城市/地点名", "country": "国家", "reason": "..." },
    { "name": "城市/地点名", "country": "国家", "reason": "..." },
    { "name": "城市/地点名", "country": "国家", "reason": "..." }
  ]
}`;

      const userPrompt = JSON.stringify(answers, null, 2);

      if (!this.apiKey) {
        return this.getMockResponse();
      }

      const r = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.7,
        }),
      });
      const data = await r.json();
      const content = data?.choices?.[0]?.message?.content || '';
      const jsonText = this.extractJSON(content);
      const parsed = JSON.parse(jsonText) as LLMResponse;
      return parsed;
    } catch (error) {
      console.error('LLM API error:', error);
      return this.getFallbackResponse();
    }
  }

  private extractJSON(s: string): string {
    const trimmed = s.trim();
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) return trimmed;
    const fence = trimmed.replace(/^```json/i, '').replace(/```$/, '').trim();
    if (fence.startsWith('{') && fence.endsWith('}')) return fence;
    const start = trimmed.indexOf('{');
    const end = trimmed.lastIndexOf('}');
    if (start !== -1 && end !== -1 && end > start) {
      return trimmed.slice(start, end + 1);
    }
    throw new Error('No JSON found in LLM response');
  }

  private getMockResponse(): LLMResponse {
    return {
      persona_title: "自由探索者",
      persona_emoji: "🗺️",
      analysis: "你是一个热爱自由、喜欢探索新事物的旅行者。你享受独立的旅行体验，追求性价比的同时也注重舒适感。你喜欢大自然的美景，尤其是阳光沙滩和山脉森林，也乐于体验当地文化和美食。",
      destinations: [
        {
          name: "巴厘岛",
          country: "印度尼西亚",
          reason: "巴厘岛既有美丽的海滩和自然风光，又有丰富的文化和美食，适合独立旅行者探索，性价比高。"
        },
        {
          name: "丽江",
          country: "中国",
          reason: "丽江古城充满历史文化气息，周边有壮丽的自然风光，适合慢节奏旅行，体验当地生活。"
        },
        {
          name: "清迈",
          country: "泰国",
          reason: "清迈有浓厚的文化氛围，美食众多，消费水平适中，适合自由行探索，体验当地特色。"
        },
        {
          name: "北海道",
          country: "日本",
          reason: "北海道四季风景各异，春季樱花、夏季富良野花海、秋季红叶、冬季雪景，适合深度探索自然之美。"
        }
      ]
    };
  }

  private getFallbackResponse(): LLMResponse {
    return {
      persona_title: "旅行爱好者",
      persona_emoji: "🌍",
      analysis: "你热爱旅行，喜欢探索新的地方和文化。无论目的地如何，你都能找到其中的乐趣和美好。",
      destinations: [
        {
          name: "巴黎",
          country: "法国",
          reason: "浪漫之都，艺术与文化的殿堂，适合各种类型的旅行者。"
        },
        {
          name: "东京",
          country: "日本",
          reason: "现代与传统交融的大都市，美食、购物、文化应有尽有。"
        },
        {
          name: "纽约",
          country: "美国",
          reason: "国际化大都市，多元文化，无数的景点和活动。"
        },
        {
          name: "悉尼",
          country: "澳大利亚",
          reason: "美丽的海港城市，自然风光与都市生活完美结合。"
        }
      ]
    };
  }
}

export const llmClient = new LLMClient();
export type { LLMResponse, UserAnswer };
