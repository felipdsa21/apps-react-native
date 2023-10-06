import {
  DocumentData,
  DocumentSnapshot,
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";

import { app, auth } from "../../firebase/util/FirebaseConfig";
import { BackendApi } from "../../tarefas/util/TasksContext";

const db = getFirestore(app);

export const FirestoreBackendApi: BackendApi = {
  listTasks: async () => (await getDocs(collection(db, "users", auth.currentUser!.uid, "tasks"))).docs.map(dataToTask),
  addTask: async (task) => {
    const id = Date.now();
    await setDoc(getTaskRef(id), { ...task, timestamp: Timestamp.fromMillis(task.timestamp * 1000) });
    return id;
  },
  editTask: async (id, changes) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = { ...changes } as Record<string, any>;
    if (data.timestamp !== undefined) data.timestamp = Timestamp.fromMillis(data.timestamp * 1000);
    await setDoc(getTaskRef(id), data, { merge: true });
  },
  deleteTask: (id) => deleteDoc(getTaskRef(id)),
};

function getTaskRef(id: number) {
  return doc(db, "users", auth.currentUser!.uid, "tasks", id.toString());
}

function dataToTask(data: DocumentSnapshot<DocumentData>) {
  return {
    id: Number(data.id),
    desc: data.get("desc") as string,
    timestamp: (data.get("timestamp") as Timestamp).seconds,
    done: data.get("done") as boolean,
  };
}
