var limit = 2;

//Variables to check which disount the customer gets (given that they select to pay upfront).
var discount10 = false;
var discount20 = false;

//Ensures customers do not select more packages than is allowed.
function validateCheckboxes()
{
    var countChecked = 0;

    if(countChecked <= limit)
    {
        if(document.getElementById("sport").checked == true)
        {
            countChecked++;
        }
        if(document.getElementById("series").checked == true)
        {
            countChecked++;
        }
        if(document.getElementById("movie").checked == true)
        {
            countChecked++;
        }
    }
    else
    {
        document.getElementById("sport").disabled;
        document.getElementById("series").disabled;
        document.getElementById("movie").disabled;
    }
}

//Function to validate user-provided information.
function submitForm()
{
    var name = document.getElementById("name").value;
    var surname = document.getElementById("surname").value;
    var duration = document.getElementById("duration").value;
    var infoValid = true;


    if(name.length == 0 || surname.length == 0 || duration < 1 || duration > 24)
    {
        document.getElementById("error").innerHTML = "ERROR: Invalid or insufficient information provided. Please correctly fill all fields and try again.";
        infoValid = false;
    }
    else
    {
        replaceWithDetails(name, surname, duration);
    }

}

//Calculates the total cost, taking both duration and discounts into account.
function calcCost()
{
    var discount1 = 0.10;
    var discount2 = 0.20;
    var duration = document.getElementById("duration").value;
    var cost = duration * 99;
    var totalCost = 0;

    if(document.getElementById("upfront").checked == true)
    {
        if(duration > 6 && duration < 12)
        {
            totalCost = cost - (cost * discount1);
            discount10 = true;
        }
        else if(duration > 12)
        {
            totalCost = cost - (cost * discount2);
            discount20 = true;
        }
    }
    else
    {
        totalCost = cost;
    }

    return totalCost;
}

//Replaces the current page with the customer's information and the total cost of the product for said customer.
function replaceWithDetails(name, surname, duration)
{
    var cost = calcCost();
    var selection1;
    var selection2;
    var selection3;
    var discountAlert;

    if(document.getElementById("sport").checked == true)
    {
        selection1 = "Sports Package";
    }
    else
    {
        selection1 = "";
    }
    if(document.getElementById("series").checked == true)
    {
        selection2 = "Series Package";
    }
    else
    {
        selection2 = "";
    }
    if(document.getElementById("movie").checked == true)
    {    
        selection3 = "Movie Package";
    }
    else
    {
        selection3 = "";
    }

    if(discount10 == true)
    {
        discountAlert = "You get a 10% discount!";
    }
    else if(discount20 == true)
    {
        discountAlert = "You get a 20% discount!";
    }
    else
    {
        discountAlert = "";
    }


    document.getElementById("FormDiv").innerHTML = "<p>" + "Customer's Full Name: " + name + " " + surname + "</p>" + "</p>" + "<p>" + "Packages Selected: " + selection1 + " " + selection2 + " " + selection3 + "</p>" + "Contract Duration: " + duration + "</p>" + "<p>" + "Cost: " + "R" + cost + "</p>" + "<p>" + discountAlert + "</p>";
}
