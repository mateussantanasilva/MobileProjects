import { Link, LinkProps } from 'expo-router'

interface LinkButtonProps extends LinkProps<string> {
  title: string
}

export function LinkButton({ title, ...props }: LinkButtonProps) {
  return (
    <Link className="text-center font-body text-base text-slate-300" {...props}>
      {title}
    </Link>
  )
}
