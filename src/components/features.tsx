import { Icons } from './icons'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'

const featuresItems = [
  {
    icon: <Icons.nextjs />,
    title: 'Next.js 14',
    description: 'App dir, Routing, Layouts, Loading UI and API routes.',
  },
  {
    icon: <Icons.prisma />,
    title: 'Prisma',
    description: 'ORM using Prisma',
  },
  {
    icon: <Icons.supabase />,
    title: 'Database',
    description: 'Deployed on Supabase.',
  },
  {
    icon: <Icons.tailwindcss />,
    title: 'CSS Framework',
    description: 'UI components styled with Tailwind CSS.',
  },
  {
    icon: <Icons.shadcn />,
    title: 'Components',
    description: 'UI components built using Radix UI and Shadcn',
  },
  {
    icon: <Icons.nextauth />,
    title: 'Authentication',
    description: 'Authentication using NextAuth.js and middlewares.',
  },
]
export function Features() {
  return (
    <>
      {featuresItems.map((feature) => {
        return (
          <Card key={feature.title}>
            <CardHeader className="space-y-2">
              {feature.icon}
              <CardTitle className="font-bold">{feature.title}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {feature.description}
              </CardDescription>
            </CardHeader>
          </Card>
        )
      })}
    </>
  )
}
