import React from 'react'
import { withRouter, Link } from "react-router-dom"
// import '../../styles/css/Pagination.css'
// import { getObjectFromQueryParams, getObjectFromQueryParamsExcept, objectToQueryParams } from '../../shared/Utilities';

const NEIGHBOUR = 2

const pageUrl = (BASE_URL, params, index) => {
    const isThereIsPage = getObjectFromQueryParams(params, ['page']) !== null
    if (!isThereIsPage)
        return `${BASE_URL}${params}${params === '' ? '?' : '&'}page=${index}`
    else {
        let query = getObjectFromQueryParamsExcept(params, ['page'])
        if (query === null)
            return `${BASE_URL}?${objectToQueryParams({ page: index })}`
        else {
            query.page = index
            query = objectToQueryParams(query)
            return `${BASE_URL}?${query}`
        }

    }
}

export const getObjectFromQueryParamsExcept = (params, keys) => {
    const query = new URLSearchParams(params)
    let object = {}
    for (const key of query.entries()) {
        if (!keys.includes(key[0]))
            object[key[0]] = key[1]
    }

    return isEmptyObject(object) ? null : object
}

export const isEmptyObject = obj => {
    return Object.keys(obj).length === 0
}

export const getObjectFromQueryParams = (params, keys) => {
    const query = new URLSearchParams(params)
    let object = {}
    for (const key of keys) {
        if (query.get(key))
            object[key] = query.get(key)
    }

    return isEmptyObject(object) ? null : object
}
export const objectToQueryParams = obj => {
    return Object.keys(obj)
        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
        .join("&")
}

const pagination = ({ pages, ...props }) => {
    const BASE_URL = props.match.url
    const QUERY_PARAMS = props.location.search

    const numbers = []

    if (pages.last_page <= 5) {
        for (let index = 1; index <= pages.last_page; index++) {
            numbers.push(
                <Link
                    key={index}
                    to={pageUrl(BASE_URL, QUERY_PARAMS, index)}
                    style={{ margin: "5px" }}>{index}</Link>
            )
        }
    } else {
        const start = (pages.current_page - NEIGHBOUR) <= 0 ? 1 : pages.current_page - NEIGHBOUR
        for (let index = start; index <= pages.current_page; index++)
            numbers.push(
                <Link
                    key={index}
                    to={pageUrl(BASE_URL, QUERY_PARAMS, index)}
                    style={{ margin: "5px" }}>{index}</Link>
            )
        for (let index = pages.current_page + 1; index <= pages.current_page + NEIGHBOUR && index <= pages.last_page; index++)
            numbers.push(
                <Link
                    key={index}
                    to={pageUrl(BASE_URL, QUERY_PARAMS, index)}
                    style={{ margin: "5px" }}>{index}</Link>
            )
    }

    return (
        <div className="pagination">{numbers}</div>
    )
}
export default withRouter(pagination)