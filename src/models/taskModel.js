const { Model } = require('objection');

// chua using, de san de sau nay gan vao cho de
class Task extends Model {
    static get tableName() {
        return 'tasks';
    }
    static get relationMappings() {
        return {
            idea: {
                relation: Model.BelongsToOneRelation,
                modelClass: Idea,
                join: {
                    from: 'tasks.userid',
                    to: 'users.id'
                }
            }
        }
    }
}

module.exports = Task;