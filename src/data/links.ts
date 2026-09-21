export type Link = {
  label: string;
  value: string;
  href?: string;
};

export const links: Link[] = [
  {
    label: '邮箱',
    value: 'summonhim@summonhim.top',
    href: 'mailto:summonhim@summonhim.top',
  },
  {
    label: 'Matrix',
    value: '@summonhim:matrix.summonhim.top',
    href: 'https://matrix.to/#/@summonhim:matrix.summonhim.top',
  },
  {
    label: 'QQ',
    value: 'SummonHIM',
    href: 'https://qm.qq.com/q/lYZ8auKT72',
  },
  {
    label: 'Telegram',
    value: 'SummonHIM',
    href: 'https://t.me/SummonHIM',
  },
  {
    label: 'GitHub',
    value: 'SummonHIM',
    href: 'https://github.com/SummonHIM',
  },
  {
    label: 'Steam',
    value: 'SummonHIM',
    href: 'https://steamcommunity.com/id/SummonHIM',
  },
  {
    label: 'BiliBili',
    value: 'SummonHIM',
    href: 'https://space.bilibili.com/21899295',
  },
];

export const authentikUrl = 'https://auth.summonhim.top:2053/';
