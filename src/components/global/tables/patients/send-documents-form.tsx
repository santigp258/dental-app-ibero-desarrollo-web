import { Button, ButtonGroup, Form, useDialog } from '@/components/ui'
import { useForm } from 'react-hook-form'

import { Send } from 'lucide-react'

const SendDocumentsForm = () => {
  const form = useForm()

  const dialog = useDialog()

  const handleSent = () => {
    dialog.confirm(
      'Document Sent',
      'All the documents selected were sent to the employee.',
      {
        cancelBtnContent: 'Close',
      },
    )
  }

  return (
    <Form {...form}>
      <ButtonGroup className="justify-end">
        <Button variant="outline">Cancel</Button>

        <Button rightIcon={<Send className="h-4 w-4" />} onClick={handleSent}>
          Send
        </Button>
      </ButtonGroup>
    </Form>
  )
}

export default SendDocumentsForm
