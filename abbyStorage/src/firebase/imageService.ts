import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "./firebase";

/**
 * Upload een bestand naar Firebase Storage en geeft de download URL terug.
 * @param file Het bestand dat je wilt uploaden
 * @param path Het pad in de storage (bijv. 'folder/myfile.gif')
 * @returns De download URL van het geüploade bestand
 */
export async function uploadImage(file: File, path: string): Promise<string> {
  const refInStorage = storageRef(storage, path);
  await uploadBytes(refInStorage, file);
  const url = await getDownloadURL(refInStorage);
  return url;
}
