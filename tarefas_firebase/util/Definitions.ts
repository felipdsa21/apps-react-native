import { RootStackParamList as RootStackParamListFirebase } from "../../firebase/util/Definitions";
import { RootStackParamList as RootStackParamListTasks } from "../../tarefas/util/Definitions";

export type RootStackParamList = RootStackParamListFirebase & RootStackParamListTasks;
