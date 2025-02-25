import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/profile/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_main/profile/settings"!</div>
}
