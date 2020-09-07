import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Comments extends BaseSchema {
  protected tableName = 'comments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('body').notNullable()
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users')
      table.integer('post_id').notNullable().unsigned().references('id').inTable('posts')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
