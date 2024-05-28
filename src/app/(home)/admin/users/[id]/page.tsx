import UserDetailPage from './user-detail-page'

const UserIdPage = (props: { params: { id: string } }) => {
  return <UserDetailPage userId={props.params.id} />
}

export default UserIdPage
