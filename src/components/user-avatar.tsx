import { AvatarProps } from '@radix-ui/react-avatar'
import Image from 'next/image'
import { User } from 'next-auth'

import { Avatar, AvatarFallback } from './ui/avatar'

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, 'name' | 'image'>
}
export function UserAvatar({ user }: UserAvatarProps) {
  return (
    <Avatar className="size-8">
      {user.image ? (
        <div className="relative aspect-square h-full w-full">
          <Image
            src={user.image}
            alt="profile picture"
            referrerPolicy="no-referrer"
            width={40}
            height={40}
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.name}</span>
        </AvatarFallback>
      )}
    </Avatar>
  )
}
