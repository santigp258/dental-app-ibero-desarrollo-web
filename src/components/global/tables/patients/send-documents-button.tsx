import { Button, SimpleDialog } from '@/components/ui'
import { Send } from 'lucide-react'
import SendDocumentsForm from './send-documents-form'

const UploadDocumentButton = () => {
  return (
    <SimpleDialog
      title="Send Document"
      description="Please select the documents you would like to send."
      trigger={
        <Button leftIcon={<Send className="h-4 w-4" />}>Send document</Button>
      }
    >
      <SendDocumentsForm />
    </SimpleDialog>
  )
}

export default UploadDocumentButton
