# VibeTrip 旅行推荐网站开发 Prompt (增强版)

## 项目概述

**项目名称:** VibeTrip
**核心功能:** 旅行人格心理测试与目的地智能推荐

## AI Agent 角色设定

你是一位精通 Next.js 14+ (App Router)、TypeScript、Tailwind CSS、Framer Motion 以及 **灵活集成各类 LLM API** 的全栈开发专家。你擅长开发具有“Vibe”感、视觉冲击力强、交互流畅且高度可配置的现代 Web 应用。你理解用户体验的微妙之处，并能将心理学洞察融入产品设计。

## 任务目标

请协助我开发旅行网站 "VibeTrip" 的核心功能模块——【旅行人格心理测试】。该模块旨在通过一系列深度心理问答，为用户提供个性化的旅行目的地推荐。整个模块包含以下核心部分：

1.  **测试页面 (Frontend):** 承载心理问答流程，具备沉浸式视觉和流畅交互。
2.  **API 接口 (Backend):** 处理用户答案，调用 LLM 进行人格分析和目的地推荐。
3.  **结果展示页 (Frontend):** 优雅地呈现 AI 分析结果和推荐目的地。

**特别强调:** 在关键决策点，你必须主动暂停并向我提问，以确保开发方向符合我的预期，实现“人机协作”的开发模式。

## 技术栈与工具

*   **Framework:** Next.js 14 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Animation:** Framer Motion
*   **Icons:** Lucide React
*   **Image Placeholders:** 使用 `https://source.unsplash.com/featured/?{keyword}` 进行图片占位，例如 `https://source.unsplash.com/800x600/?{city_name}`。
*   **LLM API:** 初始阶段不限定具体 LLM API，需预留接口以便后续灵活切换（例如，从 OpenAI 切换到 Gemini 或其他本地部署模型）。

## 逐步实现指南 (Step-by-Step Implementation Guide)

### 1. 数据结构设计 (Questions & Options)

**要求:** 请在 `src/data/quizQuestions.ts` 文件中定义一个 TypeScript 数组，包含至少 **8 道** 旅行人格心理测试题目。每道题目应包含以下结构：

```typescript
interface QuizQuestion {
  id: string; // 唯一标识符
  question: string; // 问题文本
  options: {
    id: string; // 选项唯一标识符
    text: string; // 选项文本
    tags: string[]; // 关联的旅行偏好标签 (例如: 'adventure', 'relax', 'culture', 'budget', 'social', 'nature', 'urban', 'luxury', 'solo', 'family', 'fast-pace', 'slow-pace', 'foodie', 'art', 'history', 'wellness')
    imageKeyword: string; // 用于 Unsplash 背景图的关键词
  }[];
}

const quizQuestions: QuizQuestion[] = [
  // ... 至少 8 道题目
];
```

**问题示例 (请基于此思路扩展至 8 道以上，并确保覆盖更广的旅行维度):**

1.  **Q1: 想象一下你的理想假期，你最渴望的是什么？**
    *   A. 彻底放松，什么都不做，享受宁静 (Tags: relax, slow-pace, wellness, introverted, comfort, nature, beach) -> imageKeyword: 'relaxing vacation'
    *   B. 探索未知，挑战自我，体验肾上腺素飙升的刺激 (Tags: adventure, fast-pace, challenge, extroverted, thrill, nature, mountain)
    *   C. 沉浸当地文化，与人交流，品尝地道美食 (Tags: culture, social, foodie, learning, urban, history)
    *   D. 艺术与历史的熏陶，参观博物馆和古迹 (Tags: art, history, learning, culture, quiet, urban)

2.  **Q2: 对于旅行预算，你的态度是？**
    *   A. 精打细算，追求性价比，把钱花在刀刃上 (Tags: budget, practical, independent) -> imageKeyword: 'budget travel'
    *   B. 该省省，该花花，体验与舒适并重 (Tags: balanced, comfort, flexible) -> imageKeyword: 'comfortable travel'
    *   C. 享受奢华，追求极致体验，预算不是问题 (Tags: luxury, indulgence, premium, comfort) -> imageKeyword: 'luxury travel'

