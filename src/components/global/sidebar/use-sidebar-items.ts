import Link from 'next/link'
import { HomeIcon, LogOut, ShieldPlusIcon, Users } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { SidebarItem } from '@/components/ui'
import { signOut } from 'next-auth/react'
import { useAuth } from '@/hooks/use-auth'

export const useSidebarItems = () => {
  const { user } = useAuth()

  const pathname = usePathname()

  const mapSidebarItem = (item: SidebarItem): SidebarItem => {
    const isCurrent = pathname === item.href

    if ((item.children ?? []).length > 0) {
      return {
        ...item,
        current: isCurrent,
        children: (item.children ?? []).map(mapSidebarItem),
      }
    }

    return { ...item, as: item.as ?? Link, current: isCurrent }
  }

  const items: SidebarItem[] = [
    {
      label: 'Dashboard',
      href: '/',
      icon: HomeIcon,
    },
    {
      label: 'Pacientes',
      icon: Users,
      href: '/patients',
    },
    ...([
      user?.role === 'admin'
        ? {
            label: 'Administración',
            icon: ShieldPlusIcon,
            children: [
              {
                label: 'Pacientes',
                href: '/patients',
              },
              {
                label: 'Usuarios',
                href: '/admin/users',
              },
            ],
          }
        : null,
    ] as SidebarItem[]),

    {
      label: 'Salir',
      href: '/logout',
      icon: LogOut,
      as: 'button',
      onClick() {
        signOut()
      },
      toBottomPosition: true,
    },
  ]
    .filter(Boolean)
    .map(mapSidebarItem)

  return { items }
}
