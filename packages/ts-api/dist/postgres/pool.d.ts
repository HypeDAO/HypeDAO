import { QueryConfig, QueryResult } from 'pg';
declare const _default: {
    query: (query: string | QueryConfig) => Promise<QueryResult<any>>;
};
export default _default;
