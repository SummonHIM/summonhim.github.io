<template>
  <navbar>
    <GlobalToolbar class="mx-2 my-2" v-model="menuSelected" :buttons="menuItems" />
  </navbar>

  <div class="container mx-auto">
    <MarkdownRender v-model="tosMarkdown" />
  </div>

  <footer>
    <GlobalFooter />
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import '@/assets/style/icons.css'
import type { GlobalTabbarButtonProps } from '@/components/GlobalToolbar.vue'

defineOptions({
  name: 'PrivacyPolicy',
})

const tosMarkdown = ref(`
## SummonHIM Application Service 隐私政策 (Privacy Policy)

**最后更新日期：2026年6月8日**

本《隐私政策》旨在帮助您了解在您访问 summonhim.top 及使用 SummonHIM Application Service 提供的各项服务（以下简称“本站”）时，我们会收集哪些信息、如何使用这些信息，以及我们如何保护您的隐私。

当您注册或使用本站服务时，即视为您已阅读并同意本隐私政策。

### 1. 我们收集哪些信息

为了维持各项服务的正常运行与安全，我们会收集以下类型的信息：

*   **账户信息：** 当您在本站注册时，我们会收集您的用户名、电子邮件地址以及经过单向加密（Hash）的密码。
*   **连接与日志数据：** 当您访问本站应用（如代理、网盘、游戏服务器等）时，服务器会自动记录系统日志。这些日志可能包括您的 IP 地址、浏览器类型（User-Agent）、访问时间、连接时长及设备信息。
*   **用户生成内容：** 包括您主动存储、上传或发送的数据（例如 Nextcloud 中的文件、Stalwart 收发的邮件、Mastodon 上的发帖、Jellyfin 上的播放记录等）。

### 2. 核心服务的隐私边界声明（重要）

由于本站提供多种不同性质的服务，数据的可见性存在差异，请您务必知晓：

*   **Vaultwarden (密码管理) - 绝对零知识：**
    Vaultwarden 采用端到端加密技术。您的所有密码、笔记均在您的本地设备上使用“主密码”进行加密后才会上传至本站服务器。**服务器管理员绝对无法解密、查看或恢复您的密码库。**
*   **Matrix (加密聊天) - 端到端加密：**
    如果您在 Matrix 启用了端到端加密（E2EE）聊天室，服务器仅负责转发加密的数据包，管理员无法读取您的聊天内容。
*   **Mastodon (社交) & Stalwart (邮件) - 联邦与对外传输：**
    请注意，Mastodon 是去中心化的联邦社交网络，Stalwart 是标准的邮件系统。当您发帖或发邮件给外部用户时，您的数据将被**传输到本站无法控制的其他外部服务器**。此类公开或跨服传输的数据不在本站的隐私保护范围之内。
*   **Nextcloud & FileStash (文件存储)：**
    这些文件以明文（或系统级磁盘加密）形式存储在服务器硬盘上。**原则上，管理员绝不会主动查看或审查您的私人文件。** 但在技术层面上，拥有最高权限的管理员有能力访问这些数据（除非您启用了 Nextcloud 的端到端加密插件或自行压缩加密）。
*   **代理与网络服务 (VPN, DNS, Proxy)：**
    我们会记录网络连接的元数据（如您的IP连接到 VPN 的时间），以防止滥用和排查故障。**我们不记录您的深度网络浏览历史 (DPI) 或 DNS 查询的具体明细（除非在极短期的故障排查期间进行抓包）。**

### 3. 我们如何使用您的信息

我们承诺，收集的信息仅用于以下目的，**绝对不会出售给任何第三方用于商业营销**：
1.  验证您的身份，提供本站各项服务；
2.  监控服务器健康状态，进行故障排查与性能优化（通过 UptimeFlare 等）；
3.  防止服务被滥用（如防止利用 Stalwart 发送垃圾邮件，防止代理被用于网络攻击）；
4.  在遭遇黑客攻击或系统崩溃时，进行数据恢复。

### 4. 信息披露与共享

我们不会主动向任何外部第三方共享您的个人信息，除非出现以下情况：
1.  **法律要求：** 如果遇到所在国家/地区执法机构出具的合法调查请求，且涉及严重违法犯罪行为（如儿童色情、恐怖主义），管理员保留移交相关账号日志及数据的权利。
2.  **保护服务器安全：** 若您的账号涉及严重危害本服务器及网络安全的行为，我们将使用您的数据进行追踪并可能向相关服务商（如云服务器提供商）报告。

### 5. 数据的存储与安全

*   我们已采取合理的基础安全措施（如 HTTPS 加密传输、防暴力破解、数据库权限隔离）来保护您的数据。
*   **免责提示：** 本站系非商业性质平台，虽然我们尽力保护数据安全，但无法提供达到大型商业公司级别（如防范国家级 APT 攻击）的绝对安全保证。如发生不可抗力的服务器入侵事件，我们将尽快告知您，但不承担由此产生的数据泄露赔偿责任。

### 6. 用户权利与账号注销

*   您随时可以登录相关服务自行删除您上传的数据。
*   如果您希望彻底注销您的统一认证账号并删除在此服务器上的所有相关脚印，请通过邮件联系管理员。我们将在技术允许的范围内清理您的相关数据（系统备份日志可能需要一段时间才会覆盖删除）。

### 7. 联系我们

如果您对本《隐私政策》有任何疑问或需要行使您的隐私权利，请联系管理员：
*   联系邮箱：[summonhim@summonhim.top](mailto:summonhim@summonhim.top)
`)

const menuItems: GlobalTabbarButtonProps[] = [
  {
    id: 'back',
    label: '返回',
    icon: 'pi pi-arrow-left',
    hidden: false,
    href: `/`,
  },
  {
    id: 'back-hidden',
    label: '返回',
    icon: 'pi pi-arrow-left',
    hidden: true,
  },
]
const menuSelected = ref<GlobalTabbarButtonProps>(
  menuItems.find((item) => item.id === 'back-hidden')!,
)
</script>
