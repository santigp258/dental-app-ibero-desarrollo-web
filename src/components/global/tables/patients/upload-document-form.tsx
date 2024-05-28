import {
  Button,
  ButtonGroup,
  Form,
  InputField,
  InputGroup,
} from '@/components/ui'
import { useForm } from 'react-hook-form'

const UploadDocumentForm = () => {
  const form = useForm()
  return (
    <Form {...form}>
      <InputGroup className="lg:grid-cols-1">
        <InputField name="document_name" />
      </InputGroup>

      <ButtonGroup className="justify-end">
        <Button variant="outline">Cancel</Button>

        <Button>Submit</Button>
      </ButtonGroup>
    </Form>
  )
}

export default UploadDocumentForm
