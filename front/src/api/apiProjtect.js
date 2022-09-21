import instancia from './instancia'

export default {
    getProjects : ( callback ) => {
        instancia("/projects").then( response => {
           callback(response.data);
        })
}
}
