import BlogLayout from 'src/layouts/BlogLayout'

import { useParams } from '@hammerframework/router'
import TaggedPostsCell from 'src/components/Blog/TaggedPostsCell'

const TaggedPostsPage = () => {
  const { tag } = useParams()

  return (
    <BlogLayout>
      <TaggedPostsCell tag={tag} />
    </BlogLayout>
  )
}

export default TaggedPostsPage
