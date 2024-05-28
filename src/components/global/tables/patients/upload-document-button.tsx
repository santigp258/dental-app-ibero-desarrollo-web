import { Button, SimpleDialog } from '@//components/ui'
import { UploadCloud } from 'lucide-react'
import * as React from 'react'
import UploadDocumentForm from './upload-document-form'

const UploadDocumentButton = () => {
  return (
    <SimpleDialog
      title="Upload Document"
      trigger={
        <Button
          variant="secondary"
          leftIcon={<UploadCloud className="h-4 w-4" />}
        >
          Upload a Document
        </Button>
      }
    >
      <UploadDocumentForm />
    </SimpleDialog>
  )
}

export default UploadDocumentButton
