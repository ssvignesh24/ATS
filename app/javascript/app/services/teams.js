import Network from './network';

export default class Teams extends Network{

  list(){
    return this.get("/teams.json")
  }
  
  create(details){
    return this.post(`/teams.json`, { job: details})
  }

}