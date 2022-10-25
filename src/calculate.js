export default function calculateTf(tfVals){
   let htVal = tfVals.height
   let wtVal = tfVals.weight
   let tf = tfVals.tf
   let gender = tfVals.gender
   let BMI = wtVal/((htVal*2.54/100)*(htVal*2.54/100))
   let lowerKcalRange
   let upperKcalRange
   let idealWtVal
   let kcal1
   let kcal2
   let pro1=0
   let pro2=0
   let range1p
   let range2p
   let bw ="IBW"
   let tfKcals
   let tfProtein
   let protein
   let volume
   let totalVolume

   if(gender==="male"){idealWtVal = (106 + 6*(htVal-60))/2.2;}
        else if(gender==="female"){idealWtVal = (100 + 5*(htVal-60))/2.2;}
        idealWtVal=(Math.round(idealWtVal * 10) / 10 )
        if(BMI<19){kcal1 =30; kcal2=35;lowerKcalRange = kcal1 * wtVal; upperKcalRange = kcal2 * wtVal;}
            else if(BMI>=19 && BMI <= 25){kcal1 =25; kcal2=30;lowerKcalRange = kcal1 * wtVal; upperKcalRange = kcal2 * wtVal;}
                else if(BMI>25 && BMI <30){kcal1 =20; kcal2=25;lowerKcalRange = kcal1 * wtVal; upperKcalRange = kcal2 * wtVal;}
                    else if(BMI>=30 && BMI <40){kcal1 =15; kcal2=18;lowerKcalRange = kcal1 * wtVal; upperKcalRange = kcal2 * wtVal;}
                            else if(BMI>=40 && BMI <50){kcal1 =8; kcal2=15;lowerKcalRange = kcal1 * wtVal; upperKcalRange = kcal2 * wtVal;}
                                else if(BMI >= 50){kcal1 =8; kcal2=11;lowerKcalRange = kcal1 * wtVal; upperKcalRange = kcal2 * wtVal;}
    
        
        if(BMI<19){bw ="ABW"; pro1 +=1.4;; pro2+=1.6; range1p = pro1 * wtVal; range2p = pro2 * wtVal;}
                else if(BMI>=19 && BMI <= 25){bw = "ABW"; pro1 += 1.0; pro2+=1.2;range1p = pro1 * wtVal; range2p = pro2 * wtVal;}
                    else if(BMI>25 && BMI <30){pro1+=1.4;  pro2+=1.6;range1p = pro1 * idealWtVal; range2p = pro2 * idealWtVal;}
                        else if(BMI>=30 && BMI <40){pro1+=1.2; pro2+=1.4;range1p = pro1 * idealWtVal; range2p = pro2 * idealWtVal;}
                            else if(BMI>=40 && BMI <50){pro1+=1.8; pro2+=2;range1p = pro1 * idealWtVal; range2p = pro2 * idealWtVal;}
                                else if(BMI >= 50){pro1+=1.8; pro2+=2;range1p = pro1 * idealWtVal; range2p = pro2 * idealWtVal;}

        console.log(range1p, range2p, lowerKcalRange, upperKcalRange)
        let tfNeeds=(lowerKcalRange+upperKcalRange)/2
    if (tf==="jevity"){
        tfKcals=1.5; tfProtein=63.8; volume = (Math.round(((tfNeeds/tfKcals)/20) / 5) * 5); 
        protein = tfProtein*((volume*20)/1000);
        if(protein>=(range1p*.9) && protein<=(range2p*1.1)){console.log("yaya")}
        else{while(protein<=(range1p*.9) && protein>=(range2p*1.1)){
            
        }}
    }
    console.log(volume*20, protein);

    
                            
}
