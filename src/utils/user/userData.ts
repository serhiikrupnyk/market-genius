import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    FirebaseStorage,
    deleteObject,
  } from "firebase/storage";
  
  export async function uploadFile(
    storage: FirebaseStorage,
    filePath: string,
    file: File
  ): Promise<string> {
    const storageRef = ref(storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, file);
  
    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => resolve(url))
            .catch((error) => reject(error));
        }
      );
    });
  }
  
  export async function deleteFileByURL(
    storage: FirebaseStorage,
    url: string
  ): Promise<void> {
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
  }
  
  export const getAvatarFilePreviewUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          resolve(event.target.result);
        } else {
          reject(new Error("Failed to read file."));
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };
  