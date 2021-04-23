const API_URL = 'http://localhost:3001';

const createTask = (data) => {
    return fetch(`${API_URL}/task`, {
        method: 'POST',
        mode: 'cors',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
    }).then(res => res = res.json())
    .catch(error => console.error('Error:', error))
}

const getAllTasks =  () => {
    return fetch(`${API_URL}/task`, {
        method: 'GET',
        mode: 'cors',
    }).then(res => res = res.json());
}

const deleteTask = (taskId) => {
    return fetch(`${API_URL}/task/${taskId}`, {
        method: 'DELETE',
        mode: 'cors',
    }).then(res => res = res.json())
}

const patchTask = (taskId, data) => {
    return fetch(`${API_URL}/task/${taskId}`, {
        method: 'PATCH',
        mode: 'cors',
        headers: { 
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
    }).then(res => res = res.json())
    .catch(error => console.error('Error:', error))
}

const clearCompleted = () => {
    return fetch(`${API_URL}/task/clearcompleted`, {
        method: 'POST',
        mode: 'cors',
    }).then(res => res = res.json())
    .catch(error => console.error('Error:', error))
}

export default {
    createTask,
    getAllTasks,
    deleteTask,
    patchTask,
    clearCompleted,
}