3.  **Q3: 你更倾向于和谁一起旅行？**
    *   A. 独自一人，享受自由与独处 (Tags: solo, independent, introspective) -> imageKeyword: 'solo traveler'
    *   B. 与伴侣或好友，分享快乐与经历 (Tags: couple, friends, social, shared-experience) -> imageKeyword: 'friends traveling'
    *   C. 全家出游，创造温馨的亲子时光 (Tags: family, group, bonding, child-friendly) -> imageKeyword: 'family vacation'

4.  **Q4: 哪种自然风光最能触动你的心弦？**
    *   A. 阳光普照的沙滩与蔚蓝大海 (Tags: beach, ocean, relax, warm, scenic) -> imageKeyword: 'sunny beach'
    *   B. 壮丽的山脉、森林与湖泊 (Tags: nature, mountain, forest, serene, active) -> imageKeyword: 'mountain landscape'
    *   C. 广袤无垠的沙漠或神秘的峡谷 (Tags: desert, unique-landscape, adventure, quiet) -> imageKeyword: 'desert landscape'
    *   D. 冰雪覆盖的极地风光或北欧峡湾 (Tags: cold, unique-landscape, adventure, scenic) -> imageKeyword: 'arctic landscape'

5.  **Q5: 在旅途中，你对“吃”的优先级是？**
    *   A. 简单果腹即可，不追求特色 (Tags: practical, simple-food) -> imageKeyword: 'simple meal'
    *   B. 尝试当地特色小吃，体验风土人情 (Tags: foodie, local-cuisine, culture, adventurous-eater) -> imageKeyword: 'street food'
    *   C. 寻找米其林餐厅或高级料理，享受美食艺术 (Tags: luxury, gourmet, fine-dining, foodie) -> imageKeyword: 'fine dining'

6.  **Q6: 面对旅行中的突发状况，你的反应是？**
    *   A. 提前规划，尽量避免意外，不喜欢变化 (Tags: planner, cautious, organized) -> imageKeyword: 'travel planning'
    *   B. 随遇而安，灵活应对，享受不确定性 (Tags: flexible, spontaneous, adaptable) -> imageKeyword: 'spontaneous travel'
    *   C. 寻求帮助，相信总有解决办法 (Tags: resourceful, community, problem-solver) -> imageKeyword: 'travel help'

7.  **Q7: 旅行结束后，你最希望带回家的“纪念品”是？**
    *   A. 精美的当地手工艺品或特色商品 (Tags: souvenir, shopping, culture) -> imageKeyword: 'local crafts'
    *   B. 独特的照片和视频，记录美好瞬间 (Tags: photography, memory, visual) -> imageKeyword: 'travel photography'
    *   C. 新的知识、技能或对世界的深刻理解 (Tags: learning, personal-growth, intellectual) -> imageKeyword: 'travel learning'
    *   D. 轻松愉悦的心情和充沛的精力 (Tags: wellness, relaxation, rejuvenation) -> imageKeyword: 'relaxed person'

8.  **Q8: 你对旅行中的“社交”活动持何种态度？**
    *   A. 倾向于独处，避免过多社交 (Tags: introverted, quiet, independent) -> imageKeyword: 'person alone'
    *   B. 乐于结识新朋友，参与当地活动 (Tags: extroverted, social, community, interactive) -> imageKeyword: 'people meeting'
    *   C. 随缘社交，不强求，但也不排斥 (Tags: balanced, flexible-social) -> imageKeyword: 'casual social'

**【人机协作拦截点 1】**
在完成 `src/data/quizQuestions.ts` 文件后，请暂停并向我展示文件内容，并询问：“您对当前设计的 8 道心理测试题目及其选项、标签和图片关键词满意吗？是否需要调整或增加更多维度的问题？”

### 2. 前端开发: 测试页面 (`/quiz` 路由)

**视觉设计:**

