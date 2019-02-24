
import Qs from 'qs';
import debounce from 'lodash.debounce';

_requests = [];

const _abortRequests = () => {
    _requests.map(i => i.abort());
    _requests = [];
}

const QUERY = {
    // available options: https://developers.google.com/places/web-service/autocomplete
    key: 'AIzaSyCrjO01NcP1GPkWfWD1r5fBukv6wt4ajy0',
    language: 'vi', // language of the results
}

const _callHttpRequest = (url, callback)=>{
    const request = new XMLHttpRequest();
    _requests.push(request);
    // request.timeout = this.props.timeout;
    // request.ontimeout = this.props.onTimeout;
    request.onreadystatechange = () => {
        if (request.readyState !== 4) {
            return;
        }

        if (request.status === 200) {
            const responseJSON = JSON.parse(request.responseText);
            callback(responseJSON);
        } else {
            // console.warn("google places autocomplete: request could not be completed or has been aborted");
        }
    };
    request.open('GET', url);
    request.send();
    return request;
}

export const getAutocomplete = (text, callback) => {
    _abortRequests();
    if (text.length >= 2) {
        const query = {
            ...QUERY,
            // types: 'establishment',
        }
        const url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?&input=' + encodeURIComponent(text) + '&' + Qs.stringify(query);
        
        _callHttpRequest(url, function (responseJSON){
            if (typeof responseJSON.predictions !== 'undefined') {
                callback(responseJSON.predictions);
            }
            if (typeof responseJSON.error_message !== 'undefined') {
                console.warn('google places autocomplete: ' + responseJSON.error_message);
            }
        })
    } else {
        callback(null);

    }
}


export const getLocationDetail = (place_id, callback) => {
    _abortRequests();
    const query = {
        ...QUERY,
        placeid: place_id
    }

    const url = 'https://maps.googleapis.com/maps/api/place/details/json?' + Qs.stringify(query);

    _callHttpRequest(url, function (responseJSON) {
        callback(responseJSON);
     })
}

export const getNearLocations = (latitude, longitude, keywords=null, next_page_token=null, callback) => {
    _abortRequests();

    if (latitude !== undefined && longitude !== undefined && latitude !== null && longitude !== null) {
        const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' + Qs.stringify({
            ...QUERY,
            location: latitude + ',' + longitude,
            radius: 100,
            language: 'vi',
            keywords: encodeURIComponent(keywords),
            // type: 'restaurant',
            pagetoken: next_page_token
            // rankby: 'location'
        });
        _callHttpRequest(url, function (responseJSON) {
            // console.log(responseJSON);
            callback(responseJSON);
        })
    } else {
        callback(null);
    }
}