import { md5 } from 'js-md5'
import type { Router } from 'vue-router'

/**
 * 智能返回：
 * - 若是从其他网站跳转进来的（浏览器有历史但无站内上一页），调用 history.back() 返回来源网站
 * - 否则（站内跳转或直接访问），返回首页 /
 *
 * 不依赖 document.referrer（外站常带 no-referrer 策略导致其为空），
 * 而是用 vue-router 写入 history.state.back 的站内上一页标记来判断。
 * @param router - vue-router 实例
 */
export function smartBack(router: Router): void {
  const state = window.history.state as { back?: string | null } | null
  const hasInternalBack = state?.back != null

  // 站内有上一页 → 属于站内跳转，回首页
  if (hasInternalBack) {
    router.push('/')
    return
  }

  // 没有站内上一页：浏览器历史栈还有条目说明是外站同标签跳转进来的，返回来源网站；
  // 否则（新标签 / 地址栏直接打开）回首页。
  if (window.history.length > 1) {
    window.history.back()
  } else {
    router.push('/')
  }
}

/**
 * 根据邮箱地址生成 Gravatar 头像链接
 * @param email - 邮箱地址
 * @param size - 头像尺寸（默认 256）
 * @param defaultImage - 默认头像类型（如 'identicon', 'monsterid', 'wavatar', 'retro', 'robohash', '404'）
 * @returns Gravatar 头像 URL
 */
export function getGravatarUrl(
  email: string,
  size: number = 256,
  defaultImage: string = 'identicon',
): string {
  const trimmedEmail = email.trim().toLowerCase()
  const hash = md5(trimmedEmail)
  return `https://seccdn.libravatar.org/avatar/${hash}?s=${size}&d=${defaultImage}`
}
