'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useScheduleActions } from '@/features/schedule/store/use-schedule-store'
import { CalendarPlusIcon } from 'lucide-react'
import SubjectForm, { SubjectFormValue } from '../subject-form'
import { useState } from 'react'
import { subjectFromFormValues } from '../../lib/subjectMapper'

function AddSubject() {
  const [open, setOpen] = useState(false)
  const { addSubject } = useScheduleActions()

  const formId = 'add-subject'

  function onSubmit(data: SubjectFormValue) {
    const newSubject = subjectFromFormValues(data)

    /* Persist subject */
    addSubject(newSubject)

    /* Programmatically close dialog on success */
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <CalendarPlusIcon /> Add Subject
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        {/* <DialogContent showCloseButton={false} className='h-screen !max-w-screen'> */}
        <DialogHeader>
          <DialogTitle>Add Subject</DialogTitle>
          <DialogDescription>Adds a subject to the timetable</DialogDescription>
        </DialogHeader>

        <SubjectForm formId={formId} onSubmit={onSubmit} />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button type='submit' form={formId}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddSubject
