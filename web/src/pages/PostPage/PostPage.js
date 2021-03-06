import BlogLayout from 'src/layouts/BlogLayout'

import { useParams } from '@hammerframework/router'
import SinglePostCell from 'src/components/Blog/SinglePostCell'

const PostPage = () => {
  const { slug } = useParams()
  return (
    <BlogLayout>
      <SinglePostCell slug={slug} />
    </BlogLayout>
  )
}

export default PostPage
