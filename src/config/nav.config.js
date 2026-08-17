import { Home, ScrollText, Scale, Wrench, BookOpen } from 'lucide-react';

export const navConfig = {
  items: [
    { id: 'main', label: 'Main', path: '/', icon: Home },
    { id: 'changelogs', label: 'Changelogs', path: '/changelogs', icon: ScrollText },
    { id: 'rules', label: 'Rules', path: '/rules', icon: Scale },
    { id: 'tech', label: 'Tech', path: '/tech', icon: Wrench },
    { id: 'wiki', label: 'Wiki', path: '/wiki', icon: BookOpen },
  ],
  defaultActiveId: 'main'
};
