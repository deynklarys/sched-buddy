import { cn } from '@/lib/utils'
import { ComponentClassNameAndChildrenProp } from '@/types'

/*
Minor Third is used
*/

export const textDisplayClassNames =
  'font-heading text-foreground text-[64px] leading-[110%] font-[700] tracking-[-0.5px]'
export const TextDisplay = ({
  className,
  children,
  ...props
}: ComponentClassNameAndChildrenProp &
  React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h1 {...props} className={cn(textDisplayClassNames, className)}>
      {children}
    </h1>
  )
}

export const textHeadingClassNames =
  'font-heading text-foreground text-[28px] leading-[130%] font-[600] tracking-[-0.2px]'
export const TextHeading = ({
  className,
  children,
  ...props
}: ComponentClassNameAndChildrenProp &
  React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h1 {...props} className={cn(textHeadingClassNames, className)}>
      {children}
    </h1>
  )
}

export const textBodyClassNames =
  'font-body text-foreground text-[18px] leading-[160%] font-[400] tracking-[-0.0px]'
export const TextBody = ({
  className,
  children,
  ...props
}: ComponentClassNameAndChildrenProp &
  React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p {...props} className={cn(textBodyClassNames, className)}>
      {children}
    </p>
  )
}

export const textSubClassNames =
  'font-body text-foreground text-[13px] leading-[140%] font-[500] tracking-[0.1px]'
export const TextSub = ({
  className,
  children,
  ...props
}: ComponentClassNameAndChildrenProp &
  React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p {...props} className={cn(textSubClassNames, className)}>
      {children}
    </p>
  )
}
