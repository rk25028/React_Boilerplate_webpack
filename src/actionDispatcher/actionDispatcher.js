import ErrorHandler from '../utils/Errors';

/**
 * This function handles API responses and return corresponding object for loading, success and error cases for that API
 * It takes below params:
 * serviceMethod: It's a function that is used to make API call. It takes one mandatory parameter i.e. url and returns a promise 
 * actionTypeSuccess, actionTypeFailure, actionTypeInProgress: Action types used to handle API success and error cases
 * extra: It's an extra paramater that is required for handling pagination etc. It is optional
 * callback: It's an optional callback function
 */
function dispatchResponseToReducers(serviceMethod, actionTypeSuccess,
    actionTypeFailure, actionTypeInProgress, extra, callback) {
    let headers = null;
    return (dispatch) => {
        /**
         * This is disptached when API call is initiated
         * Returns an object with type of action and extra param if passed
        */
        dispatch({
            type: actionTypeInProgress,
            extra: extra ? extra : undefined
        });
        /**
         * It's a function that is used to make API call.
         * It takes one mandatory parameter i.e. url and returns a promise 
         */
        serviceMethod()
            .then((response) => {
                // parses the response and returns headers in a new key
                headers = response.headers;
                return response.json(); // parses JSON response into javascript objects 
            })
            .then((responseJson) => {
                /**
                 * Checked whether API succeeds to fetch data or not
                 * If no status code returned from API then this will be executed
                 */
                if (responseJson.statusCode === '200') {
                    /**
                     * If the request succeeds, this is dispatched
                     * The action type may be either instanceof array or object.
                     * Corresponding if-else block is executed according to the type
                     * Returns an object with success action type, 
                     * headers, payload that consist of data returned from that API
                     * and extra params if passed to that action
                     */
                    if (actionTypeSuccess instanceof Array) {
                        actionTypeSuccess.forEach((value) => {
                            dispatch({
                                type: value,
                                headers,
                                payload: responseJson,
                                extra: extra ? extra : undefined
                            });
                        })
                        // If callback is passed then this will be executed
                        if (callback) callback({ isSuccess: true })
                    } else {
                        dispatch({
                            type: actionTypeSuccess,
                            headers,
                            payload: responseJson,
                            extra: extra ? extra : undefined
                        });
                        // If callback is passed then this will be executed
                        if (callback) callback({ isSuccess: true })
                    }
                }
                /**
                 * If status code is returned from the API then this block will be executed
                 */
                else {
                    /**
                     * If the request fails, failure action is dispatched
                     * The action type may be either instanceof array or object.
                     * Corresponding block is executed according to the type
                     * Returns an object with failure action type,
                     * error code and error message if exist
                    */
                    if (actionTypeFailure instanceof Array) {
                        actionTypeFailure.forEach((value) => {
                            dispatch({
                                type: value,
                                error: responseJson.statusCode ? responseJson.statusCode : '', // Returns error code if exist otherwise returns empty string
                                message: responseJson.errorMessage ? responseJson.errorMessage : '' //Returns error message if exist otherwise returns empty string 
                            });
                        })
                        // If callback is passed then this will be executed
                        if (callback) callback({ isSuccess: false })
                    } else {
                        dispatch({
                            type: actionTypeFailure,
                            error: responseJson.statusCode ? responseJson.statusCode : '', // Returns error code if exist otherwise returns empty string
                            message: responseJson.errorMessage ? responseJson.errorMessage : '' //Returns error message if exist otherwise returns empty string 
                        });
                        // If callback is passed then this will be executed
                        if (callback) callback({ isSuccess: false })
                    }
                }
            })
            .catch((error) => {
                /**
                 *  This is dispatched to let your app knows the call was unsuccessfull
                 *  Returns an error object with failure action type,
                 *  status code and error message if exist
                */
                let err = ErrorHandler(error);
                dispatch({
                    type: actionTypeFailure,
                    error: err.statusCode ? err.statusCode : '', // Returns error code if exist otherwise returns empty string
                    message: err.errorMessage ? err.errorMessage : '' // Returns error message if exist otherwise returns empty string
                });
            });
    };
}

export default dispatchResponseToReducers;