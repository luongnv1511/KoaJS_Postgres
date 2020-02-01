const { Model } = require('objection');

// chua using, de san de sau nay gan vao cho de
class User extends Model {
    static get tableName() {
        return 'users';
    }
    static get relationMappings() {
        return {
            Task: {
                relation: Model.HasManyRelation,
                modelClass: Comment,
                join: {
                    from: 'users.id',
                    to: 'tasks.userid'
                }
            }
        }
    }
}

module.exports = User;