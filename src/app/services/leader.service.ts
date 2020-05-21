import { Injectable } from '@angular/core';
import { LEADERS } from '../shared/leaders';
import {Leader } from '../shared/leader';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  getLeaders():Promise<Leader[]>
  {
    return new Promise(resolve=>{
      //simulate server latency  with 2 sec delay
      setTimeout(()=>resolve(LEADERS),2000);
      
    });
    
  }
  getLeader(id:string): Promise<Leader>
  {
    return new Promise(resolve=>{
      //simulate server latency  with 2 sec delay
      setTimeout(()=>resolve(LEADERS.filter((lead)=>(lead.id=== id))[0]),2000);
    });
  }
  getFeaturedLeader():Promise<Leader>
{
 return new Promise(resolve=>{
  //simulate server latency  with 2 sec delay
  setTimeout(()=>resolve(LEADERS.filter((leader)=>leader.featured)[0]),2000);
});
}
}
