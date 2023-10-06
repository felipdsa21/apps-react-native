import { BackendApi } from "./TasksContext";

const API_HOST = "http://localhost:3000";

export const JsonServerBackendApi: BackendApi = {
  listTasks: () => doRequest("GET", "/tasks", null),
  addTask: (task) => doRequest("POST", "/tasks", task),
  editTask: (id, changes) => doRequest("PATCH", "/tasks/" + id, changes),
  deleteTask: (id) => doRequest("DELETE", "/tasks/" + id, null),
};

async function doRequest(method: string, url: string, body: object | null) {
  const headers = new Headers();
  const options: RequestInit = { method, headers };

  if (body) {
    headers.set("Content-Type", "application/json");
    options.body = JSON.stringify(body);
  }

  const response = await fetch(API_HOST + url, options);
  return await response.json();
}
