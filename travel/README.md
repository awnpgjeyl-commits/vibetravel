# VibeTrip 旅行推荐网站

## 项目概述

VibeTrip 是一个基于 Next.js 14+ 的旅行推荐网站，核心功能是通过旅行人格心理测试，为用户提供个性化的旅行目的地推荐。

## 技术栈

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Image Placeholders:** Unsplash API
- **LLM API:** 预留接口，可灵活切换（如 OpenAI, Gemini 等）

## 核心功能

1. **旅行人格心理测试:** 13道深度心理问答，覆盖旅行偏好、预算态度、旅行伙伴、自然风光偏好、饮食态度、应对突发状况的方式、旅行纪念品偏好、社交态度、旅行时长、住宿选择、交通方式、旅行季节和旅行目的等维度。

2. **AI 人格分析:** 调用 LLM 分析用户的旅行偏好，生成个性化的旅行人格分析。

3. **智能目的地推荐:** 根据用户的旅行人格，推荐4个最适合的旅行目的地。

## 项目结构

```
src/
  ├── app/
  │   ├── api/
  │   │   └── analyze-persona/ # 人格分析 API 路由
  │   └── page.tsx            # 测试页面和结果展示
  ├── data/
  │   └── quizQuestions.ts    # 测试题目数据
  ├── lib/
  │   └── llm.ts              # LLM 抽象层
  └── components/             # 组件目录
```

## 环境变量配置

1. 复制 `.env.local.example` 文件并重命名为 `.env.local`
2. 填写以下环境变量：

```
# LLM API Configuration
LLM_API_KEY=your_api_key_here
LLM_API_ENDPOINT=https://api.openai.com/v1/chat/completions
LLM_MODEL=gpt-4o
```

## 安装和运行

### 安装依赖

```bash
npm install
```

### 开发模式运行

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 启动生产服务器

```bash
npm start
```

## 功能说明

1. **测试流程:**
   - 用户进入网站后，将看到一系列旅行相关的问题
   - 每个问题有多个选项，用户选择最符合自己的选项
   - 选择后，页面会平滑过渡到下一个问题
   - 完成所有问题后，系统会显示加载界面，进行 AI 分析

2. **结果展示:**
   - 分析完成后，页面会显示用户的旅行人格类型和分析
   - 同时展示4个推荐的旅行目的地，每个目的地包含名称、国家和推荐理由
   - 用户可以选择重新测试或生成详细行程（此功能待开发）

## 注意事项

- 由于使用了 Unsplash API 获取图片，需要确保网络连接正常
- LLM API 密钥需要在 `.env.local` 文件中正确配置
- 项目使用了 Next.js 14 的 App Router，需要 Node.js 18 或更高版本

## 未来计划

- 实现详细行程生成功能
- 添加用户账号系统，保存测试结果
- 增加更多旅行维度的测试题目
- 优化 LLM 分析算法，提高推荐准确性
- 增加多语言支持