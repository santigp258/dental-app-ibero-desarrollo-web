import UserDetailPage from './patient-detail-page'

const UserIdPage = (props: { params: { id: string } }) => {
  return <UserDetailPage patientId={props.params.id} />
}

export default UserIdPage
