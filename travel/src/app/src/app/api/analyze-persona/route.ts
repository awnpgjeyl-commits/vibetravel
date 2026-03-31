import { NextRequest, NextResponse } from 'next/server';
import { llmClient, UserAnswer } from '@/lib/llm';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const answers: UserAnswer[] = body.answers;

    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json(
        { error: 'Invalid request body, answers array is required' },
        { status: 400, headers: corsHeaders }
      );
    }

    const result = await llmClient.analyzePersona(answers);

    const allTags = answers.flatMap(a => a.tags || []);
    const domesticOnly = allTags.includes('domestic-only') || allTags.includes('domestic-priority');
    const internationalOnly = allTags.includes('international-priority');
    const isDomestic = (c?: string) => !!c && /(中国|香港|澳门|台湾)/.test(c);

    let filtered = result.destinations || [];
    if (domesticOnly) {
      filtered = filtered.filter(d => isDomestic(d.country));
    }
    if (internationalOnly) {
      filtered = filtered.filter(d => !isDomestic(d.country));
    }

    if (!filtered.length) {
      filtered = domesticOnly
        ? [
            { name: '成都大熊猫繁育研究基地', country: '中国四川成都', reason: '近距离观赏国宝大熊猫，了解熊猫生活习性。' },
            { name: '杭州西湖断桥残雪', country: '中国浙江杭州', reason: '西湖十景之一，诗意江南。' },
            { name: '重庆洪崖洞', country: '中国重庆', reason: '吊脚楼建筑群，夜景璀璨。' },
            { name: '大理洱海双廊', country: '中国云南大理', reason: '苍山洱海相伴，文艺慢生活。' },
          ]
        : internationalOnly
        ? [
            { name: '巴黎', country: '法国', reason: '浪漫之都，艺术与文化的殿堂。' },
            { name: '东京', country: '日本', reason: '现代与传统交融，美食文化丰富。' },
            { name: '纽约', country: '美国', reason: '多元文化与标志性地标。' },
            { name: '悉尼', country: '澳大利亚', reason: '海港城市，自然与都市结合。' },
          ]
        : result.destinations;
    }

    return NextResponse.json(
      { ...result, destinations: filtered },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}
