import { Timestamp } from "firebase/firestore";

export default interface IPic{
  title : string;
  filename : string;
  pictureurl :string;
  timestamp : Timestamp;
  docId?:string,
  uid:string,
}
