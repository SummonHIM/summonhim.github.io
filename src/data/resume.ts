export type Contact = {
  label: string
  value: string
  href?: string
}

export type SkillGroup = {
  category: string
  items: string[]
}

export type EducationItem = {
  degree: string
  period: string
}

export type ResumeProject = {
  name: string
  description: string
  tech: string[]
}

export type Resume = {
  name: string
  title: string
  contacts: Contact[]
  summary: string
  skills: SkillGroup[]
  education: EducationItem[]
  projects: ResumeProject[]
  evaluation: string[]
}

export const resume: Resume = {
  name: 'SummonHIM',
  title: '运维/DevOps · 后端 · 全栈 实习',
  contacts: [
    {
      label: '邮箱',
      value: 'summonhim@summonhim.top',
      href: 'mailto:summonhim@summonhim.top',
    },
    {
      label: 'GitHub',
      value: 'SummonHIM',
      href: 'https://github.com/SummonHIM',
    },
    {
      label: '个人网站',
      value: 'summonhim.top',
      href: 'https://www.summonhim.top',
    },
  ],
  summary:
    '人工智能方向本科在读，具备嵌入式技术应用背景。独立开发了多个全栈项目（Python/Go/TypeScript/C），涵盖 Web 后端、前端 SPA、系统工具和嵌入式应用。课余独立搭建并维护 4 台服务器共 30+ 自托管服务，具备从应用开发到基础设施运维的完整实践经验。热爱开源，多个项目已在 GitHub 上开源。',
  skills: [
    {
      category: '编程语言',
      items: ['Python', 'Go', 'TypeScript/JavaScript', 'C', 'C#', 'PHP', 'Bash', 'PowerShell'],
    },
    {
      category: '后端框架',
      items: ['Django / DRF', 'Flask', 'Gunicorn'],
    },
    {
      category: '前端框架',
      items: ['Vue 3', 'React / Next.js', 'Vite', 'PrimeVue', 'Vuetify', 'Tailwind CSS', 'Electron'],
    },
    {
      category: '数据库',
      items: ['MySQL', 'MariaDB', 'SQLite', 'Redis', 'Neo4j'],
    },
    {
      category: '运维/DevOps',
      items: ['Docker', 'Linux 服务器管理', 'Caddy/Nginx', 'OPNsense', 'Headscale', 'Grafana', 'n8n'],
    },
    {
      category: '嵌入式',
      items: ['STM32 (HAL)', 'STC8H (C51)', 'Keil'],
    },
    {
      category: '工具链',
      items: ['Git', 'CMake', 'Conan', 'Yarn', 'Playwright', 'CI/CD'],
    },
  ],
  education: [
    { degree: '人工智能（本科，专升本在读）', period: '在读' },
    { degree: '嵌入式技术应用（专科）', period: '已毕业' },
  ],
  projects: [
    {
      name: 'Serenity 订阅管理平台',
      description:
        '多人共享 SaaS 订阅管理平台，独立设计开发全栈系统，集成 OIDC 单点登录、Redis 缓存，一键容器化部署。',
      tech: ['Python', 'Django REST Framework', 'Vue 3', 'MySQL', 'Redis'],
    },
    {
      name: '校园智能服务系统 cciss',
      description:
        '用纯 C 语言从零搭建的校园信息服务系统后端，掌握 HTTP 处理、JWT 认证、密码哈希等底层实现。',
      tech: ['C', 'CMake', 'MariaDB', 'civetweb', 'JWT'],
    },
    {
      name: '校园网自动登录守护进程 gzgspd',
      description:
        '校园网自动登录守护进程，Keep-Alive 心跳 + 指数退避重试，支持 Windows/Linux，开源后被校内同学实际使用。',
      tech: ['Go', 'systray'],
    },
    {
      name: '在线 PDF 提取器 WQPDFExtractor',
      description:
        '在线 PDF 提取器，基于 Playwright 拦截切片图片并拼接为 PDF，支持并行提取与断点续传。',
      tech: ['Python', 'Playwright', 'Pillow'],
    },
    {
      name: 'STM32 多模式智能小车',
      description:
        '基于 STM32F103 的多模式智能小车，实现避障、循迹、串口遥控与 OLED 实时显示。',
      tech: ['C', 'STM32', 'HAL'],
    },
    {
      name: '自建服务器基础设施运维',
      description:
        '独立搭建维护 4 台服务器、30+ 自托管服务，覆盖 Docker、Caddy、OPNsense、Headscale、Grafana 等。',
      tech: ['Docker', 'Caddy', 'OPNsense', 'Headscale', 'Grafana'],
    },
  ],
  evaluation: [
    '具备全栈开发能力，能独立完成从后端 API 设计到前端 UI 实现的完整开发流程',
    '拥有丰富的自建服务与 Linux 服务器运维经验，熟悉容器化部署、网络配置、监控告警等 DevOps 实践',
    '掌握多种编程语言，具有良好的学习能力和技术广度，能快速上手新技术栈',
    '热爱开源，多个项目开源在 GitHub，具备良好的代码规范和文档习惯',
  ],
}
