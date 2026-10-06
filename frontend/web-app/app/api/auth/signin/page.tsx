import EmptyFilter from '@/app/Components/EmptyFilter';

export default async function Signin({searchParams} : {searchParams: Promise<{callbackUrl?: string}>}) {
  const { callbackUrl } = await searchParams;
  return (
    <EmptyFilter
      title='You need to be logged in to do that'
      subtitle='Please click below to login'
      showLogin={true}
      callbackUrl={callbackUrl}
    />
  )
}
