'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Field } from '@/components/ui/field'
import { useScheduleActions } from '@/features/schedule/store/use-schedule-store'
import { CalendarPlusIcon } from 'lucide-react'
import SubjectForm, { Subject } from './subject-form'

function AddSubject() {
  const { addSubject } = useScheduleActions()

  const formId = 'add-subject'
  const defaultValues: Subject = {
    title: '',
    // Add default colors to choose from
    color: '',
    meetings: [
      {
        type: '',
        instructor: '',
        location: '',
        days: [],
        startTime: { hours: 0, minutes: 0, meridiem: 'am' },
        endTime: { hours: 0, minutes: 0, meridiem: 'am' },
      },
    ],
  }

  function onSubmit(data: Subject) {
    console.log('Submitted from <AddSubject/> : ', data)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <CalendarPlusIcon /> Add Subject
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Subject</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <SubjectForm
          formId={formId}
          defaultValues={defaultValues}
          onSubmit={onSubmit}
        />

        <DialogFooter>
          <Field orientation='horizontal'>
            <Button type='submit' form={formId}>
              Confirm
            </Button>
          </Field>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddSubject
