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
   let tfRate
   let totalVolume
   let protinex = 0
   let serverity = "i"
   let kcalsProvided

   if(gender==="male"){idealWtVal = (106 + 6*(htVal-60))/2.2;}
        else if(gender==="female"){idealWtVal = (100 + 5*(htVal-60))/2.2;}
        idealWtVal=(Math.round(idealWtVal * 10) / 10 )
    if(serverity !== "i")
       { if(BMI<19){kcal1 =30; kcal2=35;lowerKcalRange = kcal1 * wtVal; upperKcalRange = kcal2 * wtVal;}
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
                                console.log(range1p, range2p, upperKcalRange, lowerKcalRange)
}
    else{ 
        if(BMI<30){pro1+=1.2; pro2+=2.0; kcal1=25; kcal2=30; bw = "ABW"}
            else if(BMI>=30&&BMI<=40){pro1+=2.0; pro2+=2.0; kcal1=11; kcal2 = 14;}
                 else if(BMI>40 && BMI<=50){pro1+=2.0; pro2+=2.5; kcal1=22; kcal2=25}

        range1p = pro1*(BMI>=30?idealWtVal:wtVal)
        range2p = pro2*(BMI>=30?idealWtVal:wtVal)
        lowerKcalRange = kcal1*(BMI<50?idealWtVal:wtVal)
        upperKcalRange = kcal2*(BMI<50?idealWtVal:wtVal)
        console.log(range1p, range2p, upperKcalRange, lowerKcalRange,BMI)
    }
        
        let tfNeeds=(lowerKcalRange+upperKcalRange)/2
    if (tf==="jevity"){
        tfKcals=1.5; tfProtein=63.8; 
        tfRate = (Math.round(((tfNeeds/tfKcals)/20) / 5) * 5); 
        protein = tfProtein*((tfRate*20)/1000);
        kcalsProvided=tfKcals*tfRate*20
        console.log(protein, tfRate*20)
    
        if(protein>=(range1p*.9) && protein<=(range2p*1.1)&&kcalsProvided>=(lowerKcalRange*.9)&& kcalsProvided<=(upperKcalRange*1.1)){console.log("yaya")}

            while(protein<(range1p*.9)){
            tfRate= tfRate-5;
            protinex++
            console.log("protinex needed")
            protein = tfProtein*((tfRate*20)/1000)+(protinex*26)
            kcalsProvided = tfKcals*tfRate+protinex*104
        }
        
    }
    console.log(tfRate*20, protein,kcalsProvided);

    return(protein)
                            
}
