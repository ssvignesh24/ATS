import Network from './network';

export default class Jobs extends Network{

  constructor(jobId){
    super(30 * 1000)
    if(jobId) this.jobId = jobId;
  }

  list(){
    return this.get("/jobs.json")
  }

  show(){
    return this.get(`/jobs/${this.jobId}.json`)
  }

  create(details){
    return this.post(`/jobs.json`, { job: details})
  }

}