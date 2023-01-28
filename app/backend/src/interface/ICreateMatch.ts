import Match from '../database/models/Match.model';

 type ICreateMatch = {
   message?:string,
   match?: Match,
   status: number,
 };

export default ICreateMatch;
