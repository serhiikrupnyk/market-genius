import { CollectionReference, doc, getDoc } from "firebase/firestore";

export default async function getDocument(collection: CollectionReference, id: string) {
  // Create a document reference using the provided collection and ID
  const docRef = doc(collection, id);
  // Variable to store the result of the operation
  let result = null;
  // Variable to store any error that occurs during the operation
  let error = null;

  try {
    // Retrieve the document using the document reference
    result = await getDoc(docRef);
  } catch (e) {
    // Catch and store any error that occurs during the operation
    error = e;
  }

  // Return the result and error as an object
  return { result, error };
}
