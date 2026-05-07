import WidthContainer from '@/components/container'
import { TextHeadingLG, TextBody } from '@/components/text'
import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className='border-border bg-background border-b-2 py-8'>
      <WidthContainer>
        <div className='flex flex-row items-center justify-between'>
          <Link href='/'>
            <div className='flex flex-row items-center gap-1'>
              <TextHeadingLG className='text-[18px]'>Sched Buddy</TextHeadingLG>
            </div>
          </Link>

          <div className='flex flex-row gap-4'>
            <TextBody>Link 1</TextBody>
            <TextBody>Link 2</TextBody>
            <TextBody>Link 3</TextBody>
          </div>
        </div>
      </WidthContainer>
    </nav>
  )
}
