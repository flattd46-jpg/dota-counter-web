import { Module, Store, schema, ObjectId } from 'modelence/server';

export const dbDrafts = new Store('drafts', {
  schema: {
    name: schema.string(),
    allies: schema.array(schema.string()),
    enemies: schema.array(schema.string()),
    userId: schema.userId(),
    updatedAt: schema.date(),
  },
  indexes: [{ key: { userId: 1 } }],
});

export default new Module('drafts', {
  stores: [dbDrafts],

  queries: {
    async list({}, { user }) {
      if (!user) return [];
      const docs = await dbDrafts.fetch(
        { userId: user.id },
        { sort: { updatedAt: -1 } }
      );
      return docs.map((doc) => ({
        id: doc._id.toString(),
        name: doc.name,
        allies: doc.allies,
        enemies: doc.enemies,
        updatedAt: doc.updatedAt.toISOString(),
      }));
    },
  },

  mutations: {
    async save({ name, allies, enemies }, { user }) {
      if (!user) throw new Error('Требуется вход в аккаунт');
      if (!Array.isArray(allies) || !Array.isArray(enemies)) {
        throw new Error('Некорректный состав драфта');
      }
      const { insertedId } = await dbDrafts.insertOne({
        name: String(name),
        allies: allies.slice(0, 5),
        enemies: enemies.slice(0, 5),
        userId: user.id,
        updatedAt: new Date(),
      });
      return insertedId.toString();
    },

    async remove({ id }, { user }) {
      if (!user) throw new Error('Требуется вход в аккаунт');
      await dbDrafts.deleteOne({ _id: new ObjectId(id), userId: user.id });
      return true;
    },
  },
});