*   **全屏沉浸式:** 页面占据整个视口，无滚动条。
*   **背景动态:** 使用当前题目对应的 `option.imageKeyword` 从 Unsplash 获取背景图。图片需添加深色遮罩 (`bg-black/40` 或更深)，确保文字可读性。
*   **问题标题:** 居中显示，使用大号、白色、粗体字体，配合 `Framer Motion` 的淡入动画。
*   **选项卡片:**
    *   布局: 2x2 或 1x4 (根据选项数量自适应，或固定 2x2 布局，不足时居中)。
    *   样式: 采用玻璃拟态 (Glassmorphism) 效果，例如 `backdrop-filter: blur(10px); background-color: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2);`。
    *   交互: Hover 时，卡片应有 `Framer Motion` 的放大 (`scale`) 和边框发光效果。

**交互逻辑:**

*   **状态管理:** 使用 `useState` 管理 `currentQuestionIndex` (当前题目索引) 和 `userAnswers` (用户答案数组，存储 `{ questionId: string, optionId: string, tags: string[] }` 结构)。
*   **题目切换:** 点击选项后，记录答案，并触发 `Framer Motion` 的 `AnimatePresence` 动画。
    *   **动画效果:** 旧题目向左滑出 (`x: -100%`)，新题目从右侧滑入 (`x: 100%`)，动画持续时间约 0.5s，确保流畅。
*   **进度指示:** 可选：在页面底部或顶部添加一个简单的进度条或当前题目/总题目数的显示。
*   **最后一题:** 当用户点击最后一题的选项后，页面应切换至全屏 `Loading` 界面。
    *   **Loading 文案:** "AI 正在分析你的灵魂，寻找最契合的旅行目的地..." (可配合一个简单的加载动画)。
    *   **后续操作:** `Loading` 界面显示期间，前端调用后端 API (`/api/analyze-persona`)。

### 3. 后端开发: API 路由 (`/api/analyze-persona`)

**技术栈:** Next.js API Routes

**逻辑:**

1.  **接收请求:** 接收前端 POST 请求，获取用户答案列表 (结构为 `[{ question: string, answer: string, tags: string[] }]`)。
2.  **LLM 提示词工程 (System Prompt):**
    *   **角色设定:** 你是全球顶尖的旅行心理学家和目的地规划师。你擅长从用户的旅行偏好中洞察其深层人格，并结合全球地理、文化、体验数据，提供独到且精准的旅行目的地推荐。
    *   **指令:** 根据用户提供的旅行问答结果（包含问题、答案及关联标签），深入分析其旅行人格。请严格按照以下 JSON 格式返回结果。推荐目的地应具有多样性，并确保推荐理由具体且吸引人。
    *   **JSON 格式要求:**
        ```json
        {
          "persona_title": "创意人格标题（如：追逐自由的荒野游侠，或：都市脉搏的探索者）",
          "persona_emoji": "一个最能代表该人格的 Emoji 符号",
          "analysis": "结合用户旅行偏好和潜在性格特征的深度分析（中文，150字以内，避免空泛，突出个性）",
          "destinations": [
            { "name": "城市/地点名", "country": "国家", "reason": "为什么这个目的地最适合他/她（中文，50字以内，具体说明与人格的契合点）" },
            { "name": "城市/地点名", "country": "国家", "reason": "..." },
            { "name": "城市/地点名", "country": "国家", 
            { "name": "城市/地点名", "country": "国家", "reason": "..." }
          ]
        }
        ```
    *   **输入示例 (传递给 LLM 的用户答案):**
        ```json
        [
          { "question": "Q1: 想象一下你的理想假期，你最渴望的是什么？", "answer": "A. 彻底放松，什么都不做，享受宁静", "tags": ["relax", "slow-pace", "wellness", "introverted", "comfort", "nature", "beach"] },
          { "question": "Q2: 对于旅行预算，你的态度是？", "answer": "B. 该省省，该花花，体验与舒适并重", "tags": ["balanced", "comfort", "flexible"] },
          // ... 更多答案
        ]
        ```

