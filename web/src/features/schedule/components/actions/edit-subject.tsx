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
import { PencilIcon } from 'lucide-react'
import SubjectForm, { SubjectFormValue } from '../subject-form'
import { Field } from '@/components/ui/field'
import { useMemo, useState } from 'react'
import { useScheduleActions } from '../../store/use-schedule-store'
import { Subject } from '../../types'
import {
  subjectFromFormValues,
  subjectToFormValues,
} from '../../lib/subjectMapper'
import SelectSubjectDialogContent from '../select-subject-dialog-content'

function EditSubject() {
  const [open, setOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<null | Subject>(null)
  const { editSubject } = useScheduleActions()

  const formId = 'edit-subject'

  const selectedSubjectFormValues: SubjectFormValue | null = useMemo(() => {
    if (!selectedSubject) return null
    return subjectToFormValues(selectedSubject)
  }, [selectedSubject])

  function onSubmit(data: SubjectFormValue) {
    if (!selectedSubject) return null
    const newSubject = subjectFromFormValues(data, selectedSubject.id)
    editSubject(newSubject)
    setSelectedSubject(null)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <PencilIcon /> Edit Subject
        </Button>
      </DialogTrigger>

      {!selectedSubject && !selectedSubjectFormValues ? (
        <SelectSubjectDialogContent
          onSelect={(s) => setSelectedSubject(s)}
          headerLabel='Select a Subject to Edit'
        />
      ) : (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Subject</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <SubjectForm
            formId={formId}
            defaultValues={selectedSubjectFormValues!}
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
      )}
    </Dialog>
  )
}

export default EditSubject
