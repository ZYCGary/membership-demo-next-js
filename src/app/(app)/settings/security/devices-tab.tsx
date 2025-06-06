'use client'

import {
  AppWindow,
  Bot,
  Clock,
  Globe,
  Laptop,
  Monitor,
  Smartphone,
  Tablet,
} from 'lucide-react'

import { Loader } from '@/components/loader'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetDeviceList, useRevokeDevice } from '@/hooks/use-api-query'
import { Device } from '@/types'

const DeviceItem = ({ device }: { device: Device }) => {
  const { mutate: revokeDevice, isPending } = useRevokeDevice()

  const getDeviceIcon = () => {
    if (device.is_robot)
      return <Bot className="text-muted-foreground h-4 w-4" />
    switch (device.device_type) {
      case 'desktop':
        return <Monitor className="h-4 w-4" />
      case 'mobile':
        return <Smartphone className="h-4 w-4" />
      case 'tablet':
        return <Tablet className="h-4 w-4" />
      default:
        return <Laptop className="h-4 w-4" />
    }
  }

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {getDeviceIcon()}
            <div>
              <p className="flex items-center gap-2 font-medium">
                {device.is_robot ? (
                  <span className="font-bold">
                    {device.robot_name || 'Unknown Bot'}
                  </span>
                ) : (
                  <span className="font-bold">
                    {device.device_name || 'Unknown Device'}
                  </span>
                )}
                {device.platform && (
                  <span className="text-muted-foreground text-xs">
                    ({device.platform})
                  </span>
                )}
                {device.is_current && (
                  <Badge variant="outline">Current Device</Badge>
                )}
              </p>
            </div>
          </div>
          <div className="text-muted-foreground space-y-1 text-sm">
            {device.browser && (
              <p className="flex items-center gap-1">
                <AppWindow className="h-3 w-3" />
                {device.browser}
              </p>
            )}
            <p className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              {device.ip_address}
            </p>
            <p className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Last active:{' '}
              {device.last_used_at
                ? new Date(device.last_used_at).toLocaleString(undefined, {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })
                : 'Never'}
            </p>
          </div>
        </div>
        {!device.is_current && (
          <Button
            size="sm"
            onClick={() => revokeDevice(device.uuid)}
            disabled={isPending}
          >
            {isPending ? <Loader /> : 'Revoke Access'}
          </Button>
        )}
      </div>
    </div>
  )
}

const DeviceItemSkeleton = () => {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <div>
              <Skeleton className="h-5 w-32" />
            </div>
          </div>
          <div className="space-y-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  )
}

export function DevicesTab() {
  const { data: devices, isLoading } = useGetDeviceList()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Smartphone className="text-muted-foreground h-5 w-5" />
          <CardTitle>Device Management</CardTitle>
        </div>
        <CardDescription>
          Manage devices that have access to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {isLoading ? (
          <>
            <DeviceItemSkeleton />
            <DeviceItemSkeleton />
          </>
        ) : (
          devices?.map((device) => (
            <DeviceItem key={device.uuid} device={device} />
          ))
        )}
      </CardContent>
    </Card>
  )
}
