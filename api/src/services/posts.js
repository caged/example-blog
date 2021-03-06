import { UserInputError } from '@hammerframework/api'
import { Photon } from '@prisma/photon'

const photon = new Photon()

const validate = (input) => {
  if (input.slug && !input.slug.match(/^\S+$/)) {
    throw new UserInputError("Can't create new post", {
      messages: {
        slug: ['contains invalid characters (no spaces allowed)'],
      },
    })
  }
}

const Posts = {
  allPosts: async ({ page = 1, limit = 100, order = { postedAt: 'desc' } }) => {
    const offset = (page - 1) * limit

    return {
      posts: photon.posts.findMany({
        include: { tags: true },
        first: limit,
        skip: offset,
        orderBy: order,
      }),
      count: photon.posts.count(),
    }
  },

  findPostById: ({ id }) => {
    return photon.posts.findOne({
      where: { id: parseInt(id) },
      include: { tags: true },
    })
  },

  findPostBySlug: ({ slug }) => {
    return photon.posts.findOne({
      where: { slug: slug },
      include: { tags: true },
    })
  },

  findPostsByTag: ({ tag }) => {
    return photon.tags
      .findOne({
        where: { name: tag },
      })
      .posts({ include: { tags: true } })
  },

  searchPosts: ({ term }) => {
    return photon.posts.findMany({
      where: {
        OR: [{ title: { contains: term } }, { body: { contains: term } }],
      },
      include: { tags: true },
    })
  },

  postsCount: ({ page }) => {
    return photon.posts.count().then((count) => ({ count }))
  },

  createPost: ({ input }) => {
    validate(input)
    return photon.posts.create({ data: input })
  },

  updatePost: ({ id, input }) => {
    validate(input)
    return photon.posts.update({ data: input, where: { id: parseInt(id) } })
  },

  hidePost: ({ id }) => {
    return photon.posts.update({
      data: { postedAt: null },
      where: { id: parseInt(id) },
    })
  },

  deletePost: ({ id }) => {
    return photon.posts.delete({
      where: { id: parseInt(id) },
    })
  },
}

export default Posts
