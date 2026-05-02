import { md5 } from 'js-md5'

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
