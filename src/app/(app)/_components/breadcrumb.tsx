'use client'

import { LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'

import {
  Breadcrumb as BreadcrumbComponent,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useIsMobile } from '@/hooks/use-mobile'

export type BreadcrumbItem = {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = !useIsMobile()

  if (items.length === 0) return null

  // Show ellipsis if we have more than 2 items (not counting home)
  const shouldShowEllipsis = items.length > 2
  // Get the last two items
  const lastTwoItems = items.slice(-2)
  // Get all items except the last two for the ellipsis menu
  const hiddenItems = shouldShowEllipsis ? items.slice(0, -2) : []

  return (
    <BreadcrumbComponent>
      <BreadcrumbList>
        {/* Home item */}
        <BreadcrumbItem>
          <Link href="/dashboard">
            <LayoutDashboard className="h-4 w-4" />
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {/* Ellipsis for hidden items */}
        {shouldShowEllipsis && (
          <>
            <BreadcrumbItem>
              {isDesktop ? (
                <DropdownMenu open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger
                    className="flex items-center gap-1"
                    aria-label="Toggle menu"
                  >
                    <BreadcrumbEllipsis className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {hiddenItems.map((item, index) => (
                      <DropdownMenuItem key={index}>
                        <Link href={item.href ? item.href : '#'}>
                          {item.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Drawer open={open} onOpenChange={setOpen}>
                  <DrawerTrigger className="flex items-center gap-1">
                    <BreadcrumbEllipsis className="h-4 w-4" />
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader className="text-left">
                      <DrawerTitle>Navigate to</DrawerTitle>
                      <DrawerDescription>
                        Select a page to navigate to.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="grid gap-1 px-4">
                      {hiddenItems.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href ? item.href : '#'}
                          className="py-1 text-sm"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                    <DrawerFooter className="pt-4">
                      <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              )}
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}

        {/* Last two items */}
        {lastTwoItems.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {item.href ? (
                  <BreadcrumbLink
                    asChild
                    className="max-w-20 truncate md:max-w-none"
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="max-w-20 truncate md:max-w-none">
                    {item.label}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </BreadcrumbComponent>
  )
}
