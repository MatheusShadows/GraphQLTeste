

export const resolvers = {
   Query: {
      async getUser(root, {input: { usuario_id }}, { models }) {
         return models.Usuarios.findByPk(usuario_id)
      },
      async getAllUsers(root, args, { models }) {
         return models.Usuarios.findAll()
      },
      async getProduct(root, {input: { produto_id }}, { models }) {
         return models.Produtos.findByPk(produto_id)
      },
      async getAllProducts(root, args, { models }) {
         return models.Produtos.findAll()
      },
   }, Mutation: {
      async createUser(root, {input: { usuario_nome, usuario_email, usuario_senha }}, { models }) {
         console.log(usuario_nome, usuario_email, usuario_senha)
         return models.Usuarios.create({
            usuario_nome,
            usuario_email,
            usuario_senha
         })
      }, 
      async updateUser(root, {input: { usuario_id, usuario_nome=null, usuario_email=null, usuario_senha=null }}, { models }) {
         console.log(usuario_id, usuario_nome, usuario_email, usuario_senha)
         const registro = await models.Usuarios.findOne({where:{usuario_id}})
         await registro.update({
            usuario_id,
            usuario_nome,
            usuario_email,
            usuario_senha
         },
         {
            where: {
               usuario_id
            },
            returning: true,
            plain: true
         })
         return registro
      }, 
      async createProduct(root, { produto_nome, produto_valor, produto_id_externo  }, { models }) {
         return models.Produtos.create({ 
            produto_nome, 
            produto_valor, 
            produto_id_externo
         })
      }
   },
}
