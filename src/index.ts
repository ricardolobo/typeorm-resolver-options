const typeorm = require('typeorm')

/** reads configs from environment variables, if not set, use defaults*/
const getConfigs = () => {
    return {
        pageSize: process.env.TRO_DEFAULT_PAGE_SIZE || 25,
        searchField: process.env.TRO_DEFAULT_SEARCH_FIELD || 'name',
        orderArg: process.env.TRO_ORDER_ARG || 'order',
        searchArg: process.env.TRO_SEARCH_ARG || 'search',
        pageArg: process.env.TRO_PAGE_ARG || 'page',
        pageSizeArg: process.env.TRO_PAGE_SIZE_ARG || 'pageSize',
    }
}

/** creates typeorm options object from graphql resolver args and info*/
const buildOptions = (args: any) => {

    const configs = getConfigs()

    const { searchArg, orderArg, searchField, pageSize } = configs

    let _pageSize = args && args.pageSize || pageSize
    let page = args && args.page || 1

    let where = {}

    if (args[searchArg]) {
        const search = '%' + args[searchArg] + '%';
        // @ts-ignore
        where[searchField] = typeorm.Raw((alias: String) => `${alias} ILIKE '${search}' `)
    }

    let order: any = { id: 'ASC' }

    if (args[orderArg]) {
        order = { [args[orderArg].field]: args[orderArg].direction }
    }

    let options = {
        order,
        where,
        skip: (page - 1) * _pageSize,
        take: _pageSize
    }

    return options
}

export default buildOptions;
