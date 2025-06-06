'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { OAuthButton } from '@/app/(auth)/oauth-button'
import { Card, CardContent } from '@/components/ui/card'

import { LoginForm } from './login-form'

export default function Page() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') ?? ''

  return (
    <>
      <Card className="overflow-hidden">
        <CardContent className="grid gap-y-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Login</h1>
            <p className="text-muted-foreground text-balance">
              Login and start your maths journey
            </p>
          </div>

          <LoginForm email={email} />

          <div>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-card text-muted-foreground relative z-10 px-2">
                Or continue with
              </span>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4">
              <OAuthButton provider="google" intent="login" />
            </div>
          </div>

          <div className="text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{' '}
        <Link href="#">Terms of Service</Link> and{' '}
        <Link href="#">Privacy Policy</Link>.
      </div>
    </>
  )
}
