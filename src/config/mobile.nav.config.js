import { Home, ScrollText, Scale, Wrench, BookOpen, Menu, Link, GavelIcon } from 'lucide-react';

export const mobileNavConfig = {
  // Main tabs visible on the mobile dock
  mainItems: [
    { id: 'main', label: 'Main', path: '/', icon: Home },
    { id: 'changelogs', label: 'Changelogs', path: '/changelogs', icon: ScrollText },
    { id: 'rules', label: 'Rules', path: '/rules', icon: Scale },
    { id: 'tech', label: 'Tech', path: '/tech', icon: Wrench },
    { id: 'wiki', label: 'Wiki', path: '/wiki', icon: BookOpen },
  ],
  
  // Blacklist to hide specific main items without deleting them (independent of PC)
  blacklist: [
    "changelogs",
    "wiki",
  ],

  // Extra morphing menu feature
  enableMenuButton: true,
  menuIcon: Menu,
  extraMenuItems: [
    { id: 'imprint', label: 'Imprint', path: '/imprint', icon: GavelIcon },
    { id: 'wiki', label: 'Wiki', path: '/wiki', icon: BookOpen },
    { id: 'changelogs', label: 'Changelogs', path: '/changelogs', icon: ScrollText },
  ]
};
