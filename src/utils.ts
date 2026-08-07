import { md5 } from 'js-md5'
import type { Router } from 'vue-router'

/**
 * 智能返回：
 * - 若是从其他网站跳转进来的（referrer 跨域），调用 history.back() 返回来源网站
 * - 否则（站内跳转或直接访问），返回首页 /
 * @param router - vue-router 实例
 */
export function smartBack(router: Router): void {
  const ref = document.referrer
  let fromExternal = false
  if (ref) {
    try {
      fromExternal = new URL(ref).origin !== window.location.origin
    } catch {
      fromExternal = false
    }
  }

  if (fromExternal) {
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
