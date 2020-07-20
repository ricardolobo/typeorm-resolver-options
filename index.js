const typeorm = require('typeorm')

/** creates typeorm options object from graphql resolver args and info*/
function buildOptions(args) {
    // settings
    let specialArgs = ['search', 'page', 'pageSize', 'order']
    let searchField = 'description'

    // pagination
    let pageSize = args && args.pageSize || 25
    let page = args && args.page || 1

    // search & filter
    let where = {}

    // search
    if (args.search) {
        const search = '%' + args.search + '%';
        where[searchField] = typeorm.Raw(alias => `${alias} ILIKE '${search}' `)
    }

    // ordering
    let order = { id: 'ASC' }

    if (args.order) {
        order = { [args.order.field]: args.order.direction }
    }

    let options = {
        order,
        where,
        skip: (page - 1) * pageSize,
        take: pageSize
    }

    return options
}

module.exports.buildOptions = buildOptions;