3.  **LLM 调用:**
    *   **API 抽象:** 创建一个抽象层 (例如 `src/lib/llm.ts`) 来封装 LLM API 的调用逻辑，以便于未来切换不同的 LLM 服务商 (如 OpenAI, Gemini, Claude, 或本地模型)。
    *   **配置:** 使用环境变量 `LLM_API_KEY` 和 `LLM_API_ENDPOINT` (如果需要) 来配置 LLM 服务。
    *   **模型选择:** 初始阶段可使用 `gpt-4o` 或其他性能优异的模型。在抽象层中预留模型切换的配置。

4.  **错误处理与格式校验:**
    *   如果 LLM 返回的 JSON 格式不正确，尝试进行修复 (例如，使用正则表达式提取 JSON 字符串，或再次调用 LLM 并强调格式要求)。
    *   如果修复失败或 LLM 响应异常，返回一个默认的、友好的错误推荐信息给前端。

**【人机协作拦截点 2】**
在完成 `/api/analyze-persona` 接口的初步实现后，请暂停并向我展示关键代码（例如 `api/analyze-persona/route.ts` 和 `lib/llm.ts` 的核心逻辑），并询问：“您对 LLM 提示词工程（System Prompt）和 API 抽象层的设计满意吗？是否需要调整 LLM 的角色设定、指令或 JSON 格式要求？”

### 4. 前端开发: 结果展示页 (在 `/quiz` 路由中状态切换显示)

**视觉设计:**

*   **顶部区域:**
    *   展示 `persona_title` 和 `persona_emoji`，使用大号、醒目的字体，配合 `Framer Motion` 的淡入动画。
    *   Emoji 应居中显示，标题在其下方。
*   **中间区域:**
    *   展示 AI 生成的 `analysis` 文本，使用优雅的排版 (例如，居中对齐，适当的行高和字间距)。
    *   文本内容应有 `Framer Motion` 的逐字或逐句淡入动画，增加阅读的趣味性。
*   **下方区域:**
    *   **推荐目的地卡片:** 使用 `Grid` 布局展示推荐的 3 个目的地。
    *   **卡片内容:**
        *   图片: 使用 `https://source.unsplash.com/800x600/?{destination.name}` 作为背景图，并添加深色遮罩。
        *   文字: 叠加显示城市名 (`name`)、国家 (`country`) 和 AI 推荐理由 (`reason`)。
        *   交互: Hover 时，卡片应有轻微的放大效果，并可考虑显示更多细节。
*   **底部按钮:**
    *   **“重新测试”按钮:** 重置整个测试状态，返回第一题。
    *   **“生成详细行程”按钮:** 暂时显示 `alert('此功能正在开发中，敬请期待！')`。
    *   按钮应有 `Framer Motion` 的点击反馈动画。

### 5. 约束与最佳实践

*   **代码质量:** 代码必须整洁、模块化，组件之间解耦，易于维护和扩展。
*   **性能优化:** 确保动画流畅，不阻塞主线程。合理使用 `React.memo` 和 `useCallback`。
*   **安全性:** LLM API 密钥必须通过环境变量 (`.env.local`) 处理，绝不能硬编码在客户端代码中。
*   **响应式设计:** 页面应在不同设备尺寸下保持良好的视觉和交互体验。
*   **可访问性:** 考虑无障碍设计，确保所有用户都能顺畅使用。

**【人机协作拦截点 3】**
在完成所有前端和后端核心功能开发后，请暂停并向我展示项目的运行效果（例如，提供一个本地运行的预览地址或录制一个简短的 GIF），并询问：“您对当前 VibeTrip 模块的整体功能、视觉效果和交互体验满意吗？是否有任何需要调整或优化的细节？”

## 最终交付

*   一个包含所有源代码的 Next.js 项目文件夹。
*   详细的 `README.md` 文件，包含项目设置、运行指南、环境变量配置说明以及关键设计决策。

这份增强版 Prompt 旨在提供更清晰的指导，同时通过“人机协作拦截点”确保你在开发过程中能及时获得我的反馈，共同打造出最符合预期的产品。现在，请你按照这份 Prompt 开始你的 Vibe Coding 吧！
