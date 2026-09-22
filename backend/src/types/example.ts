//this is an example file to show how you would create typescript types for data

// export interface dbDocument {
//   _id?: ObjectEncodingOptions;
//   name: string;
//   description: string;
//   extraDataHere?: couldBeAnything;
// }

// export interface serversideItem {
//   id: string;
//   name: string;
//   description: string;
//   extraDataHere?: couldBeAnything;
// }

// convers a mongo document into a serverside usable item
// export function toServerSideItem(doc: dbDocument): serversideItem {
//   return {
//     //! means it is required
//     id: doc._id!.toHexString(),
//     name: doc.name,
//     description: doc.description,
//     extraDataHere?: doc.extraDataHere
//   }
// }

// export type yourType = {
//   id: number;
//   example: string;
//   example: string;
//   example?: string;
// }