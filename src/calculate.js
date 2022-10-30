
export default function calculateTf(tfVals) {
    let htVal = tfVals.height, wtVal = tfVals.weight, severity = tfVals.severity, tf = tfVals.tf, gender = tfVals.gender,propofol=tfVals.propofol, propofolCalories=Math.round(propofol*1.1*24), BMI = wtVal / ((htVal * 2.54 / 100) * (htVal * 2.54 / 100)), lowerKcalRange, upperKcalRange, idealWtVal, kcal1, kcal2, pro1 = 0, pro2 = 0, range1p, range2p, bw = "IBW", tfKcals, tfProtein, protein, tfRate, totalVolume, protinex = 0, kcalsProvided

    if (gender === "male") { idealWtVal = (106 + 6 * (htVal - 60)) / 2.2; }
    else if (gender === "female") { idealWtVal = (100 + 5 * (htVal - 60)) / 2.2; }
    idealWtVal = (Math.round(idealWtVal * 10) / 10)

    if (severity !== "critically ill") {
        if (BMI < 19) { kcal1 = 30; kcal2 = 35; pro1 += 1.4; pro2 += 1.6; }
        else if (BMI >= 19 && BMI <= 25) { kcal1 = 25; kcal2 = 30; pro1 += 1.0; pro2 += 1.2; }
        else if (BMI > 25 && BMI < 30) { kcal1 = 20; kcal2 = 25; pro1 += 1.4; pro2 += 1.6; }
        else if (BMI >= 30 && BMI < 40) { kcal1 = 15; kcal2 = 18; pro1 += 1.2; pro2 += 1.4; }
        else if (BMI >= 40 && BMI < 50) { kcal1 = 8; kcal2 = 15; pro1 += 1.8; pro2 += 2; }
        else if (BMI >= 50) { kcal1 = 8; kcal2 = 11; pro1 += 1.8; pro2 += 2; }

        lowerKcalRange = kcal1 * wtVal;
        upperKcalRange = kcal2 * wtVal;
        range1p = pro1 * (BMI > 25 ? idealWtVal : wtVal);
        range2p = pro2 * (BMI > 25 ? idealWtVal : wtVal);
    }
    else {
        if (BMI < 30) { pro1 += 1.2; pro2 += 2.0; kcal1 = 25; kcal2 = 30; bw = "ABW" }
        else if (BMI >= 30 && BMI <= 40) { pro1 += 2.0; pro2 += 2.0; kcal1 = 11; kcal2 = 14; }
        else if (BMI > 40 && BMI <= 50) { pro1 += 2.0; pro2 += 2.5; kcal1 = 22; kcal2 = 25 }
        range1p = pro1 * (BMI >= 30 ? idealWtVal : wtVal)
        range2p = pro2 * (BMI >= 30 ? idealWtVal : wtVal)
        lowerKcalRange = kcal1 * (BMI < 50 ? idealWtVal : wtVal)
        upperKcalRange = kcal2 * (BMI < 50 ? idealWtVal : wtVal)

    }
    if (tf === "jevity") {
        tfKcals = 1.5; tfProtein = 67;
    }
    else if(tf==="vital"){
        tfKcals = 1.0; tfProtein=87;
    }

    let tfNeeds = ((upperKcalRange + lowerKcalRange) / 2)-propofolCalories
    tfRate = (Math.round(((tfNeeds / tfKcals) / 20) / 5) * 5);
    protein = tfProtein * ((tfRate * 20) / 1000);
    kcalsProvided = tfKcals * tfRate * 20


console.log(propofolCalories)
    //make something that checks if protein is adequate at max kcal allowance
    if (protein <= (range1p * .9)) {
        console.log("in protein adding loop")
        while(protein<range1p&&kcalsProvided<upperKcalRange){
            tfRate=tfRate+5;
            protein = tfProtein * ((tfRate * 20) / 1000);
            kcalsProvided=tfKcals*tfRate*20;
        }
        tfNeeds = upperKcalRange-propofolCalories
        tfRate = (Math.round(((tfNeeds / tfKcals) / 20) / 5) * 5)
        protein = tfProtein * ((tfRate * 20) / 1000)
        kcalsProvided = tfKcals * tfRate * 20
    
        while (protein < (range1p)) {
            tfRate = tfRate - 5;
            protinex++
            protein = tfProtein * ((tfRate * 20) / 1000) + (protinex * 26)
            kcalsProvided = (tfKcals * tfRate * 20) + (protinex * 104)
        }
    }
    else if (protein >= (range2p * 1.1)) {
        tfNeeds = (lowerKcalRange * .9)-propofolCalories
        tfRate = (Math.round(((tfNeeds / tfKcals) / 20) / 5) * 5)
        protein = tfProtein * ((tfRate * 20) / 1000)
        kcalsProvided = tfKcals * tfRate * 20
        while (protein >= 1.1) {
            return ("tube feed provides too much protein")
        }
    }

  

    console.log(kcalsProvided, propofolCalories, lowerKcalRange, upperKcalRange, protein, range1p, range2p);
    if (protein >= (range1p * .9) && protein <= (range2p * 1.1) && (kcalsProvided+propofolCalories) >= (lowerKcalRange * .9) && (kcalsProvided+propofolCalories) <= (upperKcalRange * 1.1)) {
        return (protinex ? `Pt needs ${lowerKcalRange}-${upperKcalRange} kcals and ${range1p}-${range2p} g of protein
    ${tf} running at ${tfRate} ml/hr providing, with ${protinex} protinex, ${kcalsProvided} kcals, ${protein} grams of protein, and a total volume of ${tfRate * 20}` : `Pt needs ${lowerKcalRange}-${upperKcalRange} kcals and ${range1p}-${range2p} g of protein
    ${tf} running at ${tfRate} ml/hr providing ${kcalsProvided} kcals, ${protein} grams of protein, and a total volume of ${tfRate * 20}`)
    }

}
