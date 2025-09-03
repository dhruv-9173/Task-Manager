import { handlegetList } from "../services/AppService";

export async function taskStore() {
  try {
    const response = await handlegetList();
    const data = response.data.status;
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
