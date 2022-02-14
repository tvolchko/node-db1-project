const db = require('../../data/db-config');

async function getAll () {
  return db('accounts')
}

async function getById (id) {
  return db('accounts').where({ id: id }).first()
}

async function create(account) {
  let [id] = await db('accounts').insert(account);

  return {
    ...account,
    id: id
  }
}

async function updateById(id, account) {
  await db('accounts').where('id', id).update(account)
  return {
    ...account,
    id: id
  }
}

const deleteById = id => {
 return db('accounts').where('id', id).delete() 
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
