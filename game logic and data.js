// player class 
class PLayer{
    constructor(id, name,){
         this.id = id; 
         this.name = name; 
         this.sessionscore = sessionscore; 
         this.totalscore = this.totalscore;
    }

    /* function: add points to the current session 
    @param {number} points 
    */ 
   addScore(points){
    this.sessionscore += points; 
    this.totalscore += points; 
   }
   /* function: to reset the session score to zero */ 
   resetSessionScore(){
    this.sessionscore = 0 ; 
   } 
   /* function: to reset all the total scores */ 

   resetTotalScores (){
     this.totalscore =0; 
   }
}