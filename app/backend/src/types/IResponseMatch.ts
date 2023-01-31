import Match from '../database/models/Match.model';

 type IResponseMatch = {
   message?:string,
   match?: Match,
   status: number,
 };

export default IResponseMatch;
