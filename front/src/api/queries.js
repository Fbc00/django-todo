import instanciaAxios from './instancia'

export default{
    getTasks: () =>{
        return new Promise((resolve, reject) => {
            instanciaAxios.get('api/tasklist').then(response => {
            resolve(response.data);
        }).catch(error => {  reject(error);  });
        })


    },
    postTask(task, callback){ 
        instanciaAxios.post('/api/taskcreate', task).then(response => { 
            callback(response.data);
        })
    },
    editTask(task, callback) {
       instanciaAxios.post(`/api/tasks/${task.id}/`, task).then(response => {
            callback(response.data);
        }).catch(error => { console.log(error); })
    },

    deleteTask(id, callback) { 
        instanciaAxios.delete(`/api/tasks/${id}/`).then(response => {
            callback(response.data);
        })
    }
}